import { Button } from "@/components/ui/button";

interface FormButtonProps {
    disabled: boolean,
    text: string,
    type? : "submit" | "button",  
    onClick : () => void
}

export default function FormButton({ disabled, text, type = "button", onClick }: FormButtonProps) {
    return (
        <Button
            type={type}
            disabled={disabled}
            className="w-full text-lg font-bold py-5 capitalize disabled:bg-muted-foreground/50 disabled:text-black"
            onClick={onClick}
        >
            {text}
        </Button>
    )
}