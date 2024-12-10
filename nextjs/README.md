## Docker Deployment

### Prerequisites
- Docker
- pnpm (optional, but recommended)

### Building and Running

1. Create a `.env.local` file with your environment variables:
   ```
   # Example .env.local
   NEXT_PUBLIC_API_URL=http://backend-api:8000
   ```

2. Build and run the application:
   ```bash
   docker-compose up --build
   ```

3. Access the application at `http://localhost:3000`

### Development with Docker

For development, you can use:
```bash
docker build . -t nextjs
docker run -p 3000:3000 -v "$(pwd)/.next:/app/.next" -v "$(pwd)/public:/app/public" -v "$(pwd)/.env.local:/app/.env.local" -e NODE_ENV=development nextjs
```

### Stopping the Application
```bash
docker stop
```
