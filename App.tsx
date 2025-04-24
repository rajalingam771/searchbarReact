import React, { useEffect, useState, useMemo } from 'react';
import './App.css'; // Custom CSS file

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: {
    city: string;
  };
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const filteredUsers = useMemo(() => {
    const term = search.toLowerCase();
    return users.filter((user) => user.name.toLowerCase().includes(term));
  }, [search, users]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (value) {
      const matches = users
        .filter((u) => u.name.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5)
        .map((u) => u.name);
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="container">
      <input
        className="search-input"
        placeholder="Search users by name"
        value={search}
        onChange={handleInputChange}
      />
      {suggestions.length > 0 && (
        <ul className="suggestion-list">
          {suggestions.map((s, i) => (
            <li key={i} onClick={() => setSearch(s)}>
              {s}
            </li>
          ))}
        </ul>
      )}

      <div className="card-grid">
        {filteredUsers.map((user) => (
          <div key={user.id} className="card">
            <h3>{user.name}</h3>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>City:</strong> {user.address.city}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
