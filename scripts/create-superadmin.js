import bcrypt from 'bcryptjs';
import { db } from '../server/db.ts';
import { adminUsers } from '../shared/schema.ts';
import { eq } from 'drizzle-orm';

async function createSuperAdmin() {
  try {
    console.log('Creating superadmin user...');
    
    // Hash the new password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash('Paycode_2025!', saltRounds);
    
    // Check if superadmin already exists
    const existingAdmin = await db.select().from(adminUsers).where(eq(adminUsers.username, 'superadmin'));
    
    if (existingAdmin.length > 0) {
      console.log('Superadmin already exists, updating password...');
      // Update existing admin
      await db.update(adminUsers)
        .set({ 
          passwordHash: hashedPassword,
          email: 'superadmin@paycodedrc.com',
          isActive: true 
        })
        .where(eq(adminUsers.username, 'superadmin'));
      console.log('✅ Superadmin password updated successfully!');
    } else {
      // Create new superadmin
      await db.insert(adminUsers).values({
        username: 'superadmin',
        email: 'superadmin@paycodedrc.com',
        passwordHash: hashedPassword,
        isActive: true,
      });
      console.log('✅ Superadmin created successfully!');
    }
    
    console.log('Credentials:');
    console.log('Username: superadmin');
    console.log('Password: Paycode_2025!');
    console.log('Email: superadmin@paycodedrc.com');
    
  } catch (error) {
    console.error('❌ Error creating superadmin:', error);
  } finally {
    process.exit(0);
  }
}

createSuperAdmin();