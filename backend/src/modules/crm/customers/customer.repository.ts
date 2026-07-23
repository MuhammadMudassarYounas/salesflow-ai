import { Customer } from "./customer.model";
import { ICustomer } from "./customer.types";

class CustomerRepository {
  async findByEmail(email: string) {
    return Customer.findOne({ email });
  }

  async findById(id: string) {
    return Customer.findById(id);
  }

  async findAll() {
    return Customer.find()
      .populate("assignedTo", "firstName lastName email")
      .populate("createdBy", "firstName lastName email");
  }

  async create(data: Partial<ICustomer>) {
    return Customer.create(data);
  }

  async update(id: string, data: Partial<ICustomer>) {
    return Customer.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async delete(id: string) {
    return Customer.findByIdAndDelete(id);
  }
}

export const customerRepository = new CustomerRepository();