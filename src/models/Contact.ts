import * as mongoose from "mongoose";
import { Document, Schema } from "mongoose";

interface IContact extends Document {
  name: string;
  phoneNumber: string;
  email: string;
}

const contactSchema: Schema = new Schema({
  name: String,
  phoneNumber: String,
  email: String
},{versionKey: false});

const ContactModel = mongoose.model<IContact>("Contact", contactSchema);

export { IContact, ContactModel };
