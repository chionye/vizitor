# Visitor Management System - Frontend

A modern, responsive visitor management system built with React, TypeScript, TailwindCSS, and Zustand.

## Features

### 1. Authentication & User Management
- Secure login with JWT token-based authentication
- Role-based access control (Admin, Security Officer, Receptionist)
- Protected routes and session management

### 2. Visitor Registration (CRUD)
- Create, read, update, and delete visitor records
- Comprehensive visitor information capture:
  - Personal details (name, email, phone)
  - Company information
  - Purpose of visit
  - Host staff assignment
  - ID verification (type and number)
  - Vehicle registration
- Real-time form validation

### 3. Visitor Log Dashboard
- Today's visitors overview
- Active visitors count
- Weekly and monthly statistics
- Recent visitor activity
- Advanced search and filtering:
  - By visitor name
  - By date range
  - By host staff
  - By status

### 4. Staff Management
- User/staff CRUD operations
- Role assignment (Admin, Security Officer, Receptionist)
- User profile management

### 5. Visitor Pass/Badge Generation
- Professional visitor badge design
- QR code generation for visitor verification
- Printable badges with:
  - Visitor name and code
  - Company information
  - Host staff name
  - Check-in time
  - Purpose of visit
  - QR code for quick scanning

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Zustand** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **date-fns** - Date formatting
- **qrcode.react** - QR code generation
- **react-hot-toast** - Toast notifications
- **Lucide React** - Icon library

## Project Structure

```
src/
├── components/
│   ├── common/          # Reusable UI components (Button, Input, Modal, etc.)
│   ├── auth/            # Authentication components
│   ├── layout/          # Layout components (Sidebar, Header)
│   ├── visitors/        # Visitor management components
│   ├── dashboard/       # Dashboard components
│   └── users/           # User management components
├── pages/               # Page components
├── stores/              # Zustand stores
├── services/            # API services
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
├── App.tsx              # Main app component
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vizitor
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure your API endpoint in `.env`:
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## API Integration

The frontend expects the following API endpoints:

### Authentication
- `POST /auth/login` - User login
- `GET /auth/profile` - Get user profile

### Visitors
- `GET /visitors` - Get all visitors
- `GET /visitors/:id` - Get visitor by ID
- `POST /visitors` - Create new visitor
- `PUT /visitors/:id` - Update visitor
- `DELETE /visitors/:id` - Delete visitor
- `POST /visitors/:id/checkout` - Check out visitor
- `GET /visitors/today` - Get today's visitors
- `GET /visitors/stats` - Get dashboard statistics
- `GET /visitors/search` - Search visitors

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

## Features Breakdown

### Modern UI/UX
- Clean, professional design
- Responsive layout (mobile, tablet, desktop)
- Intuitive navigation
- Real-time notifications
- Loading states and error handling

### Component Architecture
- Modular, reusable components
- Proper separation of concerns
- TypeScript for type safety
- Consistent coding patterns

### State Management
- Centralized state with Zustand
- Persistent authentication state
- Optimistic UI updates
- Error handling

### Form Validation
- Client-side validation
- Required field checking
- Email format validation
- Phone number validation
- Password strength requirements

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
