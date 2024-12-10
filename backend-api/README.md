# Backend API

## Docker Deployment

### Prerequisites
- Docker
- Docker Compose
- Poetry (optional)

### Building and Running

1. Build and start the service:
```bash
docker-compose up --build
```

2. The API will be accessible at `http://localhost:5000`

### Development

For development with hot-reloading:
```bash
docker-compose -f docker-compose.yml up --build
```

### Stopping the Application
```bash
docker-compose down
```

## Local Development

1. Install dependencies:
```bash
poetry install
```

2. Run the application:
```bash
poetry run flask run
```
