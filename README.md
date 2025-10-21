# SysTrack Frontend

A modern system monitoring and analytics platform built with React, TypeScript, and cutting-edge web technologies.

## 🚀 Features

- **Beautiful Landing Page** - Modern, responsive design with gradient backgrounds and smooth animations
- **Authentication System** - Secure login with JWT tokens and refresh token management
- **Dashboard** - Real-time system monitoring with comprehensive metrics
- **Modern UI** - Built with Shadcn/ui components and Tailwind CSS
- **Type Safety** - Full TypeScript support with Zod validation
- **State Management** - Zustand for lightweight state management
- **Form Handling** - React Hook Form with validation
- **Routing** - Tanstack Router for type-safe routing

## 🛠️ Tech Stack

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tanstack Router** - Type-safe routing
- **Tanstack Query** - Server state management
- **Shadcn/ui** - Beautiful, accessible UI components
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Performant form handling
- **Zod** - TypeScript-first schema validation
- **Zustand** - Lightweight state management
- **Lucide React** - Beautiful icons

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd systrack/frontend
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Set up environment variables**

   ```bash
   # Create .env.local file
   cp .env.example .env.local

   # Edit .env.local with your configuration
   VITE_API_URL=http://localhost:3000/api
   VITE_NODE_ENV=development
   ```

4. **Start the development server**
   ```bash
   bun run dev
   ```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   └── ui/             # Shadcn/ui components
├── features/           # Feature-based organization
│   └── screen/         # Screen components
│       ├── dashboard/  # Dashboard screens
│       ├── landing-page/ # Landing page
│       └── login/      # Authentication screens
├── lib/                # Utility libraries
│   ├── api.ts         # API client
│   ├── auth.ts        # Authentication manager
│   ├── config.ts      # Configuration
│   ├── utils.ts       # Utility functions
│   └── validations.ts # Zod schemas
├── routes/            # Route definitions
├── stores/            # State management
└── main.tsx          # Application entry point
```

## 🔐 Authentication

The application uses a sophisticated authentication system with:

- **JWT Access Tokens** - Short-lived tokens (30 minutes)
- **Refresh Tokens** - Long-lived tokens (30 days) stored securely
- **Automatic Token Refresh** - Seamless token renewal
- **Secure Storage** - Tokens stored in localStorage with encryption
- **Route Protection** - Automatic redirection for unauthenticated users

### Authentication Flow

1. User submits login form
2. Server validates credentials and returns JWT tokens
3. Tokens are stored securely in localStorage
4. Access token is included in API requests
5. Automatic refresh when token expires
6. Logout clears all stored tokens

## 🎨 UI Components

Built with Shadcn/ui components for consistency and accessibility:

- **Button** - Various button styles and sizes
- **Card** - Content containers with shadows
- **Input** - Form input fields
- **Form** - Form handling with validation
- **Label** - Accessible form labels

## 📱 Responsive Design

The application is fully responsive with:

- Mobile-first design approach
- Flexible grid layouts
- Responsive typography
- Touch-friendly interactions
- Optimized for all screen sizes

## 🚀 Development

### Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run lint` - Run ESLint
- `bun run preview` - Preview production build

### Adding New Components

```bash
# Add Shadcn/ui components
bunx shadcn@latest add <component-name>

# Example
bunx shadcn@latest add dialog
bunx shadcn@latest add table
```

### Code Style

- Use TypeScript for all new files
- Follow the existing import organization
- Use meaningful component and variable names
- Add proper TypeScript types
- Use Zod for validation schemas

## 🔧 Configuration

### Environment Variables

- `VITE_API_URL` - Backend API URL
- `VITE_NODE_ENV` - Environment (development/production)
- `VITE_TURNSTILE_SITE_KEY` - Cloudflare Turnstile site key

### API Configuration

The API client is configured in `src/lib/api.ts` and handles:

- Base URL configuration
- Authentication headers
- Error handling
- Request/response interceptors

## 🚀 Deployment

1. **Build the application**

   ```bash
   bun run build
   ```

2. **Deploy the `dist` folder** to your hosting provider

3. **Configure environment variables** in production

4. **Set up HTTPS** for secure token transmission

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Question or Need Help?

- Check the [documentation](./docs/)
- Open an [issue](https://github.com/your-repo/issues)
- Contact the development team

---

Built with ❤️ using modern web technologies
