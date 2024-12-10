# SmartFood Project

## Overview
SmartFood is an intelligent meal prediction and management system that leverages machine learning to forecast meal counts and provide insights.

## Project Structure
- `backend-api/`: Flask-based backend service
- `nextjs/`: Next.js frontend application
- `predictor/`: Machine learning model development and training

## Prerequisites
- Docker
- Docker Compose
- Python 3.12+
- Node.js 20+
- pnpm (package manager)

## Quick Start

### Docker Deployment

#### Build and Run
```bash
docker compose up --build
```

#### Services
- Next.js Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

## Machine Learning Model

### Data Preparation
- Located in `predictor/`
- Uses historical meal count data
- Generates predictive models for lunch and dinner meal counts

### Model Features
- Day of week cyclical encoding
- Month cyclical encoding
- Historical meal count features

## Development Workflow

### Adding New Features
1. Create a new branch: `git checkout -b feature/your-feature-name`
2. Implement changes
3. Run tests
4. Create a pull request

### Environment Variables
- Create `.env.local` files in respective project directories
- Never commit sensitive information

## Troubleshooting
- Ensure all dependencies are installed
- Check Docker container logs
- Verify network configurations

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License
[Specify your license here]

## Contact
[Your contact information or project maintainer details]
