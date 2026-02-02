import { registry } from '@/lib/registry';
import type { IRComponentMeta, IRComponentRenderResult, PPTXElement } from '@/types';
import { COLORS } from '@/lib/constants';

// Feature Grid - Professional 2x2 or 3x2 feature cards
const featureGridMeta: IRComponentMeta = {
  id: 'feature-grid',
  name: '기능 그리드',
  category: 'product-showcase',
  description: '2x2 또는 3x2 제품 기능 그리드',
  defaultProps: {
    title: 'Key Features',
    columns: 2,
    features: [
      { icon: '⚡', title: 'Lightning Fast', description: 'Optimized architecture delivers sub-100ms response times' },
      { icon: '🔒', title: 'Enterprise Security', description: 'SOC 2 Type II compliant with end-to-end encryption' },
      { icon: '📊', title: 'Advanced Analytics', description: 'Real-time insights with customizable dashboards' },
      { icon: '🔄', title: 'Seamless Integration', description: 'Connect with 100+ tools via REST API and webhooks' },
    ],
  },
  propSchema: {
    columns: { type: 'number', label: '컬럼 수', default: 2, min: 2, max: 3 },
  },
};

function renderFeatureGrid(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Features';
  const columns = (props.columns as number) || 2;
  const features = (props.features as Array<{ icon?: string; title: string; description: string }>) || [];

  const elements: PPTXElement[] = [];

  // Title - 30% larger font
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 9, h: 0.5, text: title, fontSize: 29, bold: true, color: COLORS.textPrimary },
    { type: 'rect', x: 0.5, y: 0.95, w: 1.2, h: 0.1, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
  );

  const cols = Math.min(columns, 3);
  const rows = Math.ceil(Math.min(features.length, 6) / cols);
  const cardWidth = cols === 2 ? 4.3 : 2.8;
  const cardHeight = rows === 1 ? 3.5 : 1.75;
  const gapX = 0.6;
  const gapY = 0.525;
  const startX = (10 - (cols * cardWidth + (cols - 1) * gapX)) / 2;
  const startY = 1.25;

  features.slice(0, cols * rows).forEach((feature, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    const x = startX + col * (cardWidth + gapX);
    const y = startY + row * (cardHeight + gapY);

    // Card background with premium padding
    elements.push(
      { type: 'rect', x, y, w: cardWidth, h: cardHeight, fill: '#FFFFFF', line: { color: COLORS.border, width: 1 } },
      // Accent top bar - doubled from 0.05 to 0.1
      { type: 'rect', x, y, w: cardWidth, h: 0.1, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    );

    // Icon circle
    if (feature.icon) {
      elements.push(
        { type: 'ellipse', x: x + 0.4, y: y + 0.4, w: 0.6, h: 0.6, fill: COLORS.surface, line: { color: COLORS.accent, width: 1 } },
        { type: 'text', x: x + 0.4, y: y + 0.4, w: 0.6, h: 0.6, text: feature.icon, fontSize: 18, align: 'center', valign: 'middle' },
      );
    }

    // Title - 30% larger font (14 → 18)
    elements.push(
      { type: 'text', x: x + (feature.icon ? 1.15 : 0.4), y: y + 0.45, w: cardWidth - (feature.icon ? 1.55 : 0.8), h: 0.4, text: feature.title, fontSize: 18, bold: true, color: COLORS.textPrimary, valign: 'middle' },
    );

    // Description - minimum 12pt
    const descY = rows === 1 ? y + 1.0 : y + 0.85;
    const descHeight = rows === 1 ? 2.0 : 0.7;
    elements.push(
      { type: 'text', x: x + 0.4, y: descY, w: cardWidth - 0.8, h: descHeight, text: feature.description, fontSize: 12, color: COLORS.textSecondary, valign: 'top' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Screenshot Frame - Product screenshot with frame
const screenshotFrameMeta: IRComponentMeta = {
  id: 'screenshot-frame',
  name: '스크린샷 프레임',
  category: 'product-showcase',
  description: '제품 스크린샷 플레이스홀더',
  defaultProps: {
    title: 'Product Dashboard',
    caption: 'Real-time analytics and insights at your fingertips',
    captionPosition: 'bottom',
  },
  propSchema: {
    caption: { type: 'string', label: '캡션', default: 'Real-time analytics and insights' },
    captionPosition: { type: 'select', label: '캡션 위치', default: 'bottom', options: [
      { value: 'top', label: '위' },
      { value: 'bottom', label: '아래' },
    ]},
  },
};

function renderScreenshotFrame(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || '';
  const caption = (props.caption as string) || '';
  const captionPosition = (props.captionPosition as string) || 'bottom';

  const elements: PPTXElement[] = [];

  // Larger screenshot frame
  const frameX = 0.5;
  const frameY = captionPosition === 'top' ? 1.4 : 0.7;
  const frameWidth = 9.0;
  const frameHeight = 4.2;

  // Title (if caption at top) - 30% larger
  if (captionPosition === 'top' && title) {
    elements.push(
      { type: 'text', x: 0.5, y: 0.5, w: 9.0, h: 0.45, text: title, fontSize: 23, bold: true, color: COLORS.textPrimary },
      { type: 'text', x: 0.5, y: 0.95, w: 9.0, h: 0.35, text: caption, fontSize: 12, color: COLORS.textSecondary },
    );
  }

  // Browser-style frame
  elements.push(
    // Outer frame with shadow effect
    { type: 'rect', x: frameX, y: frameY, w: frameWidth, h: frameHeight, fill: COLORS.textPrimary, line: { color: COLORS.textPrimary, width: 0 } },
    // Browser bar
    { type: 'rect', x: frameX, y: frameY, w: frameWidth, h: 0.4, fill: COLORS.surface, line: { color: COLORS.border, width: 0 } },
    // Window controls (dots)
    { type: 'ellipse', x: frameX + 0.2, y: frameY + 0.12, w: 0.16, h: 0.16, fill: '#FF5F57', line: { color: '#FF5F57', width: 0 } },
    { type: 'ellipse', x: frameX + 0.45, y: frameY + 0.12, w: 0.16, h: 0.16, fill: '#FFBD2E', line: { color: '#FFBD2E', width: 0 } },
    { type: 'ellipse', x: frameX + 0.7, y: frameY + 0.12, w: 0.16, h: 0.16, fill: '#28C840', line: { color: '#28C840', width: 0 } },
    // URL bar
    { type: 'rect', x: frameX + 1.2, y: frameY + 0.1, w: 4, h: 0.2, fill: '#FFFFFF', line: { color: COLORS.border, width: 1 } },
    { type: 'text', x: frameX + 1.3, y: frameY + 0.1, w: 3.8, h: 0.2, text: 'app.company.com/dashboard', fontSize: 8, color: COLORS.textSecondary, valign: 'middle' },
  );

  // Screenshot placeholder area
  elements.push(
    { type: 'rect', x: frameX + 0.1, y: frameY + 0.5, w: frameWidth - 0.2, h: frameHeight - 0.6, fill: '#E5E7EB', line: { color: '#E5E7EB', width: 0 } },
    // Placeholder text
    { type: 'text', x: frameX + 0.1, y: frameY + frameHeight / 2, w: frameWidth - 0.2, h: 0.4, text: 'Screenshot Placeholder', fontSize: 14, color: COLORS.textSecondary, align: 'center', valign: 'middle' },
  );

  // Caption at bottom - 30% larger fonts
  if (captionPosition === 'bottom') {
    if (title) {
      elements.push(
        { type: 'text', x: 0.5, y: frameY + frameHeight + 0.2, w: 9.0, h: 0.4, text: title, fontSize: 21, bold: true, color: COLORS.textPrimary, align: 'center' },
      );
    }
    if (caption) {
      elements.push(
        { type: 'text', x: 0.5, y: frameY + frameHeight + (title ? 0.6 : 0.2), w: 9.0, h: 0.35, text: caption, fontSize: 12, color: COLORS.textSecondary, align: 'center' },
      );
    }
  }

  return { elements, width: 10, height: 5.625 };
}

// Demo Layout - Split feature list and demo area
const demoLayoutMeta: IRComponentMeta = {
  id: 'demo-layout',
  name: '데모 레이아웃',
  category: 'product-showcase',
  description: '기능 리스트와 데모 영역 분할',
  defaultProps: {
    title: 'How It Works',
    features: [
      'Connect your data sources in minutes',
      'AI automatically detects patterns',
      'Get actionable insights instantly',
      'Share reports with your team',
    ],
    demoTitle: 'Live Preview',
  },
  propSchema: {
    title: { type: 'string', label: '제목', default: 'How It Works' },
    demoTitle: { type: 'string', label: '데모 제목', default: 'Live Preview' },
  },
};

function renderDemoLayout(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Features';
  const features = (props.features as string[]) || [];
  const demoTitle = (props.demoTitle as string) || 'Demo';

  const elements: PPTXElement[] = [];

  const leftWidth = 4.0;
  const rightX = 4.5;

  // Left section - Feature list with 30% larger title
  elements.push(
    { type: 'text', x: 0.5, y: 0.6, w: leftWidth, h: 0.5, text: title, fontSize: 29, bold: true, color: COLORS.textPrimary },
    { type: 'rect', x: 0.5, y: 1.15, w: 1.0, h: 0.1, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
  );

  features.forEach((feature, index) => {
    const y = 1.5 + index * 1.125;

    // Number circle
    elements.push(
      { type: 'ellipse', x: 0.5, y: y + 0.05, w: 0.4, h: 0.4, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
      { type: 'text', x: 0.5, y: y + 0.05, w: 0.4, h: 0.4, text: String(index + 1), fontSize: 14, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
    );

    // Feature text - 30% larger
    elements.push(
      { type: 'text', x: 1.05, y: y, w: leftWidth - 0.55, h: 0.5, text: feature, fontSize: 17, color: COLORS.textPrimary, valign: 'middle' },
    );
  });

  // Right section - Demo area
  elements.push(
    // Demo container with accent border
    { type: 'rect', x: rightX, y: 0.6, w: 5.0, h: 4.4, fill: '#FFFFFF', line: { color: COLORS.accent, width: 2 } },
    // Demo title bar
    { type: 'rect', x: rightX, y: 0.6, w: 5.0, h: 0.5, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    { type: 'text', x: rightX + 0.2, y: 0.65, w: 4.6, h: 0.4, text: demoTitle, fontSize: 14, bold: true, color: '#FFFFFF', valign: 'middle' },
    // Demo placeholder
    { type: 'rect', x: rightX + 0.2, y: 1.3, w: 4.6, h: 3.5, fill: COLORS.surface, line: { color: COLORS.border, width: 1 } },
    { type: 'text', x: rightX + 0.2, y: 2.8, w: 4.6, h: 0.4, text: 'Interactive Demo', fontSize: 14, color: COLORS.textSecondary, align: 'center', valign: 'middle' },
  );

  return { elements, width: 10, height: 5.625 };
}

// App Screens Component - Mobile app mockups
const appScreensMeta: IRComponentMeta = {
  id: 'app-screens',
  name: '앱 화면 모음',
  category: 'product-showcase',
  description: '모바일 앱 화면 목업',
  defaultProps: {
    title: 'Mobile Experience',
    subtitle: 'Available on iOS and Android',
    screens: [
      { caption: 'Dashboard' },
      { caption: 'Analytics' },
      { caption: 'Settings' },
    ],
  },
  propSchema: {
    title: { type: 'string', label: '제목', default: 'Mobile Experience' },
  },
};

function renderAppScreens(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'App Screens';
  const subtitle = (props.subtitle as string) || '';
  const screens = (props.screens as Array<{ caption: string }>) || [];

  const elements: PPTXElement[] = [];

  // Title - 30% larger
  elements.push(
    { type: 'text', x: 0, y: 0.4, w: 10, h: 0.5, text: title, fontSize: 29, bold: true, color: COLORS.textPrimary, align: 'center' },
  );

  // Subtitle
  if (subtitle) {
    elements.push(
      { type: 'text', x: 0, y: 0.95, w: 10, h: 0.35, text: subtitle, fontSize: 12, color: COLORS.textSecondary, align: 'center' },
    );
  }

  const screenCount = Math.min(screens.length, 3);
  const phoneWidth = 2.0;
  const phoneHeight = 3.8;
  const gap = 1.2;
  const totalWidth = screenCount * phoneWidth + (screenCount - 1) * gap;
  const startX = (10 - totalWidth) / 2;
  const startY = 1.5;

  screens.slice(0, 3).forEach((screen, i) => {
    const x = startX + i * (phoneWidth + gap);
    const offsetY = i === 1 ? 0 : 0.25; // Center phone slightly higher

    // Phone frame (rounded rectangle simulation)
    elements.push(
      // Outer frame (dark)
      { type: 'rect', x, y: startY + offsetY, w: phoneWidth, h: phoneHeight, fill: COLORS.textPrimary, line: { color: COLORS.textPrimary, width: 0 } },
      // Screen area
      { type: 'rect', x: x + 0.08, y: startY + offsetY + 0.15, w: phoneWidth - 0.16, h: phoneHeight - 0.3, fill: '#FFFFFF', line: { color: '#FFFFFF', width: 0 } },
      // Status bar
      { type: 'rect', x: x + 0.08, y: startY + offsetY + 0.15, w: phoneWidth - 0.16, h: 0.2, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
      // Notch
      { type: 'rect', x: x + phoneWidth / 2 - 0.35, y: startY + offsetY + 0.15, w: 0.7, h: 0.12, fill: COLORS.textPrimary, line: { color: COLORS.textPrimary, width: 0 } },
      // Screen placeholder
      { type: 'rect', x: x + 0.15, y: startY + offsetY + 0.45, w: phoneWidth - 0.3, h: phoneHeight - 0.75, fill: COLORS.surface, line: { color: COLORS.border, width: 1 } },
      // Home indicator
      { type: 'rect', x: x + phoneWidth / 2 - 0.3, y: startY + offsetY + phoneHeight - 0.18, w: 0.6, h: 0.06, fill: COLORS.border, line: { color: COLORS.border, width: 0 } },
    );

    // Caption below - minimum 12pt
    elements.push(
      { type: 'text', x, y: startY + offsetY + phoneHeight + 0.15, w: phoneWidth, h: 0.35, text: screen.caption, fontSize: 12, bold: true, color: COLORS.textPrimary, align: 'center', valign: 'middle' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Tech Stack Component - Technology layers
const techStackMeta: IRComponentMeta = {
  id: 'tech-stack',
  name: '기술 스택',
  category: 'product-showcase',
  description: '기술 스택 시각화',
  defaultProps: {
    title: 'Technology Stack',
    subtitle: 'Built on modern, scalable infrastructure',
    layers: [
      { name: 'Frontend', technologies: ['React', 'TypeScript', 'Tailwind CSS'] },
      { name: 'Backend', technologies: ['Node.js', 'GraphQL', 'PostgreSQL'] },
      { name: 'Infrastructure', technologies: ['AWS', 'Docker', 'Kubernetes'] },
    ],
  },
  propSchema: {
    title: { type: 'string', label: '제목', default: 'Technology Stack' },
  },
};

function renderTechStack(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Tech Stack';
  const subtitle = (props.subtitle as string) || '';
  const layers = (props.layers as Array<{ name: string; technologies: string[] }>) || [];

  const elements: PPTXElement[] = [];

  // Title - 30% larger
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 9, h: 0.5, text: title, fontSize: 29, bold: true, color: COLORS.textPrimary },
  );

  // Subtitle
  if (subtitle) {
    elements.push(
      { type: 'text', x: 0.5, y: 0.95, w: 9, h: 0.35, text: subtitle, fontSize: 12, color: COLORS.textSecondary },
    );
  }

  const layerHeight = 1.1;
  const layerWidth = 8.0;
  const startX = 1.0;
  const startY = 1.5;
  const gap = 0.375;

  // Color progression
  const colors = [COLORS.accent, COLORS.accentLight, '#8A9B5C'];

  layers.forEach((layer, i) => {
    const y = startY + i * (layerHeight + gap);
    const layerColor = colors[i % colors.length];

    // Layer bar
    elements.push(
      { type: 'rect', x: startX, y, w: layerWidth, h: layerHeight, fill: layerColor, line: { color: layerColor, width: 0 } },
    );

    // Layer name - 30% larger
    elements.push(
      { type: 'text', x: startX + 0.3, y: y + 0.15, w: 2, h: 0.35, text: layer.name, fontSize: 18, bold: true, color: '#FFFFFF', valign: 'middle' },
    );

    // Technologies as pills - minimum 12pt
    const techStartX = startX + 0.3;
    const techY = y + 0.55;
    let currentX = techStartX;

    layer.technologies.forEach((tech) => {
      const pillWidth = tech.length * 0.12 + 0.4;
      elements.push(
        { type: 'rect', x: currentX, y: techY, w: pillWidth, h: 0.35, fill: 'rgba(255,255,255,0.25)', line: { color: 'rgba(255,255,255,0.4)', width: 1 } },
        { type: 'text', x: currentX, y: techY, w: pillWidth, h: 0.35, text: tech, fontSize: 12, color: '#FFFFFF', align: 'center', valign: 'middle' },
      );
      currentX += pillWidth + 0.15;
    });

    // Connector between layers
    if (i < layers.length - 1) {
      const connectorX = startX + layerWidth / 2;
      const connectorY = y + layerHeight;
      elements.push(
        { type: 'text', x: connectorX - 0.15, y: connectorY + gap / 2 - 0.15, w: 0.3, h: 0.3, text: '↕', fontSize: 14, color: COLORS.textSecondary, align: 'center', valign: 'middle' },
      );
    }
  });

  return { elements, width: 10, height: 5.625 };
}

// Integration List Component - Category headers with integration cards
const integrationListMeta: IRComponentMeta = {
  id: 'integration-list',
  name: '통합 목록',
  category: 'product-showcase',
  description: '카테고리별 통합 카드',
  defaultProps: {
    title: 'Integrations',
    subtitle: 'Connect with your favorite tools',
    categories: [
      { name: 'CRM', integrations: ['Salesforce', 'HubSpot', 'Pipedrive'] },
      { name: 'Communication', integrations: ['Slack', 'Teams', 'Discord'] },
      { name: 'Storage', integrations: ['Google Drive', 'Dropbox', 'OneDrive'] },
    ],
  },
  propSchema: {},
};

function renderIntegrationList(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Integrations';
  const subtitle = (props.subtitle as string) || '';
  const categories = (props.categories as Array<{ name: string; integrations: string[] }>) || [];
  const elements: PPTXElement[] = [];

  // Title - 30% larger
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 9, h: 0.5, text: title, fontSize: 29, bold: true, color: COLORS.textPrimary },
    { type: 'rect', x: 0.5, y: 0.95, w: 1.2, h: 0.1, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
  );

  if (subtitle) {
    elements.push(
      { type: 'text', x: 0.5, y: 1.1, w: 9, h: 0.35, text: subtitle, fontSize: 12, color: COLORS.textSecondary },
    );
  }

  const startY = 1.6;
  const categoryHeight = 1.2;
  const cardWidth = 1.8;
  const cardHeight = 0.7;
  const gap = 0.3;

  categories.slice(0, 3).forEach((category, catIdx) => {
    const y = startY + catIdx * (categoryHeight + 0.3);

    // Category header - minimum 12pt
    elements.push(
      { type: 'rect', x: 0.5, y, w: 1.6, h: 0.45, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
      { type: 'text', x: 0.5, y, w: 1.6, h: 0.45, text: category.name, fontSize: 12, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
    );

    // Integration cards
    category.integrations.slice(0, 4).forEach((integration, i) => {
      const x = 2.3 + i * (cardWidth + gap);
      elements.push(
        { type: 'rect', x, y: y - 0.1, w: cardWidth, h: cardHeight, fill: '#FFFFFF', line: { color: COLORS.border, width: 1 } },
        { type: 'rect', x: x + 0.15, y: y + 0.05, w: 0.4, h: 0.4, fill: COLORS.surface, line: { color: COLORS.border, width: 1 } },
        { type: 'text', x: x + 0.65, y: y - 0.1, w: cardWidth - 0.8, h: cardHeight, text: integration, fontSize: 12, color: COLORS.textPrimary, valign: 'middle' },
      );
    });
  });

  return { elements, width: 10, height: 5.625 };
}

// Security Badges Component - Certification badges grid
const securityBadgesMeta: IRComponentMeta = {
  id: 'security-badges',
  name: '보안 인증 배지',
  category: 'product-showcase',
  description: '보안 인증 배지 그리드',
  defaultProps: {
    title: 'Enterprise-Grade Security',
    subtitle: 'Certified and compliant with industry standards',
    badges: [
      { name: 'SOC 2 Type II', description: 'Audited security controls' },
      { name: 'ISO 27001', description: 'Information security' },
      { name: 'GDPR', description: 'Data privacy compliance' },
      { name: 'HIPAA', description: 'Healthcare data protection' },
      { name: '256-bit SSL', description: 'Encrypted data transfer' },
      { name: '99.9% Uptime', description: 'SLA guaranteed' },
    ],
  },
  propSchema: {},
};

function renderSecurityBadges(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Security';
  const subtitle = (props.subtitle as string) || '';
  const badges = (props.badges as Array<{ name: string; description: string }>) || [];
  const elements: PPTXElement[] = [];

  // Title - 30% larger
  elements.push(
    { type: 'text', x: 0, y: 0.4, w: 10, h: 0.5, text: title, fontSize: 29, bold: true, color: COLORS.textPrimary, align: 'center' },
  );

  if (subtitle) {
    elements.push(
      { type: 'text', x: 0, y: 0.95, w: 10, h: 0.35, text: subtitle, fontSize: 12, color: COLORS.textSecondary, align: 'center' },
    );
  }

  const cols = 3;
  const badgeWidth = 2.7;
  const badgeHeight = 1.5;
  const gapX = 0.525;
  const gapY = 0.45;
  const totalWidth = cols * badgeWidth + (cols - 1) * gapX;
  const startX = (10 - totalWidth) / 2;
  const startY = 1.5;

  badges.slice(0, 6).forEach((badge, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = startX + col * (badgeWidth + gapX);
    const y = startY + row * (badgeHeight + gapY);

    // Badge card
    elements.push(
      { type: 'rect', x, y, w: badgeWidth, h: badgeHeight, fill: '#FFFFFF', line: { color: COLORS.accent, width: 2 } },
    );

    // Shield icon placeholder - larger
    elements.push(
      { type: 'ellipse', x: x + badgeWidth / 2 - 0.4, y: y + 0.2, w: 0.8, h: 0.8, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
      { type: 'text', x: x + badgeWidth / 2 - 0.4, y: y + 0.2, w: 0.8, h: 0.8, text: '✓', fontSize: 24, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
    );

    // Badge name - minimum 12pt
    elements.push(
      { type: 'text', x: x + 0.1, y: y + 1.05, w: badgeWidth - 0.2, h: 0.3, text: badge.name, fontSize: 12, bold: true, color: COLORS.textPrimary, align: 'center', valign: 'middle' },
    );

    // Badge description - minimum 12pt
    elements.push(
      { type: 'text', x: x + 0.1, y: y + 1.3, w: badgeWidth - 0.2, h: 0.25, text: badge.description, fontSize: 12, color: COLORS.textSecondary, align: 'center', valign: 'middle' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Platform Comparison Component - Features vs platform matrix with checkmarks
const platformComparisonMeta: IRComponentMeta = {
  id: 'platform-comparison',
  name: '플랫폼 비교',
  category: 'product-showcase',
  description: '플랫폼별 기능 비교 매트릭스',
  defaultProps: {
    title: 'Platform Comparison',
    platforms: ['Web', 'iOS', 'Android', 'Desktop'],
    features: [
      { name: 'Real-time Sync', support: [true, true, true, true] },
      { name: 'Offline Mode', support: [false, true, true, true] },
      { name: 'Push Notifications', support: [true, true, true, false] },
      { name: 'Biometric Auth', support: [false, true, true, false] },
      { name: 'File Upload', support: [true, true, true, true] },
    ],
  },
  propSchema: {},
};

function renderPlatformComparison(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Platform Comparison';
  const platforms = (props.platforms as string[]) || [];
  const features = (props.features as Array<{ name: string; support: boolean[] }>) || [];
  const elements: PPTXElement[] = [];

  // Title - 30% larger
  elements.push(
    { type: 'text', x: 0.5, y: 0.35, w: 9, h: 0.45, text: title, fontSize: 26, bold: true, color: COLORS.textPrimary },
  );

  const startX = 0.6;
  const startY = 1.0;
  const featureColWidth = 2.8;
  const platformColWidth = (9.4 - featureColWidth) / platforms.length;
  const headerHeight = 0.6;
  const rowHeight = 0.7;

  // Platform headers
  platforms.forEach((platform, i) => {
    const x = startX + featureColWidth + i * platformColWidth;
    elements.push(
      { type: 'rect', x, y: startY, w: platformColWidth, h: headerHeight, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
      { type: 'text', x, y: startY, w: platformColWidth, h: headerHeight, text: platform, fontSize: 12, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
    );
  });

  // Feature label header
  elements.push(
    { type: 'rect', x: startX, y: startY, w: featureColWidth, h: headerHeight, fill: COLORS.surface, line: { color: COLORS.border, width: 0 } },
    { type: 'text', x: startX + 0.15, y: startY, w: featureColWidth - 0.3, h: headerHeight, text: 'Feature', fontSize: 12, bold: true, color: COLORS.textPrimary, valign: 'middle' },
  );

  // Feature rows
  features.forEach((feature, rowIdx) => {
    const y = startY + headerHeight + rowIdx * rowHeight;
    const isAlt = rowIdx % 2 === 1;

    // Feature name
    elements.push(
      { type: 'rect', x: startX, y, w: featureColWidth, h: rowHeight, fill: isAlt ? '#FFFFFF' : COLORS.surface, line: { color: COLORS.border, width: 0.5 } },
      { type: 'text', x: startX + 0.15, y, w: featureColWidth - 0.3, h: rowHeight, text: feature.name, fontSize: 11, color: COLORS.textPrimary, valign: 'middle' },
    );

    // Support checkmarks
    feature.support.forEach((supported, colIdx) => {
      const x = startX + featureColWidth + colIdx * platformColWidth;
      elements.push(
        { type: 'rect', x, y, w: platformColWidth, h: rowHeight, fill: isAlt ? '#FFFFFF' : COLORS.surface, line: { color: COLORS.border, width: 0.5 } },
      );

      if (supported) {
        elements.push(
          { type: 'ellipse', x: x + platformColWidth / 2 - 0.18, y: y + rowHeight / 2 - 0.18, w: 0.36, h: 0.36, fill: COLORS.positive, line: { color: COLORS.positive, width: 0 } },
          { type: 'text', x: x + platformColWidth / 2 - 0.18, y: y + rowHeight / 2 - 0.18, w: 0.36, h: 0.36, text: '✓', fontSize: 12, color: '#FFFFFF', align: 'center', valign: 'middle' },
        );
      } else {
        elements.push(
          { type: 'text', x, y, w: platformColWidth, h: rowHeight, text: '−', fontSize: 16, color: COLORS.border, align: 'center', valign: 'middle' },
        );
      }
    });
  });

  return { elements, width: 10, height: 5.625 };
}

// Architecture Diagram Component - System architecture visualization
const architectureDiagramMeta: IRComponentMeta = {
  id: 'architecture-diagram',
  name: '아키텍처 다이어그램',
  category: 'product-showcase',
  description: '시스템 아키텍처 시각화',
  defaultProps: {
    title: 'System Architecture',
    subtitle: 'Scalable, secure, and reliable infrastructure',
    layers: [
      { name: 'Client Layer', components: ['Web App', 'Mobile App', 'API Clients'] },
      { name: 'API Gateway', components: ['Load Balancer', 'Auth Service', 'Rate Limiter'] },
      { name: 'Services', components: ['Core API', 'Analytics', 'Notifications', 'Search'] },
      { name: 'Data Layer', components: ['PostgreSQL', 'Redis', 'S3'] },
    ],
  },
  propSchema: {
    title: { type: 'string', label: '제목', default: 'System Architecture' },
  },
};

function renderArchitectureDiagram(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'System Architecture';
  const subtitle = (props.subtitle as string) || '';
  const layers = (props.layers as Array<{ name: string; components: string[] }>) || [];
  const elements: PPTXElement[] = [];

  // Title - 30% larger
  elements.push(
    { type: 'text', x: 0.5, y: 0.35, w: 9, h: 0.45, text: title, fontSize: 26, bold: true, color: COLORS.textPrimary },
  );

  if (subtitle) {
    elements.push(
      { type: 'text', x: 0.5, y: 0.8, w: 9, h: 0.3, text: subtitle, fontSize: 12, color: COLORS.textSecondary },
    );
  }

  const startY = 1.2;
  const layerHeight = 0.95;
  const gap = 0.225;
  const layerWidth = 9.0;
  const startX = 0.5;

  layers.slice(0, 4).forEach((layer, i) => {
    const y = startY + i * (layerHeight + gap);
    const isEven = i % 2 === 0;
    const bgColor = isEven ? COLORS.accent : COLORS.accentLight;

    // Layer background
    elements.push(
      { type: 'rect', x: startX, y, w: layerWidth, h: layerHeight, fill: bgColor, line: { color: bgColor, width: 0 } },
    );

    // Layer name on left
    elements.push(
      { type: 'text', x: startX + 0.2, y, w: 1.8, h: layerHeight, text: layer.name, fontSize: 11, bold: true, color: '#FFFFFF', valign: 'middle' },
    );

    // Components as boxes
    const compStartX = startX + 2.0;
    const compWidth = (layerWidth - 2.4) / Math.min(layer.components.length, 4);
    const compGap = 0.1;

    layer.components.slice(0, 4).forEach((comp, j) => {
      const cx = compStartX + j * compWidth;
      elements.push(
        { type: 'rect', x: cx + compGap / 2, y: y + 0.2, w: compWidth - compGap, h: layerHeight - 0.4, fill: '#FFFFFF', line: { color: '#FFFFFF', width: 0 } },
        { type: 'text', x: cx + compGap / 2, y: y + 0.2, w: compWidth - compGap, h: layerHeight - 0.4, text: comp, fontSize: 10, color: COLORS.textPrimary, align: 'center', valign: 'middle' },
      );
    });

    // Arrow between layers
    if (i < layers.length - 1) {
      elements.push(
        { type: 'text', x: startX + layerWidth / 2 - 0.15, y: y + layerHeight, w: 0.3, h: gap, text: '↓', fontSize: 12, color: COLORS.textSecondary, align: 'center', valign: 'middle' },
      );
    }
  });

  return { elements, width: 10, height: 5.625 };
}

// API Overview Component - API endpoints visualization
const apiOverviewMeta: IRComponentMeta = {
  id: 'api-overview',
  name: 'API 개요',
  category: 'product-showcase',
  description: 'API 엔드포인트 개요',
  defaultProps: {
    title: 'API Overview',
    subtitle: 'RESTful API with comprehensive documentation',
    baseUrl: 'https://api.company.com/v1',
    endpoints: [
      { method: 'GET', path: '/users', description: 'List all users' },
      { method: 'POST', path: '/users', description: 'Create a new user' },
      { method: 'GET', path: '/analytics', description: 'Get analytics data' },
      { method: 'POST', path: '/webhooks', description: 'Register webhook' },
      { method: 'DELETE', path: '/sessions', description: 'Terminate session' },
    ],
    stats: [
      { label: 'Uptime', value: '99.99%' },
      { label: 'Avg Response', value: '<50ms' },
      { label: 'Rate Limit', value: '10K/min' },
    ],
  },
  propSchema: {
    title: { type: 'string', label: '제목', default: 'API Overview' },
  },
};

function renderApiOverview(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'API Overview';
  const subtitle = (props.subtitle as string) || '';
  const baseUrl = (props.baseUrl as string) || '';
  const endpoints = (props.endpoints as Array<{ method: string; path: string; description: string }>) || [];
  const stats = (props.stats as Array<{ label: string; value: string }>) || [];
  const elements: PPTXElement[] = [];

  // Title - 30% larger
  elements.push(
    { type: 'text', x: 0.5, y: 0.35, w: 6, h: 0.45, text: title, fontSize: 26, bold: true, color: COLORS.textPrimary },
  );

  if (subtitle) {
    elements.push(
      { type: 'text', x: 0.5, y: 0.8, w: 6, h: 0.3, text: subtitle, fontSize: 12, color: COLORS.textSecondary },
    );
  }

  // Base URL
  if (baseUrl) {
    elements.push(
      { type: 'rect', x: 0.5, y: 1.15, w: 4.5, h: 0.35, fill: COLORS.surface, line: { color: COLORS.border, width: 1 } },
      { type: 'text', x: 0.6, y: 1.15, w: 4.3, h: 0.35, text: baseUrl, fontSize: 10, color: COLORS.accent, valign: 'middle', fontFace: 'Courier New' },
    );
  }

  // Stats on right side
  const statsX = 6.8;
  stats.slice(0, 3).forEach((stat, i) => {
    const y = 0.4 + i * 0.55;
    elements.push(
      { type: 'rect', x: statsX, y, w: 2.7, h: 0.5, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
      { type: 'text', x: statsX + 0.15, y, w: 1.4, h: 0.5, text: stat.label, fontSize: 10, color: 'rgba(255,255,255,0.85)', valign: 'middle' },
      { type: 'text', x: statsX + 1.5, y, w: 1.1, h: 0.5, text: stat.value, fontSize: 12, bold: true, color: '#FFFFFF', valign: 'middle', align: 'right' },
    );
  });

  // Endpoints table
  const tableY = 1.65;
  const rowHeight = 0.65;
  const methodColors: Record<string, string> = {
    GET: '#22C55E',
    POST: '#3B82F6',
    PUT: '#F59E0B',
    DELETE: '#EF4444',
    PATCH: '#8B5CF6',
  };

  endpoints.slice(0, 5).forEach((endpoint, i) => {
    const y = tableY + i * rowHeight;
    const isAlt = i % 2 === 1;

    // Row background
    elements.push(
      { type: 'rect', x: 0.5, y, w: 9, h: rowHeight, fill: isAlt ? '#FFFFFF' : COLORS.surface, line: { color: COLORS.border, width: 0.5 } },
    );

    // Method badge
    const methodColor = methodColors[endpoint.method] || COLORS.accent;
    elements.push(
      { type: 'rect', x: 0.65, y: y + 0.15, w: 0.9, h: 0.35, fill: methodColor, line: { color: methodColor, width: 0 } },
      { type: 'text', x: 0.65, y: y + 0.15, w: 0.9, h: 0.35, text: endpoint.method, fontSize: 9, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
    );

    // Path
    elements.push(
      { type: 'text', x: 1.7, y, w: 3.2, h: rowHeight, text: endpoint.path, fontSize: 11, color: COLORS.textPrimary, valign: 'middle', fontFace: 'Courier New' },
    );

    // Description
    elements.push(
      { type: 'text', x: 5.0, y, w: 4.3, h: rowHeight, text: endpoint.description, fontSize: 11, color: COLORS.textSecondary, valign: 'middle' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Feature Comparison Component - Competitive comparison matrix
const featureComparisonMeta: IRComponentMeta = {
  id: 'feature-comparison',
  name: '기능 비교',
  category: 'product-showcase',
  description: '경쟁사 대비 기능 비교',
  defaultProps: {
    title: 'Why Choose Us',
    products: ['Our Product', 'Competitor A', 'Competitor B'],
    features: [
      { name: 'Real-time Analytics', values: ['Advanced', 'Basic', 'None'] },
      { name: 'API Access', values: ['Unlimited', 'Limited', 'Limited'] },
      { name: 'Custom Integrations', values: ['50+', '10', '5'] },
      { name: 'Support SLA', values: ['24/7', 'Business hrs', 'Email only'] },
      { name: 'Starting Price', values: ['$99/mo', '$149/mo', '$199/mo'] },
    ],
  },
  propSchema: {
    title: { type: 'string', label: '제목', default: 'Why Choose Us' },
  },
};

function renderFeatureComparison(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Feature Comparison';
  const products = (props.products as string[]) || [];
  const features = (props.features as Array<{ name: string; values: string[] }>) || [];
  const elements: PPTXElement[] = [];

  // Title - 30% larger
  elements.push(
    { type: 'text', x: 0.5, y: 0.35, w: 9, h: 0.45, text: title, fontSize: 26, bold: true, color: COLORS.textPrimary },
  );

  const startX = 0.5;
  const startY = 1.0;
  const featureColWidth = 3.0;
  const productColWidth = (9 - featureColWidth) / Math.min(products.length, 3);
  const headerHeight = 0.6;
  const rowHeight = 0.7;

  // Product headers
  products.slice(0, 3).forEach((product, i) => {
    const x = startX + featureColWidth + i * productColWidth;
    const isFirst = i === 0;
    elements.push(
      { type: 'rect', x, y: startY, w: productColWidth, h: headerHeight, fill: isFirst ? COLORS.accent : COLORS.surface, line: { color: isFirst ? COLORS.accent : COLORS.border, width: 0 } },
      { type: 'text', x, y: startY, w: productColWidth, h: headerHeight, text: product, fontSize: 12, bold: true, color: isFirst ? '#FFFFFF' : COLORS.textPrimary, align: 'center', valign: 'middle' },
    );
  });

  // Feature header
  elements.push(
    { type: 'rect', x: startX, y: startY, w: featureColWidth, h: headerHeight, fill: COLORS.surface, line: { color: COLORS.border, width: 0 } },
    { type: 'text', x: startX + 0.15, y: startY, w: featureColWidth - 0.3, h: headerHeight, text: 'Features', fontSize: 12, bold: true, color: COLORS.textPrimary, valign: 'middle' },
  );

  // Feature rows
  features.slice(0, 5).forEach((feature, rowIdx) => {
    const y = startY + headerHeight + rowIdx * rowHeight;
    const isAlt = rowIdx % 2 === 1;

    // Feature name
    elements.push(
      { type: 'rect', x: startX, y, w: featureColWidth, h: rowHeight, fill: isAlt ? '#FFFFFF' : COLORS.surface, line: { color: COLORS.border, width: 0.5 } },
      { type: 'text', x: startX + 0.15, y, w: featureColWidth - 0.3, h: rowHeight, text: feature.name, fontSize: 11, color: COLORS.textPrimary, valign: 'middle' },
    );

    // Values
    feature.values.slice(0, 3).forEach((value, colIdx) => {
      const x = startX + featureColWidth + colIdx * productColWidth;
      const isFirst = colIdx === 0;
      elements.push(
        { type: 'rect', x, y, w: productColWidth, h: rowHeight, fill: isAlt ? '#FFFFFF' : COLORS.surface, line: { color: COLORS.border, width: 0.5 } },
        { type: 'text', x, y, w: productColWidth, h: rowHeight, text: value, fontSize: 11, bold: isFirst, color: isFirst ? COLORS.accent : COLORS.textSecondary, align: 'center', valign: 'middle' },
      );
    });
  });

  return { elements, width: 10, height: 5.625 };
}

// Product Roadmap Component - Timeline visualization
const productRoadmapMeta: IRComponentMeta = {
  id: 'product-roadmap',
  name: '제품 로드맵',
  category: 'product-showcase',
  description: '제품 로드맵 타임라인',
  defaultProps: {
    title: 'Product Roadmap',
    subtitle: 'Our vision for the next 12 months',
    phases: [
      { quarter: 'Q1 2024', status: 'completed', title: 'Foundation', items: ['Core API', 'Web Dashboard', 'Basic Analytics'] },
      { quarter: 'Q2 2024', status: 'current', title: 'Scale', items: ['Mobile Apps', 'Enterprise SSO', 'Advanced Reports'] },
      { quarter: 'Q3 2024', status: 'planned', title: 'Expand', items: ['AI Features', 'Marketplace', 'Global CDN'] },
      { quarter: 'Q4 2024', status: 'planned', title: 'Optimize', items: ['ML Predictions', 'White-label', 'ISO Certification'] },
    ],
  },
  propSchema: {
    title: { type: 'string', label: '제목', default: 'Product Roadmap' },
  },
};

function renderProductRoadmap(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Product Roadmap';
  const subtitle = (props.subtitle as string) || '';
  const phases = (props.phases as Array<{ quarter: string; status: string; title: string; items: string[] }>) || [];
  const elements: PPTXElement[] = [];

  // Title - 30% larger
  elements.push(
    { type: 'text', x: 0.5, y: 0.35, w: 9, h: 0.45, text: title, fontSize: 26, bold: true, color: COLORS.textPrimary },
  );

  if (subtitle) {
    elements.push(
      { type: 'text', x: 0.5, y: 0.8, w: 9, h: 0.3, text: subtitle, fontSize: 12, color: COLORS.textSecondary },
    );
  }

  const phaseCount = Math.min(phases.length, 4);
  const phaseWidth = 2.1;
  const gap = 0.3;
  const totalWidth = phaseCount * phaseWidth + (phaseCount - 1) * gap;
  const startX = (10 - totalWidth) / 2;
  const startY = 1.3;

  // Timeline line
  elements.push(
    { type: 'rect', x: startX, y: startY + 0.5, w: totalWidth, h: 0.04, fill: COLORS.border, line: { color: COLORS.border, width: 0 } },
  );

  phases.slice(0, 4).forEach((phase, i) => {
    const x = startX + i * (phaseWidth + gap);
    const isCompleted = phase.status === 'completed';
    const isCurrent = phase.status === 'current';
    const dotColor = isCompleted ? COLORS.positive : isCurrent ? COLORS.accent : COLORS.border;

    // Timeline dot
    elements.push(
      { type: 'ellipse', x: x + phaseWidth / 2 - 0.15, y: startY + 0.37, w: 0.3, h: 0.3, fill: dotColor, line: { color: dotColor, width: 0 } },
    );

    // Quarter label
    elements.push(
      { type: 'text', x, y: startY, w: phaseWidth, h: 0.3, text: phase.quarter, fontSize: 10, bold: true, color: isCurrent ? COLORS.accent : COLORS.textSecondary, align: 'center' },
    );

    // Phase card
    const cardY = startY + 0.85;
    const cardHeight = 2.8;
    const cardColor = isCurrent ? COLORS.accent : '#FFFFFF';
    const textColor = isCurrent ? '#FFFFFF' : COLORS.textPrimary;
    const itemColor = isCurrent ? 'rgba(255,255,255,0.85)' : COLORS.textSecondary;

    elements.push(
      { type: 'rect', x, y: cardY, w: phaseWidth, h: cardHeight, fill: cardColor, line: { color: isCurrent ? COLORS.accent : COLORS.border, width: isCurrent ? 0 : 1 } },
    );

    // Phase title
    elements.push(
      { type: 'text', x: x + 0.15, y: cardY + 0.15, w: phaseWidth - 0.3, h: 0.4, text: phase.title, fontSize: 13, bold: true, color: textColor },
    );

    // Status badge
    const statusText = isCompleted ? 'Done' : isCurrent ? 'In Progress' : 'Planned';
    const statusBg = isCompleted ? COLORS.positive : isCurrent ? 'rgba(255,255,255,0.25)' : COLORS.surface;
    elements.push(
      { type: 'rect', x: x + 0.15, y: cardY + 0.55, w: 1.0, h: 0.28, fill: statusBg, line: { color: statusBg, width: 0 } },
      { type: 'text', x: x + 0.15, y: cardY + 0.55, w: 1.0, h: 0.28, text: statusText, fontSize: 8, color: isCompleted || isCurrent ? '#FFFFFF' : COLORS.textSecondary, align: 'center', valign: 'middle' },
    );

    // Items
    phase.items.slice(0, 4).forEach((item, j) => {
      const itemY = cardY + 1.0 + j * 0.45;
      elements.push(
        { type: 'text', x: x + 0.15, y: itemY, w: 0.2, h: 0.35, text: '•', fontSize: 10, color: itemColor, valign: 'middle' },
        { type: 'text', x: x + 0.35, y: itemY, w: phaseWidth - 0.5, h: 0.35, text: item, fontSize: 10, color: itemColor, valign: 'middle' },
      );
    });
  });

  return { elements, width: 10, height: 5.625 };
}

registry.register(featureGridMeta, renderFeatureGrid);
registry.register(screenshotFrameMeta, renderScreenshotFrame);
registry.register(demoLayoutMeta, renderDemoLayout);
registry.register(appScreensMeta, renderAppScreens);
registry.register(techStackMeta, renderTechStack);
registry.register(integrationListMeta, renderIntegrationList);
registry.register(securityBadgesMeta, renderSecurityBadges);
registry.register(platformComparisonMeta, renderPlatformComparison);
registry.register(architectureDiagramMeta, renderArchitectureDiagram);
registry.register(apiOverviewMeta, renderApiOverview);
registry.register(featureComparisonMeta, renderFeatureComparison);
registry.register(productRoadmapMeta, renderProductRoadmap);

export { featureGridMeta, screenshotFrameMeta, demoLayoutMeta, appScreensMeta, techStackMeta, integrationListMeta, securityBadgesMeta, platformComparisonMeta, architectureDiagramMeta, apiOverviewMeta, featureComparisonMeta, productRoadmapMeta };
