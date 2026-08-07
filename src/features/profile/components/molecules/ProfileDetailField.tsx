interface ProfileDetailFieldProps {
    label: string;
    value?: string | null;
}

export function ProfileDetailField({ label, value }: ProfileDetailFieldProps) {
    const displayedValue = value?.trim() || "Não informado";

    return (
        <div>
            <span className="font-semibold text-primary text-lg">{label}</span>
            <p className="font-semibold text-base">{displayedValue}</p>
        </div>
    );
}
