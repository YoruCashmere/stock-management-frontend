
import { z } from "zod"
import zxcvbn from "zxcvbn";

const strongPasswordSchema = z.string()
    .min(8, {
        error: "Password must contain at least 8 characters."
    })
    .superRefine((value, ctx) => {
        if (value.length < 8) {
            return;
        }
        const result = zxcvbn(value);
        if (result.score < 3) {
            ctx.addIssue({
                code: "custom",
                message:
                    result.feedback.warning ||
                    result.feedback.suggestions[0] ||
                    "Please choose a stronger password."
            });
        }
    });
export const loginSchema = z.object({
    userName: z.string().trim().min(1, {
        message: "User name is required."
    }),

    password: z.string().min(1, {
        error: "Password is required."
    })
})
export const registerSchema = z.object({
    userName: z.string().trim().min(1, {
        message: "User name is required."
    }),

    password: strongPasswordSchema,
    role: z.string().min(1, {
        message: "role is required "
    })
})

export const profileSchema = z.object({
    userName: z.string().trim().min(3, {
        message: "Username must contain at least 3 characters."
    }),

    email: z.email({
        error: "Please enter a valid email address."
    }),

    tel: z.string()
        .trim()
        .min(1, {
            message: "Phone number is required."
        })
        .max(20, {
            message: "Phone number is too long."
        }),

    password: strongPasswordSchema,

    dateOfBirth: z.iso.date({
        error: "Please enter a valid date of birth."
    }),

    sex: z.enum(["M", "F", "O"], {
        error: "Please select a valid option."
    })
})

export type LoginFormData = z.infer<typeof loginSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;