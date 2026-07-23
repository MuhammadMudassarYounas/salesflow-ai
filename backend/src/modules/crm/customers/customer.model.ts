import { Schema, model } from "mongoose";
import { CustomerDocument } from "./customer.types";
import { CustomerStatus } from "../../../common/constants/customer-status";
import { LeadSource } from "../../../common/constants/lead-source";

const customerSchema = new Schema<CustomerDocument>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },

    phone: String,

    company: String,

    jobTitle: String,

    leadSource: {
      type: String,
      enum: Object.values(LeadSource),
      default: LeadSource.WEBSITE,
    },

    status: {
      type: String,
      enum: Object.values(CustomerStatus),
      default: CustomerStatus.LEAD,
    },

    city: String,

    country: String,

    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Customer = model<CustomerDocument>(
  "Customer",
  customerSchema
);