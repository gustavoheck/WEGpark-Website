import SectionTitle from "@/shared/components/atoms/SectionTitle";
import Notification from "../types/Notification";
import NotificationCard from "./NotificationCard";

interface NotificationListProps {
    notifications: Notification[]
}

export default function NotificationList({ notifications }: NotificationListProps) {
    return (
        <section>
            <SectionTitle text="Notificações" />
            <div className="flex flex-col gap-6 mb-6">
                {notifications.length === 0 && (
                    <p className="text-center font-semibold text-foreground">Nenhuma Notificação no Momento...</p>
                )}
                {notifications.map((n) => {
                    return (
                        <NotificationCard key={n.uuid} notification={n} />
                    )
                })}
            </div>
        </section>
    )
}
