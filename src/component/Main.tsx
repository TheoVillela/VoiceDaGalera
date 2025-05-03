import { AgoraProvider } from "@/contexts/AgoraProvider";
import { ComoFunciona } from "./ComoFunciona";
import { DivPrincipal } from "./DivPrincipal";
import { Vantagens } from "./Vantagens";


export function Main() {

  return (
    <main className="flex flex-col gap-4">
      <AgoraProvider>
        <DivPrincipal />
      </AgoraProvider>

      <ComoFunciona />

      <Vantagens />
    </main>
  )
}