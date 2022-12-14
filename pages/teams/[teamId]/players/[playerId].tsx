import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../../../../styles/Players.module.css';
import { Player } from '../../../../types/Player';
import BackButton from '../../../../components/BackButton';
import PlayerDetails from '../../../../components/PlayerDetails';

const PlayerInfo = () => {
  const [player, setPlayer] = useState<Player | undefined>(undefined);
  const router = useRouter();
  const { teamId, playerId  } = router.query;

  useEffect(() => {
    const fetchPlayerInfo = async () => {
      try {
        const res = await fetch(`https://statsapi.web.nhl.com/api/v1/people/${playerId}`);
        if (!res.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${res.status}`
          );
        }
        const data =  await res.json();
        if (data.people) {
          setPlayer(data.people[0]);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchPlayerInfo();
  }, [playerId])

  const imageUrl = `http://nhl.bamcontent.com/images/headshots/current/168x168/${playerId}.jpg`;
  return player ? (
    <>
      <BackButton href={`/teams/${teamId}/players`} text='Roster Page' />
      <div className={styles.playerDetailsContainer}>
        <div className={styles.playerDetails}>
          <h2>{player.fullName}</h2>
          <PlayerDetails player={player} />
        </div>
        <div className={styles.playerPicture}>
          {imageUrl &&
            <Image 
              src={imageUrl} 
              alt='Player Headshot' 
              layout='responsive' 
              width={168} 
              height={168} 
              data-testid='playerImage'
            />
          }
        </div>
      </div>
    </>
  ) : <></>
}

export default PlayerInfo;
