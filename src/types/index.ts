export type CategorySlug =
  | 'cover-divider'
  | 'problem-solution'
  | 'flow-process'
  | 'data-metrics'
  | 'product-showcase'
  | 'ecosystem'
  | 'comparison'
  | 'team'
  | 'timeline'
  | 'partnership'
  | 'financials'
  | 'business-model'
  | 'traction'
  | 'risk-ask';

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  icon: string;
}

export interface IRComponentMeta {
  id: string;
  name: string;
  category: CategorySlug;
  description: string;
  defaultProps: Record<string, unknown>;
  propSchema: PropSchema;
}

export interface PropSchema {
  [key: string]: PropDefinition;
}

export interface PropDefinition {
  type: 'string' | 'number' | 'color' | 'select';
  label: string;
  default: unknown;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
}

export interface PPTXElement {
  type: 'text' | 'rect' | 'ellipse' | 'line';
  x: number;
  y: number;
  w: number;
  h: number;
  text?: string;
  fill?: string;
  line?: { color: string; width: number };
  fontSize?: number;
  fontFace?: string;
  color?: string;
  bold?: boolean;
  align?: 'left' | 'center' | 'right';
  valign?: 'top' | 'middle' | 'bottom';
}

export interface IRComponentRenderResult {
  elements: PPTXElement[];
  width: number;
  height: number;
}
