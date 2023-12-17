import React from 'react';
import { ITeam } from '../../../types/Team';
import { GetStaticPaths, GetStaticProps } from 'next';
import styles from '../../../styles/Teams.module.css';
import Link from 'next/link';
import Image from 'next/image';
import BackButton from '../../../components/BackButton';

export interface TeamInfoProps {
  team: ITeam;
}

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
  const res = await fetch(`https://api-web.nhle.com/v1/standings/now`);
  const data = await res.json();
  const team: ITeam = data.standings.find((t: ITeam) => t.teamAbbrev.default === teamId);

  return {
    props: { team: team }
  }
}

const TeamInfo = ({ team }: TeamInfoProps) => {
  const { teamName, conferenceName, divisionName } = team;
  const imageUrl = team.teamLogo;
  return (
    <>
      <BackButton href='/teams' text='Teams' />
      <div className={styles.teamDetailsContainer}>
          <div className={styles.teamDetails}>
            <h2>{teamName.default}</h2>
            <p>{`${conferenceName} Conference`}</p>
            <p>{`${divisionName} Division`}</p>
            <Link href={`/teams/${team.teamAbbrev.default}/players`} data-testid='rosterLink'>
                <div className={styles.roster}>
                    <a><button>View Team Roster</button></a>
                </div>
            </Link>
          </div>
          <div className={styles.teamImage}>
            {imageUrl &&
                <Image 
                  src={imageUrl} 
                  alt='Dynamic Image' 
                  layout='responsive' 
                  width={168} 
                  height={168}
                  data-testid='teamImage'
                />
            }
          </div>
      </div>
    </>
  )
}

export default TeamInfo;
