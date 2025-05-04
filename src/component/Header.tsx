"use client"

import Image from "next/image";
import { HelpCircle } from "lucide-react"
import FormAjuda from "./FormAjuda";
import { useState } from "react";
import { disconnectUser2 } from "@/services/userService";

export function Header() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleFormSubmit = async (value: string) => {
    await disconnectUser2(value);
    console.log('Valor enviado:', value);
  };

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
        <button onClick={() => setIsFormOpen(true)} id="btnVerComoFunciona" className="flex gap-2 hover:bg-[#05e2ff65] p-2 mr-4 rounded font-semibold border border-[#05e1ff] text-[#05e1ff]">
          <HelpCircle />
          Ajuda!
        </button>

        <FormAjuda
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleFormSubmit}
        />
      </div>
    </header>
  )
}