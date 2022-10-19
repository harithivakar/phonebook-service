import { Model } from "mongoose";
import { provideSingleton } from "../IOC/ioc";
import { ContactModel, IContact } from "../models/Contact";
import { contact } from "../types/contact";
import { BaseService } from "./Base";

@provideSingleton(ContactService)
export class ContactService extends BaseService<IContact, contact> {
  public getModel(): Model<IContact> {
    return ContactModel;
  }

  public async getEntityByName(name: string): Promise<IContact> {
    return this.getModel().findOne({name: name});
  }
}
