import { z } from "zod";

export const signupSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 20 characters long")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(30, "Password must be at most 30 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, "Password must contain at least one special character"),
});

export const signinSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const contentSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title must be at most 200 characters"),
  link: z.string().url("Link must be a valid URL"),
  type: z.enum(["youtube", "twitter", "document", "image", "video", "audio", "article"]).optional(),
});

export const shareSchema = z.object({
  share: z.boolean(),
});
