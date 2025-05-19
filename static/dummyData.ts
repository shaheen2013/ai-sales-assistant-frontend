export interface SubscriptionResponse {
  subscription: {
    id: string;
    status: string;
    current_period_start: string;
    current_period_end: string;
    cancel_at_period_end: boolean;
  };
  subscription_type: string;
}

export const pricingPlans = [
  {
    id: 'prod_business_001',
    name: 'business',
    description: 'Optimized for small businesses with collaboration features.',
    prices: [
      {
        id: 'price_business_monthly',
        nickname: 'Monthly Plan',
        unit_amount: 1800,
        currency: 'usd',
        recurring: {
          meter: null,
          interval: 'month',
          interval_count: 1,
          usage_type: 'licensed',
          aggregate_usage: null,
          trial_period_days: null,
        },
      },
      {
        id: 'price_business_6months',
        nickname: '6-Month Plan',
        unit_amount: 10000,
        currency: 'usd',
        recurring: {
          meter: null,
          interval: 'month',
          interval_count: 6,
          usage_type: 'licensed',
          aggregate_usage: null,
          trial_period_days: null,
        },
      },
      {
        id: 'price_business_annual',
        nickname: 'Annual Plan',
        unit_amount: 18000,
        currency: 'usd',
        recurring: {
          meter: null,
          interval: 'year',
          interval_count: 1,
          usage_type: 'licensed',
          aggregate_usage: null,
          trial_period_days: null,
        },
      },
    ],
  },
  {
    id: 'prod_enterprise_001',
    name: 'enterprise',
    description: 'Full-scale solution with dedicated support and SLA.',
    prices: [
      {
        id: 'price_enterprise_monthly',
        nickname: 'Monthly Plan',
        unit_amount: 4000,
        currency: 'usd',
        recurring: {
          meter: null,
          interval: 'month',
          interval_count: 1,
          usage_type: 'licensed',
          aggregate_usage: null,
          trial_period_days: null,
        },
      },
      {
        id: 'price_enterprise_6months',
        nickname: '6-Month Plan',
        unit_amount: 22000,
        currency: 'usd',
        recurring: {
          meter: null,
          interval: 'month',
          interval_count: 6,
          usage_type: 'licensed',
          aggregate_usage: null,
          trial_period_days: null,
        },
      },
      {
        id: 'price_enterprise_annual',
        nickname: 'Annual Plan',
        unit_amount: 40000,
        currency: 'usd',
        recurring: {
          meter: null,
          interval: 'year',
          interval_count: 1,
          usage_type: 'licensed',
          aggregate_usage: null,
          trial_period_days: null,
        },
      },
    ],
  },
  {
    id: 'prod_student_001',
    name: 'student',
    description: 'Discounted plan for students with valid ID.',
    prices: [
      {
        id: 'price_student_monthly',
        nickname: 'Monthly Plan',
        unit_amount: 300,
        currency: 'usd',
        recurring: {
          meter: null,
          interval: 'month',
          interval_count: 1,
          usage_type: 'licensed',
          aggregate_usage: null,
          trial_period_days: null,
        },
      },
      {
        id: 'price_student_6months',
        nickname: '6-Month Plan',
        unit_amount: 1600,
        currency: 'usd',
        recurring: {
          meter: null,
          interval: 'month',
          interval_count: 6,
          usage_type: 'licensed',
          aggregate_usage: null,
          trial_period_days: null,
        },
      },
      {
        id: 'price_student_annual',
        nickname: 'Annual Plan',
        unit_amount: 3000,
        currency: 'usd',
        recurring: {
          meter: null,
          interval: 'year',
          interval_count: 1,
          usage_type: 'licensed',
          aggregate_usage: null,
          trial_period_days: null,
        },
      },
    ],
  },
  {
    id: 'prod_team_001',
    name: 'team',
    description: 'For teams with shared resources and collaboration tools.',
    prices: [
      {
        id: 'price_team_monthly',
        nickname: 'Monthly Plan',
        unit_amount: 900,
        currency: 'usd',
        recurring: {
          meter: null,
          interval: 'month',
          interval_count: 1,
          usage_type: 'licensed',
          aggregate_usage: null,
          trial_period_days: null,
        },
      },
      {
        id: 'price_team_6months',
        nickname: '6-Month Plan',
        unit_amount: 5000,
        currency: 'usd',
        recurring: {
          meter: null,
          interval: 'month',
          interval_count: 6,
          usage_type: 'licensed',
          aggregate_usage: null,
          trial_period_days: null,
        },
      },
      {
        id: 'price_team_annual',
        nickname: 'Annual Plan',
        unit_amount: 9000,
        currency: 'usd',
        recurring: {
          meter: null,
          interval: 'year',
          interval_count: 1,
          usage_type: 'licensed',
          aggregate_usage: null,
          trial_period_days: null,
        },
      },
    ],
  },
];

export const currentPlanResponse: SubscriptionResponse = {
  subscription: {
    id: 'prod_business_001',
    status: 'active',
    current_period_start: '2025-04-17T13:07:49Z',
    current_period_end: '2025-05-17T13:07:49Z',
    cancel_at_period_end: false,
  },
  subscription_type: 'basic',
};
