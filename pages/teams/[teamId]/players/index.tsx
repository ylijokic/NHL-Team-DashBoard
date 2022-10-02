import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../../../styles/Players.module.css';
import { Roster } from '../../../../types/Team';

const Roster = () => {
  const [players, setPlayers] = useState<Roster[]>([]);
  const [teamName, setTeamName] = useState<string>('');
  const [inputText, setInputText] = useState<string>('');

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

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }

  const filteredplayers = players.filter((player) => {
    return player.person.fullName.toLowerCase().includes(inputText.toLowerCase());
  });

  return (
    <>
      <div className={styles.searchContainer}>
        <h1>{`${teamName} Roster:`}</h1>
        <input 
            className={styles.playerSearch}
            type='text' 
            placeholder='Search for a player...' 
            onChange={onInputChange} 
            value={inputText}
        />
      </div>
      {filteredplayers && filteredplayers.map((player: Roster) => {
        const { person, jerseyNumber, position } = player;
        const displayNumber = jerseyNumber ? `(#${jerseyNumber})` : '';
        return (
            <Link href={`/teams/${teamId}/players/${person.id}`} key={person.id}>
                <a>
                    <div className={styles.playerContent}>
                        <p className={styles.playerName}>{person.fullName}</p>
                        <p>{position.name}</p>
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
