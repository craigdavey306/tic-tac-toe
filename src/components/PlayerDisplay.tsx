import { FC } from 'react';
import './PlayerDisplay.css';
import { Player, PlayerStats } from '../models';

type PlayerDisplayProps = {
  stats: PlayerStats;
  currentPlayer: Player | null;
};

const PlayerDisplay: FC<PlayerDisplayProps> = ({ stats, currentPlayer }) => {
  return (
    <table className="player-display-container">
      <tr>
        {(Object.keys(stats) as Player[]).map((key) => {
          return (
            <td className="player-display-container__player-cell">
              <div>
                <span
                  className={`player-display-container__mark ${
                    key === currentPlayer ? 'active' : ''
                  }`}
                >
                  {key}
                </span>
                <span className="player-display-container__score">
                  {stats[key] > 0 ? stats[key] : '-'}
                </span>
              </div>
            </td>
          );
        })}
      </tr>
    </table>
  );
};

export default PlayerDisplay;
