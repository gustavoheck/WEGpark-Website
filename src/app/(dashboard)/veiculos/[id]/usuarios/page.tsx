import UserList from "@/features/vehicles/components/organisms/UserList";
import BackButton from "@/shared/components/atoms/BackButton";
import SectionTitle from "@/shared/components/atoms/SectionTitle";
import UserMockList from "@/shared/mocks/UserListMock";
import VehicleListMock from "@/shared/mocks/VehicleListMock";
import { notFound } from "next/navigation";

interface EditarPageProps {
    params: Promise<{ id: string }>;
}


export default async function Usuarios({ params }: EditarPageProps) {

    const { id } = await params;
    const vehicle = VehicleListMock.find((v) => v.uuid === id);
//
    if (!vehicle) {
        notFound()
    }

    const ownerId = vehicle.ownerId

    const userList = UserMockList
    const whoIsSeeing = 1

    return (
        <section>
            <div className="flex items-center w-full pt-8 pb-10 gap-3 relative justify-center">
                <BackButton />
                <SectionTitle text="usuários do veículo" className="py-0"/>
            </div>

            <UserList users={userList} ownerId={ownerId} userId={whoIsSeeing} />
        </section>

    )
}