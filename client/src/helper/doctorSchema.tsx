import { z } from "zod";

const RegistrationSchema = z.object({
  username: z.string().min(2),
  bio: z.string().min(10),
  profilePicture: z.string(),
  phoneNumber: z.string().regex(/^\d{10}$/),
  address: z.string(),
  city: z.string(),
  website: z.string().url().optional(),
  experience: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string",
  }),
  availabilityFrom: z.string(),
  availabilityTo: z.string(),
  file: z.custom((file) => {
    if (file) {
      return true;
    }
    return false;
  }),
});

export default RegistrationSchema;
