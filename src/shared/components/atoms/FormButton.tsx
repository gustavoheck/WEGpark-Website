import { Button } from "@/components/ui/button";
import { cn } from "@/shared/lib/utils";

interface FormButtonProps {
  disabled: boolean;
  text: string;
  desktopCompact?: boolean;
}

export default function FormButton({
  disabled,
  text,
  desktopCompact = false,
}: FormButtonProps) {
  return (
    <Button
      type="submit"
      disabled={disabled}
      size="lg"
      className={cn(
        "w-full font-semibold capitalize disabled:bg-muted-foreground/50 disabled:text-black",
        desktopCompact && "md:ml-auto md:flex md:w-fit md:min-w-52",
      )}
    >
      {text}
    </Button>
  );
}
