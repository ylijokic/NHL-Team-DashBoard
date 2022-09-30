export interface Team {
  abbrevieation: string;
  active: boolean;
  conference: Conference;
  division: Division;
  firstYearOfPlay: string;
  franchise: Franchise;
  franchiseId: number;
  id: number;
  link: string;
  locationName: string;
  name: string;
  officialSiteUrl: string;
  roster: TeamRoster;
  shortName: string;
  teamName: string;
  venue: Venue;
}

interface Conference {
    id: number;
    link: string;
    name: string;
}

interface Division {
    abbreviation: string;
    id: number;
    link: string;
    name: string;
    nameShort: string;
}

interface Franchise {
    franchiseId: string;
    link: string;
    teamName: string;
}

interface Person {
    fullName: string;
    id: number;
    link: string;
}

interface Position {
    abbreviation: string;
    code: string;
    name: string;
    type: string;
}

interface Roster {
    jerseyNumber: string;
    person: Person;
    position: Position;
}

interface TeamRoster {
    link: string;
    roster: Roster[];
}

interface TimeZone {
    id: string;
    offset: number;
    tz: string;
}

interface Venue {
    city: string;
    id: number;
    link: string;
    name: string;
    timeZone: TimeZone; 
}
