import { Center, NumberInput, NumberIncrementStepper, NumberInputField, NumberInputStepper, NumberDecrementStepper, Button, VStack, Box, Input, Flex, Spacer } from '@chakra-ui/react'
import { useForm, Controller } from "react-hook-form"
import { trpc } from "@/utils/trpc"
import { CreateStampInput } from "@/schema/stamp.schema"
import { useRouter } from "next/router"
import { useState } from "react"
import BezierCurveEditor from "@/components/BezierGradient"

function CreateStampPage() {
  // 初期値 control2をユーザが操作
  const [points, setPoints] = useState({
    start: { x: 0, y: 0 },
    control1: { x: 10, y: 100 },
    control2: { x: 0, y: 290 },
    end: { x: 500, y: 0 }
  });

  const [colors, setColors] = useState<[string, string]>(["#FF5733", "#33D7FF"])

  const { control, handleSubmit, register, setValue } = useForm<CreateStampInput>()

  const router = useRouter()

  const { mutate, error } = trpc.useMutation(['stamps.create-stamp'], {
    onSuccess({ id }) {
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
    <Center>
      <h1>Create Stamps</h1>
    </Center>
    <Center>
      <Flex flexDirection="column" height="600px" position="relative">
        <Flex position="absolute" top="20" left="2" justifyContent="center" alignItems="flex-start">
          <Input
            type="color"
            value={colors[0]}
            {...register('color1')}
            onChange={(e) => setColors([e.target.value, colors[1]])}
          />
        </Flex>
        <BezierCurveEditor
          points={points}
          value={points.control2.y}
          handleSliderChange={handleSliderChange}
          colors={colors}
        />
        <Flex position="absolute" bottom="0" left="2" justifyContent="center" alignItems="flex-end">
          <Input
            type="color"
            value={colors[1]}
            {...register('color2')}
            onChange={(e) => setColors([colors[0], e.target.value])}
          />
        </Flex>
      </Flex>
    </Center>
    <input type="hidden" {...register('gradient')} value={points.control2.y} />

    <Center>
      <Box mx={140}>
      </Box>
      <Controller
        name="price"
        control={control}
        defaultValue={0}
        render={({ field: { onChange, onBlur, value } }) => (
          <NumberInput
            min={0}
            max={100}
            value={value}
            onChange={(valueAsString, valueAsNumber) =>
              onChange(valueAsNumber)}
            onBlur={onBlur}
            width="80px"
          >
            <NumberInputField placeholder="price of stamp" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        )}
      />
    </Center>

    <Box my={4}>
    </Box>

    <Center>
      <Button
        colorScheme='teal'
        variant='outline'
        type='submit'
        width={300}
      >Create
      </Button>
    </Center>
    
  </form>
}

export default CreateStampPage
