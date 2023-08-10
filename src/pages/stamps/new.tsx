
import { useForm } from "react-hook-form"
import { trpc } from "@/utils/trpc"
import { CreateStampInput } from "@/schema/stamp.schema"
import { useRouter } from "next/router"
import { useState } from "react"
import BezierCurveEditor from "@/components/BezierGradient"
function CreateStampPage() {
  const [points, setPoints] = useState({
    start: { x: 0, y: 0 },
    control1: { x: 10, y: 100 },
    control2: { x: 0, y: 290 },
    end: { x: 500, y: 0 }
  });

  const [colors, setColors] = useState(["#FF5733", "#33D7FF"])

  const {handleSubmit, register, setValue} = useForm<CreateStampInput>()

  const router = useRouter()
  const {mutate, error} = trpc.useMutation(['stamps.create-stamp'], {
    onSuccess({id}) {
      router.push(`/stamps/${id}`)
    }
  })
  

  function onSubmit(values: CreateStampInput) {
    values.price = Number(values.price)
    values.gradient = Number(values.gradient)
    mutate(values)
  }

  function handleSliderChange(value) {
    setPoints(prevPoints => ({
      ...prevPoints,
      control2: {
        ...prevPoints.control2,
        y: value
      }
    }))

    setValue('gradient', value)
  }
  return <form onSubmit={handleSubmit(onSubmit)}>
    {error && error.message}
    <h1>Create Stamps</h1>

    <BezierCurveEditor 
      points={points}
      value={points.control2.y}
      handleSliderChange={handleSliderChange}
      colors={colors}
    />

    <input type="hidden" {...register('gradient')} value={points.control2.y} />

    <input
    type="number"
    placeholder="price of stamp"
      {...register('price')}
    />
    <label>
    <input
    type="color"
    value={colors[0]}
    {...register('color1')}
    onChange={(e)=> setColors([e.target.value, colors[1]])}
    />
    </label>
    <br />

    <label>
    <input
    type="color"
    value={colors[1]}
    {...register('color2')}
    onChange={(e)=> setColors([colors[0], e.target.value])}
    
    />
    </label>

    <br />

    <button>Create stamp</button>
  </form>
}


export default CreateStampPage