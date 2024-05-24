import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = HydratedDocument<User>;

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Schema({ timestamps: true })
export class User {
  @ApiProperty({
    example: '60576c54a9e439001e5bc21b',
    description: 'The ID of the user',
  })
  @Prop({ required: false })
  id: string;

  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  @Prop({ required: true })
  firstname: string;

  @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
  @Prop({ required: true })
  lastname: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email address of the user',
  })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({
    example: 'strongpassword123',
    description: 'The password of the user',
  })
  @Prop({ required: true })
  password: string;

  @ApiProperty({
    example: 'user',
    description: 'The role of the user',
    enum: UserRole,
    default: UserRole.USER,
  })
  @Prop({ enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @ApiProperty({
    example: 'https://example.com/profile.jpg',
    description: 'The profile image URL of the user',
    required: false,
  })
  @Prop()
  profileImage: string;

  @ApiProperty({
    example: '2023-05-19T00:00:00Z',
    description: 'The creation date of the user',
    required: false,
  })
  @Prop()
  createdAt?: Date;

  @ApiProperty({
    example: '2023-05-19T00:00:00Z',
    description: 'The last update date of the user',
    required: false,
  })
  @Prop()
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
