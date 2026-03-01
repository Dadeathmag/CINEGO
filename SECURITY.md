# Security Policy

## Supported Versions

Currently, only the `main` branch is receiving security updates. If you are running an older version, please upgrade to the latest commit on `main`.

| Version | Supported          |
| ------- | ------------------ |
| `main`  | :white_check_mark: |
| Older   | :x:                |

## Academic Disclaimer

**Please Note:** This project was built as a Database Management Systems (DBMS) academic group project. As such, it **does not implement production-level authentication or security practices** (e.g., proper password hashing, JWTs, protection against advanced SQL injection).

It is intended for educational purposes and demonstrations of database architecture. **Do not use this codebase in a production environment** without completely overhauling the authentication and security layers.

## Reporting a Vulnerability

We take the security of CineGo seriously. If you discover a security vulnerability within this project, please **DO NOT** open a public issue. 

Instead, please send an email to the repository owner or send a direct message. Be sure to include:

- A description of the vulnerability.
- Steps to reproduce the issue.
- Any potential impact on users or the system.

We will acknowledge receipt of your vulnerability report and strive to provide a fix as quickly as possible. Once the issue is resolved, you will be credited in our changelog (if you desire).

### API Keys
Never commit your API keys (e.g., TMDB API keys) to the public repository. If you accidentally commit an API key, revoke it immediately from your provider's dashboard and generate a new one. Ensure you use environment variables (e.g., via a `.env` file) to manage your secrets securely, and verify that `.env` is listed in your `.gitignore`.
