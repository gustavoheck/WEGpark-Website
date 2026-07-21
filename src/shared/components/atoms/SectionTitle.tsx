import { cn } from "@/shared/lib/utils"

interface SectionTitleProps {
    text : string,
    className? : string
}

export default function SectionTitle ({text, className} : SectionTitleProps){
    return (
        <h2
            className={cn("text-2xl font-semibold text-center pt-8 pb-10 text-primary capitalize",className)}
        >{text}</h2>
    )
}