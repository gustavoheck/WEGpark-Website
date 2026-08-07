import FilterCategory from "@/shared/types/FilterCategory";

export const occurrenceFilters: FilterCategory[] = [
  { text: "Placa", value: "plate" },
  { text: "Data", value: "yearMonth", type: "month" },
  { text: "Portaria", value: "gate" },
  {
    text: "Tipo",
    value: "occurrenceType",
    type: "select",
    options: [
      { text: "Aviso", value: "WARNING" },
      { text: "Uso irregular da vaga", value: "ILLEGAL_PARKING" },
      { text: "Sinistro", value: "TRAFFIC_ACCIDENT" },
    ],
  },
  { text: "Local", value: "location" },
  { text: "Responsável", value: "responsableName" },
  { text: "Crachá", value: "badgeNumber" },
  {
    text: "Recentes",
    value: "recents",
    type: "select",
    options: [{ text: "Mês atual", value: "true" }],
  },
];