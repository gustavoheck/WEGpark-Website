import { useFormContext } from "react-hook-form";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import FormField from "@/shared/components/atoms/FormField";

import type { OccurrenceFormInput } from "@/features/occurrences/types/occurrence-form.type";

type VehicleSearchFieldProps = {
  disabled: boolean;
  searching: boolean;
  onSearch: () => void;
};

export default function VehicleSearchField({
  disabled,
  searching,
  onSearch,
}: VehicleSearchFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<OccurrenceFormInput>();

  return (
    <div className="flex items-end gap-3 md:col-span-2">
      <div className="flex-1">
        <FormField
          text="Placa"
          id="plate"
          registration={register("plate")}
          error={errors.plate}
          disabled={disabled}
        />
      </div>

      <Button
        type="button"
        onClick={onSearch}
        disabled={disabled || searching}
        size="lg"
      >
        <Search />
        {searching ? "Buscando..." : "Buscar veículo"}
      </Button>
    </div>
  );
}
