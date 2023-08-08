import type { NextPage } from 'next'
import { useUserContext } from '@/context/user.context'
import LoginForm from '@/components/LoginForm'
import Link from 'next/link'

const Home: NextPage = () => {

  const user = useUserContext()

  if (!user) {
    return <LoginForm />
  }

  return <div>
    <Link href='/stamps/new'>
    Create Stamp
    </Link>
  </div>
}

export default Home