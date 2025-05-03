import { UID } from "agora-rtc-sdk-ng";
import { LucideIcon } from "lucide-react";

interface CardProps {
    text: UID
    icon: LucideIcon
    size: number
    color: string
}

export function Card(card: CardProps) {
    return (
        <div className="bg-[#000c18] rounded-xl gap-4 p-2 flex flex-col items-center h-full">
            <card.icon size={card.size} color={card.color}>

            </card.icon>
            <p className="whitespace-pre-line text-sm">{card.text}</p>
        </div>
    );
}