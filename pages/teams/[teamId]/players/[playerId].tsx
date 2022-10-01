import React from 'react'
import { useRouter } from 'next/router';

const PlayerInfo = () => {
  const router = useRouter();
  const { teamId, playerId } = router.query;
  return (
    <div>{`Team ${teamId} - Player ${playerId}`}</div>
  )
}

export default PlayerInfo;
