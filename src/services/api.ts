import axios from 'axios';

export interface PuuidResponse {
  puuid: string;
}

export interface MatchResponse {
  gameId: string;
  teamId: string;
}

// const LOCAL_SERVER = "http://localhost:3001";
const URL_SERVER = "https://lolvoipserver-production.up.railway.app";

export const SERVER_ATIVO = URL_SERVER;
export const api = axios.create({
  baseURL: URL_SERVER,
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});
