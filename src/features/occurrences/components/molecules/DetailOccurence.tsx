import { Card, CardContent } from "@/components/ui/card";
import { Occurence } from "../../types/Occurrence";

interface DetailOccurence {
    occurrence : Occurence
}

export default function DetailOccurence ({occurrence} : DetailOccurence) {

    const dateTime : Date = new Date(occurrence.dateTime)
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