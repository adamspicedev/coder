import { db, users } from "@/db";
import bcrypt from 'bcryptjs';
import { eq } from "drizzle-orm";
import { Hono } from "hono";

const app = new Hono().post('/signin', async (c) => {
    try {
      const { email, password } = await c.req.json();
      console.log('Signin attempt:', { email, password: password ? '[REDACTED]' : 'undefined' });
      
      // Basic validation
      if (!email || !password) {
        console.log('Missing email or password');
        return c.json({ error: 'Missing email or password' }, 400);
      }
      
      // Find user in database
      console.log('Searching for user with email:', email);
      const userResult = await db.select().from(users).where(eq(users.email, email));
      console.log('Database query result:', userResult.length, 'users found');
      
      if (userResult.length === 0) {
        console.log('No user found with email:', email);
        return c.json({ error: 'Invalid credentials' }, 401);
      }
      
      const user = userResult[0];
      console.log('User found:', { id: user.id, email: user.email, name: user.name, hasPassword: !!user.password });
      
      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password || '');
      console.log('Password validation result:', isPasswordValid);
      
      if (!isPasswordValid) {
        console.log('Invalid password for user:', email);
        return c.json({ error: 'Invalid credentials' }, 401);
      }
      
      // Return user data (without password)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _unused, ...userWithoutPassword } = user;
      
      console.log('Authentication successful for user:', email);
      return c.json({ 
        user: userWithoutPassword,
        token: 'mock-jwt-token' // In production, generate a real JWT token
      });
    } catch (error) {
      console.error('Signin error:', error);
      return c.json({ error: 'Authentication failed' }, 500);
    }
  }).get('/session', async (c) => {
    // For now, return a mock session
    // In production, you'd verify the JWT token and get user from database
    return c.json({ 
      user: { id: '1', name: 'Test User', email: 'test@example.com', role: 'student' }
    });
  }).post('/signout', async (c) => {
    return c.json({ success: true });
  })
  
  // Add signup route for mobile compatibility
  .post('/signup', async (c) => {
    try {
      const { name, email, password, role } = await c.req.json();
      
      // Basic validation
      if (!name || !email || !password) {
        return c.json({ error: 'Missing required fields' }, 400);
      }
      
      // Check if user already exists
      const existingUser = await db.select().from(users).where(eq(users.email, email));
      if (existingUser.length > 0) {
        return c.json({ error: 'User with this email already exists' }, 400);
      }
      
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create user in database
      const [newUser] = await db.insert(users).values({
        name,
        email,
        password: hashedPassword,
        role: role || 'student',
      }).returning();
      
      // Return user data (without password)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _unused, ...userWithoutPassword } = newUser;
      
      return c.json({ 
        user: userWithoutPassword,
        token: 'mock-jwt-token' // In production, generate a real JWT token
      });
    } catch (error) {
      console.error('Signup error:', error);
      return c.json({ error: 'Failed to create account' }, 500);
    }
  });

  export default app;