import dynamic from "next/dynamic";

const BezierGradient = dynamic(() => import('@/components/BezierGradient'), {ssr: false})
function BezierPage() {
  return <div>
    <BezierGradient />
  </div>
}

export default BezierPage;
