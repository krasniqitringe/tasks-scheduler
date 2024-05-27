import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...rest } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = new this.userModel({
      ...rest,
      password: hashedPassword,
    });
    const savedUser = await createdUser.save();

    return savedUser.toObject({
      getters: true,
      versionKey: false,
      transform: (_, ret) => {
        delete ret.password;
        return ret;
      },
    });
  }
  async findAll(): Promise<User[]> {
    return await this.userModel.find().select("-password");
  }

  async findByID(id: string): Promise<User> {
    return await this.userModel.findById(id).select("-password");
  }

  async findByIds(ids: string[]): Promise<User[]> {
    const users = await this.userModel.find({ _id: { $in: ids } });

    return users;
  }
  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email });
  }
  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      select: "-password",
    });
  }

  async delete(id: string) {
    return await this.userModel.findByIdAndDelete(id).select("-password");
  }
}
