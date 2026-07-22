import { Button } from "@/components/ui/button";

interface FormButtonProps {
    disabled: boolean,
    text: string
}

export default function FormButton({ disabled, text,}: FormButtonProps) {
    return (
        <Button
            type="submit"
            disabled={disabled}
            className="w-full text-lg font-bold py-5 capitalize disabled:bg-muted-foreground/50 disabled:text-black"
        >
            {text}
        </Button>
    )
}