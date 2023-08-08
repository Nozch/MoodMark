
import { useForm } from "react-hook-form"
import { trpc } from "@/utils/trpc"
import { CreateStampInput } from "@/schema/stamp.schema"
import { useRouter } from "next/router"

function CreatePostPage() {
  const {handleSubmit, register, setValue} = useForm<CreateStampInput>()

  const router = useRouter()
  const {mutate, error} = trpc.useMutation(['stamps.create-stamp'], {
    onSuccess({id}) {
      router.push(`/stamps/${id}`)
    }
  })
  

  function onSubmit(values: CreateStampInput) {
    values.price = Number(values.price)
    mutate(values)
  }
  return <form onSubmit={handleSubmit(onSubmit)}>
    {error && error.message}
    <h1>Create Stamps</h1>

    <input
    type="number"
    placeholder="price of stamp"
      {...register('price')}
    />
    <label>
    <input
    type="color"
    onChange={(e)=> setValue('color1', e.target.value)}
    />
    </label>
    <br />

    <label>
    <input
    type="color"
    onChange={(e)=> setValue('color2', e.target.value)}
    />
    </label>

    <br />

    <button>Create stamp</button>
  </form>
}


export default CreatePostPage