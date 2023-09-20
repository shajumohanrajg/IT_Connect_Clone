import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import { IconKey } from '@tabler/icons';

//import AcUnitIcon from '@mui/icons-material/cUnitIcon';
// constant
const icons = {
    IconKey,
    AssignmentOutlinedIcon
};
//const icon1 = <AcUnitIcon color="warning" />;
// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    //title: 'Pages',
    //caption: 'Pages Caption',
    type: 'group',
    children: [
        {
            id: 'authentication',
            title: 'Task Sharing System',
            type: 'collapse',
            icon: icons.AssignmentOutlinedIcon,

            children: [
                {
                    id: 'expire-ad',
                    title: 'Expire Advertisement',
                    type: 'item',
                    url: '/',
                    target: true
                    //icon: icons.IconKey
                },
                {
                    id: 'admin-review',
                    title: 'Admin Review Job',
                    type: 'item',
                    url: '/',
                    target: true
                },
                {
                    id: 'vendor-approval',
                    title: 'Vendor Approval',
                    type: 'item',
                    url: '/',
                    target: true
                }
            ]
        }
    ]
};

export default pages;
