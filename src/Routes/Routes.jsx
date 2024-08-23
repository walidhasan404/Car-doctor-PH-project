import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import CheckOut from "../Pages/CheckOut/CheckOut";
import Bookings from "../Pages/Bookings/Bookings";
import PrivateRoute from "./PrivateRoute";
import About from "../Pages/Home/About/About";
import Profile from "../Pages/Profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'signup',
        element: <SignUp></SignUp>
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'about',
        element: <About></About>
      },
      {
        path: 'book/:id',
        element: <PrivateRoute><CheckOut></CheckOut></PrivateRoute>,
        loader: ({ params }) => fetch(`https://car-doctor-server-six-wine.vercel.app/services/${params.id}`)
      },
      {
        path: 'bookings',
        element: <PrivateRoute><Bookings></Bookings></PrivateRoute>
      }
    ]
  },
]);

export default router;