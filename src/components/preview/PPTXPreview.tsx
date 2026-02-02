'use client';

import type { PPTXElement } from '@/types';

interface PPTXPreviewProps {
  elements: PPTXElement[];
  width?: number;
  height?: number;
  className?: string;
}

export function PPTXPreview({ elements, width = 10, height = 5.625, className = '' }: PPTXPreviewProps) {
  // Convert inches to pixels (96 DPI) for viewBox
  const pxWidth = width * 96;
  const pxHeight = height * 96;

  const toPixels = (inches: number) => inches * 96;

  return (
    <svg
      viewBox={`0 0 ${pxWidth} ${pxHeight}`}
      className={`bg-white ${className}`}
      preserveAspectRatio="xMidYMid meet"
    >
      {elements.map((el, i) => {
        const x = toPixels(el.x);
        const y = toPixels(el.y);
        const w = toPixels(el.w);
        const h = toPixels(el.h);

        if (el.type === 'rect') {
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={w}
              height={h}
              fill={el.fill || '#FFFFFF'}
              stroke={el.line?.color || 'none'}
              strokeWidth={el.line?.width || 0}
            />
          );
        }

        if (el.type === 'ellipse') {
          return (
            <ellipse
              key={i}
              cx={x + w / 2}
              cy={y + h / 2}
              rx={w / 2}
              ry={h / 2}
              fill={el.fill || '#FFFFFF'}
              stroke={el.line?.color || 'none'}
              strokeWidth={el.line?.width || 0}
            />
          );
        }

        if (el.type === 'text') {
          const fontSize = el.fontSize || 14;
          const textAnchor = el.align === 'center' ? 'middle' : el.align === 'right' ? 'end' : 'start';
          const textX = el.align === 'center' ? x + w / 2 : el.align === 'right' ? x + w : x;
          const textY = el.valign === 'top' ? y + fontSize : el.valign === 'bottom' ? y + h : y + h / 2 + fontSize / 3;

          return (
            <text
              key={i}
              x={textX}
              y={textY}
              fill={el.color || '#333333'}
              fontSize={fontSize}
              fontWeight={el.bold ? 'bold' : 'normal'}
              fontFamily="system-ui, -apple-system, sans-serif"
              textAnchor={textAnchor}
            >
              {el.text}
            </text>
          );
        }

        if (el.type === 'line') {
          return (
            <line
              key={i}
              x1={x}
              y1={y}
              x2={x + w}
              y2={y + h}
              stroke={el.line?.color || '#333333'}
              strokeWidth={el.line?.width || 1}
            />
          );
        }

        return null;
      })}
    </svg>
  );
}
