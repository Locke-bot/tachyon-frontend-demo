import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import ConfirmationRoutes from './ConfirmationRoutes'
import { DASHBOARD_PATH } from 'config';

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter([    { 
    path: '/', 
    element: <Navigate to={DASHBOARD_PATH} replace /> 
}, ConfirmationRoutes, LoginRoutes, MainRoutes], {
    basename: import.meta.env.VITE_APP_BASE_NAME
});

export default router;
