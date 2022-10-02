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

  const imageUrl = `http://nhl.bamcontent.com/images/headshots/current/60x60/${playerId}.jpg`;
  return player ? (
    <>
      <p>{`Name: ${player.fullName}`}</p>
      <p>{`Team: ${player.currentTeam.name}`}</p>
      <p>{`Age: ${player.currentAge}`}</p>
      <p>{`Jersey Number: ${player.primaryNumber}`}</p>
      <p>{`Position: ${player.primaryPosition.name}`}</p>
      <p>{`Shooting/Catching Hand: ${player.shootsCatches}`}</p>
      <p>{`Nationality: ${player.nationality}`}</p>
      <p>{`Is Captain: ${player.captain}`}</p>
      <p>{`Is Rookie: ${player.rookie}`}</p>
      <div className={styles.playerPicture}>
      {imageUrl &&
        <Image src={imageUrl} alt='Player Headshot' layout='responsive' width={60} height={60}/>
      }
      </div>
    </>
  ) : <div></div>
}

export default PlayerInfo;
