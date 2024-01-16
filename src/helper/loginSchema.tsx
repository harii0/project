import * as z from "zod";

const loginSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  email: z.string().email(),
  confirm: z.string(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(10, { message: "Password must be at most 10 characters long." })
    .refine(
      (password) => {
        const containsUppercase = /[A-Z]/.test(password);
        const containsLowercase = /[a-z]/.test(password);
        const containsSpecialChar =
          /[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?~ ]/.test(password);
        const containsNumber = /\d/.test(password);

        return (
          containsUppercase &&
          containsLowercase &&
          containsSpecialChar &&
          containsNumber
        );
      },
      {
        message:
          "Password must contain at least one uppercase, one lowercase, one special character, and one number.",
      }
    ),
});

export default loginSchema;
