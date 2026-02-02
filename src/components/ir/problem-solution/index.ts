import { registry } from '@/lib/registry';
import type { IRComponentMeta, IRComponentRenderResult, PPTXElement } from '@/types';
import { COLORS } from '@/lib/constants';

// Before-After Component - Clear visual transformation
const beforeAfterMeta: IRComponentMeta = {
  id: 'before-after',
  name: 'Before/After',
  category: 'problem-solution',
  description: 'Before와 After 비교 레이아웃',
  defaultProps: {
    beforeTitle: 'Before',
    beforeItems: [
      'Manual data entry',
      'Error-prone processes',
      'Hours of daily work',
      'Limited visibility',
    ],
    afterTitle: 'After',
    afterItems: [
      'Automated workflows',
      '99.9% accuracy',
      'Minutes, not hours',
      'Real-time insights',
    ],
  },
  propSchema: {},
};

function renderBeforeAfter(props: Record<string, unknown>): IRComponentRenderResult {
  const {
    beforeTitle,
    beforeItems,
    afterTitle,
    afterItems,
  } = props as {
    beforeTitle: string;
    beforeItems: string[];
    afterTitle: string;
    afterItems: string[];
  };

  const elements: PPTXElement[] = [];

  const sectionWidth = 4.2;
  const sectionHeight = 4.2;
  const leftX = 0.5;
  const rightX = 5.3;
  const topY = 0.7;

  // Before section (left) - Problem styling
  elements.push(
    // Background with subtle red tint
    { type: 'rect', x: leftX, y: topY, w: sectionWidth, h: sectionHeight, fill: '#FEF2F2', line: { color: '#FECACA', width: 2 } },
    // Red accent bar at top (0.25 → 0.5 inches)
    { type: 'rect', x: leftX, y: topY, w: sectionWidth, h: 0.5, fill: COLORS.negative, line: { color: COLORS.negative, width: 0 } },
    // Title (22 → 32pt)
    { type: 'text', x: leftX + 0.5, y: topY + 0.6, w: sectionWidth - 1.0, h: 0.6, text: beforeTitle, fontSize: 32, bold: true, color: COLORS.negative },
  );

  // Before items (spacing increased 50%)
  (beforeItems || []).forEach((item, i) => {
    const itemY = topY + 1.5 + i * 1.05;
    elements.push(
      // X icon (increased by 30%)
      { type: 'ellipse', x: leftX + 0.5, y: itemY + 0.05, w: 0.46, h: 0.46, fill: COLORS.negative, line: { color: COLORS.negative, width: 0 } },
      { type: 'text', x: leftX + 0.5, y: itemY + 0.05, w: 0.46, h: 0.46, text: '✕', fontSize: 16, color: '#FFFFFF', align: 'center', valign: 'middle' },
      // Item text (13 → 14pt, more prominent)
      { type: 'text', x: leftX + 1.15, y: itemY, w: sectionWidth - 1.55, h: 0.55, text: item, fontSize: 14, bold: true, color: COLORS.textPrimary, valign: 'middle' },
    );
  });

  // Center divider with arrow
  elements.push(
    { type: 'rect', x: 4.85, y: topY + sectionHeight / 2 - 0.4, w: 0.3, h: 0.8, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    { type: 'text', x: 4.7, y: topY + sectionHeight / 2 - 0.2, w: 0.6, h: 0.4, text: '→', fontSize: 20, color: '#FFFFFF', align: 'center', valign: 'middle' },
  );

  // After section (right) - Success styling
  elements.push(
    // Background with subtle green tint
    { type: 'rect', x: rightX, y: topY, w: sectionWidth, h: sectionHeight, fill: '#F0FDF4', line: { color: '#BBF7D0', width: 2 } },
    // Green accent bar at top (0.25 → 0.5 inches)
    { type: 'rect', x: rightX, y: topY, w: sectionWidth, h: 0.5, fill: COLORS.positive, line: { color: COLORS.positive, width: 0 } },
    // Title (22 → 32pt)
    { type: 'text', x: rightX + 0.5, y: topY + 0.6, w: sectionWidth - 1.0, h: 0.6, text: afterTitle, fontSize: 32, bold: true, color: COLORS.positive },
  );

  // After items (spacing increased 50%)
  (afterItems || []).forEach((item, i) => {
    const itemY = topY + 1.5 + i * 1.05;
    elements.push(
      // Check icon (increased by 30%)
      { type: 'ellipse', x: rightX + 0.5, y: itemY + 0.05, w: 0.46, h: 0.46, fill: COLORS.positive, line: { color: COLORS.positive, width: 0 } },
      { type: 'text', x: rightX + 0.5, y: itemY + 0.05, w: 0.46, h: 0.46, text: '✓', fontSize: 16, color: '#FFFFFF', align: 'center', valign: 'middle' },
      // Item text (13 → 14pt, more prominent)
      { type: 'text', x: rightX + 1.15, y: itemY, w: sectionWidth - 1.55, h: 0.55, text: item, fontSize: 14, bold: true, color: COLORS.textPrimary, valign: 'middle' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Pain Points Component - 3-column problem layout
const painPointsMeta: IRComponentMeta = {
  id: 'pain-points',
  name: '페인 포인트',
  category: 'problem-solution',
  description: '3가지 핵심 문제점',
  defaultProps: {
    title: 'Key Challenges',
    painPoints: [
      { icon: '⏱', title: 'Time-Consuming', description: 'Manual processes take hours of valuable time every day' },
      { icon: '💸', title: 'High Costs', description: 'Operational inefficiencies drain resources and budgets' },
      { icon: '⚠', title: 'Error-Prone', description: 'Human errors lead to costly mistakes and rework' },
    ],
  },
  propSchema: {
    title: { type: 'string', label: '제목', default: 'Key Challenges' },
  },
};

function renderPainPoints(props: Record<string, unknown>): IRComponentRenderResult {
  const { title, painPoints } = props as {
    title: string;
    painPoints: Array<{icon: string; title: string; description: string}>;
  };

  const elements: PPTXElement[] = [];

  // Main title (24 → 36pt section title)
  elements.push(
    { type: 'text', x: 0.5, y: 0.5, w: 9, h: 0.7, text: title, fontSize: 36, bold: true, color: COLORS.textPrimary },
    // Accent underline (0.25 → 0.5 inches)
    { type: 'rect', x: 0.5, y: 1.3, w: 2.0, h: 0.5, fill: COLORS.negative, line: { color: COLORS.negative, width: 0 } },
  );

  // Pain points in 3 columns (spacing increased 50%)
  const pointCount = Math.min((painPoints || []).length, 3);
  const cardWidth = 2.8;
  const gap = 0.45;
  const totalWidth = pointCount * cardWidth + (pointCount - 1) * gap;
  const startX = (10 - totalWidth) / 2;
  const startY = 2.2;
  const cardHeight = 3.4;

  (painPoints || []).slice(0, 3).forEach((point, i) => {
    const x = startX + i * (cardWidth + gap);

    // Card with problem indicator (padding 0.4-0.5 inches)
    elements.push(
      { type: 'rect', x, y: startY, w: cardWidth, h: cardHeight, fill: '#FFFFFF', line: { color: COLORS.border, width: 1 } },
      // Red top accent (0.25 → 0.5 inches)
      { type: 'rect', x, y: startY, w: cardWidth, h: 0.5, fill: COLORS.negative, line: { color: COLORS.negative, width: 0 } },
    );

    // Icon circle (increased by 30%)
    elements.push(
      { type: 'ellipse', x: x + cardWidth / 2 - 0.59, y: startY + 0.65, w: 1.17, h: 1.17, fill: '#FEF2F2', line: { color: '#FECACA', width: 2 } },
      { type: 'text', x: x + cardWidth / 2 - 0.59, y: startY + 0.65, w: 1.17, h: 1.17, text: point.icon, fontSize: 36, align: 'center', valign: 'middle' },
    );

    // Title (more prominent)
    elements.push(
      { type: 'text', x: x + 0.4, y: startY + 2.0, w: cardWidth - 0.8, h: 0.5, text: point.title, fontSize: 18, bold: true, color: COLORS.textPrimary, align: 'center', valign: 'middle' },
    );

    // Description (12 → 14pt, more prominent)
    elements.push(
      { type: 'text', x: x + 0.4, y: startY + 2.6, w: cardWidth - 0.8, h: 0.7, text: point.description, fontSize: 14, bold: true, color: COLORS.textSecondary, align: 'center', valign: 'top' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Solution Benefits Component - Professional benefits grid
const solutionBenefitsMeta: IRComponentMeta = {
  id: 'solution-benefits',
  name: '솔루션 혜택',
  category: 'problem-solution',
  description: '솔루션의 핵심 혜택',
  defaultProps: {
    title: 'Why Choose Us',
    benefits: [
      { icon: '⚡', title: '10x Faster', description: 'Automate repetitive tasks and accelerate workflows' },
      { icon: '💰', title: '60% Cost Reduction', description: 'Reduce operational costs with intelligent automation' },
      { icon: '🛡', title: 'Enterprise Security', description: 'Bank-grade encryption and SOC 2 compliance' },
      { icon: '📈', title: 'Scalable', description: 'Grows seamlessly with your business needs' },
    ],
  },
  propSchema: {
    title: { type: 'string', label: '제목', default: 'Why Choose Us' },
  },
};

function renderSolutionBenefits(props: Record<string, unknown>): IRComponentRenderResult {
  const { title, benefits } = props as {
    title: string;
    benefits: Array<{icon: string; title: string; description: string}>;
  };

  const elements: PPTXElement[] = [];

  // Main title (24 → 36pt section title)
  elements.push(
    { type: 'text', x: 0.5, y: 0.5, w: 9, h: 0.7, text: title, fontSize: 36, bold: true, color: COLORS.textPrimary },
    // Accent underline (0.25 → 0.5 inches)
    { type: 'rect', x: 0.5, y: 1.3, w: 2.0, h: 0.5, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
  );

  // Benefits in 2x2 grid (spacing increased 50%)
  const cardWidth = 4.2;
  const cardHeight = 2.0;
  const gapX = 0.6;
  const gapY = 0.53;
  const startX = (10 - (cardWidth * 2 + gapX)) / 2;
  const startY = 2.2;

  (benefits || []).slice(0, 4).forEach((benefit, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = startX + col * (cardWidth + gapX);
    const y = startY + row * (cardHeight + gapY);

    // Card background with accent border (padding 0.4-0.5 inches)
    elements.push(
      { type: 'rect', x, y, w: cardWidth, h: cardHeight, fill: '#FFFFFF', line: { color: COLORS.accent, width: 2 } },
    );

    // Icon circle (increased by 30%)
    elements.push(
      { type: 'ellipse', x: x + 0.4, y: y + 0.4, w: 0.91, h: 0.91, fill: COLORS.surface, line: { color: COLORS.accent, width: 2 } },
      { type: 'text', x: x + 0.4, y: y + 0.4, w: 0.91, h: 0.91, text: benefit.icon, fontSize: 29, align: 'center', valign: 'middle' },
    );

    // Title (more prominent)
    elements.push(
      { type: 'text', x: x + 1.45, y: y + 0.45, w: cardWidth - 1.8, h: 0.5, text: benefit.title, fontSize: 17, bold: true, color: COLORS.textPrimary, valign: 'middle' },
    );

    // Description (11 → 14pt, more prominent)
    elements.push(
      { type: 'text', x: x + 1.45, y: y + 1.05, w: cardWidth - 1.8, h: 0.8, text: benefit.description, fontSize: 14, bold: true, color: COLORS.textSecondary, valign: 'top' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Market Opportunity Component - TAM/SAM/SOM visualization
const marketOpportunityMeta: IRComponentMeta = {
  id: 'market-opportunity',
  name: '시장 기회',
  category: 'problem-solution',
  description: '시장 규모 / TAM 시각화',
  defaultProps: {
    title: 'Market Opportunity',
    tam: { label: 'TAM', value: '$50B', description: 'Total Addressable Market' },
    sam: { label: 'SAM', value: '$15B', description: 'Serviceable Available Market' },
    som: { label: 'SOM', value: '$3B', description: 'Serviceable Obtainable Market' },
    note: 'Growing at 25% CAGR',
  },
  propSchema: {},
};

function renderMarketOpportunity(props: Record<string, unknown>): IRComponentRenderResult {
  const { title, tam, sam, som, note } = props as {
    title: string;
    tam: { label: string; value: string; description: string };
    sam: { label: string; value: string; description: string };
    som: { label: string; value: string; description: string };
    note?: string;
  };

  const elements: PPTXElement[] = [];

  // Title (24 → 36pt section title)
  elements.push(
    { type: 'text', x: 0.5, y: 0.5, w: 9, h: 0.7, text: title, fontSize: 36, bold: true, color: COLORS.textPrimary },
    // Accent underline (0.25 → 0.5 inches)
    { type: 'rect', x: 0.5, y: 1.3, w: 2.0, h: 0.5, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
  );

  // Concentric circles for TAM/SAM/SOM
  const centerX = 5.8;
  const centerY = 3.2;

  // TAM (largest circle)
  const tamRadius = 1.9;
  elements.push(
    { type: 'ellipse', x: centerX - tamRadius, y: centerY - tamRadius, w: tamRadius * 2, h: tamRadius * 2, fill: COLORS.accentLight, line: { color: COLORS.accent, width: 2 } },
  );

  // SAM (medium circle)
  const samRadius = 1.25;
  elements.push(
    { type: 'ellipse', x: centerX - samRadius, y: centerY - samRadius, w: samRadius * 2, h: samRadius * 2, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
  );

  // SOM (smallest circle)
  const somRadius = 0.65;
  elements.push(
    { type: 'ellipse', x: centerX - somRadius, y: centerY - somRadius, w: somRadius * 2, h: somRadius * 2, fill: '#4A5A2F', line: { color: '#4A5A2F', width: 0 } },
  );

  // Legend on the left
  const legendX = 0.6;
  const legendY = 1.6;
  const legendItems = [
    { ...tam, color: COLORS.accentLight, border: COLORS.accent },
    { ...sam, color: COLORS.accent, border: COLORS.accent },
    { ...som, color: '#4A5A2F', border: '#4A5A2F' },
  ];

  legendItems.forEach((item, i) => {
    const y = legendY + i * 1.2;

    // Color indicator
    elements.push(
      { type: 'rect', x: legendX, y: y + 0.05, w: 0.35, h: 0.35, fill: item.color, line: { color: item.border, width: 1 } },
    );

    // Label and value
    elements.push(
      { type: 'text', x: legendX + 0.5, y: y, w: 1, h: 0.3, text: item.label, fontSize: 11, bold: true, color: COLORS.textSecondary },
      { type: 'text', x: legendX + 0.5, y: y + 0.3, w: 1.5, h: 0.4, text: item.value, fontSize: 22, bold: true, color: COLORS.textPrimary },
      { type: 'text', x: legendX + 0.5, y: y + 0.75, w: 2.8, h: 0.3, text: item.description, fontSize: 10, color: COLORS.textSecondary },
    );
  });

  // Note at bottom
  if (note) {
    elements.push(
      { type: 'text', x: 0.6, y: 4.9, w: 3.5, h: 0.35, text: note, fontSize: 12, bold: true, color: COLORS.accent },
    );
  }

  return { elements, width: 10, height: 5.625 };
}

// Market Trend Component - Trend visualization with data points
const marketTrendMeta: IRComponentMeta = {
  id: 'market-trend',
  name: '시장 트렌드',
  category: 'problem-solution',
  description: '시장 트렌드 시각화',
  defaultProps: {
    title: 'Market Trends',
    subtitle: 'Key shifts driving industry transformation',
    trends: [
      { label: 'Digital Adoption', value: '+85%', description: 'YoY growth in enterprise digital tools' },
      { label: 'Remote Work', value: '73%', description: 'of companies adopting hybrid models' },
      { label: 'AI Integration', value: '4.2x', description: 'increase in AI-powered solutions' },
      { label: 'Cloud Spending', value: '$500B', description: 'projected market size by 2025' },
    ],
  },
  propSchema: {
    title: { type: 'string', label: '제목', default: 'Market Trends' },
  },
};

function renderMarketTrend(props: Record<string, unknown>): IRComponentRenderResult {
  const { title, subtitle, trends } = props as {
    title: string;
    subtitle?: string;
    trends: Array<{ label: string; value: string; description: string }>;
  };

  const elements: PPTXElement[] = [
    // Title (24 → 36pt section title)
    { type: 'text', x: 0.5, y: 0.5, w: 9, h: 0.7, text: title, fontSize: 36, bold: true, color: COLORS.textPrimary },
    // Accent underline (0.25 → 0.5 inches)
    { type: 'rect', x: 0.5, y: 1.3, w: 2.0, h: 0.5, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
  ];

  // Subtitle (12 → 14pt)
  if (subtitle) {
    elements.push(
      { type: 'text', x: 0.5, y: 1.9, w: 9, h: 0.4, text: subtitle, fontSize: 14, color: COLORS.textSecondary },
    );
  }

  // Trend cards in 2x2 grid (spacing increased 50%)
  const cardWidth = 4.2;
  const cardHeight = 1.8;
  const gapX = 0.6;
  const gapY = 0.45;
  const startX = (10 - (cardWidth * 2 + gapX)) / 2;
  const startY = 2.4;

  (trends || []).slice(0, 4).forEach((trend, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = startX + col * (cardWidth + gapX);
    const y = startY + row * (cardHeight + gapY);

    // Card background (padding 0.4-0.5 inches)
    elements.push(
      { type: 'rect', x, y, w: cardWidth, h: cardHeight, fill: '#FFFFFF', line: { color: COLORS.border, width: 1 } },
      // Top accent line (0.25 → 0.5 inches)
      { type: 'rect', x, y, w: cardWidth, h: 0.5, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    );

    // Trend value (large, 28 → 32pt)
    elements.push(
      { type: 'text', x: x + 0.4, y: y + 0.6, w: 2.0, h: 0.7, text: trend.value, fontSize: 32, bold: true, color: COLORS.accent, valign: 'middle' },
    );

    // Trend label (13 → 14pt, more prominent)
    elements.push(
      { type: 'text', x: x + 0.4, y: y + 1.05, w: cardWidth - 0.8, h: 0.35, text: trend.label, fontSize: 14, bold: true, color: COLORS.textPrimary },
    );

    // Description (10 → 14pt, more prominent)
    elements.push(
      { type: 'text', x: x + 0.4, y: y + 1.4, w: cardWidth - 0.8, h: 0.35, text: trend.description, fontSize: 14, bold: true, color: COLORS.textSecondary },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Customer Journey Component - Horizontal stages with touchpoints
const customerJourneyMeta: IRComponentMeta = {
  id: 'customer-journey',
  name: '고객 여정',
  category: 'problem-solution',
  description: '고객 여정 단계별 시각화',
  defaultProps: {
    title: 'Customer Journey',
    stages: [
      { name: 'Awareness', touchpoints: ['Social Media', 'Content Marketing', 'PR'] },
      { name: 'Consideration', touchpoints: ['Website', 'Demo Request', 'Case Studies'] },
      { name: 'Decision', touchpoints: ['Sales Call', 'Proposal', 'POC'] },
      { name: 'Retention', touchpoints: ['Onboarding', 'Support', 'Success'] },
    ],
  },
  propSchema: {
    title: { type: 'string', label: '제목', default: 'Customer Journey' },
  },
};

function renderCustomerJourney(props: Record<string, unknown>): IRComponentRenderResult {
  const { title, stages } = props as {
    title: string;
    stages: Array<{ name: string; touchpoints: string[] }>;
  };

  const elements: PPTXElement[] = [
    // Title (22 → 36pt section title)
    { type: 'text', x: 0.5, y: 0.4, w: 9, h: 0.7, text: title, fontSize: 36, bold: true, color: COLORS.textPrimary },
    // Accent underline (0.25 → 0.5 inches)
    { type: 'rect', x: 0.5, y: 1.2, w: 2.0, h: 0.5, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
  ];

  const stageCount = Math.min((stages || []).length, 4);
  const stageWidth = 2.1;
  const gap = 0.38;
  const totalWidth = stageCount * stageWidth + (stageCount - 1) * gap;
  const startX = (10 - totalWidth) / 2;
  const stageY = 2.0;
  const stageHeight = 3.8;

  // Horizontal connector line
  elements.push(
    { type: 'rect', x: startX + stageWidth / 2, y: stageY + 0.6, w: totalWidth - stageWidth, h: 0.04, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
  );

  (stages || []).slice(0, 4).forEach((stage, i) => {
    const x = startX + i * (stageWidth + gap);

    // Stage circle
    elements.push(
      { type: 'ellipse', x: x + stageWidth / 2 - 0.35, y: stageY + 0.27, w: 0.7, h: 0.7, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
      { type: 'text', x: x + stageWidth / 2 - 0.35, y: stageY + 0.27, w: 0.7, h: 0.7, text: String(i + 1), fontSize: 18, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
    );

    // Stage name
    elements.push(
      { type: 'text', x: x, y: stageY + 1.1, w: stageWidth, h: 0.4, text: stage.name, fontSize: 14, bold: true, color: COLORS.textPrimary, align: 'center' },
    );

    // Stage card with touchpoints
    elements.push(
      { type: 'rect', x: x, y: stageY + 1.6, w: stageWidth, h: stageHeight - 1.6, fill: COLORS.surface, line: { color: COLORS.border, width: 1 } },
    );

    // Touchpoints (text more prominent)
    (stage.touchpoints || []).slice(0, 4).forEach((touchpoint, j) => {
      const tpY = stageY + 1.8 + j * 0.55;
      elements.push(
        { type: 'ellipse', x: x + 0.2, y: tpY + 0.12, w: 0.2, h: 0.2, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
        { type: 'text', x: x + 0.5, y: tpY, w: stageWidth - 0.7, h: 0.45, text: touchpoint, fontSize: 11, bold: true, color: COLORS.textSecondary, valign: 'middle' },
      );
    });
  });

  return { elements, width: 10, height: 5.625 };
}

// Solution Pillars Component - 3-4 vertical pillars with descriptions
const solutionPillarsMeta: IRComponentMeta = {
  id: 'solution-pillars',
  name: '솔루션 기둥',
  category: 'problem-solution',
  description: '솔루션의 핵심 기둥/축',
  defaultProps: {
    title: 'Our Solution Pillars',
    pillars: [
      { icon: '⚡', name: 'Speed', description: '10x faster deployment with automated workflows' },
      { icon: '🔒', name: 'Security', description: 'Enterprise-grade protection with SOC 2 compliance' },
      { icon: '📊', name: 'Analytics', description: 'Real-time insights and predictive modeling' },
      { icon: '🔗', name: 'Integration', description: 'Seamless connection with 200+ tools' },
    ],
  },
  propSchema: {
    title: { type: 'string', label: '제목', default: 'Our Solution Pillars' },
  },
};

function renderSolutionPillars(props: Record<string, unknown>): IRComponentRenderResult {
  const { title, pillars } = props as {
    title: string;
    pillars: Array<{ icon: string; name: string; description: string }>;
  };

  const elements: PPTXElement[] = [
    // Title (22 → 36pt section title)
    { type: 'text', x: 0.5, y: 0.4, w: 9, h: 0.7, text: title, fontSize: 36, bold: true, color: COLORS.textPrimary },
    // Accent underline (0.25 → 0.5 inches)
    { type: 'rect', x: 0.5, y: 1.2, w: 2.0, h: 0.5, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
  ];

  const pillarCount = Math.min((pillars || []).length, 4);
  const pillarWidth = 2.1;
  const gap = 0.38;
  const totalWidth = pillarCount * pillarWidth + (pillarCount - 1) * gap;
  const startX = (10 - totalWidth) / 2;
  const pillarY = 2.0;
  const pillarHeight = 3.9;

  (pillars || []).slice(0, 4).forEach((pillar, i) => {
    const x = startX + i * (pillarWidth + gap);

    // Pillar background (padding 0.4-0.5 inches)
    elements.push(
      { type: 'rect', x, y: pillarY, w: pillarWidth, h: pillarHeight, fill: '#FFFFFF', line: { color: COLORS.accent, width: 2 } },
      // Top accent (0.25 → 0.5 inches)
      { type: 'rect', x, y: pillarY, w: pillarWidth, h: 0.5, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    );

    // Icon circle (increased by 30%)
    elements.push(
      { type: 'ellipse', x: x + pillarWidth / 2 - 0.59, y: pillarY + 0.65, w: 1.17, h: 1.17, fill: COLORS.surface, line: { color: COLORS.accent, width: 2 } },
      { type: 'text', x: x + pillarWidth / 2 - 0.59, y: pillarY + 0.65, w: 1.17, h: 1.17, text: pillar.icon, fontSize: 36, align: 'center', valign: 'middle' },
    );

    // Pillar name (16 → 18pt, more prominent)
    elements.push(
      { type: 'text', x: x + 0.2, y: pillarY + 2.0, w: pillarWidth - 0.4, h: 0.5, text: pillar.name, fontSize: 18, bold: true, color: COLORS.textPrimary, align: 'center' },
    );

    // Horizontal line
    elements.push(
      { type: 'rect', x: x + 0.4, y: pillarY + 2.6, w: pillarWidth - 0.8, h: 0.03, fill: COLORS.border, line: { color: COLORS.border, width: 0 } },
    );

    // Description (11 → 14pt, more prominent)
    elements.push(
      { type: 'text', x: x + 0.4, y: pillarY + 2.75, w: pillarWidth - 0.8, h: 1.0, text: pillar.description, fontSize: 14, bold: true, color: COLORS.textSecondary, align: 'center', valign: 'top' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Value Proposition Component - Central value with benefit points
const valuePropositionMeta: IRComponentMeta = {
  id: 'value-proposition',
  name: '가치 제안',
  category: 'problem-solution',
  description: '핵심 가치 제안과 혜택',
  defaultProps: {
    title: 'Our Value Proposition',
    centralValue: 'Transform Your Business',
    centralDescription: 'The only platform that combines speed, security, and simplicity',
    benefits: [
      { label: 'Faster', value: '10x', description: 'Time to market' },
      { label: 'Cheaper', value: '60%', description: 'Cost reduction' },
      { label: 'Safer', value: '99.9%', description: 'Uptime SLA' },
      { label: 'Smarter', value: '5x', description: 'Productivity gain' },
    ],
  },
  propSchema: {
    title: { type: 'string', label: '제목', default: 'Our Value Proposition' },
  },
};

function renderValueProposition(props: Record<string, unknown>): IRComponentRenderResult {
  const { title, centralValue, centralDescription, benefits } = props as {
    title: string;
    centralValue: string;
    centralDescription: string;
    benefits: Array<{ label: string; value: string; description: string }>;
  };

  const elements: PPTXElement[] = [
    // Title (22 → 36pt section title)
    { type: 'text', x: 0.5, y: 0.4, w: 9, h: 0.7, text: title, fontSize: 36, bold: true, color: COLORS.textPrimary },
    // Accent underline (0.25 → 0.5 inches)
    { type: 'rect', x: 0.5, y: 1.2, w: 2.0, h: 0.5, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
  ];

  // Central value box (spacing increased)
  const centerX = 2.8;
  const centerY = 2.0;
  const centerW = 4.4;
  const centerH = 2.2;

  elements.push(
    { type: 'rect', x: centerX, y: centerY, w: centerW, h: centerH, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    // Central value (24 → 32pt)
    { type: 'text', x: centerX, y: centerY + 0.5, w: centerW, h: 0.7, text: centralValue, fontSize: 32, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
    // Description (12 → 14pt)
    { type: 'text', x: centerX + 0.4, y: centerY + 1.3, w: centerW - 0.8, h: 0.8, text: centralDescription, fontSize: 14, bold: true, color: 'rgba(255,255,255,0.95)', align: 'center', valign: 'top' },
  );

  // Benefit boxes around center (padding 0.4-0.5 inches)
  const benefitWidth = 2.0;
  const benefitHeight = 1.7;
  const benefitPositions = [
    { x: 0.4, y: 2.0 },              // Left
    { x: 7.6, y: 2.0 },              // Right
    { x: 1.5, y: 4.2 },              // Bottom left
    { x: 6.5, y: 4.2 },              // Bottom right
  ];

  (benefits || []).slice(0, 4).forEach((benefit, i) => {
    const pos = benefitPositions[i];

    elements.push(
      { type: 'rect', x: pos.x, y: pos.y, w: benefitWidth, h: benefitHeight, fill: '#FFFFFF', line: { color: COLORS.border, width: 1 } },
      // Value (26 → 32pt)
      { type: 'text', x: pos.x, y: pos.y + 0.2, w: benefitWidth, h: 0.6, text: benefit.value, fontSize: 32, bold: true, color: COLORS.accent, align: 'center', valign: 'middle' },
      // Label (14 → 16pt, more prominent)
      { type: 'text', x: pos.x, y: pos.y + 0.85, w: benefitWidth, h: 0.4, text: benefit.label, fontSize: 16, bold: true, color: COLORS.textPrimary, align: 'center' },
      // Description (10 → 14pt, more prominent)
      { type: 'text', x: pos.x + 0.2, y: pos.y + 1.25, w: benefitWidth - 0.4, h: 0.4, text: benefit.description, fontSize: 14, bold: true, color: COLORS.textSecondary, align: 'center' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Competitive Landscape Component - Market players overview
const competitiveLandscapeMeta: IRComponentMeta = {
  id: 'competitive-landscape',
  name: '경쟁 환경',
  category: 'problem-solution',
  description: '시장 경쟁자 분석 및 포지셔닝',
  defaultProps: {
    title: 'Competitive Landscape',
    xAxisLabel: 'Price',
    yAxisLabel: 'Capability',
    competitors: [
      { name: 'Legacy Corp', x: 0.2, y: 0.3, size: 'large' },
      { name: 'Startup A', x: 0.7, y: 0.4, size: 'small' },
      { name: 'Startup B', x: 0.5, y: 0.6, size: 'medium' },
      { name: 'Us', x: 0.8, y: 0.85, size: 'medium', highlight: true },
    ],
    insight: 'We offer superior capability at competitive pricing',
  },
  propSchema: {
    title: { type: 'string', label: '제목', default: 'Competitive Landscape' },
    xAxisLabel: { type: 'string', label: 'X축 라벨', default: 'Price' },
    yAxisLabel: { type: 'string', label: 'Y축 라벨', default: 'Capability' },
  },
};

function renderCompetitiveLandscape(props: Record<string, unknown>): IRComponentRenderResult {
  const { title, xAxisLabel, yAxisLabel, competitors, insight } = props as {
    title: string;
    xAxisLabel: string;
    yAxisLabel: string;
    competitors: Array<{ name: string; x: number; y: number; size: string; highlight?: boolean }>;
    insight?: string;
  };

  const elements: PPTXElement[] = [
    // Title
    { type: 'text', x: 0.5, y: 0.4, w: 9, h: 0.5, text: title, fontSize: 22, bold: true, color: COLORS.textPrimary },
    { type: 'rect', x: 0.5, y: 0.95, w: 1.2, h: 0.05, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
  ];

  // Chart area
  const chartX = 1.5;
  const chartY = 1.4;
  const chartW = 6.5;
  const chartH = 3.5;

  // Chart background
  elements.push(
    { type: 'rect', x: chartX, y: chartY, w: chartW, h: chartH, fill: COLORS.surface, line: { color: COLORS.border, width: 1 } },
  );

  // Axes
  elements.push(
    // Y axis
    { type: 'rect', x: chartX, y: chartY, w: 0.03, h: chartH, fill: COLORS.textSecondary, line: { color: COLORS.textSecondary, width: 0 } },
    // X axis
    { type: 'rect', x: chartX, y: chartY + chartH - 0.03, w: chartW, h: 0.03, fill: COLORS.textSecondary, line: { color: COLORS.textSecondary, width: 0 } },
  );

  // Axis labels
  elements.push(
    { type: 'text', x: chartX + chartW / 2 - 1, y: chartY + chartH + 0.1, w: 2, h: 0.35, text: xAxisLabel, fontSize: 11, color: COLORS.textSecondary, align: 'center' },
    { type: 'text', x: chartX - 1.1, y: chartY + chartH / 2 - 0.2, w: 1, h: 0.4, text: yAxisLabel, fontSize: 11, color: COLORS.textSecondary, align: 'right', valign: 'middle' },
  );

  // Competitor bubbles
  const sizeMap: Record<string, number> = { small: 0.5, medium: 0.7, large: 0.9 };

  (competitors || []).forEach((comp) => {
    const bubbleSize = sizeMap[comp.size] || 0.6;
    const cx = chartX + comp.x * chartW - bubbleSize / 2;
    const cy = chartY + (1 - comp.y) * chartH - bubbleSize / 2;
    const fillColor = comp.highlight ? COLORS.accent : COLORS.border;
    const textColor = comp.highlight ? '#FFFFFF' : COLORS.textPrimary;

    elements.push(
      { type: 'ellipse', x: cx, y: cy, w: bubbleSize, h: bubbleSize, fill: fillColor, line: { color: fillColor, width: 0 } },
      { type: 'text', x: cx, y: cy, w: bubbleSize, h: bubbleSize, text: comp.name, fontSize: 9, bold: true, color: textColor, align: 'center', valign: 'middle' },
    );
  });

  // Insight text
  if (insight) {
    elements.push(
      { type: 'text', x: 0.5, y: 5.1, w: 9, h: 0.35, text: insight, fontSize: 12, color: COLORS.textSecondary },
    );
  }

  return { elements, width: 10, height: 5.625 };
}

// Status Quo Component - Current state problems
const statusQuoMeta: IRComponentMeta = {
  id: 'status-quo',
  name: '현재 상황',
  category: 'problem-solution',
  description: '현재 상태의 문제점 분석',
  defaultProps: {
    title: 'The Status Quo',
    subtitle: 'How enterprises handle this today',
    problems: [
      { area: 'Process', issue: 'Manual, time-consuming workflows', impact: '40+ hours/week wasted' },
      { area: 'Technology', issue: 'Outdated legacy systems', impact: '$500K+ annual maintenance' },
      { area: 'People', issue: 'Skilled talent shortage', impact: '6+ month hiring cycles' },
      { area: 'Data', issue: 'Siloed information', impact: 'Poor decision quality' },
    ],
    conclusion: 'The current approach is unsustainable',
  },
  propSchema: {
    title: { type: 'string', label: '제목', default: 'The Status Quo' },
    subtitle: { type: 'string', label: '부제목', default: 'How enterprises handle this today' },
  },
};

function renderStatusQuo(props: Record<string, unknown>): IRComponentRenderResult {
  const { title, subtitle, problems, conclusion } = props as {
    title: string;
    subtitle?: string;
    problems: Array<{ area: string; issue: string; impact: string }>;
    conclusion?: string;
  };

  const elements: PPTXElement[] = [
    // Title
    { type: 'text', x: 0.5, y: 0.4, w: 9, h: 0.5, text: title, fontSize: 22, bold: true, color: COLORS.textPrimary },
    { type: 'rect', x: 0.5, y: 0.95, w: 1.2, h: 0.05, fill: COLORS.negative, line: { color: COLORS.negative, width: 0 } },
  ];

  if (subtitle) {
    elements.push(
      { type: 'text', x: 0.5, y: 1.1, w: 9, h: 0.35, text: subtitle, fontSize: 12, color: COLORS.textSecondary },
    );
  }

  // Problem rows
  const startY = 1.6;
  const rowHeight = 0.85;

  (problems || []).slice(0, 4).forEach((problem, i) => {
    const y = startY + i * rowHeight;

    // Area label (left column)
    elements.push(
      { type: 'rect', x: 0.5, y: y, w: 1.8, h: 0.7, fill: '#FEF2F2', line: { color: '#FECACA', width: 1 } },
      { type: 'text', x: 0.5, y: y, w: 1.8, h: 0.7, text: problem.area, fontSize: 12, bold: true, color: COLORS.negative, align: 'center', valign: 'middle' },
    );

    // Issue (middle column)
    elements.push(
      { type: 'rect', x: 2.4, y: y, w: 4.2, h: 0.7, fill: '#FFFFFF', line: { color: COLORS.border, width: 1 } },
      { type: 'text', x: 2.6, y: y, w: 4.0, h: 0.7, text: problem.issue, fontSize: 12, color: COLORS.textPrimary, valign: 'middle' },
    );

    // Impact (right column)
    elements.push(
      { type: 'rect', x: 6.7, y: y, w: 2.8, h: 0.7, fill: COLORS.surface, line: { color: COLORS.border, width: 1 } },
      { type: 'text', x: 6.85, y: y, w: 2.6, h: 0.7, text: problem.impact, fontSize: 11, bold: true, color: COLORS.negative, valign: 'middle' },
    );
  });

  // Conclusion
  if (conclusion) {
    elements.push(
      { type: 'rect', x: 0.5, y: 5.0, w: 9, h: 0.45, fill: '#FEF2F2', line: { color: COLORS.negative, width: 2 } },
      { type: 'text', x: 0.5, y: 5.0, w: 9, h: 0.45, text: conclusion, fontSize: 13, bold: true, color: COLORS.negative, align: 'center', valign: 'middle' },
    );
  }

  return { elements, width: 10, height: 5.625 };
}

// Why Now Component - Market timing justification
const whyNowMeta: IRComponentMeta = {
  id: 'why-now',
  name: '왜 지금',
  category: 'problem-solution',
  description: '시장 타이밍 정당화',
  defaultProps: {
    title: 'Why Now?',
    subtitle: 'Market conditions have aligned for disruption',
    drivers: [
      { icon: '📱', title: 'Technology Shift', description: 'Cloud and AI have matured enough for enterprise adoption' },
      { icon: '💼', title: 'Market Demand', description: 'Enterprises actively seeking modern solutions' },
      { icon: '📊', title: 'Regulatory Change', description: 'New compliance requirements driving urgency' },
      { icon: '🌍', title: 'Global Trends', description: 'Remote work has accelerated digital transformation' },
    ],
    conclusion: 'The window of opportunity is now',
  },
  propSchema: {
    title: { type: 'string', label: '제목', default: 'Why Now?' },
    subtitle: { type: 'string', label: '부제목', default: 'Market conditions have aligned for disruption' },
  },
};

function renderWhyNow(props: Record<string, unknown>): IRComponentRenderResult {
  const { title, subtitle, drivers, conclusion } = props as {
    title: string;
    subtitle?: string;
    drivers: Array<{ icon: string; title: string; description: string }>;
    conclusion?: string;
  };

  const elements: PPTXElement[] = [
    // Title
    { type: 'text', x: 0.5, y: 0.4, w: 9, h: 0.5, text: title, fontSize: 22, bold: true, color: COLORS.textPrimary },
    { type: 'rect', x: 0.5, y: 0.95, w: 1.2, h: 0.05, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
  ];

  if (subtitle) {
    elements.push(
      { type: 'text', x: 0.5, y: 1.1, w: 9, h: 0.35, text: subtitle, fontSize: 12, color: COLORS.textSecondary },
    );
  }

  // Driver cards in 2x2 grid
  const cardWidth = 4.2;
  const cardHeight = 1.5;
  const gapX = 0.4;
  const gapY = 0.3;
  const startX = (10 - (cardWidth * 2 + gapX)) / 2;
  const startY = 1.6;

  (drivers || []).slice(0, 4).forEach((driver, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = startX + col * (cardWidth + gapX);
    const y = startY + row * (cardHeight + gapY);

    // Card background
    elements.push(
      { type: 'rect', x, y, w: cardWidth, h: cardHeight, fill: '#FFFFFF', line: { color: COLORS.accent, width: 2 } },
      // Left accent bar
      { type: 'rect', x, y, w: 0.08, h: cardHeight, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    );

    // Icon
    elements.push(
      { type: 'text', x: x + 0.25, y: y + 0.2, w: 0.6, h: 0.6, text: driver.icon, fontSize: 24, valign: 'middle' },
    );

    // Title
    elements.push(
      { type: 'text', x: x + 0.9, y: y + 0.25, w: cardWidth - 1.1, h: 0.4, text: driver.title, fontSize: 14, bold: true, color: COLORS.textPrimary, valign: 'middle' },
    );

    // Description
    elements.push(
      { type: 'text', x: x + 0.9, y: y + 0.75, w: cardWidth - 1.1, h: 0.6, text: driver.description, fontSize: 11, color: COLORS.textSecondary, valign: 'top' },
    );
  });

  // Conclusion
  if (conclusion) {
    elements.push(
      { type: 'rect', x: 2.5, y: 4.9, w: 5, h: 0.5, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
      { type: 'text', x: 2.5, y: 4.9, w: 5, h: 0.5, text: conclusion, fontSize: 14, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
    );
  }

  return { elements, width: 10, height: 5.625 };
}

// Market Gap Component - Gap/opportunity visualization
const marketGapMeta: IRComponentMeta = {
  id: 'market-gap',
  name: '시장 갭',
  category: 'problem-solution',
  description: '시장 갭 및 기회 시각화',
  defaultProps: {
    title: 'The Market Gap',
    subtitle: 'A clear opportunity exists',
    currentState: {
      label: 'Current Solutions',
      items: ['Complex implementation', 'High total cost', 'Poor user experience', 'Limited scalability'],
    },
    desiredState: {
      label: 'Customer Needs',
      items: ['Easy deployment', 'Affordable pricing', 'Intuitive interface', 'Enterprise scale'],
    },
    gapLabel: 'THE GAP',
    ourSolution: 'Our platform bridges this gap',
  },
  propSchema: {
    title: { type: 'string', label: '제목', default: 'The Market Gap' },
    gapLabel: { type: 'string', label: '갭 라벨', default: 'THE GAP' },
  },
};

function renderMarketGap(props: Record<string, unknown>): IRComponentRenderResult {
  const { title, subtitle, currentState, desiredState, gapLabel, ourSolution } = props as {
    title: string;
    subtitle?: string;
    currentState: { label: string; items: string[] };
    desiredState: { label: string; items: string[] };
    gapLabel: string;
    ourSolution?: string;
  };

  const elements: PPTXElement[] = [
    // Title
    { type: 'text', x: 0.5, y: 0.4, w: 9, h: 0.5, text: title, fontSize: 22, bold: true, color: COLORS.textPrimary },
    { type: 'rect', x: 0.5, y: 0.95, w: 1.2, h: 0.05, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
  ];

  if (subtitle) {
    elements.push(
      { type: 'text', x: 0.5, y: 1.1, w: 9, h: 0.35, text: subtitle, fontSize: 12, color: COLORS.textSecondary },
    );
  }

  const columnWidth = 3.2;
  const columnHeight = 3.2;
  const leftX = 0.6;
  const rightX = 6.2;
  const columnY = 1.6;

  // Current state (left) - problem styling
  elements.push(
    { type: 'rect', x: leftX, y: columnY, w: columnWidth, h: columnHeight, fill: '#FEF2F2', line: { color: '#FECACA', width: 2 } },
    { type: 'rect', x: leftX, y: columnY, w: columnWidth, h: 0.08, fill: COLORS.negative, line: { color: COLORS.negative, width: 0 } },
    { type: 'text', x: leftX + 0.3, y: columnY + 0.25, w: columnWidth - 0.6, h: 0.4, text: currentState.label, fontSize: 14, bold: true, color: COLORS.negative },
  );

  (currentState.items || []).slice(0, 4).forEach((item, i) => {
    const y = columnY + 0.8 + i * 0.55;
    elements.push(
      { type: 'text', x: leftX + 0.3, y, w: 0.25, h: 0.4, text: '✕', fontSize: 12, color: COLORS.negative, valign: 'middle' },
      { type: 'text', x: leftX + 0.6, y, w: columnWidth - 0.9, h: 0.4, text: item, fontSize: 11, color: COLORS.textPrimary, valign: 'middle' },
    );
  });

  // Desired state (right) - success styling
  elements.push(
    { type: 'rect', x: rightX, y: columnY, w: columnWidth, h: columnHeight, fill: '#F0FDF4', line: { color: '#BBF7D0', width: 2 } },
    { type: 'rect', x: rightX, y: columnY, w: columnWidth, h: 0.08, fill: COLORS.positive, line: { color: COLORS.positive, width: 0 } },
    { type: 'text', x: rightX + 0.3, y: columnY + 0.25, w: columnWidth - 0.6, h: 0.4, text: desiredState.label, fontSize: 14, bold: true, color: COLORS.positive },
  );

  (desiredState.items || []).slice(0, 4).forEach((item, i) => {
    const y = columnY + 0.8 + i * 0.55;
    elements.push(
      { type: 'text', x: rightX + 0.3, y, w: 0.25, h: 0.4, text: '✓', fontSize: 12, color: COLORS.positive, valign: 'middle' },
      { type: 'text', x: rightX + 0.6, y, w: columnWidth - 0.9, h: 0.4, text: item, fontSize: 11, color: COLORS.textPrimary, valign: 'middle' },
    );
  });

  // Gap indicator in center
  const gapX = 3.9;
  const gapW = 2.2;
  elements.push(
    // Gap box
    { type: 'rect', x: gapX, y: columnY + 0.8, w: gapW, h: 1.6, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    { type: 'text', x: gapX, y: columnY + 1.3, w: gapW, h: 0.6, text: gapLabel, fontSize: 14, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
    // Arrows
    { type: 'text', x: gapX - 0.4, y: columnY + 1.4, w: 0.4, h: 0.4, text: '←', fontSize: 18, color: COLORS.accent, align: 'center', valign: 'middle' },
    { type: 'text', x: gapX + gapW, y: columnY + 1.4, w: 0.4, h: 0.4, text: '→', fontSize: 18, color: COLORS.accent, align: 'center', valign: 'middle' },
  );

  // Our solution text
  if (ourSolution) {
    elements.push(
      { type: 'rect', x: gapX - 0.3, y: columnY + 2.6, w: gapW + 0.6, h: 0.5, fill: COLORS.surface, line: { color: COLORS.accent, width: 2 } },
      { type: 'text', x: gapX - 0.3, y: columnY + 2.6, w: gapW + 0.6, h: 0.5, text: ourSolution, fontSize: 10, bold: true, color: COLORS.accent, align: 'center', valign: 'middle' },
    );
  }

  return { elements, width: 10, height: 5.625 };
}

// Register components
registry.register(beforeAfterMeta, renderBeforeAfter);
registry.register(painPointsMeta, renderPainPoints);
registry.register(solutionBenefitsMeta, renderSolutionBenefits);
registry.register(marketOpportunityMeta, renderMarketOpportunity);
registry.register(marketTrendMeta, renderMarketTrend);
registry.register(customerJourneyMeta, renderCustomerJourney);
registry.register(solutionPillarsMeta, renderSolutionPillars);
registry.register(valuePropositionMeta, renderValueProposition);
registry.register(competitiveLandscapeMeta, renderCompetitiveLandscape);
registry.register(statusQuoMeta, renderStatusQuo);
registry.register(whyNowMeta, renderWhyNow);
registry.register(marketGapMeta, renderMarketGap);

export { beforeAfterMeta, painPointsMeta, solutionBenefitsMeta, marketOpportunityMeta, marketTrendMeta, customerJourneyMeta, solutionPillarsMeta, valuePropositionMeta, competitiveLandscapeMeta, statusQuoMeta, whyNowMeta, marketGapMeta };
