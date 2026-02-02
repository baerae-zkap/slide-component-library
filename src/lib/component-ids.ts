// Static list of all component IDs for generateStaticParams
export const COMPONENT_IDS = [
  // comparison
  'feature-table', 'vs-layout', 'pricing-table', 'competitive-matrix', 'quadrant-chart', 'spectrum-scale',
  // traction
  'growth-timeline', 'logo-wall', 'traction-metrics', 'user-growth', 'revenue-growth', 'retention-chart', 'nps-score', 'press-mentions',
  // timeline
  'roadmap', 'milestone-list', 'quarterly-goals', 'achievement-timeline', 'funding-history', 'product-releases',
  // product-showcase
  'feature-grid', 'screenshot-frame', 'demo-layout', 'app-screens', 'tech-stack', 'integration-list', 'security-badges', 'platform-comparison', 'architecture-diagram', 'api-overview', 'feature-comparison', 'product-roadmap',
  // cover-divider
  'title-slide', 'section-divider', 'chapter-title', 'thank-you', 'contact-slide', 'agenda-slide', 'disclaimer-slide', 'appendix-header', 'quote-slide', 'key-takeaway', 'milestone-marker', 'chapter-intro',
  // risk-ask
  'risk-matrix', 'mitigation-plan', 'funding-ask', 'investment-highlights', 'next-milestones', 'contact-cta',
  // financials
  'cap-table', 'burn-rate', 'runway-chart', 'revenue-model', 'pl-summary', 'use-of-funds', 'financial-projections', 'unit-metrics',
  // flow-process
  'horizontal-flow', 'vertical-steps', 'circular-process', 'funnel', 'decision-tree', 'swim-lane', 'gantt-simple', 'user-flow', 'onboarding-flow', 'data-pipeline', 'integration-flow',
  // partnership
  'partner-logos', 'investor-list', 'client-logos', 'testimonial-card', 'case-study-card', 'logo-marquee', 'social-proof-stats',
  // ecosystem
  'hub-spoke', 'integration-map', 'value-chain', 'platform-overview', 'market-map', 'data-flow',
  // team
  'team-grid', 'advisor-row', 'founder-spotlight', 'hiring-positions', 'org-chart', 'team-stats', 'founder-story', 'team-growth', 'culture-values', 'hiring-plan',
  // business-model
  'pricing-tiers', 'revenue-streams', 'cost-structure', 'unit-economics-flow', 'monetization-model', 'market-sizing',
  // problem-solution
  'before-after', 'pain-points', 'solution-benefits', 'market-opportunity', 'market-trend', 'customer-journey', 'solution-pillars', 'value-proposition', 'competitive-landscape', 'status-quo', 'why-now', 'market-gap',
  // data-metrics
  'kpi-card', 'metric-grid', 'bar-chart', 'progress-ring', 'stat-comparison', 'pie-chart', 'line-chart', 'revenue-breakdown', 'unit-economics', 'growth-chart', 'waterfall-chart', 'gauge-meter', 'scorecard', 'heatmap-grid',
] as const;

export type ComponentId = typeof COMPONENT_IDS[number];
