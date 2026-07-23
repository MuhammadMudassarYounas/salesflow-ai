import { z } from "zod";
import { CustomerStatus } from "../../../common/constants/customer-status";
import { LeadSource } from "../../../common/constants/lead-source";

export const createCustomerSchema = z.object({
  firstName: z.string().trim().min(2).max(50),

  lastName: z.string().trim().min(2).max(50),

  email: z.string().trim().email().toLowerCase(),

  phone: z.string().optional(),

  companyName: z.string().trim().optional(),

  jobTitle: z.string().trim().optional(),

  city: z.string().trim().optional(),

  country: z.string().trim().optional(),

  leadSource: z.nativeEnum(LeadSource).optional(),

  status: z.nativeEnum(CustomerStatus).optional(),

  assignedTo: z.string().optional(),
});

export type CreateCustomerDto = z.infer<typeof createCustomerSchema>;