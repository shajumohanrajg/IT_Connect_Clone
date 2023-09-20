import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import { IconPalette, IconShadow, IconTypography, IconWindmill } from '@tabler/icons';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill,
    PeopleOutlinedIcon
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const user_management = {
    id: 'user_management',
    //title: 'Utilities',
    type: 'group',
    children: [
        {
            id: 'icons',
            title: 'User Management',
            type: 'collapse',
            icon: icons.PeopleOutlinedIcon,
            children: [
                // {
                //     id: 'admin-security',
                //     title: 'Admin Security',
                //     type: 'item',
                //     url: '/',
                //     //icon: IconTypography,
                //     breadcrumbs: false
                // },
                {
                    id: 'users',
                    title: 'Users',
                    type: 'item',
                    url: '/users',
                    //icon: icons.IconPalette,
                    breadcrumbs: false
                },
                {
                    id: 'roles',
                    title: 'Roles',
                    type: 'item',
                    url: '/roles',
                    //icon: icons.IconShadow,
                    breadcrumbs: false
                }
                // {
                //     id: 'role-management',
                //     title: 'Role Management',
                //     type: 'item',
                //     url: '/',
                //     breadcrumbs: false
                // }
                // {
                //     id: 'quick-view',
                //     title: 'Quick View',
                //     type: 'item',
                //     url: '/icons/material-icons',
                //     breadcrumbs: false
                // }
            ]
        }
    ]
};

export default user_management;
