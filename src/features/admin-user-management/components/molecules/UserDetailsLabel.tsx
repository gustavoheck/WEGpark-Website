import UserDetailsLabel from "../atoms/UserDetailsLabel";

interface DetailUserInformationProps {
    label: string;
    data: string;
}

export default function DetailUserInformation({ label, data }: DetailUserInformationProps) {
    return (
        <div>
            <UserDetailsLabel text={label} />
            <p className="font-semibold text-base">{data}</p>
        </div>
    );
}