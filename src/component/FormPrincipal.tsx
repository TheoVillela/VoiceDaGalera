import { getPartida2, getPuuid2 } from "@/services/riotService";
// import { connectUser2 } from "@/services/userService";
import { useState } from "react";

interface FormPrincipalProps2 {
  abrirFormPartida: (userName: string, puuid: string, roomId: string) => void
}

export function FormPrincipal({ abrirFormPartida }: FormPrincipalProps2) {
  const [userName, setUserName] = useState<string>("");
  const [, setRoomId] = useState<string>("");
  const [, setPuuid] = useState<string>("");

  //metodo que contem o controle da api
  const handleConectar = async () => {
    if (!userName.trim()) {
      alert(`Por favor, informe um nome de usuario!: ${userName}`);
      return;
    }

    const dataUser = await getPuuid2(userName)

    console.log(`data: ${JSON.stringify(dataUser)}`)
    console.log(`puuid: ${dataUser.puuid}`)

    if (dataUser.puuid == null) {
      alert(`Usuario nao encontrado, verifique o usuario informado: ${userName}`);
      return;
    }

    const dataPartida = await getPartida2(dataUser.puuid)

    console.log("Match obtido:", JSON.stringify(dataPartida));

    if (dataPartida.data == null) {
      alert("Partida nao encontrada para o usuario informado.");
      return;
    }

    console.log(dataPartida.data.gameId)
    console.log(`Partida encontrada: ${dataPartida.data.gameId}${dataPartida.data.teamId}`);
    const room_id = `${dataPartida.data.gameId}${dataPartida.data.teamId}`;
    console.log(`RoomID estabelecido: ${room_id}`)

    // const userLogado = await connectUser2(dataUser.puuid);
    // console.log(`data: ${JSON.stringify(userLogado)}`)

    // if (userLogado.status === 201) {
    //   alert("Player já conectado!");
    //   return;
    // }

    setPuuid(dataUser.puuid)
    setRoomId(room_id)
    abrirFormPartida(userName, dataUser.puuid, room_id)
  };


  return (
    <div id="principal" className="rounded-xl p-15 gap-2 text-center flex flex-col bg-[url(/minimapa.jpg)]">
      <h1 className="mt-25 text-4xl font-black drop-shadow-xl/50 drop-shadow-yellow-500/50 mb-20">
        Comunique, coordene, conquiste!<br />
        O poder da equipe em suas mãos.
      </h1>

      <div className="flex flex-col items-center justify-center">
        <input onChange={(e) => setUserName(e.target.value)} type="text" className="w-60 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-[#000208] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="SummonerName#BR1" required />
      </div>

      <div className="flex flex-col items-center justify-center">
        <button onClick={() => {
          handleConectar();
        }} id="btnConectar" className="hover:bg-yellow-500 w-40 bg-[#eeff0d] p-1 rounded font-semibold text-black">Conectar agora</button>
      </div>
    </div>
  )
}