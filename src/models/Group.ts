import * as mongoose from "mongoose";
import { Document, Schema } from "mongoose";

interface IGroup extends Document {
  name: string;
  members: object;
}

const groupSchema: Schema = new Schema({
  name: String,
  members: Object
},{versionKey: false});

const GroupModel = mongoose.model<IGroup>("Contact", groupSchema);

export { IGroup, GroupModel };