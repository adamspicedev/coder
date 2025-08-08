import { Hono } from 'hono';

const app = new Hono();

// Class routes
app.get('/', async (c) => {
  // Mock data
  const classes = [
    {
      id: '1',
      name: 'JavaScript Fundamentals',
      description: 'Learn the basics of JavaScript programming',
      teacherId: 'teacher1',
      studentCount: 15
    },
    {
      id: '2',
      name: 'React Development',
      description: 'Build modern web applications with React',
      teacherId: 'teacher1',
      studentCount: 8
    }
  ];
  
  return c.json(classes);
});

app.post('/', async (c) => {
  const { name, description } = await c.req.json();
  
  // Mock class creation
  const newClass = {
    id: Date.now().toString(),
    name,
    description,
    teacherId: 'teacher1',
    studentCount: 0
  };
  
  return c.json(newClass);
});

app.post('/:id/students', async (c) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const classId = c.req.param('id');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { studentId: _unused } = await c.req.json();
  
  // Mock adding student to class
  return c.json({ success: true, message: 'Student added to class' });
});

export default app;
