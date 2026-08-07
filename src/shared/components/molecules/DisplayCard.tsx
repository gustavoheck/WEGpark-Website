import { Card, CardContent } from "@/components/ui/card";
import { ElementType } from "react";

interface DisplayCardProps {
    Icon : ElementType,
    title : string,
    description : string,
    destructive? : boolean 
}

export function DisplayCard({Icon, title, description, destructive = false} : DisplayCardProps) {
    return (
        <Card className="border-dashed mb-6">
            <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
                <div className="flex size-14 items-center justify-center rounded-full bg-muted text-primary">
                    <Icon className="size-7" />
                </div>
                <div>
                    <p className={`font-semibold text-lg mb-2 ${destructive ? ("text-destructive") : ("text-foreground")}`}>
                        {title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {description}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}