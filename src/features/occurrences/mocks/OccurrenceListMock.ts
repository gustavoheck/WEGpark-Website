import VehicleListMock from "@/shared/mocks/VehicleListMock";
import { Occurence } from "../types/Occurrence";

const OccurrencesListMock: Occurence[] = [
  {
    id: 1,
    dateTime : "2026-07-23T12:51:00",
    locale : "WEG I",
    vehicle : VehicleListMock[0],
    type : "uso-irregular-vaga"
  },
  {
    id: 2,
    dateTime : "2026-07-23T12:51:00",
    locale : "WEG I",
    vehicle : VehicleListMock[1],
    type : "aviso"
  },
  {
    id: 3,
    dateTime : "2026-07-23T12:51:00",
    locale : "WEG I",
    vehicle : VehicleListMock[2],
    type : "sinistro"
  },
];

export default OccurrencesListMock
