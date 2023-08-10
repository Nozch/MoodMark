type BezierGradientPreviewProps = {
  control2Y: number;
  colors: [string, string];
}

function BezierGradientPreview({ control2Y, colors }: BezierGradientPreviewProps) {
  const points = {
    start: { x: 0, y: 0 },
    control1: { x: 10, y: 100 },
    control2: { x: 0, y: control2Y },
    end: { x: 500, y: 0 }
  };
  const svg_width = "400" // スライダーとグラデーションフィールドの幅を合わせる

  const pathData = `M${points.start.x} ${points.start.y} C${points.control1.x} ${points.control1.y}, ${points.control2.x} ${points.control2.y}, ${points.end.x} ${points.end.y}`;

  return (
    <svg width={svg_width} height="600">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color={colors[0]} />
          <stop offset="100%" stop-color={colors[1]} />
        </linearGradient>
      </defs>
      <path d={pathData} fill="none" stroke="url(#gradient)" strokeWidth="1000" />
    </svg>
  );
}

export default BezierGradientPreview;
