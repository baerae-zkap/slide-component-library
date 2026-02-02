import { registry } from '@/lib/registry';
import type { IRComponentMeta, IRComponentRenderResult, PPTXElement } from '@/types';
import { COLORS } from '@/lib/constants';

// Risk Matrix Component - 2x2 impact/probability matrix
const riskMatrixMeta: IRComponentMeta = {
  id: 'risk-matrix',
  name: '리스크 매트릭스',
  category: 'risk-ask',
  description: '2x2 영향도/발생확률 매트릭스',
  defaultProps: {
    title: 'Risk Assessment Matrix',
    risks: [
      { name: 'Market Competition', impact: 'high', probability: 'medium', quadrant: 'top-right' },
      { name: 'Regulatory Changes', impact: 'high', probability: 'low', quadrant: 'top-left' },
      { name: 'Tech Dependencies', impact: 'medium', probability: 'medium', quadrant: 'center' },
      { name: 'Talent Retention', impact: 'medium', probability: 'low', quadrant: 'bottom-left' },
    ],
  },
  propSchema: {
    title: { type: 'string', label: '제목', default: 'Risk Assessment Matrix' },
  },
};

function renderRiskMatrix(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Risk Assessment Matrix';
  const risks = (props.risks as Array<{name: string; impact: string; probability: string; quadrant: string}>) || [];
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 9, h: 0.5, text: title, fontSize: 29, bold: true, color: COLORS.textPrimary },
    { type: 'rect', x: 0.5, y: 0.95, w: 1.2, h: 0.5, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
  );

  // Matrix dimensions
  const matrixX = 1.5;
  const matrixY = 1.4;
  const matrixSize = 3.6;
  const cellSize = matrixSize / 2;

  // Y-axis label (Impact)
  elements.push(
    { type: 'text', x: 0.3, y: matrixY + matrixSize / 2 - 0.2, w: 1, h: 0.4, text: 'IMPACT', fontSize: 13, bold: true, color: COLORS.textSecondary, align: 'center' },
  );
  elements.push(
    { type: 'text', x: 0.8, y: matrixY + 0.3, w: 0.6, h: 0.3, text: 'High', fontSize: 12, color: COLORS.textSecondary, align: 'right' },
    { type: 'text', x: 0.8, y: matrixY + cellSize + 0.3, w: 0.6, h: 0.3, text: 'Low', fontSize: 12, color: COLORS.textSecondary, align: 'right' },
  );

  // X-axis label (Probability)
  elements.push(
    { type: 'text', x: matrixX + matrixSize / 2 - 0.5, y: matrixY + matrixSize + 0.15, w: 1, h: 0.3, text: 'PROBABILITY', fontSize: 13, bold: true, color: COLORS.textSecondary, align: 'center' },
  );
  elements.push(
    { type: 'text', x: matrixX + 0.3, y: matrixY + matrixSize + 0.4, w: 0.8, h: 0.3, text: 'Low', fontSize: 12, color: COLORS.textSecondary, align: 'center' },
    { type: 'text', x: matrixX + cellSize + 0.3, y: matrixY + matrixSize + 0.4, w: 0.8, h: 0.3, text: 'High', fontSize: 12, color: COLORS.textSecondary, align: 'center' },
  );

  // Quadrant colors (top-left, top-right, bottom-left, bottom-right)
  const quadrantColors = {
    'top-left': '#FEF3C7',     // Yellow (High impact, Low probability) - Monitor
    'top-right': '#FEE2E2',    // Red (High impact, High probability) - Mitigate
    'bottom-left': '#D1FAE5',  // Green (Low impact, Low probability) - Accept
    'bottom-right': '#FEF3C7', // Yellow (Low impact, High probability) - Monitor
  };

  // Draw quadrants
  elements.push(
    { type: 'rect', x: matrixX, y: matrixY, w: cellSize, h: cellSize, fill: quadrantColors['top-left'], line: { color: COLORS.border, width: 3 } },
    { type: 'rect', x: matrixX + cellSize, y: matrixY, w: cellSize, h: cellSize, fill: quadrantColors['top-right'], line: { color: COLORS.border, width: 3 } },
    { type: 'rect', x: matrixX, y: matrixY + cellSize, w: cellSize, h: cellSize, fill: quadrantColors['bottom-left'], line: { color: COLORS.border, width: 3 } },
    { type: 'rect', x: matrixX + cellSize, y: matrixY + cellSize, w: cellSize, h: cellSize, fill: quadrantColors['bottom-right'], line: { color: COLORS.border, width: 3 } },
  );

  // Quadrant labels
  elements.push(
    { type: 'text', x: matrixX + 0.1, y: matrixY + cellSize - 0.35, w: cellSize - 0.2, h: 0.25, text: 'MONITOR', fontSize: 12, bold: true, color: '#92400E', align: 'center' },
    { type: 'text', x: matrixX + cellSize + 0.1, y: matrixY + cellSize - 0.35, w: cellSize - 0.2, h: 0.25, text: 'MITIGATE', fontSize: 12, bold: true, color: '#991B1B', align: 'center' },
    { type: 'text', x: matrixX + 0.1, y: matrixY + matrixSize - 0.35, w: cellSize - 0.2, h: 0.25, text: 'ACCEPT', fontSize: 12, bold: true, color: '#065F46', align: 'center' },
    { type: 'text', x: matrixX + cellSize + 0.1, y: matrixY + matrixSize - 0.35, w: cellSize - 0.2, h: 0.25, text: 'MONITOR', fontSize: 12, bold: true, color: '#92400E', align: 'center' },
  );

  // Plot risks
  const quadrantPositions: Record<string, {x: number; y: number}> = {
    'top-left': { x: matrixX + cellSize * 0.5, y: matrixY + cellSize * 0.4 },
    'top-right': { x: matrixX + cellSize * 1.5, y: matrixY + cellSize * 0.4 },
    'bottom-left': { x: matrixX + cellSize * 0.5, y: matrixY + cellSize * 1.4 },
    'bottom-right': { x: matrixX + cellSize * 1.5, y: matrixY + cellSize * 1.4 },
    'center': { x: matrixX + cellSize, y: matrixY + cellSize },
  };

  risks.forEach((risk, i) => {
    const pos = quadrantPositions[risk.quadrant] || quadrantPositions['center'];
    const offsetX = (i % 2) * 0.4 - 0.2;
    const offsetY = Math.floor(i / 2) * 0.3 - 0.15;

    elements.push(
      { type: 'ellipse', x: pos.x + offsetX - 0.15, y: pos.y + offsetY - 0.15, w: 0.3, h: 0.3, fill: COLORS.accent, line: { color: '#FFFFFF', width: 3 } },
      { type: 'text', x: pos.x + offsetX - 0.15, y: pos.y + offsetY - 0.15, w: 0.3, h: 0.3, text: String(i + 1), fontSize: 13, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
    );
  });

  // Risk legend on right
  const legendX = 5.8;
  const legendY = 1.4;
  const legendRowHeight = 0.75;

  elements.push(
    { type: 'text', x: legendX, y: legendY, w: 3.5, h: 0.35, text: 'KEY RISKS', fontSize: 14, bold: true, color: COLORS.textSecondary },
  );

  risks.slice(0, 5).forEach((risk, i) => {
    const y = legendY + 0.45 + i * legendRowHeight;

    elements.push(
      { type: 'ellipse', x: legendX, y: y + 0.05, w: 0.25, h: 0.25, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
      { type: 'text', x: legendX, y: y + 0.05, w: 0.25, h: 0.25, text: String(i + 1), fontSize: 12, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
      { type: 'text', x: legendX + 0.4, y: y, w: 3.0, h: 0.35, text: risk.name, fontSize: 14, color: COLORS.textPrimary, valign: 'middle' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Mitigation Plan Component - Risk and mitigation pairs
const mitigationPlanMeta: IRComponentMeta = {
  id: 'mitigation-plan',
  name: '완화 계획',
  category: 'risk-ask',
  description: '리스크와 완화 방안 쌍',
  defaultProps: {
    title: 'Risk Mitigation Plan',
    items: [
      { risk: 'Market Competition', mitigation: 'Continuous innovation, patent portfolio, strong brand positioning', status: 'active' },
      { risk: 'Regulatory Changes', mitigation: 'Dedicated compliance team, proactive engagement with regulators', status: 'active' },
      { risk: 'Technical Debt', mitigation: 'Quarterly refactoring sprints, automated testing coverage', status: 'planned' },
      { risk: 'Key Person Risk', mitigation: 'Knowledge documentation, succession planning, equity incentives', status: 'active' },
    ],
  },
  propSchema: {
    title: { type: 'string', label: '제목', default: 'Risk Mitigation Plan' },
  },
};

function renderMitigationPlan(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Risk Mitigation Plan';
  const items = (props.items as Array<{risk: string; mitigation: string; status?: string}>) || [];
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 9, h: 0.5, text: title, fontSize: 29, bold: true, color: COLORS.textPrimary },
    { type: 'rect', x: 0.5, y: 0.95, w: 1.2, h: 0.5, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
  );

  // Table header
  const tableX = 0.5;
  const tableY = 1.3;
  const riskColWidth = 2.5;
  const mitigationColWidth = 5.5;
  const statusColWidth = 1.0;
  const rowHeight = 0.9;

  elements.push(
    { type: 'rect', x: tableX, y: tableY, w: riskColWidth + mitigationColWidth + statusColWidth, h: 0.45, fill: COLORS.surface, line: { color: COLORS.border, width: 3 } },
    { type: 'text', x: tableX + 0.15, y: tableY + 0.08, w: riskColWidth - 0.3, h: 0.3, text: 'RISK', fontSize: 13, bold: true, color: COLORS.textSecondary },
    { type: 'text', x: tableX + riskColWidth + 0.15, y: tableY + 0.08, w: mitigationColWidth - 0.3, h: 0.3, text: 'MITIGATION STRATEGY', fontSize: 13, bold: true, color: COLORS.textSecondary },
    { type: 'text', x: tableX + riskColWidth + mitigationColWidth + 0.1, y: tableY + 0.08, w: statusColWidth - 0.2, h: 0.3, text: 'STATUS', fontSize: 13, bold: true, color: COLORS.textSecondary, align: 'center' },
  );

  // Table rows
  items.slice(0, 4).forEach((item, i) => {
    const y = tableY + 0.45 + i * rowHeight;
    const status = item.status || 'active';
    const statusColor = status === 'active' ? COLORS.positive : status === 'planned' ? '#F59E0B' : COLORS.textSecondary;
    const statusText = status === 'active' ? 'Active' : status === 'planned' ? 'Planned' : 'Review';

    // Row background
    elements.push(
      { type: 'rect', x: tableX, y, w: riskColWidth + mitigationColWidth + statusColWidth, h: rowHeight, fill: '#FFFFFF', line: { color: COLORS.border, width: 3 } },
    );

    // Risk warning icon
    elements.push(
      { type: 'ellipse', x: tableX + 0.15, y: y + (rowHeight - 0.3) / 2, w: 0.3, h: 0.3, fill: '#FEE2E2', line: { color: '#FEE2E2', width: 0 } },
      { type: 'text', x: tableX + 0.15, y: y + (rowHeight - 0.3) / 2, w: 0.3, h: 0.3, text: '!', fontSize: 12, bold: true, color: '#991B1B', align: 'center', valign: 'middle' },
    );

    // Risk text
    elements.push(
      { type: 'text', x: tableX + 0.55, y: y + 0.1, w: riskColWidth - 0.7, h: rowHeight - 0.2, text: item.risk, fontSize: 14, bold: true, color: COLORS.textPrimary, valign: 'middle' },
    );

    // Mitigation text
    elements.push(
      { type: 'text', x: tableX + riskColWidth + 0.15, y: y + 0.1, w: mitigationColWidth - 0.3, h: rowHeight - 0.2, text: item.mitigation, fontSize: 13, color: COLORS.textSecondary, valign: 'middle' },
    );

    // Status badge
    elements.push(
      { type: 'rect', x: tableX + riskColWidth + mitigationColWidth + 0.1, y: y + (rowHeight - 0.3) / 2, w: statusColWidth - 0.2, h: 0.3, fill: statusColor, line: { color: statusColor, width: 0 } },
      { type: 'text', x: tableX + riskColWidth + mitigationColWidth + 0.1, y: y + (rowHeight - 0.3) / 2, w: statusColWidth - 0.2, h: 0.3, text: statusText, fontSize: 12, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Funding Ask Component - The ask slide with amount and terms
const fundingAskMeta: IRComponentMeta = {
  id: 'funding-ask',
  name: '투자 요청',
  category: 'risk-ask',
  description: '투자 금액과 조건을 보여주는 슬라이드',
  defaultProps: {
    headline: 'Series A Funding',
    amount: '$15M',
    valuation: '$60M Pre-Money',
    terms: [
      { label: 'Round Size', value: '$15M' },
      { label: 'Pre-Money', value: '$60M' },
      { label: 'Equity', value: '20%' },
      { label: 'Lead Investor', value: 'TBD' },
    ],
    useOfFunds: [
      { category: 'Product & Engineering', percentage: 50 },
      { category: 'Sales & Marketing', percentage: 30 },
      { category: 'Operations', percentage: 15 },
      { category: 'G&A', percentage: 5 },
    ],
  },
  propSchema: {
    headline: { type: 'string', label: '헤드라인', default: 'Series A Funding' },
    amount: { type: 'string', label: '투자 금액', default: '$15M' },
  },
};

function renderFundingAsk(props: Record<string, unknown>): IRComponentRenderResult {
  const headline = (props.headline as string) || 'Funding Round';
  const amount = (props.amount as string) || '$10M';
  const valuation = (props.valuation as string) || '';
  const terms = (props.terms as Array<{label: string; value: string}>) || [];
  const useOfFunds = (props.useOfFunds as Array<{category: string; percentage: number}>) || [];
  const elements: PPTXElement[] = [];

  // Large headline and amount - centered top
  elements.push(
    { type: 'text', x: 0, y: 0.5, w: 10, h: 0.5, text: headline, fontSize: 18, color: COLORS.textSecondary, align: 'center' },
    { type: 'text', x: 0, y: 1.0, w: 10, h: 1.0, text: amount, fontSize: 64, bold: true, color: COLORS.accent, align: 'center' },
  );

  if (valuation) {
    elements.push(
      { type: 'text', x: 0, y: 2.0, w: 10, h: 0.4, text: valuation, fontSize: 16, color: COLORS.textSecondary, align: 'center' },
    );
  }

  // Terms on left
  const termsX = 0.8;
  const termsY = 2.7;
  const termHeight = 0.55;

  elements.push(
    { type: 'text', x: termsX, y: termsY, w: 4, h: 0.35, text: 'DEAL TERMS', fontSize: 13, bold: true, color: COLORS.textSecondary },
  );

  terms.slice(0, 4).forEach((term, i) => {
    const y = termsY + 0.4 + i * termHeight;
    elements.push(
      { type: 'text', x: termsX, y, w: 2.0, h: termHeight, text: term.label, fontSize: 14, color: COLORS.textSecondary, valign: 'middle' },
      { type: 'text', x: termsX + 2.0, y, w: 1.8, h: termHeight, text: term.value, fontSize: 14, bold: true, color: COLORS.textPrimary, valign: 'middle' },
    );
  });

  // Use of funds on right
  const fundsX = 5.5;
  const fundsY = 2.7;
  const barWidth = 3.5;
  const barHeight = 0.45;
  const barGap = 0.15;
  const colors = ['#6B7B3F', '#8A9B5C', '#A8B884', '#C4D4A0'];

  elements.push(
    { type: 'text', x: fundsX, y: fundsY, w: 4, h: 0.35, text: 'USE OF FUNDS', fontSize: 13, bold: true, color: COLORS.textSecondary },
  );

  useOfFunds.slice(0, 4).forEach((fund, i) => {
    const y = fundsY + 0.45 + i * (barHeight + barGap);
    const segWidth = (fund.percentage / 100) * barWidth;

    // Background bar
    elements.push(
      { type: 'rect', x: fundsX, y, w: barWidth, h: barHeight, fill: COLORS.surface, line: { color: COLORS.border, width: 3 } },
    );

    // Filled portion
    elements.push(
      { type: 'rect', x: fundsX, y, w: segWidth, h: barHeight, fill: colors[i % colors.length], line: { color: colors[i % colors.length], width: 0 } },
    );

    // Label and percentage
    elements.push(
      { type: 'text', x: fundsX + 0.1, y, w: barWidth - 0.6, h: barHeight, text: fund.category, fontSize: 13, color: segWidth > barWidth * 0.3 ? '#FFFFFF' : COLORS.textPrimary, valign: 'middle' },
      { type: 'text', x: fundsX + barWidth - 0.5, y, w: 0.45, h: barHeight, text: `${fund.percentage}%`, fontSize: 13, bold: true, color: segWidth > barWidth * 0.85 ? '#FFFFFF' : COLORS.textPrimary, align: 'right', valign: 'middle' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Investment Highlights Component - Key investment reasons
const investmentHighlightsMeta: IRComponentMeta = {
  id: 'investment-highlights',
  name: '투자 하이라이트',
  category: 'risk-ask',
  description: '핵심 투자 포인트',
  defaultProps: {
    title: 'Investment Highlights',
    highlights: [
      { icon: '📈', title: 'Massive Market', description: '$50B TAM growing 25% annually' },
      { icon: '🚀', title: 'Proven Traction', description: '3x YoY revenue growth, 150% NRR' },
      { icon: '👥', title: 'World-Class Team', description: 'Ex-Google, Meta, McKinsey leadership' },
      { icon: '🛡️', title: 'Defensible Moat', description: 'Proprietary technology, network effects' },
      { icon: '💰', title: 'Capital Efficient', description: '$1M ARR with only $2M raised' },
      { icon: '🎯', title: 'Clear Path to Exit', description: 'Multiple strategic acquirers, IPO potential' },
    ],
  },
  propSchema: {
    title: { type: 'string', label: '제목', default: 'Investment Highlights' },
  },
};

function renderInvestmentHighlights(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Investment Highlights';
  const highlights = (props.highlights as Array<{icon?: string; title: string; description: string}>) || [];
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 9, h: 0.5, text: title, fontSize: 29, bold: true, color: COLORS.textPrimary },
    { type: 'rect', x: 0.5, y: 0.95, w: 1.2, h: 0.5, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
  );

  // 3x2 grid of highlights
  const cardWidth = 2.8;
  const cardHeight = 1.35;
  const gapX = 0.45;
  const gapY = 0.25;
  const startX = (10 - (cardWidth * 3 + gapX * 2)) / 2;
  const startY = 1.25;

  highlights.slice(0, 6).forEach((highlight, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = startX + col * (cardWidth + gapX);
    const y = startY + row * (cardHeight + gapY);

    // Card background
    elements.push(
      { type: 'rect', x, y, w: cardWidth, h: cardHeight, fill: '#FFFFFF', line: { color: COLORS.border, width: 3 } },
      { type: 'rect', x, y, w: 0.08, h: cardHeight, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    );

    // Icon circle
    if (highlight.icon) {
      elements.push(
        { type: 'ellipse', x: x + 0.5, y: y + 0.15, w: 0.45, h: 0.45, fill: COLORS.surface, line: { color: COLORS.border, width: 3 } },
        { type: 'text', x: x + 0.5, y: y + 0.15, w: 0.45, h: 0.45, text: highlight.icon, fontSize: 14, align: 'center', valign: 'middle' },
      );
    }

    // Title
    elements.push(
      { type: 'text', x: x + 0.75, y: y + 0.18, w: cardWidth - 0.95, h: 0.35, text: highlight.title, fontSize: 12, bold: true, color: COLORS.textPrimary, valign: 'middle' },
    );

    // Description
    elements.push(
      { type: 'text', x: x + 0.5, y: y + 0.7, w: cardWidth - 0.4, h: 0.55, text: highlight.description, fontSize: 13, color: COLORS.textSecondary, valign: 'top' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Next Milestones Component - What will be achieved with funding
const nextMilestonesMeta: IRComponentMeta = {
  id: 'next-milestones',
  name: '다음 마일스톤',
  category: 'risk-ask',
  description: '투자 후 달성 목표',
  defaultProps: {
    title: 'Milestones with This Round',
    timeframe: '18-Month Roadmap',
    milestones: [
      { quarter: 'Q1-Q2', title: 'Product Expansion', items: ['Launch v2.0 platform', 'Mobile app release', '3 new integrations'] },
      { quarter: 'Q3-Q4', title: 'Market Expansion', items: ['Enter EU market', '50 enterprise customers', 'SOC 2 certification'] },
      { quarter: 'Q5-Q6', title: 'Scale Operations', items: ['$5M ARR milestone', '100-person team', 'Series B ready'] },
    ],
    targetMetrics: [
      { label: 'ARR', current: '$1M', target: '$5M' },
      { label: 'Customers', current: '25', target: '150' },
      { label: 'Team Size', current: '20', target: '100' },
    ],
  },
  propSchema: {
    title: { type: 'string', label: '제목', default: 'Milestones with This Round' },
  },
};

function renderNextMilestones(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Milestones with This Round';
  const timeframe = (props.timeframe as string) || '';
  const milestones = (props.milestones as Array<{quarter: string; title: string; items: string[]}>) || [];
  const targetMetrics = (props.targetMetrics as Array<{label: string; current: string; target: string}>) || [];
  const elements: PPTXElement[] = [];

  // Title and timeframe
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 7, h: 0.5, text: title, fontSize: 29, bold: true, color: COLORS.textPrimary },
  );
  if (timeframe) {
    elements.push(
      { type: 'rect', x: 7.5, y: 0.45, w: 2.0, h: 0.35, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
      { type: 'text', x: 7.5, y: 0.45, w: 2.0, h: 0.35, text: timeframe, fontSize: 13, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
    );
  }

  // Timeline
  const timelineY = 1.2;
  const timelineWidth = 8.4;
  const startX = 0.8;

  // Timeline bar
  elements.push(
    { type: 'rect', x: startX, y: timelineY + 0.4, w: timelineWidth, h: 0.06, fill: COLORS.border, line: { color: COLORS.border, width: 0 } },
  );

  // Milestone columns
  const colWidth = timelineWidth / milestones.length;

  milestones.slice(0, 3).forEach((milestone, i) => {
    const x = startX + i * colWidth;

    // Timeline node
    elements.push(
      { type: 'ellipse', x: x + colWidth / 2 - 0.15, y: timelineY + 0.28, w: 0.3, h: 0.3, fill: COLORS.accent, line: { color: '#FFFFFF', width: 3 } },
    );

    // Quarter label
    elements.push(
      { type: 'text', x: x, y: timelineY - 0.05, w: colWidth, h: 0.3, text: milestone.quarter, fontSize: 13, bold: true, color: COLORS.accent, align: 'center' },
    );

    // Phase title
    elements.push(
      { type: 'text', x: x + 0.4, y: timelineY + 0.75, w: colWidth - 0.2, h: 0.35, text: milestone.title, fontSize: 12, bold: true, color: COLORS.textPrimary, align: 'center' },
    );

    // Items
    milestone.items.slice(0, 3).forEach((item, j) => {
      const itemY = timelineY + 1.15 + j * 0.4;
      elements.push(
        { type: 'ellipse', x: x + 0.3, y: itemY + 0.08, w: 0.12, h: 0.12, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
        { type: 'text', x: x + 0.5, y: itemY, w: colWidth - 0.6, h: 0.35, text: item, fontSize: 13, color: COLORS.textSecondary, valign: 'middle' },
      );
    });
  });

  // Target metrics at bottom
  if (targetMetrics.length > 0) {
    const metricsY = 4.4;
    const metricWidth = 2.8;
    const metricsStartX = (10 - targetMetrics.length * metricWidth - (targetMetrics.length - 1) * 0.2) / 2;

    elements.push(
      { type: 'rect', x: 0.5, y: metricsY - 0.15, w: 9, h: 0.02, fill: COLORS.border, line: { color: COLORS.border, width: 0 } },
    );

    targetMetrics.slice(0, 3).forEach((metric, i) => {
      const x = metricsStartX + i * (metricWidth + 0.2);

      elements.push(
        { type: 'text', x, y: metricsY + 0.1, w: metricWidth, h: 0.25, text: metric.label, fontSize: 13, bold: true, color: COLORS.textSecondary, align: 'center' },
        { type: 'text', x, y: metricsY + 0.35, w: metricWidth / 2 - 0.1, h: 0.45, text: metric.current, fontSize: 16, color: COLORS.textSecondary, align: 'center', valign: 'middle' },
        { type: 'text', x: x + metricWidth / 2 - 0.15, y: metricsY + 0.45, w: 0.3, h: 0.25, text: '→', fontSize: 14, color: COLORS.accent, align: 'center', valign: 'middle' },
        { type: 'text', x: x + metricWidth / 2 + 0.1, y: metricsY + 0.35, w: metricWidth / 2 - 0.1, h: 0.45, text: metric.target, fontSize: 16, bold: true, color: COLORS.accent, align: 'center', valign: 'middle' },
      );
    });
  }

  return { elements, width: 10, height: 5.625 };
}

// Contact CTA Component - Contact info with call-to-action
const contactCtaMeta: IRComponentMeta = {
  id: 'contact-cta',
  name: '연락처 CTA',
  category: 'risk-ask',
  description: '연락처 정보와 콜투액션',
  defaultProps: {
    headline: "Let's Build the Future Together",
    subheadline: 'We are looking for partners who share our vision',
    contacts: [
      { name: 'John Smith', title: 'CEO & Co-Founder', email: 'john@company.com', phone: '+1 (555) 123-4567' },
      { name: 'Jane Doe', title: 'CFO', email: 'jane@company.com', phone: '+1 (555) 234-5678' },
    ],
    companyInfo: {
      website: 'www.company.com',
      location: 'San Francisco, CA',
      tagline: 'Transforming enterprise software',
    },
  },
  propSchema: {
    headline: { type: 'string', label: '헤드라인', default: "Let's Build the Future Together" },
  },
};

function renderContactCta(props: Record<string, unknown>): IRComponentRenderResult {
  const headline = (props.headline as string) || 'Get in Touch';
  const subheadline = (props.subheadline as string) || '';
  const contacts = (props.contacts as Array<{name: string; title: string; email: string; phone?: string}>) || [];
  const companyInfo = (props.companyInfo as {website?: string; location?: string; tagline?: string}) || {};
  const elements: PPTXElement[] = [];

  // Large headline - centered
  elements.push(
    { type: 'text', x: 0, y: 0.8, w: 10, h: 0.7, text: headline, fontSize: 48, bold: true, color: COLORS.textPrimary, align: 'center' },
  );

  if (subheadline) {
    elements.push(
      { type: 'text', x: 0, y: 1.5, w: 10, h: 0.4, text: subheadline, fontSize: 14, color: COLORS.textSecondary, align: 'center' },
    );
  }

  // Decorative line
  elements.push(
    { type: 'rect', x: 4.25, y: 2.1, w: 1.5, h: 0.5, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
  );

  // Contact cards
  const cardWidth = 3.8;
  const cardHeight = 1.6;
  const cardGap = 0.4;
  const contactCount = Math.min(contacts.length, 2);
  const totalWidth = contactCount * cardWidth + (contactCount - 1) * cardGap;
  const cardStartX = (10 - totalWidth) / 2;
  const cardY = 2.5;

  contacts.slice(0, 2).forEach((contact, i) => {
    const x = cardStartX + i * (cardWidth + cardGap);

    // Card background
    elements.push(
      { type: 'rect', x, y: cardY, w: cardWidth, h: cardHeight, fill: '#FFFFFF', line: { color: COLORS.border, width: 3 } },
    );

    // Avatar placeholder
    const avatarSize = 0.7;
    elements.push(
      { type: 'ellipse', x: x + 0.25, y: cardY + (cardHeight - avatarSize) / 2, w: avatarSize, h: avatarSize, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
      { type: 'text', x: x + 0.25, y: cardY + (cardHeight - avatarSize) / 2, w: avatarSize, h: avatarSize, text: contact.name.split(' ').map(n => n[0]).join(''), fontSize: 16, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
    );

    // Name and title
    elements.push(
      { type: 'text', x: x + 1.1, y: cardY + 0.25, w: cardWidth - 1.35, h: 0.35, text: contact.name, fontSize: 14, bold: true, color: COLORS.textPrimary, valign: 'middle' },
      { type: 'text', x: x + 1.1, y: cardY + 0.6, w: cardWidth - 1.35, h: 0.3, text: contact.title, fontSize: 14, color: COLORS.accent, valign: 'middle' },
    );

    // Email
    elements.push(
      { type: 'text', x: x + 1.1, y: cardY + 1.0, w: cardWidth - 1.35, h: 0.25, text: contact.email, fontSize: 13, color: COLORS.textSecondary },
    );

    // Phone
    if (contact.phone) {
      elements.push(
        { type: 'text', x: x + 1.1, y: cardY + 1.25, w: cardWidth - 1.35, h: 0.25, text: contact.phone, fontSize: 13, color: COLORS.textSecondary },
      );
    }
  });

  // Company info at bottom
  const infoY = 4.5;

  if (companyInfo.website || companyInfo.location) {
    const infoItems: string[] = [];
    if (companyInfo.website) infoItems.push(companyInfo.website);
    if (companyInfo.location) infoItems.push(companyInfo.location);

    elements.push(
      { type: 'text', x: 0, y: infoY, w: 10, h: 0.35, text: infoItems.join('  |  '), fontSize: 12, bold: true, color: COLORS.accent, align: 'center' },
    );
  }

  if (companyInfo.tagline) {
    elements.push(
      { type: 'text', x: 0, y: infoY + 0.4, w: 10, h: 0.3, text: companyInfo.tagline, fontSize: 14, color: COLORS.textSecondary, align: 'center' },
    );
  }

  return { elements, width: 10, height: 5.625 };
}

// Register components
registry.register(riskMatrixMeta, renderRiskMatrix);
registry.register(mitigationPlanMeta, renderMitigationPlan);
registry.register(fundingAskMeta, renderFundingAsk);
registry.register(investmentHighlightsMeta, renderInvestmentHighlights);
registry.register(nextMilestonesMeta, renderNextMilestones);
registry.register(contactCtaMeta, renderContactCta);

export { riskMatrixMeta, mitigationPlanMeta, fundingAskMeta, investmentHighlightsMeta, nextMilestonesMeta, contactCtaMeta };
