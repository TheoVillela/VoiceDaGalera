import Image from "next/image";
import { HelpCircle } from "lucide-react"

export function Header() {
  return (
    <header className="mt-5 bg-[#000913] rounded-xl flex items-center justify-between">
      <div>
        <Image width={150} height={150} src="/logo.png" alt="Logo Voice da Galera">
        </Image>
      </div>

      <div>
        <p className="text-cyan-400 font-black text-3xl">Voice Da Galera</p>
      </div>

      <div className="flex gap-4 items-center justify-center">
        {/* <button id="btnConectarHeader" className="hover:bg-yellow-700 p-2 text-yellow-400 rounded font-semibold border">
          Conectar agora
        </button> */}

        <button id="btnVerComoFunciona" className="flex gap-2 hover:bg-[#05e2ff65] p-2 mr-4 rounded font-semibold border border-[#05e1ff] text-[#05e1ff]">
          <HelpCircle />
          Ajuda!
        </button>
      </div>
    </header>
  )
}