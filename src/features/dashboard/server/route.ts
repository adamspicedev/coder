import { Hono } from 'hono';

const app = new Hono();

// Dashboard routes
app.get('/stats', async (c) => {
  // Mock dashboard stats
  const stats = {
    totalChallenges: 25,
    completedChallenges: 12,
    currentStreak: 5,
    totalPoints: 1250,
    rank: 15,
    recentActivity: [
      { type: 'challenge_completed', title: 'Hello World', date: '2024-01-20' },
      { type: 'streak_milestone', title: '5-Day Streak', date: '2024-01-19' },
      { type: 'achievement_unlocked', title: 'First Challenge', date: '2024-01-18' }
    ]
  };
  
  return c.json(stats);
});

app.get('/recent-challenges', async (c) => {
  // Mock recent challenges
  const recentChallenges = [
    {
      id: '1',
      title: 'Hello World',
      difficulty: 'beginner',
      completed: true,
      score: 100
    },
    {
      id: '2',
      title: 'Variables & Data Types',
      difficulty: 'beginner',
      completed: true,
      score: 95
    },
    {
      id: '3',
      title: 'Functions',
      difficulty: 'intermediate',
      completed: false,
      score: null
    }
  ];
  
  return c.json(recentChallenges);
});

app.get('/leaderboard', async (c) => {
  // Mock leaderboard data
  const leaderboard = [
    { rank: 1, name: 'Alice Johnson', points: 2500, avatar: null },
    { rank: 2, name: 'Bob Smith', points: 2200, avatar: null },
    { rank: 3, name: 'Carol Davis', points: 2000, avatar: null },
    { rank: 4, name: 'David Wilson', points: 1800, avatar: null },
    { rank: 5, name: 'Eva Brown', points: 1600, avatar: null }
  ];
  
  return c.json(leaderboard);
});

export default app;
