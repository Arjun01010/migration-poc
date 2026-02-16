import { Schema } from 'mongoose';

export const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    sqlUserId: { type: Number },
  },
  {
    timestamps: true,
    collection: 'users', 
  },
);
