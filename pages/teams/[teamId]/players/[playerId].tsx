import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../../../../styles/Players.module.css';
import { Player } from '../../../../types/Player';
import BackButton from '../../../../components/BackButton';
import PlayerDetails from '../../../../components/PlayerDetails';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ITeam } from '../../../../types/Team';

// export const getStaticPaths: GetStaticPaths = async () => {
//   const res = await fetch('https://api-web.nhle.com/v1/roster/${teamId}/20232024');
//   const data = await res.json();

//   const paths = data.standings.map((team: ITeam) => {
//     return {
//       params: { teamId: team.teamAbbrev.default }
//     }
//   });

//   return {
//     paths,
//     fallback: true,
//   }
// }

// export const getStaticProps: GetStaticProps = async (context) => {
//   const teamId = context.params?.teamId;
//   const res = await fetch(`https://api-web.nhle.com/v1/roster/${teamId}/20232024`);
//   const data = await res.json();
//   const teamRoster = [ ...data.forwards, ...data.defensemen, ...data.goalies ];

//   return {
//     props: { roster: teamRoster }
//   }
// }

const PlayerInfo = () => {
  const [player, setPlayer] = useState<Player | undefined>(undefined);
  const router = useRouter();
  const { teamId, playerId  } = router.query;

  useEffect(() => {
    const fetchPlayerInfo = async () => {
      try {
        const res = await fetch(`https://api-web.nhle.com/v1/player/${teamId}/landing`);
        if (!res.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${res.status}`
          );
        }
        const data =  await res.json();
        if (data) {
          setPlayer(data);
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
      {/* <BackButton href={`/teams/${teamId}/players`} text='Roster Page' />
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
      </div> */}
    </>
  ) : <></>
}

export default PlayerInfo;
