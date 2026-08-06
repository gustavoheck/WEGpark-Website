import { BackendPage } from "@/shared/types/Page";
import { PaginatedOccurrencesResponse } from "../types/occurrence.type";

export function mapBackEndPageToOccurence (backEndPage : BackendPage ) : PaginatedOccurrencesResponse{
    return {
        occurrences: backEndPage.content,
        currentPage: backEndPage.number + 1,
        totalPages: backEndPage.totalPages,
        totalItems: backEndPage.totalElements,
        pageSize: backEndPage.size,
    }
}