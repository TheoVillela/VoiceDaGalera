import { Wifi, Cable, Link2Off, Volume2 } from "lucide-react";
import { Card } from "./Card";

export function Vantagens() {
  return (
    <div className="bg-[#000913] rounded-xl p-5 items-center justify-center">
      <div className="p-2">
        <p className="text-center text-3xl">Vantagens</p>
      </div>

      <div className="text-center text-sm mt-4 gap-4 grid grid-cols-4 h-full">
        <Card text="Não tem conexão com discord! Não precisa criar conta!" icon={Link2Off} size={36} color="white"></Card>
        <Card text="Conexão automática no inicio da partida" icon={Cable} size={36} color="white"></Card>
        <Card text="Qualidade de áudio cristalina" icon={Volume2} size={36} color="white"></Card>
        <Card text="Baixa latência" icon={Wifi} size={36} color="white"></Card>
      </div>
    </div>
  )
}