import VehicleListMock from "@/shared/mocks/VehicleListMock";
import { Occurence } from "../types/Occurrence";

const OccurrencesListMock: Occurence[] = [
  {
    id: 1,
    dateTime : "10-09-2005",
    locale : "WEG I",
    vehicle : VehicleListMock[0],
    type : "uso-irregular-vaga"
  },
  {
    id: 2,
    dateTime : "10-09-2005",
    locale : "WEG I",
    vehicle : VehicleListMock[1],
    type : "aviso"
  },
  {
    id: 3,
    dateTime : "10-09-2005",
    locale : "WEG I",
    vehicle : VehicleListMock[2],
    type : "sinistro"
  },
];

export default OccurrencesListMock
