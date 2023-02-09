import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

const LOCAL_KEY_CONTACTS = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState(
    () =>
      JSON.parse(localStorage.getItem(LOCAL_KEY_CONTACTS)) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY_CONTACTS, JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = ({ name, number }) => {
    const message = contacts.find(element => element.name === name);
    if (message) {
      alert(`${message.name} is already in contacts!`);
    } else {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      setContacts(prev => [...prev, newContact]);
    }
  };

  const handleFilterContact = e => {
    setFilter(e.target.value);
  };

  const handleDeleteContact = id => {
    setContacts(prev => prev.filter(element => element.id !== id));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm submitForm={handleSubmit} />

      <h2>Contacts</h2>

      <Filter filter={handleFilterContact} value={filter} />

      <ContactList
        contacts={contacts}
        filter={filter}
        deleteContact={handleDeleteContact}
      />
    </div>
  );
};
