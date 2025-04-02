import { z } from "zod";

export const LoginSchema = z.object({
  spClientID: z.string().nonempty(),
  spClientSecret: z.string().nonempty(),
  acoustKey: z.string().nonempty().optional(),
});
