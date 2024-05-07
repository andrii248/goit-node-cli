import { program } from "commander";
import * as contactsService from "./contacts.js";
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, ...data }) {
  switch (action) {
    case "list":
      const allContacts = await contactsService.listContacts();
      return console.table(allContacts);

    case "get":
      const contactById = await contactsService.getContactById(id);
      return console.log(contactById);

    case "add":
      const addContact = await contactsService.addContact(data);
      return console.log(addContact);

    case "remove":
      const removedContact = await contactsService.removeContact(id);
      return console.log(removedContact);

    case "update":
      const updateContact = await contactsService.updateById(id, data);
      return console.log(updateContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
