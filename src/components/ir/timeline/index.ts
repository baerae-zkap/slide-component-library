import { registry } from '@/lib/registry';
import type { IRComponentMeta, IRComponentRenderResult, PPTXElement } from '@/types';
import { COLORS } from '@/lib/constants';

// Roadmap Component - Horizontal timeline with quarters
const roadmapMeta: IRComponentMeta = {
  id: 'roadmap',
  name: '로드맵',
  category: 'timeline',
  description: '수평 타임라인과 마일스톤',
  defaultProps: {
    title: 'Product Roadmap 2024',
    milestones: [
      { quarter: 'Q1', title: 'Foundation', items: ['Core platform', 'Beta launch'], status: 'completed' },
      { quarter: 'Q2', title: 'Growth', items: ['Enterprise features', 'API v2'], status: 'current' },
      { quarter: 'Q3', title: 'Scale', items: ['Global expansion', 'Mobile app'], status: 'upcoming' },
      { quarter: 'Q4', title: 'Mature', items: ['AI features', 'Marketplace'], status: 'upcoming' },
    ],
  },
  propSchema: {},
};

function renderRoadmap(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Roadmap';
  const milestones = (props.milestones as Array<{quarter: string; title: string; items: string[]; status?: string}>) || [];
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 9, h: 0.5, text: title, fontSize: 29, bold: true, color: COLORS.textPrimary },
  );

  // Timeline
  const lineY = 2.4;
  const lineStartX = 0.8;
  const lineEndX = 9.2;
  const lineWidth = lineEndX - lineStartX;

  // Timeline track
  elements.push(
    { type: 'rect', x: lineStartX, y: lineY - 0.04, w: lineWidth, h: 0.08, fill: COLORS.border, line: { color: COLORS.border, width: 0 } },
  );

  // Milestones
  const milestoneCount = Math.min(milestones.length, 4);
  const spacing = lineWidth / milestoneCount;

  milestones.slice(0, 4).forEach((milestone, i) => {
    const x = lineStartX + i * spacing + spacing / 2;
    const isCompleted = milestone.status === 'completed';
    const isCurrent = milestone.status === 'current';
    const dotColor = isCompleted ? COLORS.positive : isCurrent ? COLORS.accent : COLORS.border;
    const cardBg = isCurrent ? COLORS.accent : '#FFFFFF';
    const textColor = isCurrent ? '#FFFFFF' : COLORS.textPrimary;
    const subTextColor = isCurrent ? 'rgba(255,255,255,0.85)' : COLORS.textSecondary;

    // Milestone dot
    elements.push(
      { type: 'ellipse', x: x - 0.18, y: lineY - 0.18, w: 0.36, h: 0.36, fill: dotColor, line: { color: dotColor, width: 0 } },
    );

    // Completed checkmark
    if (isCompleted) {
      elements.push(
        { type: 'text', x: x - 0.18, y: lineY - 0.18, w: 0.36, h: 0.36, text: '✓', fontSize: 12, color: '#FFFFFF', align: 'center', valign: 'middle' },
      );
    }

    // Quarter label above
    elements.push(
      { type: 'text', x: x - 0.5, y: lineY - 0.7, w: 1, h: 0.35, text: milestone.quarter, fontSize: 14, bold: true, color: dotColor, align: 'center', valign: 'middle' },
    );

    // Card below timeline
    const cardY = lineY + 0.5;
    const cardWidth = 2.0;
    const cardHeight = 2.0;

    elements.push(
      { type: 'rect', x: x - cardWidth / 2, y: cardY, w: cardWidth, h: cardHeight, fill: cardBg, line: { color: isCurrent ? COLORS.accent : COLORS.border, width: isCurrent ? 0 : 1 } },
    );

    // Title
    elements.push(
      { type: 'text', x: x - cardWidth / 2 + 0.15, y: cardY + 0.15, w: cardWidth - 0.3, h: 0.4, text: milestone.title, fontSize: 13, bold: true, color: textColor, align: 'center', valign: 'middle' },
    );

    // Divider
    elements.push(
      { type: 'rect', x: x - cardWidth / 2 + 0.3, y: cardY + 0.6, w: cardWidth - 0.6, h: 0.02, fill: isCurrent ? 'rgba(255,255,255,0.3)' : COLORS.border, line: { color: 'transparent', width: 0 } },
    );

    // Items
    milestone.items.slice(0, 3).forEach((item, j) => {
      elements.push(
        { type: 'text', x: x - cardWidth / 2 + 0.15, y: cardY + 0.75 + j * 0.38, w: cardWidth - 0.3, h: 0.35, text: `• ${item}`, fontSize: 13, color: subTextColor, align: 'center' },
      );
    });
  });

  // Progress indicator
  const completedCount = milestones.filter(m => m.status === 'completed').length;
  const progressWidth = (completedCount / milestoneCount) * lineWidth;
  elements.push(
    { type: 'rect', x: lineStartX, y: lineY - 0.04, w: progressWidth, h: 0.08, fill: COLORS.positive, line: { color: COLORS.positive, width: 0 } },
  );

  return { elements, width: 10, height: 5.625 };
}

// Milestone List Component - Vertical milestone timeline
const milestoneListMeta: IRComponentMeta = {
  id: 'milestone-list',
  name: '마일스톤 리스트',
  category: 'timeline',
  description: '수직 마일스톤 목록',
  defaultProps: {
    title: 'Company Milestones',
    milestones: [
      { date: 'Jan 2024', title: 'Company Founded', description: 'Incorporated in Delaware, initial team of 3' },
      { date: 'Mar 2024', title: 'Seed Funding', description: 'Raised $2.5M from top-tier VCs' },
      { date: 'Jun 2024', title: 'Product Launch', description: 'Beta release with 100 pilot customers' },
      { date: 'Sep 2024', title: 'Series A', description: 'Raised $15M at $60M valuation' },
    ],
  },
  propSchema: {},
};

function renderMilestoneList(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Milestones';
  const milestones = (props.milestones as Array<{date: string; title: string; description: string}>) || [];
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 9, h: 0.5, text: title, fontSize: 29, bold: true, color: COLORS.textPrimary },
    { type: 'rect', x: 0.5, y: 0.95, w: 1.2, h: 0.5, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
  );

  const startY = 1.3;
  const rowHeight = 1.0;
  const dotX = 2.0;
  const dateWidth = 1.3;

  // Vertical line
  elements.push(
    { type: 'line', x: dotX + 0.12, y: startY + 0.12, w: 0, h: (milestones.length - 1) * rowHeight, line: { color: COLORS.border, width: 3 } },
  );

  milestones.forEach((milestone, i) => {
    const y = startY + i * rowHeight;

    // Date label
    elements.push(
      { type: 'text', x: 0.5, y: y - 0.05, w: dateWidth, h: 0.35, text: milestone.date, fontSize: 14, bold: true, color: COLORS.accent, align: 'right', valign: 'middle' },
    );

    // Dot
    elements.push(
      { type: 'ellipse', x: dotX, y: y, w: 0.24, h: 0.24, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    );

    // Content card
    elements.push(
      { type: 'rect', x: 2.5, y: y - 0.1, w: 6.8, h: 0.85, fill: '#FFFFFF', line: { color: COLORS.border, width: 3 } },
      // Accent border left
      { type: 'rect', x: 2.5, y: y - 0.1, w: 0.5, h: 0.85, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    );

    // Title
    elements.push(
      { type: 'text', x: 2.75, y: y, w: 6.3, h: 0.35, text: milestone.title, fontSize: 14, bold: true, color: COLORS.textPrimary, valign: 'middle' },
    );

    // Description
    elements.push(
      { type: 'text', x: 2.75, y: y + 0.38, w: 6.3, h: 0.3, text: milestone.description, fontSize: 14, color: COLORS.textSecondary, valign: 'middle' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Quarterly Goals Component - Q1-Q4 goals grid
const quarterlyGoalsMeta: IRComponentMeta = {
  id: 'quarterly-goals',
  name: '분기별 목표',
  category: 'timeline',
  description: 'Q1-Q4 목표 레이아웃',
  defaultProps: {
    title: '2024 Objectives',
    quarters: [
      { quarter: 'Q1', goals: ['Launch MVP', 'Reach 100 users', 'Close seed round'] },
      { quarter: 'Q2', goals: ['Reach 1K users', 'Enterprise features', 'Hire 5 engineers'] },
      { quarter: 'Q3', goals: ['10K active users', 'Break even', 'APAC expansion'] },
      { quarter: 'Q4', goals: ['Series A close', '50K users', 'Open SF office'] },
    ],
  },
  propSchema: {},
};

function renderQuarterlyGoals(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Quarterly Goals';
  const quarters = (props.quarters as Array<{quarter: string; goals: string[]}>) || [];
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 9, h: 0.5, text: title, fontSize: 29, bold: true, color: COLORS.textPrimary },
  );

  // 2x2 grid
  const cardWidth = 4.3;
  const cardHeight = 2.0;
  const gapX = 0.4;
  const gapY = 0.45;
  const startX = (10 - (cardWidth * 2 + gapX)) / 2;
  const startY = 1.2;

  // Color progression
  const colors = [COLORS.accent, COLORS.accentLight, '#8A9B5C', '#A8B884'];

  quarters.slice(0, 4).forEach((quarter, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = startX + col * (cardWidth + gapX);
    const y = startY + row * (cardHeight + gapY);
    const cardColor = colors[i % colors.length];

    // Card background
    elements.push(
      { type: 'rect', x, y, w: cardWidth, h: cardHeight, fill: cardColor, line: { color: cardColor, width: 0 } },
    );

    // Quarter label
    elements.push(
      { type: 'text', x: x + 0.25, y: y + 0.2, w: 1, h: 0.4, text: quarter.quarter, fontSize: 20, bold: true, color: '#FFFFFF', valign: 'middle' },
    );

    // Divider
    elements.push(
      { type: 'rect', x: x + 0.25, y: y + 0.65, w: 0.8, h: 0.03, fill: 'rgba(255,255,255,0.4)', line: { color: 'transparent', width: 0 } },
    );

    // Goals
    quarter.goals.slice(0, 3).forEach((goal, j) => {
      elements.push(
        { type: 'text', x: x + 0.25, y: y + 0.85 + j * 0.35, w: 0.25, h: 0.3, text: '○', fontSize: 13, color: 'rgba(255,255,255,0.7)', valign: 'middle' },
        { type: 'text', x: x + 0.55, y: y + 0.85 + j * 0.35, w: cardWidth - 0.8, h: 0.3, text: goal, fontSize: 14, color: '#FFFFFF', valign: 'middle' },
      );
    });
  });

  return { elements, width: 10, height: 5.625 };
}

// Achievement Timeline Component - Historical achievements
const achievementTimelineMeta: IRComponentMeta = {
  id: 'achievement-timeline',
  name: '성과 타임라인',
  category: 'timeline',
  description: '과거 성과 타임라인',
  defaultProps: {
    title: 'Our Journey',
    achievements: [
      { date: '2020', title: 'Founded', description: 'Started in a garage', icon: '🚀' },
      { date: '2021', title: 'First Customer', description: 'Fortune 500 client', icon: '🎯' },
      { date: '2022', title: 'Profitability', description: '$10M ARR', icon: '💰' },
      { date: '2023', title: 'Expansion', description: '3 new offices', icon: '🌍' },
      { date: '2024', title: 'Scale', description: '100K+ users', icon: '📈' },
    ],
  },
  propSchema: {},
};

function renderAchievementTimeline(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Timeline';
  const achievements = (props.achievements as Array<{date: string; title: string; description: string; icon?: string}>) || [];
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 9, h: 0.5, text: title, fontSize: 29, bold: true, color: COLORS.textPrimary },
  );

  // Horizontal timeline
  const timelineY = 2.8;
  const startX = 0.8;
  const endX = 9.2;
  const totalWidth = endX - startX;

  // Timeline track
  elements.push(
    { type: 'rect', x: startX, y: timelineY - 0.03, w: totalWidth, h: 0.06, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
  );

  // Achievements
  const achievementCount = Math.min(achievements.length, 5);
  const spacing = totalWidth / (achievementCount - 1);

  achievements.slice(0, 5).forEach((achievement, i) => {
    const x = startX + i * spacing;
    const isAbove = i % 2 === 0;
    const contentY = isAbove ? timelineY - 1.6 : timelineY + 0.5;

    // Timeline dot
    elements.push(
      { type: 'ellipse', x: x - 0.15, y: timelineY - 0.15, w: 0.3, h: 0.3, fill: COLORS.accent, line: { color: '#FFFFFF', width: 3 } },
    );

    // Vertical connector
    const connectorStart = isAbove ? contentY + 1.15 : timelineY + 0.15;
    const connectorEnd = isAbove ? timelineY - 0.15 : contentY;
    elements.push(
      { type: 'line', x, y: connectorStart, w: 0, h: Math.abs(connectorEnd - connectorStart), line: { color: COLORS.border, width: 3 } },
    );

    // Content card
    const cardWidth = 1.5;
    const cardHeight = 1.15;
    elements.push(
      { type: 'rect', x: x - cardWidth / 2, y: contentY, w: cardWidth, h: cardHeight, fill: '#FFFFFF', line: { color: COLORS.border, width: 3 } },
    );

    // Icon (if provided)
    if (achievement.icon) {
      elements.push(
        { type: 'text', x: x - cardWidth / 2, y: contentY + 0.08, w: cardWidth, h: 0.35, text: achievement.icon, fontSize: 18, align: 'center' },
      );
    }

    // Title
    elements.push(
      { type: 'text', x: x - cardWidth / 2 + 0.1, y: contentY + (achievement.icon ? 0.45 : 0.15), w: cardWidth - 0.2, h: 0.3, text: achievement.title, fontSize: 14, bold: true, color: COLORS.textPrimary, align: 'center', valign: 'middle' },
    );

    // Description
    elements.push(
      { type: 'text', x: x - cardWidth / 2 + 0.1, y: contentY + (achievement.icon ? 0.75 : 0.45), w: cardWidth - 0.2, h: 0.3, text: achievement.description, fontSize: 12, color: COLORS.textSecondary, align: 'center', valign: 'middle' },
    );

    // Date below/above dot
    const dateY = isAbove ? timelineY + 0.25 : timelineY - 0.5;
    elements.push(
      { type: 'text', x: x - 0.4, y: dateY, w: 0.8, h: 0.25, text: achievement.date, fontSize: 14, bold: true, color: COLORS.textPrimary, align: 'center' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Funding History Component - Horizontal timeline with round markers
const fundingHistoryMeta: IRComponentMeta = {
  id: 'funding-history',
  name: '펀딩 히스토리',
  category: 'timeline',
  description: '라운드 마커가 있는 수평 타임라인',
  defaultProps: {
    title: 'Funding History',
    totalRaised: '$28.5M',
    rounds: [
      { date: 'Jan 2022', round: 'Seed', amount: '$2.5M', valuation: '$10M', investors: 'Angels, Y Combinator' },
      { date: 'Sep 2022', round: 'Series A', amount: '$8M', valuation: '$40M', investors: 'Sequoia, a16z' },
      { date: 'Jun 2023', round: 'Series B', amount: '$18M', valuation: '$120M', investors: 'Tiger Global, Coatue' },
    ],
  },
  propSchema: {},
};

function renderFundingHistory(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Funding History';
  const totalRaised = (props.totalRaised as string) || '';
  const rounds = (props.rounds as Array<{date: string; round: string; amount: string; valuation?: string; investors?: string}>) || [];
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.35, w: 5, h: 0.5, text: title, fontSize: 29, bold: true, color: COLORS.textPrimary },
  );

  // Total raised
  if (totalRaised) {
    elements.push(
      { type: 'text', x: 5.5, y: 0.35, w: 4, h: 0.3, text: 'Total Raised', fontSize: 14, color: COLORS.textSecondary, align: 'right' },
      { type: 'text', x: 5.5, y: 0.6, w: 4, h: 0.45, text: totalRaised, fontSize: 26, bold: true, color: COLORS.positive, align: 'right' },
    );
  }

  // Timeline
  const lineY = 2.1;
  const lineStartX = 0.8;
  const lineEndX = 9.2;
  const lineWidth = lineEndX - lineStartX;

  // Timeline track
  elements.push(
    { type: 'rect', x: lineStartX, y: lineY - 0.03, w: lineWidth, h: 0.06, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
  );

  // Rounds
  const roundCount = Math.min(rounds.length, 4);
  const spacing = lineWidth / (roundCount + 1);

  rounds.slice(0, 4).forEach((round, i) => {
    const x = lineStartX + (i + 1) * spacing;
    const cardWidth = 2.2;
    const cardHeight = 2.2;
    const cardY = lineY + 0.5;

    // Timeline dot
    elements.push(
      { type: 'ellipse', x: x - 0.2, y: lineY - 0.2, w: 0.4, h: 0.4, fill: COLORS.accent, line: { color: '#FFFFFF', width: 3 } },
    );

    // Date above dot
    elements.push(
      { type: 'text', x: x - 0.6, y: lineY - 0.65, w: 1.2, h: 0.35, text: round.date, fontSize: 13, color: COLORS.textSecondary, align: 'center' },
    );

    // Card below timeline
    elements.push(
      { type: 'rect', x: x - cardWidth / 2, y: cardY, w: cardWidth, h: cardHeight, fill: '#FFFFFF', line: { color: COLORS.border, width: 3 } },
      // Accent top
      { type: 'rect', x: x - cardWidth / 2, y: cardY, w: cardWidth, h: 0.5, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    );

    // Round name
    elements.push(
      { type: 'text', x: x - cardWidth / 2 + 0.15, y: cardY + 0.2, w: cardWidth - 0.3, h: 0.35, text: round.round, fontSize: 12, bold: true, color: COLORS.textPrimary, align: 'center' },
    );

    // Amount
    elements.push(
      { type: 'text', x: x - cardWidth / 2 + 0.15, y: cardY + 0.55, w: cardWidth - 0.3, h: 0.45, text: round.amount, fontSize: 20, bold: true, color: COLORS.accent, align: 'center' },
    );

    // Valuation
    if (round.valuation) {
      elements.push(
        { type: 'text', x: x - cardWidth / 2 + 0.15, y: cardY + 1.05, w: cardWidth - 0.3, h: 0.25, text: `@ ${round.valuation}`, fontSize: 13, color: COLORS.textSecondary, align: 'center' },
      );
    }

    // Investors
    if (round.investors) {
      elements.push(
        { type: 'rect', x: x - cardWidth / 2 + 0.15, y: cardY + 1.4, w: cardWidth - 0.3, h: 0.02, fill: COLORS.border, line: { color: 'transparent', width: 0 } },
        { type: 'text', x: x - cardWidth / 2 + 0.15, y: cardY + 1.55, w: cardWidth - 0.3, h: 0.5, text: round.investors, fontSize: 12, color: COLORS.textSecondary, align: 'center', valign: 'top' },
      );
    }
  });

  return { elements, width: 10, height: 5.625 };
}

// Product Releases Component - Vertical timeline with version cards
const productReleasesMeta: IRComponentMeta = {
  id: 'product-releases',
  name: '제품 릴리스',
  category: 'timeline',
  description: '버전 카드가 있는 수직 타임라인',
  defaultProps: {
    title: 'Product Releases',
    releases: [
      { version: 'v3.0', date: 'Q4 2024', title: 'Enterprise Edition', features: ['SSO & SAML', 'Custom roles', 'Audit logs'], status: 'upcoming' },
      { version: 'v2.5', date: 'Q3 2024', title: 'Performance Update', features: ['2x faster sync', 'Offline mode', 'Dark theme'], status: 'current' },
      { version: 'v2.0', date: 'Q2 2024', title: 'Collaboration Suite', features: ['Real-time editing', 'Comments', 'Sharing'], status: 'released' },
      { version: 'v1.0', date: 'Q1 2024', title: 'Initial Launch', features: ['Core features', 'Mobile app', 'API access'], status: 'released' },
    ],
  },
  propSchema: {},
};

function renderProductReleases(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Product Releases';
  const releases = (props.releases as Array<{version: string; date: string; title: string; features: string[]; status?: string}>) || [];
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.35, w: 9, h: 0.5, text: title, fontSize: 29, bold: true, color: COLORS.textPrimary },
  );

  const startY = 1.1;
  const cardHeight = 1.0;
  const cardGap = 0.15;
  const timelineX = 1.8;
  const cardX = 2.3;
  const cardWidth = 7.0;

  // Vertical timeline line
  elements.push(
    { type: 'line', x: timelineX, y: startY + 0.15, w: 0, h: releases.length * (cardHeight + cardGap) - cardGap, line: { color: COLORS.border, width: 3 } },
  );

  releases.forEach((release, i) => {
    const y = startY + i * (cardHeight + cardGap);
    const isUpcoming = release.status === 'upcoming';
    const isCurrent = release.status === 'current';
    const dotColor = isUpcoming ? COLORS.textSecondary : isCurrent ? COLORS.accent : COLORS.positive;
    const cardBg = isCurrent ? COLORS.accent : '#FFFFFF';
    const textColor = isCurrent ? '#FFFFFF' : COLORS.textPrimary;
    const subTextColor = isCurrent ? 'rgba(255,255,255,0.8)' : COLORS.textSecondary;

    // Timeline dot
    elements.push(
      { type: 'ellipse', x: timelineX - 0.15, y: y + cardHeight / 2 - 0.15, w: 0.3, h: 0.3, fill: dotColor, line: { color: '#FFFFFF', width: 3 } },
    );

    // Version badge
    elements.push(
      { type: 'rect', x: 0.5, y: y + cardHeight / 2 - 0.2, w: 1.0, h: 0.4, fill: dotColor, line: { color: dotColor, width: 0 } },
      { type: 'text', x: 0.5, y: y + cardHeight / 2 - 0.2, w: 1.0, h: 0.4, text: release.version, fontSize: 14, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
    );

    // Card
    elements.push(
      { type: 'rect', x: cardX, y, w: cardWidth, h: cardHeight, fill: cardBg, line: { color: isCurrent ? COLORS.accent : COLORS.border, width: 3 } },
    );

    // Date
    elements.push(
      { type: 'text', x: cardX + 0.2, y: y + 0.1, w: 1.0, h: 0.25, text: release.date, fontSize: 13, bold: true, color: subTextColor },
    );

    // Title
    elements.push(
      { type: 'text', x: cardX + 1.3, y: y + 0.08, w: 2.5, h: 0.3, text: release.title, fontSize: 13, bold: true, color: textColor },
    );

    // Features
    const featureText = release.features.slice(0, 3).join('  |  ');
    elements.push(
      { type: 'text', x: cardX + 0.2, y: y + 0.5, w: cardWidth - 0.4, h: 0.4, text: featureText, fontSize: 13, color: subTextColor, valign: 'middle' },
    );

    // Status badge
    if (isUpcoming) {
      elements.push(
        { type: 'text', x: cardX + cardWidth - 1.2, y: y + 0.1, w: 1.0, h: 0.25, text: 'UPCOMING', fontSize: 12, bold: true, color: COLORS.textSecondary, align: 'right' },
      );
    } else if (isCurrent) {
      elements.push(
        { type: 'text', x: cardX + cardWidth - 1.2, y: y + 0.1, w: 1.0, h: 0.25, text: 'CURRENT', fontSize: 12, bold: true, color: 'rgba(255,255,255,0.7)', align: 'right' },
      );
    }
  });

  return { elements, width: 10, height: 5.625 };
}

// Register components
registry.register(roadmapMeta, renderRoadmap);
registry.register(milestoneListMeta, renderMilestoneList);
registry.register(quarterlyGoalsMeta, renderQuarterlyGoals);
registry.register(achievementTimelineMeta, renderAchievementTimeline);
registry.register(fundingHistoryMeta, renderFundingHistory);
registry.register(productReleasesMeta, renderProductReleases);

export { roadmapMeta, milestoneListMeta, quarterlyGoalsMeta, achievementTimelineMeta, fundingHistoryMeta, productReleasesMeta };
