import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard, DashboardCustomizeIcon };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    //title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard/default',
            icon: icons.DashboardCustomizeIcon,
            // icon: (
            //     <div>
            //         <Activity size={48} color="red" />{' '}
            //     </div>
            // ),
            breadcrumbs: false
        }
    ]
};

export default dashboard;
