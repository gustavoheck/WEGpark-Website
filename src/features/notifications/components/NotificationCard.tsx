import { Card } from "@/components/ui/card";
import Notification from "../types/Notification";
import { getNotificationConfig } from "../utils/notifications-helpers";
import Link from "next/link";
import { ArrowBigRight, ArrowRight} from "lucide-react";

interface NotificationCardProps {
    notification : Notification
}

export default function NotificationCard ({notification} : NotificationCardProps) {

    const {label, icon : IconNotification, text, href} = getNotificationConfig(notification)

    return (
        <Card className="flex-row items-center text-balance justify-between px-4">
            <div className="flex items-center gap-3">
                <IconNotification className="size-8"/>
                <p className="min-h-10 flex items-center">{text}</p>
            </div>
            <Link href={href}>
                <ArrowRight className="size-7 text-primary"/>
            </Link>
        </Card>
    )
}