import React, { useState, useEffect } from 'react';

function App() {
  const [destinations, setDestinations] = useState([]);
  const [newDestination, setNewDestination] = useState({ name: '', country: '' });

  const fetchDestinations = async () => {
    const response = await fetch('/api/destinations');
    const data = await response.json();
    setDestinations(data);
  };

  const addDestination = async () => {
    await fetch('/api/destinations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newDestination),
    });
    fetchDestinations();
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  return (
    <div>
      <h1>Travel Bucket List</h1>
      <input
        value={newDestination.name}
        onChange={(e) => setNewDestination({ ...newDestination, name: e.target.value })}
        placeholder="Destination"
      />
      <input
        value={newDestination.country}
        onChange={(e) => setNewDestination({ ...newDestination, country: e.target.value })}
        placeholder="Country"
      />
      <button onClick={addDestination}>Add</button>
      <ul>
        {destinations.map((dest) => (
          <li key={dest._id}>{`${dest.name}, ${dest.country}`}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
