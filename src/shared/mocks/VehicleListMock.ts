import Vehicle from "../types/Vehicle";

const VehicleListMock: Vehicle[] = [
  {
    uuid: "111-111",
    plate: "AQK1010",
    model: "Beetle",
    brand: "Volkswagen",
    ownerId: "1",
    users: [{ uuid: "1", isOwner: true }],
    color: "Branco",
  },
  {
    uuid: "222-222",
    plate: "BQK1010",
    model: "Touro",
    brand: "Fiat",
    ownerId: "2",
    users: [{ uuid: "2", isOwner: true }],
    color: "Preto",
  },
  {
    uuid: "333-333",
    plate: "CQK1010",
    model: "Prisma",
    brand: "Chevrolet",
    ownerId: "3",
    users: [{ uuid: "3", isOwner: true }],
    color: "Branco",
  },
  {
    uuid: "444-444",
    plate: "DQK1010",
    model: "Uno",
    brand: "Fiat",
    ownerId: "1",
    users: [{ uuid: "1", isOwner: true }],
    color: "Prata",
  },
];

export default VehicleListMock
