import { lazy } from 'react';

import MinimalLayout from 'layout/MinimalLayout';
import Loadable from 'ui-component/Loadable';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
// const AuthLogin = Loadable(lazy(() => import('../Authlogin')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

// const AuthenticationRoutes = {
//     path: '/',
//     element: <MinimalLayout />,
//     children: [
//         {
//             path: '/pages/login/login3',
//             element: <AuthLogin3 />
//         },
//         {
//             path: '/pages/register/register3',
//             element: <AuthRegister3 />
//         },
//         {
//             path: '/pages/register/register3',
//             element: <AuthRegister3 />
//         }
//     ]
// };
const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/',
            element: <AuthLogin3 />
        },
        // {
        //     path: '/pages/login/AuthLogin2',
        //     element: <AuthLogin2 />
        // },
        {
            path: '/pages/register/register3',
            element: <AuthRegister3 />
        }
    ]
};

export default AuthenticationRoutes;
