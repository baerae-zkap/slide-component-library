import { registry } from '@/lib/registry';
import type { IRComponentMeta, IRComponentRenderResult, PPTXElement } from '@/types';
import { COLORS } from '@/lib/constants';

// Cap Table Component - Ownership breakdown with shareholders
const capTableMeta: IRComponentMeta = {
  id: 'cap-table',
  name: '캡 테이블',
  category: 'financials',
  description: '주주별 지분 구조 시각화',
  defaultProps: {
    title: 'Cap Table',
    shareholders: [
      { name: 'Founders', shares: '4,000,000', percentage: 40, type: 'common' },
      { name: 'Series A Investors', shares: '2,500,000', percentage: 25, type: 'preferred' },
      { name: 'Series B Investors', shares: '2,000,000', percentage: 20, type: 'preferred' },
      { name: 'Employee Pool', shares: '1,000,000', percentage: 10, type: 'options' },
      { name: 'Advisors', shares: '500,000', percentage: 5, type: 'common' },
    ],
    totalShares: '10,000,000',
  },
  propSchema: {
    title: { type: 'string', label: '제목', default: 'Cap Table' },
  },
};

function renderCapTable(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Cap Table';
  const shareholders = (props.shareholders as Array<{name: string; shares: string; percentage: number; type?: string}>) || [];
  const totalShares = (props.totalShares as string) || '';
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 6, h: 0.5, text: title, fontSize: 32, bold: true, color: COLORS.textPrimary },
  );

  // Total shares on right
  if (totalShares) {
    elements.push(
      { type: 'text', x: 6, y: 0.4, w: 3.5, h: 0.3, text: 'Total Shares', fontSize: 14, color: COLORS.textSecondary, align: 'right' },
      { type: 'text', x: 6, y: 0.7, w: 3.5, h: 0.4, text: totalShares, fontSize: 60, bold: true, color: COLORS.accent, align: 'right' },
    );
  }

  // Table header
  const tableY = 1.3;
  const rowHeight = 0.7;
  const cols = { name: 0.5, shares: 4.5, pct: 6.5, bar: 7.5 };

  elements.push(
    { type: 'rect', x: 0.5, y: tableY, w: 9, h: rowHeight, fill: COLORS.surface, line: { color: COLORS.border, width: 1 } },
    { type: 'text', x: cols.name, y: tableY, w: 3.5, h: rowHeight, text: 'Shareholder', fontSize: 14, bold: true, color: COLORS.textSecondary, valign: 'middle' },
    { type: 'text', x: cols.shares, y: tableY, w: 1.8, h: rowHeight, text: 'Shares', fontSize: 14, bold: true, color: COLORS.textSecondary, align: 'right', valign: 'middle' },
    { type: 'text', x: cols.pct, y: tableY, w: 0.8, h: rowHeight, text: '%', fontSize: 14, bold: true, color: COLORS.textSecondary, align: 'right', valign: 'middle' },
  );

  // Data rows
  const typeColors: Record<string, string> = {
    common: COLORS.accent,
    preferred: COLORS.accentLight,
    options: '#A8B884',
  };

  shareholders.slice(0, 6).forEach((sh, i) => {
    const y = tableY + (i + 1) * rowHeight;
    const barColor = typeColors[sh.type || 'common'] || COLORS.accent;
    const barWidth = (sh.percentage / 100) * 1.8;

    elements.push(
      { type: 'rect', x: 0.5, y, w: 9, h: rowHeight, fill: '#FFFFFF', line: { color: COLORS.border, width: 1 } },
      { type: 'text', x: cols.name + 0.1, y, w: 3.3, h: rowHeight, text: sh.name, fontSize: 14, color: COLORS.textPrimary, valign: 'middle' },
      { type: 'text', x: cols.shares, y, w: 1.8, h: rowHeight, text: sh.shares, fontSize: 14, color: COLORS.textPrimary, align: 'right', valign: 'middle' },
      { type: 'text', x: cols.pct, y, w: 0.8, h: rowHeight, text: `${sh.percentage}%`, fontSize: 14, bold: true, color: COLORS.textPrimary, align: 'right', valign: 'middle' },
      { type: 'rect', x: cols.bar, y: y + 0.1, w: barWidth, h: 0.5, fill: barColor, line: { color: barColor, width: 0 } },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Burn Rate Component - Monthly burn visualization with runway
const burnRateMeta: IRComponentMeta = {
  id: 'burn-rate',
  name: '번 레이트',
  category: 'financials',
  description: '월별 현금 소진율과 런웨이',
  defaultProps: {
    title: 'Monthly Burn Rate',
    currentBurn: '$150K',
    previousBurn: '$180K',
    change: '-17%',
    changeType: 'positive',
    breakdown: [
      { category: 'Payroll', amount: '$90K', percentage: 60 },
      { category: 'Infrastructure', amount: '$30K', percentage: 20 },
      { category: 'Marketing', amount: '$20K', percentage: 13 },
      { category: 'Other', amount: '$10K', percentage: 7 },
    ],
    runway: '18 months',
  },
  propSchema: {
    title: { type: 'string', label: '제목', default: 'Monthly Burn Rate' },
  },
};

function renderBurnRate(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Monthly Burn Rate';
  const currentBurn = (props.currentBurn as string) || '$150K';
  const change = (props.change as string) || '';
  const changeType = (props.changeType as string) || 'neutral';
  const breakdown = (props.breakdown as Array<{category: string; amount: string; percentage: number}>) || [];
  const runway = (props.runway as string) || '';
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 5, h: 0.5, text: title, fontSize: 32, bold: true, color: COLORS.textPrimary },
  );

  // Main burn card
  const changeColor = changeType === 'positive' ? COLORS.positive : changeType === 'negative' ? COLORS.negative : COLORS.textSecondary;
  const arrow = changeType === 'positive' ? '↓' : changeType === 'negative' ? '↑' : '→';

  elements.push(
    { type: 'rect', x: 0.5, y: 1.1, w: 4.5, h: 2.2, fill: '#FFFFFF', line: { color: COLORS.border, width: 1 } },
    { type: 'rect', x: 0.5, y: 1.1, w: 0.5, h: 2.2, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    { type: 'text', x: 1.3, y: 1.5, w: 3.5, h: 0.3, text: 'MONTHLY BURN', fontSize: 14, bold: true, color: COLORS.textSecondary },
    { type: 'text', x: 1.3, y: 1.9, w: 3.5, h: 0.8, text: currentBurn, fontSize: 64, bold: true, color: COLORS.textPrimary },
    { type: 'text', x: 1.3, y: 2.85, w: 0.4, h: 0.3, text: arrow, fontSize: 18, bold: true, color: changeColor, valign: 'middle' },
    { type: 'text', x: 1.75, y: 2.85, w: 1.5, h: 0.3, text: change, fontSize: 16, bold: true, color: changeColor, valign: 'middle' },
  );

  // Runway card
  if (runway) {
    elements.push(
      { type: 'rect', x: 5.5, y: 1.1, w: 4.0, h: 2.2, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
      { type: 'text', x: 5.9, y: 1.5, w: 3.2, h: 0.3, text: 'RUNWAY', fontSize: 14, bold: true, color: 'rgba(255,255,255,0.8)' },
      { type: 'text', x: 5.9, y: 1.9, w: 3.2, h: 0.8, text: runway, fontSize: 64, bold: true, color: '#FFFFFF' },
      { type: 'text', x: 5.9, y: 2.85, w: 3.2, h: 0.3, text: 'at current burn rate', fontSize: 12, color: 'rgba(255,255,255,0.7)' },
    );
  }

  // Breakdown bars
  const breakdownY = 3.7;
  const barMaxWidth = 8.5;
  const colors = ['#6B7B3F', '#8A9B5C', '#A8B884', '#C4D4A0'];

  let currentX = 0.5;
  breakdown.forEach((item, i) => {
    const segWidth = (item.percentage / 100) * barMaxWidth;
    elements.push(
      { type: 'rect', x: currentX, y: breakdownY, w: segWidth, h: 0.5, fill: colors[i % colors.length], line: { color: colors[i % colors.length], width: 0 } },
    );
    if (segWidth > 0.5) {
      elements.push(
        { type: 'text', x: currentX, y: breakdownY, w: segWidth, h: 0.5, text: `${item.percentage}%`, fontSize: 12, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
      );
    }
    currentX += segWidth;
  });

  // Legend
  breakdown.forEach((item, i) => {
    const x = 0.5 + i * 2.3;
    elements.push(
      { type: 'rect', x, y: 4.45, w: 0.25, h: 0.25, fill: colors[i % colors.length], line: { color: colors[i % colors.length], width: 0 } },
      { type: 'text', x: x + 0.35, y: 4.4, w: 1.8, h: 0.3, text: item.category, fontSize: 12, color: COLORS.textPrimary, valign: 'middle' },
      { type: 'text', x: x + 0.35, y: 4.7, w: 1.8, h: 0.3, text: item.amount, fontSize: 14, bold: true, color: COLORS.textSecondary },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Runway Chart Component - Months of runway with cash position
const runwayChartMeta: IRComponentMeta = {
  id: 'runway-chart',
  name: '런웨이 차트',
  category: 'financials',
  description: '현금 포지션과 런웨이 예측',
  defaultProps: {
    title: 'Cash Runway',
    currentCash: '$2.7M',
    monthlyBurn: '$150K',
    months: [
      { label: 'Jan', cash: 2700 },
      { label: 'Feb', cash: 2550 },
      { label: 'Mar', cash: 2400 },
      { label: 'Apr', cash: 2250 },
      { label: 'May', cash: 2100 },
      { label: 'Jun', cash: 1950 },
    ],
    runwayMonths: 18,
    projectedZero: 'Jul 2026',
  },
  propSchema: {
    title: { type: 'string', label: '제목', default: 'Cash Runway' },
  },
};

function renderRunwayChart(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Cash Runway';
  const currentCash = (props.currentCash as string) || '$2.7M';
  const monthlyBurn = (props.monthlyBurn as string) || '$150K';
  const months = (props.months as Array<{label: string; cash: number}>) || [];
  const runwayMonths = (props.runwayMonths as number) || 18;
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 5, h: 0.5, text: title, fontSize: 32, bold: true, color: COLORS.textPrimary },
  );

  // KPI cards at top right
  elements.push(
    { type: 'rect', x: 5.5, y: 0.3, w: 2, h: 1.1, fill: COLORS.surface, line: { color: COLORS.border, width: 1 } },
    { type: 'text', x: 5.6, y: 0.45, w: 1.8, h: 0.25, text: 'Cash', fontSize: 14, color: COLORS.textSecondary },
    { type: 'text', x: 5.6, y: 0.75, w: 1.8, h: 0.5, text: currentCash, fontSize: 56, bold: true, color: COLORS.textPrimary },

    { type: 'rect', x: 7.6, y: 0.3, w: 1.9, h: 1.1, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    { type: 'text', x: 7.7, y: 0.45, w: 1.7, h: 0.25, text: 'Runway', fontSize: 14, color: 'rgba(255,255,255,0.8)' },
    { type: 'text', x: 7.7, y: 0.75, w: 1.7, h: 0.5, text: `${runwayMonths} mo`, fontSize: 56, bold: true, color: '#FFFFFF' },
  );

  // Chart area
  const chartX = 1.2;
  const chartY = 1.8;
  const chartWidth = 7.5;
  const chartHeight = 3.0;
  const maxCash = Math.max(...months.map(m => m.cash), 1);

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

  // Area fill and line
  const pointSpacing = chartWidth / (months.length - 1);
  months.forEach((month, i) => {
    const x = chartX + i * pointSpacing;
    const barHeight = (month.cash / maxCash) * chartHeight;
    const y = chartY + chartHeight - barHeight;

    // Bar
    elements.push(
      { type: 'rect', x: x - 0.35, y, w: 0.7, h: barHeight, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    );

    // Label
    elements.push(
      { type: 'text', x: x - 0.4, y: chartY + chartHeight + 0.1, w: 0.8, h: 0.3, text: month.label, fontSize: 12, color: COLORS.textSecondary, align: 'center' },
    );

    // Value on top
    if (i === 0 || i === months.length - 1) {
      elements.push(
        { type: 'text', x: x - 0.5, y: y - 0.35, w: 1.0, h: 0.3, text: `$${(month.cash / 1000).toFixed(1)}M`, fontSize: 12, bold: true, color: COLORS.textPrimary, align: 'center' },
      );
    }
  });

  // Monthly burn label
  elements.push(
    { type: 'text', x: 0.5, y: 5.1, w: 3, h: 0.3, text: `Monthly burn: ${monthlyBurn}`, fontSize: 12, color: COLORS.textSecondary },
  );

  return { elements, width: 10, height: 5.625 };
}

// Revenue Model Component - Revenue streams breakdown
const revenueModelMeta: IRComponentMeta = {
  id: 'revenue-model',
  name: '수익 모델',
  category: 'financials',
  description: '수익 스트림별 분석과 예측',
  defaultProps: {
    title: 'Revenue Model',
    streams: [
      { name: 'SaaS Subscriptions', current: '$800K', projected: '$2.4M', growth: '+200%', percentage: 60 },
      { name: 'Enterprise Contracts', current: '$400K', projected: '$1.2M', growth: '+200%', percentage: 30 },
      { name: 'Professional Services', current: '$100K', projected: '$200K', growth: '+100%', percentage: 10 },
    ],
    totalCurrent: '$1.3M',
    totalProjected: '$3.8M',
    projectionYear: '2025',
  },
  propSchema: {
    title: { type: 'string', label: '제목', default: 'Revenue Model' },
  },
};

function renderRevenueModel(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Revenue Model';
  const streams = (props.streams as Array<{name: string; current: string; projected: string; growth: string; percentage: number}>) || [];
  const totalCurrent = (props.totalCurrent as string) || '';
  const totalProjected = (props.totalProjected as string) || '';
  const projectionYear = (props.projectionYear as string) || '2025';
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 9, h: 0.5, text: title, fontSize: 32, bold: true, color: COLORS.textPrimary },
  );

  // Summary cards
  elements.push(
    { type: 'rect', x: 0.5, y: 1.0, w: 4.3, h: 1.5, fill: '#FFFFFF', line: { color: COLORS.border, width: 1 } },
    { type: 'text', x: 0.9, y: 1.25, w: 3.5, h: 0.3, text: 'Current ARR', fontSize: 14, color: COLORS.textSecondary },
    { type: 'text', x: 0.9, y: 1.6, w: 3.5, h: 0.7, text: totalCurrent, fontSize: 60, bold: true, color: COLORS.textPrimary },

    { type: 'rect', x: 5.1, y: 1.0, w: 4.4, h: 1.5, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    { type: 'text', x: 5.5, y: 1.25, w: 3.6, h: 0.3, text: `Projected ${projectionYear}`, fontSize: 14, color: 'rgba(255,255,255,0.8)' },
    { type: 'text', x: 5.5, y: 1.6, w: 3.6, h: 0.7, text: totalProjected, fontSize: 60, bold: true, color: '#FFFFFF' },
  );

  // Stream rows
  const rowY = 2.9;
  const rowHeight = 1.0;
  const colors = ['#6B7B3F', '#8A9B5C', '#A8B884'];

  streams.slice(0, 4).forEach((stream, i) => {
    const y = rowY + i * rowHeight;

    // Color indicator
    elements.push(
      { type: 'rect', x: 0.5, y: y + 0.2, w: 0.5, h: 0.6, fill: colors[i % colors.length], line: { color: colors[i % colors.length], width: 0 } },
    );

    // Stream name
    elements.push(
      { type: 'text', x: 1.2, y, w: 3, h: 0.5, text: stream.name, fontSize: 15, bold: true, color: COLORS.textPrimary, valign: 'middle' },
      { type: 'text', x: 1.2, y: y + 0.5, w: 3, h: 0.35, text: `${stream.percentage}% of revenue`, fontSize: 12, color: COLORS.textSecondary },
    );

    // Current
    elements.push(
      { type: 'text', x: 4.2, y, w: 1.8, h: 0.5, text: stream.current, fontSize: 16, color: COLORS.textPrimary, align: 'right', valign: 'middle' },
    );

    // Arrow
    elements.push(
      { type: 'text', x: 6.1, y, w: 0.5, h: 0.5, text: '→', fontSize: 18, color: COLORS.border, align: 'center', valign: 'middle' },
    );

    // Projected
    elements.push(
      { type: 'text', x: 6.7, y, w: 1.8, h: 0.5, text: stream.projected, fontSize: 16, bold: true, color: COLORS.accent, align: 'right', valign: 'middle' },
    );

    // Growth
    elements.push(
      { type: 'text', x: 8.6, y, w: 0.8, h: 0.5, text: stream.growth, fontSize: 14, bold: true, color: COLORS.positive, align: 'right', valign: 'middle' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// P&L Summary Component - Simplified P&L with key lines
const plSummaryMeta: IRComponentMeta = {
  id: 'pl-summary',
  name: '손익 요약',
  category: 'financials',
  description: '주요 항목 중심의 손익계산서 요약',
  defaultProps: {
    title: 'P&L Summary',
    period: 'FY 2024',
    lines: [
      { label: 'Revenue', value: '$4.2M', isTotal: false, isPositive: true },
      { label: 'Cost of Revenue', value: '($0.9M)', isTotal: false, isPositive: false },
      { label: 'Gross Profit', value: '$3.3M', isTotal: true, isPositive: true },
      { label: 'Operating Expenses', value: '($2.8M)', isTotal: false, isPositive: false },
      { label: 'EBITDA', value: '$0.5M', isTotal: true, isPositive: true },
    ],
    grossMargin: '78%',
    ebitdaMargin: '12%',
  },
  propSchema: {
    title: { type: 'string', label: '제목', default: 'P&L Summary' },
    period: { type: 'string', label: '기간', default: 'FY 2024' },
  },
};

function renderPLSummary(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'P&L Summary';
  const period = (props.period as string) || '';
  const lines = (props.lines as Array<{label: string; value: string; isTotal?: boolean; isPositive?: boolean}>) || [];
  const grossMargin = (props.grossMargin as string) || '';
  const ebitdaMargin = (props.ebitdaMargin as string) || '';
  const elements: PPTXElement[] = [];

  // Title and period
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 5, h: 0.5, text: title, fontSize: 32, bold: true, color: COLORS.textPrimary },
  );
  if (period) {
    elements.push(
      { type: 'text', x: 0.5, y: 0.95, w: 5, h: 0.3, text: period, fontSize: 14, color: COLORS.textSecondary },
    );
  }

  // Margin KPIs
  if (grossMargin || ebitdaMargin) {
    elements.push(
      { type: 'rect', x: 6.3, y: 0.4, w: 1.6, h: 1.0, fill: COLORS.surface, line: { color: COLORS.border, width: 1 } },
      { type: 'text', x: 6.4, y: 0.5, w: 1.4, h: 0.3, text: 'Gross', fontSize: 12, color: COLORS.textSecondary, align: 'center' },
      { type: 'text', x: 6.4, y: 0.8, w: 1.4, h: 0.45, text: grossMargin, fontSize: 56, bold: true, color: COLORS.accent, align: 'center' },

      { type: 'rect', x: 8.0, y: 0.4, w: 1.5, h: 1.0, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
      { type: 'text', x: 8.1, y: 0.5, w: 1.3, h: 0.3, text: 'EBITDA', fontSize: 12, color: 'rgba(255,255,255,0.8)', align: 'center' },
      { type: 'text', x: 8.1, y: 0.8, w: 1.3, h: 0.45, text: ebitdaMargin, fontSize: 56, bold: true, color: '#FFFFFF', align: 'center' },
    );
  }

  // P&L Lines
  const tableY = 1.8;
  const rowHeight = 0.8;

  lines.forEach((line, i) => {
    const y = tableY + i * rowHeight;
    const bgColor = line.isTotal ? COLORS.surface : '#FFFFFF';
    const textColor = line.isPositive === false ? COLORS.negative : COLORS.textPrimary;

    elements.push(
      { type: 'rect', x: 0.5, y, w: 9, h: rowHeight, fill: bgColor, line: { color: COLORS.border, width: 1 } },
      { type: 'text', x: 0.9, y, w: 5, h: rowHeight, text: line.label, fontSize: line.isTotal ? 16 : 14, bold: line.isTotal, color: COLORS.textPrimary, valign: 'middle' },
      { type: 'text', x: 5.7, y, w: 3.5, h: rowHeight, text: line.value, fontSize: line.isTotal ? 18 : 16, bold: line.isTotal, color: textColor, align: 'right', valign: 'middle' },
    );

    if (line.isTotal) {
      elements.push(
        { type: 'rect', x: 0.5, y, w: 0.5, h: rowHeight, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
      );
    }
  });

  return { elements, width: 10, height: 5.625 };
}

// Use of Funds Component - Pie/bar chart showing fund allocation
const useOfFundsMeta: IRComponentMeta = {
  id: 'use-of-funds',
  name: '자금 사용 계획',
  category: 'financials',
  description: '조달 자금의 사용 계획 시각화',
  defaultProps: {
    title: 'Use of Funds',
    totalRaise: '$5M',
    allocations: [
      { category: 'Product Development', amount: '$2M', percentage: 40 },
      { category: 'Sales & Marketing', amount: '$1.5M', percentage: 30 },
      { category: 'Operations', amount: '$1M', percentage: 20 },
      { category: 'G&A', amount: '$0.5M', percentage: 10 },
    ],
  },
  propSchema: {
    title: { type: 'string', label: '제목', default: 'Use of Funds' },
    totalRaise: { type: 'string', label: '총 조달 금액', default: '$5M' },
  },
};

function renderUseOfFunds(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Use of Funds';
  const totalRaise = (props.totalRaise as string) || '$5M';
  const allocations = (props.allocations as Array<{category: string; amount: string; percentage: number}>) || [];
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 5, h: 0.5, text: title, fontSize: 32, bold: true, color: COLORS.textPrimary },
  );

  // Total raise
  elements.push(
    { type: 'text', x: 5.5, y: 0.4, w: 4, h: 0.3, text: 'Total Raise', fontSize: 14, color: COLORS.textSecondary, align: 'right' },
    { type: 'text', x: 5.5, y: 0.7, w: 4, h: 0.6, text: totalRaise, fontSize: 60, bold: true, color: COLORS.accent, align: 'right' },
  );

  // Donut chart (simplified representation)
  const centerX = 2.5;
  const centerY = 3.0;
  const outerRadius = 1.4;
  const innerRadius = 0.8;
  const colors = ['#6B7B3F', '#8A9B5C', '#A8B884', '#C4D4A0'];

  // Outer circle
  elements.push(
    { type: 'ellipse', x: centerX - outerRadius, y: centerY - outerRadius, w: outerRadius * 2, h: outerRadius * 2, fill: COLORS.surface, line: { color: COLORS.border, width: 1 } },
  );

  // Segment indicators
  let currentAngle = -90;
  allocations.forEach((alloc, i) => {
    const segmentAngle = (alloc.percentage / 100) * 360;
    const midAngle = (currentAngle + segmentAngle / 2) * (Math.PI / 180);
    const indicatorRadius = outerRadius * 0.7;
    const indicatorX = centerX + indicatorRadius * Math.cos(midAngle);
    const indicatorY = centerY + indicatorRadius * Math.sin(midAngle);

    elements.push(
      { type: 'ellipse', x: indicatorX - 0.2, y: indicatorY - 0.2, w: 0.4, h: 0.4, fill: colors[i % colors.length], line: { color: colors[i % colors.length], width: 0 } },
    );
    currentAngle += segmentAngle;
  });

  // Inner circle (donut hole)
  elements.push(
    { type: 'ellipse', x: centerX - innerRadius, y: centerY - innerRadius, w: innerRadius * 2, h: innerRadius * 2, fill: '#FFFFFF', line: { color: '#FFFFFF', width: 0 } },
  );

  // Legend/details on right
  const legendX = 5.2;
  const legendY = 1.6;
  const rowHeight = 1.05;

  allocations.forEach((alloc, i) => {
    const y = legendY + i * rowHeight;

    // Color bar
    elements.push(
      { type: 'rect', x: legendX, y: y + 0.15, w: 0.5, h: 0.7, fill: colors[i % colors.length], line: { color: colors[i % colors.length], width: 0 } },
    );

    // Category
    elements.push(
      { type: 'text', x: legendX + 0.65, y, w: 3, h: 0.45, text: alloc.category, fontSize: 14, bold: true, color: COLORS.textPrimary },
    );

    // Amount and percentage
    elements.push(
      { type: 'text', x: legendX + 0.65, y: y + 0.45, w: 1.6, h: 0.4, text: alloc.amount, fontSize: 16, bold: true, color: colors[i % colors.length] },
      { type: 'text', x: legendX + 2.3, y: y + 0.45, w: 1.2, h: 0.4, text: `(${alloc.percentage}%)`, fontSize: 12, color: COLORS.textSecondary },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Financial Projections Component - 3-5 year projection table
const financialProjectionsMeta: IRComponentMeta = {
  id: 'financial-projections',
  name: '재무 전망',
  category: 'financials',
  description: '3-5년 재무 예측 테이블',
  defaultProps: {
    title: 'Financial Projections',
    years: ['2024', '2025', '2026', '2027', '2028'],
    metrics: [
      { label: 'Revenue', values: ['$1.2M', '$3.5M', '$8.0M', '$15M', '$28M'] },
      { label: 'Gross Margin', values: ['72%', '75%', '78%', '80%', '82%'] },
      { label: 'EBITDA', values: ['($0.8M)', '$0.2M', '$1.5M', '$4M', '$8M'] },
      { label: 'Headcount', values: ['15', '35', '70', '120', '200'] },
    ],
    cagr: '120%',
  },
  propSchema: {
    title: { type: 'string', label: '제목', default: 'Financial Projections' },
  },
};

function renderFinancialProjections(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Financial Projections';
  const years = (props.years as string[]) || [];
  const metrics = (props.metrics as Array<{label: string; values: string[]}>) || [];
  const cagr = (props.cagr as string) || '';
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 5, h: 0.5, text: title, fontSize: 32, bold: true, color: COLORS.textPrimary },
  );

  // CAGR badge
  if (cagr) {
    elements.push(
      { type: 'rect', x: 7.3, y: 0.4, w: 2.2, h: 0.9, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
      { type: 'text', x: 7.4, y: 0.5, w: 2.0, h: 0.3, text: 'CAGR', fontSize: 12, color: 'rgba(255,255,255,0.8)', align: 'center' },
      { type: 'text', x: 7.4, y: 0.75, w: 2.0, h: 0.45, text: cagr, fontSize: 56, bold: true, color: '#FFFFFF', align: 'center' },
    );
  }

  // Table
  const tableX = 0.5;
  const tableY = 1.6;
  const labelWidth = 2.4;
  const cellWidth = 1.45;
  const rowHeight = 0.85;

  // Header row
  elements.push(
    { type: 'rect', x: tableX, y: tableY, w: labelWidth + cellWidth * years.length, h: rowHeight, fill: COLORS.surface, line: { color: COLORS.border, width: 1 } },
  );

  years.forEach((year, i) => {
    elements.push(
      { type: 'text', x: tableX + labelWidth + i * cellWidth, y: tableY, w: cellWidth, h: rowHeight, text: year, fontSize: 14, bold: true, color: COLORS.textPrimary, align: 'center', valign: 'middle' },
    );
  });

  // Data rows
  metrics.forEach((metric, rowIdx) => {
    const y = tableY + (rowIdx + 1) * rowHeight;

    elements.push(
      { type: 'rect', x: tableX, y, w: labelWidth + cellWidth * years.length, h: rowHeight, fill: '#FFFFFF', line: { color: COLORS.border, width: 1 } },
      { type: 'text', x: tableX + 0.2, y, w: labelWidth - 0.4, h: rowHeight, text: metric.label, fontSize: 14, bold: true, color: COLORS.textPrimary, valign: 'middle' },
    );

    metric.values.slice(0, years.length).forEach((val, colIdx) => {
      const isNegative = val.includes('(') || val.startsWith('-');
      elements.push(
        { type: 'text', x: tableX + labelWidth + colIdx * cellWidth, y, w: cellWidth, h: rowHeight, text: val, fontSize: 13, color: isNegative ? COLORS.negative : COLORS.textPrimary, align: 'center', valign: 'middle' },
      );
    });
  });

  return { elements, width: 10, height: 5.625 };
}

// Unit Metrics Component - LTV, CAC, Payback, Gross Margin cards
const unitMetricsMeta: IRComponentMeta = {
  id: 'unit-metrics',
  name: '유닛 지표',
  category: 'financials',
  description: 'LTV, CAC, 페이백 등 핵심 유닛 지표 카드',
  defaultProps: {
    title: 'Unit Metrics',
    metrics: [
      { label: 'LTV', value: '$12,000', description: 'Lifetime Value', highlight: false },
      { label: 'CAC', value: '$2,000', description: 'Acquisition Cost', highlight: false },
      { label: 'LTV:CAC', value: '6:1', description: 'Ratio', highlight: true },
      { label: 'Payback', value: '8 months', description: 'CAC Recovery', highlight: false },
      { label: 'Gross Margin', value: '78%', description: 'After COGS', highlight: false },
      { label: 'Net Retention', value: '125%', description: 'Dollar Retention', highlight: true },
    ],
  },
  propSchema: {
    title: { type: 'string', label: '제목', default: 'Unit Metrics' },
  },
};

function renderUnitMetrics(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Unit Metrics';
  const metrics = (props.metrics as Array<{label: string; value: string; description?: string; highlight?: boolean}>) || [];
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 9, h: 0.5, text: title, fontSize: 32, bold: true, color: COLORS.textPrimary },
  );

  // 3x2 grid layout
  const cardWidth = 3.0;
  const cardHeight = 1.8;
  const gapX = 0.5;
  const gapY = 0.5;
  const startX = (10 - (cardWidth * 3 + gapX * 2)) / 2;
  const startY = 1.3;

  metrics.slice(0, 6).forEach((metric, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = startX + col * (cardWidth + gapX);
    const y = startY + row * (cardHeight + gapY);
    const isHighlight = metric.highlight;

    // Card
    elements.push(
      { type: 'rect', x, y, w: cardWidth, h: cardHeight, fill: isHighlight ? COLORS.accent : '#FFFFFF', line: { color: isHighlight ? COLORS.accent : COLORS.border, width: 1 } },
    );

    // Label
    elements.push(
      { type: 'text', x: x + 0.4, y: y + 0.3, w: cardWidth - 0.8, h: 0.3, text: metric.label, fontSize: 14, bold: true, color: isHighlight ? 'rgba(255,255,255,0.8)' : COLORS.textSecondary },
    );

    // Value
    elements.push(
      { type: 'text', x: x + 0.4, y: y + 0.65, w: cardWidth - 0.8, h: 0.7, text: metric.value, fontSize: 60, bold: true, color: isHighlight ? '#FFFFFF' : COLORS.textPrimary },
    );

    // Description
    if (metric.description) {
      elements.push(
        { type: 'text', x: x + 0.4, y: y + 1.4, w: cardWidth - 0.8, h: 0.3, text: metric.description, fontSize: 12, color: isHighlight ? 'rgba(255,255,255,0.7)' : COLORS.textSecondary },
      );
    }
  });

  return { elements, width: 10, height: 5.625 };
}

// Register all components
registry.register(capTableMeta, renderCapTable);
registry.register(burnRateMeta, renderBurnRate);
registry.register(runwayChartMeta, renderRunwayChart);
registry.register(revenueModelMeta, renderRevenueModel);
registry.register(plSummaryMeta, renderPLSummary);
registry.register(useOfFundsMeta, renderUseOfFunds);
registry.register(financialProjectionsMeta, renderFinancialProjections);
registry.register(unitMetricsMeta, renderUnitMetrics);

export {
  capTableMeta,
  burnRateMeta,
  runwayChartMeta,
  revenueModelMeta,
  plSummaryMeta,
  useOfFundsMeta,
  financialProjectionsMeta,
  unitMetricsMeta,
};
