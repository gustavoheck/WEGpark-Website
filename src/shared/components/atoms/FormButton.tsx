import { Button } from "@/components/ui/button";

interface FormButtonProps {
    isPending: boolean,
    normalText: string,
    pendingText: string
}

export default function FormButton({ isPending, normalText, pendingText }: FormButtonProps) {
    return (
        <Button
            type="submit"
            disabled={isPending}
            className="w-full text-lg font-bold py-5"
        >
            {isPending ? `${pendingText}` : `${normalText}`}
        </Button>
    )
}