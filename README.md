# PERN-Backend

A production-ready backend API built with the **PERN Stack** (PostgreSQL, Express/Fastify, React, Node.js). This project implements a comprehensive test management and student assessment platform with OAuth integration, role-based access control, and comprehensive database management.

Currently deployed on **Vercel** (previously on VPS with Docker orchestration).

---

## 🚀 Features

### Core Functionality
- **User Management**: Multi-role authentication (ADMIN, STUDENT, BUILDER) with JWT-based session management
- **OAuth Integration**: Google OAuth 2.0 authentication with automatic account creation
- **Test Management**: Create, manage, and execute online tests with real-time session tracking
- **Question Bank**: Comprehensive question management with multiple categories and difficulty levels
- **Comprehension Module**: Reading comprehension tests with passage-based questions
- **Result Tracking**: Detailed scoring system with breakdowns (Aptitude, Core, Verbal, Programming, Comprehension)
- **User Feedback**: Collect and analyze student feedback with preference tracking
- **Session Management**: Secure login sessions with expiration and code-based access

### Technical Features
- **Type-Safe**: Full TypeScript with strict mode enabled
- **Validation**: Zod schema validation with Fastify type provider integration
- **Database**: Prisma ORM with PostgreSQL for type-safe database access
- **Security**: 
  - JWT authentication with httpOnly cookies
  - bcrypt password hashing
  - CORS protection
  - Role-based access control
- **File Storage**: AWS S3 integration for image and file uploads
- **CSV Support**: PapaParse for data import/export
- **Performance**: Built on Fastify for high performance and low overhead

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Runtime** | Node.js | 20 (Alpine) |
| **Framework** | Fastify | ^5.6.2 |
| **Language** | TypeScript | ^5.9.3 |
| **Database** | PostgreSQL | 16.4 |
| **ORM** | Prisma | ^7.2.0 |
| **Validation** | Zod | ^4.3.5 |
| **Authentication** | JWT + OAuth2 | @fastify/jwt, @fastify/oauth2 |
| **Security** | bcrypt | ^6.0.0 |
| **AWS Integration** | AWS SDK (S3) | ^3.967.0 |
| **Data Processing** | PapaParse | ^5.5.3 |
| **Container** | Docker | Latest |

---

## 📦 Getting Started

### Prerequisites
- Node.js 20+
- Docker & Docker Compose (for containerized setup)
- PostgreSQL 16+ (if not using Docker)
- Environment variables configured (see `.env.example`)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mubashir-73/PERN-Backend.git
   cd PERN-Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your configuration:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/tutorial_db"
   JWT_SECRET="your-secret-key-change-in-production"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   GOOGLE_CALLBACK_URL="http://localhost:3000/auth/google/callback"
   ADMIN_EMAILS="admin@example.com"
   NODE_ENV="development"
   ```

### Local Development

#### Option 1: Using Docker Compose (Recommended)

**Development Setup** (PostgreSQL only):
```bash
docker-compose -f docker-compose.dev.yaml up -d
```

This starts a PostgreSQL container on port 5432. Then run:
```bash
npm run dev
```

**Full Stack** (including app and Prisma Studio):
```bash
docker-compose up --build
```

This includes:
- PostgreSQL database (port 5432)
- Fastify application (port 3000)
- Prisma Studio (port 5555) - accessible at `http://localhost:5555`

#### Option 2: Manual Setup

1. Start PostgreSQL (using your preferred method)

2. Run migrations:
   ```bash
   npx prisma migrate deploy
   ```

3. Seed database (optional):
   ```bash
   npx prisma db seed
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

Server runs on `http://localhost:3000`

---

## 🐳 Docker & Containerization

### Docker Architecture

This project uses a multi-container setup optimized for development and production:

#### **Production Build** (`docker-compose.yaml`)
```yaml
Services:
├── db: PostgreSQL 16.4 Alpine
│   └── Port: 5432
│   └── Volume: Persistent data storage
├── app: Fastify Application
│   ├── Port: 3000
│   ├── Auto-runs migrations on startup
│   ├── Seeds database if needed
│   └── Starts production server
└── studio: Prisma Studio (localhost only)
    ├── Port: 5555 (localhost only)
    └── GUI for database management
```

#### **Development Setup** (`docker-compose.dev.yaml`)
```yaml
Services:
└── db: PostgreSQL 16.4 Alpine
    ├── Port: 5432
    └── Volume: Development data
```

### Build Configuration

**Dockerfile Breakdown:**
```dockerfile
FROM node:20-alpine           # Lightweight Alpine image
WORKDIR /usr/src/app          # Set working directory
COPY package*.json ./          # Copy dependencies
RUN npm install               # Install dependencies
COPY . .                       # Copy source code
ENV DATABASE_URL=...          # Dummy URL for build-time generation
RUN npx prisma generate       # Generate Prisma client
RUN npm run build             # Compile TypeScript
EXPOSE 3000                    # Expose port
CMD ...                        # Run migrations, seed, and start
```

### Common Docker Commands

**Build and run:**
```bash
docker-compose up --build
```

**Run in background:**
```bash
docker-compose up -d
```

**Stop containers:**
```bash
docker-compose down
```

**Remove volumes (clean slate):**
```bash
docker-compose down -v
```

**View logs:**
```bash
docker-compose logs -f app
```

**Execute command in container:**
```bash
docker-compose exec app npx prisma studio
```

---

## 🗄️ Database Management with Prisma

### Prisma Studio

Prisma Studio is a visual database GUI included in the Docker setup.

#### **Local Access (Development)**
```bash
npm run dev
# Then visit: http://localhost:5555
```

#### **VPS/Remote Server Access** ⚠️ **IMPORTANT SECURITY NOTE**

When deploying to a VPS, Prisma Studio exposes by default on all interfaces. **This is a security risk in production.**

**Recommended Practices:**

1. **Local-Only Binding** (Default in docker-compose.yaml)
   ```yaml
   studio:
     ports:
       - "127.0.0.1:5555:5555"  # Only accessible from localhost
   ```

2. **SSH Tunnel for Remote Access** (Safe method)
   ```bash
   # From your local machine:
   ssh -L 5555:localhost:5555 user@your-vps-ip
   # Then visit: http://localhost:5555
   ```

3. **For Production VPS:**
   - **Never expose** Prisma Studio publicly without authentication
   - Always use SSH tunneling for remote management
   - Consider disabling studio service entirely in production
   - Keep database credentials secure in environment variables

4. **Direct Studio Launch on VPS** (if needed)
   ```bash
   # SSH into VPS, then:
   cd /path/to/app
   npx prisma studio --port 5555 --browser none
   ```
   Access via SSH tunnel as described above.

### Common Prisma Commands

```bash
# Generate Prisma client after schema changes
npx prisma generate

# Create and apply migrations
npx prisma migrate dev --name migration_name

# Apply existing migrations
npx prisma migrate deploy

# Reset database (development only!)
npx prisma migrate reset

# Seed database
npx prisma db seed

# Open Prisma Studio
npx prisma studio
```

### Database Schema

The application includes models for:
- **Users**: Multi-role user management with OAuth support
- **TestSessions**: Student test instances with session tracking
- **Questions**: Comprehensive question bank with image support
- **Results**: Detailed scoring and performance analytics
- **Feedback**: User feedback collection
- **LoginSessions**: Session code management
- **Comprehensions**: Reading comprehension module

See `prisma/schema.prisma` for full schema details.

---

## 🚀 Deployment

### Vercel Deployment (Current)

The project is currently deployed on **Vercel**, which provides:
- Automatic deployments from main branch
- Environment variable management
- PostgreSQL database via external provider
- Zero-downtime deployments
- Built-in monitoring and logs

**Why Vercel over VPS:**
- Serverless architecture eliminates infrastructure management
- Automatic scaling based on demand
- Better cost efficiency (pay per execution)
- Easier CI/CD integration
- Built-in security and DDoS protection

### VPS Deployment (Previous Setup)

Previous VPS deployment used Docker for containerization:

```bash
# SSH into VPS
ssh user@your-vps-ip

# Clone repository
git clone https://github.com/mubashir-73/PERN-Backend.git
cd PERN-Backend

# Copy production environment
cp .env.example .env
# Edit .env with production values

# Build and start
docker-compose up --build -d

# View logs
docker-compose logs -f
```

**VPS Maintenance:**
```bash
# Update container
docker-compose pull && docker-compose up -d

# Backup database
docker-compose exec db pg_dump -U user123 tutorial_db > backup.sql

# Restore database
docker-compose exec -T db psql -U user123 tutorial_db < backup.sql
```

---

## 🔑 Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Database Connection
DATABASE_URL="postgresql://user123:password123@db:5432/tutorial_db"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Google OAuth Configuration
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_CALLBACK_URL="http://localhost:3000/auth/google/callback"

# Admin Configuration
ADMIN_EMAILS="admin@example.com,another-admin@example.com"

# Environment
NODE_ENV="development"  # or "production"

# AWS S3 (for file uploads)
AWS_ACCESS_KEY_ID="your-key"
AWS_SECRET_ACCESS_KEY="your-secret"
AWS_REGION="us-east-1"
S3_BUCKET="your-bucket-name"
```

**Note:** In production (Vercel), these are managed via environment variables in the deployment platform.

---

## 📝 Available Scripts

```bash
# Development server with hot reload
npm run dev

# TypeScript compilation
npm run build

# Start production server
npm start

# Database management
npx prisma migrate dev       # Create and apply migrations
npx prisma migrate deploy    # Apply pending migrations
npx prisma db seed          # Seed database
npx prisma studio           # Open visual database GUI
npx prisma generate         # Generate Prisma client

# Type checking
tsc --noEmit
```

---

## 🏗️ Project Structure

```
PERN-Backend/
├── src/                    # Application source code
│   ├── routes/            # API endpoints
│   ├── controllers/        # Request handlers
│   ├── services/          # Business logic
│   ├── schemas/           # Zod validation schemas
│   └── server.ts          # Fastify app entry point
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── migrations/        # Database migration history
├── Dockerfile             # Production container image
├── docker-compose.yaml    # Production multi-container setup
├── docker-compose.dev.yaml # Development setup
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

---

## 🔐 Security Considerations

- ✅ JWT tokens stored in httpOnly cookies
- ✅ Password hashing with bcrypt
- ✅ CORS protection enabled
- ✅ Prisma Studio locked to localhost in production
- ✅ Environment variables for sensitive data
- ⚠️ Always use HTTPS in production
- ⚠️ Regularly update dependencies: `npm audit fix`
- ⚠️ Keep JWT_SECRET and other secrets strong and unique

---

## 📚 API Documentation

API endpoints are documented with Zod schemas and TypeScript types. Key endpoints include:

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/google/callback` - Google OAuth callback
- `POST /tests/start` - Start a test session
- `GET /tests/:sessionId` - Get test session details
- `POST /tests/submit-answer` - Submit answer
- `POST /tests/complete` - Complete test
- `GET /results/:userId` - Get user results

See `src/routes/` for detailed endpoint implementations.

---

## 🤝 Development Guidelines

### Code Style
- Use `.js` extensions for all ES module imports
- Strict TypeScript (`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`)
- Validate inputs with Zod schemas
- Modular structure: one controller/service pair per feature

### Best Practices
- Use `authGuard` decorator for protected routes
- Proper HTTP status codes and error messages
- Try-catch blocks for error handling
- Document complex logic

### Testing
Add comprehensive tests before implementing new features.

---

## 🐛 Troubleshooting

### "Database connection refused"
- Ensure PostgreSQL is running
- Check DATABASE_URL in `.env`
- Verify network connectivity

### "Prisma client not generated"
```bash
npx prisma generate
```

### "Port already in use"
```bash
# Find and kill process using port 3000
lsof -i :3000
kill -9 <PID>
```

### "Docker build fails"
```bash
# Clean build
docker-compose build --no-cache
docker-compose up
```

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

**mubashir-73** - Full-stack developer

---

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation in `AGENTS.md`
- Review `prisma/schema.prisma` for database structure

---

**Last Updated:** May 4, 2026  
**Status:** Active (Deployed on Vercel)
