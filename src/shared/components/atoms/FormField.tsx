import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FieldError as RHFFieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormFieldProps {
    text : string;
    id : string;
    type? : string;
    registration?: UseFormRegisterReturn;
    error?: RHFFieldError;
    disabled?: boolean;
    readOnly?: boolean;
    defaultValue?: string;
}

export default function FormField(
    {
        text,
        id,
        registration,
        error,
        type = "text",
        disabled = false,
        readOnly = false,
        defaultValue = ""
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
                className="py-5 text-lg"
                {...registration}
                aria-invalid={!!error}
                disabled={disabled}
                readOnly={readOnly}
                defaultValue={defaultValue}
            />
            {error ? (
                <FieldError
                    className="ml-2"
                    errors={[error]} />
            ) : null}
        </Field>
    )
}
