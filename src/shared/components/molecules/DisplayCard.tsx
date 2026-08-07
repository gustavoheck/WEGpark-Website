import type { ElementType } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/shared/lib/utils";

interface DisplayCardProps {
  Icon: ElementType;
  title: string;
  description: string;
  destructive?: boolean;
}

export function DisplayCard({
  Icon,
  title,
  description,
  destructive = false,
}: DisplayCardProps) {
  return (
    <Card className="mb-6 border-dashed">
      <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
        <div
          className={cn(
            "flex size-14 items-center justify-center rounded-full bg-muted text-primary",
            destructive && "text-destructive",
          )}
        >
          <Icon className="size-7" />
        </div>
        <div>
          <p
            className={cn(
              "mb-2 text-lg font-semibold text-foreground",
              destructive && "text-destructive",
            )}
          >
            {title}
          </p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
