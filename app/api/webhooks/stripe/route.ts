import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createServiceClient } from '@/lib/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-05-27.dahlia',
});

function getTierFromPriceId(priceId: string): string {
  const map: Record<string, string> = {
    [process.env.STRIPE_PRICE_STARTER!]: 'starter',
    [process.env.STRIPE_PRICE_ELITE!]: 'elite',
    [process.env.STRIPE_PRICE_PREMIUM!]: 'premium',
  };
  return map[priceId] ?? 'free';
}

export async function POST(request: NextRequest) {
  const sig = request.headers.get('stripe-signature');
  if (!sig) return new NextResponse('Missing signature', { status: 400 });

  let event: Stripe.Event;
  try {
    const body = await request.text();
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error('Webhook signature error:', err);
    return new NextResponse('Webhook Error', { status: 400 });
  }

  const supabase = await createServiceClient();

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const tier = session.metadata?.tier;

      if (userId && tier && session.subscription) {
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        );
        const item = subscription.items.data[0];
        const periodEnd = item?.current_period_end;
        await supabase.from('user_subscriptions').upsert({
          user_id: userId,
          tier,
          status: 'active',
          stripe_subscription_id: subscription.id,
          started_at: new Date(subscription.start_date * 1000).toISOString(),
          expires_at: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
          amount_paid: session.amount_total ? session.amount_total / 100 : null,
        });
      }
      break;
    }

    case 'customer.subscription.updated': {
      const sub = event.data.object as Stripe.Subscription;
      const tier = getTierFromPriceId(sub.items.data[0].price.id);
      const userId = sub.metadata?.userId;
      const periodEnd = sub.items.data[0]?.current_period_end;

      if (userId) {
        await supabase
          .from('user_subscriptions')
          .update({
            tier,
            status: sub.status === 'active' ? 'active' : sub.status,
            expires_at: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
          })
          .eq('stripe_subscription_id', sub.id);
      }
      break;
    }

    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription;
      await supabase
        .from('user_subscriptions')
        .update({ status: 'cancelled' })
        .eq('stripe_subscription_id', sub.id);
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as unknown as { subscription?: string };
      if (invoice.subscription) {
        await supabase
          .from('user_subscriptions')
          .update({ status: 'past_due' })
          .eq('stripe_subscription_id', invoice.subscription);
      }
      break;
    }
  }

  return new NextResponse('OK', { status: 200 });
}
