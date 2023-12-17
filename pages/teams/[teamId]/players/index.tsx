import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../../../styles/Players.module.css';
// import { Roster } from '../../../../types/Team';
import BackButton from '../../../../components/BackButton';
import SearchBarContainer from '../../../../components/SearchBarContainer';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ITeam } from '../../../../types/Team';

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://api-web.nhle.com/v1/standings/now');
  const data = await res.json();

  const paths = data.standings.map((team: ITeam) => {
    return {
      params: { teamId: team.teamAbbrev.default }
    }
  });

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const teamId = context.params?.teamId;
  const res = await fetch(`https://api-web.nhle.com/v1/roster/${teamId}/20232024`);
  const data = await res.json();
  const teamRoster = [ ...data.forwards, ...data.defensemen, ...data.goalies ];

  return {
    props: { roster: teamRoster }
  }
}

const RosterInfo = ({ roster }: any) => {
  const [players, setPlayers] = useState<any[]>(roster);
  const [inputText, setInputText] = useState<string>('');

  const router = useRouter();
  const { teamId  } = router.query;

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }

  const filteredplayers = players.filter((player) => {
    return player.firstName.default.toLowerCase().includes(inputText.toLowerCase());
  });

  return (
    <>
      <BackButton href={`/teams/${teamId}`} text={`${teamId} Info Page`} />
      <SearchBarContainer
        headerText={`${teamId} Roster:`}
        placeholder='Search for a player...'
        value={inputText}
        onChange={onInputChange} 
      />
      {filteredplayers && filteredplayers.map((player: any) => {
        const { id, sweaterNumber, positionCode, firstName, lastName } = player;
        const displayNumber = sweaterNumber ? `(#${sweaterNumber})` : '';
        return (
            <Link 
              href={`/teams/${teamId}/players/${id}`} 
              key={id} 
              data-testid='playerLink'
            >
                <a>
                    <div className={styles.playerContent}>
                        <p className={styles.playerName}>{firstName.default} {lastName.default}</p>
                        <p>{positionCode}</p>
                        <p>{displayNumber}</p>
                    </div>
                </a>
            </Link>
        );
      })}
    </>
  )
}

export default RosterInfo;
