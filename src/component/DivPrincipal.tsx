"use client"

import { useAgoraVoice } from "@/services/useAgoraVoiceChat";
import { FormPartida } from "./FormPartida";
import { FormPrincipal } from "./FormPrincipal";
import { useEffect, useState } from "react";
import { disconnectUser2 } from "@/services/userService";

export function DivPrincipal() {
    const [userName, setUserName] = useState<string>("");
    const [roomId, setRoomId] = useState<string>("");
    const [puuid, setPuuid] = useState<string>("");
    const [hasChanged, setHasChanged] = useState<boolean>(false);

    const { join, leave, joined } = useAgoraVoice();

    useEffect(() => {
        if (!hasChanged) return;
        const handleBeforeUnload = async () => {
            if (puuid != "")
                await disconnectUser2(puuid);
        };

        window.addEventListener("beforeunload", handleBeforeUnload, { capture: true });

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [hasChanged]);

    const onChangeEvent = () => {
        setHasChanged(true)
    }

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
        <div id="divPrincipal" onChange={onChangeEvent}>

            {!joined ? <FormPrincipal abrirFormPartida={abrirFormPartida}></FormPrincipal>
                : <FormPartida fecharFormPartida={fecharFormPartida} roomId={roomId} summonerName={userName} puuid={puuid}></FormPartida>}
        </div>
    )
}