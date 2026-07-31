"use client";

import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import FilterChoose from "../atoms/FilterChoose";
import { useState } from "react";
import FilterCategory from "@/shared/types/FilterCategory";

export interface FilterParams {
    category: string;
    value: string;
}

interface FilterProps {
    filters: FilterCategory[];
    onSubmit: (params: FilterParams) => void;
}

export default function Filter({ filters, onSubmit }: FilterProps) {
    const [selectedFilter, setSelectedFilter] = useState("");
    const [searchValue, setSearchValue] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit({
            category: selectedFilter,
            value: searchValue,
        });
    };

    function handleSearchChange(value: string) {
        setSearchValue(value);

        if (selectedFilter) {
            onSubmit({
                category: selectedFilter,
                value,
            });
        }
    }

    return (
        <form className="mb-4" onSubmit={handleSubmit}>
            <Field>
                <FieldLabel className="text-lg font-semibold capitalize text-foreground">
                    Campo de pesquisa
                </FieldLabel>
                <div className="flex gap-3 md:flex-row">
                    <div className="">
                        <FilterChoose filters={filters} onValueChange={setSelectedFilter} />
                    </div>
                    <Input
                        disabled={!selectedFilter}
                        value={searchValue}
                        onChange={(event) => handleSearchChange(event.target.value)}
                        className="py-5 text-lg md:text-lg w-full"
                        placeholder="Comece a digitar para realizar a busca."
                    />
                </div>
            </Field>
            <button type="submit" className="hidden" />
        </form>
    );
}
