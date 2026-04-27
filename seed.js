// seed.js
// =============================================================================
//  Seed the database with realistic test data.
//  Run with: npm run seed
//
//  Required minimum:
//    - 2 users
//    - 4 projects (split across the users)
//    - 5 tasks (with embedded subtasks and tags arrays)
//    - 5 notes (some attached to projects, some standalone)
//
//  Use the bcrypt module to hash passwords before inserting users.
//  Use ObjectId references for relationships (projectId, ownerId).
// =============================================================================

require('dotenv').config();
const { ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const { connect } = require('./db/connection');

(async () => {
  const db = await connect();

  // OPTIONAL: clear existing data so re-seeding is idempotent
  await db.collection('users').deleteMany({});
  await db.collection('projects').deleteMany({});
  await db.collection('tasks').deleteMany({});
  await db.collection('notes').deleteMany({});

  // =============================================================================
  //  TODO: Insert your seed data below.
const userId1 = new ObjectId(); 
const userId2 = new ObjectId(); 

const proj1Id = new ObjectId(); 
const proj2Id = new ObjectId(); 
const proj3Id = new ObjectId(); 
const proj4Id = new ObjectId(); 

// 2. INSERT USERS 
console.log('Inserting Users...');
const passwordHash1 = await bcrypt.hash('password123', 10);
const passwordHash2 = await bcrypt.hash('password456', 10);

await db.collection('users').insertMany([
  {
    _id: userId1,
    email: "ali@gmail.com",
    passwordHash: passwordHash1,
    name: "Ali",
    createdAt: new Date()
  },
  {
    _id: userId2,
    email: "taha@gmail.com",
    passwordHash: passwordHash2,
    name: "Taha",
    createdAt: new Date()
  }
]);

// 3. INSERT PROJECTS 
console.log('Inserting Projects...');
await db.collection('projects').insertMany([
  {
    _id: proj1Id,
    userId: userId1, 
    name: 'Portfolio Website',
    description: 'Redesigning personal portfolio.',
    createdAt: new Date()
  },
  {
    _id: proj2Id,
    userId: userId1,
    name: 'Ecommerce Platform',
    description: 'Building a new e-commerce platform.',
    createdAt: new Date()
  },
  {
    _id: proj3Id,
    userId: userId2, 
    name: 'Home Renovation',
    description: 'Kitchen remodel tracking.',
    createdAt: new Date()
  },
  {
    _id: proj4Id,
    userId: userId2, 
    name: 'Marathon Training',
    description: 'Prep for the 10k run.',
    createdAt: new Date()
  }
]);

// 4. INSERT TASKS 

console.log('Inserting Tasks...');
await db.collection('tasks').insertMany([
  {
    userId: userId1,
    projectId: proj1Id,
    title: 'Design wireframes',
    status: 'in-progress',
    priority: 5,
    tags: ['design', 'urgent'],
    subtasks: [
      { title: 'Homepage layout', done: true },
      { title: 'Contact form', done: false }
    ],
    dueDate: new Date('2026-05-01'), 
    createdAt: new Date()
  },
  {
    userId: userId1,
    projectId: proj2Id,
    title: 'Write seed.js',
    status: 'done',
    priority: 4,
    tags: ['university', 'nosql'],
    subtasks: [
      { title: 'Insert users', done: true },
      { title: 'Insert projects', done: true }
    ],
    createdAt: new Date()
  },
  {
    userId: userId2,
    projectId: proj3Id,
    title: 'Buy paint',
    status: 'todo',
    priority: 3,
    tags: ['shopping', 'kitchen'],
    subtasks: [
      { title: 'Get color swatches', done: true },
      { title: 'Buy 3 gallons', done: false }
    ],
    createdAt: new Date()
  },
  {
    userId: userId2,
    projectId: proj4Id,
    title: 'Weekend long run',
    status: 'todo',
    priority: 4,
    tags: ['fitness'],
    subtasks: [
      { title: 'Map route', done: false },
      { title: 'Prepare water', done: false }
    ],
    createdAt: new Date()
  },
  {
    userId: userId1,
    projectId: proj1Id,
    title: 'Setup Domain',
    status: 'done',
    priority: 2,
    tags: ['devops'],
    subtasks: [
      { title: 'Buy domain', done: true }
    ],
    createdAt: new Date()
  }
]);

// 5. INSERT NOTES 
console.log('Inserting Notes...');
await db.collection('notes').insertMany([
  {
    userId: userId1,
    projectId: proj1Id, 
    title: 'Color Ideas',
    body: 'Thinking about a dark theme.',
    tags: ['design'],
    pinned: true, 
    createdAt: new Date()
  },
  {
    userId: userId1,
    // NO projectId here! This makes it a standalone note.
    title: 'Grocery List',
    body: 'Milk, Eggs, Bread.',
    tags: ['personal'],
    createdAt: new Date()
  },
  {
    userId: userId2,
    projectId: proj3Id, 
    title: 'Contractor Info',
    body: 'Plumber: $500, Electrician: $350.',
    tags: ['budget'],
    createdAt: new Date()
  },
  {
    userId: userId2,
    // NO projectId! Standalone note.
    title: 'Shoe Brands',
    body: 'Need to look up reviews for the new running shoes.',
    tags: ['shopping'],
    createdAt: new Date()
  },
  {
    userId: userId1,
    projectId: proj2Id, 
    title: 'Lab Deadlines',
    body: 'Lab is due before the session ends!',
    tags: ['urgent'],
    pinned: true,
    createdAt: new Date()
  }
]);




  //
  //  Hints:
  //    - Hash passwords:   const hash = await bcrypt.hash('password123', 10);
  //    - Capture inserted ids:
  //        const u = await db.collection('users').insertOne({ ... });
  //        const userId = u.insertedId;
  //    - Use those ids when inserting projects/tasks/notes.
  //    - Demonstrate schema flexibility: include at least one optional field
  //      on SOME documents but not all (e.g. dueDate on some tasks only).
  //
  //  Sample task shape:
  //    {
  //      ownerId: <ObjectId>,
  //      projectId: <ObjectId>,
  //      title: "Write report introduction",
  //      status: "todo",
  //      priority: 3,
  //      tags: ["writing", "urgent"],
  //      subtasks: [
  //        { title: "Outline sections", done: true },
  //        { title: "Draft", done: false }
  //      ],
  //      createdAt: new Date()
  //    }
  // =============================================================================

  console.log('TODO: implement seed.js');
  process.exit(0);
})();
