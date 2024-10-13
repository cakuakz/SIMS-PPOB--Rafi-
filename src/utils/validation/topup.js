import { z } from "zod";

export const TopupSchema = z.object({
    top_up_amount: z
    .coerce
    .number()
    .min(10000, { message: "Jumlah harus setidaknya diatas Rp.10.000" })
    .max(1000000, { message: "Jumlah harus setidaknya dibawah Rp.1.000.000" })
})