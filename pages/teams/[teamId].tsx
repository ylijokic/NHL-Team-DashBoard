import React from 'react';
import { Team } from '../../types/Team';
import { GetStaticPaths, GetStaticProps } from 'next';
import styles from '../../styles/Teams.module.css';

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
          <h3>Roster:</h3>
          {roster.roster.map((player: any) => {
            const { person, jerseyNumber } = player;
            return (
              <div key={person.id}>
                <p>{person.fullName}</p>
                <p>{jerseyNumber}</p>
                <hr/>
              </div>
            );
          })}
      </div>
    </>
  )
}

export default TeamInfo;
