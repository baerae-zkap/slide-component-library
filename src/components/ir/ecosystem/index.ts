import { registry } from '@/lib/registry';
import type { IRComponentMeta, IRComponentRenderResult, PPTXElement } from '@/types';
import { COLORS } from '@/lib/constants';

// Hub-Spoke Component - Central platform with connected nodes
const hubSpokeMeta: IRComponentMeta = {
  id: 'hub-spoke',
  name: '허브-스포크',
  category: 'ecosystem',
  description: '중앙 허브와 연결된 노드',
  defaultProps: {
    title: 'Platform Ecosystem',
    hub: 'Core Platform',
    nodes: ['API', 'SDK', 'Dashboard', 'Mobile', 'Analytics', 'Security'],
  },
  propSchema: {},
};

function renderHubSpoke(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Ecosystem';
  const hub = (props.hub as string) || 'Core Platform';
  const nodes = (props.nodes as string[]) || [];
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.3, w: 9, h: 0.45, text: title, fontSize: 26, bold: true, color: COLORS.textPrimary },
  );

  // Central hub
  const centerX = 5;
  const centerY = 3.0;
  const hubSize = 1.5;

  elements.push(
    // Hub shadow/glow effect
    { type: 'ellipse', x: centerX - hubSize / 2 - 0.05, y: centerY - hubSize / 2 + 0.05, w: hubSize + 0.1, h: hubSize + 0.1, fill: COLORS.border, line: { color: COLORS.border, width: 0 } },
    // Hub main
    { type: 'ellipse', x: centerX - hubSize / 2, y: centerY - hubSize / 2, w: hubSize, h: hubSize, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    // Hub text
    { type: 'text', x: centerX - hubSize / 2, y: centerY - 0.2, w: hubSize, h: 0.4, text: hub, fontSize: 12, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
  );

  // Spokes and nodes
  const radius = 1.9;
  const nodeWidth = 1.1;
  const nodeHeight = 0.6;
  const nodeCount = Math.min(nodes.length, 8);

  nodes.slice(0, nodeCount).forEach((node, i) => {
    const angle = (i / nodeCount) * 2 * Math.PI - Math.PI / 2;
    const nodeX = centerX + radius * Math.cos(angle);
    const nodeY = centerY + radius * Math.sin(angle);

    // Connection line
    elements.push(
      { type: 'line', x: centerX, y: centerY, w: (radius - hubSize / 2 - nodeWidth / 2 - 0.1) * Math.cos(angle), h: (radius - hubSize / 2 - nodeHeight / 2 - 0.1) * Math.sin(angle), line: { color: COLORS.border, width: 3 } },
    );

    // Node
    elements.push(
      { type: 'rect', x: nodeX - nodeWidth / 2, y: nodeY - nodeHeight / 2, w: nodeWidth, h: nodeHeight, fill: '#FFFFFF', line: { color: COLORS.accent, width: 3 } },
      { type: 'text', x: nodeX - nodeWidth / 2, y: nodeY - nodeHeight / 2, w: nodeWidth, h: nodeHeight, text: node, fontSize: 13, bold: true, color: COLORS.textPrimary, align: 'center', valign: 'middle' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Integration Map Component - Layered architecture diagram
const integrationMapMeta: IRComponentMeta = {
  id: 'integration-map',
  name: '통합 맵',
  category: 'ecosystem',
  description: '통합 아키텍처 다이어그램',
  defaultProps: {
    title: 'System Architecture',
    layers: [
      { name: 'Clients', components: ['Web App', 'Mobile App', 'Admin Portal'] },
      { name: 'API Gateway', components: ['REST API', 'GraphQL', 'WebSocket'] },
      { name: 'Services', components: ['Auth', 'Payment', 'Notification', 'Analytics'] },
      { name: 'Data Layer', components: ['PostgreSQL', 'Redis', 'S3'] },
    ],
  },
  propSchema: {},
};

function renderIntegrationMap(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Architecture';
  const layers = (props.layers as Array<{name: string; components: string[]}>) || [];
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.3, w: 9, h: 0.45, text: title, fontSize: 26, bold: true, color: COLORS.textPrimary },
  );

  const layerHeight = 0.9;
  const startY = 1.0;
  const layerGap = 0.35;
  const labelWidth = 1.3;
  const contentStartX = 1.8;
  const contentWidth = 7.5;

  // Color gradient for layers
  const layerColors = [COLORS.accentLight, COLORS.accent, '#5A6B3F', '#4A5A2F'];

  layers.forEach((layer, layerIndex) => {
    const y = startY + layerIndex * (layerHeight + layerGap);
    const layerColor = layerColors[layerIndex % layerColors.length];

    // Layer label (left)
    elements.push(
      { type: 'rect', x: 0.5, y, w: labelWidth, h: layerHeight, fill: layerColor, line: { color: layerColor, width: 0 } },
      { type: 'text', x: 0.5, y, w: labelWidth, h: layerHeight, text: layer.name, fontSize: 13, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
    );

    // Components
    const componentCount = layer.components.length;
    const componentGap = 0.2;
    const componentWidth = (contentWidth - (componentCount - 1) * componentGap) / componentCount;

    layer.components.forEach((component, i) => {
      const x = contentStartX + i * (componentWidth + componentGap);

      elements.push(
        { type: 'rect', x, y: y + 0.1, w: componentWidth, h: layerHeight - 0.2, fill: '#FFFFFF', line: { color: layerColor, width: 3 } },
        { type: 'text', x, y: y + 0.1, w: componentWidth, h: layerHeight - 0.2, text: component, fontSize: 13, color: COLORS.textPrimary, align: 'center', valign: 'middle' },
      );
    });

    // Connection arrows between layers
    if (layerIndex < layers.length - 1) {
      const arrowY = y + layerHeight + layerGap / 2;
      elements.push(
        { type: 'text', x: contentStartX + contentWidth / 2 - 0.15, y: arrowY - 0.15, w: 0.3, h: 0.3, text: '↓', fontSize: 16, color: COLORS.textSecondary, align: 'center', valign: 'middle' },
      );
    }
  });

  return { elements, width: 10, height: 5.625 };
}

// Value Chain Component - Horizontal value flow
const valueChainMeta: IRComponentMeta = {
  id: 'value-chain',
  name: '가치 사슬',
  category: 'ecosystem',
  description: '가치 사슬 다이어그램',
  defaultProps: {
    title: 'Value Chain',
    stages: [
      { name: 'Suppliers', items: ['Raw Data', 'APIs'] },
      { name: 'Inbound', items: ['Ingestion', 'Validation'] },
      { name: 'Operations', items: ['Processing', 'ML/AI'] },
      { name: 'Outbound', items: ['Delivery', 'Caching'] },
      { name: 'End Users', items: ['Dashboard', 'Reports'] },
    ],
  },
  propSchema: {},
};

function renderValueChain(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Value Chain';
  const stages = (props.stages as Array<{name: string; items: string[]}>) || [];
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.4, w: 9, h: 0.5, text: title, fontSize: 29, bold: true, color: COLORS.textPrimary },
  );

  const stageCount = Math.min(stages.length, 5);
  const boxWidth = 1.6;
  const boxHeight = 2.2;
  const arrowWidth = 0.25;
  const totalWidth = stageCount * boxWidth + (stageCount - 1) * arrowWidth;
  const startX = (10 - totalWidth) / 2;
  const startY = 1.5;

  // Gradient colors
  const stageColors = ['#8A9B5C', COLORS.accentLight, COLORS.accent, '#5A6B3F', '#4A5A2F'];

  stages.slice(0, stageCount).forEach((stage, i) => {
    const x = startX + i * (boxWidth + arrowWidth);
    const stageColor = stageColors[i % stageColors.length];

    // Stage box (chevron shape simulation with rectangle)
    elements.push(
      { type: 'rect', x, y: startY, w: boxWidth, h: boxHeight, fill: stageColor, line: { color: stageColor, width: 0 } },
    );

    // Stage name
    elements.push(
      { type: 'text', x: x + 0.4, y: startY + 0.2, w: boxWidth - 0.2, h: 0.4, text: stage.name, fontSize: 14, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
    );

    // Divider
    elements.push(
      { type: 'rect', x: x + 0.3, y: startY + 0.7, w: boxWidth - 0.6, h: 0.02, fill: 'rgba(255,255,255,0.3)', line: { color: 'transparent', width: 0 } },
    );

    // Items
    stage.items.slice(0, 3).forEach((item, j) => {
      elements.push(
        { type: 'text', x: x + 0.4, y: startY + 0.9 + j * 0.45, w: boxWidth - 0.3, h: 0.4, text: item, fontSize: 12, color: 'rgba(255,255,255,0.9)', align: 'center', valign: 'middle' },
      );
    });

    // Arrow to next stage
    if (i < stageCount - 1) {
      const arrowX = x + boxWidth;
      const arrowY = startY + boxHeight / 2;
      elements.push(
        { type: 'text', x: arrowX, y: arrowY - 0.15, w: arrowWidth, h: 0.3, text: '▶', fontSize: 14, color: COLORS.accent, align: 'center', valign: 'middle' },
      );
    }
  });

  // Value flow label
  elements.push(
    { type: 'text', x: 0, y: startY + boxHeight + 0.3, w: 10, h: 0.35, text: 'Value Flow →', fontSize: 14, color: COLORS.textSecondary, align: 'center' },
  );

  return { elements, width: 10, height: 5.625 };
}

// Platform Overview Component - Central platform with inputs/outputs
const platformOverviewMeta: IRComponentMeta = {
  id: 'platform-overview',
  name: '플랫폼 개요',
  category: 'ecosystem',
  description: '플랫폼 아키텍처 개요',
  defaultProps: {
    title: 'Platform Architecture',
    platform: {
      core: 'AI Platform',
      capabilities: ['Machine Learning', 'Data Processing', 'Analytics', 'Automation'],
      integrations: ['Salesforce', 'HubSpot', 'Slack', 'Jira'],
      outputs: ['Dashboard', 'API', 'Reports', 'Alerts'],
    },
  },
  propSchema: {},
};

function renderPlatformOverview(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Platform';
  const platform = (props.platform as {core: string; capabilities: string[]; integrations: string[]; outputs: string[]}) || {
    core: 'Platform', capabilities: [], integrations: [], outputs: [],
  };
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.3, w: 9, h: 0.45, text: title, fontSize: 26, bold: true, color: COLORS.textPrimary },
  );

  // Core platform (center)
  const coreX = 3.5;
  const coreY = 1.8;
  const coreW = 3.0;
  const coreH = 2.8;

  elements.push(
    { type: 'rect', x: coreX, y: coreY, w: coreW, h: coreH, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
    { type: 'text', x: coreX, y: coreY + 0.3, w: coreW, h: 0.45, text: platform.core, fontSize: 16, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
  );

  // Capabilities inside core
  platform.capabilities.slice(0, 4).forEach((cap, i) => {
    const capY = coreY + 0.9 + i * 0.45;
    elements.push(
      { type: 'rect', x: coreX + 0.3, y: capY, w: coreW - 0.6, h: 0.35, fill: 'rgba(255,255,255,0.2)', line: { color: 'rgba(255,255,255,0.3)', width: 3 } },
      { type: 'text', x: coreX + 0.3, y: capY, w: coreW - 0.6, h: 0.35, text: cap, fontSize: 12, color: '#FFFFFF', align: 'center', valign: 'middle' },
    );
  });

  // Integrations (left side)
  elements.push(
    { type: 'text', x: 0.3, y: 1.4, w: 1.5, h: 0.3, text: 'INTEGRATIONS', fontSize: 12, bold: true, color: COLORS.textSecondary },
  );

  platform.integrations.slice(0, 4).forEach((integration, i) => {
    const intY = 1.8 + i * 0.6;
    elements.push(
      { type: 'rect', x: 0.3, y: intY, w: 1.5, h: 0.45, fill: '#FFFFFF', line: { color: COLORS.border, width: 3 } },
      { type: 'text', x: 0.3, y: intY, w: 1.5, h: 0.45, text: integration, fontSize: 12, color: COLORS.textPrimary, align: 'center', valign: 'middle' },
    );
    // Arrow to core
    elements.push(
      { type: 'line', x: 1.8, y: intY + 0.225, w: coreX - 1.8 - 0.1, h: 0, line: { color: COLORS.border, width: 3 } },
    );
  });

  // Outputs (right side)
  elements.push(
    { type: 'text', x: 8.2, y: 1.4, w: 1.5, h: 0.3, text: 'OUTPUTS', fontSize: 12, bold: true, color: COLORS.textSecondary },
  );

  platform.outputs.slice(0, 4).forEach((output, i) => {
    const outY = 1.8 + i * 0.6;
    elements.push(
      { type: 'rect', x: 8.2, y: outY, w: 1.5, h: 0.45, fill: '#FFFFFF', line: { color: COLORS.accent, width: 3 } },
      { type: 'text', x: 8.2, y: outY, w: 1.5, h: 0.45, text: output, fontSize: 12, color: COLORS.textPrimary, align: 'center', valign: 'middle' },
    );
    // Arrow from core
    elements.push(
      { type: 'line', x: coreX + coreW + 0.1, y: outY + 0.225, w: 8.2 - coreX - coreW - 0.2, h: 0, line: { color: COLORS.accent, width: 3 } },
      { type: 'text', x: 8.0, y: outY + 0.05, w: 0.2, h: 0.35, text: '▶', fontSize: 13, color: COLORS.accent, align: 'center', valign: 'middle' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Market Map Component - Quadrant layout with positioned items
const marketMapMeta: IRComponentMeta = {
  id: 'market-map',
  name: '마켓 맵',
  category: 'ecosystem',
  description: '시장 지도 쿼드런트',
  defaultProps: {
    title: 'Market Landscape',
    xAxis: { label: 'Market Share', low: 'Niche', high: 'Mass Market' },
    yAxis: { label: 'Growth Rate', low: 'Mature', high: 'Emerging' },
    items: [
      { name: 'Us', x: 0.7, y: 0.8, highlight: true },
      { name: 'Competitor A', x: 0.8, y: 0.3 },
      { name: 'Competitor B', x: 0.4, y: 0.6 },
      { name: 'Competitor C', x: 0.2, y: 0.2 },
      { name: 'Competitor D', x: 0.6, y: 0.5 },
    ],
  },
  propSchema: {},
};

function renderMarketMap(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Market Map';
  const xAxis = (props.xAxis as { label: string; low: string; high: string }) || { label: 'X', low: 'Low', high: 'High' };
  const yAxis = (props.yAxis as { label: string; low: string; high: string }) || { label: 'Y', low: 'Low', high: 'High' };
  const items = (props.items as Array<{ name: string; x: number; y: number; highlight?: boolean }>) || [];
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.3, w: 9, h: 0.45, text: title, fontSize: 26, bold: true, color: COLORS.textPrimary },
  );

  const mapX = 1.5;
  const mapY = 1.0;
  const mapW = 7.0;
  const mapH = 4.0;

  // Background quadrants
  elements.push(
    { type: 'rect', x: mapX, y: mapY, w: mapW / 2, h: mapH / 2, fill: '#F0FDF4', line: { color: COLORS.border, width: 3 } },
    { type: 'rect', x: mapX + mapW / 2, y: mapY, w: mapW / 2, h: mapH / 2, fill: '#ECFDF5', line: { color: COLORS.border, width: 3 } },
    { type: 'rect', x: mapX, y: mapY + mapH / 2, w: mapW / 2, h: mapH / 2, fill: COLORS.surface, line: { color: COLORS.border, width: 3 } },
    { type: 'rect', x: mapX + mapW / 2, y: mapY + mapH / 2, w: mapW / 2, h: mapH / 2, fill: '#F9FAFB', line: { color: COLORS.border, width: 3 } },
  );

  // Axis labels
  elements.push(
    // X-axis
    { type: 'text', x: mapX, y: mapY + mapH + 0.1, w: mapW, h: 0.3, text: xAxis.label, fontSize: 13, bold: true, color: COLORS.textPrimary, align: 'center' },
    { type: 'text', x: mapX, y: mapY + mapH + 0.1, w: 1, h: 0.3, text: xAxis.low, fontSize: 12, color: COLORS.textSecondary },
    { type: 'text', x: mapX + mapW - 1, y: mapY + mapH + 0.1, w: 1, h: 0.3, text: xAxis.high, fontSize: 12, color: COLORS.textSecondary, align: 'right' },
    // Y-axis
    { type: 'text', x: mapX - 1.2, y: mapY + mapH / 2 - 0.15, w: 1, h: 0.3, text: yAxis.label, fontSize: 13, bold: true, color: COLORS.textPrimary, align: 'right' },
    { type: 'text', x: mapX - 1.0, y: mapY + mapH - 0.3, w: 0.8, h: 0.3, text: yAxis.low, fontSize: 12, color: COLORS.textSecondary, align: 'right' },
    { type: 'text', x: mapX - 1.0, y: mapY, w: 0.8, h: 0.3, text: yAxis.high, fontSize: 12, color: COLORS.textSecondary, align: 'right' },
  );

  // Plot items
  items.forEach((item) => {
    const dotX = mapX + item.x * mapW;
    const dotY = mapY + (1 - item.y) * mapH;
    const dotSize = item.highlight ? 0.6 : 0.45;

    elements.push(
      { type: 'ellipse', x: dotX - dotSize / 2, y: dotY - dotSize / 2, w: dotSize, h: dotSize, fill: item.highlight ? COLORS.accent : COLORS.textSecondary, line: { color: item.highlight ? COLORS.accent : COLORS.textSecondary, width: 0 } },
      { type: 'text', x: dotX - 0.8, y: dotY + dotSize / 2 + 0.05, w: 1.6, h: 0.3, text: item.name, fontSize: 12, bold: item.highlight, color: item.highlight ? COLORS.accent : COLORS.textPrimary, align: 'center' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Data Flow Component - Source to destination flow with steps
const dataFlowMeta: IRComponentMeta = {
  id: 'data-flow',
  name: '데이터 흐름',
  category: 'ecosystem',
  description: '소스에서 목적지까지 데이터 흐름',
  defaultProps: {
    title: 'Data Pipeline',
    sources: ['CRM Data', 'Web Analytics', 'API Events'],
    steps: [
      { name: 'Ingest', description: 'Collect & validate' },
      { name: 'Process', description: 'Transform & enrich' },
      { name: 'Store', description: 'Index & archive' },
    ],
    destinations: ['Dashboard', 'Reports', 'Alerts'],
  },
  propSchema: {},
};

function renderDataFlow(props: Record<string, unknown>): IRComponentRenderResult {
  const title = (props.title as string) || 'Data Flow';
  const sources = (props.sources as string[]) || [];
  const steps = (props.steps as Array<{ name: string; description: string }>) || [];
  const destinations = (props.destinations as string[]) || [];
  const elements: PPTXElement[] = [];

  // Title
  elements.push(
    { type: 'text', x: 0.5, y: 0.3, w: 9, h: 0.45, text: title, fontSize: 26, bold: true, color: COLORS.textPrimary },
  );

  const sourceX = 0.5;
  const stepsStartX = 2.3;
  const destX = 8.5;
  const sourceWidth = 1.5;
  const stepWidth = 1.7;
  const stepGap = 0.3;
  const destWidth = 1.2;

  // Sources (left side)
  elements.push(
    { type: 'text', x: sourceX, y: 0.9, w: sourceWidth, h: 0.3, text: 'SOURCES', fontSize: 12, bold: true, color: COLORS.textSecondary, align: 'center' },
  );

  sources.slice(0, 3).forEach((source, i) => {
    const y = 1.3 + i * 1.2;
    elements.push(
      { type: 'rect', x: sourceX, y, w: sourceWidth, h: 0.8, fill: '#FFFFFF', line: { color: COLORS.border, width: 3 } },
      { type: 'text', x: sourceX, y, w: sourceWidth, h: 0.8, text: source, fontSize: 13, color: COLORS.textPrimary, align: 'center', valign: 'middle' },
    );
    // Arrow from source
    elements.push(
      { type: 'text', x: sourceX + sourceWidth + 0.1, y: y + 0.25, w: 0.4, h: 0.3, text: '→', fontSize: 14, color: COLORS.accent },
    );
  });

  // Processing steps (center)
  steps.slice(0, 3).forEach((step, i) => {
    const x = stepsStartX + i * (stepWidth + stepGap);
    const y = 1.8;

    elements.push(
      { type: 'rect', x, y, w: stepWidth, h: 2.2, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
      { type: 'text', x, y: y + 0.3, w: stepWidth, h: 0.4, text: step.name, fontSize: 13, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
      { type: 'text', x: x + 0.4, y: y + 0.9, w: stepWidth - 0.2, h: 0.8, text: step.description, fontSize: 13, color: 'rgba(255,255,255,0.85)', align: 'center', valign: 'top' },
    );

    // Step number
    elements.push(
      { type: 'ellipse', x: x + stepWidth / 2 - 0.2, y: y - 0.25, w: 0.4, h: 0.4, fill: '#FFFFFF', line: { color: COLORS.accent, width: 3 } },
      { type: 'text', x: x + stepWidth / 2 - 0.2, y: y - 0.25, w: 0.4, h: 0.4, text: String(i + 1), fontSize: 12, bold: true, color: COLORS.accent, align: 'center', valign: 'middle' },
    );

    // Arrow between steps
    if (i < steps.length - 1) {
      elements.push(
        { type: 'text', x: x + stepWidth + 0.05, y: y + 0.9, w: 0.2, h: 0.3, text: '▶', fontSize: 13, color: '#FFFFFF' },
      );
    }
  });

  // Destinations (right side)
  elements.push(
    { type: 'text', x: destX, y: 0.9, w: destWidth, h: 0.3, text: 'OUTPUTS', fontSize: 12, bold: true, color: COLORS.textSecondary, align: 'center' },
  );

  destinations.slice(0, 3).forEach((dest, i) => {
    const y = 1.3 + i * 1.2;
    // Arrow to destination
    elements.push(
      { type: 'text', x: destX - 0.5, y: y + 0.25, w: 0.4, h: 0.3, text: '→', fontSize: 14, color: COLORS.accent },
    );
    elements.push(
      { type: 'rect', x: destX, y, w: destWidth, h: 0.8, fill: COLORS.accent, line: { color: COLORS.accent, width: 0 } },
      { type: 'text', x: destX, y, w: destWidth, h: 0.8, text: dest, fontSize: 13, bold: true, color: '#FFFFFF', align: 'center', valign: 'middle' },
    );
  });

  return { elements, width: 10, height: 5.625 };
}

// Register components
registry.register(hubSpokeMeta, renderHubSpoke);
registry.register(integrationMapMeta, renderIntegrationMap);
registry.register(valueChainMeta, renderValueChain);
registry.register(platformOverviewMeta, renderPlatformOverview);
registry.register(marketMapMeta, renderMarketMap);
registry.register(dataFlowMeta, renderDataFlow);

export { hubSpokeMeta, integrationMapMeta, valueChainMeta, platformOverviewMeta, marketMapMeta, dataFlowMeta };
