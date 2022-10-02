import React from 'react';
import { Team } from '../../../types/Team';
import { GetStaticPaths, GetStaticProps } from 'next';
import styles from '../../../styles/Teams.module.css';
import Link from 'next/link';
import Image from 'next/image';

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
  const { name, conference, division } = team;
  const imageUrl = `https://www-league.nhlstatic.com/nhl.com/builds/site-core/d1b262bacd4892b22a38e8708cdb10c8327ff73e_1579810224/images/logos/team/current/team-${team.id}-light.svg`;
  return (
    <>
      <div className={styles.teamDetailsContainer}>
          <div className={styles.teamDetails}>
            <h2>{name}</h2>
            <p>{`${conference.name} Conference`}</p>
            <p>{`${division.name} Division`}</p>
            <Link href={`/teams/${team.id}/players`}>
                <div className={styles.roster}>
                    <a><button>View Team Roster</button></a>
                </div>
            </Link>
          </div>
          <div className={styles.teamImage}>
            {imageUrl &&
                <Image src={imageUrl} alt='Dynamic Image' layout='responsive' width={168} height={168}/>
            }
          </div>
      </div>
    </>
  )
}

export default TeamInfo;
