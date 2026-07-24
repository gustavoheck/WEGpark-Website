export default function DateHour({ dateHour }: { dateHour: string }) {

    const date: Date = new Date(dateHour)
    const formatted = date.toLocaleString("pt-BR")

    return (
        <div>
            <span className="font-bold text-base">
                {formatted.substring(0, 10)}
            </span>
            <span>
                {` as ${formatted.substring(12, 17)}`}
            </span>
        </div>
    )



}