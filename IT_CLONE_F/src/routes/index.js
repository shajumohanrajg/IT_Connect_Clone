import AuthenticationRoutes from './AuthenticationRoutes';

import { useRoutes } from 'react-router-dom';
import MainRoutes from './MainRoutes';
//import MainRoutes from './MainRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([AuthenticationRoutes, MainRoutes]);
}
