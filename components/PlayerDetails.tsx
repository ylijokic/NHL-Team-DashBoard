import React from 'react'
import { Player } from '../types/Player';

interface PlayerDetailsProps {
    player: Player;
}

const PlayerDetails = ({ player }: PlayerDetailsProps) => {
  return (
    <table data-testid='playerDetails'>
        <tbody>
            <tr>
                <td>Team: </td>
                <td>{player.currentTeam.name}</td>
            </tr>
            <tr>
                <td>Age: </td>
                <td>{player.currentAge}</td>
            </tr>
            <tr>
                <td>Jersey Number: </td>
                <td>{player.primaryNumber}</td>
            </tr>
            <tr>
                <td>Position: </td>
                <td>{player.primaryPosition.name}</td>
            </tr>
            <tr>
                <td>Shooting/Catching Hand: </td>
                <td>{player.shootsCatches}</td>
            </tr>
            <tr>
                <td>Nationality: </td>
                <td>{player.nationality}</td>
            </tr>
            <tr>
                <td>Is a Captain/Alternative Captain: </td>
                <td>{player.captain || player.alternateCaptain ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
                <td>Is a Rookie: </td>
                <td>{player.rookie ? 'Yes' : 'No'}</td>
            </tr>
        </tbody>
    </table>
  )
}

export default PlayerDetails;
