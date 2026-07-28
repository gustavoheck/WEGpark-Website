import VehicleListMock from "@/shared/mocks/VehicleListMock";
import { Occurrence } from "../types/Occurrence";

const OccurrencesListMock: Occurrence[] = [
  {
    uuid: "123-abc",
    defaults: {
      dateHour: "2026-07-24T08:30:00",
      location: "WEG I",
      gate: "Portaria 1",
      guard: "João",
      vehicle: VehicleListMock[0],
    },
    description: "",
    warningType: "HEADLIGHT_ON"
  },
  {
    uuid: "123-def",
    defaults: {
      dateHour: "2026-07-24T08:40:00",
      location: "WEG 2",
      gate: "Portaria 15",
      guard: "Jonas",
      vehicle: VehicleListMock[2],
    },
    description: "",
    parkingSpaceType: "COMMON"
  },
  {
    uuid: "123-ghi",
    defaults: {
      dateHour: "2026-07-24T08:55:00",
      location: "WEG 1",
      gate: "Portaria 2",
      guard: "Cléber",
      vehicle: VehicleListMock[1],
    },
    occurrenceDate: "2026-07-24T08:40:00",
    victimName: "John Smith",
    responsibleBossName: "John Smith",
    responsibleFactory: "Smith Factory",
    responsibleSection: "Mount Smith",
    trafficOccurrenceType: "Explosion",
    guardTestimony: "I saw everthing exploding",
    victimTestimony: "I almost exploded",
  },
];

export default OccurrencesListMock;
