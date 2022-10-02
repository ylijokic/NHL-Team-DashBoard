import { Person, Position } from "./Team";

export interface Player extends Person {
    active: boolean;
    alternateCaptain: boolean;
    birthCity: string;
    birthCountry: string;
    birthDate: string;
    captain: boolean;
    currentAge: number;
    currentTeam: CurrentTeam;
    firstName: string;
    height: string;
    lastName: string;
    nationality: string;
    primaryNumber: string;
    primaryPosition: Position;
    rookie: boolean;
    rosterStatus: string;
    shootsCatches: string;
    weight: number;
}

interface CurrentTeam {
    id: number;
    link: string;
    name: string;
}
