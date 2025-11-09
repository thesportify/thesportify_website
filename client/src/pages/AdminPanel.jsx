import React, { useState, useEffect } from 'react';
import { Upload, X, Eye, Trash2, Mail, User, MessageSquare, Calendar, MapPin, FileImage, LogOut, Menu, Users } from 'lucide-react';
import AdminManagement from '../components/AdminManagement'; 
const API_URL = '/api';

// Admin Login Component (no changes needed here)
const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // setError(''); // Clear previous errors
    
    fetch(`${API_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
    .then(async (res) => {
      // Check if the response is successful
      if (res.ok) {
        return res.json();
      }
      
      // If not, try to parse the error message from the server
      const errorData = await res.json().catch(() => null);
      throw {
        status: res.status,
        message: errorData?.message || `Request failed with status ${res.status}`
      };
    })
    .then(data => {
      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        onLogin(data.token, data.user);
      } else {
        // This case might not be reached if server errors are thrown
        setError(data.message || 'Login failed');
      }
    })
    .catch(err => {
      console.error('Login error:', err);
      if (err.status) {
        setError(err.message);
      } else {
        setError('Connection error. Please check if the backend is running.');
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#1a1a1a] to-black dark:bg-gray-950">
      <div className="bg-slate-800 p-8 rounded-lg shadow-2xl w-full max-w-md border border-slate-700">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-orange-500 mb-2">Admin Panel</h1>
          <p className="text-slate-400">The Sportify Society</p>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-slate-300 mb-2">Username</label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
            />
          </div>
          
          <div>
            <label className="block text-slate-300 mb-2">Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
            />
          </div>
          
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-2 rounded-lg">
              {error}
            </div>
          )}
          
          <button
            onClick={handleLogin}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

// Admin Dashboard Component - FIXED NAVBAR OVERLAP
const AdminDashboard = ({ token, onLogout }) => {
  const [activeTab, setActiveTab] = useState('events');
  const [events, setEvents] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  
  const [eventForm, setEventForm] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    image: '',
    tags: []
  });

  useEffect(() => {
    fetchEvents();
    fetchFeedbacks();
    
    // Fetch current user info
    fetch(`${API_URL}/admin/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setCurrentUser(data))
      .catch(err => console.error('Failed to fetch user:', err));
  }, []);

  const fetchEvents = () => {
    fetch(`${API_URL}/events`)
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error('Failed to fetch events:', err));
  };

  const fetchFeedbacks = () => {
    fetch(`${API_URL}/feedback`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setFeedbacks(data))
      .catch(err => console.error('Failed to fetch feedbacks:', err));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEventForm({...eventForm, image: reader.result});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    const url = editingEvent 
      ? `${API_URL}/events/${editingEvent._id}`
      : `${API_URL}/events`;
    
    const method = editingEvent ? 'PUT' : 'POST';
    
    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(eventForm)
    })
    .then(response => {
      if (response.ok) {
        fetchEvents();
        resetForm();
      }
    })
    .catch(err => console.error('Failed to save event:', err));
  };

  const handleDeleteEvent = (id) => {
    if (confirm('Are you sure you want to delete this event?')) {
      fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(() => fetchEvents())
      .catch(err => console.error('Failed to delete event:', err));
    }
  };

  const handleDeleteFeedback = (id) => {
    if (confirm('Are you sure you want to delete this feedback?')) {
      fetch(`${API_URL}/feedback/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(() => fetchFeedbacks())
      .catch(err => console.error('Failed to delete feedback:', err));
    }
  };

  const resetForm = () => {
    setEventForm({
      title: '',
      date: '',
      location: '',
      description: '',
      image: '',
      tags: []
    });
    setEditingEvent(null);
    setShowEventForm(false);
  };

  const handleEditEvent = (event) => {
    setEventForm(event);
    setEditingEvent(event);
    setShowEventForm(true);
  };

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-black via-[#1a1a1a] to-black dark:bg-gray-950 flex pt-16">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-slate-800 border-r border-slate-700 transition-all duration-300 fixed left-0 top-16 bottom-0 overflow-y-auto`}>
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          {sidebarOpen && <h2 className="text-xl font-bold text-orange-500">Admin Panel</h2>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-400 hover:text-white">
            <Menu size={24} />
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          <button
            onClick={() => setActiveTab('events')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeTab === 'events' ? 'bg-orange-500 text-white' : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Calendar size={20} />
            {sidebarOpen && <span>Past Events</span>}
          </button>
          
          <button
            onClick={() => setActiveTab('feedback')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeTab === 'feedback' ? 'bg-orange-500 text-white' : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            <MessageSquare size={20} />
            {sidebarOpen && <span>Feedback ({feedbacks.length})</span>}
          </button>
          
          <button
            onClick={() => setActiveTab('admins')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeTab === 'admins' ? 'bg-orange-500 text-white' : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Users size={20} />
            {sidebarOpen && <span>Manage Admins</span>}
          </button>

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/20 rounded-lg transition"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </nav>
      </div>

      {/* Main Content - FIXED: Added margin-left to account for sidebar */}
      <div className={`flex-1 overflow-auto ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        <div className="p-8">
          {activeTab === 'events' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Past Events Management</h1>
                <button
                  onClick={() => setShowEventForm(true)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition"
                >
                  <Upload size={20} />
                  Add New Event
                </button>
              </div>

              {/* Event Form Modal */}
              {showEventForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                  <div className="bg-slate-800 rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-white">
                        {editingEvent ? 'Edit Event' : 'Add New Event'}
                      </h2>
                      <button onClick={resetForm} className="text-slate-400 hover:text-white">
                        <X size={24} />
                      </button>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-slate-300 mb-2">Event Title *</label>
                        <input
                          type="text"
                          value={eventForm.title}
                          onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
                          className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-slate-300 mb-2">Date *</label>
                          <input
                            type="text"
                            placeholder="e.g., 23 October 2024"
                            value={eventForm.date}
                            onChange={(e) => setEventForm({...eventForm, date: e.target.value})}
                            className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-slate-300 mb-2">Location *</label>
                          <input
                            type="text"
                            value={eventForm.location}
                            onChange={(e) => setEventForm({...eventForm, location: e.target.value})}
                            className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-300 mb-2">Description *</label>
                        <textarea
                          value={eventForm.description}
                          onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
                          className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 h-32"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 mb-2">Event Image *</label>
                        <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-orange-500 transition">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="imageUpload"
                          />
                          <label htmlFor="imageUpload" className="cursor-pointer">
                            {eventForm.image ? (
                              <img src={eventForm.image} alt="Preview" className="max-h-48 mx-auto rounded" />
                            ) : (
                              <div>
                                <FileImage size={48} className="mx-auto text-slate-500 mb-2" />
                                <p className="text-slate-400">Click to upload image</p>
                              </div>
                            )}
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-300 mb-2">Tags (comma separated)</label>
                        <input
                          type="text"
                          placeholder="e.g., Hockey, Meetup, Live Event"
                          value={eventForm.tags.join(', ')}
                          onChange={(e) => setEventForm({...eventForm, tags: e.target.value.split(',').map(t => t.trim()).filter(t => t)})}
                          className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>

                      <div className="flex gap-4">
                        <button
                          onClick={handleSubmitEvent}
                          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition"
                        >
                          {editingEvent ? 'Update Event' : 'Create Event'}
                        </button>
                        <button
                          onClick={resetForm}
                          className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-semibold transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Events List */}
              <div className="grid gap-6">
                {events.map((event, index) => (
                  <div
                    key={event._id}
                    className={`bg-slate-800 rounded-lg overflow-hidden border border-slate-700 hover:border-orange-500 transition ${
                      index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                    } flex`}
                  >
                    <div className="w-1/3 relative">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                    
                    <div className="w-2/3 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
                            <div className="flex gap-4 text-slate-400 text-sm mb-3">
                              <span className="flex items-center gap-1">
                                <Calendar size={16} />
                                {event.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin size={16} />
                                {event.location}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditEvent(event)}
                              className="bg-blue-500 hover:bg-blue-600 text-.
			  -white p-2 rounded transition"
                            >
                              <Eye size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteEvent(event._id)}
                              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded transition"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                        
                        <p className="text-slate-300 mb-4">{event.description}</p>
                        
                        <div className="flex flex-wrap gap-2">
                          {event.tags.map((tag, i) => (
                            <span key={i} className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {events.length === 0 && (
                  <div className="text-center py-12 text-slate-400">
                    <Calendar size={48} className="mx-auto mb-4 opacity-50" />
                    <p>No events created yet. Click "Add New Event" to get started.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'feedback' && (
            <div>
              <h1 className="text-3xl font-bold text-white mb-8">User Feedback</h1>
              
              <div className="grid gap-6">
                {feedbacks.map((feedback) => (
                  <div key={feedback._id} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-2 text-white">
                            <User size={20} className="text-orange-500" />
                            <span className="font-semibold">{feedback.name}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-400">
                            <Mail size={16} />
                            <span className="text-sm">{feedback.email}</span>
                          </div>
                        </div>
                        
                        <p className="text-slate-300 bg-slate-900 p-4 rounded-lg">{feedback.message}</p>
                        
                        <p className="text-slate-500 text-sm mt-3">
                          {new Date(feedback.createdAt).toLocaleString()}
                        </p>
                      </div>
                      
                      <button
                        onClick={() => handleDeleteFeedback(feedback._id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded transition ml-4"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
                
                {feedbacks.length === 0 && (
                  <div className="text-center py-12 text-slate-400">
                    <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
                    <p>No feedback received yet</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'admins' && (
            <AdminManagement token={token} currentUser={currentUser} />
          )}
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken');
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (newToken) => {
    setToken(newToken);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
    setIsAuthenticated(false);
  };

  return isAuthenticated ? (
    <AdminDashboard token={token} onLogout={handleLogout} />
  ) : (
    <AdminLogin onLogin={handleLogin} />
  );
}