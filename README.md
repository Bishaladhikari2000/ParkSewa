# ParkSewa - Class Project

A web application for finding and managing parking spots, developed as part of our university coursework.

## Features

- User authentication system
- Parking spot reservation functionality
- Admin dashboard for management
- Real-time availability updates

## Installation

1. Clone this repository
2. Run `npm install` in both /client and /server folders
3. Create `.env` files in both client and server directories using the provided templates
4. Start development servers with `npm run dev` in both folders

## Environment Setup

### Client (.env)

```
VITE_API_URL=http://localhost:3000
```

### Server (.env)

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=24h

# Predefined User Credentials (Change these in production)
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
PARKING_OWNER_EMAIL=owner@example.com
PARKING_OWNER_PASSWORD=your_owner_password
```

> ⚠️ **Security Note**:
>
> - Never commit the actual `.env` file to version control
> - Keep your MongoDB connection string and JWT secret secure
> - Change all default credentials in production
> - Consider using a secure secret management service for production deployments

## Technologies Used

- React.js frontend with TypeScript
- Node.js/Express.js backend
- MongoDB database
- JWT authentication

## Project Structure

```
/client       - Frontend React application
/server       - Backend Node.js server
  /models     - Database schemas
  /routes     - API endpoints
```

## Known Issues

### Authentication Issues

- CORS errors during authentication requests
  - Ensure CORS configuration matches client origin
  - Check if credentials are included in requests

### Environment Configuration

- Missing environment variables can cause connection failures
  - Verify all required variables are set in both .env files
  - Check MongoDB connection string format

### TypeScript Errors

- Type mismatches in admin dashboard statistics
  - Ensure API response types match interface definitions
  - Update type definitions when modifying data structures

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Run tests to ensure functionality
5. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
6. Push to the branch (`git push origin feature/AmazingFeature`)
7. Open a Pull Request

### Development Guidelines

- Follow existing code style and conventions
- Add appropriate TypeScript types for new features
- Update tests for new functionality
- Document API changes in comments
- Keep commits focused and descriptive

### Debugging Tips

1. Check browser console for frontend errors
2. Verify API endpoints using tools like Postman
3. Monitor server logs for backend issues
4. Use TypeScript compiler for type checking
5. Test authentication flow with different user roles
