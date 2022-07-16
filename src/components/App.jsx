import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Phonebook } from './app.styled';

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onFormSubmit = evt => {
    evt.preventDefault();

    const { name, number } = evt.target.elements;
    const contact = {
      id: nanoid(),
      name: name.value,
      number: number.value,
    };

    setContacts(prevState => {
      const filteredContact = prevState.find(
        ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
      );

      return filteredContact
        ? (alert(`${contact.name} is already in contacts`), prevState)
        : (evt.target.reset(), [contact, ...prevState]);
    });
  };

  const changeFilter = evt => {
    setFilter(evt.currentTarget.value);
  };

  const removeContact = id => {
    const filtered = contacts.filter(contact => contact.id !== id);

    setContacts(filtered);
  };

  const normalizeText = filter.toLowerCase();
  const filteredContact = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizeText)
  );

  return (
    <Phonebook>
      <h1>Phonebook</h1>
      <ContactForm onFormSubmit={onFormSubmit} />

      <h2>Contacts</h2>
      <Filter value={filter} onChangeFilter={changeFilter} />
      <ContactList contacts={filteredContact} onRemoveContact={removeContact} />
    </Phonebook>
  );
}
