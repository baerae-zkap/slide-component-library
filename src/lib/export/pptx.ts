import type { IRComponentRenderResult } from '@/types';

export async function exportToPPTX(
  components: IRComponentRenderResult[],
  filename: string = 'ir-components'
): Promise<void> {
  // Dynamic import to avoid bundling Node.js modules in client
  const PptxGenJS = (await import('pptxgenjs')).default;

  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'IR Components Library';
  pptx.title = filename;

  for (const component of components) {
    const slide = pptx.addSlide();

    for (const el of component.elements) {
      const baseProps = {
        x: el.x,
        y: el.y,
        w: el.w,
        h: el.h,
      };

      if (el.type === 'text') {
        slide.addText(el.text || '', {
          ...baseProps,
          fontSize: el.fontSize || 14,
          fontFace: 'Arial',
          color: el.color?.replace('#', '') || '333333',
          bold: el.bold || false,
          align: el.align || 'left',
          valign: el.valign || 'middle',
        });
      } else if (el.type === 'rect') {
        slide.addShape('rect', {
          ...baseProps,
          fill: { color: el.fill?.replace('#', '') || 'FFFFFF' },
          line: el.line ? {
            color: el.line.color.replace('#', ''),
            width: el.line.width
          } : { color: 'FFFFFF', width: 0 },
        });
      } else if (el.type === 'ellipse') {
        slide.addShape('ellipse', {
          ...baseProps,
          fill: { color: el.fill?.replace('#', '') || 'FFFFFF' },
        });
      } else if (el.type === 'line') {
        slide.addShape('line', {
          ...baseProps,
          line: { color: el.line?.color?.replace('#', '') || '333333', width: el.line?.width || 1 },
        });
      }
    }
  }

  await pptx.writeFile({ fileName: `${filename}.pptx` });
}

export async function exportSingleComponent(
  component: IRComponentRenderResult,
  filename: string = 'component'
): Promise<void> {
  return exportToPPTX([component], filename);
}
