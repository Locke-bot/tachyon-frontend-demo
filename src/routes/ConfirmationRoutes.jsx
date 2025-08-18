import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// confirmation routing
const Confirmation = Loadable(lazy(() => import('views/pages/confirmation/index')));
const ConfirmationError = Loadable(lazy(() => import('views/pages/confirmation/Error')));
const ConfirmationSuccess = Loadable(lazy(() => import('views/pages/confirmation/Success')));
// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/activate/:token',
            element: <Confirmation />
        },
        {
            path: '/activate/error',
            element: <ConfirmationError />
        },
        {
            path: '/activate/success',
            element: <ConfirmationSuccess />
        },
    ]
};

export default AuthenticationRoutes;
