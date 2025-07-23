# Frontend Architecture: Production-Ready Auth Starter Kit

_This document defines the technical architecture for the frontend of the v1.0 MVP._

_Document created on: 2025-07-22_ _Facilitator: Architect Agent_

## 1. High-Level Architecture & Philosophy

The frontend will be built using a hybrid of **Astro** for high-performance static site generation
and **React** for creating dynamic, interactive user interfaces. This approach, often called the
"Islands Architecture," provides excellent performance by default while still allowing for the rich
interactivity needed for an authentication system.

- **Astro (`.astro` files):** Used for pages, layouts, and static content. It handles routing and
  renders as much as possible to HTML on the server.
- **React (`.tsx` files):** Used for all interactive UI components. These components will be
  hydrated on the client-side as "islands of interactivity."
- **Architectural Goal:** Our primary goal is to create a set of highly reusable, un-opinionated,
  and performant components that can be easily adapted for any future project.

## 2. Folder Structure

This structure is organized by component type to promote reusability, with a clear separation of
concerns.

```tree
apps/frontend/src/
|-- assets/              # Static assets (will be phased out for icons)
|-- components/
|   |-- forms/           # Smart form components (e.g., AuthForm.tsx)
|   |-- icons/           # Reusable SVG icon components (e.g., HomeIcon.tsx)
|   |-- layouts/         # Main layout components (e.g., MainLayout.astro, NavBar.tsx)
|   `-- ui/              # "Dumb" reusable UI components (e.g., Button.tsx, Input.tsx)
|-- hooks/               # Custom React hooks (e.g., useAuth.ts for state)
|-- lib/                 # Shared library code, independent of components
|   `-- api.ts           # Frontend API client for communication with the backend
|-- pages/               # Astro pages for routing (index.astro, auth.astro, etc.)
|-- services/            # Global state management logic and providers
|   `-- AuthProvider.tsx # The React Context provider for authentication state
`-- styles/              # Global styles (global.css)
```

## 3. State Management Strategy

We will use **React Context** to manage global authentication state.

- **Mechanism:** A single, top-level `AuthProvider.tsx` component will be created. This component
  will contain the `AuthContext.Provider` and all the logic for managing the user's state (e.g.,
  holding the user object, making API calls to log in/out).
- **Implementation in Astro:** This `AuthProvider` will be placed in the `MainLayout.astro` file,
  wrapping all page content (`<slot />`). This effectively creates a single, persistent React island
  for the entire application, allowing all other React components on a page to share the same
  context.
- **Accessing State:** Components will access the authentication state via a custom hook,
  `useAuth()`. This hook will provide a simple and safe way to get the current user, as well as
  functions to call `login`, `logout`, and `register`. Example: `const { user, login } = useAuth();`

## 4. Data Flow for Authentication

The login process will follow a clean, uni-directional data flow:

1. **User Interaction:** The user fills out and submits the `<LoginForm />` component.
2. **Component Action:** The `LoginForm` calls the `login(email, password)` function, which it gets
   from the `useAuth()` hook.
3. **State Provider Logic:** The `login` function within `AuthProvider.tsx` is executed.
4. **API Client:** The `AuthProvider` calls the `api.login(email, password)` function from our
   dedicated API client in `/lib/api.ts`.
5. **Backend Communication:** The API client makes a `POST` request to the backend.
6. **State Update:** Upon a successful response from the backend, the `AuthProvider` updates its
   internal state with the user data.
7. **UI Re-render:** Because the state has changed, React automatically re-renders all components
   that use the `useAuth()` hook. The `<NavBar />` will update to show the "Profile" and "Logout"
   links, and the user will be programmatically redirected to the `/profile` page.

## 5. Component API Design

Our UI components will be designed for maximum reusability.

- **`<Input />`:**
  - `props`: `label`, `name`, `type`, `placeholder`, `error` (a string for the error message), and
    all standard input props.
- **`<Button />`:**
  - `props`: `variant` ('primary' | 'secondary'), `disabled`, `isLoading`, and all standard button
    props.
- **`<AuthForm />`:**
  - This is a "smart" component with internal state to toggle between 'login' and 'signup' modes. It
    will not take any props, as it gets all the logic it needs from the `useAuth()` hook.

## 6. Icon System

- **Strategy:** We will standardize on using icons as React components, located in
  `components/icons/`.
- **Implementation:** Each SVG icon will be wrapped in its own `.tsx` component. This allows us to
  style them directly with Tailwind CSS classes (e.g., `className="text-primary h-5 w-5"`), making
  them flexible and performant. This approach eliminates extra HTTP requests and provides full
  styling control.
