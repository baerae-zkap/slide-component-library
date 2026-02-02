import { registry } from '@/lib/registry';
import type { IRComponentMeta, IRComponentRenderResult, PPTXElement } from '@/types';
import { COLORS } from '@/lib/constants';

// Horizontal Flow Component - Professional process flow
const horizontalFlowMeta: IRComponentMeta = {
  id: 'horizontal-flow',
  name: '수평 플로우',
  category: 'flow-process',
  description: '3-5단계의 수평 프로세스 흐름',
  defaultProps: {
    title: 'Our Process',
    steps: [
      { number: '01', title: 'Discovery', description: 'Understand your needs' },
      { number: '02', title: 'Design', description: 'Create the solution' },
      { number: '03', title: 'Develop', description: 'Build and test' },
      { number: '04', title: 'Deploy', description: 'Launch and support' },
    ],
  },
  propSchema: {},
};

function renderHorizontalFlow(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Process';
  const steps = (props.steps as Array<{number?: string; label?: string; title: string; description: string}>) || [];
  const elements: PPTXElement[] = [];

  // Title (30% larger: 24 → 31)
  elements.push(
    { type: 'text', x: 0.5, y: 0.5, w: 9, h: 0.6, text: title, fontSize: 31, bold: true, color: COLORS.textPrimary },
    { type: 'rect', x: 0.5, y: 1.1, w: 1.2, h: 0.05, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
  );

  const stepCount = Math.min(steps.length, 5);
  const totalWidth = 8.6;
  const stepWidth = 1.8;
  const connectorWidth = (totalWidth - stepCount * stepWidth) / (stepCount - 1) * 1.5; // 50% more spacing
  const startX = 0.7;
  const stepY = 2.0;

  steps.slice(0, 5).forEach((step, i) => {
    const x = startX + i * (stepWidth + connectorWidth);
    const stepNum = step.number || step.label || String(i + 1).padStart(2, '0');

    // Step card (0.4 inch padding = increase height)
    elements.push(
      { type: 'rect', x, y: stepY, w: stepWidth, h: 3.0, fill: '#FFFFFF', line: { color: COLORS.border, width: 1 } },
      // Top accent
      { type: 'rect', x, y: stepY, w: stepWidth, h: 0.06, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    );

    // Step number circle (30% larger icon: 0.8 → 1.04)
    elements.push(
      { type: 'ellipse', x: x + stepWidth / 2 - 0.52, y: stepY + 0.35, w: 1.04, h: 1.04, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
      { type: 'text', x: x + stepWidth / 2 - 0.52, y: stepY + 0.35, w: 1.04, h: 1.04, text: stepNum, fontSize: 21, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
    );

    // Title (14pt meets minimum, keep important at 14pt)
    elements.push(
      { type: 'text', x: x + 0.15, y: stepY + 1.55, w: stepWidth - 0.3, h: 0.45, text: step.title, fontSize: 14, bold: true, color: COLORS.textPrimary, align: 'center', valign: 'middle' },
    );

    // Description (minimum 12pt)
    elements.push(
      { type: 'text', x: x + 0.15, y: stepY + 2.1, w: stepWidth - 0.3, h: 0.6, text: step.description, fontSize: 12, color: COLORS.textSecondary, align: 'center', valign: 'top' },
    );

    // Connector arrow (except after last step)
    if (i < stepCount - 1) {
      const arrowX = x + stepWidth;
      const arrowY = stepY + 0.75;

      // Line (thicker: 2pt → 3pt)
      elements.push(
        { type: 'line', x: arrowX + 0.1, y: arrowY, w: connectorWidth - 0.3, h: 0, line: { color: COLORS.accent, width: 3 } },
      );
      // Arrow head (30% larger: 12 → 16)
      elements.push(
        { type: 'text', x: arrowX + connectorWidth - 0.35, y: arrowY - 0.15, w: 0.3, h: 0.3, text: '▶', fontSize: 16, color: COLORS.accent, align: 'center', valign: 'middle' },
      );
    }
  });

  return { elements, width: 10, height: 5.625 };
}

// Vertical Steps Component - Numbered vertical timeline
const verticalStepsMeta: IRComponentMeta = {
  id: 'vertical-steps',
  name: '수직 단계',
  category: 'flow-process',
  description: '번호가 매겨진 수직 단계',
  defaultProps: {
    title: 'Implementation Plan',
    steps: [
      { title: 'Assessment', description: 'Evaluate current state and define requirements' },
      { title: 'Planning', description: 'Develop detailed implementation roadmap' },
      { title: 'Execution', description: 'Build, test, and iterate on the solution' },
      { title: 'Launch', description: 'Deploy to production with full support' },
    ],
  },
  propSchema: {},
};

function renderVerticalSteps(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Steps';
  const steps = (props.steps as Array<{title: string; description: string}>) || [];
  const elements: PPTXElement[] = [];

  // Title (30% larger: 24 → 31)
  elements.push(
    { type: 'text', x: 0.5, y: 0.5, w: 9, h: 0.6, text: title, fontSize: 31, bold: true, color: COLORS.textPrimary },
    { type: 'rect', x: 0.5, y: 1.1, w: 1.2, h: 0.05, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
  );

  const startY = 1.5;
  const stepHeight = 1.43; // 50% more spacing (0.95 * 1.5)
  const circleSize = 0.72; // 30% larger icons (0.55 * 1.3)
  const circleX = 1.2;
  const contentX = 2.0;

  // Vertical connecting line (thicker: 2pt → 3pt)
  const lineStartY = startY + circleSize / 2;
  const lineEndY = startY + (steps.length - 1) * stepHeight + circleSize / 2;
  elements.push(
    { type: 'line', x: circleX + circleSize / 2, y: lineStartY, w: 0, h: lineEndY - lineStartY, line: { color: COLORS.border, width: 3 } },
  );

  steps.forEach((step, i) => {
    const y = startY + i * stepHeight;

    // Number circle (30% larger: 18 → 23)
    elements.push(
      { type: 'ellipse', x: circleX, y, w: circleSize, h: circleSize, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
      { type: 'text', x: circleX, y, w: circleSize, h: circleSize, text: String(i + 1), fontSize: 23, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
    );

    // Content card (0.4 inch padding = 0.8 → 1.2)
    elements.push(
      { type: 'rect', x: contentX, y: y - 0.05, w: 6.8, h: 1.2, fill: '#FFFFFF', line: { color: COLORS.border, width: 1 } },
      // Accent left border
      { type: 'rect', x: contentX, y: y - 0.05, w: 0.06, h: 1.2, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    );

    // Title (important: 14pt)
    elements.push(
      { type: 'text', x: contentX + 0.4, y: y + 0.1, w: 6.0, h: 0.4, text: step.title, fontSize: 14, bold: true, color: COLORS.textPrimary },
    );

    // Description (minimum: 12pt)
    elements.push(
      { type: 'text', x: contentX + 0.4, y: y + 0.55, w: 6.0, h: 0.4, text: step.description, fontSize: 12, color: COLORS.textSecondary },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Circular Process Component - Continuous cycle diagram
const circularProcessMeta: IRComponentMeta = {
  id: 'circular-process',
  name: '순환 프로세스',
  category: 'flow-process',
  description: '순환 구조의 프로세스 다이어그램',
  defaultProps: {
    title: 'Continuous Improvement',
    centerLabel: 'Agile\nCycle',
    steps: [
      { title: 'Plan', description: 'Define goals' },
      { title: 'Build', description: 'Develop solution' },
      { title: 'Test', description: 'Validate quality' },
      { title: 'Review', description: 'Gather feedback' },
    ],
  },
  propSchema: {},
};

function renderCircularProcess(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Process';
  const centerLabel = (props.centerLabel as string) || 'Cycle';
  const steps = (props.steps as Array<{title: string; description: string}>) || [];
  const elements: PPTXElement[] = [];

  // Title (30% larger: 22 → 29)
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 9, h: 0.5, text: title, fontSize: 29, bold: true, color: COLORS.textPrimary },
  );

  const centerX = 5;
  const centerY = 3.0;
  const radius = 2.0; // 50% more spacing
  const boxWidth = 1.7; // 0.4 inch padding increase
  const boxHeight = 1.1; // 0.4 inch padding increase
  const stepCount = Math.min(steps.length, 6);
  const angleStep = (2 * Math.PI) / stepCount;

  // Circular background (thicker: 2pt → 3pt)
  elements.push(
    { type: 'ellipse', x: centerX - radius - 0.3, y: centerY - radius - 0.3, w: (radius + 0.3) * 2, h: (radius + 0.3) * 2, fill: COLORS.surface, line: { color: COLORS.border, width: 3 } },
  );

  // Center circle with label (30% larger: 1.4 → 1.82)
  elements.push(
    { type: 'ellipse', x: centerX - 0.91, y: centerY - 0.91, w: 1.82, h: 1.82, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    { type: 'text', x: centerX - 0.91, y: centerY - 0.45, w: 1.82, h: 0.9, text: centerLabel, fontSize: 14, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
  );

  // Curved arrows (simplified as straight connectors between steps)
  steps.slice(0, stepCount).forEach((step, i) => {
    const angle = i * angleStep - Math.PI / 2; // Start at top

    const x = centerX + radius * Math.cos(angle) - boxWidth / 2;
    const y = centerY + radius * Math.sin(angle) - boxHeight / 2;

    // Step box (with 0.4 inch padding)
    elements.push(
      { type: 'rect', x, y, w: boxWidth, h: boxHeight, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
      { type: 'text', x: x + 0.2, y: y + 0.15, w: boxWidth - 0.4, h: 0.4, text: step.title, fontSize: 14, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
      { type: 'text', x: x + 0.2, y: y + 0.6, w: boxWidth - 0.4, h: 0.35, text: step.description, fontSize: 12, color: 'rgba(255,255,255,0.85)', align: 'center', valign: 'middle' },
    );

    // Arrow pointing to next step
    const arrowAngle = angle + angleStep / 2;
    const arrowRadius = radius - 0.15;
    const arrowX = centerX + arrowRadius * Math.cos(arrowAngle);
    const arrowY = centerY + arrowRadius * Math.sin(arrowAngle);

    // Determine arrow direction based on angle
    let arrowChar = '→';
    if (arrowAngle > -Math.PI / 4 && arrowAngle <= Math.PI / 4) arrowChar = '↓';
    else if (arrowAngle > Math.PI / 4 && arrowAngle <= 3 * Math.PI / 4) arrowChar = '→';
    else if (arrowAngle > 3 * Math.PI / 4 || arrowAngle <= -3 * Math.PI / 4) arrowChar = '↑';
    else arrowChar = '←';

    elements.push(
      { type: 'text', x: arrowX - 0.15, y: arrowY - 0.15, w: 0.3, h: 0.3, text: arrowChar, fontSize: 14, bold: true, color: COLORS.accent, align: 'center', valign: 'middle' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Funnel Component - Conversion funnel with metrics
const funnelMeta: IRComponentMeta = {
  id: 'funnel',
  name: '퍼널',
  category: 'flow-process',
  description: '단계별 전환 퍼널',
  defaultProps: {
    title: 'Sales Funnel',
    stages: [
      { label: 'Awareness', value: '10,000', percentage: 100, conversion: '' },
      { label: 'Interest', value: '5,000', percentage: 50, conversion: '50%' },
      { label: 'Consideration', value: '2,500', percentage: 25, conversion: '50%' },
      { label: 'Conversion', value: '1,000', percentage: 10, conversion: '40%' },
    ],
  },
  propSchema: {},
};

function renderFunnel(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Funnel';
  const stages = (props.stages as Array<{label: string; value: string; percentage: number; conversion?: string}>) || [];
  const elements: PPTXElement[] = [];

  // Title (30% larger: 22 → 29)
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 9, h: 0.5, text: title, fontSize: 29, bold: true, color: COLORS.textPrimary },
  );

  const startY = 1.2;
  const maxWidth = 7;
  const minWidth = 2.5;
  const stageHeight = 0.95;
  const centerX = 4.5;
  const stageCount = stages.length;

  // Gradient of colors from accent to darker
  const colorShades = ['#8A9B5C', COLORS.accent, '#5A6B3F', '#4A5A2F'];

  stages.forEach((stage, i) => {
    // Calculate width based on position in funnel (linear taper)
    const widthRatio = 1 - (i / (stageCount - 1)) * 0.65;
    const stageWidth = minWidth + (maxWidth - minWidth) * widthRatio;
    const x = centerX - stageWidth / 2;
    const y = startY + i * stageHeight;
    const stageColor = colorShades[i % colorShades.length];

    // Funnel stage bar
    elements.push(
      { type: 'rect', x, y, w: stageWidth, h: stageHeight - 0.08, fill: stageColor, line: { color: stageColor, width: 0 } },
    );

    // Stage label (left inside)
    elements.push(
      { type: 'text', x: x + 0.2, y: y + 0.2, w: stageWidth / 2 - 0.3, h: 0.35, text: stage.label, fontSize: 12, bold: true, color: '#FFFFFF', valign: 'middle' },
    );

    // Value (right inside)
    elements.push(
      { type: 'text', x: x + stageWidth / 2, y: y + 0.2, w: stageWidth / 2 - 0.2, h: 0.35, text: stage.value, fontSize: 14, bold: true, color: '#FFFFFF', align: 'right', valign: 'middle' },
    );

    // Conversion rate (side annotation)
    if (stage.conversion) {
      elements.push(
        { type: 'text', x: centerX + maxWidth / 2 + 0.3, y: y + stageHeight / 2 - 0.4, w: 0.8, h: 0.3, text: stage.conversion, fontSize: 11, bold: true, color: COLORS.positive },
        { type: 'text', x: centerX + maxWidth / 2 + 0.3, y: y + stageHeight / 2 - 0.1, w: 1.2, h: 0.25, text: 'conversion', fontSize: 9, color: COLORS.textSecondary },
      );
    }
  });

  return { elements, width: 10, height: 5.625 };
}

// Decision Tree Component - Diamond nodes with yes/no branches
const decisionTreeMeta: IRComponentMeta = {
  id: 'decision-tree',
  name: '의사결정 트리',
  category: 'flow-process',
  description: '예/아니오 분기가 있는 다이아몬드 노드',
  defaultProps: {
    title: 'Decision Flow',
    rootQuestion: 'Is the customer enterprise?',
    yesPath: { label: 'Yes', result: 'Sales-led motion', subtext: 'Dedicated AE' },
    noPath: { label: 'No', nextQuestion: 'ARR > $10K?', yesResult: 'Hybrid approach', noResult: 'Self-serve' },
  },
  propSchema: {},
};

function renderDecisionTree(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Decision Tree';
  const rootQuestion = (props.rootQuestion as string) || 'Decision?';
  const yesPath = props.yesPath as { label: string; result: string; subtext?: string };
  const noPath = props.noPath as { label: string; nextQuestion?: string; yesResult?: string; noResult?: string; result?: string };
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.3, w: 9, h: 0.45, text: title, fontSize: 20, bold: true, color: COLORS.textPrimary },
  );

  // Root decision diamond (rotated square representation)
  const rootX = 5;
  const rootY = 1.5;
  const diamondSize = 1.4;

  // Diamond background (using rect as approximation)
  elements.push(
    { type: 'rect', x: rootX - diamondSize / 2, y: rootY - diamondSize / 2, w: diamondSize, h: diamondSize, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    { type: 'text', x: rootX - diamondSize / 2, y: rootY - 0.3, w: diamondSize, h: 0.6, text: '?', fontSize: 24, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
  );

  // Root question label above
  elements.push(
    { type: 'text', x: 2.5, y: 0.85, w: 5, h: 0.4, text: rootQuestion, fontSize: 12, color: COLORS.textPrimary, align: 'center' },
  );

  // Yes branch (left)
  const yesX = 2.2;
  const yesY = 3.0;

  // Connector line from diamond to yes
  elements.push(
    { type: 'line', x: rootX - diamondSize / 2, y: rootY, w: -(rootX - diamondSize / 2 - yesX - 0.8), h: 0, line: { color: COLORS.positive, width: 2 } },
    { type: 'line', x: yesX + 0.8, y: rootY, w: 0, h: yesY - rootY - 0.4, line: { color: COLORS.positive, width: 2 } },
  );

  // Yes label
  elements.push(
    { type: 'text', x: yesX, y: rootY - 0.35, w: 0.8, h: 0.3, text: yesPath.label, fontSize: 11, bold: true, color: COLORS.positive, align: 'center' },
  );

  // Yes result box
  elements.push(
    { type: 'rect', x: yesX, y: yesY, w: 2.0, h: 1.1, fill: COLORS.positive, line: { color: COLORS.positive, width: 0 } },
    { type: 'text', x: yesX + 0.1, y: yesY + 0.15, w: 1.8, h: 0.4, text: yesPath.result, fontSize: 12, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
  );
  if (yesPath.subtext) {
    elements.push(
      { type: 'text', x: yesX + 0.1, y: yesY + 0.6, w: 1.8, h: 0.35, text: yesPath.subtext, fontSize: 10, color: 'rgba(255,255,255,0.8)', align: 'center', valign: 'middle' },
    );
  }

  // No branch (right)
  const noX = 7.0;
  const noY = 3.0;

  // Connector line from diamond to no
  elements.push(
    { type: 'line', x: rootX + diamondSize / 2, y: rootY, w: noX - (rootX + diamondSize / 2), h: 0, line: { color: COLORS.negative, width: 2 } },
    { type: 'line', x: noX + 0.5, y: rootY, w: 0, h: noY - rootY - 0.4, line: { color: COLORS.negative, width: 2 } },
  );

  // No label
  elements.push(
    { type: 'text', x: noX + 0.1, y: rootY - 0.35, w: 0.8, h: 0.3, text: noPath.label, fontSize: 11, bold: true, color: COLORS.negative, align: 'center' },
  );

  if (noPath.nextQuestion) {
    // Secondary decision diamond
    elements.push(
      { type: 'rect', x: noX, y: noY, w: 1.0, h: 1.0, fill: COLORS.accentLight, line: { color: COLORS.accentLight, width: 0 } },
      { type: 'text', x: noX, y: noY + 0.3, w: 1.0, h: 0.4, text: '?', fontSize: 18, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
      { type: 'text', x: noX - 0.5, y: noY + 1.1, w: 2, h: 0.35, text: noPath.nextQuestion, fontSize: 10, color: COLORS.textSecondary, align: 'center' },
    );

    // Yes sub-result
    if (noPath.yesResult) {
      elements.push(
        { type: 'line', x: noX, y: noY + 0.5, w: -0.8, h: 0, line: { color: COLORS.positive, width: 1 } },
        { type: 'rect', x: noX - 2.2, y: noY + 0.1, w: 1.4, h: 0.8, fill: '#FFFFFF', line: { color: COLORS.border, width: 1 } },
        { type: 'text', x: noX - 2.2, y: noY + 0.25, w: 1.4, h: 0.5, text: noPath.yesResult, fontSize: 10, color: COLORS.textPrimary, align: 'center', valign: 'middle' },
      );
    }

    // No sub-result
    if (noPath.noResult) {
      elements.push(
        { type: 'line', x: noX + 1.0, y: noY + 0.5, w: 0.8, h: 0, line: { color: COLORS.negative, width: 1 } },
        { type: 'rect', x: noX + 1.8, y: noY + 0.1, w: 1.4, h: 0.8, fill: '#FFFFFF', line: { color: COLORS.border, width: 1 } },
        { type: 'text', x: noX + 1.8, y: noY + 0.25, w: 1.4, h: 0.5, text: noPath.noResult, fontSize: 10, color: COLORS.textPrimary, align: 'center', valign: 'middle' },
      );
    }
  } else if (noPath.result) {
    // Simple no result
    elements.push(
      { type: 'rect', x: noX, y: noY, w: 2.0, h: 1.1, fill: '#FFFFFF', line: { color: COLORS.border, width: 1 } },
      { type: 'text', x: noX + 0.1, y: noY + 0.35, w: 1.8, h: 0.4, text: noPath.result, fontSize: 12, bold: true, color: COLORS.textPrimary, align: 'center', valign: 'middle' },
    );
  }

  return { elements, width: 10, height: 5.625 };
}

// Swim Lane Component - Horizontal lanes with process boxes
const swimLaneMeta: IRComponentMeta = {
  id: 'swim-lane',
  name: '스윔 레인',
  category: 'flow-process',
  description: '프로세스 박스가 있는 수평 레인',
  defaultProps: {
    title: 'Process Workflow',
    lanes: [
      { name: 'Customer', steps: ['Request', 'Review', 'Approve'] },
      { name: 'Sales', steps: ['Receive', 'Validate', 'Process'] },
      { name: 'Finance', steps: ['Invoice', 'Collect', 'Close'] },
    ],
  },
  propSchema: {},
};

function renderSwimLane(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Swim Lane';
  const lanes = (props.lanes as Array<{name: string; steps: string[]}>) || [];
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.35, w: 9, h: 0.45, text: title, fontSize: 20, bold: true, color: COLORS.textPrimary },
  );

  const _laneCount = Math.min(lanes.length, 4);
  void _laneCount; // reserved for future validation
  const laneStartY = 1.1;
  const laneHeight = 1.35;
  const labelWidth = 1.4;
  const stepAreaX = 1.6;
  const stepAreaWidth = 7.9;

  lanes.slice(0, 4).forEach((lane, laneIndex) => {
    const y = laneStartY + laneIndex * laneHeight;
    const isEven = laneIndex % 2 === 0;

    // Lane background
    elements.push(
      { type: 'rect', x: 0.5, y, w: 9.0, h: laneHeight - 0.05, fill: isEven ? COLORS.surface : '#FFFFFF', line: { color: COLORS.border, width: 1 } },
    );

    // Lane label
    elements.push(
      { type: 'rect', x: 0.5, y, w: labelWidth, h: laneHeight - 0.05, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
      { type: 'text', x: 0.5, y, w: labelWidth, h: laneHeight - 0.05, text: lane.name, fontSize: 11, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
    );

    // Steps
    const stepCount = Math.min(lane.steps.length, 5);
    const stepWidth = 1.4;
    const stepGap = (stepAreaWidth - stepCount * stepWidth) / (stepCount + 1);
    const stepHeight = 0.7;
    const stepY = y + (laneHeight - stepHeight) / 2 - 0.02;

    lane.steps.slice(0, 5).forEach((step, stepIndex) => {
      const stepX = stepAreaX + stepGap + stepIndex * (stepWidth + stepGap);

      // Step box
      elements.push(
        { type: 'rect', x: stepX, y: stepY, w: stepWidth, h: stepHeight, fill: '#FFFFFF', line: { color: COLORS.accent, width: 1 } },
        { type: 'text', x: stepX, y: stepY, w: stepWidth, h: stepHeight, text: step, fontSize: 10, color: COLORS.textPrimary, align: 'center', valign: 'middle' },
      );

      // Arrow to next step
      if (stepIndex < stepCount - 1) {
        elements.push(
          { type: 'text', x: stepX + stepWidth + (stepGap - 0.3) / 2, y: stepY + stepHeight / 2 - 0.12, w: 0.3, h: 0.24, text: '→', fontSize: 12, color: COLORS.accent, align: 'center', valign: 'middle' },
        );
      }
    });
  });

  return { elements, width: 10, height: 5.625 };
}

// Gantt Simple Component - Time axis with task bars
const ganttSimpleMeta: IRComponentMeta = {
  id: 'gantt-simple',
  name: '간트 차트',
  category: 'flow-process',
  description: '시간 축과 작업 막대',
  defaultProps: {
    title: 'Project Timeline',
    periods: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    tasks: [
      { name: 'Discovery', start: 0, duration: 2 },
      { name: 'Design', start: 1, duration: 2 },
      { name: 'Development', start: 2, duration: 3 },
      { name: 'Testing', start: 4, duration: 2 },
      { name: 'Launch', start: 5, duration: 1 },
    ],
  },
  propSchema: {},
};

function renderGanttSimple(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Gantt Chart';
  const periods = (props.periods as string[]) || [];
  const tasks = (props.tasks as Array<{name: string; start: number; duration: number; color?: string}>) || [];
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.35, w: 9, h: 0.45, text: title, fontSize: 20, bold: true, color: COLORS.textPrimary },
  );

  const chartStartY = 1.1;
  const headerHeight = 0.5;
  const taskLabelWidth = 1.8;
  const chartX = taskLabelWidth + 0.3;
  const chartWidth = 9.2 - chartX;
  const taskHeight = 0.65;
  const taskGap = 0.15;
  const periodCount = periods.length;
  const periodWidth = chartWidth / periodCount;

  // Header background
  elements.push(
    { type: 'rect', x: 0.5, y: chartStartY, w: 9.0, h: headerHeight, fill: COLORS.surface, line: { color: COLORS.border, width: 1 } },
  );

  // Period headers
  periods.forEach((period, i) => {
    const x = chartX + i * periodWidth;
    elements.push(
      { type: 'text', x, y: chartStartY, w: periodWidth, h: headerHeight, text: period, fontSize: 10, bold: true, color: COLORS.textPrimary, align: 'center', valign: 'middle' },
    );
    // Vertical grid line
    if (i > 0) {
      elements.push(
        { type: 'line', x, y: chartStartY, w: 0, h: headerHeight + tasks.length * (taskHeight + taskGap), line: { color: COLORS.border, width: 1 } },
      );
    }
  });

  // Tasks
  const colors = ['#6B7B3F', '#8A9B5C', '#A8B884', '#5A6B3F', '#4A5A2F'];
  tasks.forEach((task, i) => {
    const y = chartStartY + headerHeight + i * (taskHeight + taskGap) + taskGap;
    const barX = chartX + task.start * periodWidth;
    const barWidth = task.duration * periodWidth;
    const taskColor = task.color || colors[i % colors.length];

    // Task row background
    elements.push(
      { type: 'rect', x: 0.5, y, w: taskLabelWidth - 0.1, h: taskHeight, fill: '#FFFFFF', line: { color: COLORS.border, width: 1 } },
    );

    // Task name
    elements.push(
      { type: 'text', x: 0.6, y, w: taskLabelWidth - 0.3, h: taskHeight, text: task.name, fontSize: 10, color: COLORS.textPrimary, valign: 'middle' },
    );

    // Task bar
    elements.push(
      { type: 'rect', x: barX, y: y + 0.08, w: barWidth - 0.05, h: taskHeight - 0.16, fill: taskColor, line: { color: taskColor, width: 0 } },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// User Flow Component - User journey through product
const userFlowMeta: IRComponentMeta = {
  id: 'user-flow',
  name: '사용자 플로우',
  category: 'flow-process',
  description: '제품 내 사용자 여정',
  defaultProps: {
    title: 'User Journey',
    persona: 'New User',
    stages: [
      { stage: 'Awareness', action: 'Sees ad', emotion: 'curious', touchpoint: 'Social Media' },
      { stage: 'Consideration', action: 'Visits website', emotion: 'interested', touchpoint: 'Landing Page' },
      { stage: 'Decision', action: 'Starts trial', emotion: 'excited', touchpoint: 'Sign Up' },
      { stage: 'Retention', action: 'Uses daily', emotion: 'satisfied', touchpoint: 'App' },
    ],
  },
  propSchema: {},
};

function renderUserFlow(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'User Journey';
  const persona = (props.persona as string) || 'User';
  const stages = (props.stages as Array<{stage: string; action: string; emotion?: string; touchpoint?: string}>) || [];
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 7, h: 0.5, text: title, fontSize: 22, bold: true, color: COLORS.textPrimary },
  );

  // Persona badge
  elements.push(
    { type: 'rect', x: 7.5, y: 0.4, w: 2, h: 0.45, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    { type: 'text', x: 7.5, y: 0.4, w: 2, h: 0.45, text: persona, fontSize: 11, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
  );

  const stageCount = Math.min(stages.length, 5);
  const startX = 0.6;
  const stageWidth = 2.1;
  const stageGap = 0.2;
  const stageY = 1.3;

  // Journey path line
  elements.push(
    { type: 'line', x: startX + 0.5, y: stageY + 1.8, w: (stageWidth + stageGap) * (stageCount - 1), h: 0, line: { color: COLORS.accent, width: 3 } },
  );

  const emotionIcons: Record<string, string> = {
    'curious': '?',
    'interested': '!',
    'excited': '*',
    'satisfied': '+',
    'frustrated': '-',
    'delighted': '++',
  };

  stages.slice(0, 5).forEach((s, i) => {
    const x = startX + i * (stageWidth + stageGap);

    // Stage card
    elements.push(
      { type: 'rect', x, y: stageY, w: stageWidth, h: 2.8, fill: '#FFFFFF', line: { color: COLORS.border, width: 1 } },
      { type: 'rect', x, y: stageY, w: stageWidth, h: 0.5, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    );

    // Stage name
    elements.push(
      { type: 'text', x, y: stageY, w: stageWidth, h: 0.5, text: s.stage, fontSize: 11, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
    );

    // Action
    elements.push(
      { type: 'text', x: x + 0.15, y: stageY + 0.65, w: stageWidth - 0.3, h: 0.5, text: s.action, fontSize: 11, bold: true, color: COLORS.textPrimary, align: 'center', valign: 'middle' },
    );

    // Touchpoint
    if (s.touchpoint) {
      elements.push(
        { type: 'rect', x: x + 0.25, y: stageY + 1.25, w: stageWidth - 0.5, h: 0.4, fill: COLORS.surface, line: { color: COLORS.border, width: 1 } },
        { type: 'text', x: x + 0.25, y: stageY + 1.25, w: stageWidth - 0.5, h: 0.4, text: s.touchpoint, fontSize: 9, color: COLORS.textSecondary, align: 'center', valign: 'middle' },
      );
    }

    // Emotion indicator
    if (s.emotion) {
      const icon = emotionIcons[s.emotion] || s.emotion.charAt(0).toUpperCase();
      elements.push(
        { type: 'ellipse', x: x + stageWidth / 2 - 0.25, y: stageY + 1.85, w: 0.5, h: 0.5, fill: COLORS.accentLight, line: { color: COLORS.accent, width: 1 } },
        { type: 'text', x: x + stageWidth / 2 - 0.25, y: stageY + 1.85, w: 0.5, h: 0.5, text: icon, fontSize: 14, bold: true, color: COLORS.accent, align: 'center', valign: 'middle' },
        { type: 'text', x: x + 0.15, y: stageY + 2.4, w: stageWidth - 0.3, h: 0.3, text: s.emotion, fontSize: 9, color: COLORS.textSecondary, align: 'center', valign: 'middle' },
      );
    }

    // Connector arrow
    if (i < stageCount - 1) {
      elements.push(
        { type: 'text', x: x + stageWidth + (stageGap - 0.3) / 2, y: stageY + 1.65, w: 0.3, h: 0.3, text: '>', fontSize: 16, bold: true, color: COLORS.accent, align: 'center', valign: 'middle' },
      );
    }
  });

  return { elements, width: 10, height: 5.625 };
}

// Onboarding Flow Component - User activation steps
const onboardingFlowMeta: IRComponentMeta = {
  id: 'onboarding-flow',
  name: '온보딩 플로우',
  category: 'flow-process',
  description: '사용자 활성화 단계',
  defaultProps: {
    title: 'User Onboarding',
    completionRate: '68%',
    steps: [
      { name: 'Sign Up', completion: 100, users: '10,000' },
      { name: 'Profile Setup', completion: 85, users: '8,500' },
      { name: 'First Action', completion: 72, users: '7,200' },
      { name: 'Invite Team', completion: 45, users: '4,500' },
      { name: 'Activated', completion: 68, users: '6,800' },
    ],
  },
  propSchema: {},
};

function renderOnboardingFlow(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Onboarding';
  const completionRate = (props.completionRate as string) || '';
  const steps = (props.steps as Array<{name: string; completion: number; users?: string}>) || [];
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 6, h: 0.5, text: title, fontSize: 22, bold: true, color: COLORS.textPrimary },
  );

  // Completion rate highlight
  if (completionRate) {
    elements.push(
      { type: 'text', x: 7, y: 0.35, w: 2.5, h: 0.4, text: completionRate, fontSize: 28, bold: true, color: COLORS.positive, align: 'right' },
      { type: 'text', x: 7, y: 0.75, w: 2.5, h: 0.25, text: 'Completion Rate', fontSize: 10, color: COLORS.textSecondary, align: 'right' },
    );
  }

  const stepCount = Math.min(steps.length, 6);
  const startX = 0.6;
  const stepWidth = 1.5;
  const stepGap = 0.15;
  const chartY = 1.4;
  const chartHeight = 2.8;

  // Progress path
  elements.push(
    { type: 'rect', x: startX, y: chartY + chartHeight + 0.15, w: (stepWidth + stepGap) * stepCount - stepGap, h: 0.08, fill: COLORS.surface, line: { color: COLORS.border, width: 1 } },
  );

  steps.slice(0, 6).forEach((step, i) => {
    const x = startX + i * (stepWidth + stepGap);
    const barHeight = (step.completion / 100) * chartHeight;
    const barY = chartY + (chartHeight - barHeight);

    // Bar
    const barColor = step.completion >= 70 ? COLORS.positive : step.completion >= 40 ? COLORS.accent : COLORS.negative;
    elements.push(
      { type: 'rect', x: x + 0.15, y: barY, w: stepWidth - 0.3, h: barHeight, fill: barColor, line: { color: barColor, width: 0 } },
    );

    // Completion percentage on bar
    elements.push(
      { type: 'text', x, y: barY - 0.35, w: stepWidth, h: 0.3, text: `${step.completion}%`, fontSize: 12, bold: true, color: COLORS.textPrimary, align: 'center' },
    );

    // Step name below
    elements.push(
      { type: 'text', x, y: chartY + chartHeight + 0.35, w: stepWidth, h: 0.35, text: step.name, fontSize: 10, bold: true, color: COLORS.textPrimary, align: 'center', valign: 'middle' },
    );

    // User count
    if (step.users) {
      elements.push(
        { type: 'text', x, y: chartY + chartHeight + 0.7, w: stepWidth, h: 0.25, text: step.users, fontSize: 9, color: COLORS.textSecondary, align: 'center' },
      );
    }

    // Step circle on progress path
    elements.push(
      { type: 'ellipse', x: x + stepWidth / 2 - 0.15, y: chartY + chartHeight + 0.04, w: 0.3, h: 0.3, fill: barColor, line: { color: '#FFFFFF', width: 2 } },
    );

    // Drop-off indicator
    if (i > 0 && steps[i - 1]) {
      const dropOff = steps[i - 1].completion - step.completion;
      if (dropOff > 0) {
        elements.push(
          { type: 'text', x: x - stepGap / 2 - 0.3, y: chartY + 0.2, w: 0.6, h: 0.25, text: `-${dropOff}%`, fontSize: 8, color: COLORS.negative, align: 'center' },
        );
      }
    }
  });

  return { elements, width: 10, height: 5.625 };
}

// Data Pipeline Component - Data flow architecture
const dataPipelineMeta: IRComponentMeta = {
  id: 'data-pipeline',
  name: '데이터 파이프라인',
  category: 'flow-process',
  description: '데이터 흐름 아키텍처',
  defaultProps: {
    title: 'Data Pipeline Architecture',
    stages: [
      { name: 'Sources', items: ['App Events', 'API Logs', 'DB Sync'] },
      { name: 'Ingestion', items: ['Kafka', 'Kinesis'] },
      { name: 'Processing', items: ['Spark', 'Flink'] },
      { name: 'Storage', items: ['Data Lake', 'Warehouse'] },
      { name: 'Analytics', items: ['BI Tools', 'ML Models'] },
    ],
  },
  propSchema: {},
};

function renderDataPipeline(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Data Pipeline';
  const stages = (props.stages as Array<{name: string; items: string[]}>) || [];
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.35, w: 9, h: 0.45, text: title, fontSize: 20, bold: true, color: COLORS.textPrimary },
  );

  const stageCount = Math.min(stages.length, 5);
  const startX = 0.5;
  const stageWidth = 1.7;
  const stageGap = 0.25;
  const stageY = 1.1;

  // Main flow arrow background
  elements.push(
    { type: 'rect', x: startX + 0.4, y: stageY + 1.6, w: (stageWidth + stageGap) * stageCount - stageGap - 0.8, h: 0.3, fill: COLORS.surface, line: { color: COLORS.border, width: 1 } },
  );

  const stageColors = ['#5A6B3F', '#6B7B3F', COLORS.accent, '#8A9B5C', '#A8B884'];

  stages.slice(0, 5).forEach((stage, i) => {
    const x = startX + i * (stageWidth + stageGap);
    const stageColor = stageColors[i % stageColors.length];

    // Stage header
    elements.push(
      { type: 'rect', x, y: stageY, w: stageWidth, h: 0.45, fill: stageColor, line: { color: stageColor, width: 0 } },
      { type: 'text', x, y: stageY, w: stageWidth, h: 0.45, text: stage.name, fontSize: 10, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
    );

    // Items container
    elements.push(
      { type: 'rect', x, y: stageY + 0.45, w: stageWidth, h: 2.6, fill: '#FFFFFF', line: { color: COLORS.border, width: 1 } },
    );

    // Items
    stage.items.slice(0, 4).forEach((item, j) => {
      const itemY = stageY + 0.6 + j * 0.6;
      elements.push(
        { type: 'rect', x: x + 0.12, y: itemY, w: stageWidth - 0.24, h: 0.5, fill: COLORS.surface, line: { color: stageColor, width: 1 } },
        { type: 'text', x: x + 0.12, y: itemY, w: stageWidth - 0.24, h: 0.5, text: item, fontSize: 9, color: COLORS.textPrimary, align: 'center', valign: 'middle' },
      );
    });

    // Flow connector
    if (i < stageCount - 1) {
      elements.push(
        { type: 'text', x: x + stageWidth + (stageGap - 0.3) / 2, y: stageY + 1.5, w: 0.3, h: 0.3, text: '>', fontSize: 18, bold: true, color: stageColor, align: 'center', valign: 'middle' },
      );
    }

    // Stage icon on flow line
    elements.push(
      { type: 'ellipse', x: x + stageWidth / 2 - 0.2, y: stageY + 1.5, w: 0.4, h: 0.4, fill: stageColor, line: { color: '#FFFFFF', width: 2 } },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Integration Flow Component - System integration diagram
const integrationFlowMeta: IRComponentMeta = {
  id: 'integration-flow',
  name: '통합 플로우',
  category: 'flow-process',
  description: '시스템 통합 다이어그램',
  defaultProps: {
    title: 'System Integration',
    centerSystem: { name: 'Core Platform', description: 'Central Hub' },
    integrations: [
      { name: 'CRM', type: 'inbound', protocol: 'REST API' },
      { name: 'ERP', type: 'bidirectional', protocol: 'GraphQL' },
      { name: 'Analytics', type: 'outbound', protocol: 'Webhook' },
      { name: 'Payment', type: 'bidirectional', protocol: 'SDK' },
    ],
  },
  propSchema: {},
};

function renderIntegrationFlow(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Integration Flow';
  const centerSystem = props.centerSystem as { name: string; description?: string };
  const integrations = (props.integrations as Array<{name: string; type: string; protocol?: string}>) || [];
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.35, w: 9, h: 0.45, text: title, fontSize: 20, bold: true, color: COLORS.textPrimary },
  );

  const centerX = 5;
  const centerY = 2.9;
  const centerWidth = 2.2;
  const centerHeight = 1.4;

  // Center system box
  elements.push(
    { type: 'rect', x: centerX - centerWidth / 2, y: centerY - centerHeight / 2, w: centerWidth, h: centerHeight, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    { type: 'text', x: centerX - centerWidth / 2, y: centerY - 0.35, w: centerWidth, h: 0.4, text: centerSystem.name, fontSize: 13, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
  );
  if (centerSystem.description) {
    elements.push(
      { type: 'text', x: centerX - centerWidth / 2, y: centerY + 0.1, w: centerWidth, h: 0.3, text: centerSystem.description, fontSize: 10, color: 'rgba(255,255,255,0.8)', align: 'center', valign: 'middle' },
    );
  }

  const integrationCount = Math.min(integrations.length, 6);
  const radius = 2.0;
  const boxWidth = 1.6;
  const boxHeight = 0.9;
  const angleStep = (2 * Math.PI) / integrationCount;

  integrations.slice(0, 6).forEach((integration, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    // Integration box
    elements.push(
      { type: 'rect', x: x - boxWidth / 2, y: y - boxHeight / 2, w: boxWidth, h: boxHeight, fill: '#FFFFFF', line: { color: COLORS.border, width: 1 } },
      { type: 'rect', x: x - boxWidth / 2, y: y - boxHeight / 2, w: 0.06, h: boxHeight, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    );

    // Integration name
    elements.push(
      { type: 'text', x: x - boxWidth / 2 + 0.15, y: y - boxHeight / 2 + 0.1, w: boxWidth - 0.25, h: 0.35, text: integration.name, fontSize: 11, bold: true, color: COLORS.textPrimary, align: 'center', valign: 'middle' },
    );

    // Protocol
    if (integration.protocol) {
      elements.push(
        { type: 'text', x: x - boxWidth / 2 + 0.15, y: y + 0.05, w: boxWidth - 0.25, h: 0.3, text: integration.protocol, fontSize: 9, color: COLORS.textSecondary, align: 'center', valign: 'middle' },
      );
    }

    // Connection line
    const lineEndX = centerX + (centerWidth / 2 + 0.1) * Math.cos(angle);
    const lineEndY = centerY + (centerHeight / 2 + 0.1) * Math.sin(angle);
    const lineStartX = x - (boxWidth / 2 + 0.1) * Math.cos(angle);
    const lineStartY = y - (boxHeight / 2 + 0.1) * Math.sin(angle);

    elements.push(
      { type: 'line', x: lineStartX, y: lineStartY, w: lineEndX - lineStartX, h: lineEndY - lineStartY, line: { color: COLORS.accent, width: 2 } },
    );

    // Direction indicator
    const arrowX = (lineStartX + lineEndX) / 2;
    const arrowY = (lineStartY + lineEndY) / 2;
    let arrowText = '~';
    if (integration.type === 'inbound') arrowText = '<';
    else if (integration.type === 'outbound') arrowText = '>';
    else if (integration.type === 'bidirectional') arrowText = '<>';

    elements.push(
      { type: 'ellipse', x: arrowX - 0.2, y: arrowY - 0.2, w: 0.4, h: 0.4, fill: '#FFFFFF', line: { color: COLORS.accent, width: 1 } },
      { type: 'text', x: arrowX - 0.2, y: arrowY - 0.2, w: 0.4, h: 0.4, text: arrowText, fontSize: 10, bold: true, color: COLORS.accent, align: 'center', valign: 'middle' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Register components
registry.register(horizontalFlowMeta, renderHorizontalFlow);
registry.register(verticalStepsMeta, renderVerticalSteps);
registry.register(circularProcessMeta, renderCircularProcess);
registry.register(funnelMeta, renderFunnel);
registry.register(decisionTreeMeta, renderDecisionTree);
registry.register(swimLaneMeta, renderSwimLane);
registry.register(ganttSimpleMeta, renderGanttSimple);
registry.register(userFlowMeta, renderUserFlow);
registry.register(onboardingFlowMeta, renderOnboardingFlow);
registry.register(dataPipelineMeta, renderDataPipeline);
registry.register(integrationFlowMeta, renderIntegrationFlow);

export { horizontalFlowMeta, verticalStepsMeta, circularProcessMeta, funnelMeta, decisionTreeMeta, swimLaneMeta, ganttSimpleMeta, userFlowMeta, onboardingFlowMeta, dataPipelineMeta, integrationFlowMeta };
