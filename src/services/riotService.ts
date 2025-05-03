import { AxiosError } from 'axios';
import { api, MatchResponse, PuuidResponse, URL_SERVER } from './api';

//----------------------- RIOT request below ================
// Função para buscar o PUUID usando username + tagline
export const getPuuid = async (
  username: string
): Promise<PuuidResponse | null> => {
  try {
    const [summonerName, tagLine] = username.split("#");

    const response = await api.get<PuuidResponse>("/getUserID", {
      params: { summonerName, tagLine },
    });

    console.log("PUUID:", response.data.puuid);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    console.error("Erro ao buscar PUUID:", err.message);
    return null;
  }
};

// Função para buscar a partida ativa usando o PUUID
export const getPartida = async (
  puuid: string
): Promise<MatchResponse | null> => {
  try {
    console.log("Chamando getActiveGame com PUUID:", puuid);

    const response = await api.get<MatchResponse>(
      `/getActiveGame`,
      {
        params: { puuid }
      }
    );

    console.log("Match:", response.data);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    console.error("Erro ao buscar partida:", err.message);
    return null;
  }
};

// Função para buscar o PUUID usando username + tagline

export const getPuuid2 = async (
  username: string
) => {
  const [summonerName, tagLine] = username.split("#");

  const res = await fetch(`${URL_SERVER}/getUserId?summonerName=${summonerName}&tagLine=${tagLine}`);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Erro na requisição');
  }

  const data = await res.json();
  console.log("PUUID:", data.puuid);

  return data;
};

// Função para buscar a partida ativa usando o PUUID
export const getPartida2 = async (
  puuid: string
) => {
  console.log("Chamando getActiveGame com PUUID:", puuid);

  const res = await fetch(`${URL_SERVER}/getActiveGame/?puuid=${puuid}`);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Erro na requisição');
  }

  const data = await res.json();

  return data;
};
