const API_URL = '/api/users';

function App() {
  const [users, setUsers] = React.useState([]);
  const [form, setForm] = React.useState({ name: '', email: '', age: '' });
  const [editingId, setEditingId] = React.useState(null);

  const fetchUsers = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setUsers(data);
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    setForm({ name: '', email: '', age: '' });
    setEditingId(null);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setForm({ name: user.name, email: user.email, age: user.age });
    setEditingId(user.id);
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchUsers();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>User Management</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="age" placeholder="Age" type="number" value={form.age} onChange={handleChange} required />
        <button type="submit">{editingId ? 'Update' : 'Add'} User</button>
      </form>

      <div style={{ marginTop: '20px' }}>
        <button onClick={fetchUsers}>Get All Users</button>
        <button onClick={() => handleEdit(users[0])} disabled={!users.length}>Edit First User</button>
        <button onClick={() => handleDelete(users[0]?.id)} disabled={!users.length}>Delete First User</button>
        <button onClick={() => {
          setForm({ name: 'Sample User', email: 'sample@example.com', age: 25 });
          setEditingId(null);
        }}>Add Sample User</button>
      </div>

      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email} - {user.age} years
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
