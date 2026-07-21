export default function SectionTitle ({text} : {text : string}){
    return (
        <h2
            className="text-2xl font-semibold text-center pt-6 pb-8 text-primary"
        >{text}</h2>
    )
}