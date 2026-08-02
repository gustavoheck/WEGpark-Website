import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FilterCategory from "@/shared/types/FilterCategory";
import { useState } from "react";

interface FilterChooseProps {
    filters: FilterCategory[];
    onValueChange: (value: string) => void;
}

export default function FilterChoose({ filters, onValueChange }: FilterChooseProps) {
    const [selectedValue, setSelectedValue] = useState("");
    const selectedFilter = filters.find((filter) => filter.value === selectedValue);

    function handleValueChange(value: string | null) {
        const nextValue = value ?? "";
        setSelectedValue(nextValue);
        onValueChange(nextValue);
    }

    return (
        <Select value={selectedValue || null} onValueChange={handleValueChange}>
            <SelectTrigger className="h-auto py-5 text-lg">
                <SelectValue placeholder="Filtro">
                    {selectedFilter?.text}
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {filters.map((f) => (
                        <SelectItem key={f.value} value={f.value} className="py-3 text-lg">
                            {f.text}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}