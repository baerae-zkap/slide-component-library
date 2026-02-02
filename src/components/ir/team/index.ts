import { registry } from '@/lib/registry';
import type { IRComponentMeta, IRComponentRenderResult, PPTXElement } from '@/types';
import { COLORS } from '@/lib/constants';

// Team Grid Component - Professional 2x2 team layout
const teamGridMeta: IRComponentMeta = {
  id: 'team-grid',
  name: '팀 그리드',
  category: 'team',
  description: '2x2 팀 멤버 카드',
  defaultProps: {
    title: 'Leadership Team',
    members: [
      { name: 'John Smith', title: 'CEO & Co-Founder', bio: 'Ex-Google, Stanford MBA' },
      { name: 'Jane Doe', title: 'CTO & Co-Founder', bio: 'Ex-Meta, MIT PhD' },
      { name: 'Mike Johnson', title: 'CFO', bio: 'Ex-Goldman Sachs, Harvard MBA' },
      { name: 'Sarah Lee', title: 'COO', bio: 'Ex-McKinsey, Wharton MBA' },
    ],
  },
  propSchema: {},
};

function renderTeamGrid(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Our Team';
  const members = (props.members as Array<{name: string; title: string; bio?: string}>) || [];
  const elements: PPTXElement[] = [];

  // Title - Section title made more prominent
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 9, h: 0.6, text: title, fontSize: 28, bold: true, color: COLORS.textPrimary },
    { type: 'rect', x: 0.5, y: 1.05, w: 1.5, h: 0.06, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
  );

  const cardWidth = 4.3;
  const cardHeight = 2.3;
  const gapX = 0.6;
  const gapY = 0.5;
  const startX = (10 - (cardWidth * 2 + gapX)) / 2;
  const startY = 1.4;

  members.slice(0, 4).forEach((member, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = startX + col * (cardWidth + gapX);
    const y = startY + row * (cardHeight + gapY);

    // Card background - increased padding
    elements.push(
      { type: 'rect', x, y, w: cardWidth, h: cardHeight, fill: '#FFFFFF', line: { color: COLORS.border, width: 1 } },
    );

    // Avatar placeholder (circular) - border removed for cleaner look
    const avatarSize = 0.9;
    elements.push(
      { type: 'ellipse', x: x + 0.45, y: y + (cardHeight - avatarSize) / 2, w: avatarSize, h: avatarSize, fill: COLORS.surface, line: { color: COLORS.accent, width: 0 } },
      // Initials
      { type: 'text', x: x + 0.45, y: y + (cardHeight - avatarSize) / 2, w: avatarSize, h: avatarSize, text: member.name.split(' ').map(n => n[0]).join(''), fontSize: 18, bold: true, color: COLORS.accent, align: 'center', valign: 'middle' },
    );

    // Name - 16pt → 22pt
    elements.push(
      { type: 'text', x: x + 1.55, y: y + 0.5, w: cardWidth - 1.85, h: 0.5, text: member.name, fontSize: 22, bold: true, color: COLORS.textPrimary, valign: 'middle' },
    );

    // Title - 12pt → 14pt
    elements.push(
      { type: 'text', x: x + 1.55, y: y + 1.0, w: cardWidth - 1.85, h: 0.4, text: member.title, fontSize: 14, color: COLORS.accent, valign: 'middle' },
    );

    // Bio - 10pt → 12pt
    if (member.bio) {
      elements.push(
        { type: 'text', x: x + 1.55, y: y + 1.45, w: cardWidth - 1.85, h: 0.6, text: member.bio, fontSize: 12, color: COLORS.textSecondary, valign: 'top' },
      );
    }
  });

  return { elements, width: 10, height: 5.625 };
}

// Advisor Row Component - Horizontal advisor list
const advisorRowMeta: IRComponentMeta = {
  id: 'advisor-row',
  name: '어드바이저 목록',
  category: 'team',
  description: '수평 어드바이저 리스트',
  defaultProps: {
    title: 'Advisors',
    advisors: [
      { name: 'Dr. Alice Wong', affiliation: 'Stanford Professor' },
      { name: 'Prof. Bob Chen', affiliation: 'MIT AI Lab' },
      { name: 'David Park', affiliation: 'Y Combinator Partner' },
      { name: 'Emma Taylor', affiliation: 'GV Venture Partner' },
    ],
  },
  propSchema: {},
};

function renderAdvisorRow(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Advisors';
  const advisors = (props.advisors as Array<{name: string; affiliation: string}>) || [];
  const elements: PPTXElement[] = [];

  // Title - Section title made more prominent
  elements.push(
    { type: 'text', x: 0.5, y: 0.5, w: 9, h: 0.6, text: title, fontSize: 28, bold: true, color: COLORS.textPrimary },
    { type: 'rect', x: 0.5, y: 1.15, w: 1.5, h: 0.06, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
  );

  const advisorCount = Math.min(advisors.length, 4);
  const cardWidth = 2.1;
  const cardHeight = 3.0;
  const gap = 0.5;
  const totalWidth = advisorCount * cardWidth + (advisorCount - 1) * gap;
  const startX = (10 - totalWidth) / 2;
  const startY = 1.6;

  advisors.slice(0, 4).forEach((advisor, i) => {
    const x = startX + i * (cardWidth + gap);

    // Card background - increased padding
    elements.push(
      { type: 'rect', x, y: startY, w: cardWidth, h: cardHeight, fill: '#FFFFFF', line: { color: COLORS.border, width: 1 } },
    );

    // Avatar placeholder (circular) - border removed for cleaner look
    const avatarSize = 1.0;
    elements.push(
      { type: 'ellipse', x: x + (cardWidth - avatarSize) / 2, y: startY + 0.45, w: avatarSize, h: avatarSize, fill: COLORS.surface, line: { color: COLORS.accent, width: 0 } },
      // Initials
      { type: 'text', x: x + (cardWidth - avatarSize) / 2, y: startY + 0.45, w: avatarSize, h: avatarSize, text: advisor.name.split(' ').map(n => n[0]).join(''), fontSize: 20, bold: true, color: COLORS.accent, align: 'center', valign: 'middle' },
    );

    // Name - 12pt → 22pt
    elements.push(
      { type: 'text', x: x + 0.15, y: startY + 1.65, w: cardWidth - 0.3, h: 0.5, text: advisor.name, fontSize: 22, bold: true, color: COLORS.textPrimary, align: 'center', valign: 'middle' },
    );

    // Affiliation - 10pt → 12pt
    elements.push(
      { type: 'text', x: x + 0.15, y: startY + 2.2, w: cardWidth - 0.3, h: 0.65, text: advisor.affiliation, fontSize: 12, color: COLORS.textSecondary, align: 'center', valign: 'top' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Founder Spotlight Component - Featured founder profile
const founderSpotlightMeta: IRComponentMeta = {
  id: 'founder-spotlight',
  name: '창업자 스포트라이트',
  category: 'team',
  description: '단일 창업자 하이라이트와 약력',
  defaultProps: {
    name: 'Jane Smith',
    title: 'CEO & Co-Founder',
    bio: 'Former VP of Engineering at Google. Led teams of 200+ engineers building products used by billions. Stanford CS and MBA. Passionate about democratizing enterprise software.',
    achievements: [
      'Built $100M ARR product at Google',
      'Y Combinator W21 Batch',
      'Forbes 30 Under 30',
      '3x successful exits',
    ],
  },
  propSchema: {},
};

function renderFounderSpotlight(props: Record<string, unknown>): IRComponentRenderResult {
  const name = (props.name as string) || 'Founder Name';
  const title = (props.title as string) || 'CEO & Founder';
  const bio = (props.bio as string) || '';
  const achievements = (props.achievements as string[]) || [];
  const elements: PPTXElement[] = [];

  // Left section - Photo placeholder with accent
  const photoWidth = 3.2;
  const photoHeight = 4.2;
  const photoX = 0.5;
  const photoY = 0.7;

  elements.push(
    // Photo background - border removed
    { type: 'rect', x: photoX, y: photoY, w: photoWidth, h: photoHeight, fill: COLORS.surface, line: { color: COLORS.accent, width: 0 } },
    // Accent corner
    { type: 'rect', x: photoX, y: photoY, w: 0.15, h: 1.2, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    { type: 'rect', x: photoX, y: photoY, w: 1.2, h: 0.15, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    // Initials
    { type: 'text', x: photoX, y: photoY + photoHeight / 2 - 0.4, w: photoWidth, h: 0.8, text: name.split(' ').map(n => n[0]).join(''), fontSize: 48, bold: true, color: COLORS.accent, align: 'center', valign: 'middle' },
  );

  // Right section - Content with increased padding
  const contentX = 4.2;
  const contentY = 0.7;

  // Name - increased emphasis for leadership
  elements.push(
    { type: 'text', x: contentX, y: contentY, w: 5.3, h: 0.7, text: name, fontSize: 32, bold: true, color: COLORS.textPrimary },
  );

  // Title - 16pt → 14pt (actually closer to spec)
  elements.push(
    { type: 'text', x: contentX, y: contentY + 0.75, w: 5.3, h: 0.45, text: title, fontSize: 18, color: COLORS.accent },
  );

  // Decorative line
  elements.push(
    { type: 'rect', x: contentX, y: contentY + 1.3, w: 1.8, h: 0.05, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
  );

  // Bio - 11pt → 12pt
  elements.push(
    { type: 'text', x: contentX, y: contentY + 1.6, w: 5.3, h: 1.3, text: bio, fontSize: 12, color: COLORS.textSecondary, valign: 'top' },
  );

  // Achievements section - more prominent
  elements.push(
    { type: 'text', x: contentX, y: contentY + 3.0, w: 5.3, h: 0.4, text: 'KEY ACHIEVEMENTS', fontSize: 12, bold: true, color: COLORS.textSecondary },
  );

  achievements.slice(0, 4).forEach((achievement, i) => {
    const y = contentY + 3.45 + i * 0.42;
    elements.push(
      // Check icon
      { type: 'ellipse', x: contentX, y: y + 0.06, w: 0.24, h: 0.24, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
      { type: 'text', x: contentX, y: y + 0.06, w: 0.24, h: 0.24, text: '✓', fontSize: 11, color: '#FFFFFF', align: 'center', valign: 'middle' },
      // Achievement text - 11pt → 12pt
      { type: 'text', x: contentX + 0.38, y: y, w: 4.85, h: 0.38, text: achievement, fontSize: 12, color: COLORS.textPrimary, valign: 'middle' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Hiring Positions Component - Job openings list
const hiringPositionsMeta: IRComponentMeta = {
  id: 'hiring-positions',
  name: '채용 포지션',
  category: 'team',
  description: '오픈 포지션 리스트',
  defaultProps: {
    title: "We're Hiring",
    subtitle: 'Join our mission to transform enterprise software',
    positions: [
      { title: 'Senior Frontend Engineer', location: 'San Francisco', type: 'Full-time' },
      { title: 'Product Manager', location: 'Remote', type: 'Full-time' },
      { title: 'Data Scientist', location: 'New York', type: 'Full-time' },
      { title: 'UX Designer', location: 'Remote', type: 'Contract' },
    ],
  },
  propSchema: {},
};

function renderHiringPositions(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || "We're Hiring";
  const subtitle = (props.subtitle as string) || '';
  const positions = (props.positions as Array<{title: string; location: string; type: string}>) || [];
  const elements: PPTXElement[] = [];

  // Title - Section title made more prominent
  elements.push(
    { type: 'text', x: 0.5, y: 0.5, w: 9, h: 0.65, text: title, fontSize: 28, bold: true, color: COLORS.textPrimary },
  );

  // Subtitle
  if (subtitle) {
    elements.push(
      { type: 'text', x: 0.5, y: 1.15, w: 9, h: 0.4, text: subtitle, fontSize: 14, color: COLORS.textSecondary },
    );
  }

  // Positions list - increased spacing
  const startY = 1.75;
  const cardHeight = 1.0;
  const gap = 0.22;

  positions.slice(0, 4).forEach((position, i) => {
    const y = startY + i * (cardHeight + gap);

    // Card background - increased padding
    elements.push(
      { type: 'rect', x: 0.8, y, w: 8.4, h: cardHeight, fill: '#FFFFFF', line: { color: COLORS.border, width: 1 } },
      // Left accent - thicker
      { type: 'rect', x: 0.8, y, w: 0.08, h: cardHeight, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    );

    // Position title - 14pt → kept at 14pt (already correct per spec)
    elements.push(
      { type: 'text', x: 1.2, y: y + 0.22, w: 5.5, h: 0.4, text: position.title, fontSize: 16, bold: true, color: COLORS.textPrimary, valign: 'middle' },
    );

    // Location with icon - 11pt → 12pt
    elements.push(
      { type: 'text', x: 1.2, y: y + 0.6, w: 3.5, h: 0.3, text: `📍 ${position.location}`, fontSize: 12, color: COLORS.textSecondary },
    );

    // Type badge
    const badgeColor = position.type === 'Full-time' ? COLORS.accent : COLORS.accentLight;
    elements.push(
      { type: 'rect', x: 7.3, y: y + 0.3, w: 1.6, h: 0.4, fill: badgeColor, line: { color: badgeColor, width: 0 } },
      { type: 'text', x: 7.3, y: y + 0.3, w: 1.6, h: 0.4, text: position.type, fontSize: 11, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
    );
  });

  // Footer CTA
  elements.push(
    { type: 'text', x: 0.8, y: 5.0, w: 8.4, h: 0.35, text: 'View all positions at careers.company.com', fontSize: 11, color: COLORS.accent, align: 'center' },
  );

  return { elements, width: 10, height: 5.625 };
}

// Org Chart Component - Hierarchical tree with person cards
const orgChartMeta: IRComponentMeta = {
  id: 'org-chart',
  name: '조직도',
  category: 'team',
  description: '계층형 조직도',
  defaultProps: {
    title: 'Organization Structure',
    ceo: { name: 'John Smith', title: 'CEO' },
    reports: [
      { name: 'Jane Doe', title: 'CTO' },
      { name: 'Mike Johnson', title: 'CFO' },
      { name: 'Sarah Lee', title: 'COO' },
    ],
  },
  propSchema: {
    title: { type: 'string', label: '제목', default: 'Organization Structure' },
  },
};

function renderOrgChart(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Organization Structure';
  const ceo = (props.ceo as { name: string; title: string }) || { name: 'CEO', title: 'Chief Executive Officer' };
  const reports = (props.reports as Array<{ name: string; title: string }>) || [];
  const elements: PPTXElement[] = [];

  // Title - Section title made more prominent
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 9, h: 0.6, text: title, fontSize: 28, bold: true, color: COLORS.textPrimary },
    { type: 'rect', x: 0.5, y: 1.05, w: 1.5, h: 0.06, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
  );

  // CEO card at top center - increased size and padding
  const ceoCardW = 3.2;
  const ceoCardH = 1.4;
  const ceoX = (10 - ceoCardW) / 2;
  const ceoY = 1.35;

  elements.push(
    { type: 'rect', x: ceoX, y: ceoY, w: ceoCardW, h: ceoCardH, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    // Avatar circle - no border needed
    { type: 'ellipse', x: ceoX + 0.25, y: ceoY + (ceoCardH - 0.8) / 2, w: 0.8, h: 0.8, fill: '#FFFFFF', line: { color: '#FFFFFF', width: 0 } },
    { type: 'text', x: ceoX + 0.25, y: ceoY + (ceoCardH - 0.8) / 2, w: 0.8, h: 0.8, text: ceo.name.split(' ').map(n => n[0]).join(''), fontSize: 18, bold: true, color: COLORS.accent, align: 'center', valign: 'middle' },
    // Name and title - 14pt → 22pt for name, 11pt → 14pt for title
    { type: 'text', x: ceoX + 1.15, y: ceoY + 0.3, w: ceoCardW - 1.35, h: 0.5, text: ceo.name, fontSize: 22, bold: true, color: '#FFFFFF', valign: 'middle' },
    { type: 'text', x: ceoX + 1.15, y: ceoY + 0.8, w: ceoCardW - 1.35, h: 0.4, text: ceo.title, fontSize: 14, color: 'rgba(255,255,255,0.9)', valign: 'middle' },
  );

  // Vertical connector from CEO
  const connectorTopY = ceoY + ceoCardH;
  const connectorMidY = connectorTopY + 0.4;
  elements.push(
    { type: 'rect', x: 5 - 0.02, y: connectorTopY, w: 0.04, h: 0.4, fill: COLORS.border, line: { color: COLORS.border, width: 0 } },
  );

  // Direct reports - increased spacing and card size
  const reportCount = Math.min(reports.length, 4);
  const reportCardW = 2.1;
  const reportCardH = 1.3;
  const reportGap = 0.5;
  const totalReportWidth = reportCount * reportCardW + (reportCount - 1) * reportGap;
  const reportStartX = (10 - totalReportWidth) / 2;
  const reportY = connectorMidY + 0.3;

  // Horizontal connector line
  if (reportCount > 1) {
    elements.push(
      { type: 'rect', x: reportStartX + reportCardW / 2, y: connectorMidY, w: totalReportWidth - reportCardW, h: 0.04, fill: COLORS.border, line: { color: COLORS.border, width: 0 } },
    );
  }

  reports.slice(0, 4).forEach((report, i) => {
    const x = reportStartX + i * (reportCardW + reportGap);

    // Vertical connector to each report
    elements.push(
      { type: 'rect', x: x + reportCardW / 2 - 0.02, y: connectorMidY, w: 0.04, h: 0.3, fill: COLORS.border, line: { color: COLORS.border, width: 0 } },
    );

    // Report card - border thickness increased to 3pt
    elements.push(
      { type: 'rect', x, y: reportY, w: reportCardW, h: reportCardH, fill: '#FFFFFF', line: { color: COLORS.accent, width: 3 } },
      // Avatar - border removed for cleaner look
      { type: 'ellipse', x: x + reportCardW / 2 - 0.35, y: reportY + 0.2, w: 0.7, h: 0.7, fill: COLORS.surface, line: { color: COLORS.accent, width: 0 } },
      { type: 'text', x: x + reportCardW / 2 - 0.35, y: reportY + 0.2, w: 0.7, h: 0.7, text: report.name.split(' ').map(n => n[0]).join(''), fontSize: 16, bold: true, color: COLORS.accent, align: 'center', valign: 'middle' },
      // Name - 10pt → 22pt (leadership emphasis)
      { type: 'text', x: x + 0.1, y: reportY + 0.92, w: reportCardW - 0.2, h: 0.35, text: report.name, fontSize: 12, bold: true, color: COLORS.textPrimary, align: 'center' },
    );
  });

  // Second level - sub-reports (simplified as labels below) - 9pt → 12pt
  const subReportY = reportY + reportCardH + 0.2;
  reports.slice(0, 4).forEach((report, i) => {
    const x = reportStartX + i * (reportCardW + reportGap);
    elements.push(
      { type: 'text', x, y: subReportY, w: reportCardW, h: 0.35, text: report.title, fontSize: 12, color: COLORS.textSecondary, align: 'center' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Team Stats Component - Team metrics grid (headcount, growth)
const teamStatsMeta: IRComponentMeta = {
  id: 'team-stats',
  name: '팀 통계',
  category: 'team',
  description: '팀 지표 그리드',
  defaultProps: {
    title: 'Team at a Glance',
    stats: [
      { label: 'Total Team', value: '85', unit: 'employees', change: '+40% YoY' },
      { label: 'Engineering', value: '52', unit: 'engineers', change: '61% of team' },
      { label: 'Avg Tenure', value: '2.3', unit: 'years', change: '+0.5 YoY' },
      { label: 'Countries', value: '12', unit: 'locations', change: 'Global team' },
    ],
    highlights: [
      '45% from FAANG companies',
      '8 PhDs in AI/ML',
      '100% retention in leadership',
    ],
  },
  propSchema: {
    title: { type: 'string', label: '제목', default: 'Team at a Glance' },
  },
};

function renderTeamStats(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Team at a Glance';
  const stats = (props.stats as Array<{ label: string; value: string; unit: string; change: string }>) || [];
  const highlights = (props.highlights as string[]) || [];
  const elements: PPTXElement[] = [];

  // Title - Section title made more prominent
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 9, h: 0.6, text: title, fontSize: 28, bold: true, color: COLORS.textPrimary },
    { type: 'rect', x: 0.5, y: 1.05, w: 1.5, h: 0.06, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
  );

  // Stats in 2x2 grid - increased spacing and padding
  const cardWidth = 4.3;
  const cardHeight = 1.8;
  const gapX = 0.6;
  const gapY = 0.45;
  const startX = (10 - (cardWidth * 2 + gapX)) / 2;
  const startY = 1.35;

  stats.slice(0, 4).forEach((stat, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = startX + col * (cardWidth + gapX);
    const y = startY + row * (cardHeight + gapY);

    // Card background - increased padding
    elements.push(
      { type: 'rect', x, y, w: cardWidth, h: cardHeight, fill: '#FFFFFF', line: { color: COLORS.border, width: 1 } },
      // Left accent - thicker
      { type: 'rect', x, y, w: 0.1, h: cardHeight, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    );

    // Label - 11pt → 12pt
    elements.push(
      { type: 'text', x: x + 0.3, y: y + 0.2, w: cardWidth - 0.6, h: 0.35, text: stat.label, fontSize: 12, color: COLORS.textSecondary },
    );

    // Value and unit - 12pt → 14pt for unit
    elements.push(
      { type: 'text', x: x + 0.3, y: y + 0.55, w: 1.9, h: 0.75, text: stat.value, fontSize: 38, bold: true, color: COLORS.accent, valign: 'middle' },
      { type: 'text', x: x + 2.25, y: y + 0.75, w: 1.85, h: 0.45, text: stat.unit, fontSize: 14, color: COLORS.textSecondary, valign: 'middle' },
    );

    // Change indicator - 11pt → 12pt
    elements.push(
      { type: 'text', x: x + 0.3, y: y + 1.35, w: cardWidth - 0.6, h: 0.35, text: stat.change, fontSize: 12, bold: true, color: COLORS.positive },
    );
  });

  // Highlights section - more prominent
  const highlightY = startY + 2 * (cardHeight + gapY) + 0.2;
  elements.push(
    { type: 'text', x: startX, y: highlightY, w: 2.5, h: 0.35, text: 'HIGHLIGHTS', fontSize: 12, bold: true, color: COLORS.textSecondary },
  );

  highlights.slice(0, 3).forEach((highlight, i) => {
    const hx = startX + i * 3.0;
    elements.push(
      { type: 'ellipse', x: hx, y: highlightY + 0.45, w: 0.22, h: 0.22, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
      { type: 'text', x: hx + 0.35, y: highlightY + 0.4, w: 2.55, h: 0.35, text: highlight, fontSize: 12, color: COLORS.textPrimary, valign: 'middle' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Founder Story Component - Narrative background of founders
const founderStoryMeta: IRComponentMeta = {
  id: 'founder-story',
  name: '창업자 스토리',
  category: 'team',
  description: '창업자 배경 스토리',
  defaultProps: {
    title: 'Our Story',
    founders: [
      { name: 'John Smith', role: 'CEO' },
      { name: 'Jane Doe', role: 'CTO' },
    ],
    story: 'We met at Stanford while researching distributed systems. After seeing enterprises struggle with fragmented tools, we knew there had to be a better way. In 2021, we left our jobs at Google and Meta to build the unified platform we wished existed.',
    milestones: [
      { year: '2021', event: 'Founded in San Francisco' },
      { year: '2022', event: 'Y Combinator W22' },
      { year: '2023', event: 'Series A, 50 employees' },
      { year: '2024', event: '500+ enterprise customers' },
    ],
  },
  propSchema: {
    title: { type: 'string', label: '제목', default: 'Our Story' },
  },
};

function renderFounderStory(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Our Story';
  const founders = (props.founders as Array<{ name: string; role: string }>) || [];
  const story = (props.story as string) || '';
  const milestones = (props.milestones as Array<{ year: string; event: string }>) || [];
  const elements: PPTXElement[] = [];

  // Title - Section title made more prominent
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 9, h: 0.6, text: title, fontSize: 28, bold: true, color: COLORS.textPrimary },
    { type: 'rect', x: 0.5, y: 1.05, w: 1.5, h: 0.06, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
  );

  // Founders photos placeholder (left side) - increased spacing, border to 3pt
  const photoSize = 1.5;
  founders.slice(0, 2).forEach((founder, i) => {
    const y = 1.4 + i * (photoSize + 0.45);
    elements.push(
      { type: 'ellipse', x: 0.6, y, w: photoSize, h: photoSize, fill: COLORS.surface, line: { color: COLORS.accent, width: 3 } },
      { type: 'text', x: 0.6, y, w: photoSize, h: photoSize, text: founder.name.split(' ').map(n => n[0]).join(''), fontSize: 26, bold: true, color: COLORS.accent, align: 'center', valign: 'middle' },
      // Name - 10pt → 22pt (leadership emphasis)
      { type: 'text', x: 0.5, y: y + photoSize + 0.08, w: photoSize + 0.2, h: 0.35, text: founder.name, fontSize: 14, bold: true, color: COLORS.textPrimary, align: 'center' },
      // Role - 9pt → 12pt
      { type: 'text', x: 0.5, y: y + photoSize + 0.4, w: photoSize + 0.2, h: 0.3, text: founder.role, fontSize: 12, color: COLORS.textSecondary, align: 'center' },
    );
  });

  // Story text (right side) - increased padding
  elements.push(
    { type: 'rect', x: 2.6, y: 1.4, w: 6.9, h: 2.2, fill: COLORS.surface, line: { color: COLORS.border, width: 1 } },
    { type: 'text', x: 2.8, y: 1.5, w: 0.45, h: 0.55, text: '"', fontSize: 38, color: COLORS.accent, valign: 'top' },
    // Bio - 12pt (already correct per spec)
    { type: 'text', x: 2.9, y: 1.7, w: 6.4, h: 1.75, text: story, fontSize: 12, color: COLORS.textPrimary, valign: 'top' },
  );

  // Timeline milestones - more prominent
  const timelineY = 3.85;
  elements.push(
    { type: 'text', x: 2.6, y: timelineY, w: 2.5, h: 0.35, text: 'OUR JOURNEY', fontSize: 12, bold: true, color: COLORS.textSecondary },
  );

  // Timeline line
  elements.push(
    { type: 'rect', x: 2.6, y: timelineY + 0.6, w: 6.9, h: 0.04, fill: COLORS.border, line: { color: COLORS.border, width: 0 } },
  );

  const milestoneCount = Math.min(milestones.length, 4);
  const milestoneWidth = 6.9 / milestoneCount;

  milestones.slice(0, 4).forEach((milestone, i) => {
    const x = 2.6 + i * milestoneWidth;
    elements.push(
      { type: 'ellipse', x: x + milestoneWidth / 2 - 0.13, y: timelineY + 0.49, w: 0.26, h: 0.26, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
      // Year - 11pt → 12pt
      { type: 'text', x, y: timelineY + 0.85, w: milestoneWidth, h: 0.32, text: milestone.year, fontSize: 12, bold: true, color: COLORS.accent, align: 'center' },
      // Event - 9pt → 12pt
      { type: 'text', x, y: timelineY + 1.2, w: milestoneWidth, h: 0.55, text: milestone.event, fontSize: 12, color: COLORS.textSecondary, align: 'center', valign: 'top' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Team Growth Component - Team size growth over time
const teamGrowthMeta: IRComponentMeta = {
  id: 'team-growth',
  name: '팀 성장',
  category: 'team',
  description: '시간에 따른 팀 규모 성장',
  defaultProps: {
    title: 'Team Growth',
    subtitle: 'Scaling thoughtfully while maintaining culture',
    data: [
      { period: 'Q1 2022', count: 5, label: 'Founding team' },
      { period: 'Q3 2022', count: 15, label: 'Post-seed' },
      { period: 'Q1 2023', count: 35, label: 'Series A' },
      { period: 'Q3 2023', count: 60, label: 'Expansion' },
      { period: 'Q1 2024', count: 85, label: 'Current' },
    ],
    breakdown: [
      { department: 'Engineering', percent: 55 },
      { department: 'Product', percent: 15 },
      { department: 'Sales', percent: 18 },
      { department: 'Operations', percent: 12 },
    ],
  },
  propSchema: {
    title: { type: 'string', label: '제목', default: 'Team Growth' },
  },
};

function renderTeamGrowth(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Team Growth';
  const subtitle = (props.subtitle as string) || '';
  const data = (props.data as Array<{ period: string; count: number; label: string }>) || [];
  const breakdown = (props.breakdown as Array<{ department: string; percent: number }>) || [];
  const elements: PPTXElement[] = [];

  // Title - Section title made more prominent
  elements.push(
    { type: 'text', x: 0.5, y: 0.35, w: 9, h: 0.5, text: title, fontSize: 28, bold: true, color: COLORS.textPrimary },
  );

  if (subtitle) {
    elements.push(
      { type: 'text', x: 0.5, y: 0.85, w: 9, h: 0.35, text: subtitle, fontSize: 12, color: COLORS.textSecondary },
    );
  }

  // Bar chart area - increased spacing
  const chartX = 0.8;
  const chartY = 1.5;
  const chartWidth = 5.8;
  const chartHeight = 2.8;
  const maxCount = Math.max(...data.map(d => d.count), 100);

  // Chart background
  elements.push(
    { type: 'rect', x: chartX, y: chartY, w: chartWidth, h: chartHeight, fill: COLORS.surface, line: { color: COLORS.border, width: 1 } },
  );

  // Bars
  const barCount = Math.min(data.length, 5);
  const barWidth = (chartWidth - 0.8) / barCount;
  const barGap = 0.15;

  data.slice(0, 5).forEach((item, i) => {
    const x = chartX + 0.4 + i * barWidth;
    const barH = (item.count / maxCount) * (chartHeight - 0.8);
    const barY = chartY + chartHeight - 0.4 - barH;

    // Bar
    elements.push(
      { type: 'rect', x: x + barGap / 2, y: barY, w: barWidth - barGap, h: barH, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    );

    // Count label on bar
    elements.push(
      { type: 'text', x: x, y: barY - 0.35, w: barWidth, h: 0.3, text: String(item.count), fontSize: 12, bold: true, color: COLORS.accent, align: 'center' },
    );

    // Period label below
    elements.push(
      { type: 'text', x: x, y: chartY + chartHeight - 0.35, w: barWidth, h: 0.3, text: item.period, fontSize: 8, color: COLORS.textSecondary, align: 'center' },
    );
  });

  // Breakdown on right side - more prominent
  const breakdownX = 7.0;
  elements.push(
    { type: 'text', x: breakdownX, y: 1.5, w: 2.5, h: 0.4, text: 'TEAM BREAKDOWN', fontSize: 12, bold: true, color: COLORS.textSecondary },
  );

  const colors = [COLORS.accent, COLORS.accentLight, '#8A9B5C', '#E5A84B'];
  breakdown.slice(0, 4).forEach((item, i) => {
    const y = 2.05 + i * 0.75;
    const barW = (item.percent / 100) * 2.3;

    elements.push(
      // Department name - 10pt → 12pt
      { type: 'text', x: breakdownX, y, w: 2.5, h: 0.28, text: item.department, fontSize: 12, color: COLORS.textPrimary },
      { type: 'rect', x: breakdownX, y: y + 0.32, w: 2.3, h: 0.22, fill: COLORS.surface, line: { color: COLORS.border, width: 0 } },
      { type: 'rect', x: breakdownX, y: y + 0.32, w: barW, h: 0.22, fill: colors[i % colors.length], line: { color: colors[i % colors.length], width: 0 } },
      // Percentage - 9pt → 12pt
      { type: 'text', x: breakdownX + 2.38, y: y + 0.23, w: 0.5, h: 0.35, text: `${item.percent}%`, fontSize: 12, bold: true, color: COLORS.textSecondary },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Culture Values Component - Company culture and values
const cultureValuesMeta: IRComponentMeta = {
  id: 'culture-values',
  name: '문화/가치',
  category: 'team',
  description: '회사 문화와 핵심 가치',
  defaultProps: {
    title: 'Our Culture & Values',
    subtitle: 'The principles that guide everything we do',
    values: [
      { icon: '🚀', name: 'Move Fast', description: 'Ship early, iterate often. Perfect is the enemy of good.' },
      { icon: '🤝', name: 'Customer Obsession', description: 'Every decision starts with "How does this help our users?"' },
      { icon: '💡', name: 'Think Big', description: 'Tackle hard problems. Build for the long term.' },
      { icon: '🔍', name: 'Radical Transparency', description: 'Share context freely. Default to open.' },
      { icon: '🌱', name: 'Continuous Growth', description: 'Learn from failures. Celebrate progress.' },
      { icon: '⚖️', name: 'Work-Life Harmony', description: 'Sustainable pace. Flexibility first.' },
    ],
  },
  propSchema: {
    title: { type: 'string', label: '제목', default: 'Our Culture & Values' },
  },
};

function renderCultureValues(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Our Culture & Values';
  const subtitle = (props.subtitle as string) || '';
  const values = (props.values as Array<{ icon: string; name: string; description: string }>) || [];
  const elements: PPTXElement[] = [];

  // Title - Section title made more prominent
  elements.push(
    { type: 'text', x: 0, y: 0.35, w: 10, h: 0.6, text: title, fontSize: 28, bold: true, color: COLORS.textPrimary, align: 'center' },
  );

  if (subtitle) {
    elements.push(
      { type: 'text', x: 0, y: 0.95, w: 10, h: 0.35, text: subtitle, fontSize: 12, color: COLORS.textSecondary, align: 'center' },
    );
  }

  // Values in 3x2 grid - increased spacing and padding
  const cardWidth = 2.95;
  const cardHeight = 1.7;
  const gapX = 0.35;
  const gapY = 0.3;
  const cols = 3;
  const totalWidth = cols * cardWidth + (cols - 1) * gapX;
  const startX = (10 - totalWidth) / 2;
  const startY = 1.5;

  values.slice(0, 6).forEach((value, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = startX + col * (cardWidth + gapX);
    const y = startY + row * (cardHeight + gapY);

    // Card background - increased padding
    elements.push(
      { type: 'rect', x, y, w: cardWidth, h: cardHeight, fill: '#FFFFFF', line: { color: COLORS.border, width: 1 } },
      { type: 'rect', x, y, w: cardWidth, h: 0.06, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    );

    // Icon - slightly larger
    elements.push(
      { type: 'text', x: x + 0.2, y: y + 0.2, w: 0.55, h: 0.55, text: value.icon, fontSize: 22, valign: 'middle' },
    );

    // Value name - 12pt → 14pt
    elements.push(
      { type: 'text', x: x + 0.8, y: y + 0.25, w: cardWidth - 0.95, h: 0.45, text: value.name, fontSize: 14, bold: true, color: COLORS.textPrimary, valign: 'middle' },
    );

    // Description - 10pt → 12pt
    elements.push(
      { type: 'text', x: x + 0.2, y: y + 0.8, w: cardWidth - 0.4, h: 0.8, text: value.description, fontSize: 12, color: COLORS.textSecondary, valign: 'top' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Hiring Plan Component - Future hiring roadmap
const hiringPlanMeta: IRComponentMeta = {
  id: 'hiring-plan',
  name: '채용 계획',
  category: 'team',
  description: '향후 채용 로드맵',
  defaultProps: {
    title: 'Hiring Plan',
    subtitle: 'Growing the team to match our ambitions',
    current: { total: 85, label: 'Current Team' },
    target: { total: 150, label: 'EOY Target' },
    departments: [
      { name: 'Engineering', current: 45, hiring: 30 },
      { name: 'Product', current: 12, hiring: 8 },
      { name: 'Sales', current: 15, hiring: 12 },
      { name: 'Marketing', current: 8, hiring: 10 },
      { name: 'Operations', current: 5, hiring: 5 },
    ],
    keyRoles: [
      'VP of Engineering',
      'Head of Data Science',
      'Enterprise AEs (x5)',
      'Senior Backend Engineers (x8)',
    ],
  },
  propSchema: {
    title: { type: 'string', label: '제목', default: 'Hiring Plan' },
  },
};

function renderHiringPlan(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Hiring Plan';
  const subtitle = (props.subtitle as string) || '';
  const current = (props.current as { total: number; label: string }) || { total: 0, label: 'Current' };
  const target = (props.target as { total: number; label: string }) || { total: 0, label: 'Target' };
  const departments = (props.departments as Array<{ name: string; current: number; hiring: number }>) || [];
  const keyRoles = (props.keyRoles as string[]) || [];
  const elements: PPTXElement[] = [];

  // Title - Section title made more prominent
  elements.push(
    { type: 'text', x: 0.5, y: 0.35, w: 9, h: 0.5, text: title, fontSize: 28, bold: true, color: COLORS.textPrimary },
  );

  if (subtitle) {
    elements.push(
      { type: 'text', x: 0.5, y: 0.85, w: 9, h: 0.35, text: subtitle, fontSize: 12, color: COLORS.textSecondary },
    );
  }

  // Top summary boxes - increased spacing and padding
  elements.push(
    // Current
    { type: 'rect', x: 0.8, y: 1.3, w: 2.6, h: 1.2, fill: COLORS.surface, line: { color: COLORS.border, width: 1 } },
    { type: 'text', x: 0.8, y: 1.4, w: 2.6, h: 0.32, text: current.label, fontSize: 12, color: COLORS.textSecondary, align: 'center' },
    { type: 'text', x: 0.8, y: 1.65, w: 2.6, h: 0.7, text: String(current.total), fontSize: 38, bold: true, color: COLORS.textPrimary, align: 'center', valign: 'middle' },
    // Arrow
    { type: 'text', x: 3.6, y: 1.6, w: 0.6, h: 0.6, text: '→', fontSize: 26, color: COLORS.accent, align: 'center', valign: 'middle' },
    // Target
    { type: 'rect', x: 4.4, y: 1.3, w: 2.6, h: 1.2, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    { type: 'text', x: 4.4, y: 1.4, w: 2.6, h: 0.32, text: target.label, fontSize: 12, color: 'rgba(255,255,255,0.9)', align: 'center' },
    { type: 'text', x: 4.4, y: 1.65, w: 2.6, h: 0.7, text: String(target.total), fontSize: 38, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
    // Growth - border to 3pt
    { type: 'rect', x: 7.2, y: 1.3, w: 2.3, h: 1.2, fill: '#FFFFFF', line: { color: COLORS.positive, width: 3 } },
    { type: 'text', x: 7.2, y: 1.4, w: 2.3, h: 0.32, text: 'Growth', fontSize: 12, color: COLORS.textSecondary, align: 'center' },
    { type: 'text', x: 7.2, y: 1.65, w: 2.3, h: 0.7, text: `+${target.total - current.total}`, fontSize: 34, bold: true, color: COLORS.positive, align: 'center', valign: 'middle' },
  );

  // Department breakdown - more prominent
  const deptY = 2.75;
  elements.push(
    { type: 'text', x: 0.8, y: deptY, w: 4.5, h: 0.35, text: 'DEPARTMENT BREAKDOWN', fontSize: 12, bold: true, color: COLORS.textSecondary },
  );

  const maxTotal = Math.max(...departments.map(d => d.current + d.hiring));
  departments.slice(0, 5).forEach((dept, i) => {
    const y = deptY + 0.5 + i * 0.55;
    const currentW = (dept.current / maxTotal) * 3.5;
    const hiringW = (dept.hiring / maxTotal) * 3.5;

    elements.push(
      // Department name - 10pt → 12pt
      { type: 'text', x: 0.8, y, w: 1.6, h: 0.42, text: dept.name, fontSize: 12, color: COLORS.textPrimary, valign: 'middle' },
      { type: 'rect', x: 2.5, y: y + 0.1, w: currentW, h: 0.26, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
      { type: 'rect', x: 2.5 + currentW, y: y + 0.1, w: hiringW, h: 0.26, fill: COLORS.accentLight, line: { color: COLORS.accentLight, width: 0 } },
      // Hiring count - 9pt → 12pt
      { type: 'text', x: 6.15, y, w: 0.75, h: 0.42, text: `+${dept.hiring}`, fontSize: 12, bold: true, color: COLORS.positive, valign: 'middle' },
    );
  });

  // Legend - 9pt → 12pt
  elements.push(
    { type: 'rect', x: 2.5, y: deptY + 3.3, w: 0.32, h: 0.22, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    { type: 'text', x: 2.87, y: deptY + 3.25, w: 1.1, h: 0.32, text: 'Current', fontSize: 12, color: COLORS.textSecondary, valign: 'middle' },
    { type: 'rect', x: 4.1, y: deptY + 3.3, w: 0.32, h: 0.22, fill: COLORS.accentLight, line: { color: COLORS.accentLight, width: 0 } },
    { type: 'text', x: 4.47, y: deptY + 3.25, w: 1.1, h: 0.32, text: 'Hiring', fontSize: 12, color: COLORS.textSecondary, valign: 'middle' },
  );

  // Key roles - more prominent
  elements.push(
    { type: 'text', x: 7.2, y: deptY, w: 2.5, h: 0.35, text: 'KEY ROLES', fontSize: 12, bold: true, color: COLORS.textSecondary },
  );

  keyRoles.slice(0, 4).forEach((role, i) => {
    const y = deptY + 0.5 + i * 0.6;
    elements.push(
      { type: 'ellipse', x: 7.2, y: y + 0.11, w: 0.2, h: 0.2, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
      // Role text - 10pt → 12pt
      { type: 'text', x: 7.5, y, w: 2.0, h: 0.42, text: role, fontSize: 12, color: COLORS.textPrimary, valign: 'middle' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Register components
registry.register(teamGridMeta, renderTeamGrid);
registry.register(advisorRowMeta, renderAdvisorRow);
registry.register(founderSpotlightMeta, renderFounderSpotlight);
registry.register(hiringPositionsMeta, renderHiringPositions);
registry.register(orgChartMeta, renderOrgChart);
registry.register(teamStatsMeta, renderTeamStats);
registry.register(founderStoryMeta, renderFounderStory);
registry.register(teamGrowthMeta, renderTeamGrowth);
registry.register(cultureValuesMeta, renderCultureValues);
registry.register(hiringPlanMeta, renderHiringPlan);

export { teamGridMeta, advisorRowMeta, founderSpotlightMeta, hiringPositionsMeta, orgChartMeta, teamStatsMeta, founderStoryMeta, teamGrowthMeta, cultureValuesMeta, hiringPlanMeta };
