import { relations } from 'drizzle-orm';
import { boolean, integer, jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  password: text('password'),
  role: text('role', { enum: ['admin', 'teacher', 'student'] }).notNull().default('student'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const classes = pgTable('classes', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description'),
  teacherId: uuid('teacher_id').notNull().references(() => users.id),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const classStudents = pgTable('class_students', {
  id: uuid('id').primaryKey().defaultRandom(),
  classId: uuid('class_id').notNull().references(() => classes.id),
  studentId: uuid('student_id').notNull().references(() => users.id),
  joinedAt: timestamp('joined_at').defaultNow().notNull(),
});

export const challenges = pgTable('challenges', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  instructions: text('instructions').notNull(),
  starterCode: text('starter_code').notNull(),
  solution: text('solution').notNull(),
  tests: jsonb('tests').notNull(),
  difficulty: text('difficulty', { enum: ['easy', 'medium', 'hard'] }).notNull(),
  category: text('category').notNull(),
  language: text('language').notNull().default('javascript'),
  timeLimit: integer('time_limit'), // in minutes
  points: integer('points').default(10),
  order: integer('order').notNull(),
  classId: uuid('class_id').references(() => classes.id),
  createdBy: uuid('created_by').notNull().references(() => users.id),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const submissions = pgTable('submissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  challengeId: uuid('challenge_id').notNull().references(() => challenges.id),
  studentId: uuid('student_id').notNull().references(() => users.id),
  code: text('code').notNull(),
  status: text('status', { enum: ['pending', 'passed', 'failed'] }).notNull().default('pending'),
  testResults: jsonb('test_results'),
  submittedAt: timestamp('submitted_at').defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  classes: many(classes),
  classStudents: many(classStudents),
  submissions: many(submissions),
}));

export const classesRelations = relations(classes, ({ one, many }) => ({
  teacher: one(users, {
    fields: [classes.teacherId],
    references: [users.id],
  }),
  students: many(classStudents),
  challenges: many(challenges),
}));

export const classStudentsRelations = relations(classStudents, ({ one }) => ({
  class: one(classes, {
    fields: [classStudents.classId],
    references: [classes.id],
  }),
  student: one(users, {
    fields: [classStudents.studentId],
    references: [users.id],
  }),
}));

export const challengesRelations = relations(challenges, ({ one, many }) => ({
  class: one(classes, {
    fields: [challenges.classId],
    references: [classes.id],
  }),
  createdBy: one(users, {
    fields: [challenges.createdBy],
    references: [users.id],
  }),
  submissions: many(submissions),
}));

export const submissionsRelations = relations(submissions, ({ one }) => ({
  challenge: one(challenges, {
    fields: [submissions.challengeId],
    references: [challenges.id],
  }),
  student: one(users, {
    fields: [submissions.studentId],
    references: [users.id],
  }),
})); 