import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

async function createDefaultUser() {
  try {
    console.log('Creating default user...');
    
    // Check if default user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, 'admin@coder.com'))
      .limit(1);
    
    if (existingUser.length > 0) {
      console.log('Default user already exists:', existingUser[0].id);
      return existingUser[0].id;
    }
    
    // Create default user
    const result = await db
      .insert(users)
      .values({
        email: 'admin@coder.com',
        name: 'Admin User',
        role: 'admin',
      })
      .returning();
    
    console.log('Created default user:', result[0].id);
    return result[0].id;
    
  } catch (error) {
    console.error('Error creating default user:', error);
    throw error;
  }
}

createDefaultUser()
  .then((userId) => {
    console.log('Default user ID:', userId);
    process.exit(0);
  })
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });
