import { registry } from '@/lib/registry';
import type { IRComponentMeta, IRComponentRenderResult, PPTXElement } from '@/types';
import { COLORS } from '@/lib/constants';

// KPI Card Component - Professional single metric display
const kpiCardMeta: IRComponentMeta = {
  id: 'kpi-card',
  name: 'KPI 카드',
  category: 'data-metrics',
  description: '주요 지표를 강조하는 단일 카드',
  defaultProps: {
    title: 'Revenue',
    value: '$1.2M',
    change: '+23%',
    changeType: 'positive',
    period: 'vs last quarter',
  },
  propSchema: {
    title: { type: 'string', label: '제목', default: 'Revenue' },
    value: { type: 'string', label: '값', default: '$1.2M' },
    change: { type: 'string', label: '변화율', default: '+23%' },
    changeType: { type: 'select', label: '변화 유형', default: 'positive', options: [
      { value: 'positive', label: '증가' },
      { value: 'negative', label: '감소' },
      { value: 'neutral', label: '중립' },
    ]},
  },
};

function renderKPICard(props: Record<string, unknown>): IRComponentRenderResult {
  const { title, value, change, changeType, period } = props as {
    title: string; value: string; change: string; changeType: string; period?: string;
  };

  const changeColor = changeType === 'positive' ? COLORS.positive :
                      changeType === 'negative' ? COLORS.negative : COLORS.textSecondary;
  const trendArrow = changeType === 'positive' ? '↑' : changeType === 'negative' ? '↓' : '→';

  const elements: PPTXElement[] = [
    // Card container with subtle shadow effect (light border) - increased padding
    { type: 'rect', x: 2.5, y: 1.5, w: 5, h: 3.2, fill: '#FFFFFF', line: { color: COLORS.border, width: 1 } },
    // Accent bar on left
    { type: 'rect', x: 2.5, y: 1.5, w: 0.08, h: 3.2, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },

    // Title label - subtle, uppercase
    { type: 'text', x: 3.0, y: 1.9, w: 4.0, h: 0.35, text: title.toUpperCase(), fontSize: 12, color: COLORS.textSecondary, bold: true },

    // Main value - MUCH larger for impact (64pt)
    { type: 'text', x: 3.0, y: 2.4, w: 4.0, h: 1.1, text: value, fontSize: 64, bold: true, color: COLORS.textPrimary },

    // Trend indicator row
    // Arrow icon
    { type: 'text', x: 3.0, y: 3.65, w: 0.4, h: 0.4, text: trendArrow, fontSize: 22, bold: true, color: changeColor, valign: 'middle' },
    // Change percentage - larger (20pt)
    { type: 'text', x: 3.45, y: 3.65, w: 1.2, h: 0.4, text: change, fontSize: 20, bold: true, color: changeColor, valign: 'middle' },
    // Period label
    { type: 'text', x: 4.65, y: 3.65, w: 2.0, h: 0.4, text: period || 'vs last period', fontSize: 12, color: COLORS.textSecondary, valign: 'middle' },
  ];

  return { elements, width: 10, height: 5.625 };
}

// Metric Grid Component - 2x2 professional KPI grid
const metricGridMeta: IRComponentMeta = {
  id: 'metric-grid',
  name: '지표 그리드',
  category: 'data-metrics',
  description: '여러 KPI를 그리드로 표시',
  defaultProps: {
    metrics: [
      { label: 'Revenue', value: '$1.2M', change: '+23%', changeType: 'positive', icon: '$' },
      { label: 'Active Users', value: '50K', change: '+12%', changeType: 'positive', icon: '👥' },
      { label: 'Retention', value: '85%', change: '+5%', changeType: 'positive', icon: '↻' },
      { label: 'NPS Score', value: '72', change: '+8', changeType: 'positive', icon: '★' },
    ],
  },
  propSchema: {},
};

function renderMetricGrid(props: Record<string, unknown>): IRComponentRenderResult {
  const metrics = (props.metrics as Array<{label: string; value: string; change: string; changeType?: string; icon?: string}>) || [];
  const elements: PPTXElement[] = [];

  const cardWidth = 4.0;
  const cardHeight = 2.4;
  const gapX = 0.5;
  const gapY = 0.5;
  const startX = (10 - (cardWidth * 2 + gapX)) / 2;
  const startY = (5.625 - (cardHeight * 2 + gapY)) / 2;

  metrics.slice(0, 4).forEach((m, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = startX + col * (cardWidth + gapX);
    const y = startY + row * (cardHeight + gapY);

    const changeType = m.changeType || 'positive';
    const changeColor = changeType === 'positive' ? COLORS.positive :
                        changeType === 'negative' ? COLORS.negative : COLORS.textSecondary;
    const trendArrow = changeType === 'positive' ? '↑' : changeType === 'negative' ? '↓' : '→';

    // Card background with subtle border - increased padding
    elements.push(
      { type: 'rect', x, y, w: cardWidth, h: cardHeight, fill: '#FFFFFF', line: { color: COLORS.border, width: 1 } },
    );

    // Icon circle placeholder (top left)
    elements.push(
      { type: 'ellipse', x: x + 0.4, y: y + 0.4, w: 0.5, h: 0.5, fill: COLORS.surface, line: { color: COLORS.border, width: 1 } },
      { type: 'text', x: x + 0.4, y: y + 0.4, w: 0.5, h: 0.5, text: m.icon || '●', fontSize: 14, color: COLORS.accent, align: 'center', valign: 'middle' },
    );

    // Label - right of icon
    elements.push(
      { type: 'text', x: x + 1.0, y: y + 0.45, w: cardWidth - 1.2, h: 0.35, text: m.label, fontSize: 12, color: COLORS.textSecondary },
    );

    // Main value - much larger for impact (64pt)
    elements.push(
      { type: 'text', x: x + 0.4, y: y + 1.0, w: cardWidth - 0.8, h: 0.8, text: m.value, fontSize: 64, bold: true, color: COLORS.textPrimary },
    );

    // Trend indicator - larger
    elements.push(
      { type: 'text', x: x + 0.4, y: y + 1.9, w: 0.35, h: 0.35, text: trendArrow, fontSize: 20, bold: true, color: changeColor, valign: 'middle' },
      { type: 'text', x: x + 0.75, y: y + 1.9, w: 1.5, h: 0.35, text: m.change, fontSize: 20, bold: true, color: changeColor, valign: 'middle' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Bar Chart Component - Horizontal bars with professional styling
const barChartMeta: IRComponentMeta = {
  id: 'bar-chart',
  name: '막대 차트',
  category: 'data-metrics',
  description: '수평 막대 차트',
  defaultProps: {
    title: 'Revenue by Product',
    bars: [
      { label: 'Product A', value: 85 },
      { label: 'Product B', value: 65 },
      { label: 'Product C', value: 45 },
      { label: 'Product D', value: 30 },
    ],
  },
  propSchema: {},
};

function renderBarChart(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Chart';
  const bars = (props.bars as Array<{label: string; value: number}>) || [];
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.8, y: 0.5, w: 8.4, h: 0.5, text: title, fontSize: 20, bold: true, color: COLORS.textPrimary },
  );

  // Chart area
  const chartX = 2.2;
  const chartY = 1.3;
  const maxBarWidth = 5.8;
  const barHeight = 0.8;
  const barSpacing = 0.35;
  const labelWidth = 1.4;
  const maxValue = Math.max(...bars.map(b => b.value), 1);

  // Subtle grid lines with better visibility
  [0, 25, 50, 75, 100].forEach((pct) => {
    const lineX = chartX + (pct / 100) * maxBarWidth;
    elements.push(
      { type: 'line', x: lineX, y: chartY, w: 0, h: bars.length * (barHeight + barSpacing) - barSpacing, line: { color: COLORS.border, width: 1 } },
    );
    // Grid label at bottom - larger
    elements.push(
      { type: 'text', x: lineX - 0.25, y: chartY + bars.length * (barHeight + barSpacing) + 0.1, w: 0.5, h: 0.25, text: `${pct}`, fontSize: 12, color: COLORS.textSecondary, align: 'center' },
    );
  });

  bars.forEach((bar, i) => {
    const y = chartY + i * (barHeight + barSpacing);
    const barWidth = Math.max((bar.value / maxValue) * maxBarWidth, 0.1);

    // Label - larger
    elements.push(
      { type: 'text', x: 0.8, y, w: labelWidth, h: barHeight, text: bar.label, fontSize: 14, color: COLORS.textPrimary, align: 'right', valign: 'middle' },
    );

    // Bar with subtle shadow effect
    elements.push(
      { type: 'rect', x: chartX, y: y + 0.1, w: barWidth, h: barHeight - 0.2, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    );

    // Value label on bar (inside if space, outside if not) - larger
    const valueText = String(bar.value);
    const valueFontSize = 14;
    const valueWidth = 0.7;
    const insideBar = barWidth > 1.0;

    elements.push(
      {
        type: 'text',
        x: insideBar ? chartX + barWidth - valueWidth - 0.15 : chartX + barWidth + 0.15,
        y: y + 0.1,
        w: valueWidth,
        h: barHeight - 0.2,
        text: valueText,
        fontSize: valueFontSize,
        bold: true,
        color: insideBar ? '#FFFFFF' : COLORS.textPrimary,
        align: insideBar ? 'right' : 'left',
        valign: 'middle'
      },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Progress Ring Component - Circular progress with clean design
const progressRingMeta: IRComponentMeta = {
  id: 'progress-ring',
  name: '진행률 링',
  category: 'data-metrics',
  description: '원형 진행률 표시기',
  defaultProps: {
    percentage: 75,
    label: 'Completion Rate',
    sublabel: 'On track',
  },
  propSchema: {
    percentage: { type: 'number', label: '진행률 (%)', default: 75 },
    label: { type: 'string', label: '레이블', default: 'Completion Rate' },
  },
};

function renderProgressRing(props: Record<string, unknown>): IRComponentRenderResult {
  const { percentage, label, sublabel } = props as { percentage: number; label: string; sublabel?: string };
  const elements: PPTXElement[] = [];

  const centerX = 5;
  const centerY = 2.6;
  const outerRadius = 1.4;
  const innerRadius = 1.05;

  // Background ring (track)
  elements.push(
    { type: 'ellipse', x: centerX - outerRadius, y: centerY - outerRadius, w: outerRadius * 2, h: outerRadius * 2, fill: COLORS.surface, line: { color: COLORS.border, width: 2 } },
  );

  // Progress ring (simplified as full circle with accent - actual arc would need more complex SVG)
  // For PPTX, we show the colored ring to represent progress conceptually
  elements.push(
    { type: 'ellipse', x: centerX - outerRadius, y: centerY - outerRadius, w: outerRadius * 2, h: outerRadius * 2, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
  );

  // Inner circle (creates ring effect)
  elements.push(
    { type: 'ellipse', x: centerX - innerRadius, y: centerY - innerRadius, w: innerRadius * 2, h: innerRadius * 2, fill: '#FFFFFF', line: { color: '#FFFFFF', width: 0 } },
  );

  // Percentage text - much larger for impact (64pt)
  elements.push(
    { type: 'text', x: centerX - 1.2, y: centerY - 0.5, w: 2.4, h: 0.8, text: `${percentage}%`, fontSize: 64, bold: true, color: COLORS.textPrimary, align: 'center', valign: 'middle' },
  );

  // Sublabel inside ring
  if (sublabel) {
    elements.push(
      { type: 'text', x: centerX - 1, y: centerY + 0.35, w: 2, h: 0.3, text: sublabel, fontSize: 12, color: COLORS.textSecondary, align: 'center', valign: 'middle' },
    );
  }

  // Main label below
  elements.push(
    { type: 'text', x: centerX - 2, y: centerY + outerRadius + 0.3, w: 4, h: 0.4, text: label, fontSize: 16, bold: true, color: COLORS.textPrimary, align: 'center', valign: 'middle' },
  );

  return { elements, width: 10, height: 5.625 };
}

// Stat Comparison Component - Side-by-side stats
const statComparisonMeta: IRComponentMeta = {
  id: 'stat-comparison',
  name: '통계 비교',
  category: 'data-metrics',
  description: '두 통계를 나란히 비교',
  defaultProps: {
    leftStat: { label: 'This Quarter', value: '$1.8M', change: '+23%', changeType: 'positive' },
    rightStat: { label: 'Last Quarter', value: '$1.5M', change: '+15%', changeType: 'neutral' },
    comparisonLabel: 'vs Previous Period',
  },
  propSchema: {
    comparisonLabel: { type: 'string', label: '비교 레이블', default: 'vs Previous Period' },
  },
};

function renderStatComparison(props: Record<string, unknown>): IRComponentRenderResult {
  const { leftStat, rightStat, comparisonLabel } = props as {
    leftStat: { label: string; value: string; change: string; changeType: string };
    rightStat: { label: string; value: string; change: string; changeType: string };
    comparisonLabel: string;
  };

  const elements: PPTXElement[] = [];

  const cardWidth = 4.0;
  const cardHeight = 3.0;
  const leftX = 0.6;
  const rightX = 5.4;
  const cardY = 1.4;

  // Comparison label at top
  elements.push(
    { type: 'text', x: 0, y: 0.6, w: 10, h: 0.4, text: comparisonLabel, fontSize: 18, bold: true, color: COLORS.textPrimary, align: 'center' },
  );

  // Left stat card (highlighted) - increased padding
  const leftArrow = leftStat.changeType === 'positive' ? '↑' : leftStat.changeType === 'negative' ? '↓' : '→';

  elements.push(
    { type: 'rect', x: leftX, y: cardY, w: cardWidth, h: cardHeight, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    { type: 'text', x: leftX + 0.5, y: cardY + 0.45, w: cardWidth - 1.0, h: 0.35, text: leftStat.label.toUpperCase(), fontSize: 12, bold: true, color: 'rgba(255,255,255,0.8)' },
    { type: 'text', x: leftX + 0.5, y: cardY + 1.0, w: cardWidth - 1.0, h: 1.0, text: leftStat.value, fontSize: 64, bold: true, color: '#FFFFFF' },
    { type: 'text', x: leftX + 0.5, y: cardY + 2.2, w: 0.35, h: 0.4, text: leftArrow, fontSize: 20, bold: true, color: '#FFFFFF', valign: 'middle' },
    { type: 'text', x: leftX + 0.85, y: cardY + 2.2, w: 2, h: 0.4, text: leftStat.change, fontSize: 20, bold: true, color: '#FFFFFF', valign: 'middle' },
  );

  // Arrow between cards
  elements.push(
    { type: 'text', x: 4.6, y: cardY + cardHeight / 2 - 0.2, w: 0.8, h: 0.4, text: '→', fontSize: 24, color: COLORS.border, align: 'center', valign: 'middle' },
  );

  // Right stat card - increased padding
  const rightChangeColor = rightStat.changeType === 'positive' ? COLORS.positive :
                           rightStat.changeType === 'negative' ? COLORS.negative : COLORS.textSecondary;
  const rightArrow = rightStat.changeType === 'positive' ? '↑' : rightStat.changeType === 'negative' ? '↓' : '→';

  elements.push(
    { type: 'rect', x: rightX, y: cardY, w: cardWidth, h: cardHeight, fill: '#FFFFFF', line: { color: COLORS.border, width: 1 } },
    { type: 'text', x: rightX + 0.5, y: cardY + 0.45, w: cardWidth - 1.0, h: 0.35, text: rightStat.label.toUpperCase(), fontSize: 12, bold: true, color: COLORS.textSecondary },
    { type: 'text', x: rightX + 0.5, y: cardY + 1.0, w: cardWidth - 1.0, h: 1.0, text: rightStat.value, fontSize: 64, bold: true, color: COLORS.textPrimary },
    { type: 'text', x: rightX + 0.5, y: cardY + 2.2, w: 0.35, h: 0.4, text: rightArrow, fontSize: 20, bold: true, color: rightChangeColor, valign: 'middle' },
    { type: 'text', x: rightX + 0.85, y: cardY + 2.2, w: 2, h: 0.4, text: rightStat.change, fontSize: 20, bold: true, color: rightChangeColor, valign: 'middle' },
  );

  return { elements, width: 10, height: 5.625 };
}

// Pie Chart Component - Segmented circle with legend
const pieChartMeta: IRComponentMeta = {
  id: 'pie-chart',
  name: '파이 차트',
  category: 'data-metrics',
  description: '세그먼트가 있는 원형 차트와 범례',
  defaultProps: {
    title: 'Revenue by Segment',
    segments: [
      { label: 'Enterprise', value: 45, color: '#6B7B3F' },
      { label: 'SMB', value: 30, color: '#8A9B5C' },
      { label: 'Consumer', value: 15, color: '#A8B884' },
      { label: 'Other', value: 10, color: '#C4D4A0' },
    ],
  },
  propSchema: {},
};

function renderPieChart(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Distribution';
  const segments = (props.segments as Array<{label: string; value: number; color?: string}>) || [];
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 9, h: 0.5, text: title, fontSize: 22, bold: true, color: COLORS.textPrimary },
  );

  const centerX = 3.5;
  const centerY = 3.0;
  const radius = 1.6;
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  const defaultColors = ['#6B7B3F', '#8A9B5C', '#A8B884', '#C4D4A0', '#D4E4B0'];

  // Background circle
  elements.push(
    { type: 'ellipse', x: centerX - radius, y: centerY - radius, w: radius * 2, h: radius * 2, fill: COLORS.surface, line: { color: COLORS.border, width: 1 } },
  );

  // Segment indicators (visual approximation using colored arcs represented as positioned elements)
  let currentAngle = -90;
  segments.forEach((segment, i) => {
    const segmentAngle = (segment.value / total) * 360;
    const midAngle = (currentAngle + segmentAngle / 2) * (Math.PI / 180);
    const segColor = segment.color || defaultColors[i % defaultColors.length];

    // Position indicator at segment center
    const indicatorRadius = radius * 0.7;
    const indicatorX = centerX + indicatorRadius * Math.cos(midAngle);
    const indicatorY = centerY + indicatorRadius * Math.sin(midAngle);

    // Segment wedge approximation (filled ellipse slice effect)
    elements.push(
      { type: 'ellipse', x: indicatorX - 0.25, y: indicatorY - 0.25, w: 0.5, h: 0.5, fill: segColor, line: { color: segColor, width: 0 } },
    );

    currentAngle += segmentAngle;
  });

  // Center white circle for donut effect
  elements.push(
    { type: 'ellipse', x: centerX - radius * 0.5, y: centerY - radius * 0.5, w: radius, h: radius, fill: '#FFFFFF', line: { color: '#FFFFFF', width: 0 } },
  );

  // Legend on the right
  const legendX = 6.0;
  const legendY = 1.5;
  const legendRowHeight = 0.7;

  segments.forEach((segment, i) => {
    const y = legendY + i * legendRowHeight;
    const segColor = segment.color || defaultColors[i % defaultColors.length];
    const percentage = Math.round((segment.value / total) * 100);

    // Color box
    elements.push(
      { type: 'rect', x: legendX, y: y + 0.1, w: 0.35, h: 0.35, fill: segColor, line: { color: segColor, width: 0 } },
    );

    // Label
    elements.push(
      { type: 'text', x: legendX + 0.5, y, w: 2, h: 0.55, text: segment.label, fontSize: 12, color: COLORS.textPrimary, valign: 'middle' },
    );

    // Percentage
    elements.push(
      { type: 'text', x: legendX + 2.5, y, w: 0.8, h: 0.55, text: `${percentage}%`, fontSize: 12, bold: true, color: COLORS.textPrimary, align: 'right', valign: 'middle' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Line Chart Component - Axis with data points and multiple series
const lineChartMeta: IRComponentMeta = {
  id: 'line-chart',
  name: '라인 차트',
  category: 'data-metrics',
  description: '축과 데이터 포인트가 있는 선형 차트',
  defaultProps: {
    title: 'Growth Trends',
    xLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    series: [
      { name: 'Revenue', values: [20, 35, 45, 55, 70, 85], color: '#6B7B3F' },
      { name: 'Users', values: [15, 25, 40, 50, 60, 75], color: '#8A9B5C' },
    ],
  },
  propSchema: {},
};

function renderLineChart(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Chart';
  const xLabels = (props.xLabels as string[]) || [];
  const series = (props.series as Array<{name: string; values: number[]; color?: string}>) || [];
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 9, h: 0.5, text: title, fontSize: 22, bold: true, color: COLORS.textPrimary },
  );

  // Chart area
  const chartX = 1.2;
  const chartY = 1.3;
  const chartWidth = 6.5;
  const chartHeight = 3.2;

  // Y-axis
  elements.push(
    { type: 'line', x: chartX, y: chartY, w: 0, h: chartHeight, line: { color: COLORS.border, width: 1 } },
  );

  // X-axis
  elements.push(
    { type: 'line', x: chartX, y: chartY + chartHeight, w: chartWidth, h: 0, line: { color: COLORS.border, width: 1 } },
  );

  // Grid lines
  [0, 25, 50, 75, 100].forEach((val) => {
    const y = chartY + chartHeight - (val / 100) * chartHeight;
    elements.push(
      { type: 'line', x: chartX, y, w: chartWidth, h: 0, line: { color: COLORS.border, width: 1 } },
      { type: 'text', x: 0.3, y: y - 0.15, w: 0.8, h: 0.3, text: String(val), fontSize: 9, color: COLORS.textSecondary, align: 'right', valign: 'middle' },
    );
  });

  // X-axis labels
  const pointSpacing = chartWidth / (xLabels.length - 1);
  xLabels.forEach((label, i) => {
    const x = chartX + i * pointSpacing;
    elements.push(
      { type: 'text', x: x - 0.3, y: chartY + chartHeight + 0.1, w: 0.6, h: 0.3, text: label, fontSize: 9, color: COLORS.textSecondary, align: 'center' },
    );
  });

  // Data series
  const allValues = series.flatMap(s => s.values);
  const maxValue = Math.max(...allValues, 1);
  const defaultColors = ['#6B7B3F', '#8A9B5C'];

  series.forEach((s, seriesIndex) => {
    const seriesColor = s.color || defaultColors[seriesIndex % defaultColors.length];

    // Draw line segments and points
    s.values.forEach((val, i) => {
      const x = chartX + i * pointSpacing;
      const y = chartY + chartHeight - (val / maxValue) * chartHeight;

      // Data point
      elements.push(
        { type: 'ellipse', x: x - 0.12, y: y - 0.12, w: 0.24, h: 0.24, fill: seriesColor, line: { color: '#FFFFFF', width: 2 } },
      );

      // Line to next point
      if (i < s.values.length - 1) {
        const nextX = chartX + (i + 1) * pointSpacing;
        const nextY = chartY + chartHeight - (s.values[i + 1] / maxValue) * chartHeight;
        elements.push(
          { type: 'line', x, y, w: nextX - x, h: nextY - y, line: { color: seriesColor, width: 2 } },
        );
      }
    });
  });

  // Legend
  const legendX = 8.0;
  const legendY = 1.5;
  series.forEach((s, i) => {
    const y = legendY + i * 0.5;
    const seriesColor = s.color || defaultColors[i % defaultColors.length];
    elements.push(
      { type: 'rect', x: legendX, y: y + 0.08, w: 0.3, h: 0.15, fill: seriesColor, line: { color: seriesColor, width: 0 } },
      { type: 'text', x: legendX + 0.4, y, w: 1.2, h: 0.35, text: s.name, fontSize: 10, color: COLORS.textPrimary, valign: 'middle' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Revenue Breakdown Component - Stacked horizontal bars with categories
const revenueBreakdownMeta: IRComponentMeta = {
  id: 'revenue-breakdown',
  name: '매출 분석',
  category: 'data-metrics',
  description: '카테고리별 누적 수평 막대',
  defaultProps: {
    title: 'Revenue Breakdown',
    categories: [
      { name: 'Subscriptions', amount: '$2.4M', percentage: 60 },
      { name: 'Services', amount: '$1.0M', percentage: 25 },
      { name: 'Licensing', amount: '$0.4M', percentage: 10 },
      { name: 'Other', amount: '$0.2M', percentage: 5 },
    ],
    total: '$4.0M',
  },
  propSchema: {},
};

function renderRevenueBreakdown(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Revenue Breakdown';
  const categories = (props.categories as Array<{name: string; amount: string; percentage: number}>) || [];
  const total = (props.total as string) || '';
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 6, h: 0.5, text: title, fontSize: 22, bold: true, color: COLORS.textPrimary },
  );

  // Total on right
  if (total) {
    elements.push(
      { type: 'text', x: 6.5, y: 0.4, w: 3, h: 0.35, text: 'Total', fontSize: 11, color: COLORS.textSecondary, align: 'right' },
      { type: 'text', x: 6.5, y: 0.7, w: 3, h: 0.5, text: total, fontSize: 28, bold: true, color: COLORS.accent, align: 'right' },
    );
  }

  // Stacked bar
  const barY = 1.5;
  const barHeight = 0.7;
  const barStartX = 0.8;
  const barMaxWidth = 8.4;
  const colors = ['#6B7B3F', '#8A9B5C', '#A8B884', '#C4D4A0'];

  let currentX = barStartX;
  categories.forEach((cat, i) => {
    const segWidth = (cat.percentage / 100) * barMaxWidth;
    const segColor = colors[i % colors.length];

    elements.push(
      { type: 'rect', x: currentX, y: barY, w: segWidth, h: barHeight, fill: segColor, line: { color: segColor, width: 0 } },
    );

    // Percentage label inside if wide enough
    if (segWidth > 0.6) {
      elements.push(
        { type: 'text', x: currentX, y: barY, w: segWidth, h: barHeight, text: `${cat.percentage}%`, fontSize: 11, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
      );
    }

    currentX += segWidth;
  });

  // Category details below
  const detailY = 2.5;
  const detailWidth = 2.1;
  const detailGap = 0.1;

  categories.forEach((cat, i) => {
    const x = 0.8 + i * (detailWidth + detailGap);
    const segColor = colors[i % colors.length];

    // Color indicator
    elements.push(
      { type: 'rect', x, y: detailY, w: 0.15, h: 1.2, fill: segColor, line: { color: segColor, width: 0 } },
    );

    // Category name
    elements.push(
      { type: 'text', x: x + 0.25, y: detailY + 0.1, w: detailWidth - 0.35, h: 0.35, text: cat.name, fontSize: 12, bold: true, color: COLORS.textPrimary },
    );

    // Amount
    elements.push(
      { type: 'text', x: x + 0.25, y: detailY + 0.5, w: detailWidth - 0.35, h: 0.35, text: cat.amount, fontSize: 18, bold: true, color: segColor },
    );

    // Percentage
    elements.push(
      { type: 'text', x: x + 0.25, y: detailY + 0.9, w: detailWidth - 0.35, h: 0.25, text: `${cat.percentage}% of total`, fontSize: 10, color: COLORS.textSecondary },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Unit Economics Component - Key metrics grid (LTV, CAC, payback)
const unitEconomicsMeta: IRComponentMeta = {
  id: 'unit-economics',
  name: '유닛 이코노믹스',
  category: 'data-metrics',
  description: 'LTV, CAC, 페이백 등 핵심 지표 그리드',
  defaultProps: {
    title: 'Unit Economics',
    metrics: [
      { label: 'LTV', value: '$4,800', description: 'Lifetime Value' },
      { label: 'CAC', value: '$800', description: 'Customer Acquisition Cost' },
      { label: 'LTV:CAC', value: '6.0x', description: 'Ratio', highlight: true },
      { label: 'Payback', value: '8 mo', description: 'CAC Payback Period' },
      { label: 'Gross Margin', value: '78%', description: 'After COGS' },
      { label: 'Net Retention', value: '125%', description: 'Dollar Retention' },
    ],
  },
  propSchema: {},
};

function renderUnitEconomics(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Unit Economics';
  const metrics = (props.metrics as Array<{label: string; value: string; description?: string; highlight?: boolean}>) || [];
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 9, h: 0.5, text: title, fontSize: 22, bold: true, color: COLORS.textPrimary },
  );

  // 3x2 grid - increased spacing and padding
  const cardWidth = 2.9;
  const cardHeight = 1.7;
  const gapX = 0.5;
  const gapY = 0.5;
  const startX = (10 - (cardWidth * 3 + gapX * 2)) / 2;
  const startY = 1.2;

  metrics.slice(0, 6).forEach((metric, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = startX + col * (cardWidth + gapX);
    const y = startY + row * (cardHeight + gapY);
    const isHighlight = metric.highlight;

    // Card background - increased padding
    elements.push(
      { type: 'rect', x, y, w: cardWidth, h: cardHeight, fill: isHighlight ? COLORS.accent : '#FFFFFF', line: { color: isHighlight ? COLORS.accent : COLORS.border, width: 1 } },
    );

    // Label
    elements.push(
      { type: 'text', x: x + 0.4, y: y + 0.25, w: cardWidth - 0.8, h: 0.3, text: metric.label, fontSize: 12, bold: true, color: isHighlight ? 'rgba(255,255,255,0.8)' : COLORS.textSecondary },
    );

    // Value - larger for impact (48pt)
    elements.push(
      { type: 'text', x: x + 0.4, y: y + 0.6, w: cardWidth - 0.8, h: 0.65, text: metric.value, fontSize: 48, bold: true, color: isHighlight ? '#FFFFFF' : COLORS.textPrimary },
    );

    // Description
    if (metric.description) {
      elements.push(
        { type: 'text', x: x + 0.4, y: y + 1.3, w: cardWidth - 0.8, h: 0.25, text: metric.description, fontSize: 12, color: isHighlight ? 'rgba(255,255,255,0.7)' : COLORS.textSecondary },
      );
    }
  });

  return { elements, width: 10, height: 5.625 };
}

// Growth Chart Component - Y-axis growth with period labels
const growthChartMeta: IRComponentMeta = {
  id: 'growth-chart',
  name: '성장 차트',
  category: 'data-metrics',
  description: 'Y축 성장률과 기간 레이블',
  defaultProps: {
    title: 'Revenue Growth',
    subtitle: 'Year over Year',
    periods: [
      { label: '2021', value: 1.2, display: '$1.2M' },
      { label: '2022', value: 2.5, display: '$2.5M' },
      { label: '2023', value: 4.8, display: '$4.8M' },
      { label: '2024', value: 8.5, display: '$8.5M' },
    ],
    growthRate: '+108%',
    growthLabel: 'CAGR',
  },
  propSchema: {},
};

function renderGrowthChart(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Growth';
  const subtitle = (props.subtitle as string) || '';
  const periods = (props.periods as Array<{label: string; value: number; display: string}>) || [];
  const growthRate = (props.growthRate as string) || '';
  const growthLabel = (props.growthLabel as string) || '';
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 6, h: 0.5, text: title, fontSize: 22, bold: true, color: COLORS.textPrimary },
  );
  if (subtitle) {
    elements.push(
      { type: 'text', x: 0.5, y: 0.85, w: 6, h: 0.3, text: subtitle, fontSize: 12, color: COLORS.textSecondary },
    );
  }

  // Growth rate highlight on right
  if (growthRate) {
    elements.push(
      { type: 'text', x: 7, y: 0.4, w: 2.5, h: 0.5, text: growthRate, fontSize: 28, bold: true, color: COLORS.positive, align: 'right' },
    );
    if (growthLabel) {
      elements.push(
        { type: 'text', x: 7, y: 0.9, w: 2.5, h: 0.25, text: growthLabel, fontSize: 11, color: COLORS.textSecondary, align: 'right' },
      );
    }
  }

  // Chart area
  const chartX = 1.2;
  const chartY = 1.5;
  const chartWidth = 7.5;
  const chartHeight = 3.2;
  const maxValue = Math.max(...periods.map(p => p.value), 1);
  const barWidth = 1.2;
  const barGap = (chartWidth - periods.length * barWidth) / (periods.length + 1);

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
    const barHeight = (period.value / maxValue) * (chartHeight - 0.5);
    const y = chartY + chartHeight - barHeight;

    // Bar
    elements.push(
      { type: 'rect', x, y, w: barWidth, h: barHeight, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    );

    // Value on top
    elements.push(
      { type: 'text', x, y: y - 0.35, w: barWidth, h: 0.3, text: period.display, fontSize: 12, bold: true, color: COLORS.textPrimary, align: 'center' },
    );

    // Period label below
    elements.push(
      { type: 'text', x, y: chartY + chartHeight + 0.1, w: barWidth, h: 0.3, text: period.label, fontSize: 11, color: COLORS.textSecondary, align: 'center' },
    );

    // Growth arrow between bars
    if (i > 0) {
      const prevBarHeight = (periods[i - 1].value / maxValue) * (chartHeight - 0.5);
      const growthPct = Math.round(((period.value - periods[i - 1].value) / periods[i - 1].value) * 100);
      const arrowX = x - barGap / 2;
      const arrowY = chartY + chartHeight - Math.max(barHeight, prevBarHeight) - 0.6;

      elements.push(
        { type: 'text', x: arrowX - 0.35, y: arrowY, w: 0.7, h: 0.3, text: `+${growthPct}%`, fontSize: 9, bold: true, color: COLORS.positive, align: 'center' },
      );
    }
  });

  return { elements, width: 10, height: 5.625 };
}

// Waterfall Chart Component - Bridge chart showing changes
const waterfallChartMeta: IRComponentMeta = {
  id: 'waterfall-chart',
  name: '워터폴 차트',
  category: 'data-metrics',
  description: '변화를 보여주는 브릿지 차트',
  defaultProps: {
    title: 'Revenue Bridge',
    subtitle: 'Q1 to Q2 Changes',
    items: [
      { label: 'Q1 Start', value: 100, type: 'start' },
      { label: 'New Sales', value: 35, type: 'increase' },
      { label: 'Upsells', value: 15, type: 'increase' },
      { label: 'Churn', value: -20, type: 'decrease' },
      { label: 'Downgrades', value: -10, type: 'decrease' },
      { label: 'Q2 End', value: 120, type: 'end' },
    ],
  },
  propSchema: {},
};

function renderWaterfallChart(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Waterfall';
  const subtitle = (props.subtitle as string) || '';
  const items = (props.items as Array<{label: string; value: number; type: 'start' | 'end' | 'increase' | 'decrease'}>) || [];
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 9, h: 0.5, text: title, fontSize: 22, bold: true, color: COLORS.textPrimary },
  );
  if (subtitle) {
    elements.push(
      { type: 'text', x: 0.5, y: 0.85, w: 9, h: 0.3, text: subtitle, fontSize: 12, color: COLORS.textSecondary },
    );
  }

  const chartX = 0.8;
  const chartY = 1.4;
  const chartHeight = 3.0;
  const itemCount = Math.min(items.length, 7);
  const barWidth = 1.0;
  const barGap = (8.4 - itemCount * barWidth) / (itemCount + 1);

  // Calculate running total and max for scaling
  let runningTotal = 0;
  const positions: { base: number; height: number }[] = [];
  let maxVal = 0;
  let minVal = 0;

  items.forEach((item) => {
    if (item.type === 'start' || item.type === 'end') {
      positions.push({ base: 0, height: item.value });
      maxVal = Math.max(maxVal, item.value);
      runningTotal = item.value;
    } else {
      const base = item.value > 0 ? runningTotal : runningTotal + item.value;
      positions.push({ base, height: Math.abs(item.value) });
      runningTotal += item.value;
      maxVal = Math.max(maxVal, runningTotal, base + Math.abs(item.value));
      minVal = Math.min(minVal, base);
    }
  });

  const scale = chartHeight / (maxVal - minVal || 1);
  const baseline = chartY + chartHeight + minVal * scale;

  // Baseline
  elements.push(
    { type: 'line', x: chartX, y: baseline, w: 8.4, h: 0, line: { color: COLORS.border, width: 1 } },
  );

  items.slice(0, 7).forEach((item, i) => {
    const x = chartX + barGap + i * (barWidth + barGap);
    const pos = positions[i];
    const barHeight = pos.height * scale;
    const barY = baseline - pos.base * scale - barHeight;

    // Bar color
    let barColor: string = COLORS.accent;
    if (item.type === 'increase') barColor = COLORS.positive;
    else if (item.type === 'decrease') barColor = COLORS.negative;

    // Bar
    elements.push(
      { type: 'rect', x, y: barY, w: barWidth, h: barHeight, fill: barColor, line: { color: barColor, width: 0 } },
    );

    // Value on top
    const valueText = item.value > 0 ? `+${item.value}` : String(item.value);
    const displayValue = item.type === 'start' || item.type === 'end' ? String(item.value) : valueText;
    elements.push(
      { type: 'text', x, y: barY - 0.35, w: barWidth, h: 0.3, text: displayValue, fontSize: 11, bold: true, color: barColor, align: 'center' },
    );

    // Label below
    elements.push(
      { type: 'text', x: x - 0.1, y: chartY + chartHeight + 0.15, w: barWidth + 0.2, h: 0.4, text: item.label, fontSize: 9, color: COLORS.textPrimary, align: 'center', valign: 'top' },
    );

    // Connector line to next bar
    if (i < itemCount - 1 && (item.type === 'start' || item.type === 'increase' || item.type === 'decrease')) {
      const connectorY = baseline - (pos.base + pos.height) * scale;
      const nextX = chartX + barGap + (i + 1) * (barWidth + barGap);
      elements.push(
        { type: 'line', x: x + barWidth, y: connectorY, w: nextX - x - barWidth, h: 0, line: { color: COLORS.border, width: 1 } },
      );
    }
  });

  return { elements, width: 10, height: 5.625 };
}

// Gauge Meter Component - Circular progress gauge
const gaugeMeterMeta: IRComponentMeta = {
  id: 'gauge-meter',
  name: '게이지 미터',
  category: 'data-metrics',
  description: '원형 진행률 게이지',
  defaultProps: {
    title: 'Performance Score',
    value: 78,
    maxValue: 100,
    unit: 'pts',
    ranges: [
      { min: 0, max: 40, label: 'Poor', color: '#E53935' },
      { min: 40, max: 70, label: 'Fair', color: '#FB8C00' },
      { min: 70, max: 100, label: 'Good', color: '#43A047' },
    ],
    target: 80,
  },
  propSchema: {},
};

function renderGaugeMeter(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Gauge';
  const value = (props.value as number) || 0;
  // maxValue reserved for future percentage scaling
  const _maxValue = (props.maxValue as number) || 100;
  void _maxValue;
  const unit = (props.unit as string) || '';
  const ranges = (props.ranges as Array<{min: number; max: number; label: string; color: string}>) || [];
  const target = props.target as number | undefined;
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 9, h: 0.5, text: title, fontSize: 22, bold: true, color: COLORS.textPrimary },
  );

  const centerX = 5;
  const centerY = 3.0;
  const outerRadius = 1.8;
  const innerRadius = 1.3;

  // Background arc (full semi-circle)
  elements.push(
    { type: 'ellipse', x: centerX - outerRadius, y: centerY - outerRadius, w: outerRadius * 2, h: outerRadius * 2, fill: COLORS.surface, line: { color: COLORS.border, width: 2 } },
  );

  // Current range color overlay
  const currentRange = ranges.find(r => value >= r.min && value <= r.max) || ranges[ranges.length - 1];
  const rangeColor = currentRange?.color || COLORS.accent;

  elements.push(
    { type: 'ellipse', x: centerX - outerRadius + 0.15, y: centerY - outerRadius + 0.15, w: (outerRadius - 0.15) * 2, h: (outerRadius - 0.15) * 2, fill: rangeColor, line: { color: rangeColor, width: 0 } },
  );

  // Inner white circle
  elements.push(
    { type: 'ellipse', x: centerX - innerRadius, y: centerY - innerRadius, w: innerRadius * 2, h: innerRadius * 2, fill: '#FFFFFF', line: { color: '#FFFFFF', width: 0 } },
  );

  // Value display - much larger for impact (64pt)
  elements.push(
    { type: 'text', x: centerX - 1.3, y: centerY - 0.5, w: 2.6, h: 0.8, text: String(value), fontSize: 64, bold: true, color: COLORS.textPrimary, align: 'center', valign: 'middle' },
  );
  if (unit) {
    elements.push(
      { type: 'text', x: centerX - 0.6, y: centerY + 0.4, w: 1.2, h: 0.35, text: unit, fontSize: 16, color: COLORS.textSecondary, align: 'center', valign: 'middle' },
    );
  }

  // Status label
  if (currentRange?.label) {
    elements.push(
      { type: 'rect', x: centerX - 0.7, y: centerY + 0.8, w: 1.4, h: 0.45, fill: rangeColor, line: { color: rangeColor, width: 0 } },
      { type: 'text', x: centerX - 0.7, y: centerY + 0.8, w: 1.4, h: 0.45, text: currentRange.label, fontSize: 14, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
    );
  }

  // Target indicator
  if (target !== undefined) {
    elements.push(
      { type: 'text', x: centerX + outerRadius + 0.2, y: centerY - 0.2, w: 1.5, h: 0.3, text: `Target: ${target}`, fontSize: 12, color: COLORS.textSecondary },
    );
  }

  // Range legend
  const legendY = 4.6;
  const legendWidth = 2.5;
  const legendStartX = (10 - ranges.length * legendWidth) / 2;

  ranges.forEach((range, i) => {
    const x = legendStartX + i * legendWidth;
    elements.push(
      { type: 'rect', x, y: legendY, w: 0.25, h: 0.25, fill: range.color, line: { color: range.color, width: 0 } },
      { type: 'text', x: x + 0.35, y: legendY - 0.02, w: legendWidth - 0.5, h: 0.3, text: `${range.label} (${range.min}-${range.max})`, fontSize: 12, color: COLORS.textPrimary, valign: 'middle' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Scorecard Component - Performance scorecard grid
const scorecardMeta: IRComponentMeta = {
  id: 'scorecard',
  name: '스코어카드',
  category: 'data-metrics',
  description: '성과 스코어카드 그리드',
  defaultProps: {
    title: 'Q2 Performance Scorecard',
    categories: [
      {
        name: 'Growth',
        metrics: [
          { name: 'Revenue', actual: '$4.2M', target: '$4.0M', status: 'above' },
          { name: 'Users', actual: '125K', target: '130K', status: 'below' },
        ],
      },
      {
        name: 'Efficiency',
        metrics: [
          { name: 'CAC', actual: '$180', target: '$200', status: 'above' },
          { name: 'Burn Rate', actual: '$450K', target: '$500K', status: 'above' },
        ],
      },
      {
        name: 'Quality',
        metrics: [
          { name: 'NPS', actual: '72', target: '70', status: 'above' },
          { name: 'Churn', actual: '2.8%', target: '3.0%', status: 'above' },
        ],
      },
    ],
  },
  propSchema: {},
};

function renderScorecard(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Scorecard';
  const categories = (props.categories as Array<{name: string; metrics: Array<{name: string; actual: string; target: string; status: 'above' | 'below' | 'on-target'}>}>) || [];
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.35, w: 9, h: 0.45, text: title, fontSize: 20, bold: true, color: COLORS.textPrimary },
  );

  const tableX = 0.5;
  const tableY = 1.0;
  const colWidths = [1.8, 2.0, 1.2, 1.2, 0.8];
  const rowHeight = 0.55;
  const headerHeight = 0.5;

  // Header row
  const headers = ['Category', 'Metric', 'Actual', 'Target', 'Status'];
  let xPos = tableX;
  headers.forEach((header, i) => {
    elements.push(
      { type: 'rect', x: xPos, y: tableY, w: colWidths[i], h: headerHeight, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
      { type: 'text', x: xPos, y: tableY, w: colWidths[i], h: headerHeight, text: header, fontSize: 10, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
    );
    xPos += colWidths[i];
  });

  // Data rows
  let currentY = tableY + headerHeight;
  categories.forEach((cat, catIndex) => {
    cat.metrics.forEach((metric, metricIndex) => {
      const isEven = (catIndex + metricIndex) % 2 === 0;
      const rowFill = isEven ? '#FFFFFF' : COLORS.surface;

      xPos = tableX;

      // Category (only on first metric of category)
      const categoryText = metricIndex === 0 ? cat.name : '';
      elements.push(
        { type: 'rect', x: xPos, y: currentY, w: colWidths[0], h: rowHeight, fill: rowFill, line: { color: COLORS.border, width: 1 } },
        { type: 'text', x: xPos + 0.1, y: currentY, w: colWidths[0] - 0.2, h: rowHeight, text: categoryText, fontSize: 10, bold: true, color: COLORS.textPrimary, valign: 'middle' },
      );
      xPos += colWidths[0];

      // Metric name
      elements.push(
        { type: 'rect', x: xPos, y: currentY, w: colWidths[1], h: rowHeight, fill: rowFill, line: { color: COLORS.border, width: 1 } },
        { type: 'text', x: xPos + 0.1, y: currentY, w: colWidths[1] - 0.2, h: rowHeight, text: metric.name, fontSize: 10, color: COLORS.textPrimary, valign: 'middle' },
      );
      xPos += colWidths[1];

      // Actual
      elements.push(
        { type: 'rect', x: xPos, y: currentY, w: colWidths[2], h: rowHeight, fill: rowFill, line: { color: COLORS.border, width: 1 } },
        { type: 'text', x: xPos, y: currentY, w: colWidths[2], h: rowHeight, text: metric.actual, fontSize: 10, bold: true, color: COLORS.textPrimary, align: 'center', valign: 'middle' },
      );
      xPos += colWidths[2];

      // Target
      elements.push(
        { type: 'rect', x: xPos, y: currentY, w: colWidths[3], h: rowHeight, fill: rowFill, line: { color: COLORS.border, width: 1 } },
        { type: 'text', x: xPos, y: currentY, w: colWidths[3], h: rowHeight, text: metric.target, fontSize: 10, color: COLORS.textSecondary, align: 'center', valign: 'middle' },
      );
      xPos += colWidths[3];

      // Status indicator
      const statusColor = metric.status === 'above' ? COLORS.positive : metric.status === 'below' ? COLORS.negative : COLORS.accent;
      const statusIcon = metric.status === 'above' ? '+' : metric.status === 'below' ? '-' : '=';
      elements.push(
        { type: 'rect', x: xPos, y: currentY, w: colWidths[4], h: rowHeight, fill: rowFill, line: { color: COLORS.border, width: 1 } },
        { type: 'ellipse', x: xPos + colWidths[4] / 2 - 0.18, y: currentY + rowHeight / 2 - 0.18, w: 0.36, h: 0.36, fill: statusColor, line: { color: statusColor, width: 0 } },
        { type: 'text', x: xPos + colWidths[4] / 2 - 0.18, y: currentY + rowHeight / 2 - 0.18, w: 0.36, h: 0.36, text: statusIcon, fontSize: 14, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
      );

      currentY += rowHeight;
    });
  });

  // Legend
  const legendY = currentY + 0.3;
  const statuses = [
    { icon: '+', label: 'Above Target', color: COLORS.positive },
    { icon: '=', label: 'On Target', color: COLORS.accent },
    { icon: '-', label: 'Below Target', color: COLORS.negative },
  ];

  statuses.forEach((s, i) => {
    const lx = tableX + i * 2.5;
    elements.push(
      { type: 'ellipse', x: lx, y: legendY, w: 0.3, h: 0.3, fill: s.color, line: { color: s.color, width: 0 } },
      { type: 'text', x: lx, y: legendY, w: 0.3, h: 0.3, text: s.icon, fontSize: 12, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
      { type: 'text', x: lx + 0.4, y: legendY, w: 1.8, h: 0.3, text: s.label, fontSize: 9, color: COLORS.textSecondary, valign: 'middle' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Heatmap Grid Component - Matrix with color intensity
const heatmapGridMeta: IRComponentMeta = {
  id: 'heatmap-grid',
  name: '히트맵 그리드',
  category: 'data-metrics',
  description: '색상 강도가 있는 매트릭스',
  defaultProps: {
    title: 'Feature Usage by Segment',
    rowLabels: ['Enterprise', 'SMB', 'Startup', 'Consumer'],
    colLabels: ['Dashboard', 'Reports', 'API', 'Mobile', 'Integrations'],
    values: [
      [95, 88, 72, 45, 82],
      [78, 65, 55, 60, 48],
      [62, 45, 80, 75, 35],
      [40, 30, 25, 85, 20],
    ],
    colorScale: { low: '#E8F5E9', high: '#2E7D32' },
  },
  propSchema: {},
};

function renderHeatmapGrid(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Heatmap';
  const rowLabels = (props.rowLabels as string[]) || [];
  const colLabels = (props.colLabels as string[]) || [];
  const values = (props.values as number[][]) || [];
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.35, w: 9, h: 0.45, text: title, fontSize: 20, bold: true, color: COLORS.textPrimary },
  );

  const gridX = 1.8;
  const gridY = 1.2;
  const cellWidth = 1.4;
  const cellHeight = 0.85;
  const labelWidth = 1.3;

  // Find min/max for color scaling
  const flatValues = values.flat();
  const minVal = Math.min(...flatValues);
  const maxVal = Math.max(...flatValues);
  const range = maxVal - minVal || 1;

  // Helper to interpolate color
  const getColor = (value: number): string => {
    const ratio = (value - minVal) / range;
    // Simple green gradient from light to dark
    const r = Math.round(232 - ratio * 186);
    const g = Math.round(245 - ratio * 120);
    const b = Math.round(233 - ratio * 183);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  // Column headers
  colLabels.forEach((label, i) => {
    const x = gridX + i * cellWidth;
    elements.push(
      { type: 'rect', x, y: gridY, w: cellWidth, h: 0.5, fill: COLORS.surface, line: { color: COLORS.border, width: 1 } },
      { type: 'text', x, y: gridY, w: cellWidth, h: 0.5, text: label, fontSize: 9, bold: true, color: COLORS.textPrimary, align: 'center', valign: 'middle' },
    );
  });

  // Rows with labels and cells
  rowLabels.forEach((rowLabel, rowIndex) => {
    const y = gridY + 0.5 + rowIndex * cellHeight;

    // Row label
    elements.push(
      { type: 'rect', x: gridX - labelWidth, y, w: labelWidth, h: cellHeight, fill: COLORS.surface, line: { color: COLORS.border, width: 1 } },
      { type: 'text', x: gridX - labelWidth + 0.1, y, w: labelWidth - 0.2, h: cellHeight, text: rowLabel, fontSize: 10, bold: true, color: COLORS.textPrimary, valign: 'middle' },
    );

    // Cells
    if (values[rowIndex]) {
      values[rowIndex].forEach((value, colIndex) => {
        const x = gridX + colIndex * cellWidth;
        const cellColor = getColor(value);
        const textColor = value > (minVal + range * 0.6) ? '#FFFFFF' : COLORS.textPrimary;

        elements.push(
          { type: 'rect', x, y, w: cellWidth, h: cellHeight, fill: cellColor, line: { color: COLORS.border, width: 1 } },
          { type: 'text', x, y, w: cellWidth, h: cellHeight, text: String(value), fontSize: 12, bold: true, color: textColor, align: 'center', valign: 'middle' },
        );
      });
    }
  });

  // Color scale legend
  const legendY = gridY + 0.5 + rowLabels.length * cellHeight + 0.4;
  const legendWidth = 3;
  const legendX = (10 - legendWidth) / 2;

  // Gradient bar (simplified as multiple rects)
  const gradientSteps = 10;
  const stepWidth = legendWidth / gradientSteps;
  for (let i = 0; i < gradientSteps; i++) {
    const value = minVal + (range * i) / (gradientSteps - 1);
    elements.push(
      { type: 'rect', x: legendX + i * stepWidth, y: legendY, w: stepWidth + 0.01, h: 0.25, fill: getColor(value), line: { color: getColor(value), width: 0 } },
    );
  }

  // Legend labels
  elements.push(
    { type: 'text', x: legendX - 0.5, y: legendY - 0.02, w: 0.5, h: 0.3, text: String(minVal), fontSize: 9, color: COLORS.textSecondary, align: 'right', valign: 'middle' },
    { type: 'text', x: legendX + legendWidth, y: legendY - 0.02, w: 0.5, h: 0.3, text: String(maxVal), fontSize: 9, color: COLORS.textSecondary, valign: 'middle' },
  );

  return { elements, width: 10, height: 5.625 };
}

// Register components
registry.register(kpiCardMeta, renderKPICard);
registry.register(metricGridMeta, renderMetricGrid);
registry.register(barChartMeta, renderBarChart);
registry.register(progressRingMeta, renderProgressRing);
registry.register(statComparisonMeta, renderStatComparison);
registry.register(pieChartMeta, renderPieChart);
registry.register(lineChartMeta, renderLineChart);
registry.register(revenueBreakdownMeta, renderRevenueBreakdown);
registry.register(unitEconomicsMeta, renderUnitEconomics);
registry.register(growthChartMeta, renderGrowthChart);
registry.register(waterfallChartMeta, renderWaterfallChart);
registry.register(gaugeMeterMeta, renderGaugeMeter);
registry.register(scorecardMeta, renderScorecard);
registry.register(heatmapGridMeta, renderHeatmapGrid);

export { kpiCardMeta, metricGridMeta, barChartMeta, progressRingMeta, statComparisonMeta, pieChartMeta, lineChartMeta, revenueBreakdownMeta, unitEconomicsMeta, growthChartMeta, waterfallChartMeta, gaugeMeterMeta, scorecardMeta, heatmapGridMeta };
