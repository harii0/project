import * as z from "zod";

const signUpSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" })
      .max(20, {
        message: "Username must be at most 20 characters",
      }),
    email: z.string().email(),
    dob: z.date({
      required_error: "A date of birth is required.",
    }),

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
          message:
            "Password must contain at least one uppercase, one lowercase, one special character, and one number.",
        }
      ),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match.",
    path: ["confirm"],
  });

export default signUpSchema;
