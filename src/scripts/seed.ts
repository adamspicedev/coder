import { db } from '@/db';
import { challenges, users } from '@/db/schema';
import bcrypt from 'bcryptjs';

async function seed() {
  try {
    console.log('🌱 Seeding database...');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 12);
    const admin = await db.insert(users).values({
      name: 'Admin User',
      email: 'admin@coder.com',
      password: adminPassword,
      role: 'admin',
    }).returning();

    console.log('✅ Created admin user:', admin[0].email);

    // Create teacher user
    const teacherPassword = await bcrypt.hash('teacher123', 12);
    const teacher = await db.insert(users).values({
      name: 'John Teacher',
      email: 'teacher@coder.com',
      password: teacherPassword,
      role: 'teacher',
    }).returning();

    console.log('✅ Created teacher user:', teacher[0].email);

    // Create student user
    const studentPassword = await bcrypt.hash('student123', 12);
    const student = await db.insert(users).values({
      name: 'Alice Student',
      email: 'student@coder.com',
      password: studentPassword,
      role: 'student',
    }).returning();

    console.log('✅ Created student user:', student[0].email);

    // Create sample challenges
    const sampleChallenges = [
      {
        title: 'Hello World',
        description: 'Write your first JavaScript function that returns a greeting message.',
        instructions: `Create a function called 'greet' that takes a name parameter and returns a greeting message.

Example:
- greet("Alice") should return "Hello, Alice!"
- greet("Bob") should return "Hello, Bob!"

Your function should:
1. Accept a single parameter (name)
2. Return a string that says "Hello, " followed by the name and an exclamation mark
3. Handle the case where no name is provided (return "Hello, World!")`,
        starterCode: `function greet(name) {
  // Your code here
  // Return a greeting message
}`,
        solution: `function greet(name) {
  if (!name) {
    return "Hello, World!";
  }
  return "Hello, " + name + "!";
}`,
        tests: [
          { input: 'Alice', expected: 'Hello, Alice!' },
          { input: 'Bob', expected: 'Hello, Bob!' },
          { input: '', expected: 'Hello, World!' },
        ],
        difficulty: 'easy',
        category: 'JavaScript',
        order: 1,
      },
      {
        title: 'Sum of Two Numbers',
        description: 'Create a function that adds two numbers together.',
        instructions: `Write a function called 'add' that takes two numbers as parameters and returns their sum.

Example:
- add(2, 3) should return 5
- add(-1, 1) should return 0
- add(10, 20) should return 30

Your function should:
1. Accept two parameters (a and b)
2. Return the sum of the two numbers
3. Handle both positive and negative numbers`,
        starterCode: `function add(a, b) {
  // Your code here
  // Return the sum of a and b
}`,
        solution: `function add(a, b) {
  return a + b;
}`,
        tests: [
          { input: [2, 3], expected: 5 },
          { input: [-1, 1], expected: 0 },
          { input: [10, 20], expected: 30 },
        ],
        difficulty: 'easy',
        category: 'JavaScript',
        order: 2,
      },
      {
        title: 'Reverse String',
        description: 'Write a function that reverses a string.',
        instructions: `Create a function called 'reverseString' that takes a string and returns it reversed.

Example:
- reverseString("hello") should return "olleh"
- reverseString("world") should return "dlrow"
- reverseString("") should return ""

Your function should:
1. Accept a single string parameter
2. Return the string with characters in reverse order
3. Handle empty strings`,
        starterCode: `function reverseString(str) {
  // Your code here
  // Return the reversed string
}`,
        solution: `function reverseString(str) {
  return str.split('').reverse().join('');
}`,
        tests: [
          { input: 'hello', expected: 'olleh' },
          { input: 'world', expected: 'dlrow' },
          { input: '', expected: '' },
        ],
        difficulty: 'medium',
        category: 'JavaScript',
        order: 3,
      },
    ];

    for (const challenge of sampleChallenges) {
      await db.insert(challenges).values({
        title: challenge.title,
        description: challenge.description,
        instructions: challenge.instructions,
        starterCode: challenge.starterCode,
        solution: challenge.solution,
        tests: JSON.stringify(challenge.tests),
        difficulty: challenge.difficulty as 'easy' | 'medium' | 'hard',
        category: challenge.category,
        order: challenge.order,
      });
    }

    console.log('✅ Created sample challenges');

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Login Credentials:');
    console.log('Admin: admin@coder.com / admin123');
    console.log('Teacher: teacher@coder.com / teacher123');
    console.log('Student: student@coder.com / student123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seed(); 