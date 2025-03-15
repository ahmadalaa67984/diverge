# Vue 3 + Vite

-- Getting Started --

1- Clone the repository

2- Install dependencies:

# npm install

3- Run development server:

# npm run dev

4- Run tests:

# npm test

//======================================================//

# Completion Time:

I completed the entire assessment in just 8 hours, despite having a total of 3 days to work on it due to my busy schedule.

# Technologies Used:

    Vue.js 3 (Composition API & script setup syntax)
    Pinia (State Management)
    Vue Router (Navigation & Routing)
    Vuetify (UI Components & Theming)
    Vitest (Unit & Integration Testing)
    TypeScript (Static Typing for Maintainability)
    SCSS/Tailwind CSS (Styling & Responsive Design)

# SYSTEM DIFFERENT ROLES:

    1-admin ( has access to add ,delete ,edit any user).
        email: admin@example.com
        pw: admin123

    2- manager (has access to edit user only).
        email: manager@example.com
        pw: manager123

    3- viewer (view only).
        email: viewer@example.com
        pw: viewer123

# Architecture Questions

1.  How would you optimize API calls in this application for performance?

    -Use debouncing to delay execution until the user stops typing - at the search for a user part - you will find me use that with help of loadsh lib.

    -Caching Data , like user information .

    -Implement pagination to fetching just the user i need .

    -reduce the calling of any api if i already have the data and depend on props dralling .

2.  Approach to Handling Shared Logic Between Components in Vue.js ?

    - i used composables to hold shared logic and here you will find two composables one for the theme and another one for copyToClipboard .

    -For state that needs to be shared across multiple components, I use Pinia.

3.  Implementing Client-Side Data Caching for a Vue.js Dashboard ?

    - i didn't use that here , but it can be used with Pinia for state management, you can store API responses in the state and refresh them only when necessary.

4.  What strategy would you use to scale this application if it needed to support hundreds of different user permission types?

    - To scale this application while supporting hundreds of different user permission types, I would take the following approach:

    -Roles Enum for Centralized Role Management

    Define all available roles in an enum, ensuring a single source of truth for role definitions.

    -Role Groups for Efficient Access Control

        Instead of managing individual roles everywhere, create role groups that group related roles together.

        This simplifies permission checks and makes it easier to update access levels across multiple roles at once.

    - Custom Directive for UI-Based Permission Control

      Implement a Vue directive that dynamically affects UI elements based on the user’s assigned roles and permissions.

      This ensures that elements are shown, hidden, or disabled based on the user's access rights.

      This approach ensures scalability, maintainability, and efficient role-based access control, making it easier to handle hundreds of different permissions.

5.  Explain your testing strategy and how you decided what to test?

        For this project, I focused on integration testing for the API and Pinia store using Vitest, since the project is built with Vite, making it the recommended choice for fast and efficient testing.

6.  How would you handle offline capabilities in this application?

    Pinia with Persistent Storage: Store user-related data in IndexedDB or LocalStorage so that previously fetched data remains accessible.

    Cache API Responses:
    Use a service worker to intercept API calls and return cached data when offline.

    Implement a cache-first strategy for less frequently changing data (e.g., user roles, permissions).

# what i did as i remeber (you may find more than mentioned : )

     -A user management table with pagination, filtering, sorting, and search functionality.

    -Loading indicators displayed while fetching data.

    -Role-based table views: The table layout and displayed data vary based on user roles.

    -A quick view feature to display detailed user information.

    -Ability to edit user details directly from the interface.

    -Validation and error handling when adding a user with an already existing email, including loading indicators, success, and error messages.

    -A confirmation dialog before deleting a user.

    -Route guards to restrict access to the dashboard for unauthorized users.

    -Automatic redirection to the login page if the user is unauthorized.

    -Pinia store acts as the intermediary between API calls and the UI.

    -Mock API implementation for testing and development purposes.

    -The application is built using TypeScript for better type safety and maintainability.

    -Integration tests for Pinia stores and API calls to ensure reliability.

    -Dark/light theme toggle for better user experience.

    -Multi-language support, allowing users to switch between two languages.
