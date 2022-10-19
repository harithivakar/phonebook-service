import { Model } from "mongoose";
import { provideSingleton } from "../IOC/ioc";
import { GroupModel, IGroup } from "../models/Group";
import { group } from "../types/group";
import { BaseService } from "./Base";

@provideSingleton(GroupService)
export class GroupService extends BaseService<IGroup, group> {
  public getModel(): Model<IGroup> {
    return GroupModel;
  }

  public async getEntityByName(name: string): Promise<IGroup> {
    return this.getModel().findOne({name: name});
  }
}
