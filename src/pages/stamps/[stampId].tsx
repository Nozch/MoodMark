import { useRouter } from "next/router"
import { trpc } from "@/utils/trpc"
import Error from "next/error"
import BezierGradientPreview from "@/components/BezierGradientPreview"

function SingleStampPage() {
  const router = useRouter()

  
  const stampId = router.query.stampId as string

  const { data, isLoading } = trpc.useQuery(['stamps.single-stamp', { stampId }])

  if (isLoading) {
    return <p>Loading stamps...</p>
  }

  if(!data) {
    return <Error statusCode={404}/>
  }
  
  return (
    <div className="gradientContainer">
      <span className="priceLabel">{data.price}</span>
      <BezierGradientPreview control2Y={data.gradient} colors={[data.color1, data.color2]}/>
    </div>
  )
}

export default SingleStampPage