/////////////////----------------------------rEQUEST TRATAR USER

import { api, SERVER_ATIVO } from "./api";

export async function connectUser(puuid: string) {
  let response;

  try {
    response = await api.post(`/connectUser`, {
      puuid: puuid, // ou só { puuid } (mais curto)
    });
    console.log("Conectado:", response.data);

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erro ao conectar:", error.message);
    } else {
      console.error('Erro desconhecido', error);
    }
  }

  return response?.data;
}

export async function disconnectUser(puuid: string) {
  try {
    const response = await api.post(`/disconnectUser`, {
      puuid: puuid,
    });
    console.log("Desconectado:", response.data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erro ao desconectar:", error.message);
    } else {
      console.error('Erro desconhecido', error);
    }
  }
}


export const connectUser2 = async (puuid: string) => {
  console.log("Conectando user com PUUID:", puuid);

  const res = await fetch(`${SERVER_ATIVO}/connectUser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ puuid })
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Erro na requisição');
  }

  const data = await res.json();
  console.log("usuario logado?:", data);

  return { status: res.status, data };
}

export const disconnectUser2 = async (puuid: string) => {
  await fetch(`${SERVER_ATIVO}/disconnectUser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ puuid })
  });

  console.log("Desconectado:");
}