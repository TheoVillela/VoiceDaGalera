"use client"

import { useAgoraVoice } from "@/services/useAgoraVoiceChat";
import { FormPartida } from "./FormPartida";
import { FormPrincipal } from "./FormPrincipal";
import { useState } from "react";

export function DivPrincipal() {
    const [userName, setUserName] = useState<string>("");
    const [roomId, setRoomId] = useState<string>("");
    const [puuid, setPuuid] = useState<string>("vazio");

    const { join, leave, joined } = useAgoraVoice();

    const abrirFormPartida = (userName: string, puuid: string, roomId: string) => {
        setUserName(userName);
        setRoomId(roomId);
        setPuuid(puuid);

        join(userName, roomId);
    };

    const fecharFormPartida = () => {
        leave();
    }

    return (
        <div id="divPrincipal">

            {!joined ? <FormPrincipal abrirFormPartida={abrirFormPartida}></FormPrincipal>
                : <FormPartida fecharFormPartida={fecharFormPartida} roomId={roomId} summonerName={userName} puuid={puuid}></FormPartida>}
        </div>
    )
}