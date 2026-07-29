import { CreateUserForm } from "@/features/hr-user-management/components/organisms/CreateUserForm";
import BackButton from "@/shared/components/atoms/BackButton";
import SectionTitle from "@/shared/components/atoms/SectionTitle";

export default function CadastrarUsuarioPage() {
    return (
        <section>
            <div className="flex items-center w-full pt-8 pb-10 gap-3 relative justify-center">
                <BackButton />
                <SectionTitle text="cadastrar usuário" className="py-0" />
            </div>

            <CreateUserForm />
        </section>
    );
}