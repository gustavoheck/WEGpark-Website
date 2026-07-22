import SaveForm from "@/features/vehicles/components/molecules/SaveForm";
import BackButton from "@/shared/components/atoms/BackButton";
import SectionTitle from "@/shared/components/atoms/SectionTitle";

export default async function Adicionar() {

    return (
        <section>
            <div className="flex items-center w-full pt-8 pb-10 gap-3 relative justify-center">
                <BackButton />
                <SectionTitle text="adicionar veículo" className="py-0"/>
            </div>

            <SaveForm />
        </section>

    )
}