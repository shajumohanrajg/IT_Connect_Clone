import dashboard from './dashboard';
import job_assign from './job_assign';
import media_connect from './media_connect';
import other from './other';
// import pages from './pages';
import user_management from './user_management';
import utilities from './utilities';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
    items: [dashboard, utilities, job_assign, user_management, other]
    // items: [dashboard, pages, utilities, job_assign, user_management, media_connect, other]
};

export default menuItems;
