import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const contactsPath = path.resolve('db', 'contacts.json');

export const getAllContacts = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
};

export const getContactById = async (id) => {
    const contacts = await getAllContacts();
    const searchedContact = contacts.find(item => item.id === id);
    return searchedContact || null;
}

export const addContact = async ({name, email, phone}) => {
    const contacts = await getAllContacts();
    const newContact = { id: nanoid(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact || null;
};

export const updateContactById = async ({id, name, email, phone}) => {
    console.log({id, name, email, phone})
    const contacts = await getAllContacts();
    const index = contacts.findIndex(item => item.id === id);
    if (index === -1) {
        return null;
    }
    const updatedContact = {id, name, email, phone};
    contacts.splice(index, 1, updatedContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return updatedContact;
}

export const removeContactById = async (id) => {
    const contacts = await getAllContacts();
    const index = contacts.findIndex(item => item.id === id);
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
};

export default {
    getAllContacts,
    getContactById,
    addContact,
    updateContactById,
    removeContactById,
}
