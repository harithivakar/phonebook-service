import { Request, Response } from "express";
import { inject } from "inversify";
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
} from "inversify-express-utils";
import Constants from "../constants/Constants";
import { IGroup } from "../models/Group";
import { GroupService } from "../services/Group";
import { group } from "../types/group";

@controller(`${Constants.CONTEXT_PATH}/groups`)
export class GroupController {
  constructor(@inject(GroupService) private groupService: GroupService) {}

  @httpGet("/")
  public async allGroups(req: Request, res: Response): Promise<void> {
    const group: IGroup[] = await this.groupService.getAllEntities();
    res.json(group);
  }

  @httpGet("/:id")
  public async viewContact(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const group: IGroup = await this.groupService.getEntityById(id);
    res.json(group);
  }

  @httpPost("/")
  public async creategroup(req: Request, res: Response): Promise<void> {
    const data: group = { ...req.body };

    const result: IGroup = await this.groupService.createEntity(data);

    res
      .status(200)
      .location(`${Constants.CONTEXT_PATH}/groups/${result._id}`);

    res.json({ status: "Success" });
  }

  @httpPut("/:id")
  public async updategroup(req: Request, res: Response): Promise<void> {
    const data: group = { ...req.body };
    const { id } = req.params;

    const result: IGroup = await this.groupService.updateEntity(id, data);

    res.json({ status: "Success" });
  }

  @httpDelete("/:id")
  public async deletegroup(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    await this.groupService.deleteEntity(id);

    res.json({ status: "Success" });
  }
}
