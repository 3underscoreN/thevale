# The Vale

A simple website for people to leave their emotion as an echo, and for listening to other people's emotions.

This project is deployed on [Vercel](https://the-vale-zeta.vercel.app/).

## Stack

![Next.js](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/tailwind%20css-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgresql-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

## Deployment
1. Clone the repository
```bash
git clone https://github.com/3underscoreN/theVale; cd theVale
```
2. Install dependencies
```bash
npm install
```
3. Create a `.env` file in the root directory and add the URL to the database:
```bash
// File: .env.local
DATABASE_URL="postgres://..."
DATABASE_URL_DEV="postgres://..."
```
4. Run the server
```bash
npm run dev
```
5. Open your browser and go to `http://localhost:3000`.

