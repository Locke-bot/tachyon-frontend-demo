// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconApps, IconUserCheck, IconBasket, IconMessages, IconLayoutKanban, IconMail, IconCalendar, IconNfc } from '@tabler/icons-react';
import HistoryIcon from '@mui/icons-material/History';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
// constant
const icons = {
    IconApps,
    IconUserCheck,
    IconBasket,
    IconMessages,
    IconLayoutKanban,
    IconMail,
    IconCalendar,
    IconNfc
};

// ==============================|| APPLICATION MENU ITEMS ||============================== //

const application = {
    // id: 'applications',
    // title: <FormattedMessage id="applications" defaultMessage={` `} />,
    // icon: icons.IconApps,
    // type: 'group',
    // children: [
    //     {
    //         id: 'New Chat',
    //         title: <FormattedMessage id="New Chat" />,
    //         type: 'item',
    //         icon: AddCommentOutlinedIcon,
    //         url: '/chat',
    //         children: [
    //         ]
    //     },
    //     {
    //         id: 'Chat History',
    //         title: <FormattedMessage id='Chat History' />,
    //         type: 'collapse',
    //         icon: HistoryIcon,
    //         url: '/chat',
    //         children: [
    //         ]
    //     }
    // ]
};

export default application;