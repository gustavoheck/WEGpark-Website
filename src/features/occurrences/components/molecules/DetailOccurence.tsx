import { Card, CardContent } from "@/components/ui/card";
import { Occurrence } from "../../types/Occurrence";

interface DetailOccurence {
    occurrence : Occurrence
}

export default function DetailOccurence ({occurrence} : DetailOccurence) {

    const dateTime : Date = new Date(occurrence.defaults.dateHour)
    const formato = dateTime.toLocaleString("pt-BR")

    return (
        <Card>
            <CardContent>
                <div>
                    <span>Data Ocorrência</span>
                    <p>{formato}</p>
                </div>
            </CardContent>
        </Card>
    )

}