# Schema Design — Personal Productivity Hub

> Fill in every section below. Keep answers concise.

---

## 1. Collections Overview

Briefly describe each collection (1–2 sentences each):

- **users** —

Each user has its own login username and password. One user can have multiple projects.

- **projects** —

Multiple projects can be assigned to one user. A project can have multiple tasks and notes.

- **tasks** —

The tasks are related to the projects. Each task can have status and subtasks.

- **notes** —

free-from text notes owned by a user.Optionally attached to a project

---

## 2. Document Shapes

For each collection, write the document shape (field name + type + required/optional):

### users
```
{
  _id: ObjectId,
  email: string (required, unique),
  passwordHash: string (required),
  name: string (required),
  createdAt: Date (required)
}
```

### projects
```
{
  _id: ObjectId,
  userid: ObjectId (required, reference to the users),
  name: string (required),
  description: string (optional)
  createdAt: Date (required)

}
```

### tasks
```
{
  _id: ObjectId,
  userId: ObjectId (required, → users._id),
  projectId: ObjectId (required, → projects._id),
  title: string (required),
  status: string (required, enum: todo | in-progress | done),
  priority: number (required, 1-5),
  tags: string[] (required, may be empty),
  subtasks: [
    { title: string, done: boolean }
  ] (required, may be empty),
  description: string (optional),         // schema flexibility
  dueDate: Date (optional),               // schema flexibility
  createdAt: Date (required)
}
```

### notes
```
{
  _id: ObjectId,
  userId: ObjectId (required, → users._id),
  projectId: ObjectId (optional, → projects._id),
  title: string (required),
  body: string (required),
  tags: string[] (required, may be empty),
  pinned: boolean (optional),             // schema flexibility — only on some
  createdAt: Date (required)
}
```

---

## 3. Embed vs Reference — Decisions

For each relationship, state whether you embedded or referenced, and **why** (one sentence):

| Relationship                  | Choice    | Why? |
|------------------------------|-----------|------|
| Subtasks inside a task        | **Embed** | Subtasks are owned by exactly one task, never queried independently, and almost always read together with their parent. One read fetches the whole task. |
| Tags on a task                | **Embed** (as array) | Tags are short strings, finite per task, and used for filtering. An array of strings is the simplest representation. |
| Project → Task ownership      | **Reference** (`projectId`) | A project has many tasks (could be hundreds). Embedding tasks inside a project would create unbounded growth. Tasks are also queried independently of their project. |
| Note → optional Project link  | **Reference** (`projectId` optional) | A note may or may not belong to a project. Reference makes the relationship optional naturally. |


---

## 4. Schema Flexibility Example

Name one field that exists on **some** documents but not **all** in the same collection. Explain why this is acceptable (or even useful) in MongoDB.

> The `pinned` field exists on **only one** note in the seed data, and the `dueDate` field exists on **some but not all** tasks.

This is acceptable in MongoDB because the schema is enforced at the application layer, not the database. Tasks without a `dueDate` simply don't have the key — there's no "NULL" overhead. The query layer treats missing fields as not-equal-to-anything by default, so `find({ dueDate: { $exists: true } })` cleanly separates the two cases.

This is useful here because not every task has a deadline (some are open-ended), and forcing every document to carry a `dueDate: null` would waste storage and clutter the data shape.
