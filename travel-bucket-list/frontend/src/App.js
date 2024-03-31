import React, { useState, useEffect } from 'react';

function App() {
  const [destinations, setDestinations] = useState([]);
  const [newDestination, setNewDestination] = useState({ name: '', country: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const fetchDestinations = async () => {
    try {
      const response = await fetch('/api/destinations');
      if (!response.ok) throw new Error('Failed to fetch destinations.');
      const data = await response.json();
      setDestinations(data);
      setError('');
    } catch (err) {
      setError(err.message || 'An error occurred.');
    }
  };

  const addDestination = async () => {
    if (!newDestination.name || !newDestination.country) {
      setError('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/destinations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDestination),
      });
      if (!response.ok) throw new Error('Failed to add destination.');
      await fetchDestinations();
      setNewDestination({ name: '', country: '' }); // Reset form
      setError('');
    } catch (err) {
      setError(err.message || 'An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  return (
    <div>
      <h1>Travel Bucket List</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        value={newDestination.name}
        onChange={(e) => setNewDestination({ ...newDestination, name: e.target.value })}
        placeholder="Destination"
        disabled={isSubmitting}
      />
      <input
        value={newDestination.country}
        onChange={(e) => setNewDestination({ ...newDestination, country: e.target.value })}
        placeholder="Country"
        disabled={isSubmitting}
      />
      <button onClick={addDestination} disabled={isSubmitting}>
        {isSubmitting ? 'Adding...' : 'Add'}
      </button>
      <ul>
        {destinations.map((dest) => (
          <li key={dest._id}>{`${dest.name}, ${dest.country}`}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
