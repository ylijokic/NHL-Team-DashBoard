import React from 'react';
import { Team } from '../../../types/Team';
import { GetStaticPaths, GetStaticProps } from 'next';
import styles from '../../../styles/Teams.module.css';
import Link from 'next/link';

export interface TeamInfoProps {
  team: Team;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://statsapi.web.nhl.com/api/v1/teams');
  const data = await res.json();

  const paths = data.teams.map((team: Team) => {
    return {
      params: { teamId: team.id.toString() }
    }
  });

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const teamId = context.params?.teamId;
  const res = await fetch(`https://statsapi.web.nhl.com/api/v1/teams/${teamId}?expand=team.roster`);
  const data = await res.json();

  return {
    props: { team: data.teams[0] }
  }
}

const TeamInfo = ({ team }: TeamInfoProps) => {
  const { name, conference, division, roster } = team;
  return (
    <>
      <div className={styles.teamDetails}>
          <h2>{name}</h2>
          <p>{`${conference.name} Conference`}</p>
          <p>{`${division.name} Division`}</p>
          <Link href={`/teams/${team.id}/players`}>
            <a><h3>Roster:</h3></a>
          </Link>
          {roster.roster.map((player: any) => {
            const { person, jerseyNumber } = player;
            const displayNumber = jerseyNumber ? `#${jerseyNumber}` : '';
            return (
                <Link href={`/teams/${team.id}/players/${person.id}`} key={person.id}>
                    <a>
                        <div className={styles.playerContent}>
                            <p>{person.fullName}</p>
                            <p>{displayNumber}</p>
                        </div>
                    </a>
                </Link>
            );
          })}
      </div>
    </>
  )
}

export default TeamInfo;
