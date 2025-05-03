import { Mic, MicOff } from "lucide-react";
import { useState } from "react"


//Status verdadeiro botao verde
interface MuteButtonProps {
    clickBotao: () => void
}

export function MuteButton({ clickBotao }: MuteButtonProps) {
    const [btnStatus, setBtnStatus] = useState<boolean>(true);

    const clickBotaoLocal = () => {
        clickBotao();
        setBtnStatus(!btnStatus)
    }

    return (
        <button onClick={clickBotaoLocal} className={`justify-center items-center text-sm border-4 border-neutral-950 rounded-2xl flex gap-1 ${btnStatus ? ' bg-green-500 hover:bg-green-700 ' : " bg-red-500 hover:bg-red-700 "} p-1`}>
            {btnStatus ? (<Mic size={16} color="black" strokeWidth={3}></Mic>) : (<MicOff size={16} color="black" strokeWidth={3}></MicOff>)}
        </button>
    )
}