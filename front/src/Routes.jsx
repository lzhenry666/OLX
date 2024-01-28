import { useRoutes } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import { NotFound } from "./pages/NotFound";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { AdPage } from "./pages/AdPage";
import { PrivateRoute } from "./components/PrivateRoute";
import { AddAd } from "./pages/AddAd";
import Ads from './pages/Ads';
import MyAccount from './pages/MyAccount';
 const Routes = () => {
    return useRoutes([
        { path: "/", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/signin", element: <SignIn /> },
        { path: "/signup", element: <SignUp /> },
        { path: "/ad/:id", element: <AdPage /> },
        { path: "/post-an-ad", element: <PrivateRoute><AddAd/></PrivateRoute> },
        { path: "/my-account", element: <PrivateRoute><MyAccount/></PrivateRoute> },
        { path: "/ads", element: <Ads /> },
        { path: "*", element: <NotFound /> }



    ])
}

export default Routes;