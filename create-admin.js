import bcrypt from 'bcryptjs';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool } from '@neondatabase/serverless';
import { adminUsers } from './shared/schema.js';

async function createAdmin() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL environment variable is required');
    process.exit(1);
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle({ client: pool });

  const username = 'admin';
  const password = 'paycode2025';
  const email = 'admin@paycode.com';

  try {
    const passwordHash = await bcrypt.hash(password, 12);
    
    const [admin] = await db
      .insert(adminUsers)
      .values({
        username,
        email,
        passwordHash,
        isActive: true,
      })
      .returning();

    console.log('Admin user created successfully!');
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Please change the password after first login');
    
  } catch (error) {
    if (error.code === '23505') { // unique violation
      console.log('Admin user already exists');
    } else {
      console.error('Error creating admin user:', error);
    }
  } finally {
    await pool.end();
  }
}

createAdmin();