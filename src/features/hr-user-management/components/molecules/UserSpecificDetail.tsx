import { UserDetailDTO } from "../../types/User";
import DetailUserInformation from "./UserDetailsLabel";

interface UserSpecificDetailProps {
    user: UserDetailDTO;
}

export default function UserSpecificDetail({ user }: UserSpecificDetailProps) {
    if (user.role === "EMPLOYEE") {
        return (
            <>
                <DetailUserInformation label="Crachá" data={user.badgeNumber} />
                <DetailUserInformation label="Departamento" data={user.department} />
            </>
        );
    }

    if (user.role === "GUARD") {
        return (
            <>
                <DetailUserInformation label="Crachá" data={user.badgeNumber} />
                <DetailUserInformation label="Departamento" data={user.department} />
                <DetailUserInformation label="Chefe" data={user.chefe} />
            </>
        );
    }

    if (user.role === "HR") {
        return <DetailUserInformation label="Crachá" data={user.badgeNumber} />;
    }

    return (
        <>
            <DetailUserInformation label="Empresa" data={user.companyName} />
            <DetailUserInformation label="CPF" data={user.cpf} />
        </>
    );
}