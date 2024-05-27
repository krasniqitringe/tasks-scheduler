import { Injectable, NestMiddleware, NotFoundException } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose";

@Injectable()
export class IdValidationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    if (!isValidObjectId(id)) {
      throw new NotFoundException("Invalid ID");
    }

    next();
  }
}
