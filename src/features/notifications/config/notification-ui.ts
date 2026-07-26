import { PenBox, TriangleAlert } from "lucide-react";

export const NOTIFICATION_UI_CONFIG = {
    REQUEST : {label : "Solicitação", icon : PenBox, text : "Você tem uma nova solicitação!", href : "/solicitacoes"},
    OCCURRENCE : {label : "Occorrência", icon : TriangleAlert, text : "Você tem uma nova ocorrência cadastrada, confira!", href : "/ocorrencias"}
}