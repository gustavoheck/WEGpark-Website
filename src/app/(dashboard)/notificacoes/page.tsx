import NotificationList from "@/features/notifications/components/NotificationList";
import NotificationListMock from "@/features/notifications/mocks/NotificationListMock";

export default function Notifications () {
    return (
        <NotificationList notifications={NotificationListMock} />
    )
}