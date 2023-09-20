import AssistantOutlinedIcon from '@mui/icons-material/AssistantOutlined';
import { IconPalette, IconShadow, IconTypography, IconWindmill } from '@tabler/icons';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill,
    AssistantOutlinedIcon
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
    id: 'utilities',
    //title: 'Utilities',
    type: 'group',
    children: [
        {
            id: 'icons',
            title: 'Outlet Media',
            type: 'collapse',
            icon: icons.AssistantOutlinedIcon,
            children: [
                {
                    id: 'asset-list',
                    title: 'Asset List',
                    type: 'item',
                    url: '/outletadvertise',
                    //icon: icons.IconTypography,
                    breadcrumbs: false
                },
                {
                    id: 'floor-diagram',
                    title: 'Floor Diagram',
                    type: 'item',
                    url: '/floordiagram',
                    //icon: icons.IconPalette,
                    breadcrumbs: false
                },
                {
                    id: '360-degree',
                    title: '360 Degree Diagram',
                    type: 'item',
                    url: '/360floordiagram',
                    //icon: icons.IconShadow,
                    breadcrumbs: false
                },
                {
                    id: 'showroom-list',
                    title: 'Showroom List',
                    type: 'item',
                    url: '/showrooms',
                    breadcrumbs: false
                },
                {
                    id: 'class',
                    title: 'Class',
                    type: 'item',
                    url: '/class',
                    breadcrumbs: false
                },
                {
                    id: 'brand',
                    title: 'Brand',
                    type: 'item',
                    url: '/brand',
                    //icon: icons.IconShadow,
                    breadcrumbs: false
                },
                {
                    id: 'branding-type',
                    title: 'Branding Type',
                    type: 'item',
                    url: '/brandtype',
                    breadcrumbs: false
                },
                {
                    id: 'ad-location',
                    title: 'Branding Location',
                    type: 'item',
                    url: '/adlocation',
                    //icon: icons.IconShadow,
                    breadcrumbs: false
                },
                {
                    id: 'vendor-list',
                    title: 'Vendor List',
                    type: 'item',
                    url: '/vendorlist',
                    breadcrumbs: false
                },
                {
                    id: 'mat-type',
                    title: 'Material Type',
                    type: 'item',
                    url: '/materialtype',
                    breadcrumbs: false
                },
                {
                    id: 'light-type',
                    title: 'Light Type',
                    type: 'item',
                    url: '/lighttype',
                    breadcrumbs: false
                },
                {
                    id: 'status',
                    title: 'Status',
                    type: 'item',
                    url: '/status',
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default utilities;
