import { BackendPage } from "@/shared/types/Page";
import { IllegalParkingRequest, OccurrenceRequest, OccurrenceResponse, PaginatedOccurrencesResponse, TrafficAccidentRequest, WarningRequest } from "../types/occurrence.type";
import { OccurrenceFormValues, UpdateOccurrenceFormValues } from "../schemas/OccurrenceSchema";
import { WarningType } from "../enums/warning-type";
import { ParkingSpaceType } from "../enums/parking-space-map";

export function mapBackEndPageToOccurence (backEndPage : BackendPage<OccurrenceResponse> ) : PaginatedOccurrencesResponse{
    return {
        occurrences: backEndPage.content,
        currentPage: backEndPage.number + 1,
        totalPages: backEndPage.totalPages,
        totalItems: backEndPage.totalElements,
        pageSize: backEndPage.size,
    }
}

export function mapCreateFormDataToEntity(
  formData: OccurrenceFormValues,
): OccurrenceRequest {
  const defaults = {
    plate: formData.plate,
    location: formData.location,
    gate: formData.gate,
  };

  switch (formData.occurrenceType) {
    case "WARNING": {
      const request: WarningRequest = {
        defaults,
        warningType: formData.warningType as WarningType,
        description: formData.description ?? "",
      };

      return request;
    }

    case "ILLEGAL_PARKING": {
      const request: IllegalParkingRequest = {
        defaults,
        parkingSpaceType: formData.parkingSpaceType as ParkingSpaceType,
        description: formData.description ?? "",
      };

      return request;
    }

    case "TRAFFIC_ACCIDENT": {
      const request: TrafficAccidentRequest = {
        defaults,
        occurrenceDate: formData.occurrenceDate,
        victimName: formData.victimName,
        responsibleBossName: formData.responsibleBossName,
        responsibleFactory: formData.responsibleFactory,
        responsibleSection: formData.responsibleSection,
        trafficOccurrenceType: formData.trafficOccurrenceType,
        guardTestimony: formData.guardTestimony,
        victimTestimony: formData.victimTestimony,
      };

      return request;
    }
  }
}

export function mapUpdateFormDataToEntity(
  formData: UpdateOccurrenceFormValues,
): OccurrenceRequest {
  const defaults = {
    location: formData.location,
    gate: formData.gate,
    plate : formData.plate
  };

  switch (formData.occurrenceType) {
    case "WARNING":
      return {
        defaults,
        warningType: formData.warningType as WarningType,
        description: formData.description,
      };

    case "ILLEGAL_PARKING":
      return {
        defaults,
        parkingSpaceType: formData.parkingSpaceType as ParkingSpaceType,
        description: formData.description,
      };

    case "TRAFFIC_ACCIDENT":
      return {
        defaults,
        occurrenceDate: formData.occurrenceDate,
        victimName: formData.victimName,
        responsibleBossName: formData.responsibleBossName,
        responsibleFactory: formData.responsibleFactory,
        responsibleSection: formData.responsibleSection,
        trafficOccurrenceType: formData.trafficOccurrenceType,
        guardTestimony: formData.guardTestimony,
        victimTestimony: formData.victimTestimony,
      };
  }
}