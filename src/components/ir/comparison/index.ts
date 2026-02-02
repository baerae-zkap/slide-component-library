import { registry } from '@/lib/registry';
import type { IRComponentMeta, IRComponentRenderResult, PPTXElement } from '@/types';
import { COLORS } from '@/lib/constants';

// Feature Table Component - Feature comparison matrix
const featureTableMeta: IRComponentMeta = {
  id: 'feature-table',
  name: '기능 비교표',
  category: 'comparison',
  description: '기능 비교 테이블',
  defaultProps: {
    title: 'Plan Comparison',
    columns: ['Feature', 'Starter', 'Pro', 'Enterprise'],
    rows: [
      { feature: 'Users', values: ['5', '25', 'Unlimited'] },
      { feature: 'Storage', values: ['10GB', '100GB', '1TB'] },
      { feature: 'Support', values: ['Email', 'Priority', '24/7 Dedicated'] },
      { feature: 'API Access', values: ['Limited', 'Full', 'Full + Custom'] },
      { feature: 'Analytics', values: ['Basic', 'Advanced', 'Custom'] },
    ],
  },
  propSchema: {},
};

function renderFeatureTable(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Comparison';
  const columns = (props.columns as string[]) || [];
  const rows = (props.rows as Array<{feature: string; values: string[]}>) || [];

  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.35, w: 9, h: 0.45, text: title, fontSize: 26, bold: true, color: COLORS.textPrimary },
  );

  const startX = 0.6;
  const startY = 1.0;
  const firstColWidth = 2.0;
  const colWidth = (9.4 - firstColWidth) / (columns.length - 1);
  const headerHeight = 0.6;
  const rowHeight = 0.65;

  // Header row
  columns.forEach((col, i) => {
    const x = i === 0 ? startX : startX + firstColWidth + (i - 1) * colWidth;
    const width = i === 0 ? firstColWidth : colWidth;
    const isFirstCol = i === 0;
    const isHighlighted = col === 'Pro' || col === 'Recommended';

    elements.push(
      { type: 'rect', x, y: startY, w: width, h: headerHeight, fill: isFirstCol ? COLORS.surface : (isHighlighted ? COLORS.accent : COLORS.textPrimary), line: { color: COLORS.border, width: 0 } },
      { type: 'text', x: x + 0.4, y: startY, w: width - 0.2, h: headerHeight, text: col, fontSize: 12, bold: true, color: isFirstCol ? COLORS.textPrimary : '#FFFFFF', align: 'center', valign: 'middle' },
    );

    // Recommended badge
    if (isHighlighted) {
      elements.push(
        { type: 'text', x, y: startY - 0.22, w: width, h: 0.2, text: 'MOST POPULAR', fontSize: 12, bold: true, color: COLORS.accent, align: 'center' },
      );
    }
  });

  // Data rows
  rows.forEach((row, rowIdx) => {
    const y = startY + headerHeight + rowIdx * rowHeight;
    const isAltRow = rowIdx % 2 === 1;

    // Feature name (first column)
    elements.push(
      { type: 'rect', x: startX, y, w: firstColWidth, h: rowHeight, fill: isAltRow ? '#FFFFFF' : COLORS.surface, line: { color: COLORS.border, width: 0.5 } },
      { type: 'text', x: startX + 0.15, y, w: firstColWidth - 0.3, h: rowHeight, text: row.feature, fontSize: 14, bold: true, color: COLORS.textPrimary, align: 'left', valign: 'middle' },
    );

    // Values
    row.values.forEach((value, colIdx) => {
      const x = startX + firstColWidth + colIdx * colWidth;
      const isCheckmark = value === '✓' || value === '✗';
      const isProColumn = columns[colIdx + 1] === 'Pro' || columns[colIdx + 1] === 'Recommended';

      elements.push(
        { type: 'rect', x, y, w: colWidth, h: rowHeight, fill: isProColumn ? '#F0F7E6' : (isAltRow ? '#FFFFFF' : COLORS.surface), line: { color: COLORS.border, width: 0.5 } },
        { type: 'text', x, y, w: colWidth, h: rowHeight, text: value, fontSize: isCheckmark ? 14 : 11, color: value === '✓' ? COLORS.positive : value === '✗' ? COLORS.textSecondary : COLORS.textPrimary, align: 'center', valign: 'middle' },
      );
    });
  });

  return { elements, width: 10, height: 5.625 };
}

// VS Layout Component - Side-by-side comparison
const vsLayoutMeta: IRComponentMeta = {
  id: 'vs-layout',
  name: 'VS 레이아웃',
  category: 'comparison',
  description: '좌우 비교 레이아웃',
  defaultProps: {
    leftTitle: 'Traditional Approach',
    leftItems: [
      'Manual data entry',
      'Fragmented tools',
      'High overhead costs',
      'Slow time to market',
    ],
    rightTitle: 'Our Solution',
    rightItems: [
      'Automated workflows',
      'Unified platform',
      '60% cost reduction',
      '10x faster delivery',
    ],
  },
  propSchema: {},
};

function renderVSLayout(props: Record<string, unknown>): IRComponentRenderResult {
  const leftTitle = (props.leftTitle as string) || 'Before';
  const leftItems = (props.leftItems as string[]) || [];
  const rightTitle = (props.rightTitle as string) || 'After';
  const rightItems = (props.rightItems as string[]) || [];

  const elements: PPTXElement[] = [];

  const sideWidth = 4.0;
  const sideHeight = 4.2;
  const leftX = 0.5;
  const rightX = 5.5;
  const topY = 0.7;

  // Left side (problem/old way)
  elements.push(
    { type: 'rect', x: leftX, y: topY, w: sideWidth, h: sideHeight, fill: COLORS.surface, line: { color: COLORS.border, width: 3 } },
    // Title bar
    { type: 'rect', x: leftX, y: topY, w: sideWidth, h: 0.6, fill: COLORS.border, line: { color: COLORS.border, width: 0 } },
    { type: 'text', x: leftX, y: topY, w: sideWidth, h: 0.6, text: leftTitle, fontSize: 14, bold: true, color: COLORS.textPrimary, align: 'center', valign: 'middle' },
  );

  leftItems.forEach((item, i) => {
    const itemY = topY + 0.9 + i * 0.75;
    elements.push(
      // Bullet (minus/neutral)
      { type: 'ellipse', x: leftX + 0.3, y: itemY + 0.1, w: 0.3, h: 0.3, fill: COLORS.textSecondary, line: { color: COLORS.textSecondary, width: 0 } },
      { type: 'text', x: leftX + 0.3, y: itemY + 0.1, w: 0.3, h: 0.3, text: '−', fontSize: 16, color: '#FFFFFF', align: 'center', valign: 'middle' },
      // Text
      { type: 'text', x: leftX + 0.8, y: itemY, w: sideWidth - 1.1, h: 0.5, text: item, fontSize: 12, color: COLORS.textPrimary, valign: 'middle' },
    );
  });

  // VS badge in center
  elements.push(
    { type: 'ellipse', x: 4.4, y: topY + sideHeight / 2 - 0.5, w: 1.2, h: 1.0, fill: COLORS.accent, line: { color: '#FFFFFF', width: 3 } },
    { type: 'text', x: 4.4, y: topY + sideHeight / 2 - 0.5, w: 1.2, h: 1.0, text: 'VS', fontSize: 20, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
  );

  // Right side (solution/new way) - highlighted
  elements.push(
    { type: 'rect', x: rightX, y: topY, w: sideWidth, h: sideHeight, fill: '#FFFFFF', line: { color: COLORS.accent, width: 3 } },
    // Title bar
    { type: 'rect', x: rightX, y: topY, w: sideWidth, h: 0.6, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    { type: 'text', x: rightX, y: topY, w: sideWidth, h: 0.6, text: rightTitle, fontSize: 14, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
  );

  rightItems.forEach((item, i) => {
    const itemY = topY + 0.9 + i * 0.75;
    elements.push(
      // Bullet (check/positive)
      { type: 'ellipse', x: rightX + 0.3, y: itemY + 0.1, w: 0.3, h: 0.3, fill: COLORS.positive, line: { color: COLORS.positive, width: 0 } },
      { type: 'text', x: rightX + 0.3, y: itemY + 0.1, w: 0.3, h: 0.3, text: '✓', fontSize: 12, color: '#FFFFFF', align: 'center', valign: 'middle' },
      // Text
      { type: 'text', x: rightX + 0.8, y: itemY, w: sideWidth - 1.1, h: 0.5, text: item, fontSize: 12, color: COLORS.textPrimary, valign: 'middle' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Pricing Table Component - Professional pricing cards
const pricingTableMeta: IRComponentMeta = {
  id: 'pricing-table',
  name: '가격 비교표',
  category: 'comparison',
  description: '3단계 가격 비교',
  defaultProps: {
    plans: [
      { name: 'Starter', price: '$29', period: '/month', features: ['5 Users', '10GB Storage', 'Email Support', 'Basic Analytics'] },
      { name: 'Pro', price: '$79', period: '/month', features: ['25 Users', '100GB Storage', 'Priority Support', 'Advanced Analytics', 'API Access'], highlighted: true },
      { name: 'Enterprise', price: 'Custom', period: '', features: ['Unlimited Users', '1TB+ Storage', '24/7 Support', 'Custom Integration', 'Dedicated CSM'] },
    ],
  },
  propSchema: {},
};

function renderPricingTable(props: Record<string, unknown>): IRComponentRenderResult {
  const plans = (props.plans as Array<{ name: string; price: string; period?: string; features: string[]; highlighted?: boolean }>) || [];

  const elements: PPTXElement[] = [];

  const planCount = Math.min(plans.length, 3);
  const cardWidth = 2.9;
  const cardHeight = 4.5;
  const gap = 0.45;
  const totalWidth = planCount * cardWidth + (planCount - 1) * gap;
  const startX = (10 - totalWidth) / 2;
  const startY = 0.55;

  plans.slice(0, 3).forEach((plan, i) => {
    const x = startX + i * (cardWidth + gap);
    const isHighlighted = plan.highlighted || false;
    const y = isHighlighted ? startY - 0.15 : startY;
    const height = isHighlighted ? cardHeight + 0.3 : cardHeight;

    // Card background
    elements.push(
      { type: 'rect', x, y, w: cardWidth, h: height, fill: isHighlighted ? COLORS.accent : '#FFFFFF', line: { color: isHighlighted ? COLORS.accent : COLORS.border, width: isHighlighted ? 0 : 2 } },
    );

    // Highlighted badge
    if (isHighlighted) {
      elements.push(
        { type: 'rect', x: x + cardWidth / 2 - 0.6, y: y - 0.15, w: 1.2, h: 0.3, fill: COLORS.positive, line: { color: COLORS.positive, width: 0 } },
        { type: 'text', x: x + cardWidth / 2 - 0.6, y: y - 0.15, w: 1.2, h: 0.3, text: 'BEST VALUE', fontSize: 12, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
      );
    }

    // Plan name
    elements.push(
      { type: 'text', x: x + 0.5, y: y + 0.35, w: cardWidth - 0.4, h: 0.4, text: plan.name, fontSize: 16, bold: true, color: isHighlighted ? '#FFFFFF' : COLORS.textPrimary, align: 'center', valign: 'middle' },
    );

    // Price
    elements.push(
      { type: 'text', x: x + 0.5, y: y + 0.85, w: cardWidth - 0.4, h: 0.6, text: plan.price, fontSize: 32, bold: true, color: isHighlighted ? '#FFFFFF' : COLORS.accent, align: 'center', valign: 'middle' },
    );

    // Period
    if (plan.period) {
      elements.push(
        { type: 'text', x: x + 0.5, y: y + 1.45, w: cardWidth - 0.4, h: 0.3, text: plan.period, fontSize: 14, color: isHighlighted ? 'rgba(255,255,255,0.8)' : COLORS.textSecondary, align: 'center', valign: 'middle' },
      );
    }

    // Divider
    elements.push(
      { type: 'rect', x: x + 0.4, y: y + 1.85, w: cardWidth - 0.8, h: 0.02, fill: isHighlighted ? 'rgba(255,255,255,0.3)' : COLORS.border, line: { color: 'transparent', width: 0 } },
    );

    // Features
    plan.features.slice(0, 5).forEach((feature, featureIdx) => {
      const featureY = y + 2.1 + featureIdx * 0.45;
      elements.push(
        { type: 'text', x: x + 0.3, y: featureY, w: 0.25, h: 0.35, text: '✓', fontSize: 14, color: isHighlighted ? '#FFFFFF' : COLORS.positive, align: 'center', valign: 'middle' },
        { type: 'text', x: x + 0.6, y: featureY, w: cardWidth - 0.9, h: 0.35, text: feature, fontSize: 13, color: isHighlighted ? '#FFFFFF' : COLORS.textPrimary, valign: 'middle' },
      );
    });
  });

  return { elements, width: 10, height: 5.625 };
}

// Competitive Matrix Component - Feature checkmark matrix
const competitiveMatrixMeta: IRComponentMeta = {
  id: 'competitive-matrix',
  name: '경쟁사 비교 매트릭스',
  category: 'comparison',
  description: '기능 체크마크 매트릭스',
  defaultProps: {
    title: 'Competitive Analysis',
    features: ['AI-Powered', 'Real-time', 'No-Code', 'Enterprise', 'API'],
    competitors: [
      { name: 'Us', values: [true, true, true, true, true], highlight: true },
      { name: 'Competitor A', values: [true, true, false, false, true] },
      { name: 'Competitor B', values: [false, true, true, false, false] },
      { name: 'Competitor C', values: [true, false, false, true, true] },
    ],
  },
  propSchema: {},
};

function renderCompetitiveMatrix(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Comparison';
  const features = (props.features as string[]) || [];
  const competitors = (props.competitors as Array<{ name: string; values: boolean[]; highlight?: boolean }>) || [];

  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.35, w: 9, h: 0.45, text: title, fontSize: 26, bold: true, color: COLORS.textPrimary },
  );

  const startX = 0.5;
  const startY = 1.0;
  const labelWidth = 2.2;
  const colWidth = (9 - labelWidth) / features.length;
  const headerHeight = 0.7;
  const rowHeight = 0.75;

  // Feature headers (columns)
  features.forEach((feature, i) => {
    const x = startX + labelWidth + i * colWidth;
    elements.push(
      { type: 'rect', x, y: startY, w: colWidth, h: headerHeight, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
      { type: 'text', x: x + 0.05, y: startY, w: colWidth - 0.1, h: headerHeight, text: feature, fontSize: 13, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
    );
  });

  // Competitor rows
  competitors.forEach((competitor, rowIdx) => {
    const y = startY + headerHeight + rowIdx * rowHeight;
    const isHighlighted = competitor.highlight || false;

    // Competitor name (row header)
    elements.push(
      { type: 'rect', x: startX, y, w: labelWidth, h: rowHeight, fill: isHighlighted ? COLORS.accent : COLORS.surface, line: { color: COLORS.border, width: isHighlighted ? 0 : 1 } },
      { type: 'text', x: startX + 0.15, y, w: labelWidth - 0.3, h: rowHeight, text: competitor.name, fontSize: 12, bold: true, color: isHighlighted ? '#FFFFFF' : COLORS.textPrimary, align: 'left', valign: 'middle' },
    );

    // Feature checkmarks
    competitor.values.forEach((hasFeature, colIdx) => {
      const x = startX + labelWidth + colIdx * colWidth;

      elements.push(
        { type: 'rect', x, y, w: colWidth, h: rowHeight, fill: isHighlighted && hasFeature ? '#F0FDF4' : '#FFFFFF', line: { color: COLORS.border, width: 3 } },
      );

      if (hasFeature) {
        elements.push(
          { type: 'ellipse', x: x + colWidth / 2 - 0.18, y: y + rowHeight / 2 - 0.18, w: 0.36, h: 0.36, fill: COLORS.positive, line: { color: COLORS.positive, width: 0 } },
          { type: 'text', x: x + colWidth / 2 - 0.18, y: y + rowHeight / 2 - 0.18, w: 0.36, h: 0.36, text: '✓', fontSize: 12, color: '#FFFFFF', align: 'center', valign: 'middle' },
        );
      } else {
        elements.push(
          { type: 'text', x, y, w: colWidth, h: rowHeight, text: '−', fontSize: 16, color: COLORS.border, align: 'center', valign: 'middle' },
        );
      }
    });
  });

  return { elements, width: 10, height: 5.625 };
}

// Quadrant Chart Component - 2x2 grid with axis labels and items
const quadrantChartMeta: IRComponentMeta = {
  id: 'quadrant-chart',
  name: '쿼드런트 차트',
  category: 'comparison',
  description: '2x2 매트릭스 분석',
  defaultProps: {
    title: 'Priority Matrix',
    xAxis: { low: 'Low Effort', high: 'High Effort' },
    yAxis: { low: 'Low Impact', high: 'High Impact' },
    quadrants: [
      { label: 'Quick Wins', position: 'top-left', color: COLORS.positive },
      { label: 'Major Projects', position: 'top-right', color: COLORS.accent },
      { label: 'Fill-Ins', position: 'bottom-left', color: COLORS.textSecondary },
      { label: 'Thankless Tasks', position: 'bottom-right', color: COLORS.negative },
    ],
    items: [
      { name: 'Feature A', quadrant: 'top-left' },
      { name: 'Feature B', quadrant: 'top-right' },
      { name: 'Feature C', quadrant: 'bottom-left' },
    ],
  },
  propSchema: {},
};

function renderQuadrantChart(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Quadrant Chart';
  const xAxis = (props.xAxis as { low: string; high: string }) || { low: 'Low', high: 'High' };
  const yAxis = (props.yAxis as { low: string; high: string }) || { low: 'Low', high: 'High' };
  const quadrants = (props.quadrants as Array<{ label: string; position: string; color: string }>) || [];
  const items = (props.items as Array<{ name: string; quadrant: string }>) || [];
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.3, w: 9, h: 0.45, text: title, fontSize: 26, bold: true, color: COLORS.textPrimary },
  );

  const gridX = 1.8;
  const gridY = 1.0;
  const gridW = 6.5;
  const gridH = 4.0;
  const halfW = gridW / 2;
  const halfH = gridH / 2;

  // Quadrant backgrounds
  const quadrantPositions: Record<string, { x: number; y: number }> = {
    'top-left': { x: gridX, y: gridY },
    'top-right': { x: gridX + halfW, y: gridY },
    'bottom-left': { x: gridX, y: gridY + halfH },
    'bottom-right': { x: gridX + halfW, y: gridY + halfH },
  };

  quadrants.forEach((q) => {
    const pos = quadrantPositions[q.position];
    if (pos) {
      elements.push(
        { type: 'rect', x: pos.x, y: pos.y, w: halfW, h: halfH, fill: '#FFFFFF', line: { color: COLORS.border, width: 3 } },
        // Quadrant label
        { type: 'text', x: pos.x + 0.15, y: pos.y + 0.15, w: halfW - 0.3, h: 0.35, text: q.label, fontSize: 14, bold: true, color: q.color },
      );
    }
  });

  // Axis labels
  elements.push(
    // X-axis
    { type: 'text', x: gridX, y: gridY + gridH + 0.15, w: halfW, h: 0.3, text: xAxis.low, fontSize: 13, color: COLORS.textSecondary, align: 'center' },
    { type: 'text', x: gridX + halfW, y: gridY + gridH + 0.15, w: halfW, h: 0.3, text: xAxis.high, fontSize: 13, color: COLORS.textSecondary, align: 'center' },
    // Y-axis
    { type: 'text', x: gridX - 1.5, y: gridY + halfH / 2 - 0.15, w: 1.3, h: 0.3, text: yAxis.high, fontSize: 13, color: COLORS.textSecondary, align: 'right' },
    { type: 'text', x: gridX - 1.5, y: gridY + halfH + halfH / 2 - 0.15, w: 1.3, h: 0.3, text: yAxis.low, fontSize: 13, color: COLORS.textSecondary, align: 'right' },
  );

  // Center axes lines
  elements.push(
    { type: 'line', x: gridX + halfW, y: gridY, w: 0, h: gridH, line: { color: COLORS.accent, width: 3 } },
    { type: 'line', x: gridX, y: gridY + halfH, w: gridW, h: 0, line: { color: COLORS.accent, width: 3 } },
  );

  // Plot items
  const itemsByQuadrant: Record<string, Array<{ name: string }>> = {};
  items.forEach((item) => {
    if (!itemsByQuadrant[item.quadrant]) itemsByQuadrant[item.quadrant] = [];
    itemsByQuadrant[item.quadrant].push(item);
  });

  Object.entries(itemsByQuadrant).forEach(([quadrant, quadrantItems]) => {
    const pos = quadrantPositions[quadrant];
    if (pos) {
      quadrantItems.slice(0, 3).forEach((item, i) => {
        const itemY = pos.y + 0.6 + i * 0.55;
        elements.push(
          { type: 'rect', x: pos.x + 0.2, y: itemY, w: halfW - 0.4, h: 0.45, fill: COLORS.surface, line: { color: COLORS.border, width: 3 } },
          { type: 'text', x: pos.x + 0.3, y: itemY, w: halfW - 0.6, h: 0.45, text: item.name, fontSize: 13, color: COLORS.textPrimary, valign: 'middle' },
        );
      });
    }
  });

  return { elements, width: 10, height: 5.625 };
}

// Spectrum Scale Component - Horizontal scale bar with markers
const spectrumScaleMeta: IRComponentMeta = {
  id: 'spectrum-scale',
  name: '스펙트럼 척도',
  category: 'comparison',
  description: '수평 척도 바 및 마커',
  defaultProps: {
    title: 'Market Positioning',
    leftLabel: 'Budget',
    rightLabel: 'Premium',
    markers: [
      { name: 'Competitor A', position: 0.2 },
      { name: 'Competitor B', position: 0.4 },
      { name: 'Us', position: 0.7, highlight: true },
      { name: 'Competitor C', position: 0.9 },
    ],
    subtitle: 'Price-to-Value Positioning',
  },
  propSchema: {},
};

function renderSpectrumScale(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Spectrum Scale';
  const leftLabel = (props.leftLabel as string) || 'Low';
  const rightLabel = (props.rightLabel as string) || 'High';
  const markers = (props.markers as Array<{ name: string; position: number; highlight?: boolean }>) || [];
  const subtitle = (props.subtitle as string) || '';
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 9, h: 0.5, text: title, fontSize: 29, bold: true, color: COLORS.textPrimary },
  );

  if (subtitle) {
    elements.push(
      { type: 'text', x: 0.5, y: 0.95, w: 9, h: 0.35, text: subtitle, fontSize: 12, color: COLORS.textSecondary },
    );
  }

  const barX = 1.0;
  const barY = 2.8;
  const barW = 8.0;
  const barH = 0.6;

  // Gradient bar (simulated with segments)
  const gradientColors = ['#DC2626', '#F97316', '#EAB308', '#84CC16', '#22C55E'];
  gradientColors.forEach((color, i) => {
    const segW = barW / gradientColors.length;
    elements.push(
      { type: 'rect', x: barX + i * segW, y: barY, w: segW, h: barH, fill: color, line: { color: color, width: 0 } },
    );
  });

  // Bar border
  elements.push(
    { type: 'rect', x: barX, y: barY, w: barW, h: barH, fill: 'transparent', line: { color: COLORS.textPrimary, width: 3 } },
  );

  // End labels
  elements.push(
    { type: 'text', x: barX, y: barY + barH + 0.15, w: 1.5, h: 0.35, text: leftLabel, fontSize: 12, bold: true, color: COLORS.textPrimary },
    { type: 'text', x: barX + barW - 1.5, y: barY + barH + 0.15, w: 1.5, h: 0.35, text: rightLabel, fontSize: 12, bold: true, color: COLORS.textPrimary, align: 'right' },
  );

  // Markers
  markers.forEach((marker, i) => {
    const markerX = barX + marker.position * barW;
    const markerSize = marker.highlight ? 0.5 : 0.4;
    const labelY = i % 2 === 0 ? barY - 1.2 : barY - 0.7;

    // Marker dot
    elements.push(
      { type: 'ellipse', x: markerX - markerSize / 2, y: barY + barH / 2 - markerSize / 2, w: markerSize, h: markerSize, fill: marker.highlight ? COLORS.accent : COLORS.textPrimary, line: { color: '#FFFFFF', width: 3 } },
    );

    // Connector line
    elements.push(
      { type: 'line', x: markerX, y: labelY + 0.4, w: 0, h: barY - labelY - 0.4, line: { color: marker.highlight ? COLORS.accent : COLORS.textSecondary, width: 3 } },
    );

    // Label
    elements.push(
      { type: 'rect', x: markerX - 0.8, y: labelY, w: 1.6, h: 0.4, fill: marker.highlight ? COLORS.accent : '#FFFFFF', line: { color: marker.highlight ? COLORS.accent : COLORS.border, width: 3 } },
      { type: 'text', x: markerX - 0.8, y: labelY, w: 1.6, h: 0.4, text: marker.name, fontSize: 13, bold: marker.highlight, color: marker.highlight ? '#FFFFFF' : COLORS.textPrimary, align: 'center', valign: 'middle' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Register components
registry.register(featureTableMeta, renderFeatureTable);
registry.register(vsLayoutMeta, renderVSLayout);
registry.register(pricingTableMeta, renderPricingTable);
registry.register(competitiveMatrixMeta, renderCompetitiveMatrix);
registry.register(quadrantChartMeta, renderQuadrantChart);
registry.register(spectrumScaleMeta, renderSpectrumScale);

export { featureTableMeta, vsLayoutMeta, pricingTableMeta, competitiveMatrixMeta, quadrantChartMeta, spectrumScaleMeta };
