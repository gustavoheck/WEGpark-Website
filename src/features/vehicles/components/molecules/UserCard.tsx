"use client";

import { Check, UserRound } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import ProfilePicture from "@/shared/components/atoms/ProfilePicture";
import { VehicleUser } from "@/shared/types/Vehicle";

interface UserCardProps {
  user: VehicleUser;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <Card className="gap-0 overflow-hidden border-border/70 py-0 shadow-sm transition-shadow hover:shadow-md">
      <CardContent className="flex items-center gap-3 p-4">
        <ProfilePicture name={user.name} variant="secondary" />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate font-semibold text-foreground">
              {user.name}
            </p>
            {user.isOwner ? (
              <Badge className="flex shrink-0 items-center gap-1 text-xs">
                <Check className="size-3.5 text-white" />
                Proprietário
              </Badge>
            ) : null}
          </div>

          <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <UserRound className="size-3.5" />
            {user.isOwner ? "Responsável pelo veículo" : "Usuário vinculado"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
