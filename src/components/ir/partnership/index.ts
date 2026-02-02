import { registry } from '@/lib/registry';
import type { IRComponentMeta, IRComponentRenderResult, PPTXElement } from '@/types';
import { COLORS } from '@/lib/constants';

// Partner Logos Component - Logo grid display
const partnerLogosMeta: IRComponentMeta = {
  id: 'partner-logos',
  name: '파트너 로고',
  category: 'partnership',
  description: '파트너 로고 그리드',
  defaultProps: {
    title: 'Strategic Partners',
    subtitle: 'Working with industry leaders',
    partners: [
      'Amazon Web Services',
      'Microsoft Azure',
      'Google Cloud',
      'Salesforce',
      'Slack',
      'Zoom',
    ],
  },
  propSchema: {},
};

function renderPartnerLogos(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Partners';
  const subtitle = (props.subtitle as string) || '';
  const partners = (props.partners as string[]) || [];
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 9, h: 0.5, text: title, fontSize: 29, bold: true, color: COLORS.textPrimary },
  );

  // Subtitle
  if (subtitle) {
    elements.push(
      { type: 'text', x: 0.5, y: 0.95, w: 9, h: 0.35, text: subtitle, fontSize: 12, color: COLORS.textSecondary },
    );
  }

  // Logo grid (3 columns)
  const cols = 3;
  const cardWidth = 2.7;
  const cardHeight = 1.4;
  const gapX = 0.45;
  const gapY = 0.45;
  const totalWidth = cols * cardWidth + (cols - 1) * gapX;
  const startX = (10 - totalWidth) / 2;
  const startY = 1.5;

  partners.slice(0, 6).forEach((partner, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = startX + col * (cardWidth + gapX);
    const y = startY + row * (cardHeight + gapY);

    // Card background
    elements.push(
      { type: 'rect', x, y, w: cardWidth, h: cardHeight, fill: '#FFFFFF', line: { color: COLORS.border, width: 3 } },
    );

    // Logo placeholder area
    elements.push(
      { type: 'rect', x: x + (cardWidth - 1.4) / 2, y: y + 0.25, w: 1.4, h: 0.7, fill: COLORS.surface, line: { color: COLORS.border, width: 3 } },
    );

    // Partner name
    elements.push(
      { type: 'text', x: x + 0.4, y: y + cardHeight - 0.4, w: cardWidth - 0.2, h: 0.3, text: partner, fontSize: 12, color: COLORS.textSecondary, align: 'center', valign: 'middle' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Investor List Component - Investment rounds table
const investorListMeta: IRComponentMeta = {
  id: 'investor-list',
  name: '투자자 목록',
  category: 'partnership',
  description: '투자자 리스트',
  defaultProps: {
    title: 'Backed by World-Class Investors',
    totalRaised: '$38.5M raised to date',
    investors: [
      { name: 'Sequoia Capital', round: 'Series A', amount: '$15M', lead: true },
      { name: 'Andreessen Horowitz', round: 'Series A', amount: '$8M', lead: false },
      { name: 'Accel Partners', round: 'Seed', amount: '$3M', lead: true },
      { name: 'Y Combinator', round: 'Seed', amount: '$500K', lead: false },
    ],
  },
  propSchema: {},
};

function renderInvestorList(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Investors';
  const totalRaised = (props.totalRaised as string) || '';
  const investors = (props.investors as Array<{name: string; round: string; amount: string; lead?: boolean}>) || [];
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 9, h: 0.5, text: title, fontSize: 29, bold: true, color: COLORS.textPrimary },
  );

  // Total raised badge
  if (totalRaised) {
    elements.push(
      { type: 'rect', x: 0.5, y: 0.95, w: 2.5, h: 0.4, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
      { type: 'text', x: 0.5, y: 0.95, w: 2.5, h: 0.4, text: totalRaised, fontSize: 14, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
    );
  }

  // Table
  const tableX = 0.8;
  const tableY = 1.6;
  const headerHeight = 0.5;
  const rowHeight = 0.75;

  // Column widths
  const colWidths = [3.5, 1.8, 1.5, 1.6];

  // Header
  const headers = ['Investor', 'Round', 'Amount', 'Status'];
  let headerX = tableX;
  headers.forEach((header, i) => {
    elements.push(
      { type: 'rect', x: headerX, y: tableY, w: colWidths[i], h: headerHeight, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
      { type: 'text', x: headerX + 0.15, y: tableY, w: colWidths[i] - 0.3, h: headerHeight, text: header, fontSize: 14, bold: true, color: '#FFFFFF', align: i === 0 ? 'left' : 'center', valign: 'middle' },
    );
    headerX += colWidths[i];
  });

  // Investor rows
  investors.forEach((investor, i) => {
    const y = tableY + headerHeight + i * rowHeight;
    const isAlt = i % 2 === 1;

    let colX = tableX;

    // Name
    elements.push(
      { type: 'rect', x: colX, y, w: colWidths[0], h: rowHeight, fill: isAlt ? COLORS.surface : '#FFFFFF', line: { color: COLORS.border, width: 0.5 } },
      { type: 'text', x: colX + 0.15, y, w: colWidths[0] - 0.3, h: rowHeight, text: investor.name, fontSize: 12, bold: true, color: COLORS.textPrimary, valign: 'middle' },
    );
    colX += colWidths[0];

    // Round
    elements.push(
      { type: 'rect', x: colX, y, w: colWidths[1], h: rowHeight, fill: isAlt ? COLORS.surface : '#FFFFFF', line: { color: COLORS.border, width: 0.5 } },
      { type: 'text', x: colX, y, w: colWidths[1], h: rowHeight, text: investor.round, fontSize: 14, color: COLORS.textSecondary, align: 'center', valign: 'middle' },
    );
    colX += colWidths[1];

    // Amount
    elements.push(
      { type: 'rect', x: colX, y, w: colWidths[2], h: rowHeight, fill: isAlt ? COLORS.surface : '#FFFFFF', line: { color: COLORS.border, width: 0.5 } },
      { type: 'text', x: colX, y, w: colWidths[2], h: rowHeight, text: investor.amount, fontSize: 12, bold: true, color: COLORS.accent, align: 'center', valign: 'middle' },
    );
    colX += colWidths[2];

    // Status/Lead badge
    elements.push(
      { type: 'rect', x: colX, y, w: colWidths[3], h: rowHeight, fill: isAlt ? COLORS.surface : '#FFFFFF', line: { color: COLORS.border, width: 0.5 } },
    );
    if (investor.lead) {
      elements.push(
        { type: 'rect', x: colX + (colWidths[3] - 1) / 2, y: y + (rowHeight - 0.3) / 2, w: 1, h: 0.3, fill: COLORS.positive, line: { color: COLORS.positive, width: 0 } },
        { type: 'text', x: colX + (colWidths[3] - 1) / 2, y: y + (rowHeight - 0.3) / 2, w: 1, h: 0.3, text: 'LEAD', fontSize: 12, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
      );
    }
  });

  return { elements, width: 10, height: 5.625 };
}

// Client Logos Component - Customer logo showcase
const clientLogosMeta: IRComponentMeta = {
  id: 'client-logos',
  name: '고객 로고',
  category: 'partnership',
  description: '고객 로고 그리드',
  defaultProps: {
    title: 'Trusted by Industry Leaders',
    subtitle: 'Join 500+ companies using our platform',
    clients: [
      'Apple', 'Google', 'Microsoft',
      'Amazon', 'Meta', 'Netflix',
      'Tesla', 'Adobe', 'Salesforce',
    ],
  },
  propSchema: {},
};

function renderClientLogos(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Our Clients';
  const subtitle = (props.subtitle as string) || '';
  const clients = (props.clients as string[]) || [];
  const elements: PPTXElement[] = [];

  // Title (centered)
  elements.push(
    { type: 'text', x: 0, y: 0.4, w: 10, h: 0.5, text: title, fontSize: 29, bold: true, color: COLORS.textPrimary, align: 'center' },
  );

  // Subtitle
  if (subtitle) {
    elements.push(
      { type: 'text', x: 0, y: 0.95, w: 10, h: 0.35, text: subtitle, fontSize: 12, color: COLORS.textSecondary, align: 'center' },
    );
  }

  // Logo grid (3 columns, 3 rows)
  const cols = 3;
  const rows = 3;
  const cardWidth = 2.6;
  const cardHeight = 1.0;
  const gapX = 0.35;
  const gapY = 0.25;
  const totalWidth = cols * cardWidth + (cols - 1) * gapX;
  const startX = (10 - totalWidth) / 2;
  const startY = 1.5;

  clients.slice(0, cols * rows).forEach((client, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = startX + col * (cardWidth + gapX);
    const y = startY + row * (cardHeight + gapY);

    // Clean card with minimal styling
    elements.push(
      { type: 'rect', x, y, w: cardWidth, h: cardHeight, fill: '#FFFFFF', line: { color: COLORS.border, width: 3 } },
    );

    // Client name (as placeholder for logo)
    elements.push(
      { type: 'text', x, y, w: cardWidth, h: cardHeight, text: client, fontSize: 12, bold: true, color: COLORS.textSecondary, align: 'center', valign: 'middle' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Testimonial Card Component - Customer quote
const testimonialCardMeta: IRComponentMeta = {
  id: 'testimonial-card',
  name: '고객 후기',
  category: 'partnership',
  description: '고객 추천사',
  defaultProps: {
    title: 'What Our Customers Say',
    quote: 'This platform has completely transformed how we operate. We saw a 40% increase in productivity within the first month. The ROI was immediate and the support team is exceptional.',
    author: 'Sarah Johnson',
    authorTitle: 'VP of Engineering',
    company: 'Fortune 500 Tech Company',
    rating: 5,
    metric: { value: '40%', label: 'Productivity Increase' },
  },
  propSchema: {},
};

function renderTestimonialCard(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Testimonial';
  const quote = (props.quote as string) || '';
  const author = (props.author as string) || '';
  const authorTitle = (props.authorTitle as string) || '';
  const company = (props.company as string) || '';
  const rating = (props.rating as number) || 5;
  const metric = (props.metric as { value: string; label: string }) || null;
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 9, h: 0.5, text: title, fontSize: 29, bold: true, color: COLORS.textPrimary },
  );

  // Main testimonial card
  const cardX = 0.6;
  const cardY = 1.1;
  const cardW = metric ? 6.4 : 8.8;
  const cardH = 3.8;

  elements.push(
    { type: 'rect', x: cardX, y: cardY, w: cardW, h: cardH, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
  );

  // Large quote mark
  elements.push(
    { type: 'text', x: cardX + 0.3, y: cardY + 0.2, w: 0.8, h: 0.8, text: '"', fontSize: 72, bold: true, color: 'rgba(255,255,255,0.3)' },
  );

  // Quote text
  elements.push(
    { type: 'text', x: cardX + 0.4, y: cardY + 0.8, w: cardW - 0.8, h: 1.6, text: quote, fontSize: 13, color: '#FFFFFF', valign: 'top' },
  );

  // Rating stars
  const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
  elements.push(
    { type: 'text', x: cardX + 0.4, y: cardY + 2.5, w: cardW - 0.8, h: 0.35, text: stars, fontSize: 16, color: '#FFD700' },
  );

  // Author section
  elements.push(
    // Author avatar placeholder
    { type: 'ellipse', x: cardX + 0.4, y: cardY + 3.0, w: 0.5, h: 0.5, fill: 'rgba(255,255,255,0.2)', line: { color: 'rgba(255,255,255,0.4)', width: 3 } },
    { type: 'text', x: cardX + 0.4, y: cardY + 3.0, w: 0.5, h: 0.5, text: author.split(' ').map(n => n[0]).join(''), fontSize: 12, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
    // Author name
    { type: 'text', x: cardX + 1.05, y: cardY + 3.0, w: cardW - 1.45, h: 0.25, text: author, fontSize: 12, bold: true, color: '#FFFFFF' },
    // Author title & company
    { type: 'text', x: cardX + 1.05, y: cardY + 3.3, w: cardW - 1.45, h: 0.2, text: `${authorTitle}, ${company}`, fontSize: 13, color: 'rgba(255,255,255,0.85)' },
  );

  // Metric highlight card (if provided)
  if (metric) {
    const metricX = 7.2;
    const metricY = cardY + 0.5;
    const metricW = 2.3;
    const metricH = 2.8;

    elements.push(
      { type: 'rect', x: metricX, y: metricY, w: metricW, h: metricH, fill: '#FFFFFF', line: { color: COLORS.border, width: 3 } },
      // Metric value
      { type: 'text', x: metricX, y: metricY + 0.6, w: metricW, h: 0.8, text: metric.value, fontSize: 40, bold: true, color: COLORS.accent, align: 'center', valign: 'middle' },
      // Metric label
      { type: 'text', x: metricX + 0.2, y: metricY + 1.5, w: metricW - 0.4, h: 0.8, text: metric.label, fontSize: 12, color: COLORS.textPrimary, align: 'center', valign: 'top' },
    );
  }

  return { elements, width: 10, height: 5.625 };
}

// Case Study Card Component - Customer card with challenge/solution/result
const caseStudyCardMeta: IRComponentMeta = {
  id: 'case-study-card',
  name: '케이스 스터디',
  category: 'partnership',
  description: '고객 성공 사례',
  defaultProps: {
    title: 'Customer Success Story',
    company: 'Acme Corporation',
    industry: 'Enterprise SaaS',
    challenge: 'Manual data processing taking 40+ hours weekly, leading to delays and errors in reporting.',
    solution: 'Implemented automated data pipeline with real-time validation and error detection.',
    results: [
      { metric: '90%', label: 'Time Saved' },
      { metric: '99.9%', label: 'Accuracy' },
      { metric: '3x', label: 'Faster Reports' },
    ],
  },
  propSchema: {},
};

function renderCaseStudyCard(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Case Study';
  const company = (props.company as string) || '';
  const industry = (props.industry as string) || '';
  const challenge = (props.challenge as string) || '';
  const solution = (props.solution as string) || '';
  const results = (props.results as Array<{ metric: string; label: string }>) || [];
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.35, w: 9, h: 0.45, text: title, fontSize: 26, bold: true, color: COLORS.textPrimary },
  );

  // Company info header
  elements.push(
    { type: 'rect', x: 0.5, y: 0.9, w: 9, h: 0.7, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    { type: 'text', x: 0.7, y: 0.95, w: 4, h: 0.35, text: company, fontSize: 16, bold: true, color: '#FFFFFF' },
    { type: 'text', x: 0.7, y: 1.3, w: 4, h: 0.25, text: industry, fontSize: 14, color: 'rgba(255,255,255,0.85)' },
  );

  // Challenge section
  elements.push(
    { type: 'rect', x: 0.5, y: 1.75, w: 4.3, h: 1.6, fill: '#FFFFFF', line: { color: COLORS.border, width: 3 } },
    { type: 'rect', x: 0.5, y: 1.75, w: 4.3, h: 0.05, fill: COLORS.negative, line: { color: COLORS.negative, width: 0 } },
    { type: 'text', x: 0.7, y: 1.9, w: 3.9, h: 0.3, text: 'CHALLENGE', fontSize: 13, bold: true, color: COLORS.negative },
    { type: 'text', x: 0.7, y: 2.25, w: 3.9, h: 1.0, text: challenge, fontSize: 14, color: COLORS.textPrimary, valign: 'top' },
  );

  // Solution section
  elements.push(
    { type: 'rect', x: 5.0, y: 1.75, w: 4.5, h: 1.6, fill: '#FFFFFF', line: { color: COLORS.border, width: 3 } },
    { type: 'rect', x: 5.0, y: 1.75, w: 4.5, h: 0.05, fill: COLORS.positive, line: { color: COLORS.positive, width: 0 } },
    { type: 'text', x: 5.2, y: 1.9, w: 4.1, h: 0.3, text: 'SOLUTION', fontSize: 13, bold: true, color: COLORS.positive },
    { type: 'text', x: 5.2, y: 2.25, w: 4.1, h: 1.0, text: solution, fontSize: 14, color: COLORS.textPrimary, valign: 'top' },
  );

  // Results section
  elements.push(
    { type: 'text', x: 0.5, y: 3.5, w: 9, h: 0.35, text: 'RESULTS', fontSize: 14, bold: true, color: COLORS.textSecondary },
  );

  const resultWidth = 2.8;
  const resultGap = 0.3;
  const totalResultWidth = results.length * resultWidth + (results.length - 1) * resultGap;
  const resultStartX = (10 - totalResultWidth) / 2;

  results.slice(0, 3).forEach((result, i) => {
    const x = resultStartX + i * (resultWidth + resultGap);
    elements.push(
      { type: 'rect', x, y: 3.9, w: resultWidth, h: 1.4, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
      { type: 'text', x, y: 4.1, w: resultWidth, h: 0.6, text: result.metric, fontSize: 32, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
      { type: 'text', x, y: 4.75, w: resultWidth, h: 0.4, text: result.label, fontSize: 14, color: 'rgba(255,255,255,0.9)', align: 'center', valign: 'middle' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Logo Marquee Component - Horizontal logo row with header
const logoMarqueeMeta: IRComponentMeta = {
  id: 'logo-marquee',
  name: '로고 마퀴',
  category: 'partnership',
  description: '수평 로고 배너',
  defaultProps: {
    title: 'Trusted by Leading Companies',
    subtitle: 'Join 1,000+ organizations worldwide',
    logos: ['Apple', 'Google', 'Microsoft', 'Amazon', 'Meta'],
  },
  propSchema: {},
};

function renderLogoMarquee(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Our Partners';
  const subtitle = (props.subtitle as string) || '';
  const logos = (props.logos as string[]) || [];
  const elements: PPTXElement[] = [];

  // Title (centered)
  elements.push(
    { type: 'text', x: 0, y: 1.5, w: 10, h: 0.6, text: title, fontSize: 42, bold: true, color: COLORS.textPrimary, align: 'center' },
  );

  // Subtitle
  if (subtitle) {
    elements.push(
      { type: 'text', x: 0, y: 2.15, w: 10, h: 0.4, text: subtitle, fontSize: 14, color: COLORS.textSecondary, align: 'center' },
    );
  }

  // Logo row
  const logoCount = Math.min(logos.length, 5);
  const logoWidth = 1.5;
  const logoHeight = 0.9;
  const logoGap = 0.4;
  const totalLogoWidth = logoCount * logoWidth + (logoCount - 1) * logoGap;
  const startX = (10 - totalLogoWidth) / 2;
  const logoY = 3.0;

  logos.slice(0, logoCount).forEach((logo, i) => {
    const x = startX + i * (logoWidth + logoGap);

    // Logo container
    elements.push(
      { type: 'rect', x, y: logoY, w: logoWidth, h: logoHeight, fill: '#FFFFFF', line: { color: COLORS.border, width: 3 } },
      // Logo placeholder text
      { type: 'text', x, y: logoY, w: logoWidth, h: logoHeight, text: logo, fontSize: 14, bold: true, color: COLORS.textSecondary, align: 'center', valign: 'middle' },
    );
  });

  // Decorative line above logos
  elements.push(
    { type: 'rect', x: 2, y: 2.7, w: 6, h: 0.02, fill: COLORS.border, line: { color: COLORS.border, width: 0 } },
  );

  // Decorative line below logos
  elements.push(
    { type: 'rect', x: 2, y: logoY + logoHeight + 0.3, w: 6, h: 0.02, fill: COLORS.border, line: { color: COLORS.border, width: 0 } },
  );

  return { elements, width: 10, height: 5.625 };
}

// Social Proof Stats Component - Large stat numbers with context
const socialProofStatsMeta: IRComponentMeta = {
  id: 'social-proof-stats',
  name: '소셜 프루프 통계',
  category: 'partnership',
  description: '대형 통계 수치',
  defaultProps: {
    title: 'Trusted Globally',
    stats: [
      { value: '10M+', label: 'Active Users', subtext: 'Across 150+ countries' },
      { value: '$2B+', label: 'Transactions', subtext: 'Processed annually' },
      { value: '99.99%', label: 'Uptime', subtext: 'Enterprise-grade reliability' },
      { value: '4.9/5', label: 'Rating', subtext: 'From 10,000+ reviews' },
    ],
  },
  propSchema: {},
};

function renderSocialProofStats(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'By the Numbers';
  const stats = (props.stats as Array<{ value: string; label: string; subtext?: string }>) || [];
  const elements: PPTXElement[] = [];

  // Title (centered)
  elements.push(
    { type: 'text', x: 0, y: 0.5, w: 10, h: 0.6, text: title, fontSize: 42, bold: true, color: COLORS.textPrimary, align: 'center' },
  );

  // Stats row
  const statCount = Math.min(stats.length, 4);
  const statWidth = 2.1;
  const statGap = 0.3;
  const totalStatWidth = statCount * statWidth + (statCount - 1) * statGap;
  const startX = (10 - totalStatWidth) / 2;
  const statY = 1.5;

  stats.slice(0, statCount).forEach((stat, i) => {
    const x = startX + i * (statWidth + statGap);

    // Stat card
    elements.push(
      { type: 'rect', x, y: statY, w: statWidth, h: 3.3, fill: '#FFFFFF', line: { color: COLORS.border, width: 3 } },
      // Top accent line
      { type: 'rect', x, y: statY, w: statWidth, h: 0.5, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    );

    // Value (large)
    elements.push(
      { type: 'text', x, y: statY + 0.5, w: statWidth, h: 1.0, text: stat.value, fontSize: 52, bold: true, color: COLORS.accent, align: 'center', valign: 'middle' },
    );

    // Label
    elements.push(
      { type: 'text', x: x + 0.4, y: statY + 1.6, w: statWidth - 0.2, h: 0.4, text: stat.label, fontSize: 14, bold: true, color: COLORS.textPrimary, align: 'center', valign: 'middle' },
    );

    // Subtext
    if (stat.subtext) {
      elements.push(
        { type: 'text', x: x + 0.4, y: statY + 2.1, w: statWidth - 0.2, h: 0.8, text: stat.subtext, fontSize: 13, color: COLORS.textSecondary, align: 'center', valign: 'top' },
      );
    }
  });

  return { elements, width: 10, height: 5.625 };
}

// Register components
registry.register(partnerLogosMeta, renderPartnerLogos);
registry.register(investorListMeta, renderInvestorList);
registry.register(clientLogosMeta, renderClientLogos);
registry.register(testimonialCardMeta, renderTestimonialCard);
registry.register(caseStudyCardMeta, renderCaseStudyCard);
registry.register(logoMarqueeMeta, renderLogoMarquee);
registry.register(socialProofStatsMeta, renderSocialProofStats);

export { partnerLogosMeta, investorListMeta, clientLogosMeta, testimonialCardMeta, caseStudyCardMeta, logoMarqueeMeta, socialProofStatsMeta };
