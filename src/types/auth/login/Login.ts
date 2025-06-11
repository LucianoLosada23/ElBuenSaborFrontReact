import { object , type InferOutput } from "valibot";
import { emailField, passwordField} from "../register/Register";

export const loginSchema = object({
    email: emailField,
    password: passwordField
})

export type Login = InferOutput<typeof loginSchema>