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
import { ContactService } from "../services/Contact";

@controller(`${Constants.CONTEXT_PATH}/contacts`)
export class ContactController {
  constructor(@inject(ContactService) private contactService: ContactService) {}

  @httpGet("/")
  public async allContacts(req: Request, res: Response) {
    const contacts = await this.contactService.getAllContacts();
    res.json(contacts);
  }

  @httpGet("/:id")
  public async viewContact(req: Request, res: Response) {
    const { id } = req.params;

    const contact = await this.contactService.getContact(id);
    res.json(contact);
  }

  @httpPost("/")
  public async createContact(req: Request, res: Response) {
    const data = { ...req.body };

    const result = await this.contactService.createContact(data);

    res
      .status(200)
      .location(`${Constants.CONTEXT_PATH}/contacts/dummyendpoint`);

    res.json({ status: "Success" });
  }

  @httpPut("/:id")
  public async updateContact(req: Request, res: Response) {
    const data = { ...req.body };
    const { id } = req.params;

    const result = await this.contactService.updateContact(id, data);

    res.json({ status: "Success" });
  }

  @httpDelete("/:id")
  public async deleteContact(req: Request, res: Response) {
    const { id } = req.params;

    await this.contactService.deleteContact(id);

    res.json({ status: "Success" });
  }
}
