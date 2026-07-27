"use client"

import { Input } from "@/components/ui/input";
import FilterChoose from "../atoms/FilterChoose";
import { useState } from "react";
import FilterCategory from "@/shared/types/FilterCategory";

export interface FilterParams {
    category: string;
    value: string;
}

interface FilterProps {
    filters : FilterCategory[]
    onSubmit : (params : FilterParams) => void
}

export default function Filter({filters, onSubmit} : FilterProps) {

    const [selectedFilter, setSelectedFilter] = useState<string>("")
    const [searchValue, setSearchValue] = useState<string>("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmit({
            category: selectedFilter,
            value : searchValue,
        })
    }


    return (
        <form className="flex gap-3 items-center mb-4" onSubmit={handleSubmit}>
            <FilterChoose filters={filters} onValueChange={setSelectedFilter} />
            <Input disabled={!selectedFilter} value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
            <button type="submit" className="hidden" />
        </form>
    )
}