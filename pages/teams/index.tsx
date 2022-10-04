import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import styles from '../../styles/Teams.module.css';
import Link from 'next/link';
import { Team } from '../../types/Team';
import BackButton from '../../components/BackButton';
import SearchBarContainer from '../../components/SearchBarContainer';

export interface TeamsProps {
  teams: Team[];
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('https://statsapi.web.nhl.com/api/v1/teams');
  const data = await res.json();

  return {
    props: { teams: data.teams }
  }
}

const Teams = ({ teams }: TeamsProps) => {
  const [inputText, setInputText] = useState<string>('');

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }

  const filteredTeams = teams.filter((team) => team.name.toLowerCase().includes(inputText.toLowerCase()));

  return (
    <>
      <BackButton href='/' text='Home' />
      <SearchBarContainer
        headerText='NHL Teams'
        placeholder='Search for a team...'
        value={inputText}
        onChange={onInputChange} 
      />
      {filteredTeams.map(
          (team: Team) => {
            return (
              <Link href={`/teams/${team.id}`} key={team.id} data-testid='teamLink'>
                <div className={styles.teamContent}>
                  <a>
                    <h2>{team.name}</h2>
                    <p>{`${team.conference.name} Conference`}</p>
                    <p>{`${team.division.name} Division`}</p>
                  </a>
                </div>
              </Link>
            );
          }
        )
      }
    </>
  )
}

export default Teams;
