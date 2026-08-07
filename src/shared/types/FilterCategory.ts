export default interface FilterCategory {
    text: string;
    value: string;
    type?: "text" | "month" | "select";
    options?: Array<{
        text: string;
        value: string;
    }>;
}
