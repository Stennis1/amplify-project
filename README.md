# Amplify - React + Vite App

A full-stack web app built with React (Vite), AWS Amplify Gen 2, providing:

- **Frontend**: React + Vite
- **Data backend**: Amplify Data (TypeScript-first schema, real-time API + DynamoDB integration).
- **Auth & Permissions**: model-level and function-level authorization with API Key, Cognito, or Lambda policies.
- **Serverless triggers**: Lambda function invoked post-user-signup via an authorization rule.
- **Live updates**: Real-time subscriptions auto-generated for `a.model()`

---

##  Setup & Usage
Read and follow documentation guide:
https://aws.amazon.com/getting-started/hands-on/build-web-app-s3-lambda-api-gateway-dynamodb/?ref=gsrchandson 

---

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