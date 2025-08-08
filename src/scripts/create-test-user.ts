import { db, users } from "@/db";
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

async function createTestUser() {
  try {
    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, 'test@example.com'));
    
    if (existingUser.length > 0) {
      console.log('Test user already exists');
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    // Create test user
    const [newUser] = await db.insert(users).values({
      name: 'Test User',
      email: 'test@example.com',
      password: hashedPassword,
      role: 'student',
    }).returning();
    
    console.log('Test user created:', { 
      id: newUser.id, 
      email: newUser.email, 
      name: newUser.name,
      role: newUser.role 
    });
  } catch (error) {
    console.error('Error creating test user:', error);
  }
}

createTestUser();
