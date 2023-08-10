type Point = {
  x: number
  y: number
}

type BezierCurveEditorProps = {
  points: {
    start: Point;
    control1: Point;
    control2: Point;
    end: Point;
  }
  handleSliderChange: (value: number) => void;
  colors: [string, string]
}

const svg_width = "400" // スライダーとグラデーションフィールドの幅を合わせる

function BezierCurveEditor({ points, handleSliderChange, colors }: BezierCurveEditorProps) {

  const pathData = `M${points.start.x} ${points.start.y} C${points.control1.x} ${points.control1.y}, ${points.control2.x} ${points.control2.y}, ${points.end.x} ${points.end.y}`;


  return (
    <div>
      {/* gradient UI */}
      <div>
        <input
          type="range"
          min="290"
          max="2000"
          value={points.control2.y}
          onChange={e => handleSliderChange(Number(e.target.value))}
          style={{ width: svg_width + "px", display: 'block' }}
        />
      </div>
      {/* Preview */}
      <svg width={svg_width} height="600">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color={colors[0]} />
            <stop offset="100%" stop-color={colors[1]} />
          </linearGradient>
        </defs>
        <path d={pathData} fill="none" stroke="url(#gradient)" strokeWidth="1000" />
      </svg>
    </div>
  );
}

export default BezierCurveEditor;
