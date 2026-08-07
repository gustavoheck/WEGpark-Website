import Vehicle from "@/shared/types/Vehicle";

import VehicleCard from "./VehicleCard";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import VehicleTableRow from "./VehicleTableRow";

interface VehicleListProps {
  vehicles: Vehicle[];
}

export default function VehicleList({ vehicles }: VehicleListProps) {

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 md:hidden">
        {vehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.uuid}
            vehicle={vehicle}
          />
        ))}
      </div>

      <div className="mb-4 hidden overflow-hidden rounded-lg border md:block">
        <Table className="px-4">
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Veículo</TableHead>
              <TableHead>Cor e vínculo</TableHead>
              <TableHead className="text-right">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {vehicles.map((vehicle) => (
              <VehicleTableRow
                key={vehicle.uuid}
                vehicle={vehicle}
                compact
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
