import { z } from 'zod';

export const createStampSchema = z.object({
  gradientColor1: z.string(), // グラデーションの色1
  gradientColor2: z.string(), // グラデーションの色2
  gradientStyle: z.string(), // グラデーションのスタイル
  mainFigure: z.string(), // 切手の主役
  price: z.number().max(100), // 切手の値段として入る数字
  frame: z.string(), // 切手の枠
  controlPoints: z.array(
    z.object({
      x: z.number(),
      y: z.number(),
    })
  ),
})

export type CreateStampInput = z.TypeOf<typeof createStampSchema>

export const getSingleStampSchema = z.object({
  stampId: z.string().uuid(),
})
