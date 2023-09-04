import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import contacts from './contacts.js'

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case 'list':
            const allContacts = await contacts.getAllContacts();
            return console.table(allContacts);
        case 'get':
            const oneContact = await contacts.getContactById(id);
            return console.log(oneContact);
        case 'add':
            const newContact = await contacts.addContact({ name, email, phone });
            return console.log(newContact);
        case "update":
            console.log({ id, name, email, phone})
            const updatedContact = await contacts.updateContactById({ id, name, email, phone});
            return console.log(updatedContact);
        case 'remove':
            const removedContact = await contacts.removeContactById(id);
            return console.log(removedContact);
        default:
            console.warn('\x1B[31m Unknown action type!');
    }
};

const arr = hideBin(process.argv);
const { argv } = yargs(arr);
invokeAction(argv);