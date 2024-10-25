import { z } from "zod";

const schema = z.object({
  username: z.string().length(14),
  password: z.string().min(8).max(72),
});

export default schema;
export type schemaT = z.infer<typeof schema>;
