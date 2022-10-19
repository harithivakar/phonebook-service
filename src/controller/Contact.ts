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
import { IContact } from "../models/Contact";
import { ContactService } from "../services/Contact";
import { contact } from "../types/contact";

@controller(`${Constants.CONTEXT_PATH}/contacts`)
export class ContactController {
  constructor(@inject(ContactService) private contactService: ContactService) {}

  @httpGet("/")
  public async allContacts(req: Request, res: Response): Promise<void> {
    const contacts: IContact[] = await this.contactService.getAllEntities();
    res.json(contacts);
  }

  @httpGet("/:id")
  public async viewContact(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const contact: IContact = await this.contactService.getEntityById(id);
    res.json(contact);
  }

  @httpPost("/")
  public async createContact(req: Request, res: Response): Promise<void> {
    const data: contact = { ...req.body };

    const result: IContact = await this.contactService.createEntity(data);

    res
      .status(200)
      .location(`${Constants.CONTEXT_PATH}/contacts/${result._id}`);

    res.json({ status: "Success" });
  }

  @httpPut("/:id")
  public async updateContact(req: Request, res: Response): Promise<void> {
    const data: contact = { ...req.body };
    const { id } = req.params;

    const result: IContact = await this.contactService.updateEntity(id, data);

    res.json({ status: "Success" });
  }

  @httpDelete("/:id")
  public async deleteContact(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    await this.contactService.deleteEntity(id);

    res.json({ status: "Success" });
  }
}
