import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined';
import { IconPalette, IconShadow, IconTypography, IconWindmill } from '@tabler/icons';

//import { IconPalette, IconShadow, IconTypography, IconWindmill } from '@tabler/icons';
// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill,
    FormatListNumberedOutlinedIcon
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const job_assign = {
    id: 'job_assign',
    //title: 'Utilities',
    type: 'group',
    children: [
        {
            id: 'icons',
            title: 'Job Assign',
            type: 'collapse',
            icon: icons.FormatListNumberedOutlinedIcon,
            children: [
                {
                    id: 'job-list',
                    title: 'Job List',
                    type: 'item',
                    url: '/jobassign',
                    //icon: icons.IconTypography,
                    breadcrumbs: false
                },
                {
                    id: 'job-for',
                    title: 'Job For',
                    type: 'item',
                    url: '/jobfor',
                    //icon: icons.IconPalette,
                    breadcrumbs: true
                },
                {
                    id: 'job-type',
                    title: 'Job Type',
                    type: 'item',
                    url: '/jobtype',
                    //icon: icons.IconShadow,
                    breadcrumbs: false
                },
                {
                    id: 'design-type',
                    title: 'Design Type',
                    type: 'item',
                    url: '/designtype',
                    breadcrumbs: false
                }
                // {
                //     id: 'quick-view2',
                //     title: 'Quick View',
                //     type: 'item',
                //     url: '/',
                //     breadcrumbs: false
                // }
            ]
        }
    ]
};

export default job_assign;
