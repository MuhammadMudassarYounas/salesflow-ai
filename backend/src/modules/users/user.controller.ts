import { Request, Response } from "express";
import { userService } from "./user.service";
import { ApiResponse } from "../../common/utils/ApiResponse";

class UserController {
  create = async (req: Request, res: Response): Promise<void> => {
    const user = await userService.create(req.body);

    ApiResponse.success(
      res,
      "User created successfully",
      user,
      201
    );
  };

  getAll = async (req: Request, res: Response): Promise<void> => {
    const users = await userService.getAll();

    ApiResponse.success(
      res,
      "Users fetched successfully",
      users
    );
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    const user = await userService.getById(String(req.params.id));

    ApiResponse.success(
      res,
      "User fetched successfully",
      user
    );
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const user = await userService.update(
      String(req.params.id),
      req.body
    );

    ApiResponse.success(
      res,
      "User updated successfully",
      user
    );
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    await userService.delete(String(req.params.id));

    res.status(204).send();
  };
}

export const userController = new UserController();