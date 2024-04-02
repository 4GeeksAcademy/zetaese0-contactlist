const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		contacts: [],
	  },
	  actions: {
		getContacts: async () => {
			try {
			  const response = await fetch(
				"https://playground.4geeks.com/contact/agendas/zetaese/contacts"
			  );
			  if (!response.ok) {
				throw new Error("Failed to fetch contacts");
			  }
			  const data = await response.json();
			  const store = getStore(); // Get the current store
			  setStore({ ...store, contacts: data }); // Update the contacts property with the fetched data
			  console.log(store.contacts); // Log the updated contacts array
			  console.log(store.contacts.contacts.length)
			} catch (error) {
			  console.error("Error fetching contacts:", error);
			}
		  },
		addContact: async (name, phone, email, address) => {
		  try {
			const response = await fetch(
			  "https://playground.4geeks.com/contact/agendas/zetaese/contacts",
			  {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
				  name,
				  phone,
				  email,
				  address,
				}),
			  }
			);
			if (!response.ok) {
			  throw new Error("Failed to add contact");
			}
			const data = await response.json();
			setStore({ contacts: [...getStore().contacts, data] });
		  } catch (error) {
			console.error("Error adding contact:", error);
		  }
		},
		deleteContact: async (id) => {
		  try {
			const response = await fetch(
			  `https://playground.4geeks.com/contact/agendas/zetaese/contacts/${id}`,
			  {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
			  }
			);
			if (!response.ok) {
			  throw new Error("Failed to delete contact");
			}
			setStore({
			  contacts: getStore().contacts.filter((contact) => contact.id !== id),
			});
		  } catch (error) {
			console.error("Error deleting contact:", error);
		  }
		},
		editContact: async (id, name, phone, email, address) => {
		  try {
			const response = await fetch(
			  `https://playground.4geeks.com/contact/agendas/zetaese/contacts/${id}`,
			  {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
				  name,
				  phone,
				  email,
				  address,
				}),
			  }
			);
			if (!response.ok) {
			  throw new Error("Failed to edit contact");
			}
			const data = await response.json();
			setStore({
			  contacts: getStore().contacts.map((contact) =>
				contact.id === id ? { ...contact, ...data } : contact
			  ),
			});
		  } catch (error) {
			console.error("Error editing contact:", error);
		  }
		},
	  },
	};
  };
  
  export default getState;
  