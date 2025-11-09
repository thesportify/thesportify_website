// server.js - Multi-Admin Support (FIXED CORS)
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// ====== CORS Configuration (FIXED) ======
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:5174'
    ];
    
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all in development
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Authorization'],
  maxAge: 86400 // 24 hours
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sportify';

mongoose.connect(MONGODB_URI)
.then(() => {
  console.log('✅ MongoDB Connected Successfully');
  console.log(`📊 Database: ${MONGODB_URI}`);
})
.catch(err => {
  console.error('❌ MongoDB Connection Error:', err.message);
});

// ==================== SCHEMAS ====================

// Admin Schema with Role
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['super_admin', 'admin'], default: 'admin' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date }
});

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  tags: { type: [String], default: [] },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  createdAt: { type: Date, default: Date.now }
});

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Models
const Admin = mongoose.model('Admin', adminSchema);
const Event = mongoose.model('Event', eventSchema);
const Feedback = mongoose.model('Feedback', feedbackSchema);

// ==================== MIDDLEWARE ====================

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Check if user is super admin
const isSuperAdmin = (req, res, next) => {
  if (req.user.role !== 'super_admin') {
    return res.status(403).json({ error: 'Super admin access required' });
  }
  next();
};

// ==================== ROUTES ====================

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Sportify API is running',
    timestamp: new Date().toISOString()
  });
});

// ==================== ADMIN ROUTES ====================

// Login
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username and password required' 
      });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    const token = jwt.sign(
      { 
        id: admin._id, 
        username: admin.username,
        role: admin.role 
      }, 
      JWT_SECRET, 
      { expiresIn: '24h' }
    );

    console.log('✅ Login successful:', username, '- Role:', admin.role);
    res.json({ 
      success: true, 
      token,
      user: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      },
      message: 'Login successful' 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// Get current admin profile
app.get('/api/admin/me', authenticateToken, async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select('-password');
    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all admins (Super Admin only)
app.get('/api/admin/list', authenticateToken, isSuperAdmin, async (req, res) => {
  try {
    const admins = await Admin.find().select('-password').sort({ createdAt: -1 });
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create new admin (Super Admin only)
app.post('/api/admin/create', authenticateToken, isSuperAdmin, async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ 
        error: 'Username, email, and password required' 
      });
    }

    // Check if username or email exists
    const existingAdmin = await Admin.findOne({ 
      $or: [{ username }, { email }] 
    });
    
    if (existingAdmin) {
      return res.status(400).json({ 
        error: 'Username or email already exists' 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ 
      username, 
      email,
      password: hashedPassword,
      role: role || 'admin',
      createdBy: req.user.id
    });
    
    await admin.save();

    res.json({ 
      success: true, 
      message: 'Admin created successfully',
      admin: {
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Create admin error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Change admin password (Own password or Super Admin can change any)
app.put('/api/admin/change-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword, targetAdminId } = req.body;

    if (!newPassword) {
      return res.status(400).json({ error: 'New password required' });
    }

    let adminToUpdate;

    // If changing someone else's password (Super Admin only)
    if (targetAdminId && targetAdminId !== req.user.id) {
      if (req.user.role !== 'super_admin') {
        return res.status(403).json({ error: 'Not authorized' });
      }
      adminToUpdate = await Admin.findById(targetAdminId);
    } else {
      // Changing own password - verify current password
      if (!currentPassword) {
        return res.status(400).json({ error: 'Current password required' });
      }
      
      adminToUpdate = await Admin.findById(req.user.id);
      const validPassword = await bcrypt.compare(currentPassword, adminToUpdate.password);
      
      if (!validPassword) {
        return res.status(401).json({ error: 'Current password is incorrect' });
      }
    }

    if (!adminToUpdate) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    adminToUpdate.password = await bcrypt.hash(newPassword, 10);
    await adminToUpdate.save();

    res.json({ 
      success: true, 
      message: 'Password changed successfully' 
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete admin (Super Admin only, cannot delete self)
app.delete('/api/admin/:id', authenticateToken, isSuperAdmin, async (req, res) => {
  try {
    if (req.params.id === req.user.id) {
      return res.status(400).json({ error: 'Cannot delete your own account' });
    }

    const admin = await Admin.findByIdAndDelete(req.params.id);
    
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.json({ 
      success: true, 
      message: 'Admin deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ==================== EVENT ROUTES ====================

app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    console.error('Fetch events error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/events', authenticateToken, async (req, res) => {
  try {
    const event = new Event({
      ...req.body,
      createdBy: req.user.id
    });
    await event.save();
    console.log('✅ Event created:', event._id);
    res.status(201).json(event);
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/events/:id', authenticateToken, async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    console.log('✅ Event updated:', event._id);
    res.json(event);
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/events/:id', authenticateToken, async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    console.log('✅ Event deleted:', req.params.id);
    res.json({ success: true, message: 'Event deleted' });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ==================== FEEDBACK ROUTES ====================

app.post('/api/feedback', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'All fields required' 
      });
    }

    const feedback = new Feedback({ name, email, message });
    await feedback.save();
    
    console.log('✅ Feedback submitted:', feedback._id);
    res.status(201).json({ 
      success: true, 
      message: 'Feedback submitted' 
    });
  } catch (error) {
    console.error('Submit feedback error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/feedback', authenticateToken, async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    console.error('Fetch feedback error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/feedback/:id', authenticateToken, async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    
    console.log('✅ Feedback deleted:', req.params.id);
    res.json({ success: true, message: 'Feedback deleted' });
  } catch (error) {
    console.error('Delete feedback error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log('=================================');
  console.log('🚀 Sportify Backend Server');
  console.log('=================================');
  console.log(`📡 Server: http://localhost:${PORT}`);
  console.log(`🏥 Health: http://localhost:${PORT}/api/health`);
  console.log(`🔐 Login: http://localhost:${PORT}/api/admin/login`);
  console.log(`📅 Events: http://localhost:${PORT}/api/events`);
  console.log('=================================');
});