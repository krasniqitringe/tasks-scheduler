import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/users/schemas/user.schema";
import * as bcrypt from "bcrypt";

@Injectable()
export class SeedDataService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  async seedIfNoUsersExist(): Promise<void> {
    const existingUsers = await this.userModel.countDocuments();
    if (existingUsers === 0) {
      await this.seedUsers();
    }
  }

  private async seedUsers(): Promise<void> {
    const users = [
      {
        firstname: "John",
        lastname: "Doe",
        email: "john@example.com",
        password: await bcrypt.hash("password123", 10),
      },
    ];

    await this.userModel.create(users);
    console.log("Seed data successfully inserted.");
  }
}
