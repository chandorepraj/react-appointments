# Appointment Booking – React Frontend

## Overview

This project is the frontend application for Appointment Booking, built using React and Vite. It provides an admin interface for authentication and role management, with a reusable layout based on the Sneat Bootstrap 5 Admin Template.

The frontend communicates with a Laravel REST API backend and uses React Router for navigation.

## Tech Stack

- **Frontend:** React
- **Build Tool:** Vite
- **Routing:** React Router
- **UI Framework:** Bootstrap 5
- **Admin Template:** Sneat Bootstrap 5 Admin Template
- **Backend:** Laravel REST API
- **Authentication:** Laravel Sanctum personal access tokens
- **HTTP Requests:** Fetch API

## Features

### Authentication
- Login page
- Protected routes
- Retrieve and display the authenticated user
- Logout functionality
- Handle unauthorized API responses
- Redirect to login when the API returns `401 Unauthorized`

### Role Management
- View roles in a paginated table
- Create roles
- Edit existing roles
- Delete roles with confirmation
- Navigate through numbered pagination buttons
- Return to the first page after deleting a role
- Display friendly errors for missing roles

### Navigation and Layout
- Reusable sidebar
- Navigation bar with authenticated user details
- Footer
- Dashboard route
- Reusable 404 page for unknown URLs

## Requirements

- Node.js and npm
- Laravel backend running locally
- A configured MySQL database for the backend

## Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd <your-react-project-folder>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the React project root:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

Update the URL if your Laravel API uses a different host or port.

**Important:** Do not commit your local `.env` file. If needed, provide a `.env.example` file containing only non-secret configuration examples.

### 4. Start the development server

```bash
npm run dev
```

Vite will display the local frontend URL in your terminal, commonly:

`http://localhost:5173`

## Connecting to the Laravel API

The frontend sends requests to the Laravel backend using the Fetch API.

The API base URL is configured through `VITE_API_URL` and exported from:

`src/services/api.js`

The shared `apiFetch()` helper attaches the saved access token to requests and handles `401 Unauthorized` responses by clearing the token and redirecting to the login page.

## Project Structure

```text
src/
├── components/
│   ├── Footer.jsx
│   ├── Navbar.jsx
│   └── Sidebar.jsx
├── context/
│   └── AuthContext.jsx
├── layouts/
│   └── AuthLayout.jsx
├── pages/
│   ├── AddRole.jsx
│   ├── Dashboard.jsx
│   ├── EditRole.jsx
│   ├── Login.jsx
│   ├── NotFound.jsx
│   └── Roles.jsx
├── services/
│   ├── api.js
│   ├── auth.js
│   └── role.js
├── App.jsx
└── ProtectedRoute.jsx
```

*Note: Update this structure if your actual files or folders differ.*

## Application Routes

| Route | Description | Access |
|---|---|---|
| `/login` | Login page | Public |
| `/dashboard` | Dashboard | Protected |
| `/roles` | List and manage roles | Protected |
| `/roles/create` | Create a role | Protected |
| `/roles/:id/edit` | Edit a role | Protected |
| Unknown routes | 404 page | Public fallback |

Protected routes require successful authentication.

## Authentication Flow

1. The user submits the login form.
2. React sends the credentials to the Laravel login API.
3. Laravel returns an access token on successful authentication.
4. The frontend stores the token in `localStorage`.
5. Protected API requests include the token in the `Authorization` header.
6. The application redirects to login when the API returns `401 Unauthorized`.
7. Logout calls the Laravel API and clears the local token.

## Development

Start the Laravel backend in a separate terminal:

```bash
php artisan serve
```

Then start the React frontend:

```bash
npm run dev
```

Ensure the API URL, backend availability, and Laravel CORS configuration are correct.

## Available Scripts

| Command | Description |
|---|---|
| `npm install` | Install project dependencies |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the production frontend |
| `npm run preview` | Preview the production build |

## Future Enhancements

Planned modules for the Appointment Booking application may include:

- User management
- Customer management
- Service management
- Appointment scheduling
- Payment management
- Dashboard reports

## License

This project uses the Sneat Bootstrap 5 Admin Template. Follow the template's applicable license terms when using or distributing its assets. Add an appropriate license for your own project before public distribution.