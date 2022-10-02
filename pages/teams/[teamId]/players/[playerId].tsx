import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../../../../styles/Players.module.css';
import { Player } from '../../../../types/Player';

const PlayerInfo = () => {
  const [player, setPlayer] = useState<Player | undefined>(undefined);
  const router = useRouter();
  const { playerId  } = router.query;

  useEffect(() => {
    const fetchPlayerInfo = async () => {
      const res = await fetch(`https://statsapi.web.nhl.com/api/v1/people/${playerId}`);
      const data =  await res.json();
      if (data.people) {
        setPlayer(data.people[0]);
      }
    }
    fetchPlayerInfo();
  }, [playerId])

  const imageUrl = `http://nhl.bamcontent.com/images/headshots/current/168x168/${playerId}.jpg`;
  return player ? (
    <div className={styles.playerDetailsContainer}>
      <div className={styles.playerDetails}>
        <h2>{player.fullName}</h2>
        <table>
          <tr>
            <td>Team: </td>
            <td>{player.currentTeam.name}</td>
          </tr>
          <tr>
            <td>Age: </td>
            <td>{player.currentAge}</td>
          </tr>
          <tr>
            <td>Jersey Number: </td>
            <td>{player.primaryNumber}</td>
          </tr>
          <tr>
            <td>Position: </td>
            <td>{player.primaryPosition.name}</td>
          </tr>
          <tr>
            <td>Shooting/Catching Hand: </td>
            <td>{player.shootsCatches}</td>
          </tr>
          <tr>
            <td>Nationality: </td>
            <td>{player.nationality}</td>
          </tr>
          <tr>
            <td>Is a Captain/Alternative Captain: </td>
            <td>{player.captain || player.alternateCaptain ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <td>Is a Rookie: </td>
            <td>{player.rookie ? 'Yes' : 'No'}</td>
          </tr>
        </table>
      </div>
      <div className={styles.playerPicture}>
        {imageUrl &&
          <Image src={imageUrl} alt='Player Headshot' layout='responsive' width={168} height={168}/>
        }
      </div>
    </div>
  ) : <div></div>
}

export default PlayerInfo;
