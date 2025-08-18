import { lazy } from 'react';

// project imports
import GuestGuard from 'utils/route-guard/GuestGuard';
import MinimalLayout from 'layout/MinimalLayout';
import NavMotion from 'layout/NavMotion';
import Loadable from 'ui-component/Loadable';

// login routing
const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
const AuthCheckMail = Loadable(lazy(() => import('views/pages/authentication/authentication3/CheckMail3')));

const AuthForgotPassword3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/ForgotPassword')));
const AuthResetPassword3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/ResetPassword')));

const Toc = Loadable(lazy(() => import('views/pages/saas-pages/Toc')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/',
    element: (
        <NavMotion>
            <GuestGuard>
                <MinimalLayout />
            </GuestGuard>
        </NavMotion>
    ),
    children: [
        {
            path: '/login',
            element: <AuthLogin />
        },
        {
            path: '/toc',
            element: <Toc />
        },
        {
            path: '/register/:token',
            element: <AuthRegister />
        },
        {
            path: '/check-mail',
            element: <AuthCheckMail />
        },
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

export default LoginRoutes;
