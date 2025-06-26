/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop()
    phoneNumber?: string;

    @Prop({ default: 'user' })
    role: 'user' | 'admin';
}

export const UserSchema = SchemaFactory.createForClass(User);
