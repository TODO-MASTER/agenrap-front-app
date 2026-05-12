import ServicesDisplay from "./services-display";

export default function ShowcaseSection({ rap }: { rap: string }) {
    return (
        <section className="flex flex-col items-center my-16 gap-y-16">
            <h2 className="font-tree text-4xl italic font-medium">Meus Serviços</h2>
            <ServicesDisplay rap={rap} />
        </section>
    )
}