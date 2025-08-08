import { db, users } from "@/db";
import * as bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

async function updateTestUser() {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash('password123', 10);
    console.log('New password hash:', hashedPassword);
    
    // Update test user password
    const [updatedUser] = await db.update(users)
      .set({ password: hashedPassword })
      .where(eq(users.email, 'test@example.com'))
      .returning();
    
    if (updatedUser) {
      console.log('Test user password updated:', { 
        id: updatedUser.id, 
        email: updatedUser.email, 
        name: updatedUser.name,
        role: updatedUser.role 
      });
    } else {
      console.log('Test user not found');
    }
  } catch (error) {
    console.error('Error updating test user:', error);
  }
}

updateTestUser();
