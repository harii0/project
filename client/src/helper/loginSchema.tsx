import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 6 characters long." })
    .max(16, { message: "Password must be at most 12 characters long." })
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
        message: "Invalid password format.",
      }
    ),
});
export default loginSchema;
