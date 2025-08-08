import { Hono } from 'hono';

const app = new Hono();

// User progress routes
app.get('/progress', async (c) => {
  // Mock progress data
  const progress = {
    overallCompletion: 75,
    challengesCompleted: 12,
    currentStreak: 5,
    achievements: [
      { name: 'First Challenge Completed', date: '2024-01-15' },
      { name: '5-Day Streak', date: '2024-01-20' }
    ]
  };
  
  return c.json(progress);
});

// Profile routes
app.get('/', async (c) => {
  // Mock user profile data
  const profile = {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    role: 'student',
    avatar: null,
    bio: 'Learning to code!',
    joinDate: '2024-01-01'
  };
  
  return c.json(profile);
});

app.put('/', async (c) => {
  const { name, bio } = await c.req.json();
  
  // Mock profile update
  const updatedProfile = {
    id: '1',
    name: name || 'Test User',
    email: 'test@example.com',
    role: 'student',
    avatar: null,
    bio: bio || 'Learning to code!',
    joinDate: '2024-01-01'
  };
  
  return c.json(updatedProfile);
});

export default app;
