# IR-Components Library Expansion Specification

## Overview
- **Current State**: 41 components across 10 categories
- **Target**: 123+ components (3x expansion)
- **New Components Needed**: 29 components (detailed below)

## New Components by Category

| Category | New Components |
|----------|----------------|
| cover-divider | agenda-slide, disclaimer-slide, appendix-header |
| problem-solution | market-trend, customer-journey, solution-pillars, value-proposition |
| data-metrics | pie-chart, line-chart, revenue-breakdown, unit-economics, growth-chart |
| flow-process | decision-tree, swim-lane, gantt-simple |
| product-showcase | integration-list, security-badges, platform-comparison |
| ecosystem | market-map, data-flow |
| comparison | quadrant-chart, spectrum-scale |
| team | org-chart, team-stats |
| timeline | funding-history, product-releases |
| partnership | case-study-card, logo-marquee, social-proof-stats |

## Technical Patterns

### Component Structure
```typescript
const componentMeta: IRComponentMeta = {
  id: 'component-id',
  name: '한글명',
  category: 'category-slug',
  description: '설명',
  defaultProps: { ... },
  propSchema: { ... },
};

function renderComponent(props): IRComponentRenderResult {
  const elements: PPTXElement[] = [];
  // Build elements
  return { elements, width: 10, height: 5.625 };
}

registry.register(componentMeta, renderComponent);
```

### Design Tokens
- accent: #6B7B3F
- textPrimary: #1F2937
- textSecondary: #6B7280
- positive: #059669
- negative: #DC2626

## Parallelization Strategy

**Agent 1**: cover-divider (3), problem-solution (4), team (2) = 9 components
**Agent 2**: data-metrics (5), flow-process (3), timeline (2) = 10 components
**Agent 3**: product-showcase (3), ecosystem (2), comparison (2), partnership (3) = 10 components

## File Paths
All components added to existing category index files:
- `/Users/jaden/ir-components/src/components/ir/{category}/index.ts`

---
## Final Results
- **Total Components**: 124 (3x expansion achieved)
- **Categories**: 14 (was 10)
- **Build**: ✅ Passing

| Category | Count |
|----------|-------|
| business-model | 6 |
| comparison | 6 |
| cover-divider | 12 |
| data-metrics | 14 |
| ecosystem | 6 |
| financials | 8 |
| flow-process | 11 |
| partnership | 7 |
| problem-solution | 12 |
| product-showcase | 12 |
| risk-ask | 6 |
| team | 10 |
| timeline | 6 |
| traction | 8 |

**AUTOPILOT_COMPLETE**: 2026-02-02
