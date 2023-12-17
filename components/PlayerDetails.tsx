import React from 'react'
import { Player } from '../types/Player';

interface PlayerDetailsProps {
    player: Player | any;
}

const PlayerDetails = ({ player }: PlayerDetailsProps) => {
  return (
    <table data-testid='playerDetails'>
        <tbody>
            <tr>
                <td>Birth Date: </td>
                <td>{player.birthDate}</td>
            </tr>
            <tr>
                <td>Jersey Number: </td>
                <td>{player.sweaterNumber}</td>
            </tr>
            <tr>
                <td>Position: </td>
                <td>{player.positionCode}</td>
            </tr>
            <tr>
                <td>Shooting/Catching Hand: </td>
                <td>{player.shootsCatches}</td>
            </tr>
            <tr>
                <td>Nationality: </td>
                <td>{player.birthCountry}</td>
            </tr>
            <tr>
                <td>Height in Inches: </td>
                <td>{player.heightInInches}</td>
            </tr>
            <tr>
                <td>Weight in Pounds: </td>
                <td>{player.weightInPounds}</td>
            </tr>
        </tbody>
    </table>
  )
}

export default PlayerDetails;
