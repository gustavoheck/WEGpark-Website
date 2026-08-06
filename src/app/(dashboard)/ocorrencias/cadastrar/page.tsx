import CreateOccurrenceForm from "@/features/occurrences/components/create/CreateOccurrenceForm";
import BackButton from "@/shared/components/atoms/BackButton";
import SectionTitle from "@/shared/components/atoms/SectionTitle";

export default function RegistrarOcorrencia() {
  return (
    <section>
      <div className="relative flex w-full items-center justify-center gap-3 pt-8 pb-10">
        <BackButton />
        <SectionTitle text="registrar ocorrência" className="py-0" />
      </div>
      <CreateOccurrenceForm />
    </section>
  );
}
