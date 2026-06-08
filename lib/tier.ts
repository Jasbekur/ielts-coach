import { createServiceClient } from '@/lib/supabase/server';

export type Tier = 'free' | 'starter' | 'elite' | 'premium';

export interface TierFeatures {
  readingTests: number;
  listeningTests: number;
  writingFeedback: boolean;
  speakingPractice: boolean;
  fullMockTest: boolean;
  analytics: boolean;
  studyPlan: boolean;
  tutoringCallsPerMonth: number;
}

export const TIER_FEATURES: Record<Tier, TierFeatures> = {
  free: {
    readingTests: 50,
    listeningTests: 50,
    writingFeedback: false,
    speakingPractice: false,
    fullMockTest: false,
    analytics: false,
    studyPlan: false,
    tutoringCallsPerMonth: 0,
  },
  starter: {
    readingTests: 50,
    listeningTests: 50,
    writingFeedback: true,
    speakingPractice: false,
    fullMockTest: false,
    analytics: false,
    studyPlan: false,
    tutoringCallsPerMonth: 0,
  },
  elite: {
    readingTests: 50,
    listeningTests: 50,
    writingFeedback: true,
    speakingPractice: true,
    fullMockTest: true,
    analytics: true,
    studyPlan: true,
    tutoringCallsPerMonth: 1,
  },
  premium: {
    readingTests: 50,
    listeningTests: 50,
    writingFeedback: true,
    speakingPractice: true,
    fullMockTest: true,
    analytics: true,
    studyPlan: true,
    tutoringCallsPerMonth: 999,
  },
};

export async function checkTierAccess(
  userId: string
): Promise<{ tier: Tier; features: TierFeatures }> {
  const supabase = await createServiceClient();

  const { data: subscription } = await supabase
    .from('user_subscriptions')
    .select('tier, expires_at, status')
    .eq('user_id', userId)
    .eq('status', 'active')
    .order('expires_at', { ascending: false })
    .limit(1)
    .single();

  if (!subscription || new Date(subscription.expires_at) < new Date()) {
    return { tier: 'free', features: TIER_FEATURES.free };
  }

  const tier = subscription.tier as Tier;
  return { tier, features: TIER_FEATURES[tier] ?? TIER_FEATURES.free };
}

export async function canAccessFeature(
  userId: string,
  feature: keyof TierFeatures
): Promise<boolean> {
  const { features } = await checkTierAccess(userId);
  const value = features[feature];
  return value === true || (typeof value === 'number' && value > 0);
}
