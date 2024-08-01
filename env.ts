import { z } from 'zod';
import dotenv from 'dotenv';
import { X } from 'lucide-react';

dotenv.config();

const envSchema = z.object({
  HADIS_API_URL: z.string(),
  HADIS_KEY: z.string(),
});

type Env = z.infer<typeof envSchema>;

export const ENV: Env = envSchema.parse(process.env);
