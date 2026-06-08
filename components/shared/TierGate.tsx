import { createClient } from '@/lib/supabase/server';
import { checkTierAccess, TierFeatures } from '@/lib/tier';
import PaywallModal from './PaywallModal';

interface TierGateProps {
  feature: keyof TierFeatures;
  requiredTier: 'starter' | 'elite' | 'premium';
  featureLabel: string;
  description?: string;
  children: React.ReactNode;
}

export default async function TierGate({
  feature,
  requiredTier,
  featureLabel,
  description,
  children,
}: TierGateProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Not logged in — let the existing auth middleware handle it
  if (!user) return <>{children}</>;

  const { features } = await checkTierAccess(user.id);
  const hasAccess = features[feature] === true;

  if (!hasAccess) {
    return (
      <PaywallModal
        feature={featureLabel}
        requiredTier={requiredTier}
        description={description}
      />
    );
  }

  return <>{children}</>;
}
