### To Do List App Next.js Project

## Description
Develop a comprehensive to-do list application to manage tasks with additional features such as user authentication, tagging, and due dates.


### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or higher)
- npm (v6 or higher)

### Project Setup

To set up the project, clone the repository and install the dependencies:

```bash
    `git clone https://github.com/ElayeDegu/todo-app.git`
     cd eduopia
    `npm install`
```

### Scripts

# Start Development Server

`npm run dev`

This command runs setup-db, deploys Prisma migrations, and starts the Next.js development server on localhost:3000.

# Build the Application

`npm run build`

This command builds the Next.js application.

# Start the Application

`npm run start`

This command starts the built Next.js application.

# Run Tests

`npm run test`

This will run the Jest test suite and provide a coverage report.

# Run Lint

`npm run lint`

This will run ESLint to check for linting issues in your code.

# Fix Lint Issues

`npm run lint-fix`

This will run ESLint and automatically fix linting issues where possible.

# Format Code

`npm run format`

This will format your code using Prettier.


### Features

1. User Authentication

    - Sign up, log in, and log out functionalities.
    - Password recovery option.


2. Task Management

    - Add, edit, and delete tasks.
    - Mark tasks as completed.
    - Set due dates for tasks.
    - Add priority levels to tasks (e.g., low, medium, high).
    - Tagging system to categorize tasks (e.g., work, personal, urgent).


3. Task Organization

    - Filter tasks by completion status (completed, pending).
    - Filter tasks by due dates (today, this week, upcoming).
    - Search tasks by title or tag.


4. User Interface

    - Responsive design for mobile and desktop views.
    - Dark mode and light mode options.
    - Drag and drop functionality to reorder tasks.

5. Notifications

    - Push notifications for upcoming and overdue tasks.
    - Email reminders for due tasks.

6. Data Persistence

    - Save tasks locally when offline and sync when back online.


### Technologies

1. Frontend

    - Next.js 14: For building the user interface and handling server-side rendering.
    - React Hooks: For managing state and side effects.
    - CSS Modules/Tailwind CSS: For styling components.
    - React DnD: For drag and drop functionality.
    - Axios: For making API calls.

2. Backend

    - Next.js API Routes: For handling authentication and CRUD operations.
    - Node.js: For server-side logic.
    - Express.js: As a backend framework if more complexity is needed.
    - MongoDB: For storing user and task data.
    - Mongoose: For MongoDB object modeling.

3. Authentication

    - NextAuth.js: For implementing authentication.
    - JWT: For handling user sessions securely.

4. Notifications

    - Firebase Cloud Messaging: For push notifications.
    - Nodemailer: For sending email reminders.

5. State Management

    - React Context API: For managing global state.
    - React Query: For data fetching and state synchronization.

7. Testing

    - Jest: For unit and integration testing.
    - React Testing Library: For testing React components.
    - Cypress: For end-to-end testing.
