import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FilterCategory from "@/shared/types/FilterCategory";

interface FilterChooseProps {
    filters: FilterCategory[];
    onValueChange: (value: string) => void;
}

export default function FilterChoose({ filters, onValueChange }: FilterChooseProps) {
    return (
        <Select onValueChange={(val) => onValueChange(typeof val === "string" ? val : "")}>
            <SelectTrigger className="w-45">
                <SelectValue placeholder="Filtro" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {filters.map((f) => (
                        <SelectItem key={f.value} value={f.value}>
                            {f.text}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}