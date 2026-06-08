'use client';

import { useState } from 'react';
import Link from 'next/link';

const TIERS = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'forever',
    tagline: 'Start here — no card needed',
    features: [
      '50+ authentic Reading tests',
      '50+ authentic Listening tests',
      'Timed mode (real exam conditions)',
      'Instant band score (5–9)',
      'Basic score history',
    ],
    locked: [
      'AI Writing feedback',
      'Speaking practice',
      'Analytics & weak area detection',
      'Full 4-skill mock tests',
    ],
    cta: 'Start Free',
    ctaHref: '/dashboard',
    popular: false,
    color: 'slate',
  },
  {
    id: 'starter',
    name: 'Starter',
    price: '$4.99',
    period: '/month',
    tagline: 'Add Writing AI feedback',
    features: [
      'Everything in Free',
      'Writing Task 1 AI feedback',
      'Writing Task 2 AI feedback',
      'Unlimited essay submissions',
      'Save all results to dashboard',
    ],
    locked: [
      'Speaking practice',
      'Full mock tests',
      'Analytics & study plan',
    ],
    cta: 'Start Starter',
    popular: false,
    color: 'blue',
  },
  {
    id: 'elite',
    name: 'Elite',
    price: '$12.99',
    period: '/month',
    tagline: 'Everything you need for Band 7+',
    features: [
      'Everything in Starter',
      'Speaking practice + band score',
      'Full 4-skill mock tests',
      'Band progression chart',
      'Weak area detection (AI-powered)',
      'Personalised 30-day study plan',
      '1 tutoring call per month',
      'Priority Telegram support',
    ],
    locked: [],
    cta: 'Start Elite — Most Popular',
    popular: true,
    color: 'red',
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$29',
    period: '/month',
    tagline: 'For Band 8+ serious candidates',
    features: [
      'Everything in Elite',
      'Unlimited 1-on-1 tutoring',
      'Custom adaptive study plan',
      'Priority feedback (24h response)',
      'Private Telegram support channel',
      'Hand-corrected essays (detailed notes)',
    ],
    locked: [],
    cta: 'Start Premium',
    popular: false,
    color: 'purple',
  },
];

async function checkout(tier: string) {
  const response = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tier }),
  });

  if (response.status === 401) {
    window.location.href = `/sign-in?redirect=/pricing`;
    return;
  }

  const data = await response.json();
  if (data.url) {
    window.location.href = data.url;
  }
}

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (tierId: string) => {
    setLoading(tierId);
    try {
      await checkout(tierId);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12 text-center">
        <p className="text-red-500 font-semibold mb-3 text-sm tracking-widest uppercase">
          🇺🇿 Built in Tashkent for Uzbek Students
        </p>
        <h1 className="text-5xl font-bold mb-4">Simple, Honest Pricing</h1>
        <p className="text-slate-400 text-xl max-w-2xl mx-auto">
          Start free with Reading + Listening. Upgrade when you need Writing or Speaking feedback.
          No hidden fees. Cancel anytime.
        </p>
      </div>

      {/* Tiers */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`relative rounded-2xl border-2 p-8 transition-all ${
                tier.popular
                  ? 'border-red-600 bg-red-600/5 scale-105 shadow-2xl shadow-red-900/20'
                  : 'border-slate-700 bg-slate-900'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wide">
                  MOST POPULAR
                </div>
              )}

              <h2 className="text-xl font-bold mb-1">{tier.name}</h2>
              <p className="text-slate-500 text-sm mb-4">{tier.tagline}</p>

              <div className="mb-6">
                <span className="text-4xl font-extrabold">{tier.price}</span>
                <span className="text-slate-400 text-sm ml-1">{tier.period}</span>
              </div>

              {/* CTA Button */}
              {tier.id === 'free' ? (
                <Link
                  href={tier.ctaHref!}
                  className="block w-full text-center py-3 rounded-xl font-bold bg-slate-700 hover:bg-slate-600 transition mb-6"
                >
                  {tier.cta}
                </Link>
              ) : (
                <button
                  onClick={() => handleCheckout(tier.id)}
                  disabled={loading === tier.id}
                  className={`w-full py-3 rounded-xl font-bold transition mb-6 disabled:opacity-60 ${
                    tier.popular
                      ? 'bg-red-600 hover:bg-red-500 text-white'
                      : 'bg-slate-700 hover:bg-slate-600 text-white'
                  }`}
                >
                  {loading === tier.id ? 'Redirecting...' : tier.cta}
                </button>
              )}

              {/* Features */}
              <ul className="space-y-2.5 mb-6">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* Locked features */}
              {tier.locked.length > 0 && (
                <ul className="space-y-2.5">
                  {tier.locked.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="mt-0.5 shrink-0">✕</span>
                      {f}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 pb-24">
        <h2 className="text-3xl font-bold text-center mb-10">Questions?</h2>
        <div className="space-y-6">
          {[
            {
              q: 'Do I need a credit card for the Free tier?',
              a: 'No. Free tier is completely free — no payment info required. Reading and Listening tests are yours forever.',
            },
            {
              q: 'Can I cancel anytime?',
              a: 'Yes. Cancel anytime from your dashboard — no questions asked, no lock-in period.',
            },
            {
              q: 'What payment methods do you accept?',
              a: 'Visa, Mastercard, and major global cards via Stripe. Payme and Click (Uzbek local payments) coming soon.',
            },
            {
              q: 'Will I lose my data if I downgrade?',
              a: 'No. All your essays, scores and history are saved permanently regardless of tier.',
            },
            {
              q: 'Is this platform halal / riba-free?',
              a: 'Yes. We charge a flat subscription fee for a service — no interest, no debt, no riba. Your subscription is for access to a tool, not a loan.',
            },
          ].map(({ q, a }) => (
            <div key={q} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="font-bold mb-2">{q}</h3>
              <p className="text-slate-400 text-sm">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
