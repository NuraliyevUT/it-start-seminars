# React Seminar App

To start project use "npm run dev"

To run json server "npx json-server --watch db.json --port 5000"

This is a simple React application that allows you to view, add, edit and delete seminars.

The application uses the following technologies:

- React
- React Hooks
- Axios
- JSON Server

The application is divided into two main parts:

- The main page displays a list of all seminars with the ability to filter by date and time.
- The add and edit pages allow you to add new seminars or edit existing ones.

The application uses React Hooks to manage state and side effects. The main page uses the `useState` hook to store the list of seminars and the filter criteria. The add and edit pages use the `useState` hook to store the seminar data and the `useEffect` hook to fetch the seminar data when the component mounts.

The application uses React Router to handle client-side routing. The main page is rendered at the root path and the add and edit pages are rendered at the `/add` and `/edit/:id` paths respectively.

The application uses Axios to make requests to the JSON Server to fetch and manipulate the seminar data.
