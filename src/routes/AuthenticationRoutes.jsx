import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthForgotPassword3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/ForgotPassword')));
const AuthResetPassword3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/ResetPassword')));


// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/forgot-password/',
            element: <AuthForgotPassword3 />
        },
        {
            path: '/reset-password/:uuid/:token',
            element: <AuthResetPassword3 />
        },
    ]
};

export default AuthenticationRoutes;
