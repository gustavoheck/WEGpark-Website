"use client"

import EditForm from "@/features/vehicles/components/molecules/EditForm";
import VehicleListMock from "@/features/vehicles/mocks/VehicleListMock";
import Vehicle from "@/features/vehicles/types/Vehicle";
import { useParams } from "next/navigation";

const vehicles: Vehicle[] = VehicleListMock


export default function Editar () {

    const { id } = useParams();

    const vehicle = vehicles.find((vehicle) => vehicle.id === Number(id));

    if (vehicle === undefined){
        return (
            <p>Nao achamos</p>
        )
    }

    return (
        <EditForm vehicle={vehicle} />
    )

}