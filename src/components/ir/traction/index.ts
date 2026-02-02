import { registry } from '@/lib/registry';
import type { IRComponentMeta, IRComponentRenderResult, PPTXElement } from '@/types';
import { COLORS } from '@/lib/constants';

// Growth Timeline Component - Key milestones with metrics at each point
const growthTimelineMeta: IRComponentMeta = {
  id: 'growth-timeline',
  name: '성장 타임라인',
  category: 'traction',
  description: '주요 마일스톤과 각 시점의 지표',
  defaultProps: {
    title: 'Growth Journey',
    milestones: [
      { date: '2022', metric: '10K', metricLabel: 'Users', event: 'Product Launch' },
      { date: '2023 Q1', metric: '50K', metricLabel: 'Users', event: 'Series A' },
      { date: '2023 Q3', metric: '200K', metricLabel: 'Users', event: 'Enterprise Launch' },
      { date: '2024', metric: '500K', metricLabel: 'Users', event: 'Global Expansion' },
    ],
  },
  propSchema: {},
};

function renderGrowthTimeline(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Growth Timeline';
  const milestones = (props.milestones as Array<{date: string; metric: string; metricLabel: string; event: string}>) || [];
  const elements: PPTXElement[] = [];

  // Title (increased by 30%)
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 9, h: 0.65, text: title, fontSize: 29, bold: true, color: COLORS.textPrimary },
  );

  // Timeline
  const lineY = 3.0;
  const lineStartX = 0.8;
  const lineEndX = 9.2;
  const lineWidth = lineEndX - lineStartX;

  // Timeline track
  elements.push(
    { type: 'rect', x: lineStartX, y: lineY - 0.04, w: lineWidth, h: 0.08, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
  );

  // Milestones
  const milestoneCount = Math.min(milestones.length, 4);
  const spacing = lineWidth / (milestoneCount - 1);

  milestones.slice(0, 4).forEach((milestone, i) => {
    const x = lineStartX + i * spacing;

    // Timeline dot
    elements.push(
      { type: 'ellipse', x: x - 0.2, y: lineY - 0.2, w: 0.4, h: 0.4, fill: COLORS.accent, line: { color: '#FFFFFF', width: 3 } },
    );

    // Metric card above (increased padding to 0.4-0.5in)
    const cardWidth = 2.0;
    const cardHeight = 1.6;
    const cardY = lineY - cardHeight - 0.5;

    elements.push(
      { type: 'rect', x: x - cardWidth / 2, y: cardY, w: cardWidth, h: cardHeight, fill: '#FFFFFF', line: { color: COLORS.border, width: 1 } },
      { type: 'rect', x: x - cardWidth / 2, y: cardY, w: cardWidth, h: 0.05, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    );

    // Metric value (60pt for premium impact)
    elements.push(
      { type: 'text', x: x - cardWidth / 2, y: cardY + 0.3, w: cardWidth, h: 0.7, text: milestone.metric, fontSize: 60, bold: true, color: COLORS.accent, align: 'center', valign: 'middle' },
    );

    // Metric label (minimum 12pt)
    elements.push(
      { type: 'text', x: x - cardWidth / 2, y: cardY + 1.05, w: cardWidth, h: 0.35, text: milestone.metricLabel, fontSize: 12, color: COLORS.textSecondary, align: 'center' },
    );

    // Event text below timeline (minimum 12pt)
    elements.push(
      { type: 'text', x: x - 1, y: lineY + 0.4, w: 2, h: 0.3, text: milestone.event, fontSize: 12, bold: true, color: COLORS.textPrimary, align: 'center' },
    );

    // Date below event (minimum 12pt)
    elements.push(
      { type: 'text', x: x - 1, y: lineY + 0.75, w: 2, h: 0.25, text: milestone.date, fontSize: 12, color: COLORS.textSecondary, align: 'center' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Logo Wall Component - Large grid of customer/partner logos
const logoWallMeta: IRComponentMeta = {
  id: 'logo-wall',
  name: '로고 월',
  category: 'traction',
  description: '고객/파트너 로고 대형 그리드',
  defaultProps: {
    title: 'Trusted by Industry Leaders',
    subtitle: '500+ companies worldwide',
    logos: [
      'Apple', 'Google', 'Microsoft', 'Amazon',
      'Meta', 'Netflix', 'Salesforce', 'Adobe',
      'Tesla', 'Uber', 'Airbnb', 'Spotify',
    ],
  },
  propSchema: {},
};

function renderLogoWall(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Our Customers';
  const subtitle = (props.subtitle as string) || '';
  const logos = (props.logos as string[]) || [];
  const elements: PPTXElement[] = [];

  // Title (centered, increased by 30%)
  elements.push(
    { type: 'text', x: 0, y: 0.3, w: 10, h: 0.65, text: title, fontSize: 29, bold: true, color: COLORS.textPrimary, align: 'center' },
  );

  // Subtitle (minimum 12pt)
  if (subtitle) {
    elements.push(
      { type: 'text', x: 0, y: 0.95, w: 10, h: 0.4, text: subtitle, fontSize: 14, color: COLORS.textSecondary, align: 'center' },
    );
  }

  // Logo grid (4 columns, 3 rows, increased spacing by 50%)
  const cols = 4;
  const rows = 3;
  const cardWidth = 2.2;
  const cardHeight = 1.1;
  const gapX = 0.45;
  const gapY = 0.38;
  const totalWidth = cols * cardWidth + (cols - 1) * gapX;
  const startX = (10 - totalWidth) / 2;
  const startY = 1.4;

  logos.slice(0, cols * rows).forEach((logo, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = startX + col * (cardWidth + gapX);
    const y = startY + row * (cardHeight + gapY);

    // Logo card
    elements.push(
      { type: 'rect', x, y, w: cardWidth, h: cardHeight, fill: '#FFFFFF', line: { color: COLORS.border, width: 1 } },
    );

    // Logo placeholder text (increased size for visibility)
    elements.push(
      { type: 'text', x, y, w: cardWidth, h: cardHeight, text: logo, fontSize: 14, bold: true, color: COLORS.textSecondary, align: 'center', valign: 'middle' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Traction Metrics Component - Key growth metrics (MRR, Users, Revenue)
const tractionMetricsMeta: IRComponentMeta = {
  id: 'traction-metrics',
  name: '트랙션 지표',
  category: 'traction',
  description: '핵심 성장 지표 (MRR, 사용자, 매출)',
  defaultProps: {
    title: 'Key Traction Metrics',
    metrics: [
      { label: 'MRR', value: '$850K', change: '+32%', changeType: 'positive', period: 'MoM' },
      { label: 'Active Users', value: '125K', change: '+28%', changeType: 'positive', period: 'MoM' },
      { label: 'Enterprise Clients', value: '48', change: '+15', changeType: 'positive', period: 'This Quarter' },
      { label: 'ARR Run Rate', value: '$10.2M', change: '+85%', changeType: 'positive', period: 'YoY' },
    ],
  },
  propSchema: {},
};

function renderTractionMetrics(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Traction Metrics';
  const metrics = (props.metrics as Array<{label: string; value: string; change: string; changeType?: string; period?: string}>) || [];
  const elements: PPTXElement[] = [];

  // Title (increased by 30%)
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 9, h: 0.65, text: title, fontSize: 29, bold: true, color: COLORS.textPrimary },
  );

  // 2x2 Metric cards (increased spacing by 50%)
  const cardWidth = 4.2;
  const cardHeight = 2.0;
  const gapX = 0.75;
  const gapY = 0.6;
  const startX = (10 - (cardWidth * 2 + gapX)) / 2;
  const startY = 1.2;

  metrics.slice(0, 4).forEach((metric, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = startX + col * (cardWidth + gapX);
    const y = startY + row * (cardHeight + gapY);

    const changeType = metric.changeType || 'positive';
    const changeColor = changeType === 'positive' ? COLORS.positive :
                        changeType === 'negative' ? COLORS.negative : COLORS.textSecondary;
    const trendArrow = changeType === 'positive' ? '↑' : changeType === 'negative' ? '↓' : '→';

    // Card background (increased padding to 0.4-0.5in)
    elements.push(
      { type: 'rect', x, y, w: cardWidth, h: cardHeight, fill: '#FFFFFF', line: { color: COLORS.border, width: 1 } },
      { type: 'rect', x, y, w: 0.08, h: cardHeight, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    );

    // Label (minimum 12pt)
    elements.push(
      { type: 'text', x: x + 0.4, y: y + 0.3, w: cardWidth - 0.6, h: 0.35, text: metric.label.toUpperCase(), fontSize: 12, bold: true, color: COLORS.textSecondary },
    );

    // Value (56-64pt for premium impact)
    elements.push(
      { type: 'text', x: x + 0.4, y: y + 0.7, w: cardWidth - 0.6, h: 0.8, text: metric.value, fontSize: 58, bold: true, color: COLORS.textPrimary },
    );

    // Change indicator
    elements.push(
      { type: 'text', x: x + 0.4, y: y + 1.55, w: 0.25, h: 0.3, text: trendArrow, fontSize: 14, bold: true, color: changeColor, valign: 'middle' },
      { type: 'text', x: x + 0.65, y: y + 1.55, w: 1.2, h: 0.3, text: metric.change, fontSize: 13, bold: true, color: changeColor, valign: 'middle' },
      { type: 'text', x: x + 1.85, y: y + 1.55, w: 2, h: 0.3, text: metric.period || '', fontSize: 12, color: COLORS.textSecondary, valign: 'middle' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// User Growth Component - User acquisition chart with cohorts
const userGrowthMeta: IRComponentMeta = {
  id: 'user-growth',
  name: '사용자 성장',
  category: 'traction',
  description: '코호트별 사용자 획득 차트',
  defaultProps: {
    title: 'User Growth',
    subtitle: 'Monthly Active Users',
    periods: [
      { label: 'Jan', organic: 15, paid: 8, referral: 5 },
      { label: 'Feb', organic: 22, paid: 12, referral: 8 },
      { label: 'Mar', organic: 35, paid: 18, referral: 14 },
      { label: 'Apr', organic: 48, paid: 25, referral: 20 },
      { label: 'May', organic: 65, paid: 32, referral: 28 },
      { label: 'Jun', organic: 85, paid: 40, referral: 35 },
    ],
    totalUsers: '160K',
    growthRate: '+45% MoM',
  },
  propSchema: {},
};

function renderUserGrowth(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'User Growth';
  const subtitle = (props.subtitle as string) || '';
  const periods = (props.periods as Array<{label: string; organic: number; paid: number; referral: number}>) || [];
  const totalUsers = (props.totalUsers as string) || '';
  const growthRate = (props.growthRate as string) || '';
  const elements: PPTXElement[] = [];

  // Title (increased by 30%)
  elements.push(
    { type: 'text', x: 0.5, y: 0.35, w: 5, h: 0.6, text: title, fontSize: 26, bold: true, color: COLORS.textPrimary },
  );
  if (subtitle) {
    elements.push(
      { type: 'text', x: 0.5, y: 0.95, w: 5, h: 0.35, text: subtitle, fontSize: 12, color: COLORS.textSecondary },
    );
  }

  // Total and growth on right (increased sizes)
  if (totalUsers) {
    elements.push(
      { type: 'text', x: 6.5, y: 0.35, w: 3, h: 0.6, text: totalUsers, fontSize: 58, bold: true, color: COLORS.accent, align: 'right' },
    );
    if (growthRate) {
      elements.push(
        { type: 'text', x: 6.5, y: 0.95, w: 3, h: 0.35, text: growthRate, fontSize: 14, bold: true, color: COLORS.positive, align: 'right' },
      );
    }
  }

  // Stacked bar chart
  const chartX = 1.0;
  const chartY = 1.4;
  const chartWidth = 7.5;
  const chartHeight = 3.2;
  const barWidth = 0.9;
  const barGap = (chartWidth - periods.length * barWidth) / (periods.length + 1);

  const maxTotal = Math.max(...periods.map(p => p.organic + p.paid + p.referral), 1);
  const colors = { organic: '#6B7B3F', paid: '#8A9B5C', referral: '#A8B884' };

  // Y-axis
  elements.push(
    { type: 'line', x: chartX, y: chartY, w: 0, h: chartHeight, line: { color: COLORS.border, width: 1 } },
  );

  // X-axis
  elements.push(
    { type: 'line', x: chartX, y: chartY + chartHeight, w: chartWidth, h: 0, line: { color: COLORS.border, width: 1 } },
  );

  // Bars
  periods.forEach((period, i) => {
    const x = chartX + barGap + i * (barWidth + barGap);
    const total = period.organic + period.paid + period.referral;
    const totalHeight = (total / maxTotal) * (chartHeight - 0.3);

    let currentY = chartY + chartHeight;

    // Organic (bottom)
    const organicHeight = (period.organic / total) * totalHeight;
    currentY -= organicHeight;
    elements.push(
      { type: 'rect', x, y: currentY, w: barWidth, h: organicHeight, fill: colors.organic, line: { color: colors.organic, width: 0 } },
    );

    // Paid (middle)
    const paidHeight = (period.paid / total) * totalHeight;
    currentY -= paidHeight;
    elements.push(
      { type: 'rect', x, y: currentY, w: barWidth, h: paidHeight, fill: colors.paid, line: { color: colors.paid, width: 0 } },
    );

    // Referral (top)
    const referralHeight = (period.referral / total) * totalHeight;
    currentY -= referralHeight;
    elements.push(
      { type: 'rect', x, y: currentY, w: barWidth, h: referralHeight, fill: colors.referral, line: { color: colors.referral, width: 0 } },
    );

    // Label (minimum 12pt)
    elements.push(
      { type: 'text', x, y: chartY + chartHeight + 0.1, w: barWidth, h: 0.3, text: period.label, fontSize: 12, color: COLORS.textSecondary, align: 'center' },
    );
  });

  // Legend
  const legendY = chartY + chartHeight + 0.5;
  const legendItems = [
    { label: 'Organic', color: colors.organic },
    { label: 'Paid', color: colors.paid },
    { label: 'Referral', color: colors.referral },
  ];
  const legendStartX = 3.0;

  legendItems.forEach((item, i) => {
    const x = legendStartX + i * 1.5;
    elements.push(
      { type: 'rect', x, y: legendY + 0.05, w: 0.25, h: 0.15, fill: item.color, line: { color: item.color, width: 0 } },
      { type: 'text', x: x + 0.35, y: legendY, w: 1.0, h: 0.25, text: item.label, fontSize: 9, color: COLORS.textSecondary, valign: 'middle' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Revenue Growth Component - MRR/ARR growth visualization
const revenueGrowthMeta: IRComponentMeta = {
  id: 'revenue-growth',
  name: '매출 성장',
  category: 'traction',
  description: 'MRR/ARR 성장 시각화',
  defaultProps: {
    title: 'Revenue Growth',
    currentMRR: '$850K',
    arrRunRate: '$10.2M',
    growthRate: '+108%',
    growthPeriod: 'YoY',
    periods: [
      { label: 'Q1 2023', value: 280 },
      { label: 'Q2 2023', value: 420 },
      { label: 'Q3 2023', value: 580 },
      { label: 'Q4 2023', value: 720 },
      { label: 'Q1 2024', value: 850 },
    ],
  },
  propSchema: {},
};

function renderRevenueGrowth(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Revenue Growth';
  const currentMRR = (props.currentMRR as string) || '';
  const arrRunRate = (props.arrRunRate as string) || '';
  const growthRate = (props.growthRate as string) || '';
  const growthPeriod = (props.growthPeriod as string) || '';
  const periods = (props.periods as Array<{label: string; value: number}>) || [];
  const elements: PPTXElement[] = [];

  // Title (increased by 30%)
  elements.push(
    { type: 'text', x: 0.5, y: 0.35, w: 4, h: 0.6, text: title, fontSize: 26, bold: true, color: COLORS.textPrimary },
  );

  // Key metrics on right (increased sizes and padding)
  elements.push(
    { type: 'rect', x: 5.5, y: 0.3, w: 4, h: 1.4, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    { type: 'text', x: 5.8, y: 0.45, w: 1.7, h: 0.3, text: 'Current MRR', fontSize: 12, color: 'rgba(255,255,255,0.8)' },
    { type: 'text', x: 5.8, y: 0.75, w: 1.7, h: 0.5, text: currentMRR, fontSize: 32, bold: true, color: '#FFFFFF' },
    { type: 'text', x: 7.6, y: 0.45, w: 1.7, h: 0.3, text: 'ARR Run Rate', fontSize: 12, color: 'rgba(255,255,255,0.8)' },
    { type: 'text', x: 7.6, y: 0.75, w: 1.7, h: 0.5, text: arrRunRate, fontSize: 32, bold: true, color: '#FFFFFF' },
    { type: 'text', x: 5.8, y: 1.3, w: 3.4, h: 0.3, text: `${growthRate} ${growthPeriod}`, fontSize: 14, bold: true, color: 'rgba(255,255,255,0.9)' },
  );

  // Line chart
  const chartX = 1.0;
  const chartY = 1.8;
  const chartWidth = 7.5;
  const chartHeight = 3.0;

  const maxValue = Math.max(...periods.map(p => p.value), 1);
  const pointSpacing = chartWidth / (periods.length - 1);

  // Y-axis
  elements.push(
    { type: 'line', x: chartX, y: chartY, w: 0, h: chartHeight, line: { color: COLORS.border, width: 1 } },
  );

  // X-axis
  elements.push(
    { type: 'line', x: chartX, y: chartY + chartHeight, w: chartWidth, h: 0, line: { color: COLORS.border, width: 1 } },
  );

  // Grid lines
  [0, 25, 50, 75, 100].forEach((pct) => {
    const y = chartY + chartHeight - (pct / 100) * chartHeight;
    elements.push(
      { type: 'line', x: chartX, y, w: chartWidth, h: 0, line: { color: COLORS.border, width: 1 } },
    );
  });

  // Area fill (simplified as bars behind the line)
  periods.forEach((period, i) => {
    const x = chartX + i * pointSpacing;
    const barHeight = (period.value / maxValue) * chartHeight;
    const y = chartY + chartHeight - barHeight;

    elements.push(
      { type: 'rect', x: x - 0.15, y, w: 0.3, h: barHeight, fill: 'rgba(107,123,63,0.3)', line: { color: 'transparent', width: 0 } },
    );
  });

  // Line segments and points
  periods.forEach((period, i) => {
    const x = chartX + i * pointSpacing;
    const y = chartY + chartHeight - (period.value / maxValue) * chartHeight;

    // Point
    elements.push(
      { type: 'ellipse', x: x - 0.12, y: y - 0.12, w: 0.24, h: 0.24, fill: COLORS.accent, line: { color: '#FFFFFF', width: 2 } },
    );

    // Line to next point
    if (i < periods.length - 1) {
      const nextX = chartX + (i + 1) * pointSpacing;
      const nextY = chartY + chartHeight - (periods[i + 1].value / maxValue) * chartHeight;
      elements.push(
        { type: 'line', x, y, w: nextX - x, h: nextY - y, line: { color: COLORS.accent, width: 2 } },
      );
    }

    // Label (minimum 12pt)
    elements.push(
      { type: 'text', x: x - 0.5, y: chartY + chartHeight + 0.1, w: 1, h: 0.3, text: period.label, fontSize: 12, color: COLORS.textSecondary, align: 'center' },
    );

    // Value above point (minimum 12pt)
    elements.push(
      { type: 'text', x: x - 0.4, y: y - 0.4, w: 0.8, h: 0.25, text: `$${period.value}K`, fontSize: 12, bold: true, color: COLORS.textPrimary, align: 'center' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Retention Chart Component - Cohort retention visualization
const retentionChartMeta: IRComponentMeta = {
  id: 'retention-chart',
  name: '리텐션 차트',
  category: 'traction',
  description: '코호트 리텐션 시각화',
  defaultProps: {
    title: 'Cohort Retention',
    subtitle: 'Monthly retention by signup cohort',
    cohorts: [
      { name: 'Jan 2024', values: [100, 82, 75, 70, 68, 65] },
      { name: 'Feb 2024', values: [100, 85, 78, 73, 70] },
      { name: 'Mar 2024', values: [100, 88, 80, 76] },
      { name: 'Apr 2024', values: [100, 90, 84] },
    ],
    avgRetention: '72%',
  },
  propSchema: {},
};

function renderRetentionChart(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Retention';
  const subtitle = (props.subtitle as string) || '';
  const cohorts = (props.cohorts as Array<{name: string; values: number[]}>) || [];
  const avgRetention = (props.avgRetention as string) || '';
  const elements: PPTXElement[] = [];

  // Title (increased by 30%)
  elements.push(
    { type: 'text', x: 0.5, y: 0.35, w: 5, h: 0.6, text: title, fontSize: 26, bold: true, color: COLORS.textPrimary },
  );
  if (subtitle) {
    elements.push(
      { type: 'text', x: 0.5, y: 0.95, w: 5, h: 0.35, text: subtitle, fontSize: 12, color: COLORS.textSecondary },
    );
  }

  // Average retention (increased sizes)
  if (avgRetention) {
    elements.push(
      { type: 'text', x: 6.5, y: 0.35, w: 3, h: 0.35, text: 'Avg. M6 Retention', fontSize: 12, color: COLORS.textSecondary, align: 'right' },
      { type: 'text', x: 6.5, y: 0.7, w: 3, h: 0.6, text: avgRetention, fontSize: 58, bold: true, color: COLORS.positive, align: 'right' },
    );
  }

  // Retention heatmap table (increased spacing by 50%)
  const tableX = 0.8;
  const tableY = 1.5;
  const cellWidth = 1.2;
  const cellHeight = 0.8;
  const labelWidth = 1.6;
  const months = ['M0', 'M1', 'M2', 'M3', 'M4', 'M5'];

  // Header row (minimum 12pt)
  elements.push(
    { type: 'rect', x: tableX, y: tableY, w: labelWidth, h: cellHeight, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    { type: 'text', x: tableX, y: tableY, w: labelWidth, h: cellHeight, text: 'Cohort', fontSize: 12, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
  );

  months.forEach((month, i) => {
    const x = tableX + labelWidth + i * cellWidth;
    elements.push(
      { type: 'rect', x, y: tableY, w: cellWidth, h: cellHeight, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
      { type: 'text', x, y: tableY, w: cellWidth, h: cellHeight, text: month, fontSize: 12, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
    );
  });

  // Cohort rows
  cohorts.forEach((cohort, rowIndex) => {
    const y = tableY + (rowIndex + 1) * cellHeight;

    // Cohort name (minimum 12pt)
    elements.push(
      { type: 'rect', x: tableX, y, w: labelWidth, h: cellHeight, fill: '#FFFFFF', line: { color: COLORS.border, width: 1 } },
      { type: 'text', x: tableX, y, w: labelWidth, h: cellHeight, text: cohort.name, fontSize: 12, bold: true, color: COLORS.textPrimary, align: 'center', valign: 'middle' },
    );

    // Retention values (minimum 12pt)
    months.forEach((_, colIndex) => {
      const x = tableX + labelWidth + colIndex * cellWidth;
      const value = cohort.values[colIndex];

      if (value !== undefined) {
        // Color intensity based on retention
        const intensity = value / 100;
        const r = Math.round(107 + (255 - 107) * (1 - intensity));
        const g = Math.round(123 + (255 - 123) * (1 - intensity));
        const b = Math.round(63 + (255 - 63) * (1 - intensity));
        const fillColor = `rgb(${r},${g},${b})`;
        const textColor = intensity > 0.5 ? '#FFFFFF' : COLORS.textPrimary;

        elements.push(
          { type: 'rect', x, y, w: cellWidth, h: cellHeight, fill: fillColor, line: { color: COLORS.border, width: 1 } },
          { type: 'text', x, y, w: cellWidth, h: cellHeight, text: `${value}%`, fontSize: 13, bold: true, color: textColor, align: 'center', valign: 'middle' },
        );
      } else {
        elements.push(
          { type: 'rect', x, y, w: cellWidth, h: cellHeight, fill: COLORS.surface, line: { color: COLORS.border, width: 1 } },
        );
      }
    });
  });

  return { elements, width: 10, height: 5.625 };
}

// NPS Score Component - Net Promoter Score with breakdown
const npsScoreMeta: IRComponentMeta = {
  id: 'nps-score',
  name: 'NPS 점수',
  category: 'traction',
  description: '순추천고객지수와 세부 분석',
  defaultProps: {
    title: 'Net Promoter Score',
    score: 72,
    promoters: 78,
    passives: 16,
    detractors: 6,
    responses: '2,450',
    benchmark: 'Industry avg: 35',
    trend: '+8 pts vs last quarter',
  },
  propSchema: {},
};

function renderNPSScore(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'NPS Score';
  const score = (props.score as number) || 0;
  const promoters = (props.promoters as number) || 0;
  const passives = (props.passives as number) || 0;
  const detractors = (props.detractors as number) || 0;
  const responses = (props.responses as string) || '';
  const benchmark = (props.benchmark as string) || '';
  const trend = (props.trend as string) || '';
  const elements: PPTXElement[] = [];

  // Title (increased by 30%)
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 9, h: 0.65, text: title, fontSize: 29, bold: true, color: COLORS.textPrimary },
  );

  // Large NPS score (made larger and more prominent - 64pt)
  const scoreX = 1.5;
  const scoreY = 1.3;
  const scoreSize = 3.2;

  elements.push(
    { type: 'ellipse', x: scoreX, y: scoreY, w: scoreSize, h: scoreSize, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    { type: 'text', x: scoreX, y: scoreY + 0.7, w: scoreSize, h: 1.4, text: String(score), fontSize: 64, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
    { type: 'text', x: scoreX, y: scoreY + 2.2, w: scoreSize, h: 0.45, text: 'NPS', fontSize: 16, color: 'rgba(255,255,255,0.8)', align: 'center' },
  );

  // Trend below score
  if (trend) {
    elements.push(
      { type: 'text', x: scoreX - 0.3, y: scoreY + scoreSize + 0.3, w: scoreSize + 0.6, h: 0.35, text: trend, fontSize: 12, bold: true, color: COLORS.positive, align: 'center' },
    );
  }

  // Breakdown on right (increased spacing by 50%)
  const breakdownX = 5.3;
  const breakdownY = 1.4;
  const barWidth = 4.0;
  const barHeight = 0.7;
  const barGap = 0.38;

  const categories = [
    { label: 'Promoters (9-10)', value: promoters, color: COLORS.positive },
    { label: 'Passives (7-8)', value: passives, color: '#F5A623' },
    { label: 'Detractors (0-6)', value: detractors, color: COLORS.negative },
  ];

  categories.forEach((cat, i) => {
    const y = breakdownY + i * (barHeight + barGap + 0.35);

    // Label (minimum 12pt)
    elements.push(
      { type: 'text', x: breakdownX, y, w: barWidth, h: 0.35, text: cat.label, fontSize: 12, color: COLORS.textSecondary },
    );

    // Bar background
    elements.push(
      { type: 'rect', x: breakdownX, y: y + 0.4, w: barWidth, h: barHeight, fill: COLORS.surface, line: { color: COLORS.border, width: 1 } },
    );

    // Bar fill
    const fillWidth = (cat.value / 100) * barWidth;
    elements.push(
      { type: 'rect', x: breakdownX, y: y + 0.4, w: fillWidth, h: barHeight, fill: cat.color, line: { color: cat.color, width: 0 } },
    );

    // Percentage
    elements.push(
      { type: 'text', x: breakdownX + fillWidth + 0.15, y: y + 0.4, w: 0.8, h: barHeight, text: `${cat.value}%`, fontSize: 14, bold: true, color: COLORS.textPrimary, valign: 'middle' },
    );
  });

  // Footer info
  elements.push(
    { type: 'text', x: breakdownX, y: 4.5, w: 2, h: 0.3, text: `${responses} responses`, fontSize: 10, color: COLORS.textSecondary },
  );
  if (benchmark) {
    elements.push(
      { type: 'text', x: breakdownX + 2.2, y: 4.5, w: 2, h: 0.3, text: benchmark, fontSize: 10, color: COLORS.textSecondary },
    );
  }

  return { elements, width: 10, height: 5.625 };
}

// Press Mentions Component - Press logos and quote highlights
const pressMentionsMeta: IRComponentMeta = {
  id: 'press-mentions',
  name: '언론 보도',
  category: 'traction',
  description: '언론사 로고와 인용 하이라이트',
  defaultProps: {
    title: 'Featured In',
    mentions: [
      { outlet: 'TechCrunch', quote: '"The fastest-growing startup in their category"', date: 'Jan 2024' },
      { outlet: 'Forbes', quote: '"Revolutionizing how enterprises manage data"', date: 'Dec 2023' },
      { outlet: 'The Wall Street Journal', quote: '"A game-changer for the industry"', date: 'Nov 2023' },
    ],
    logos: ['TechCrunch', 'Forbes', 'WSJ', 'Bloomberg', 'CNBC'],
  },
  propSchema: {},
};

function renderPressMentions(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Press';
  const mentions = (props.mentions as Array<{outlet: string; quote: string; date: string}>) || [];
  const logos = (props.logos as string[]) || [];
  const elements: PPTXElement[] = [];

  // Title (centered, increased by 30%)
  elements.push(
    { type: 'text', x: 0, y: 0.4, w: 10, h: 0.65, text: title, fontSize: 29, bold: true, color: COLORS.textPrimary, align: 'center' },
  );

  // Logo row (increased logo sizes and spacing by 50%)
  const logoCount = Math.min(logos.length, 5);
  const logoWidth = 1.7;
  const logoHeight = 0.85;
  const logoGap = 0.45;
  const totalLogoWidth = logoCount * logoWidth + (logoCount - 1) * logoGap;
  const logoStartX = (10 - totalLogoWidth) / 2;
  const logoY = 1.1;

  logos.slice(0, logoCount).forEach((logo, i) => {
    const x = logoStartX + i * (logoWidth + logoGap);
    elements.push(
      { type: 'rect', x, y: logoY, w: logoWidth, h: logoHeight, fill: '#FFFFFF', line: { color: COLORS.border, width: 1 } },
      { type: 'text', x, y: logoY, w: logoWidth, h: logoHeight, text: logo, fontSize: 13, bold: true, color: COLORS.textSecondary, align: 'center', valign: 'middle' },
    );
  });

  // Quote cards (increased spacing by 50%)
  const cardWidth = 2.9;
  const cardHeight = 2.9;
  const cardGap = 0.45;
  const totalCardWidth = 3 * cardWidth + 2 * cardGap;
  const cardStartX = (10 - totalCardWidth) / 2;
  const cardY = 2.1;

  mentions.slice(0, 3).forEach((mention, i) => {
    const x = cardStartX + i * (cardWidth + cardGap);

    // Card background
    elements.push(
      { type: 'rect', x, y: cardY, w: cardWidth, h: cardHeight, fill: '#FFFFFF', line: { color: COLORS.border, width: 1 } },
      { type: 'rect', x, y: cardY, w: cardWidth, h: 0.05, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    );

    // Quote mark
    elements.push(
      { type: 'text', x: x + 0.25, y: cardY + 0.25, w: 0.5, h: 0.5, text: '"', fontSize: 36, bold: true, color: COLORS.accent },
    );

    // Quote text (minimum 12pt)
    elements.push(
      { type: 'text', x: x + 0.25, y: cardY + 0.65, w: cardWidth - 0.5, h: 1.4, text: mention.quote, fontSize: 12, color: COLORS.textPrimary, valign: 'top' },
    );

    // Outlet name (increased)
    elements.push(
      { type: 'text', x: x + 0.25, y: cardY + 2.15, w: cardWidth - 0.5, h: 0.35, text: mention.outlet, fontSize: 13, bold: true, color: COLORS.accent },
    );

    // Date (minimum 12pt)
    elements.push(
      { type: 'text', x: x + 0.25, y: cardY + 2.5, w: cardWidth - 0.5, h: 0.3, text: mention.date, fontSize: 12, color: COLORS.textSecondary },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Register components
registry.register(growthTimelineMeta, renderGrowthTimeline);
registry.register(logoWallMeta, renderLogoWall);
registry.register(tractionMetricsMeta, renderTractionMetrics);
registry.register(userGrowthMeta, renderUserGrowth);
registry.register(revenueGrowthMeta, renderRevenueGrowth);
registry.register(retentionChartMeta, renderRetentionChart);
registry.register(npsScoreMeta, renderNPSScore);
registry.register(pressMentionsMeta, renderPressMentions);

export { growthTimelineMeta, logoWallMeta, tractionMetricsMeta, userGrowthMeta, revenueGrowthMeta, retentionChartMeta, npsScoreMeta, pressMentionsMeta };
