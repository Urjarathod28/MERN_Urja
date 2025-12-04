import React, { useState, useEffect } from 'react';
import { UserPlus, Users, Trash2, Search, AlertCircle, CheckCircle } from 'lucide-react';
import '../App'

const API_URL = 'http://localhost:5000/api';

export default function UserSchemaDemo() {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        password: ''
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${API_URL}/users`);
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            showMessage('error', 'Failed to fetch users');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                showMessage('success', 'User created successfully!');
                setFormData({ name: '', email: '', age: '', password: '' });
                fetchUsers();
            } else {
                showMessage('error', data.message || 'Failed to create user');
            }
        } catch (error) {
            showMessage('error', 'Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;

        try {
            const response = await fetch(`${API_URL}/users/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                showMessage('success', 'User deleted successfully!');
                fetchUsers();
            } else {
                showMessage('error', 'Failed to delete user');
            }
        } catch (error) {
            showMessage('error', 'Network error. Please try again.');
        }
    };

    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="app-container">
            <div className="content-wrapper">
                {/* Header */}
                <div className="header">
                    <h1 className="header-title">User Schema Demo</h1>
                    <p className="header-subtitle">Mongoose Schema & Models with Validation</p>
                </div>

                {/* Alert Message */}
                {message.text && (
                    <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'}`}>
                        {message.type === 'success' ? 
                            <CheckCircle size={20} /> : 
                            <AlertCircle size={20} />
                        }
                        <span>{message.text}</span>
                    </div>
                )}

                {/* Main Grid */}
                <div className="grid-container">
                    {/* Create User Card */}
                    <div className="card">
                        <div className="card-header">
                            <UserPlus className="icon-primary" size={24} />
                            <h2 className="card-title">Create New User</h2>
                        </div>

                        <div>
                            <div className="form-group">
                                <label className="form-label">Name *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="form-input"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Email *</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="form-input"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Age *</label>
                                <input
                                    type="number"
                                    value={formData.age}
                                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                    className="form-input"
                                    placeholder="25"
                                    min="1"
                                    max="120"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Password *</label>
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="form-input"
                                    placeholder="Min 6 characters"
                                    minLength="6"
                                />
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="btn btn-primary"
                            >
                                {loading ? 'Creating...' : 'Create User'}
                            </button>
                        </div>
                    </div>

                    {/* Users List Card */}
                    <div className="card">
                        <div className="card-header-with-badge">
                            <div className="card-header-left">
                                <Users className="icon-primary" size={24} />
                                <h2 className="card-title">All Users</h2>
                            </div>
                            <span className="badge">{users.length} users</span>
                        </div>

                        {/* Search Bar */}
                        <div className="search-container">
                            <Search className="search-icon" size={20} />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                                placeholder="Search users..."
                            />
                        </div>

                        {/* Users List */}
                        <div className="user-list">
                            {filteredUsers.length === 0 ? (
                                <p className="empty-state">No users found</p>
                            ) : (
                                filteredUsers.map((user) => (
                                    <div key={user._id} className="user-card">
                                        <div className="user-info">
                                            <h3 className="user-name">{user.name}</h3>
                                            <p className="user-email">{user.email}</p>
                                            <p className="user-age">Age: {user.age}</p>
                                            <p className="user-date">
                                                Created: {new Date(user.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="btn-delete"
                                            title="Delete user"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Validation Rules Section */}
                <div className="card validation-section">
                    <h3 className="validation-title">Validation Rules</h3>
                    <ul className="validation-list">
                        <li className="validation-item">
                            <CheckCircle className="validation-icon" size={16} />
                            <span className="validation-text">Name: Required, 2-50 characters</span>
                        </li>
                        <li className="validation-item">
                            <CheckCircle className="validation-icon" size={16} />
                            <span className="validation-text">Email: Required, must be unique and valid</span>
                        </li>
                        <li className="validation-item">
                            <CheckCircle className="validation-icon" size={16} />
                            <span className="validation-text">Age: Required, between 1-120</span>
                        </li>
                        <li className="validation-item">
                            <CheckCircle className="validation-icon" size={16} />
                            <span className="validation-text">Password: Required, minimum 6 characters</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}