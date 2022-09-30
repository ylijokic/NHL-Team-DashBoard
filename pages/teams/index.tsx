import React from 'react';
import { GetStaticProps } from 'next';
import styles from '../../styles/Teams.module.css';
import Link from 'next/link';
import { Team } from '../../types/Team';

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
  return (
    <>
      <h1 className={styles.title}>NHL Teams</h1>
      {teams.map((team: Team) => {
        return (
          <Link href={`/teams/${team.id}`} key={team.id}>
            <div className={styles.teamContent}>
              <a>
                <h2>{team.name}</h2>
                <p>{`${team.conference.name} Conference`}</p>
                <p>{`${team.division.name} Division`}</p>
              </a>
            </div>
          </Link>
        );
      })}
    </>
  )
}

export default Teams;
