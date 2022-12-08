import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../../../styles/Players.module.css';
import { Roster } from '../../../../types/Team';
import BackButton from '../../../../components/BackButton';
import SearchBarContainer from '../../../../components/SearchBarContainer';

const Roster = () => {
  const [players, setPlayers] = useState<Roster[]>([]);
  const [teamName, setTeamName] = useState<string>('');
  const [inputText, setInputText] = useState<string>('');

  const router = useRouter();
  const { teamId  } = router.query;

  useEffect(() => {
    const fetchRosterInfo = async () => {
      try {
        const res = await fetch(`https://statsapi.web.nhl.com/api/v1/teams/${teamId}?expand=team.roster`);
        if (!res.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${res.status}`
          );
        }
        const data =  await res.json();
        if (data.teams) {
          setTeamName(data.teams[0].teamName);
          setPlayers(data.teams[0].roster.roster);
        }
      } catch (error) {
        console.log(error);
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
      <BackButton href={`/teams/${teamId}`} text={`${teamName} Info Page`} />
      <SearchBarContainer
        headerText={`${teamName} Roster:`}
        placeholder='Search for a player...'
        value={inputText}
        onChange={onInputChange} 
      />
      {filteredplayers && filteredplayers.map((player: Roster) => {
        const { person, jerseyNumber, position } = player;
        const displayNumber = jerseyNumber ? `(#${jerseyNumber})` : '';
        return (
            <Link 
              href={`/teams/${teamId}/players/${person.id}`} 
              key={person.id} 
              data-testid='playerLink'
            >
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
