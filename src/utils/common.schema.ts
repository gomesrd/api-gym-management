import {z} from "zod";

export const daysOfWeek = z.enum([
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]);

export const usersRole = {
  role: z.enum(['admin', 'employee', 'member']),
}

export const trainingModalities = z.enum(['pilates', 'functional']);

export const personalTrainerOccupation = z.enum(['physical_educator', 'physiotherapist']);

export const trainingStatus = z.enum(['realized', 'foul']);

export const trainingTypes = z.enum(['plan', 'singular', 'replacement']);

const filtersSchema = z.object({
  cpf: z.string().optional(),
  created_at_gte: z.string().optional(),
  created_at_lte: z.string().optional(),
  deleted: z.string().default('true').optional(),
  email: z.string().optional(),
  fixed_day: daysOfWeek.optional(),
  id: z.string().optional(),
  member_id: z.string().optional(),
  modality: trainingModalities.optional(),
  name: z.string().optional(),
  occupation: personalTrainerOccupation.optional(),
  personal_trainer_id: z.string().optional(),
  single_date: z.string().optional(),
  status: trainingStatus.optional(),
  start_time: z.string().optional(),
  training_id: z.string().optional(),
  type: trainingTypes.optional(),
});

export const usersAddress = {
  users_address: z.object({
    address: z.string(),
    address_number: z.string(),
    address_complement: z.string().nullable(),
    address_neighborhood: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string().nullable(),
    zip_code: z.string(),
  }),
};

export const userCore = {
  name: z.string(),
  cpf: z.string(),
  birth_date: z.string(),
  email: z.string().email(),
  phone: z.string(),
};

export const userPassword = {
  password: z.string()
};

export const dateCreatedUpdated = {
  created_at: z.date().nullable(),
  updated_at: z.date().nullable(),
};

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export const loginResponseSchema = z.object({
  accessToken: z.string(),
});

export type Filters = z.infer<typeof filtersSchema>;
export type LoginInput = z.infer<typeof loginSchema>

