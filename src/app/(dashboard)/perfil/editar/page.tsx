import { ProfileEditForm } from "@/features/profile/components/organisms/ProfileEditForm";
import BackButton from "@/shared/components/atoms/BackButton";
import SectionTitle from "@/shared/components/atoms/SectionTitle";

export default function ProfileEditPage() {
    return (
        <section>
            <div className="flex items-center w-full pt-8 pb-10 gap-3 relative justify-center">
                <BackButton />
                <SectionTitle text="editar perfil" className="py-0" />
            </div>
            <ProfileEditForm />
        </section>

    );
}