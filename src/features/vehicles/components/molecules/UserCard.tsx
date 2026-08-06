"use client";

import { Card, CardHeader } from "@/components/ui/card";
import ProfilePicture from "@/shared/components/atoms/ProfilePicture";
import { VehicleUser } from "@/shared/types/Vehicle";

interface UserCardProps {
  user: VehicleUser;
  name?: string;
}

export default function UserCard({ user, name }: UserCardProps) {

  return (
    <Card className="flex h-18 flex-row items-center justify-between pr-4">
      <CardHeader className="flex w-full items-center gap-3">
        <ProfilePicture name={name} variant="secondary" />
        <p className={`text-xl font-semibold ${user.isOwner ? "text-primary" : "text-foreground"}`}>
          {name}
        </p>
      </CardHeader>
    </Card>
  );
}
