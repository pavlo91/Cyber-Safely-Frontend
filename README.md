## Screenshot
![Dashboard page](./dashboard-page.png?raw=true "Home")
![Landing page](./landing-page.png?raw=true "Landing")
![Register page](./register-page.png?raw=true "Register")
![Resource page](./resource-page.png?raw=true "Resource")
![School page](./schools.png?raw=true "School")
![Staff page](./staff-page.png?raw=true "Staff")

<div align="center">
  <h1 align="center"!>CyberSafely</h1>
  <p align="center">
    Next.js, Typescript, Apollo, Material UI, TailWind CSS, BootStrap5, Prisma, PostgreSQL, GraphQL, AI, React, Next-Router, Redux, Context, Socket Project
  </p>
  <br>
</div>

## Running

Run `yarn install` and then `yanr dev` to run it locally.

## Pages

- `/` - this is the landing page
- `/auth/*` - all pages under this route are for login, register, etc.
- `/dashboard/*` - all pages under this route are for the dashboard (staff, coach, student, parent).

## Libraries

- Next.JS
- Apollo Client
- GraphQL Codegen
- MUI
- zod
- date-fns

## Environment Variables

```bash
NEXT_PUBLIC_ENVIRONMENT= #demo
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_APP_NAME=
NEXT_PUBLIC_APP_SHORT_NAME=
NEXT_PUBLIC_EMAIL_SUPPORT=
NEXT_PUBLIC_ENABLE_LOGIN=
NEXT_PUBLIC_INTERCOM_APP_ID=
```

Create an `.env` file at the root of the project:

```bash
NEXT_PUBLIC_ENABLE_LOGIN=true
```

## Seeded Logins

- `staff@wonderkiln.com`
- `admin@wonderkiln.com`
- `coach@wonderkiln.com`
- `student@wonderkiln.com`
- `parent@wonderkiln.com`

The password for all is `password`.
