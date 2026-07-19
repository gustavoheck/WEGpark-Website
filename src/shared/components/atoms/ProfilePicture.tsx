export default function ProfilePicture({name} : {name : string}) {
    return (
        <div className="rounded-full bg-white w-10 h-10 flex items-center justify-center text-2xl capitalize text-primary font-bold">
            {name.charAt(0)}
        </div>
    )
}