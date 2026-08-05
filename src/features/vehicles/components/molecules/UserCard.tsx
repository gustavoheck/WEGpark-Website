"use client";

import { Card, CardHeader } from "@/components/ui/card";
import ProfilePicture from "@/shared/components/atoms/ProfilePicture";
import { VehicleUser } from "@/shared/types/Vehicle";

interface UserCardProps {
  user: VehicleUser;
  name?: string;
}

export default function UserCard({ user, name }: UserCardProps) {
  const displayName = name || user.uuid;

  return (
    <Card className="flex min-h-18 flex-row items-center pr-4">
      <CardHeader className="flex min-w-0 w-full flex-row items-center gap-3">
        <ProfilePicture name={displayName} variant="secondary" />
        <p
          className={`min-w-0 break-all text-base font-semibold sm:text-xl ${
            user.isOwner ? "text-primary" : "text-foreground"
          }`}
        >
          {displayName}
        </p>
      </CardHeader>
    </Card>
  );
}
