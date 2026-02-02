import { registry } from '@/lib/registry';
import type { IRComponentMeta, IRComponentRenderResult, PPTXElement } from '@/types';
import { COLORS } from '@/lib/constants';

// Pricing Tiers Component - Pricing plans comparison (3 tiers)
const pricingTiersMeta: IRComponentMeta = {
  id: 'pricing-tiers',
  name: '가격 티어',
  category: 'business-model',
  description: '3단계 가격 정책 비교',
  defaultProps: {
    title: 'Pricing Tiers',
    tiers: [
      { name: 'Starter', price: '$29/mo', features: ['Up to 10 users', 'Basic analytics', 'Email support', '5GB storage'], highlighted: false },
      { name: 'Professional', price: '$99/mo', features: ['Up to 50 users', 'Advanced analytics', 'Priority support', '50GB storage', 'API access'], highlighted: true },
      { name: 'Enterprise', price: 'Custom', features: ['Unlimited users', 'Custom analytics', 'Dedicated support', 'Unlimited storage', 'SLA guarantee'], highlighted: false },
    ],
  },
  propSchema: {
    title: { type: 'string', label: '제목', default: 'Pricing Tiers' },
  },
};

function renderPricingTiers(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Pricing Tiers';
  const tiers = (props.tiers as Array<{name: string; price: string; features: string[]; highlighted?: boolean}>) || [];
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 9, h: 0.5, text: title, fontSize: 29, bold: true, color: COLORS.textPrimary },
  );

  // Tier cards
  const cardWidth = 2.8;
  const cardHeight = 4.2;
  const gapX = 0.4;
  const startX = (10 - (cardWidth * 3 + gapX * 2)) / 2;
  const startY = 1.1;

  tiers.slice(0, 3).forEach((tier, i) => {
    const x = startX + i * (cardWidth + gapX);
    const isHighlight = tier.highlighted;

    // Card background
    elements.push(
      { type: 'rect', x, y: startY, w: cardWidth, h: cardHeight, fill: isHighlight ? COLORS.accent : '#FFFFFF', line: { color: isHighlight ? COLORS.accent : COLORS.border, width: 3 } },
    );

    // Tier name
    elements.push(
      { type: 'text', x: x + 0.5, y: startY + 0.3, w: cardWidth - 0.4, h: 0.4, text: tier.name, fontSize: 16, bold: true, color: isHighlight ? '#FFFFFF' : COLORS.textPrimary, align: 'center' },
    );

    // Price
    elements.push(
      { type: 'text', x: x + 0.5, y: startY + 0.8, w: cardWidth - 0.4, h: 0.6, text: tier.price, fontSize: 48, bold: true, color: isHighlight ? '#FFFFFF' : COLORS.accent, align: 'center' },
    );

    // Divider
    elements.push(
      { type: 'line', x: x + 0.3, y: startY + 1.6, w: cardWidth - 0.6, h: 0, line: { color: isHighlight ? 'rgba(255,255,255,0.3)' : COLORS.border, width: 3 } },
    );

    // Features
    tier.features.slice(0, 5).forEach((feature, idx) => {
      const featureY = startY + 1.9 + idx * 0.45;
      elements.push(
        { type: 'text', x: x + 0.4, y: featureY, w: 0.2, h: 0.35, text: '•', fontSize: 14, color: isHighlight ? 'rgba(255,255,255,0.8)' : COLORS.textSecondary },
        { type: 'text', x: x + 0.4, y: featureY, w: cardWidth - 0.6, h: 0.35, text: feature, fontSize: 13, color: isHighlight ? 'rgba(255,255,255,0.9)' : COLORS.textPrimary },
      );
    });
  });

  return { elements, width: 10, height: 5.625 };
}

// Revenue Streams Component - Revenue diversification chart
const revenueStreamsMeta: IRComponentMeta = {
  id: 'revenue-streams',
  name: '수익 스트림',
  category: 'business-model',
  description: '수익원 다각화 시각화',
  defaultProps: {
    title: 'Revenue Streams',
    streams: [
      { name: 'Subscription Revenue', amount: '$2.4M', percentage: 60, growth: '+45%' },
      { name: 'Transaction Fees', amount: '$1.2M', percentage: 30, growth: '+32%' },
      { name: 'Professional Services', amount: '$400K', percentage: 10, growth: '+18%' },
    ],
    totalRevenue: '$4M ARR',
  },
  propSchema: {
    title: { type: 'string', label: '제목', default: 'Revenue Streams' },
  },
};

function renderRevenueStreams(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Revenue Streams';
  const streams = (props.streams as Array<{name: string; amount: string; percentage: number; growth?: string}>) || [];
  const totalRevenue = (props.totalRevenue as string) || '';
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 5, h: 0.5, text: title, fontSize: 29, bold: true, color: COLORS.textPrimary },
  );

  // Total revenue
  if (totalRevenue) {
    elements.push(
      { type: 'rect', x: 6.5, y: 0.3, w: 3, h: 0.9, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
      { type: 'text', x: 6.6, y: 0.4, w: 2.8, h: 0.25, text: 'Total Revenue', fontSize: 13, color: 'rgba(255,255,255,0.8)', align: 'center' },
      { type: 'text', x: 6.6, y: 0.7, w: 2.8, h: 0.4, text: totalRevenue, fontSize: 20, bold: true, color: '#FFFFFF', align: 'center' },
    );
  }

  // Horizontal stacked bar
  const barY = 1.5;
  const barHeight = 0.8;
  const barMaxWidth = 9;
  const colors = ['#6B7B3F', '#8A9B5C', '#A8B884'];

  let currentX = 0.5;
  streams.forEach((stream, i) => {
    const segWidth = (stream.percentage / 100) * barMaxWidth;
    elements.push(
      { type: 'rect', x: currentX, y: barY, w: segWidth, h: barHeight, fill: colors[i % colors.length], line: { color: colors[i % colors.length], width: 0 } },
    );
    if (segWidth > 0.6) {
      elements.push(
        { type: 'text', x: currentX, y: barY, w: segWidth, h: barHeight, text: `${stream.percentage}%`, fontSize: 14, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
      );
    }
    currentX += segWidth;
  });

  // Stream details
  const detailY = 2.7;
  const rowHeight = 0.85;

  streams.forEach((stream, i) => {
    const y = detailY + i * rowHeight;

    // Color indicator
    elements.push(
      { type: 'rect', x: 0.5, y: y + 0.15, w: 0.15, h: 0.5, fill: colors[i % colors.length], line: { color: colors[i % colors.length], width: 0 } },
    );

    // Stream name
    elements.push(
      { type: 'text', x: 0.8, y, w: 4, h: 0.4, text: stream.name, fontSize: 13, bold: true, color: COLORS.textPrimary },
    );

    // Amount
    elements.push(
      { type: 'text', x: 5.2, y, w: 1.8, h: 0.4, text: stream.amount, fontSize: 14, bold: true, color: colors[i % colors.length], align: 'right' },
    );

    // Percentage
    elements.push(
      { type: 'text', x: 7.2, y, w: 1, h: 0.4, text: `${stream.percentage}%`, fontSize: 12, color: COLORS.textSecondary, align: 'right' },
    );

    // Growth
    if (stream.growth) {
      elements.push(
        { type: 'text', x: 8.3, y, w: 1.2, h: 0.4, text: stream.growth, fontSize: 14, bold: true, color: COLORS.positive, align: 'right' },
      );
    }

    // Description
    elements.push(
      { type: 'text', x: 0.8, y: y + 0.4, w: 4, h: 0.3, text: `${stream.percentage}% of total revenue`, fontSize: 12, color: COLORS.textSecondary },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Cost Structure Component - Cost breakdown visualization
const costStructureMeta: IRComponentMeta = {
  id: 'cost-structure',
  name: '비용 구조',
  category: 'business-model',
  description: '비용 항목별 분석',
  defaultProps: {
    title: 'Cost Structure',
    costs: [
      { category: 'Personnel', amount: '$1.5M', percentage: 45, type: 'fixed' },
      { category: 'Infrastructure', amount: '$800K', percentage: 24, type: 'variable' },
      { category: 'Marketing & Sales', amount: '$600K', percentage: 18, type: 'variable' },
      { category: 'R&D', amount: '$300K', percentage: 9, type: 'fixed' },
      { category: 'Administrative', amount: '$133K', percentage: 4, type: 'fixed' },
    ],
    totalCosts: '$3.3M',
    fixedPercentage: 58,
  },
  propSchema: {
    title: { type: 'string', label: '제목', default: 'Cost Structure' },
  },
};

function renderCostStructure(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Cost Structure';
  const costs = (props.costs as Array<{category: string; amount: string; percentage: number; type?: string}>) || [];
  const totalCosts = (props.totalCosts as string) || '';
  const fixedPercentage = (props.fixedPercentage as number) || 0;
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 5, h: 0.5, text: title, fontSize: 29, bold: true, color: COLORS.textPrimary },
  );

  // Total and fixed/variable split
  elements.push(
    { type: 'rect', x: 6, y: 0.3, w: 1.7, h: 0.9, fill: COLORS.surface, line: { color: COLORS.border, width: 3 } },
    { type: 'text', x: 6.1, y: 0.4, w: 1.5, h: 0.25, text: 'Total', fontSize: 12, color: COLORS.textSecondary, align: 'center' },
    { type: 'text', x: 6.1, y: 0.65, w: 1.5, h: 0.4, text: totalCosts, fontSize: 16, bold: true, color: COLORS.textPrimary, align: 'center' },

    { type: 'rect', x: 7.8, y: 0.3, w: 1.7, h: 0.9, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    { type: 'text', x: 7.9, y: 0.4, w: 1.5, h: 0.25, text: 'Fixed', fontSize: 12, color: 'rgba(255,255,255,0.8)', align: 'center' },
    { type: 'text', x: 7.9, y: 0.65, w: 1.5, h: 0.4, text: `${fixedPercentage}%`, fontSize: 16, bold: true, color: '#FFFFFF', align: 'center' },
  );

  // Donut chart representation
  const centerX = 2.5;
  const centerY = 3.0;
  const outerRadius = 1.3;
  const innerRadius = 0.75;
  const colors = ['#6B7B3F', '#8A9B5C', '#A8B884', '#C4D4A0', '#D8E4B8'];

  // Outer circle
  elements.push(
    { type: 'ellipse', x: centerX - outerRadius, y: centerY - outerRadius, w: outerRadius * 2, h: outerRadius * 2, fill: COLORS.surface, line: { color: COLORS.border, width: 3 } },
  );

  // Segment indicators
  let currentAngle = -90;
  costs.forEach((cost, i) => {
    const segmentAngle = (cost.percentage / 100) * 360;
    const midAngle = (currentAngle + segmentAngle / 2) * (Math.PI / 180);
    const indicatorRadius = outerRadius * 0.7;
    const indicatorX = centerX + indicatorRadius * Math.cos(midAngle);
    const indicatorY = centerY + indicatorRadius * Math.sin(midAngle);

    elements.push(
      { type: 'ellipse', x: indicatorX - 0.18, y: indicatorY - 0.18, w: 0.36, h: 0.36, fill: colors[i % colors.length], line: { color: colors[i % colors.length], width: 0 } },
    );
    currentAngle += segmentAngle;
  });

  // Inner circle
  elements.push(
    { type: 'ellipse', x: centerX - innerRadius, y: centerY - innerRadius, w: innerRadius * 2, h: innerRadius * 2, fill: '#FFFFFF', line: { color: '#FFFFFF', width: 0 } },
  );

  // Legend on right
  const legendX = 5.2;
  const legendY = 1.5;
  const rowHeight = 0.8;

  costs.slice(0, 5).forEach((cost, i) => {
    const y = legendY + i * rowHeight;

    // Color bar
    elements.push(
      { type: 'rect', x: legendX, y: y + 0.1, w: 0.12, h: 0.55, fill: colors[i % colors.length], line: { color: colors[i % colors.length], width: 0 } },
    );

    // Category
    elements.push(
      { type: 'text', x: legendX + 0.25, y, w: 2.5, h: 0.35, text: cost.category, fontSize: 14, bold: true, color: COLORS.textPrimary },
    );

    // Amount and percentage
    elements.push(
      { type: 'text', x: legendX + 0.25, y: y + 0.35, w: 1.3, h: 0.3, text: cost.amount, fontSize: 12, bold: true, color: colors[i % colors.length] },
      { type: 'text', x: legendX + 1.6, y: y + 0.35, w: 0.8, h: 0.3, text: `(${cost.percentage}%)`, fontSize: 13, color: COLORS.textSecondary },
    );

    // Type badge
    if (cost.type) {
      const badgeColor = cost.type === 'fixed' ? COLORS.accent : COLORS.accentLight;
      elements.push(
        { type: 'rect', x: legendX + 2.6, y: y + 0.1, w: 0.8, h: 0.3, fill: badgeColor, line: { color: badgeColor, width: 0 } },
        { type: 'text', x: legendX + 2.6, y: y + 0.1, w: 0.8, h: 0.3, text: cost.type, fontSize: 12, color: '#FFFFFF', align: 'center', valign: 'middle' },
      );
    }
  });

  return { elements, width: 10, height: 5.625 };
}

// Unit Economics Flow Component - LTV/CAC visual flow
const unitEconomicsFlowMeta: IRComponentMeta = {
  id: 'unit-economics-flow',
  name: '유닛 이코노믹스',
  category: 'business-model',
  description: 'LTV/CAC 흐름 시각화',
  defaultProps: {
    title: 'Unit Economics',
    ltv: '$12,000',
    cac: '$2,000',
    ratio: '6:1',
    paybackMonths: 8,
    grossMargin: '78%',
    churnRate: '3%',
  },
  propSchema: {
    title: { type: 'string', label: '제목', default: 'Unit Economics' },
  },
};

function renderUnitEconomicsFlow(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Unit Economics';
  const ltv = (props.ltv as string) || '$12,000';
  const cac = (props.cac as string) || '$2,000';
  const ratio = (props.ratio as string) || '6:1';
  const paybackMonths = (props.paybackMonths as number) || 8;
  const grossMargin = (props.grossMargin as string) || '78%';
  const churnRate = (props.churnRate as string) || '3%';
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 9, h: 0.5, text: title, fontSize: 29, bold: true, color: COLORS.textPrimary },
  );

  // Flow diagram: CAC → Customer → LTV
  const flowY = 1.5;
  const boxWidth = 2.2;
  const boxHeight = 1.4;

  // CAC box
  elements.push(
    { type: 'rect', x: 0.8, y: flowY, w: boxWidth, h: boxHeight, fill: COLORS.surface, line: { color: COLORS.border, width: 3 } },
    { type: 'text', x: 0.9, y: flowY + 0.2, w: boxWidth - 0.2, h: 0.3, text: 'CAC', fontSize: 12, bold: true, color: COLORS.textSecondary, align: 'center' },
    { type: 'text', x: 0.9, y: flowY + 0.5, w: boxWidth - 0.2, h: 0.6, text: cac, fontSize: 42, bold: true, color: COLORS.negative, align: 'center' },
  );

  // Arrow 1
  elements.push(
    { type: 'text', x: 3.2, y: flowY + 0.5, w: 0.6, h: 0.6, text: '→', fontSize: 32, color: COLORS.border, align: 'center', valign: 'middle' },
  );

  // Customer box
  elements.push(
    { type: 'rect', x: 3.9, y: flowY, w: boxWidth, h: boxHeight, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    { type: 'text', x: 4.0, y: flowY + 0.2, w: boxWidth - 0.2, h: 0.3, text: 'Customer', fontSize: 12, bold: true, color: 'rgba(255,255,255,0.8)', align: 'center' },
    { type: 'text', x: 4.0, y: flowY + 0.5, w: boxWidth - 0.2, h: 0.6, text: ratio, fontSize: 48, bold: true, color: '#FFFFFF', align: 'center' },
  );

  // Arrow 2
  elements.push(
    { type: 'text', x: 6.3, y: flowY + 0.5, w: 0.6, h: 0.6, text: '→', fontSize: 32, color: COLORS.border, align: 'center', valign: 'middle' },
  );

  // LTV box
  elements.push(
    { type: 'rect', x: 7.0, y: flowY, w: boxWidth, h: boxHeight, fill: COLORS.surface, line: { color: COLORS.border, width: 3 } },
    { type: 'text', x: 7.1, y: flowY + 0.2, w: boxWidth - 0.2, h: 0.3, text: 'LTV', fontSize: 12, bold: true, color: COLORS.textSecondary, align: 'center' },
    { type: 'text', x: 7.1, y: flowY + 0.5, w: boxWidth - 0.2, h: 0.6, text: ltv, fontSize: 42, bold: true, color: COLORS.positive, align: 'center' },
  );

  // Supporting metrics below
  const metricsY = 3.3;
  const metricWidth = 2.8;
  const metricHeight = 1.1;
  const metricGap = 0.4;
  const startX = (10 - (metricWidth * 3 + metricGap * 2)) / 2;

  const metrics = [
    { label: 'Payback Period', value: `${paybackMonths} months`, color: COLORS.accent },
    { label: 'Gross Margin', value: grossMargin, color: COLORS.positive },
    { label: 'Monthly Churn', value: churnRate, color: COLORS.textSecondary },
  ];

  metrics.forEach((metric, i) => {
    const x = startX + i * (metricWidth + metricGap);

    elements.push(
      { type: 'rect', x, y: metricsY, w: metricWidth, h: metricHeight, fill: '#FFFFFF', line: { color: COLORS.border, width: 3 } },
      { type: 'text', x: x + 0.5, y: metricsY + 0.2, w: metricWidth - 0.4, h: 0.3, text: metric.label, fontSize: 13, color: COLORS.textSecondary, align: 'center' },
      { type: 'text', x: x + 0.5, y: metricsY + 0.5, w: metricWidth - 0.4, h: 0.5, text: metric.value, fontSize: 18, bold: true, color: metric.color, align: 'center' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Monetization Model Component - How company makes money
const monetizationModelMeta: IRComponentMeta = {
  id: 'monetization-model',
  name: '수익화 모델',
  category: 'business-model',
  description: '수익 창출 메커니즘',
  defaultProps: {
    title: 'Monetization Model',
    primaryModel: 'SaaS Subscription',
    description: 'Recurring monthly/annual subscriptions with tiered pricing',
    revenuePerUser: '$99/mo',
    steps: [
      { step: '1', label: 'Free Trial', description: '14-day trial with full features' },
      { step: '2', label: 'Conversion', description: 'User selects paid tier' },
      { step: '3', label: 'Recurring Revenue', description: 'Monthly/annual billing' },
      { step: '4', label: 'Expansion', description: 'Upsell to higher tiers' },
    ],
  },
  propSchema: {
    title: { type: 'string', label: '제목', default: 'Monetization Model' },
  },
};

function renderMonetizationModel(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Monetization Model';
  const primaryModel = (props.primaryModel as string) || 'SaaS Subscription';
  const description = (props.description as string) || '';
  const revenuePerUser = (props.revenuePerUser as string) || '';
  const steps = (props.steps as Array<{step: string; label: string; description: string}>) || [];
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 5, h: 0.5, text: title, fontSize: 29, bold: true, color: COLORS.textPrimary },
  );

  // Primary model card
  elements.push(
    { type: 'rect', x: 0.5, y: 1.1, w: 9, h: 1.2, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    { type: 'text', x: 0.7, y: 1.25, w: 6, h: 0.35, text: primaryModel, fontSize: 18, bold: true, color: '#FFFFFF' },
    { type: 'text', x: 0.7, y: 1.65, w: 6, h: 0.5, text: description, fontSize: 14, color: 'rgba(255,255,255,0.9)' },
  );

  // Revenue per user badge
  if (revenuePerUser) {
    elements.push(
      { type: 'rect', x: 7.2, y: 1.4, w: 2, h: 0.7, fill: 'rgba(255,255,255,0.2)', line: { color: 'rgba(255,255,255,0.2)', width: 0 } },
      { type: 'text', x: 7.3, y: 1.45, w: 1.8, h: 0.25, text: 'Avg Revenue', fontSize: 12, color: 'rgba(255,255,255,0.7)', align: 'center' },
      { type: 'text', x: 7.3, y: 1.7, w: 1.8, h: 0.3, text: revenuePerUser, fontSize: 16, bold: true, color: '#FFFFFF', align: 'center' },
    );
  }

  // Process steps
  const stepY = 2.6;
  const stepWidth = 2.1;
  const stepHeight = 2.3;
  const stepGap = 0.3;
  const totalWidth = stepWidth * 4 + stepGap * 3;
  const startX = (10 - totalWidth) / 2;

  steps.slice(0, 4).forEach((stepData, i) => {
    const x = startX + i * (stepWidth + stepGap);

    // Step card
    elements.push(
      { type: 'rect', x, y: stepY, w: stepWidth, h: stepHeight, fill: '#FFFFFF', line: { color: COLORS.border, width: 3 } },
    );

    // Step number circle
    elements.push(
      { type: 'ellipse', x: x + stepWidth / 2 - 0.25, y: stepY + 0.2, w: 0.5, h: 0.5, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
      { type: 'text', x: x + stepWidth / 2 - 0.25, y: stepY + 0.2, w: 0.5, h: 0.5, text: stepData.step, fontSize: 16, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
    );

    // Label
    elements.push(
      { type: 'text', x: x + 0.4, y: stepY + 0.85, w: stepWidth - 0.3, h: 0.4, text: stepData.label, fontSize: 12, bold: true, color: COLORS.textPrimary, align: 'center' },
    );

    // Description
    elements.push(
      { type: 'text', x: x + 0.4, y: stepY + 1.3, w: stepWidth - 0.3, h: 0.85, text: stepData.description, fontSize: 12, color: COLORS.textSecondary, align: 'center' },
    );

    // Arrow between steps
    if (i < steps.length - 1 && i < 3) {
      elements.push(
        { type: 'text', x: x + stepWidth + 0.05, y: stepY + 1, w: stepGap - 0.1, h: 0.4, text: '→', fontSize: 18, color: COLORS.border, align: 'center', valign: 'middle' },
      );
    }
  });

  return { elements, width: 10, height: 5.625 };
}

// Market Sizing Component - TAM/SAM/SOM visualization
const marketSizingMeta: IRComponentMeta = {
  id: 'market-sizing',
  name: '시장 규모',
  category: 'business-model',
  description: 'TAM/SAM/SOM 시각화',
  defaultProps: {
    title: 'Market Sizing',
    tam: { label: 'TAM', value: '$120B', description: 'Total Addressable Market' },
    sam: { label: 'SAM', value: '$35B', description: 'Serviceable Addressable Market' },
    som: { label: 'SOM', value: '$2.5B', description: 'Serviceable Obtainable Market' },
    targetYear: '2028',
    targetShare: '2%',
  },
  propSchema: {
    title: { type: 'string', label: '제목', default: 'Market Sizing' },
  },
};

function renderMarketSizing(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Market Sizing';
  const tam = (props.tam as {label: string; value: string; description: string}) || { label: 'TAM', value: '$120B', description: 'Total Addressable Market' };
  const sam = (props.sam as {label: string; value: string; description: string}) || { label: 'SAM', value: '$35B', description: 'Serviceable Addressable Market' };
  const som = (props.som as {label: string; value: string; description: string}) || { label: 'SOM', value: '$2.5B', description: 'Serviceable Obtainable Market' };
  const targetYear = (props.targetYear as string) || '2028';
  const targetShare = (props.targetShare as string) || '2%';
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 5, h: 0.5, text: title, fontSize: 29, bold: true, color: COLORS.textPrimary },
  );

  // Target info
  elements.push(
    { type: 'rect', x: 6.5, y: 0.3, w: 3, h: 0.9, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    { type: 'text', x: 6.6, y: 0.4, w: 2.8, h: 0.25, text: `${targetYear} Target`, fontSize: 13, color: 'rgba(255,255,255,0.8)', align: 'center' },
    { type: 'text', x: 6.6, y: 0.65, w: 2.8, h: 0.4, text: `${targetShare} of SOM`, fontSize: 16, bold: true, color: '#FFFFFF', align: 'center' },
  );

  // Concentric circles (funnel visualization)
  const centerX = 5;
  const centerY = 3.2;

  const markets = [
    { ...tam, radius: 2.2, color: COLORS.accentLight, opacity: 0.3 },
    { ...sam, radius: 1.5, color: COLORS.accent, opacity: 0.5 },
    { ...som, radius: 0.9, color: COLORS.accent, opacity: 1 },
  ];

  // Draw circles from largest to smallest
  markets.forEach((market) => {
    elements.push(
      { type: 'ellipse', x: centerX - market.radius, y: centerY - market.radius, w: market.radius * 2, h: market.radius * 2, fill: market.color, line: { color: market.color, width: 0 } },
    );
  });

  // Labels positioned around circles
  const labelPositions = [
    { x: 1.2, y: 2.0 }, // TAM - top left
    { x: 7.5, y: 2.5 }, // SAM - top right
    { x: 5, y: 4.5 },   // SOM - bottom center
  ];

  markets.forEach((market, idx) => {
    const pos = labelPositions[idx];
    const cardWidth = 2.2;
    const cardHeight = 1.1;

    elements.push(
      { type: 'rect', x: pos.x - cardWidth / 2, y: pos.y, w: cardWidth, h: cardHeight, fill: '#FFFFFF', line: { color: COLORS.border, width: 3 } },
      { type: 'text', x: pos.x - cardWidth / 2 + 0.1, y: pos.y + 0.15, w: cardWidth - 0.2, h: 0.25, text: market.label, fontSize: 14, bold: true, color: COLORS.textSecondary, align: 'center' },
      { type: 'text', x: pos.x - cardWidth / 2 + 0.1, y: pos.y + 0.4, w: cardWidth - 0.2, h: 0.35, text: market.value, fontSize: 20, bold: true, color: COLORS.accent, align: 'center' },
      { type: 'text', x: pos.x - cardWidth / 2 + 0.1, y: pos.y + 0.75, w: cardWidth - 0.2, h: 0.3, text: market.description, fontSize: 12, color: COLORS.textSecondary, align: 'center' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Register all components
registry.register(pricingTiersMeta, renderPricingTiers);
registry.register(revenueStreamsMeta, renderRevenueStreams);
registry.register(costStructureMeta, renderCostStructure);
registry.register(unitEconomicsFlowMeta, renderUnitEconomicsFlow);
registry.register(monetizationModelMeta, renderMonetizationModel);
registry.register(marketSizingMeta, renderMarketSizing);

export {
  pricingTiersMeta,
  revenueStreamsMeta,
  costStructureMeta,
  unitEconomicsFlowMeta,
  monetizationModelMeta,
  marketSizingMeta,
};
