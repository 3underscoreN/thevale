# The Vale

_Also available in [繁體中文](README-zh-TW.md)._

[![Website Deploy](https://deploy-badge.vercel.app/?url=https://thevale.top&name=Vercel)](https://thevale.top)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

A simple website for people to leave their emotion as an echo, and for listening to other people's emotions.

This project is deployed on [Vercel](https://thevale.top).

## Project status

As i get increasingly busier with academics and work, this project is currently not in active development.

However, I will still try my best to maintain the current production deployment, as well as attempting to change the code such that it's more friendly for other developers.

This doesn't mean the project will be abandonded. 

So as you - you're an important individual. Thank you for trying your best to survive.

## Stack

![Next.js](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/tailwind%20css-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgresql-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

## Contribution
Contribution to the project is welcomed. Please open a pull request to `develop` if the branch exists, or `main` if not. 

## Deployment
You need to have a PostgreSQL database running. This project uses Neon for the database. You can sign up for an account at [Neon](https://neon.tech/).

You also need a Clerk account for authentication when you use the admin panel. You can sign up for an account at [Clerk](https://clerk.dev/).

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
DATABASE_URL="postgresql://..."
DATABASE_URL_DEV="postgresql://..."
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
```
4. Run the server
```bash
npm run dev
```
5. Open your browser and go to `http://localhost:3000`.
