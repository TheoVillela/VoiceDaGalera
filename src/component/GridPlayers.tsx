import { useAgora } from "@/contexts/AgoraProvider";
import { PlayerCard } from "./PlayerCard";


export function GridPlayers() {
    const { playersConnected } = useAgora();

    return (
        <div className="grid grid-cols-4 text-center gap-10">
            {playersConnected.map(player => (
                <PlayerCard key={player.userId} player={player} />
            ))}
        </div>
    );
}