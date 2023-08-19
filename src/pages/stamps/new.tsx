import { Center, NumberInput, NumberIncrementStepper, NumberInputField, NumberInputStepper, NumberDecrementStepper, Button, VStack, Box, Input, Flex } from '@chakra-ui/react'
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
      <Flex flexDirection="column">
        <Flex alignItems="center">
          <Input
          type="color"
          value={colors[0]}
          {...register('color1')}
          onChange={(e) => setColors([e.target.value, colors[1]])}
          />
        </Flex>
        <Flex alignItems="center">
        <Input
          type="color"
          value={colors[1]}
          {...register('color2')}
          onChange={(e) => setColors([colors[0], e.target.value])}

        />
      </Flex>
      </Flex>
      <BezierCurveEditor
        points={points}
        value={points.control2.y}
        handleSliderChange={handleSliderChange}
        colors={colors}
      />
      
    </Center>
    <input type="hidden" {...register('gradient')} value={points.control2.y} />
    <Center>
      <Controller
        name="price"
        control={control}
        defaultValue={0}
        render={({field: { onChange, onBlur, value }}) => (
          <NumberInput
            min={0}
            max={100}
            value={value}
            onChange={(valueAsString, valueAsNumber) => 
              onChange(valueAsNumber)}
            onBlur={onBlur}
          >
            <NumberInputField placeholder="price of stamp"/>
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
          </NumberInput>
        )}
        />
      </Center>
      <VStack spacing={4}>
      <Box>
      
      </Box>
     <Box> 
     </Box>
    </VStack>
      <Button colorScheme='teal' variant='outline'>Create</Button>

  </form>
}


export default CreateStampPage