import { LogOut } from "lucide-react"
import { MuteButton } from "./MuteButton";
import { GridPlayers } from "./GridPlayers";
import { useEffect, useState } from "react";
import { useAgora } from "@/contexts/AgoraProvider";
import { disconnectUser2 } from "@/services/userService";

interface FormPartidaProps {
    fecharFormPartida: () => void
    summonerName: string
    roomId: string
    puuid: string
}

export function FormPartida({ fecharFormPartida, roomId, summonerName }: FormPartidaProps) {
    const { setIsMuted, setAllRemoteUsersMuted } = useAgora()

    useEffect(() => {
        const handleBeforeUnload = async () => {
            await disconnectUser2(summonerName); //passava puuid
        };

        window.addEventListener("beforeunload", handleBeforeUnload, { capture: true });

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    //true eh igual a verde
    const [btnLocalUserStatus, setBtnLocalUserStatus] = useState<boolean>(true)
    //true eh igual a verde
    const [btnRemoteUsersStatus, setBtnRemoteUsersStatus] = useState<boolean>(true)

    const btnSairClick = async () => {
        await disconnectUser2(summonerName); //passava puuid
        fecharFormPartida();
    }

    const mutarLocalUser = () => {
        setIsMuted(btnLocalUserStatus)

        setBtnLocalUserStatus(!btnLocalUserStatus)
    }

    const muteAllRemoteUsers = () => {
        setAllRemoteUsersMuted(btnRemoteUsersStatus)

        setBtnRemoteUsersStatus(!btnRemoteUsersStatus);
    }

    return (
        <div id="partida" className="bg-[#000913] h-96 gap-15 flex flex-col items-center justify-center rounded-xl">
            <div className="flex flex-col items-center border-yellow-400 border font-extralight rounded-2xl border-8xl p-1 gap-1">
                <p className="text-yellow-400">Summoner name: {summonerName}</p>
                <p className="text-yellow-400">Sala: {roomId}</p>
            </div>

            <GridPlayers></GridPlayers>

            <div className="flex gap-5">
                <button onClick={btnSairClick} id="btnSairPartida" className="justify-center items-center text-sm border-4 border-neutral-950 rounded-full flex gap-1 bg-red-500 hover:bg-red-700 p-2">
                    <LogOut size={16} color="black" strokeWidth={3}></LogOut>
                </button>
                <MuteButton clickBotao={mutarLocalUser}></MuteButton>
                <button onClick={muteAllRemoteUsers} id="btnMuteEveryone" className={`justify-center items-center text-sm font-semibold text-neutral-950 border-2 border-neutral-950 rounded-2xl flex gap-1 ${btnRemoteUsersStatus ? " bg-green-500 hover:bg-green-700 " : "bg-red-500 hover:bg-red-700"} p-1`}>
                    Mute All
                </button>
            </div>
        </div >
    )
}