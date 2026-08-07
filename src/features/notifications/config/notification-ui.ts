import { Link2, ShieldAlert, TriangleAlert } from "lucide-react";

export const NOTIFICATION_UI_CONFIG = {
  VEHICLE_ASSOCIATION: {
    label: "Solicitação de vínculo",
    icon: Link2,
    href: "/solicitacoes",
  },
  OCCURRENCE: {
    label: "Nova ocorrência",
    icon: TriangleAlert,
    href: "/ocorrencias",
  },
  FIVE_OCCURRENCE: {
    label: "Alerta de ocorrências",
    icon: ShieldAlert,
    href: "/ocorrencias",
  },
} as const;
