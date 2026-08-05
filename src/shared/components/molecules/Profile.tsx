import Link from "next/link";

import ProfilePicture from "../atoms/ProfilePicture";

interface ProfileProps {
  username: string;
  href?: string;
}

export default function Profile({ username, href }: ProfileProps) {
  const content = (
    <>
      <ProfilePicture name={username} />
      <p className="text-lg text-white">{username}</p>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="flex h-full w-full items-center gap-2 px-2 py-4"
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="flex h-full w-full items-center gap-2 px-2 py-4">
      {content}
    </div>
  );
}
