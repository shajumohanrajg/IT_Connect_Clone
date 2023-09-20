import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import { IconPalette, IconShadow, IconTypography, IconWindmill } from '@tabler/icons';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill,
    NewspaperOutlinedIcon
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const media_connect = {
    id: 'media_connect',
    //title: 'Utilities',
    type: 'group',
    children: [
        {
            id: 'icons',
            title: 'Media Connect ',
            type: 'collapse',
            icon: icons.NewspaperOutlinedIcon,
            children: [
                {
                    id: 'view-job',
                    title: 'View Job',
                    type: 'item',
                    url: '/',
                    //icon: icons.IconTypography,
                    breadcrumbs: false
                },
                {
                    id: 'view-rating',
                    title: 'View Rating',
                    type: 'item',
                    url: '/',
                    //icon: icons.IconPalette,
                    breadcrumbs: false
                }
                // {
                //     id: 'roles',
                //     title: 'Roles',
                //     type: 'item',
                //     url: '/utils/util-shadow',
                //     //icon: icons.IconShadow,
                //     breadcrumbs: false
                // },
                // {
                //     id: 'role-mgmt',
                //     title: 'Role Management',
                //     type: 'item',
                //     url: '/icons/tabler-icons',
                //     breadcrumbs: false
                // },
                // {
                //     id: 'quick-view1',
                //     title: 'Quick View',
                //     type: 'item',
                //     url: '/icons/material-icons',
                //     breadcrumbs: false
                // }
            ]
        }
    ]
};

export default media_connect;
