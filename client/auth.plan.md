# Google OAuth2 Authentication Plan

## Goal
Build a production-ready Google OAuth2 authentication flow using Express.js and `google-auth-library`, demonstrating best practices such as CSRF protection via a signed state parameter.

## Architecture & Flow

### Backend (`app.js`)
- **Technology**: Node.js, Express, `google-auth-library`, `axios`, `cookie-parser`.
- **Routes**:
  - `GET /auth/google`: Initiates the login process. Generates a random `state` parameter, signs it using a secret, and sets it as an `httpOnly` signed cookie. Redirects the user to Google's OAuth 2.0 consent screen.
  - `GET /auth/google/callback`: Handles the redirect from Google. 
    1. Validates the `state` parameter against the signed cookie to prevent CSRF.
    2. Exchanges the `code` for tokens (`access_token`, `id_token`).
    3. Uses the `access_token` to fetch the user's profile from the `https://www.googleapis.com/oauth2/v3/userinfo` endpoint.
    4. Extracts the profile `picture`, `name`, and `email`, and returns a JSON response or establishes a session.
  - `GET /`: Serves the simple `index.html` frontend.

### Frontend (`index.html`)
- A simple static HTML file with a "Sign in with Google" button that directs the user to `/auth/google`.

### Environment (`.env.template`)
- Template containing required environment variables:
  - `CLIENT_ID`
  - `CLIENT_SECRET`
  - `REDIRECT_URI` (default: `http://localhost:3000/auth/google/callback`)
  - `COOKIE_SECRET` (for signing cookies)

## Implementation Steps
1. Initialize a `server` directory with a `package.json`.
2. Install required dependencies (`express`, `google-auth-library`, `cookie-parser`, `dotenv`, `axios`).
3. Write `server/app.js` with the OAuth logic and CSRF protection.
4. Create `server/.env.template` with required placeholders.
5. Create `server/public/index.html` for the frontend.
6. Verify the flow (requires user to provide valid Google OAuth credentials).
