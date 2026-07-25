import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Car, CarFront, Link } from "lucide-react";

export default function RequestCard() {
    return (
        <Card>
            <CardHeader className="text-center text-primary text-xl font-semibold border-b pb-4">
                <h3>Solicitação de Vínculo</h3>
            </CardHeader>
            <CardContent className="flex items-center justify-center gap-4">
                <div className="p-3 flex flex-col items-center justify-center gap-2">
                    <div className="bg-primary flex items-center justify-center w-fit p-3 rounded-xl">
                        <CarFront className="size-10 text-white" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-center font-bold">Veículo</span>
                        <div className="flex flex-col">
                            <span className="text-center">Volkswagen</span>
                            <span className="text-center">Golf</span>
                        </div>

                    </div>

                </div>
                <Link className="rotate-45 size-8 text-foreground" />
                <div className="p-3 gap-2 flex flex-col">
                    <div className="bg-primary rounded-full px-6 py-4 flex items-center justify-center">
                        <p className="font-bold text-2xl text-white">C</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-center font-bold">Usuário</span>
                        <span className="text-center">Cleber</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex items-center justify-center gap-2">
                <Button variant="link" className="text-lg font-semibold py-5">Aceitar</Button>
                <Button variant="link" className="text-lg font-semibold py-5">Rejeitar</Button>
            </CardFooter>
        </Card>
    )
}