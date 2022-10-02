import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../../../styles/Players.module.css';
import { Roster } from '../../../../types/Team';

const Roster = () => {
  const [players, setPlayers] = useState<Roster[]>([]);
  const [teamName, setTeamName] = useState<string>('');
  const router = useRouter();
  const { teamId  } = router.query;

  useEffect(() => {
    const fetchRosterInfo = async () => {
      const res = await fetch(`https://statsapi.web.nhl.com/api/v1/teams/${teamId}?expand=team.roster`);
      const data =  await res.json();
      if (data.teams) {
        setTeamName(data.teams[0].teamName);
        setPlayers(data.teams[0].roster.roster);
      }
    }
    fetchRosterInfo();
  }, [teamId])

  return (
    <>
      <h1>{`${teamName} Roster:`}</h1>
      {players && players.map((player: Roster) => {
        const { person, jerseyNumber } = player;
        const displayNumber = jerseyNumber ? `#${jerseyNumber}` : '';
        return (
            <Link href={`/teams/${teamId}/players/${person.id}`} key={person.id}>
                <a>
                    <div className={styles.playerContent}>
                        <p>{person.fullName}</p>
                        <p>{displayNumber}</p>
                    </div>
                </a>
            </Link>
        );
      })}
    </>
  )
}

export default Roster;
