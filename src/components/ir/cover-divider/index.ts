import { registry } from '@/lib/registry';
import type { IRComponentMeta, IRComponentRenderResult, PPTXElement } from '@/types';
import { COLORS } from '@/lib/constants';

// Title Slide - Professional cover with accent bar
const titleSlideMeta: IRComponentMeta = {
  id: 'title-slide',
  name: '타이틀 슬라이드',
  category: 'cover-divider',
  description: '프레젠테이션 표지',
  defaultProps: {
    companyName: 'COMPANY',
    subtitle: 'Investor Presentation',
    tagline: 'Building the future of enterprise software',
    date: 'Q4 2024',
    confidential: 'CONFIDENTIAL',
  },
  propSchema: {
    companyName: { type: 'string', label: '회사명', default: 'COMPANY' },
    subtitle: { type: 'string', label: '부제목', default: 'Investor Presentation' },
    tagline: { type: 'string', label: '태그라인', default: 'Building the future of enterprise software' },
  },
};

function renderTitleSlide(props: Record<string, unknown>): IRComponentRenderResult {
  const { companyName, subtitle, tagline, date, confidential } = props as {
    companyName: string; subtitle: string; tagline: string; date?: string; confidential?: string
  };

  const elements: PPTXElement[] = [
    // Left accent bar - bold vertical stripe (doubled thickness)
    { type: 'rect', x: 0, y: 0, w: 0.5, h: 5.625, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },

    // Subtle bottom accent line (background color)
    { type: 'rect', x: 0, y: 5.425, w: 10, h: 0.2, fill: COLORS.background, line: { color: COLORS.background, width: 0 } },

    // Company name - large, bold, dominant (56 → 72)
    { type: 'text', x: 1.2, y: 1.4, w: 8.0, h: 1.4, text: companyName, fontSize: 72, bold: true, color: COLORS.textPrimary },

    // Decorative line under company name (0.06 → 0.1)
    { type: 'rect', x: 1.2, y: 2.85, w: 2.25, h: 0.1, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },

    // Subtitle - accent color
    { type: 'text', x: 1.2, y: 3.2, w: 8.0, h: 0.6, text: subtitle, fontSize: 22, color: COLORS.accent },

    // Tagline - secondary text (14 → 18)
    { type: 'text', x: 1.2, y: 3.9, w: 8.0, h: 0.5, text: tagline, fontSize: 18, color: COLORS.textSecondary },

    // Date at bottom left
    { type: 'text', x: 1.2, y: 5.0, w: 2, h: 0.3, text: date || '', fontSize: 11, color: COLORS.textSecondary },

    // Confidential notice at bottom right
    { type: 'text', x: 6.5, y: 5.0, w: 2.7, h: 0.3, text: confidential || '', fontSize: 9, color: COLORS.textSecondary, align: 'right' },
  ];

  return { elements, width: 10, height: 5.625 };
}

// Section Divider - Bold section break with full-bleed option
const sectionDividerMeta: IRComponentMeta = {
  id: 'section-divider',
  name: '섹션 디바이더',
  category: 'cover-divider',
  description: '섹션 구분 슬라이드',
  defaultProps: {
    sectionNumber: '01',
    sectionTitle: 'The Problem',
    sectionDesc: 'Understanding the market challenge',
    variant: 'filled',
  },
  propSchema: {
    sectionNumber: { type: 'string', label: '섹션 번호', default: '01' },
    sectionTitle: { type: 'string', label: '섹션 제목', default: 'The Problem' },
    sectionDesc: { type: 'string', label: '설명', default: 'Understanding the market challenge' },
    variant: { type: 'select', label: '스타일', default: 'filled', options: [
      { value: 'filled', label: '채움' },
      { value: 'outline', label: '아웃라인' },
    ]},
  },
};

function renderSectionDivider(props: Record<string, unknown>): IRComponentRenderResult {
  const { sectionNumber, sectionTitle, sectionDesc, variant } = props as {
    sectionNumber: string; sectionTitle: string; sectionDesc: string; variant?: string
  };

  const isFilled = variant !== 'outline';
  const bgColor = isFilled ? COLORS.accent : '#FFFFFF';
  const textColor = isFilled ? '#FFFFFF' : COLORS.textPrimary;
  const numberColor = isFilled ? 'rgba(255,255,255,0.3)' : COLORS.surface;

  const elements: PPTXElement[] = [
    // Background
    { type: 'rect', x: 0, y: 0, w: 10, h: 5.625, fill: bgColor, line: { color: bgColor, width: 0 } },

    // Large section number - semi-transparent, decorative
    { type: 'text', x: 0.9, y: 0.3, w: 3, h: 2.5, text: sectionNumber, fontSize: 140, bold: true, color: numberColor },

    // Section title - prominent (44 → 56, increased spacing)
    { type: 'text', x: 1.2, y: 2.6, w: 8.0, h: 1.1, text: sectionTitle, fontSize: 56, bold: true, color: textColor },

    // Description - supporting text (14 → 18, increased spacing)
    { type: 'text', x: 1.2, y: 3.9, w: 8.0, h: 0.6, text: sectionDesc, fontSize: 18, color: isFilled ? 'rgba(255,255,255,0.85)' : COLORS.textSecondary },

    // Bottom decorative line (for outline variant) - thicker
    ...(isFilled ? [] : [
      { type: 'rect', x: 1.2, y: 4.7, w: 3.0, h: 0.1, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } } as PPTXElement,
    ]),
  ];

  return { elements, width: 10, height: 5.625 };
}

// Chapter Title Component - Refined chapter header
const chapterTitleMeta: IRComponentMeta = {
  id: 'chapter-title',
  name: '챕터 타이틀',
  category: 'cover-divider',
  description: '챕터 번호와 장식선이 있는 제목',
  defaultProps: {
    chapterNumber: '01',
    chapterTitle: 'Executive Summary',
    subtitle: 'Key highlights and recommendations',
  },
  propSchema: {
    chapterNumber: { type: 'string', label: '챕터 번호', default: '01' },
    chapterTitle: { type: 'string', label: '챕터 제목', default: 'Executive Summary' },
  },
};

function renderChapterTitle(props: Record<string, unknown>): IRComponentRenderResult {
  const { chapterNumber, chapterTitle, subtitle } = props as {
    chapterNumber: string; chapterTitle: string; subtitle?: string
  };

  const elements: PPTXElement[] = [
    // Accent bar left (doubled thickness)
    { type: 'rect', x: 0, y: 0, w: 0.5, h: 5.625, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },

    // Chapter number with label
    { type: 'text', x: 1.2, y: 1.2, w: 2, h: 0.4, text: 'CHAPTER', fontSize: 10, bold: true, color: COLORS.textSecondary },
    { type: 'text', x: 1.2, y: 1.6, w: 2, h: 1.0, text: chapterNumber, fontSize: 48, bold: true, color: COLORS.accent },

    // Decorative line (0.04 → 0.1, width increased)
    { type: 'rect', x: 1.2, y: 2.75, w: 1.8, h: 0.1, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },

    // Chapter title (32 → 42, increased spacing)
    { type: 'text', x: 1.2, y: 3.05, w: 8.0, h: 0.9, text: chapterTitle, fontSize: 42, bold: true, color: COLORS.textPrimary },

    // Subtitle (14 → 18)
    { type: 'text', x: 1.2, y: 4.05, w: 8.0, h: 0.5, text: subtitle || '', fontSize: 18, color: COLORS.textSecondary },
  ];

  return { elements, width: 10, height: 5.625 };
}

// Thank You Component - Professional closing slide
const thankYouMeta: IRComponentMeta = {
  id: 'thank-you',
  name: '감사 슬라이드',
  category: 'cover-divider',
  description: '감사 인사 / Q&A 슬라이드',
  defaultProps: {
    mainText: 'Thank You',
    subText: 'Questions?',
    contactInfo: 'contact@company.com',
  },
  propSchema: {
    mainText: { type: 'string', label: '메인 텍스트', default: 'Thank You' },
    subText: { type: 'string', label: '서브 텍스트', default: 'Questions?' },
  },
};

function renderThankYou(props: Record<string, unknown>): IRComponentRenderResult {
  const { mainText, subText, contactInfo } = props as {
    mainText: string; subText: string; contactInfo?: string
  };

  const elements: PPTXElement[] = [
    // Accent bar at bottom (doubled thickness)
    { type: 'rect', x: 0, y: 5.125, w: 10, h: 0.5, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },

    // Main text - large, centered (60 → 78)
    { type: 'text', x: 0, y: 1.3, w: 10, h: 1.5, text: mainText, fontSize: 78, bold: true, color: COLORS.textPrimary, align: 'center', valign: 'middle' },

    // Decorative line (0.05 → 0.1, width increased 50%)
    { type: 'rect', x: 3.9, y: 3.0, w: 2.2, h: 0.1, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },

    // Sub text (increased spacing)
    { type: 'text', x: 0, y: 3.3, w: 10, h: 0.6, text: subText, fontSize: 22, color: COLORS.textSecondary, align: 'center', valign: 'middle' },

    // Contact info (14 → 18)
    { type: 'text', x: 0, y: 4.3, w: 10, h: 0.5, text: contactInfo || '', fontSize: 18, color: COLORS.accent, align: 'center', valign: 'middle' },
  ];

  return { elements, width: 10, height: 5.625 };
}

// Contact Slide Component - Professional contact page
const contactSlideMeta: IRComponentMeta = {
  id: 'contact-slide',
  name: '연락처 슬라이드',
  category: 'cover-divider',
  description: '연락처 정보 슬라이드',
  defaultProps: {
    companyName: 'Company Name',
    email: 'contact@company.com',
    website: 'www.company.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business Avenue, San Francisco, CA 94102',
  },
  propSchema: {
    companyName: { type: 'string', label: '회사명', default: 'Company Name' },
    email: { type: 'string', label: '이메일', default: 'contact@company.com' },
    website: { type: 'string', label: '웹사이트', default: 'www.company.com' },
    address: { type: 'string', label: '주소', default: '123 Business Avenue, San Francisco, CA 94102' },
  },
};

function renderContactSlide(props: Record<string, unknown>): IRComponentRenderResult {
  const { companyName, email, website, phone, address } = props as {
    companyName: string; email: string; website: string; phone?: string; address: string;
  };

  const elements: PPTXElement[] = [
    // Left accent bar (doubled thickness)
    { type: 'rect', x: 0, y: 0, w: 0.5, h: 5.625, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },

    // Company name (32 → 42, increased spacing)
    { type: 'text', x: 1.2, y: 0.9, w: 8.0, h: 0.9, text: companyName, fontSize: 42, bold: true, color: COLORS.textPrimary },

    // Decorative line (0.05 → 0.1, width increased 50%)
    { type: 'rect', x: 1.2, y: 1.95, w: 2.7, h: 0.1, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },

    // Contact section title (increased spacing)
    { type: 'text', x: 1.2, y: 2.4, w: 2, h: 0.4, text: 'CONTACT', fontSize: 11, bold: true, color: COLORS.textSecondary },

    // Contact details with icons (14 → 18, increased spacing)
    // Email
    { type: 'text', x: 1.2, y: 2.95, w: 0.5, h: 0.45, text: '@', fontSize: 18, color: COLORS.accent, valign: 'middle' },
    { type: 'text', x: 1.85, y: 2.95, w: 6.5, h: 0.45, text: email, fontSize: 18, color: COLORS.textPrimary, valign: 'middle' },

    // Website
    { type: 'text', x: 1.2, y: 3.5, w: 0.5, h: 0.45, text: '⌂', fontSize: 18, color: COLORS.accent, valign: 'middle' },
    { type: 'text', x: 1.85, y: 3.5, w: 6.5, h: 0.45, text: website, fontSize: 18, color: COLORS.textPrimary, valign: 'middle' },

    // Phone
    { type: 'text', x: 1.2, y: 4.05, w: 0.5, h: 0.45, text: '☎', fontSize: 18, color: COLORS.accent, valign: 'middle' },
    { type: 'text', x: 1.85, y: 4.05, w: 6.5, h: 0.45, text: phone || '', fontSize: 18, color: COLORS.textPrimary, valign: 'middle' },

    // Address
    { type: 'text', x: 1.2, y: 4.6, w: 0.5, h: 0.45, text: '◎', fontSize: 18, color: COLORS.accent, valign: 'middle' },
    { type: 'text', x: 1.85, y: 4.6, w: 7.0, h: 0.7, text: address, fontSize: 18, color: COLORS.textPrimary, valign: 'top' },
  ];

  return { elements, width: 10, height: 5.625 };
}

// Agenda Slide Component - Numbered agenda items with vertical layout
const agendaSlideMeta: IRComponentMeta = {
  id: 'agenda-slide',
  name: '어젠다 슬라이드',
  category: 'cover-divider',
  description: '번호가 있는 어젠다 목록',
  defaultProps: {
    title: 'Agenda',
    items: [
      'Company Overview',
      'Market Opportunity',
      'Product & Technology',
      'Business Model',
      'Financials',
      'Team & Ask',
    ],
  },
  propSchema: {
    title: { type: 'string', label: '제목', default: 'Agenda' },
  },
};

function renderAgendaSlide(props: Record<string, unknown>): IRComponentRenderResult {
  const { title, items } = props as { title: string; items: string[] };

  const elements: PPTXElement[] = [
    // Left accent bar (doubled thickness)
    { type: 'rect', x: 0, y: 0, w: 0.5, h: 5.625, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },

    // Title (28 → 36, increased spacing)
    { type: 'text', x: 1.05, y: 0.6, w: 8.2, h: 0.75, text: title, fontSize: 36, bold: true, color: COLORS.textPrimary },

    // Decorative line under title (0.05 → 0.1, width increased 50%)
    { type: 'rect', x: 1.05, y: 1.4, w: 2.25, h: 0.1, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
  ];

  // Agenda items (increased spacing)
  const startY = 1.7;
  const itemHeight = 0.75;

  (items || []).slice(0, 6).forEach((item, i) => {
    const y = startY + i * itemHeight;
    const num = String(i + 1).padStart(2, '0');

    // Number circle (increased size)
    elements.push(
      { type: 'ellipse', x: 1.05, y: y + 0.08, w: 0.55, h: 0.55, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
      { type: 'text', x: 1.05, y: y + 0.08, w: 0.55, h: 0.55, text: num, fontSize: 14, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
    );

    // Item text (16 → 20)
    elements.push(
      { type: 'text', x: 1.85, y: y + 0.08, w: 7.5, h: 0.55, text: item, fontSize: 20, color: COLORS.textPrimary, valign: 'middle' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Disclaimer Slide Component - Legal text block with paragraphs
const disclaimerSlideMeta: IRComponentMeta = {
  id: 'disclaimer-slide',
  name: '법적 고지 슬라이드',
  category: 'cover-divider',
  description: '법적 고지 및 면책 조항',
  defaultProps: {
    title: 'Important Disclaimer',
    paragraphs: [
      'This presentation contains forward-looking statements within the meaning of Section 27A of the Securities Act of 1933 and Section 21E of the Securities Exchange Act of 1934.',
      'These statements involve known and unknown risks, uncertainties, and other factors that may cause actual results to differ materially from those expressed or implied.',
      'Past performance is not indicative of future results. The information provided is for informational purposes only and should not be construed as investment advice.',
    ],
  },
  propSchema: {
    title: { type: 'string', label: '제목', default: 'Important Disclaimer' },
  },
};

function renderDisclaimerSlide(props: Record<string, unknown>): IRComponentRenderResult {
  const { title, paragraphs } = props as { title: string; paragraphs: string[] };

  const elements: PPTXElement[] = [
    // Top accent line (increased thickness)
    { type: 'rect', x: 0, y: 0, w: 10, h: 0.12, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },

    // Title (20 → 26, increased spacing)
    { type: 'text', x: 0.9, y: 0.6, w: 8.4, h: 0.6, text: title, fontSize: 26, bold: true, color: COLORS.textPrimary },

    // Decorative line under title (0.04 → 0.1, width increased 50%)
    { type: 'rect', x: 0.9, y: 1.3, w: 1.8, h: 0.1, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
  ];

  // Paragraphs (increased spacing)
  const startY = 1.6;
  const paragraphHeight = 1.15;

  (paragraphs || []).slice(0, 4).forEach((paragraph, i) => {
    const y = startY + i * paragraphHeight;

    elements.push(
      { type: 'text', x: 0.9, y, w: 8.4, h: paragraphHeight - 0.1, text: paragraph, fontSize: 11, color: COLORS.textSecondary, valign: 'top' },
    );
  });

  // Bottom confidential notice
  elements.push(
    { type: 'rect', x: 0, y: 5.425, w: 10, h: 0.2, fill: COLORS.background, line: { color: COLORS.background, width: 0 } },
    { type: 'text', x: 0.9, y: 5.1, w: 8.4, h: 0.3, text: 'CONFIDENTIAL - FOR AUTHORIZED RECIPIENTS ONLY', fontSize: 9, bold: true, color: COLORS.textSecondary, align: 'center' },
  );

  return { elements, width: 10, height: 5.625 };
}

// Appendix Header Component - Section divider for appendix sections
const appendixHeaderMeta: IRComponentMeta = {
  id: 'appendix-header',
  name: '부록 헤더',
  category: 'cover-divider',
  description: '부록 섹션 구분 슬라이드',
  defaultProps: {
    sectionLabel: 'APPENDIX',
    sectionNumber: 'A',
    sectionTitle: 'Supplementary Materials',
    subtitle: 'Additional data and supporting information',
  },
  propSchema: {
    sectionLabel: { type: 'string', label: '섹션 라벨', default: 'APPENDIX' },
    sectionNumber: { type: 'string', label: '섹션 번호', default: 'A' },
    sectionTitle: { type: 'string', label: '섹션 제목', default: 'Supplementary Materials' },
  },
};

function renderAppendixHeader(props: Record<string, unknown>): IRComponentRenderResult {
  const { sectionLabel, sectionNumber, sectionTitle, subtitle } = props as {
    sectionLabel: string; sectionNumber: string; sectionTitle: string; subtitle?: string
  };

  const elements: PPTXElement[] = [
    // Background surface
    { type: 'rect', x: 0, y: 0, w: 10, h: 5.625, fill: COLORS.background, line: { color: COLORS.background, width: 0 } },

    // Left accent bar (doubled thickness)
    { type: 'rect', x: 0, y: 0, w: 0.5, h: 5.625, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },

    // Section label (increased spacing)
    { type: 'text', x: 1.2, y: 1.0, w: 3, h: 0.4, text: sectionLabel, fontSize: 12, bold: true, color: COLORS.textSecondary },

    // Large section number (72 → 94, increased spacing)
    { type: 'text', x: 1.2, y: 1.4, w: 2.5, h: 1.5, text: sectionNumber, fontSize: 94, bold: true, color: COLORS.accent },

    // Horizontal divider (0.03 → 0.1)
    { type: 'rect', x: 1.2, y: 3.05, w: 8.0, h: 0.1, fill: COLORS.border, line: { color: COLORS.border, width: 0 } },

    // Section title (32 → 42, increased spacing)
    { type: 'text', x: 1.2, y: 3.35, w: 8.0, h: 0.9, text: sectionTitle, fontSize: 42, bold: true, color: COLORS.textPrimary },

    // Subtitle (14 → 18)
    { type: 'text', x: 1.2, y: 4.3, w: 8.0, h: 0.5, text: subtitle || '', fontSize: 18, color: COLORS.textSecondary },
  ];

  return { elements, width: 10, height: 5.625 };
}

// Quote Slide Component - Large quote with attribution
const quoteSlideMeta: IRComponentMeta = {
  id: 'quote-slide',
  name: '인용구 슬라이드',
  category: 'cover-divider',
  description: '인용문과 출처가 있는 슬라이드',
  defaultProps: {
    quote: 'The best way to predict the future is to create it.',
    attribution: 'Peter Drucker',
    role: 'Management Consultant',
    context: '',
  },
  propSchema: {
    quote: { type: 'string', label: '인용문', default: 'The best way to predict the future is to create it.' },
    attribution: { type: 'string', label: '출처', default: 'Peter Drucker' },
    role: { type: 'string', label: '역할/직함', default: 'Management Consultant' },
  },
};

function renderQuoteSlide(props: Record<string, unknown>): IRComponentRenderResult {
  const { quote, attribution, role, context } = props as {
    quote: string; attribution: string; role?: string; context?: string
  };

  const elements: PPTXElement[] = [
    // Left accent bar (doubled thickness)
    { type: 'rect', x: 0, y: 0, w: 0.5, h: 5.625, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },

    // Large opening quote mark (increased spacing)
    { type: 'text', x: 0.9, y: 0.7, w: 1.8, h: 1.4, text: '"', fontSize: 120, color: COLORS.accentLight, valign: 'top' },

    // Quote text (28 → 36, increased spacing)
    { type: 'text', x: 1.5, y: 1.5, w: 7.8, h: 2.4, text: quote, fontSize: 36, color: COLORS.textPrimary, valign: 'middle' },

    // Decorative line before attribution (0.04 → 0.1, width increased 50%)
    { type: 'rect', x: 1.5, y: 4.1, w: 2.25, h: 0.1, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },

    // Attribution name (16 → 20)
    { type: 'text', x: 1.5, y: 4.35, w: 7.8, h: 0.5, text: `— ${attribution}`, fontSize: 20, bold: true, color: COLORS.textPrimary },

    // Role/title (increased spacing)
    { type: 'text', x: 1.5, y: 4.85, w: 7.8, h: 0.4, text: role || '', fontSize: 12, color: COLORS.textSecondary },

    // Context (if provided)
    { type: 'text', x: 1.5, y: 5.25, w: 7.8, h: 0.35, text: context || '', fontSize: 11, color: COLORS.textSecondary },
  ];

  return { elements, width: 10, height: 5.625 };
}

// Key Takeaway Component - Single key message highlight
const keyTakeawayMeta: IRComponentMeta = {
  id: 'key-takeaway',
  name: '핵심 요약',
  category: 'cover-divider',
  description: '핵심 메시지 강조 슬라이드',
  defaultProps: {
    label: 'KEY TAKEAWAY',
    message: 'Our platform reduces operational costs by 60% while improving accuracy by 10x.',
    supportingText: 'Based on data from 500+ enterprise deployments',
  },
  propSchema: {
    label: { type: 'string', label: '라벨', default: 'KEY TAKEAWAY' },
    message: { type: 'string', label: '핵심 메시지', default: 'Our platform reduces operational costs by 60% while improving accuracy by 10x.' },
    supportingText: { type: 'string', label: '부가 설명', default: 'Based on data from 500+ enterprise deployments' },
  },
};

function renderKeyTakeaway(props: Record<string, unknown>): IRComponentRenderResult {
  const { label, message, supportingText } = props as {
    label: string; message: string; supportingText?: string
  };

  const elements: PPTXElement[] = [
    // Background accent band (increased height)
    { type: 'rect', x: 0, y: 1.4, w: 10, h: 3.0, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },

    // Label above the band (increased spacing)
    { type: 'text', x: 1.2, y: 0.75, w: 8.0, h: 0.45, text: label, fontSize: 12, bold: true, color: COLORS.textSecondary },

    // Decorative line (0.04 → 0.1, width increased 50%)
    { type: 'rect', x: 1.2, y: 1.22, w: 1.2, h: 0.1, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },

    // Main message - centered in the band (28 → 36)
    { type: 'text', x: 1.2, y: 1.7, w: 8.0, h: 2.5, text: message, fontSize: 36, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },

    // Supporting text below the band (increased spacing)
    { type: 'text', x: 1.2, y: 4.6, w: 8.0, h: 0.6, text: supportingText || '', fontSize: 12, color: COLORS.textSecondary, align: 'center' },
  ];

  return { elements, width: 10, height: 5.625 };
}

// Milestone Marker Component - Achievement celebration slide
const milestoneMarkerMeta: IRComponentMeta = {
  id: 'milestone-marker',
  name: '마일스톤 마커',
  category: 'cover-divider',
  description: '성과 및 마일스톤 강조 슬라이드',
  defaultProps: {
    milestone: '$100M ARR',
    title: 'Milestone Achieved',
    description: 'Reached $100M in Annual Recurring Revenue',
    date: 'Q4 2024',
    celebration: 'Thank you to our customers and team!',
  },
  propSchema: {
    milestone: { type: 'string', label: '마일스톤', default: '$100M ARR' },
    title: { type: 'string', label: '제목', default: 'Milestone Achieved' },
    description: { type: 'string', label: '설명', default: 'Reached $100M in Annual Recurring Revenue' },
    date: { type: 'string', label: '날짜', default: 'Q4 2024' },
  },
};

function renderMilestoneMarker(props: Record<string, unknown>): IRComponentRenderResult {
  const { milestone, title, description, date, celebration } = props as {
    milestone: string; title: string; description: string; date?: string; celebration?: string
  };

  const elements: PPTXElement[] = [
    // Background surface
    { type: 'rect', x: 0, y: 0, w: 10, h: 5.625, fill: COLORS.background, line: { color: COLORS.background, width: 0 } },

    // Left accent bar (doubled thickness)
    { type: 'rect', x: 0, y: 0, w: 0.5, h: 5.625, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },

    // Title label (increased spacing)
    { type: 'text', x: 1.2, y: 0.9, w: 8.0, h: 0.45, text: title, fontSize: 14, bold: true, color: COLORS.textSecondary },

    // Large milestone value - central focus (72 → 94, increased spacing)
    { type: 'text', x: 1.2, y: 1.4, w: 8.0, h: 1.7, text: milestone, fontSize: 94, bold: true, color: COLORS.accent },

    // Decorative line (0.06 → 0.1, width increased 50%)
    { type: 'rect', x: 1.2, y: 3.25, w: 3.0, h: 0.1, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },

    // Description (20 → 26, increased spacing)
    { type: 'text', x: 1.2, y: 3.55, w: 8.0, h: 0.7, text: description, fontSize: 26, color: COLORS.textPrimary },

    // Date badge (increased size)
    { type: 'rect', x: 1.2, y: 4.4, w: 1.4, h: 0.5, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    { type: 'text', x: 1.2, y: 4.4, w: 1.4, h: 0.5, text: date || '', fontSize: 12, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },

    // Celebration message (14 → 18)
    { type: 'text', x: 1.2, y: 5.0, w: 8.0, h: 0.45, text: celebration || '', fontSize: 18, color: COLORS.textSecondary },
  ];

  return { elements, width: 10, height: 5.625 };
}

// Chapter Intro Component - Section introduction with context
const chapterIntroMeta: IRComponentMeta = {
  id: 'chapter-intro',
  name: '챕터 인트로',
  category: 'cover-divider',
  description: '섹션 소개 및 컨텍스트 슬라이드',
  defaultProps: {
    chapterNumber: '02',
    chapterTitle: 'Market Opportunity',
    overview: 'Understanding the landscape',
    keyPoints: [
      'Total addressable market exceeds $50B',
      'Growing at 25% CAGR',
      'Underserved enterprise segment',
      'First-mover advantage available',
    ],
    transitionText: 'In this section, we will explore...',
  },
  propSchema: {
    chapterNumber: { type: 'string', label: '챕터 번호', default: '02' },
    chapterTitle: { type: 'string', label: '챕터 제목', default: 'Market Opportunity' },
    overview: { type: 'string', label: '개요', default: 'Understanding the landscape' },
  },
};

function renderChapterIntro(props: Record<string, unknown>): IRComponentRenderResult {
  const { chapterNumber, chapterTitle, overview, keyPoints, transitionText } = props as {
    chapterNumber: string; chapterTitle: string; overview?: string; keyPoints?: string[]; transitionText?: string
  };

  const elements: PPTXElement[] = [
    // Left panel - accent background (increased width)
    { type: 'rect', x: 0, y: 0, w: 3.8, h: 5.625, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },

    // Chapter number in left panel (increased spacing)
    { type: 'text', x: 0.6, y: 0.7, w: 2.8, h: 0.4, text: 'CHAPTER', fontSize: 11, bold: true, color: 'rgba(255,255,255,0.7)' },
    { type: 'text', x: 0.6, y: 1.05, w: 2.8, h: 1.4, text: chapterNumber, fontSize: 94, bold: true, color: '#FFFFFF' },

    // Chapter title in left panel (22 → 28, increased spacing)
    { type: 'text', x: 0.6, y: 2.65, w: 2.8, h: 1.0, text: chapterTitle, fontSize: 28, bold: true, color: '#FFFFFF' },

    // Overview in left panel (increased spacing)
    { type: 'text', x: 0.6, y: 3.75, w: 2.8, h: 0.6, text: overview || '', fontSize: 12, color: 'rgba(255,255,255,0.85)' },

    // Right panel - content area
    // Section label (increased spacing)
    { type: 'text', x: 4.4, y: 0.7, w: 5.2, h: 0.4, text: 'WHAT TO EXPECT', fontSize: 10, bold: true, color: COLORS.textSecondary },

    // Decorative line (0.04 → 0.1, width increased 50%)
    { type: 'rect', x: 4.4, y: 1.15, w: 1.8, h: 0.1, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
  ];

  // Key points (increased spacing)
  const pointStartY = 1.45;
  const pointHeight = 0.75;

  (keyPoints || []).slice(0, 5).forEach((point, i) => {
    const y = pointStartY + i * pointHeight;
    elements.push(
      // Bullet point (increased size)
      { type: 'ellipse', x: 4.4, y: y + 0.12, w: 0.28, h: 0.28, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
      // Point text (13 → 16)
      { type: 'text', x: 4.9, y: y, w: 4.8, h: 0.6, text: point, fontSize: 16, color: COLORS.textPrimary, valign: 'middle' },
    );
  });

  // Transition text at bottom
  if (transitionText) {
    elements.push(
      { type: 'rect', x: 4.4, y: 5.0, w: 5.2, h: 0.1, fill: COLORS.border, line: { color: COLORS.border, width: 0 } },
      { type: 'text', x: 4.4, y: 5.2, w: 5.2, h: 0.4, text: transitionText, fontSize: 11, color: COLORS.textSecondary },
    );
  }

  return { elements, width: 10, height: 5.625 };
}

registry.register(titleSlideMeta, renderTitleSlide);
registry.register(sectionDividerMeta, renderSectionDivider);
registry.register(chapterTitleMeta, renderChapterTitle);
registry.register(thankYouMeta, renderThankYou);
registry.register(contactSlideMeta, renderContactSlide);
registry.register(agendaSlideMeta, renderAgendaSlide);
registry.register(disclaimerSlideMeta, renderDisclaimerSlide);
registry.register(appendixHeaderMeta, renderAppendixHeader);
registry.register(quoteSlideMeta, renderQuoteSlide);
registry.register(keyTakeawayMeta, renderKeyTakeaway);
registry.register(milestoneMarkerMeta, renderMilestoneMarker);
registry.register(chapterIntroMeta, renderChapterIntro);

export { titleSlideMeta, sectionDividerMeta, chapterTitleMeta, thankYouMeta, contactSlideMeta, agendaSlideMeta, disclaimerSlideMeta, appendixHeaderMeta, quoteSlideMeta, keyTakeawayMeta, milestoneMarkerMeta, chapterIntroMeta };
