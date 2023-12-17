import { useRouter } from 'next/router';
import React from 'react';
import Image from 'next/image';
import styles from '../../../../styles/Players.module.css';
import { Player } from '../../../../types/Player';
import BackButton from '../../../../components/BackButton';
import PlayerDetails from '../../../../components/PlayerDetails';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { ITeam } from '../../../../types/Team';


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { teamId, playerId } = context.query;
  const res = await fetch(`https://api-web.nhle.com/v1/roster/${teamId}/20232024`);
  const data = await res.json();
  const teamRoster = [ ...data.forwards, ...data.defensemen, ...data.goalies ];

  const player = teamRoster.find((p) => String(p.id) === playerId);
  
  return {
    props: { player }
  }
}

const PlayerInfo = ({ player }: any) => {
  const router = useRouter();
  const { teamId } = router.query;

  const imageUrl = player.headshot;
  return player ? (
    <>
      <BackButton href={`/teams/${teamId}/players`} text='Roster Page' />
      <div className={styles.playerDetailsContainer}>
        <div className={styles.playerDetails}>
          <h2>{player.firstName.default} {player.lastName.default}</h2>
          <h4>{teamId}</h4>
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
