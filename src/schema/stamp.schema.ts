import { z } from 'zod';

// const ControlPointSchema = z.object({
//   x: z.number(),
//   y: z.number(),
// });

// const GradientSchema = z.object({
//   color1: z.string(),
//   color2: z.string(),
//   style: z.string(),
// });

export const createStampSchema = z.object({  
  price: z.number().min(1).max(100), // 切手の値段として入る数字
  color1: z.string(),
  color2: z.string(),
  // mainFigure: z.string(), // 切手の主役
  // frame: z.string(), // 切手の枠

  // gradient: GradientSchema,
  // controlPoints: z.array(ControlPointSchema),
})

export type CreateStampInput = z.TypeOf<typeof createStampSchema>

export const getSingleStampSchema = z.object({
  stampId: z.string().uuid(),
})
