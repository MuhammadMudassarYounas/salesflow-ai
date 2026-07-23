import { Document, Types } from "mongoose";
import { CustomerStatus } from "../../../common/constants/customer-status";
import { LeadSource } from "../../../common/constants/lead-source";

export interface ICustomer {
  firstName: string;
  lastName: string;

  email: string;
  phone?: string;

  company?: string;
  jobTitle?: string;

  leadSource?: LeadSource;
  status?: CustomerStatus;

  city?: string;
  country?: string;

  assignedTo?: Types.ObjectId;
  createdBy: Types.ObjectId;
}

export interface CustomerDocument extends ICustomer, Document {}