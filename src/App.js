import React, { useEffect, useState } from 'react' 
import { Amplify, API } from 'aws-amplify';
import config from './aws-exports';
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './App.css';

Amplify.configure(config)

function App({signOut, user}) {
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [pets, setPets] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    API.post("petsapi", "/pets", {
      body: {
        name: petName,
        type: petType,
      }
    }).then(() => {
      setPets([{name: petName, type: petType}, ...pets])
    })
  }
  useEffect(() => {
    API.get("petsapi", "/pets/name")
    .then(petResponse => setPets([...pets, ...petResponse]))
  },[])
  return (

    <div className="App">
    <header className="App-header">
      <Heading color="white" level={1}>Hello {user.username}!</Heading>
      <form onSubmit={handleSubmit}>
      <input value={petName} placeholder="fido" onChange={(e) => setPetName(e.target.value)}/>
      <input value={petType} placeholder="dog" onChange={(e) => setPetType(e.target.value)}/>
      <button>Add</button>
      </form>
      <ul>
        {pets.map(pet => <li key={pet.name}>{pet.name}</li>)}
      </ul>
      <Button variation="primary" onClick={signOut}>Sign out</Button>
    </header>
    </div>
  );
}

export default withAuthenticator(App);
