import { Request, Response } from "express";
import { customerService } from "./customer.service";
import { ApiResponse } from "../../../common/utils/ApiResponse";

class CustomerController {
  async create(req: Request, res: Response) {
    const customer = await customerService.create(
      req.body,
      req.user!.id
    );

    return ApiResponse.created(
      res,
      "Customer created successfully",
      customer
    );
  }

  async getAll(req: Request, res: Response) {
    const customers = await customerService.getAll();

    return ApiResponse.success(
      res,
      "Customers fetched successfully",
      customers
    );
  }

  async getById(req: Request, res: Response) {
    const customer = await customerService.getById(
      req.params.id as string
    );

    return ApiResponse.success(
      res,
      "Customer fetched successfully",
      customer
    );
  }

  async update(req: Request, res: Response) {
    const customer = await customerService.update(
      req.params.id as string,
      req.body
    );

    return ApiResponse.success(
      res,
      "Customer updated successfully",
      customer
    );
  }

  async delete(req: Request, res: Response) {
    await customerService.delete(req.params.id as string);

    return ApiResponse.noContent(res);
  }
}

export const customerController = new CustomerController();