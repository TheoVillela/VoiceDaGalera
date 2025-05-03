"use client"

import { createContext, useContext, useEffect, useState } from 'react';
import type { IAgoraRTCRemoteUser, ILocalAudioTrack, UID } from 'agora-rtc-sdk-ng'
import { LucideIcon } from 'lucide-react';

interface Player {
    userName: string
    userId: UID
    icon: LucideIcon
    remoteUser: IAgoraRTCRemoteUser
}

type AgoraContextType = {
    // join: (channel: string, uid: UID) => Promise<void>;
    // leave: () => Promise<void>;

    // // falta implementar os metods debaixo
    // summonerName: string
    // setSummonerName: (summonerName: string) => void
    // roomId: string
    // setRoomId: (roomId: string) => void
    // puuid: string
    // setPuuid: (puuid: string) => void
    // setAllRemoteUsersVoice: (status: boolean) => void
    // setRemoteUserVoice: (userId: UID, status: boolean) => void
    // setLocalUserVoice: (status: boolean) => void
    // playersConnected: Player[]


    //funcoes para o cliente usar
    setLocalAudioTrackContext: (localAudioTrack: ILocalAudioTrack) => void
    addPlayer: (newPlayer: Player) => void
    removePlayer: (userId: UID) => void

    //funcoes para o frontend usar
    playersConnected: Player[]
    setIsMuted: (status: boolean) => void
    setAllRemoteUsersMuted: (status: boolean) => void
    allRemoteUsersMuted: boolean,
    // volumeLevels: { [uid: string]: number }
    // setVolumeLevels: (volumeLevel: { [uid: string]: number }) => void

};

const AgoraContext = createContext<AgoraContextType | undefined>(undefined);

export const AgoraProvider = ({ children }: { children: React.ReactNode }) => {
    const [localAudioTrack, setLocalAudioTrackContext] = useState<ILocalAudioTrack | null>(null)
    const [playersConnected, setPlayers] = useState<Player[]>([]);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [allRemoteUsersMuted, setAllRemoteUsersMuted] = useState<boolean>(false);
    // const [volumeLevels, setVolumeLevels] = useState<{ [uid: string]: number }>({});


    //useEffect para mutar TODOS remote user local
    useEffect(() => {
        playersConnected.forEach(player => {
            if (allRemoteUsersMuted) {
                player.remoteUser.audioTrack?.setVolume(0);
            } else
                player.remoteUser.audioTrack?.setVolume(100);
        });
    }, [allRemoteUsersMuted])

    //useEffect para mutar o user local
    useEffect(() => {
        if (isMuted) {
            localAudioTrack?.setVolume(0);
        } else
            localAudioTrack?.setVolume(100);
    }, [isMuted])

    //add player ao array que alimenta o grid
    const addPlayer = (newPlayer: Player) => {
        setPlayers((prevPlayers) => {
            if (prevPlayers.some((player) => player.userId === newPlayer.userId)) {
                return prevPlayers;
            }
            return [...prevPlayers, newPlayer];
        });
    };

    //remove player do array que alimenta o grid
    const removePlayer = (userId: UID) => {
        setPlayers((prevPlayers) =>
            prevPlayers.filter((player) => player.userId !== userId)
        );
    };

    return (
        <AgoraContext.Provider value={{ allRemoteUsersMuted, setAllRemoteUsersMuted, setIsMuted, playersConnected, setLocalAudioTrackContext, addPlayer, removePlayer }}>
            {children}
        </AgoraContext.Provider>
    );
};

export const useAgora = () => {
    const context = useContext(AgoraContext);
    if (!context) throw new Error('useAgora must be used within an AgoraProvider');
    return context;
};