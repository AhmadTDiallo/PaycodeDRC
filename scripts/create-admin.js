import { createServer } from 'http';
import { storage } from '../server/storage.js';
import bcrypt from 'bcryptjs';

async function createAdmin() {
  try {
    const username = 'admin';
    const password = 'paycode2025';
    const email = 'admin@paycode.com';

    const passwordHash = await bcrypt.hash(password, 12);
    
    const admin = await storage.createAdminUser({
      username,
      email,
      passwordHash,
      isActive: true,
    });

    console.log('Admin user created successfully!');
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Please change the password after first login');
    
  } catch (error) {
    if (error.message?.includes('duplicate') || error.code === '23505') {
      console.log('Admin user already exists');
    } else {
      console.error('Error creating admin user:', error);
    }
  }
  process.exit(0);
}

createAdmin();