import Notification from "../types/Notification";

const NotificationListMock : Notification[] = [
    {
        uuid : "111-222",
        type : {
            warning_type : "REQUEST"
        }
    },
    {
        uuid : "111-442",
        type : {
            warning_type : "OCCURRENCE"
        }
    },
    {
        uuid : "221-222",
        type : {
            warning_type : "REQUEST"
        }
    },
]

export default NotificationListMock