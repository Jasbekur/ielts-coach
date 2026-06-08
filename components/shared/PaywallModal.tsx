'use client';

import { useState } from 'react';
import Link from 'next/link';

interface PaywallModalProps {
  feature: string;
  requiredTier: 'starter' | 'elite' | 'premium';
  description?: string;
}

const TIER_INFO = {
  starter: {
    name: 'Starter',
    price: '$4.99/month',
    color: 'blue',
    emoji: '✍️',
  },
  elite: {
    name: 'Elite',
    price: '$12.99/month',
    color: 'red',
    emoji: '🎤',
  },
  premium: {
    name: 'Premium',
    price: '$29/month',
    color: 'purple',
    emoji: '🏆',
  },
};

export default function PaywallModal({ feature, requiredTier, description }: PaywallModalProps) {
  const info = TIER_INFO[requiredTier];

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-slate-900 border border-slate-700 rounded-2xl p-10 text-center">
        <div className="text-5xl mb-4">{info.emoji}</div>

        <h2 className="text-2xl font-bold mb-2">{feature} is a paid feature</h2>
        <p className="text-slate-400 text-sm mb-6">
          {description ??
            `Upgrade to ${info.name} to unlock ${feature} and take your IELTS score to the next level.`}
        </p>

        <div className="bg-slate-800 rounded-xl p-4 mb-6 text-left">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-3 font-semibold">
            {info.name} Plan — {info.price}
          </p>
          {requiredTier === 'starter' && (
            <ul className="space-y-2 text-sm text-slate-300">
              <li>✓ Writing Task 1 AI feedback</li>
              <li>✓ Writing Task 2 AI feedback</li>
              <li>✓ Unlimited essay submissions</li>
              <li>✓ All Free tier features</li>
            </ul>
          )}
          {requiredTier === 'elite' && (
            <ul className="space-y-2 text-sm text-slate-300">
              <li>✓ Speaking practice + band score</li>
              <li>✓ Full 4-skill mock tests</li>
              <li>✓ Band progression analytics</li>
              <li>✓ 30-day personalised study plan</li>
              <li>✓ 1 tutoring call/month</li>
              <li>✓ All Starter features</li>
            </ul>
          )}
          {requiredTier === 'premium' && (
            <ul className="space-y-2 text-sm text-slate-300">
              <li>✓ Unlimited 1-on-1 tutoring</li>
              <li>✓ Hand-corrected essays</li>
              <li>✓ Private Telegram support</li>
              <li>✓ All Elite features</li>
            </ul>
          )}
        </div>

        <Link
          href="/pricing"
          className="block w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition mb-3"
        >
          Upgrade to {info.name} — {info.price}
        </Link>

        <Link
          href="/dashboard"
          className="block text-sm text-slate-500 hover:text-slate-400 transition"
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
