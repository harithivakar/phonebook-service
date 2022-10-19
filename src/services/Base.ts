import { injectable } from "inversify";
import { Model, Document, Query } from "mongoose";

@injectable()
export abstract class BaseService<T, D> {
  public abstract getModel(): Model<T>;

  public async getAllEntities(): Promise<T[]> {
    return await this.getModel().find({});
  }

  public async getEntityById(id: string): Promise<T> {
    return await this.getModel().findById(id);
  }

  public async createEntity(data: D): Promise<T> {
    return await this.getModel().create(data);
  }

  public async updateEntity(id: string, data: D): Promise<T> {
    return await this.getModel().findByIdAndUpdate(id, data);
  }

  public async deleteEntity(id: string): Promise<void> {
    return await this.getModel().findByIdAndDelete(id);
  }
}
