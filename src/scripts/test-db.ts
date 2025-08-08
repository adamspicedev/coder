import { db, users } from "@/db";
import { eq } from "drizzle-orm";

async function testDatabase() {
  try {
    console.log('Testing database connection...');
    
    // Try to query users
    const allUsers = await db.select().from(users);
    console.log('All users in database:', allUsers.length);
    
    if (allUsers.length > 0) {
      console.log('First user:', {
        id: allUsers[0].id,
        email: allUsers[0].email,
        name: allUsers[0].name,
        hasPassword: !!allUsers[0].password
      });
    }
    
    // Test specific user
    const testUser = await db.select().from(users).where(eq(users.email, 'test@example.com'));
    console.log('Test user found:', testUser.length > 0);
    
    if (testUser.length > 0) {
      console.log('Test user details:', {
        id: testUser[0].id,
        email: testUser[0].email,
        name: testUser[0].name,
        passwordLength: testUser[0].password?.length || 0
      });
    }
    
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

testDatabase();
