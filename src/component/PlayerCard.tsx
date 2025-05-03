import { LucideIcon } from "lucide-react"
import { Card } from "./Card"
import { MuteButton } from "./MuteButton"
import { useState } from "react"
import { IAgoraRTCRemoteUser, UID } from "agora-rtc-sdk-ng"
import { useAgora } from "@/contexts/AgoraProvider"

interface Player {
    userName: string
    userId: UID
    icon: LucideIcon
    remoteUser: IAgoraRTCRemoteUser
}

//cardStatus verdadeuri card com borda verde
interface PlayerCardProps {
    player: Player
}

export function PlayerCard({ player }: PlayerCardProps) {
    const [btnStatus, setBtnStatus] = useState<boolean>(true);

    const clickBotao = () => {
        if (btnStatus) {
            player.remoteUser.audioTrack?.setVolume(0);
        } else {
            player.remoteUser.audioTrack?.setVolume(100);
        }

        setBtnStatus(!btnStatus);
    }

    return (
        <div className={`flex flex-col rounded-2xl border-2 ${btnStatus ? "border-green-500" : "border-red-500"} `}>
            <Card text={player.userName} icon={player.icon} size={48} color={"white"}></Card>
            <MuteButton clickBotao={clickBotao}></MuteButton>
        </div >
    )
}