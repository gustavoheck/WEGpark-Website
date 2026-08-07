"use client";

import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import FilterChoose from "../atoms/FilterChoose";
import { useState } from "react";
import FilterCategory from "@/shared/types/FilterCategory";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

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
    const selectedCategory = filters.find(
        (filter) => filter.value === selectedFilter,
    );

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

    function handleFilterChange(value: string) {
        setSelectedFilter(value);
        setSearchValue("");
        onSubmit({ category: value, value: "" });
    }

    return (
        <form className="mb-4" onSubmit={handleSubmit}>
            <Field>
                <FieldLabel className="text-lg font-semibold capitalize text-foreground">
                    Campo de pesquisa
                </FieldLabel>
                <div className="flex gap-3 md:flex-row">
                    <div className="">
                        <FilterChoose filters={filters} onValueChange={handleFilterChange} />
                    </div>
                    {selectedCategory?.type === "select" ? (
                        <Select
                            value={searchValue || null}
                            onValueChange={(value) => handleSearchChange(value ?? "")}
                        >
                            <SelectTrigger className="h-auto w-full py-5 text-lg md:text-lg">
                                <SelectValue placeholder="Selecione uma opção">
                                    {selectedCategory.options?.find(
                                        (option) => option.value === searchValue,
                                    )?.text}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {selectedCategory.options?.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.text}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    ) : (
                        <Input
                            disabled={!selectedFilter}
                            type={selectedCategory?.type === "month" ? "month" : "text"}
                            value={searchValue}
                            onChange={(event) => handleSearchChange(event.target.value)}
                            className="w-full py-5 text-lg md:text-lg"
                            placeholder="Comece a digitar para realizar a busca."
                        />
                    )}
                </div>
            </Field>
            <button type="submit" className="hidden" />
        </form>
    );
}
