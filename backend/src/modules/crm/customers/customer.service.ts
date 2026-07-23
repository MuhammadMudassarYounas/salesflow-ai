import mongoose from "mongoose";
import { customerRepository } from "./customer.repository";
import { CreateCustomerDto } from "./customer.validation";
import { ValidationError } from "../../../common/errors/ValidationError";
import { NotFoundError } from "../../../common/errors/NotFoundError";

class CustomerService {
  async create(data: CreateCustomerDto, createdBy: string) {
    const existing = await customerRepository.findByEmail(data.email);

    if (existing) {
      throw new ValidationError("Customer already exists");
    }

    return customerRepository.create({
      ...data,
      assignedTo: data.assignedTo
        ? new mongoose.Types.ObjectId(data.assignedTo)
        : undefined,
      createdBy: new mongoose.Types.ObjectId(createdBy),
    });
  }

  async getAll() {
    return customerRepository.findAll();
  }

  async getById(id: string) {
    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new NotFoundError("Customer not found");
    }

    return customer;
  }

  async update(id: string, data: Partial<CreateCustomerDto>) {
    const updateData = {
      ...data,
      assignedTo: data.assignedTo
        ? new mongoose.Types.ObjectId(data.assignedTo)
        : undefined,
    };

    const customer = await customerRepository.update(id, updateData);

    if (!customer) {
      throw new NotFoundError("Customer not found");
    }

    return customer;
  }

  async delete(id: string) {
    const customer = await customerRepository.delete(id);

    if (!customer) {
      throw new NotFoundError("Customer not found");
    }

    return {
      message: "Customer deleted successfully",
    };
  }
}

export const customerService = new CustomerService();