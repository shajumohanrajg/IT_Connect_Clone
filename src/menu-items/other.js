import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined';
import { IconBrandChrome, IconHelp } from '@tabler/icons';
// assets
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';

import SecurityUpdateGoodOutlinedIcon from '@mui/icons-material/SecurityUpdateGoodOutlined';
import HistoryIcon from '@mui/icons-material/History';
const icons = { IconBrandChrome, IconHelp, BrushOutlinedIcon, PermMediaOutlinedIcon, SecurityUpdateGoodOutlinedIcon, HistoryIcon };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
        {
            id: 'timeline',
            title: 'Time Management',
            type: 'item',
            url: '/timeline',
            icon: icons.HistoryIcon,
            breadcrumbs: false
        },
        {
            id: 'hoarding',
            title: 'Hoarding',
            type: 'item',
            url: '/hoardinglist',
            icon: icons.BrushOutlinedIcon,
            breadcrumbs: false
        }

        // {
        //     id: 'media-research',
        //     title: 'Media Research',
        //     type: 'item',
        //     url: '/',
        //     icon: icons.PermMediaOutlinedIcon,
        //     external: true,
        //     target: true
        // }
        // {
        //     id: 'mobile-app',
        //     title: 'Mobile App',
        //     type: 'item',
        //     url: '/sample-page',
        //     icon: icons.SecurityUpdateGoodOutlinedIcon,
        //     breadcrumbs: false
        // }
    ]
};

export default other;
