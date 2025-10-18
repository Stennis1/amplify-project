# Amplify - React + Vite App


## Project Overview
A full-stack web app built with React (Vite), AWS Amplify Gen 2, providing:

- **Frontend**: React + Vite
- **Data backend**: Amplify Data (TypeScript-first schema, real-time API + DynamoDB integration).
- **Auth & Permissions**: model-level and function-level authorization with API Key, Cognito, or Lambda policies.
- **Serverless triggers**: Lambda function invoked post-user-signup via an authorization rule.

# 🎬 CineStream - Movie Streaming Platform

A modern, responsive movie streaming platform built with React and AWS Amplify, featuring real-time movie data, user profiles, and theme customization.

![CineStream Demo](https://img.shields.io/badge/CineStream-Movie%20Platform-red) ![React](https://img.shields.io/badge/React-18.2-blue) ![AWS Amplify](https://img.shields.io/badge/AWS-Amplify-orange)

## ✨ Features
- **Video Player**: Embedded YouTube trailer playback
- **Watchlist Management**: Add/remove movies from personal watchlist
- **User Profiles**: AWS Amplify-powered user authentication and profiles
- **Responsive Design**: Mobile-first design that works on all devices

### 🎨 User Experience
- **Light/Dark Theme Toggle**: Seamless theme switching with persistent preferences
- **Modern UI**: Glass-morphism design with smooth animations
- **Movie Discovery**: Trending, popular, and featured movie sections
- **Interactive Cards**: Hover effects and visual feedback

### 🔧 Technical Features
- **AWS Amplify Backend**: User authentication and data management
- **Local Storage**: Theme preferences and watchlist persistence
- **Error Handling**: Graceful fallbacks for program failures

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- AWS Account (for Amplify)

## 📁 Project Structure

```
cinestream/
├── public/
│   ├── index.html
│   └── logo.png
├── src/
│   ├── components/
│   │   ├── App.jsx
│   │   └── index.css
│   ├── amplify_outputs.json
│   └── index.js
└── package.json
```

##  Setup & Usage

### OPTION A - Using Deployment Guide (*Advised if you want to build the project*) 
- Read and follow [documentation guide](https://aws.amazon.com/getting-started/hands-on/build-web-app-s3-lambda-api-gateway-dynamodb/?ref=gsrchandson) to build and deploy application  
---

### OPTION B - Installation/Running Project from This Repository

1. **Clone the repository**.

```bash
git clone https://github.com/<github-name>.git
cd project_dir
```

2. **Set up dev environment**.

- Install **Node.JS** and **npm**(*if not already installed*). 
```bash
# install node packages 
npm install
```

3. **Run the environment locally**.

```bash
npm run dev
```

## Summary

This project structure enables:

* Type-safe, real-time backend via Amplify Data
* Flexible auth rules (API Key, Cognito, Lambda)
* Automatic database + GraphQL API provisioning
* Lambda-triggered workflows (e.g., post-registration)
* Live frontend updates

---

### Quick Commands

| Task           | Command            |
| -------------- | ------------------ |
| Start sandbox  | `npx ampx sandbox` |
| Deploy backend | `amplify push`     |
| Run dev server | `npm run dev`      |

---

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/my-feature`).
3. Commit changes (`git commit -m "Add feature description"`).
4. Push change (`git push origin feature/my-feature`).
5. Open a pull request.

## License
This project is licensed under the MIT License. See [LICENSE](https://opensource.org/license/mit) for details.
