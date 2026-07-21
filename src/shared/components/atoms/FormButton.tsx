import { Button } from "@/components/ui/button";

interface FormButtonProps {
    isPending: boolean,
    normalText: string,
    pendingText: string,
    type? : "submit" | "button",  
    onClick : () => void
}

export default function FormButton({ isPending, normalText, pendingText, type = "button", onClick }: FormButtonProps) {
    return (
        <Button
            type={type}
            disabled={isPending}
            className="w-full text-lg font-bold py-5"
            onClick={onClick}
        >
            {isPending ? `${pendingText}` : `${normalText}`}
        </Button>
    )
}