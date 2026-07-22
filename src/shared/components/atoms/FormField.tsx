import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/shared/lib/utils";
import { FieldError as RHFFieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormFieldProps {
    text : string,
    id : string,
    type? : string,
    registration: UseFormRegisterReturn,
    error?: RHFFieldError

}

export default function FormField(
    {
        text,
        id,
        registration,
        error,
        type = "text"
    } :
    FormFieldProps
) {
    return (
        <Field data-invalid={!!error}>
            <FieldLabel
                className="text-lg font-semibold capitalize text-foreground"
            >
                {text}
            </FieldLabel>
            <Input
                id={id}
                type={type}
                className={cn("py-5 text-lg ")}
                {...registration}
                aria-invalid={!!error}
            />
            {error ? (
                <FieldError
                    className="ml-2"
                    errors={[error]} />
            ) : null}
        </Field>
    )
}