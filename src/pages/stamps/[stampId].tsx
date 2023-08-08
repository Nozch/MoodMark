import { useRouter } from "next/router"
import { trpc } from "@/utils/trpc"
import Error from "next/error"

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
  const gradientStyle = {
    background: `linear-gradient(45deg, ${data.color1}, ${data.color2}`,
    width: '160px',
    height: '200px',
    display: 'flex',
    justifyContent: 'center',
    color: 'white'
  }
  return (
    <div style={gradientStyle}>
      {data.price}
    </div>
  )
}

export default SingleStampPage