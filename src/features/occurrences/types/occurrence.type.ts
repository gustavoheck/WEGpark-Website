import { Guard } from "@/shared/types/User"
import Vehicle from "@/shared/types/Vehicle"
import { WarningType } from "../enums/warning-type"
import { ParkingSpaceType } from "../enums/parking-space-map"

interface DefaultOccurenceRequest {
    location : string,
    gate : string,
    plate : string
}

interface DefaultOccurenceResponse {
    dateHour : string,
    location : string,
    gate : string,
    vehicle : Vehicle,
    guard : Guard
}

interface BaseOccurrenceRequest {
    defaults : DefaultOccurenceRequest
}

interface BaseOccurrenceResponse {
    uuid : string,
    defaults : DefaultOccurenceResponse,
}

export interface WarningRequest extends BaseOccurrenceRequest {
    warningType : WarningType,
    description : string
}

export interface WarningResponse extends BaseOccurrenceResponse {
    warningType : WarningType,
    description : string
}

export interface TrafficAccidentRequest extends BaseOccurrenceRequest {
    occurrenceDate : string,
    victimName : string,
    responsibleBossName : string,
    responsibleFactory : string,
    responsibleSection : string,
    trafficOccurrenceType : string,
    guardTestimony: string,
    victimTestimony: string
}

export interface TrafficAccidentResponse extends BaseOccurrenceResponse{
    occurrenceDate : string,
    victimName : string,
    responsibleBossName : string,
    responsibleFactory : string,
    responsibleSection : string,
    trafficOccurrenceType : string,
    guardTestimony: string,
    victimTestimony: string
}

export interface IllegalParkingRequest extends BaseOccurrenceRequest {
    parkingSpaceType : ParkingSpaceType,
    description : string
}

export interface IllegalParkingResponse extends BaseOccurrenceResponse {
    parkingSpaceType : ParkingSpaceType,
    description : string
}

export type OccurrenceRequest = WarningRequest | IllegalParkingRequest | TrafficAccidentRequest
export type OccurrenceResponse = WarningResponse | IllegalParkingResponse | TrafficAccidentResponse

export interface PaginatedOccurrencesResponse {
  occurrences: OccurrenceResponse[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
}

// Aliases kept only while older occurrence UI components are migrated.
export type BaseWarning = WarningResponse;
export type IllegalParking = IllegalParkingResponse;
export type TrafficAccident = TrafficAccidentResponse;
export type Occurrence = OccurrenceResponse;
