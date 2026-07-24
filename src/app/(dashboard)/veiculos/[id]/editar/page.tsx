import EditForm from "@/features/vehicles/components/molecules/EditForm";
import VehicleListMock from "@/shared/mocks/VehicleListMock";
import BackButton from "@/shared/components/atoms/BackButton";
import SectionTitle from "@/shared/components/atoms/SectionTitle";
import { notFound } from "next/navigation";

interface EditarPageProps {
    params: Promise<{ id: string }>;
}


export default async function Editar({ params }: EditarPageProps) {

    const { id } = await params;
    const vehicle = VehicleListMock.find((v) => v.uuid === id);

    if (!vehicle) {
        notFound()
    }

    return (
        <section>
            <div className="flex items-center w-full pt-8 pb-10 gap-3 relative justify-center">
                <BackButton />
                <SectionTitle text="editar veículo" className="py-0"/>
            </div>

            <EditForm vehicle={vehicle} />
        </section>

    )
}
