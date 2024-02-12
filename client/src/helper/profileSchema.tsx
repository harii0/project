import * as z from "zod";
const profileSchema = z.object({
  email: z.string().email(),
  bio: z
    .string()
    .min(30, { message: "Bio must be at least 10 characters long." })
    .max(100, { message: "Maximum length" }),
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters long.",
    })
    .max(20),
  age: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Age must be a number.",
  }),
  
});
export default profileSchema;
