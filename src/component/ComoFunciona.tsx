import { AudioLines, Gamepad2, MonitorUp } from "lucide-react";
import { Card } from "./Card";

export function ComoFunciona() {
    return (
        <div className="bg-[#000913] rounded-xl p-5 items-center justify-center">
            <div className="text-center text-3xl">
                Como Funciona
            </div>

            <div className="text-center text-sm mt-4 items-center justify-center gap-3 grid grid-cols-3">
                <Card text="Copie o seu Summoner#Tag e inicie sua partida de League of Legends" icon={Gamepad2} size={64} color="white"></Card>
                <Card text="Cole o seu SummonerName#Tag no campo de texto acima e clique em 'Conectar'" icon={MonitorUp} size={64} color="white"></Card>
                <Card text="Use a comunição ao seu favor e vença mais partidas!" icon={AudioLines} size={64} color="white"></Card>
            </div>
        </div>
    )
}