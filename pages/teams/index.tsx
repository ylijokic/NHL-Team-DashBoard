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
  const res = await fetch('https://api-web.nhle.com/v1/standings/now');
  const data = await res.json();

  return {
    props: { teams: data.standings }
  }
}

const Teams = ({ teams }: TeamsProps) => {
  const [inputText, setInputText] = useState<string>('');

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }

  const filteredTeams = teams.filter((team) => team.teamName.default.toLowerCase().includes(inputText.toLowerCase()));

  return (
    <>
      <BackButton href='/' text='Home' />
      <SearchBarContainer
        headerText='NHL Team Standings'
        placeholder='Search for a team...'
        value={inputText}
        onChange={onInputChange} 
      />
      {filteredTeams.map(
          (team: Team) => {
            return (
              <Link href={`/teams/${team.teamAbbrev.default}`} key={team.teamAbbrev.default} data-testid='teamLink'>
                <div className={styles.teamContent}>
                  <a className={styles.displayFlex}>
                    <div>
                      <h2>{team.teamName.default}</h2>
                      <p>{`${team.conferenceName} Conference`}</p>
                      <p>{`${team.divisionName} Division`}</p>
                    </div>
                    <div>
                      <p>{`${team.wins} Wins`}</p>
                      <p>{`${team.losses} Losses`}</p>
                      <p>{`${team.ties} Ties`}</p>
                    </div>
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
