interface ProfileDetailFieldProps {
    label: string;
    value: string;
}

export function ProfileDetailField({ label, value }: ProfileDetailFieldProps) {
    return (
        <div>
            <span className="font-semibold text-primary text-lg">{label}</span>
            <p className="font-semibold text-base">{value}</p>
        </div>
    );
}