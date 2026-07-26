import Link from "next/link"
import ProfilePicture from "../atoms/ProfilePicture"

export default function Profile ({username} : {username : string}) {
    return (
        <Link href="/perfil" className="flex items-center gap-2 px-2 py-4 w-full h-full">
              <ProfilePicture name={username} />
              <p className="text-lg text-white">{username}</p>
        </Link>
    )
}