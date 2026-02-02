import type { Category } from '@/types';

export const COLORS = {
  accent: '#6B7B3F',
  accentLight: '#8B9B5F',
  accentDark: '#4A5A2F',
  background: '#FAFAF9',
  surface: '#F8F9FA',
  border: '#E5E7EB',
  cardBorder: '#E8E8E8',
  shadow: 'rgba(0,0,0,0.08)',
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  positive: '#059669',
  negative: '#DC2626',
} as const;

export const DESIGN = {
  // Typography
  fontSizes: {
    hero: 72,      // Cover titles
    h1: 56,        // Section titles
    h2: 36,        // Card titles
    h3: 24,        // Subtitles
    body: 14,      // Body text
    caption: 11,   // Small text
    kpiValue: 64,  // Large numbers
    kpiLabel: 16,  // KPI labels
  },
  // Spacing
  spacing: {
    xs: 0.15,
    sm: 0.3,
    md: 0.5,
    lg: 0.8,
    xl: 1.2,
  },
  // Corners
  radius: {
    sm: 4,
    md: 8,
    lg: 12,
    pill: 20,
  },
  // Shadows (for reference)
  shadow: {
    sm: '0 1px 3px rgba(0,0,0,0.08)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 15px rgba(0,0,0,0.1)',
  },
} as const;

export const CATEGORIES: Category[] = [
  { slug: 'cover-divider', name: '커버/디바이더', description: '제목 슬라이드와 섹션 구분', icon: 'Layout' },
  { slug: 'problem-solution', name: '문제/솔루션', description: '문제 제시와 해결책', icon: 'Lightbulb' },
  { slug: 'flow-process', name: '플로우/프로세스', description: '단계별 과정', icon: 'GitBranch' },
  { slug: 'data-metrics', name: '데이터/지표', description: 'KPI와 수치', icon: 'BarChart3' },
  { slug: 'product-showcase', name: '제품 쇼케이스', description: '제품 기능', icon: 'Smartphone' },
  { slug: 'ecosystem', name: '에코시스템', description: '연결 구조', icon: 'Network' },
  { slug: 'comparison', name: '비교', description: '기능 비교', icon: 'Scale' },
  { slug: 'team', name: '팀', description: '팀 소개', icon: 'Users' },
  { slug: 'timeline', name: '타임라인', description: '로드맵', icon: 'Calendar' },
  { slug: 'partnership', name: '파트너십', description: '협력사', icon: 'Handshake' },
  { slug: 'financials', name: '재무/지표', description: '재무 및 투자 지표', icon: 'DollarSign' },
];
