import { trpc } from "@/utils/trpc"
import Link from "next/link"

function StampListingPage() {
  const {data, isLoading} = trpc.useQuery(['stamps.stamps'])

  if(isLoading) {
    return <p>Loading...</p>
  }

  return (
  <div>
    {data?.map(stamp => {
      const createdAtDate = new Date(stamp.createdAt).toLocaleString();
      return (
        <article key={stamp.id}>
          <p>{createdAtDate}</p>
          <Link href={`/stamps/${stamp.id}`}>View Stamp</Link>
        </article>
      )
    })}
  </div>
  )
}

export default StampListingPage