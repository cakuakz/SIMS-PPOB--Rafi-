import { capitalCase } from "text-case";
import { z } from "zod";
import { LANGUAGE } from "../constants/language";

const requiredField = capitalCase(LANGUAGE.VALIDATION.REQUIRED_FIELD)

export const RegisterSchema = z.object({
    email: z.string().email().min(1, { messgae: requiredField }),
    first_name: z.string().min(1, { message: requiredField }),
    last_name: z.string().min(1, { message: requiredField }),
    password: z.string().min(1, { message: requiredField }),
    confirm_password: z.string().min(1, { message: requiredField })
})

export const LoginSchema = z.object({
    email: z.string().email().min(1, { messgae: requiredField }),
    password: z.string().min(1, { message: requiredField })
})

export const EditUserScheam = z.object({
    first_name: z.string().min(1, { message: requiredField }),
    last_name: z.string().min(1, { message: requiredField }),
})