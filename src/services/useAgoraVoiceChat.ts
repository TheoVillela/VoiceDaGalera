import { useEffect, useState } from 'react'
import type { IAgoraRTCClient, ILocalAudioTrack } from 'agora-rtc-sdk-ng'
import { Bird, Bug, Cat, Origami, LucideIcon } from 'lucide-react'
import { useAgora } from '@/contexts/AgoraProvider'

const APP_ID = '8accfb5e223d4aa89e8ad8003527b7c1'

function getRandomIcon(): LucideIcon {
    const icons: LucideIcon[] = [Bird, Bug, Cat, Origami];
    const randomIndex = Math.floor(Math.random() * icons.length);
    return icons[randomIndex];
}

export const useAgoraVoice = () => {
    const { setLocalAudioTrackContext, addPlayer, removePlayer } = useAgora();

    const [client, setClient] = useState<IAgoraRTCClient | null>(null)
    const [localAudioTrack, setLocalAudioTrack] = useState<ILocalAudioTrack | null>(null)
    const [joined, setJoined] = useState(false)

    const join = async (userName: string, roomId: string) => {
        if (typeof window === 'undefined') return

        const AgoraRTC = (await import('agora-rtc-sdk-ng')).default
        const rtcClient = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' })
        setClient(rtcClient)
        console.log(`Room ID: ${roomId}`);
        console.log(`userid ID: ${userName}`)

        await rtcClient.join(APP_ID, roomId, null, userName)//gerarStringAleatoria(5)
        const track = await AgoraRTC.createMicrophoneAudioTrack()
        setLocalAudioTrack(track)

        setLocalAudioTrackContext(track); //setando no contexto

        await rtcClient.publish([track])

        // Listen for remote users publishing audio
        rtcClient.on('user-published', async (user, mediaType) => {
            if (mediaType === 'audio') {
                await rtcClient.subscribe(user, mediaType)
                user.audioTrack?.play();
                console.log('Grid ADD: usuario add do grid')
                addPlayer({
                    userName: user.uid as string, // user name tipado
                    icon: getRandomIcon(),
                    userId: user.uid,
                    remoteUser: user
                });
            }
        })

        rtcClient.on('user-unpublished', async (user) => {
            console.log('Grid remove: usuario removido do grid')
            removePlayer(user.uid)
        })

        setJoined(true)
    }

    const leave = async () => {
        if (client) {
            localAudioTrack?.close()
            await client.leave()
            setJoined(false)
        }
    }

    useEffect(() => {
        return () => {
            leave()
        }
    }, [])

    return { join, leave, joined }
}
