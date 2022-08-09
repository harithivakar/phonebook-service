import { provideSingleton } from "../IOC/ioc";

@provideSingleton(ContactService)
export class ContactService {
  public async getAllContacts(): Promise<object[]> {
    return [];
  }

  public async getContact(id: string): Promise<object> {
    return { name: "Harithivakar" };
  }

  public async createContact(data: object): Promise<void> {}

  public async updateContact(id: string, data: object): Promise<void> {}

  public async deleteContact(id: string): Promise<void> {}
}
