import { useAgora } from "@/contexts/AgoraProvider";
import { PlayerCard } from "./PlayerCard";


export function GridPlayers() {
    const { playersConnected } = useAgora();

    return (
        <div className="grid grid-cols-5 text-center gap-10">
            {playersConnected.map(player => (
                <PlayerCard key={player.userId} player={player} />
            ))}
        </div>
    );
}