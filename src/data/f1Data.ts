import { Driver, Constructor, SeasonConstructorStanding, TyreCompoundData, DriverAggregate, ConstructorAggregate, DriverSeasonRecord } from '../types/f1';
import { CIRCUITS_DATA } from './circuitsData';

export const SEASONS_LIST = Array.from({ length: 17 }, (_, i) => 2007 + i); // 2007 to 2023 (17 seasons)

export const CONSTRUCTORS: Constructor[] = [
  { constructorId: 'red_bull', name: 'Red Bull Racing', nationality: 'Austrian', color: '#1E41FF', accentColor: '#CC0000', headquarters: 'Milton Keynes, UK', powerUnit: 'Honda RBPT / Renault', teamPrincipal: 'Christian Horner' },
  { constructorId: 'mercedes', name: 'Mercedes-AMG', nationality: 'German', color: '#00A19B', accentColor: '#C0C0C0', headquarters: 'Brackley, UK', powerUnit: 'Mercedes', teamPrincipal: 'Toto Wolff' },
  { constructorId: 'ferrari', name: 'Scuderia Ferrari', nationality: 'Italian', color: '#E80020', accentColor: '#FFF200', headquarters: 'Maranello, Italy', powerUnit: 'Ferrari', teamPrincipal: 'Fred Vasseur' },
  { constructorId: 'mclaren', name: 'McLaren F1 Team', nationality: 'British', color: '#FF8000', accentColor: '#47C7FC', headquarters: 'Woking, UK', powerUnit: 'Mercedes / Renault / Honda', teamPrincipal: 'Andrea Stella' },
  { constructorId: 'alpine', name: 'Alpine / Renault', nationality: 'French', color: '#0090FF', accentColor: '#FD4BC7', headquarters: 'Enstone, UK / Viry, France', powerUnit: 'Renault', teamPrincipal: 'Bruno Famin' },
  { constructorId: 'aston_martin', name: 'Aston Martin / Force India', nationality: 'British', color: '#006F62', accentColor: '#CEDC00', headquarters: 'Silverstone, UK', powerUnit: 'Mercedes', teamPrincipal: 'Mike Krack' },
  { constructorId: 'alphatauri', name: 'AlphaTauri / Toro Rosso', nationality: 'Italian', color: '#2B4562', accentColor: '#FFFFFF', headquarters: 'Faenza, Italy', powerUnit: 'Honda RBPT / Ferrari', teamPrincipal: 'Franz Tost' },
  { constructorId: 'alfa_romeo', name: 'Alfa Romeo / Sauber', nationality: 'Swiss', color: '#900000', accentColor: '#FFFFFF', headquarters: 'Hinwil, Switzerland', powerUnit: 'Ferrari', teamPrincipal: 'Alessandro Alunni Bravi' },
  { constructorId: 'williams', name: 'Williams Racing', nationality: 'British', color: '#005AFF', accentColor: '#00A0DE', headquarters: 'Grove, UK', powerUnit: 'Mercedes / Renault / Cosworth', teamPrincipal: 'James Vowles' },
  { constructorId: 'haas', name: 'Haas F1 Team', nationality: 'American', color: '#B6BABD', accentColor: '#E6002B', headquarters: 'Kannapolis, USA / Banbury, UK', powerUnit: 'Ferrari', teamPrincipal: 'Ayao Komatsu' },
];

/**
 * Historical Season Records for Top Drivers (for Driver Profile deep-dive)
 */
export const DRIVER_SEASON_PROFILES: Record<string, DriverSeasonRecord[]> = {
  hamilton: [
    { season: 2007, constructorId: 'mclaren', points: 109, position: 2, wins: 4, podiums: 12, dnfs: 1 },
    { season: 2008, constructorId: 'mclaren', points: 98, position: 1, wins: 5, podiums: 10, dnfs: 1 },
    { season: 2009, constructorId: 'mclaren', points: 49, position: 5, wins: 2, podiums: 5, dnfs: 3 },
    { season: 2010, constructorId: 'mclaren', points: 240, position: 4, wins: 3, podiums: 9, dnfs: 4 },
    { season: 2011, constructorId: 'mclaren', points: 227, position: 5, wins: 3, podiums: 6, dnfs: 3 },
    { season: 2012, constructorId: 'mclaren', points: 190, position: 4, wins: 4, podiums: 7, dnfs: 5 },
    { season: 2013, constructorId: 'mercedes', points: 189, position: 4, wins: 1, podiums: 5, dnfs: 1 },
    { season: 2014, constructorId: 'mercedes', points: 384, position: 1, wins: 11, podiums: 16, dnfs: 3 },
    { season: 2015, constructorId: 'mercedes', points: 381, position: 1, wins: 10, podiums: 17, dnfs: 1 },
    { season: 2016, constructorId: 'mercedes', points: 380, position: 2, wins: 10, podiums: 17, dnfs: 2 },
    { season: 2017, constructorId: 'mercedes', points: 363, position: 1, wins: 9, podiums: 13, dnfs: 0 },
    { season: 2018, constructorId: 'mercedes', points: 408, position: 1, wins: 11, podiums: 17, dnfs: 1 },
    { season: 2019, constructorId: 'mercedes', points: 413, position: 1, wins: 11, podiums: 17, dnfs: 0 },
    { season: 2020, constructorId: 'mercedes', points: 347, position: 1, wins: 11, podiums: 14, dnfs: 0 },
    { season: 2021, constructorId: 'mercedes', points: 387.5, position: 2, wins: 8, podiums: 17, dnfs: 1 },
    { season: 2022, constructorId: 'mercedes', points: 240, position: 6, wins: 0, podiums: 9, dnfs: 1 },
    { season: 2023, constructorId: 'mercedes', points: 234, position: 3, wins: 0, podiums: 6, dnfs: 1 },
  ],
  verstappen: [
    { season: 2015, constructorId: 'alphatauri', points: 49, position: 12, wins: 0, podiums: 0, dnfs: 4 },
    { season: 2016, constructorId: 'red_bull', points: 204, position: 5, wins: 1, podiums: 7, dnfs: 3 },
    { season: 2017, constructorId: 'red_bull', points: 168, position: 6, wins: 2, podiums: 4, dnfs: 7 },
    { season: 2018, constructorId: 'red_bull', points: 249, position: 4, wins: 2, podiums: 11, dnfs: 3 },
    { season: 2019, constructorId: 'red_bull', points: 278, position: 3, wins: 3, podiums: 9, dnfs: 2 },
    { season: 2020, constructorId: 'red_bull', points: 214, position: 3, wins: 2, podiums: 11, dnfs: 5 },
    { season: 2021, constructorId: 'red_bull', points: 395.5, position: 1, wins: 10, podiums: 18, dnfs: 3 },
    { season: 2022, constructorId: 'red_bull', points: 454, position: 1, wins: 15, podiums: 17, dnfs: 2 },
    { season: 2023, constructorId: 'red_bull', points: 575, position: 1, wins: 19, podiums: 21, dnfs: 0 },
  ],
  vettel: [
    { season: 2007, constructorId: 'alphatauri', points: 6, position: 14, wins: 0, podiums: 0, dnfs: 2 },
    { season: 2008, constructorId: 'alphatauri', points: 35, position: 8, wins: 1, podiums: 1, dnfs: 5 },
    { season: 2009, constructorId: 'red_bull', points: 84, position: 2, wins: 4, podiums: 8, dnfs: 3 },
    { season: 2010, constructorId: 'red_bull', points: 256, position: 1, wins: 5, podiums: 10, dnfs: 3 },
    { season: 2011, constructorId: 'red_bull', points: 392, position: 1, wins: 11, podiums: 17, dnfs: 1 },
    { season: 2012, constructorId: 'red_bull', points: 281, position: 1, wins: 5, podiums: 10, dnfs: 2 },
    { season: 2013, constructorId: 'red_bull', points: 397, position: 1, wins: 13, podiums: 16, dnfs: 1 },
    { season: 2014, constructorId: 'red_bull', points: 167, position: 5, wins: 0, podiums: 4, dnfs: 3 },
    { season: 2015, constructorId: 'ferrari', points: 278, position: 3, wins: 3, podiums: 13, dnfs: 1 },
    { season: 2016, constructorId: 'ferrari', points: 212, position: 4, wins: 0, podiums: 7, dnfs: 3 },
    { season: 2017, constructorId: 'ferrari', points: 317, position: 2, wins: 5, podiums: 13, dnfs: 2 },
    { season: 2018, constructorId: 'ferrari', points: 320, position: 2, wins: 5, podiums: 12, dnfs: 1 },
    { season: 2019, constructorId: 'ferrari', points: 240, position: 5, wins: 1, podiums: 9, dnfs: 2 },
    { season: 2020, constructorId: 'ferrari', points: 33, position: 13, wins: 0, podiums: 0, dnfs: 3 },
    { season: 2021, constructorId: 'aston_martin', points: 43, position: 12, wins: 0, podiums: 1, dnfs: 3 },
    { season: 2022, constructorId: 'aston_martin', points: 37, position: 12, wins: 0, podiums: 0, dnfs: 2 },
  ],
  alonso: [
    { season: 2007, constructorId: 'mclaren', points: 109, position: 3, wins: 4, podiums: 12, dnfs: 1 },
    { season: 2008, constructorId: 'alpine', points: 61, position: 5, wins: 2, podiums: 3, dnfs: 3 },
    { season: 2009, constructorId: 'alpine', points: 26, position: 9, wins: 0, podiums: 1, dnfs: 3 },
    { season: 2010, constructorId: 'ferrari', points: 252, position: 2, wins: 5, podiums: 10, dnfs: 1 },
    { season: 2011, constructorId: 'ferrari', points: 257, position: 4, wins: 1, podiums: 10, dnfs: 1 },
    { season: 2012, constructorId: 'ferrari', points: 278, position: 2, wins: 3, podiums: 13, dnfs: 2 },
    { season: 2013, constructorId: 'ferrari', points: 242, position: 2, wins: 2, podiums: 9, dnfs: 1 },
    { season: 2014, constructorId: 'ferrari', points: 161, position: 6, wins: 0, podiums: 2, dnfs: 2 },
    { season: 2015, constructorId: 'mclaren', points: 11, position: 17, wins: 0, podiums: 0, dnfs: 7 },
    { season: 2016, constructorId: 'mclaren', points: 54, position: 10, wins: 0, podiums: 0, dnfs: 3 },
    { season: 2017, constructorId: 'mclaren', points: 17, position: 15, wins: 0, podiums: 0, dnfs: 7 },
    { season: 2018, constructorId: 'mclaren', points: 50, position: 11, wins: 0, podiums: 0, dnfs: 6 },
    { season: 2021, constructorId: 'alpine', points: 81, position: 10, wins: 0, podiums: 1, dnfs: 2 },
    { season: 2022, constructorId: 'alpine', points: 81, position: 9, wins: 0, podiums: 0, dnfs: 5 },
    { season: 2023, constructorId: 'aston_martin', points: 206, position: 4, wins: 0, podiums: 8, dnfs: 2 },
  ],
  leclerc: [
    { season: 2018, constructorId: 'alfa_romeo', points: 39, position: 13, wins: 0, podiums: 0, dnfs: 5 },
    { season: 2019, constructorId: 'ferrari', points: 264, position: 4, wins: 2, podiums: 10, dnfs: 2 },
    { season: 2020, constructorId: 'ferrari', points: 98, position: 8, wins: 0, podiums: 2, dnfs: 4 },
    { season: 2021, constructorId: 'ferrari', points: 159, position: 7, wins: 0, podiums: 1, dnfs: 2 },
    { season: 2022, constructorId: 'ferrari', points: 308, position: 2, wins: 3, podiums: 11, dnfs: 3 },
    { season: 2023, constructorId: 'ferrari', points: 206, position: 5, wins: 0, podiums: 6, dnfs: 4 },
  ],
  norris: [
    { season: 2019, constructorId: 'mclaren', points: 49, position: 11, wins: 0, podiums: 0, dnfs: 4 },
    { season: 2020, constructorId: 'mclaren', points: 97, position: 9, wins: 0, podiums: 1, dnfs: 1 },
    { season: 2021, constructorId: 'mclaren', points: 160, position: 6, wins: 0, podiums: 4, dnfs: 2 },
    { season: 2022, constructorId: 'mclaren', points: 122, position: 7, wins: 0, podiums: 1, dnfs: 2 },
    { season: 2023, constructorId: 'mclaren', points: 205, position: 6, wins: 0, podiums: 7, dnfs: 1 },
  ],
};

export const DRIVERS_LIST: Driver[] = [
  { driverId: 'hamilton', code: 'HAM', forename: 'Lewis', surname: 'Hamilton', fullName: 'Lewis Hamilton', nationality: 'British', permanentNumber: 44, primaryConstructor: 'mercedes', activeYears: '2007-2023', careerTitles: 7, bestFinish: '1st (103 wins)' },
  { driverId: 'verstappen', code: 'VER', forename: 'Max', surname: 'Verstappen', fullName: 'Max Verstappen', nationality: 'Dutch', permanentNumber: 1, primaryConstructor: 'red_bull', activeYears: '2015-2023', careerTitles: 3, bestFinish: '1st (54 wins)' },
  { driverId: 'vettel', code: 'VET', forename: 'Sebastian', surname: 'Vettel', fullName: 'Sebastian Vettel', nationality: 'German', permanentNumber: 5, primaryConstructor: 'red_bull', activeYears: '2007-2022', careerTitles: 4, bestFinish: '1st (53 wins)' },
  { driverId: 'alonso', code: 'ALO', forename: 'Fernando', surname: 'Alonso', fullName: 'Fernando Alonso', nationality: 'Spanish', permanentNumber: 14, primaryConstructor: 'alpine', activeYears: '2007-2023', careerTitles: 2, bestFinish: '1st (17 wins)' },
  { driverId: 'bottas', code: 'BOT', forename: 'Valtteri', surname: 'Bottas', fullName: 'Valtteri Bottas', nationality: 'Finnish', permanentNumber: 77, primaryConstructor: 'mercedes', activeYears: '2013-2023', careerTitles: 0, bestFinish: '1st (10 wins)' },
  { driverId: 'rosberg', code: 'ROS', forename: 'Nico', surname: 'Rosberg', fullName: 'Nico Rosberg', nationality: 'German', permanentNumber: 6, primaryConstructor: 'mercedes', activeYears: '2007-2016', careerTitles: 1, bestFinish: '1st (23 wins)' },
  { driverId: 'raikkonen', code: 'RAI', forename: 'Kimi', surname: 'Räikkönen', fullName: 'Kimi Räikkönen', nationality: 'Finnish', permanentNumber: 7, primaryConstructor: 'ferrari', activeYears: '2007-2021', careerTitles: 1, bestFinish: '1st (12 wins)' },
  { driverId: 'perez', code: 'PER', forename: 'Sergio', surname: 'Perez', fullName: 'Sergio Perez', nationality: 'Mexican', permanentNumber: 11, primaryConstructor: 'red_bull', activeYears: '2011-2023', careerTitles: 0, bestFinish: '1st (6 wins)' },
  { driverId: 'ricciardo', code: 'RIC', forename: 'Daniel', surname: 'Ricciardo', fullName: 'Daniel Ricciardo', nationality: 'Australian', permanentNumber: 3, primaryConstructor: 'red_bull', activeYears: '2011-2023', careerTitles: 0, bestFinish: '1st (8 wins)' },
  { driverId: 'leclerc', code: 'LEC', forename: 'Charles', surname: 'Leclerc', fullName: 'Charles Leclerc', nationality: 'Monegasque', permanentNumber: 16, primaryConstructor: 'ferrari', activeYears: '2018-2023', careerTitles: 0, bestFinish: '1st (5 wins)' },
  { driverId: 'button', code: 'BUT', forename: 'Jenson', surname: 'Button', fullName: 'Jenson Button', nationality: 'British', permanentNumber: 22, primaryConstructor: 'mclaren', activeYears: '2007-2017', careerTitles: 1, bestFinish: '1st (14 wins)' },
  { driverId: 'webber', code: 'WEB', forename: 'Mark', surname: 'Webber', fullName: 'Mark Webber', nationality: 'Australian', permanentNumber: 2, primaryConstructor: 'red_bull', activeYears: '2007-2013', careerTitles: 0, bestFinish: '1st (9 wins)' },
  { driverId: 'massa', code: 'MAS', forename: 'Felipe', surname: 'Massa', fullName: 'Felipe Massa', nationality: 'Brazilian', permanentNumber: 19, primaryConstructor: 'ferrari', activeYears: '2007-2017', careerTitles: 0, bestFinish: '1st (9 wins)' },
  { driverId: 'sainz', code: 'SAI', forename: 'Carlos', surname: 'Sainz', fullName: 'Carlos Sainz', nationality: 'Spanish', permanentNumber: 55, primaryConstructor: 'ferrari', activeYears: '2015-2023', careerTitles: 0, bestFinish: '1st (2 wins)' },
  { driverId: 'norris', code: 'NOR', forename: 'Lando', surname: 'Norris', fullName: 'Lando Norris', nationality: 'British', permanentNumber: 4, primaryConstructor: 'mclaren', activeYears: '2019-2023', careerTitles: 0, bestFinish: '2nd (13 podiums)' },
  { driverId: 'russell', code: 'RUS', forename: 'George', surname: 'Russell', fullName: 'George Russell', nationality: 'British', permanentNumber: 63, primaryConstructor: 'mercedes', activeYears: '2019-2023', careerTitles: 0, bestFinish: '1st (1 win)' },
  { driverId: 'gasly', code: 'GAS', forename: 'Pierre', surname: 'Gasly', fullName: 'Pierre Gasly', nationality: 'French', permanentNumber: 10, primaryConstructor: 'alpine', activeYears: '2017-2023', careerTitles: 0, bestFinish: '1st (1 win)' },
  { driverId: 'ocon', code: 'OCO', forename: 'Esteban', surname: 'Ocon', fullName: 'Esteban Ocon', nationality: 'French', permanentNumber: 31, primaryConstructor: 'alpine', activeYears: '2016-2023', careerTitles: 0, bestFinish: '1st (1 win)' },
  { driverId: 'hulkenberg', code: 'HUL', forename: 'Nico', surname: 'Hülkenberg', fullName: 'Nico Hülkenberg', nationality: 'German', permanentNumber: 27, primaryConstructor: 'haas', activeYears: '2010-2023', careerTitles: 0, bestFinish: '4th (530 pts)' },
  { driverId: 'stroll', code: 'STR', forename: 'Lance', surname: 'Stroll', fullName: 'Lance Stroll', nationality: 'Canadian', permanentNumber: 18, primaryConstructor: 'aston_martin', activeYears: '2017-2023', careerTitles: 0, bestFinish: '3rd (3 podiums)' },
  { driverId: 'albon', code: 'ALB', forename: 'Alexander', surname: 'Albon', fullName: 'Alex Albon', nationality: 'Thai', permanentNumber: 23, primaryConstructor: 'williams', activeYears: '2019-2023', careerTitles: 0, bestFinish: '3rd (2 podiums)' },
  { driverId: 'tsunoda', code: 'TSU', forename: 'Yuki', surname: 'Tsunoda', fullName: 'Yuki Tsunoda', nationality: 'Japanese', permanentNumber: 22, primaryConstructor: 'alphatauri', activeYears: '2021-2023', careerTitles: 0, bestFinish: '4th (61 pts)' },
];

/**
 * Historical Season by Season Constructors Standings (2007-2023, 17 seasons)
 */
export const CONSTRUCTOR_SEASON_TRAJECTORY: SeasonConstructorStanding[] = [
  // 2007 (V8, 17 races)
  { season: 2007, constructorId: 'ferrari', points: 204, position: 1, wins: 9, podiums: 22 },
  { season: 2007, constructorId: 'mclaren', points: 0, position: 2, wins: 8, podiums: 24 },
  { season: 2007, constructorId: 'red_bull', points: 24, position: 5, wins: 0, podiums: 1 },
  { season: 2007, constructorId: 'alpine', points: 51, position: 3, wins: 0, podiums: 1 },
  { season: 2007, constructorId: 'williams', points: 33, position: 4, wins: 0, podiums: 1 },
  { season: 2007, constructorId: 'mercedes', points: 0, position: 8, wins: 0, podiums: 0 },

  // 2008 (V8, 18 races)
  { season: 2008, constructorId: 'ferrari', points: 172, position: 1, wins: 8, podiums: 19 },
  { season: 2008, constructorId: 'mclaren', points: 151, position: 2, wins: 6, podiums: 13 },
  { season: 2008, constructorId: 'alpine', points: 80, position: 4, wins: 2, podiums: 4 },
  { season: 2008, constructorId: 'red_bull', points: 29, position: 7, wins: 0, podiums: 1 },
  { season: 2008, constructorId: 'alphatauri', points: 39, position: 6, wins: 1, podiums: 1 },
  { season: 2008, constructorId: 'williams', points: 26, position: 8, wins: 0, podiums: 2 },
  { season: 2008, constructorId: 'mercedes', points: 0, position: 9, wins: 0, podiums: 0 },

  // 2009 (Aero shift, 17 races)
  { season: 2009, constructorId: 'red_bull', points: 153.5, position: 2, wins: 6, podiums: 16 },
  { season: 2009, constructorId: 'mclaren', points: 71, position: 3, wins: 2, podiums: 5 },
  { season: 2009, constructorId: 'ferrari', points: 70, position: 4, wins: 1, podiums: 5 },
  { season: 2009, constructorId: 'williams', points: 34.5, position: 7, wins: 0, podiums: 0 },
  { season: 2009, constructorId: 'alpine', points: 26, position: 8, wins: 0, podiums: 1 },
  { season: 2009, constructorId: 'aston_martin', points: 13, position: 9, wins: 0, podiums: 1 },
  { season: 2009, constructorId: 'mercedes', points: 172, position: 1, wins: 8, podiums: 15 },

  // 2010 (25-18-15 scoring adopted, 19 races)
  { season: 2010, constructorId: 'red_bull', points: 498, position: 1, wins: 9, podiums: 20 },
  { season: 2010, constructorId: 'mclaren', points: 454, position: 2, wins: 5, podiums: 16 },
  { season: 2010, constructorId: 'ferrari', points: 396, position: 3, wins: 5, podiums: 15 },
  { season: 2010, constructorId: 'mercedes', points: 214, position: 4, wins: 0, podiums: 3 },
  { season: 2010, constructorId: 'alpine', points: 163, position: 5, wins: 0, podiums: 3 },
  { season: 2010, constructorId: 'williams', points: 69, position: 6, wins: 0, podiums: 0 },
  { season: 2010, constructorId: 'aston_martin', points: 68, position: 7, wins: 0, podiums: 0 },

  // 2011 (19 races)
  { season: 2011, constructorId: 'red_bull', points: 650, position: 1, wins: 12, podiums: 27 },
  { season: 2011, constructorId: 'mclaren', points: 497, position: 2, wins: 6, podiums: 18 },
  { season: 2011, constructorId: 'ferrari', points: 375, position: 3, wins: 1, podiums: 10 },
  { season: 2011, constructorId: 'mercedes', points: 165, position: 4, wins: 0, podiums: 0 },
  { season: 2011, constructorId: 'alpine', points: 73, position: 5, wins: 0, podiums: 2 },
  { season: 2011, constructorId: 'aston_martin', points: 69, position: 6, wins: 0, podiums: 0 },
  { season: 2011, constructorId: 'alfa_romeo', points: 44, position: 7, wins: 0, podiums: 0 },

  // 2012 (20 races)
  { season: 2012, constructorId: 'red_bull', points: 460, position: 1, wins: 7, podiums: 14 },
  { season: 2012, constructorId: 'ferrari', points: 400, position: 2, wins: 3, podiums: 15 },
  { season: 2012, constructorId: 'mclaren', points: 378, position: 3, wins: 7, podiums: 13 },
  { season: 2012, constructorId: 'alpine', points: 303, position: 4, wins: 1, podiums: 10 },
  { season: 2012, constructorId: 'mercedes', points: 142, position: 5, wins: 1, podiums: 3 },
  { season: 2012, constructorId: 'alfa_romeo', points: 126, position: 6, wins: 0, podiums: 4 },
  { season: 2012, constructorId: 'aston_martin', points: 109, position: 7, wins: 0, podiums: 0 },
  { season: 2012, constructorId: 'williams', points: 76, position: 8, wins: 1, podiums: 1 },

  // 2013 (19 races)
  { season: 2013, constructorId: 'red_bull', points: 596, position: 1, wins: 13, podiums: 24 },
  { season: 2013, constructorId: 'mercedes', points: 360, position: 2, wins: 3, podiums: 9 },
  { season: 2013, constructorId: 'ferrari', points: 354, position: 3, wins: 2, podiums: 10 },
  { season: 2013, constructorId: 'alpine', points: 315, position: 4, wins: 1, podiums: 14 },
  { season: 2013, constructorId: 'mclaren', points: 122, position: 5, wins: 0, podiums: 0 },
  { season: 2013, constructorId: 'aston_martin', points: 77, position: 6, wins: 0, podiums: 0 },
  { season: 2013, constructorId: 'alfa_romeo', points: 57, position: 7, wins: 0, podiums: 0 },

  // 2014 (V6 TURBO HYBRID ERA, 19 races)
  { season: 2014, constructorId: 'mercedes', points: 701, position: 1, wins: 16, podiums: 31 },
  { season: 2014, constructorId: 'red_bull', points: 405, position: 2, wins: 3, podiums: 12 },
  { season: 2014, constructorId: 'williams', points: 320, position: 3, wins: 0, podiums: 9 },
  { season: 2014, constructorId: 'ferrari', points: 216, position: 4, wins: 0, podiums: 2 },
  { season: 2014, constructorId: 'mclaren', points: 181, position: 5, wins: 0, podiums: 2 },
  { season: 2014, constructorId: 'aston_martin', points: 155, position: 6, wins: 0, podiums: 1 },
  { season: 2014, constructorId: 'alphatauri', points: 30, position: 7, wins: 0, podiums: 0 },

  // 2015 (19 races)
  { season: 2015, constructorId: 'mercedes', points: 703, position: 1, wins: 16, podiums: 32 },
  { season: 2015, constructorId: 'ferrari', points: 428, position: 2, wins: 3, podiums: 16 },
  { season: 2015, constructorId: 'williams', points: 257, position: 3, wins: 0, podiums: 4 },
  { season: 2015, constructorId: 'red_bull', points: 187, position: 4, wins: 0, podiums: 3 },
  { season: 2015, constructorId: 'aston_martin', points: 136, position: 5, wins: 0, podiums: 1 },
  { season: 2015, constructorId: 'alpine', points: 78, position: 6, wins: 0, podiums: 1 },
  { season: 2015, constructorId: 'alphatauri', points: 67, position: 7, wins: 0, podiums: 0 },
  { season: 2015, constructorId: 'alfa_romeo', points: 36, position: 8, wins: 0, podiums: 0 },
  { season: 2015, constructorId: 'mclaren', points: 27, position: 9, wins: 0, podiums: 0 },

  // 2016 (21 races)
  { season: 2016, constructorId: 'mercedes', points: 765, position: 1, wins: 19, podiums: 33 },
  { season: 2016, constructorId: 'red_bull', points: 468, position: 2, wins: 2, podiums: 16 },
  { season: 2016, constructorId: 'ferrari', points: 398, position: 3, wins: 0, podiums: 17 },
  { season: 2016, constructorId: 'aston_martin', points: 173, position: 4, wins: 0, podiums: 2 },
  { season: 2016, constructorId: 'williams', points: 138, position: 5, wins: 0, podiums: 1 },
  { season: 2016, constructorId: 'mclaren', points: 76, position: 6, wins: 0, podiums: 0 },
  { season: 2016, constructorId: 'alphatauri', points: 63, position: 7, wins: 0, podiums: 0 },
  { season: 2016, constructorId: 'haas', points: 29, position: 8, wins: 0, podiums: 0 },

  // 2017 (20 races)
  { season: 2017, constructorId: 'mercedes', points: 668, position: 1, wins: 12, podiums: 26 },
  { season: 2017, constructorId: 'ferrari', points: 522, position: 2, wins: 5, podiums: 20 },
  { season: 2017, constructorId: 'red_bull', points: 368, position: 3, wins: 3, podiums: 13 },
  { season: 2017, constructorId: 'aston_martin', points: 187, position: 4, wins: 0, podiums: 1 },
  { season: 2017, constructorId: 'williams', points: 83, position: 5, wins: 0, podiums: 1 },
  { season: 2017, constructorId: 'alpine', points: 57, position: 6, wins: 0, podiums: 0 },
  { season: 2017, constructorId: 'alphatauri', points: 53, position: 7, wins: 0, podiums: 0 },
  { season: 2017, constructorId: 'haas', points: 47, position: 8, wins: 0, podiums: 0 },
  { season: 2017, constructorId: 'mclaren', points: 30, position: 9, wins: 0, podiums: 0 },

  // 2018 (21 races)
  { season: 2018, constructorId: 'mercedes', points: 655, position: 1, wins: 11, podiums: 25 },
  { season: 2018, constructorId: 'ferrari', points: 571, position: 2, wins: 6, podiums: 24 },
  { season: 2018, constructorId: 'red_bull', points: 419, position: 3, wins: 4, podiums: 13 },
  { season: 2018, constructorId: 'alpine', points: 122, position: 4, wins: 0, podiums: 0 },
  { season: 2018, constructorId: 'haas', points: 93, position: 5, wins: 0, podiums: 0 },
  { season: 2018, constructorId: 'mclaren', points: 62, position: 6, wins: 0, podiums: 0 },
  { season: 2018, constructorId: 'aston_martin', points: 52, position: 7, wins: 0, podiums: 1 },
  { season: 2018, constructorId: 'alfa_romeo', points: 48, position: 8, wins: 0, podiums: 0 },
  { season: 2018, constructorId: 'alphatauri', points: 33, position: 9, wins: 0, podiums: 0 },

  // 2019 (21 races)
  { season: 2019, constructorId: 'mercedes', points: 739, position: 1, wins: 15, podiums: 32 },
  { season: 2019, constructorId: 'ferrari', points: 504, position: 2, wins: 3, podiums: 19 },
  { season: 2019, constructorId: 'red_bull', points: 417, position: 3, wins: 3, podiums: 9 },
  { season: 2019, constructorId: 'mclaren', points: 145, position: 4, wins: 0, podiums: 1 },
  { season: 2019, constructorId: 'alpine', points: 91, position: 5, wins: 0, podiums: 0 },
  { season: 2019, constructorId: 'alphatauri', points: 85, position: 6, wins: 0, podiums: 2 },
  { season: 2019, constructorId: 'aston_martin', points: 73, position: 7, wins: 0, podiums: 0 },
  { season: 2019, constructorId: 'alfa_romeo', points: 57, position: 8, wins: 0, podiums: 0 },
  { season: 2019, constructorId: 'haas', points: 28, position: 9, wins: 0, podiums: 0 },

  // 2020 (17 races)
  { season: 2020, constructorId: 'mercedes', points: 573, position: 1, wins: 13, podiums: 25 },
  { season: 2020, constructorId: 'red_bull', points: 319, position: 2, wins: 2, podiums: 13 },
  { season: 2020, constructorId: 'mclaren', points: 202, position: 3, wins: 0, podiums: 2 },
  { season: 2020, constructorId: 'aston_martin', points: 195, position: 4, wins: 1, podiums: 4 },
  { season: 2020, constructorId: 'alpine', points: 181, position: 5, wins: 0, podiums: 3 },
  { season: 2020, constructorId: 'ferrari', points: 131, position: 6, wins: 0, podiums: 3 },
  { season: 2020, constructorId: 'alphatauri', points: 107, position: 7, wins: 1, podiums: 1 },
  { season: 2020, constructorId: 'alfa_romeo', points: 8, position: 8, wins: 0, podiums: 0 },
  { season: 2020, constructorId: 'haas', points: 3, position: 9, wins: 0, podiums: 0 },

  // 2021 (22 races)
  { season: 2021, constructorId: 'mercedes', points: 613.5, position: 1, wins: 9, podiums: 28 },
  { season: 2021, constructorId: 'red_bull', points: 585.5, position: 2, wins: 11, podiums: 23 },
  { season: 2021, constructorId: 'ferrari', points: 323.5, position: 3, wins: 0, podiums: 5 },
  { season: 2021, constructorId: 'mclaren', points: 275, position: 4, wins: 1, podiums: 5 },
  { season: 2021, constructorId: 'alpine', points: 155, position: 5, wins: 1, podiums: 2 },
  { season: 2021, constructorId: 'alphatauri', points: 142, position: 6, wins: 0, podiums: 1 },
  { season: 2021, constructorId: 'aston_martin', points: 77, position: 7, wins: 0, podiums: 1 },
  { season: 2021, constructorId: 'williams', points: 23, position: 8, wins: 0, podiums: 1 },
  { season: 2021, constructorId: 'alfa_romeo', points: 13, position: 9, wins: 0, podiums: 0 },

  // 2022 (GROUND EFFECT ERA, 22 races)
  { season: 2022, constructorId: 'red_bull', points: 759, position: 1, wins: 17, podiums: 28 },
  { season: 2022, constructorId: 'ferrari', points: 554, position: 2, wins: 4, podiums: 20 },
  { season: 2022, constructorId: 'mercedes', points: 515, position: 3, wins: 1, podiums: 17 },
  { season: 2022, constructorId: 'alpine', points: 173, position: 4, wins: 0, podiums: 0 },
  { season: 2022, constructorId: 'mclaren', points: 159, position: 5, wins: 0, podiums: 1 },
  { season: 2022, constructorId: 'alfa_romeo', points: 55, position: 6, wins: 0, podiums: 0 },
  { season: 2022, constructorId: 'aston_martin', points: 55, position: 7, wins: 0, podiums: 0 },
  { season: 2022, constructorId: 'haas', points: 37, position: 8, wins: 0, podiums: 0 },
  { season: 2022, constructorId: 'alphatauri', points: 35, position: 9, wins: 0, podiums: 0 },
  { season: 2022, constructorId: 'williams', points: 8, position: 10, wins: 0, podiums: 0 },

  // 2023 (22 races)
  { season: 2023, constructorId: 'red_bull', points: 860, position: 1, wins: 21, podiums: 30 },
  { season: 2023, constructorId: 'mercedes', points: 409, position: 2, wins: 0, podiums: 8 },
  { season: 2023, constructorId: 'ferrari', points: 406, position: 3, wins: 1, podiums: 9 },
  { season: 2023, constructorId: 'mclaren', points: 302, position: 4, wins: 0, podiums: 9 },
  { season: 2023, constructorId: 'aston_martin', points: 280, position: 5, wins: 0, podiums: 8 },
  { season: 2023, constructorId: 'alpine', points: 120, position: 6, wins: 0, podiums: 2 },
  { season: 2023, constructorId: 'williams', points: 28, position: 7, wins: 0, podiums: 0 },
  { season: 2023, constructorId: 'alphatauri', points: 25, position: 8, wins: 0, podiums: 0 },
  { season: 2023, constructorId: 'alfa_romeo', points: 16, position: 9, wins: 0, podiums: 0 },
  { season: 2023, constructorId: 'haas', points: 12, position: 10, wins: 0, podiums: 0 },
];

/**
 * Driver Career Aggregates across the 17-season dataset period (2007-2023)
 */
export const DRIVER_AGGREGATES: DriverAggregate[] = [
  { driverId: 'hamilton', fullName: 'Lewis Hamilton', code: 'HAM', nationality: 'British', permanentNumber: 44, primaryConstructor: 'mercedes', totalPoints: 4639.5, raceStarts: 332, wins: 103, podiums: 197, dnfs: 31, completionRate: 90.66, avgGrid: 3.2, avgFinish: 3.9, pointsPerRace: 13.97, careerTitles: 7 },
  { driverId: 'vettel', fullName: 'Sebastian Vettel', code: 'VET', nationality: 'German', permanentNumber: 5, primaryConstructor: 'red_bull', totalPoints: 3098, raceStarts: 299, wins: 53, podiums: 122, dnfs: 44, completionRate: 85.28, avgGrid: 4.8, avgFinish: 5.7, pointsPerRace: 10.36, careerTitles: 4 },
  { driverId: 'verstappen', fullName: 'Max Verstappen', code: 'VER', nationality: 'Dutch', permanentNumber: 1, primaryConstructor: 'red_bull', totalPoints: 2586.5, raceStarts: 185, wins: 54, podiums: 98, dnfs: 31, completionRate: 83.24, avgGrid: 4.1, avgFinish: 4.6, pointsPerRace: 13.98, careerTitles: 3 },
  { driverId: 'alonso', fullName: 'Fernando Alonso', code: 'ALO', nationality: 'Spanish', permanentNumber: 14, primaryConstructor: 'alpine', totalPoints: 2267, raceStarts: 298, wins: 17, podiums: 67, dnfs: 49, completionRate: 83.56, avgGrid: 6.9, avgFinish: 6.8, pointsPerRace: 7.61, careerTitles: 2 },
  { driverId: 'bottas', fullName: 'Valtteri Bottas', code: 'BOT', nationality: 'Finnish', permanentNumber: 77, primaryConstructor: 'mercedes', totalPoints: 1797, raceStarts: 222, wins: 10, podiums: 67, dnfs: 28, completionRate: 87.39, avgGrid: 6.8, avgFinish: 7.2, pointsPerRace: 8.09, careerTitles: 0 },
  { driverId: 'rosberg', fullName: 'Nico Rosberg', code: 'ROS', nationality: 'German', permanentNumber: 6, primaryConstructor: 'mercedes', totalPoints: 1594.5, raceStarts: 206, wins: 23, podiums: 57, dnfs: 33, completionRate: 83.98, avgGrid: 5.4, avgFinish: 6.4, pointsPerRace: 7.74, careerTitles: 1 },
  { driverId: 'raikkonen', fullName: 'Kimi Räikkönen', code: 'RAI', nationality: 'Finnish', permanentNumber: 7, primaryConstructor: 'ferrari', totalPoints: 1515, raceStarts: 247, wins: 12, podiums: 67, dnfs: 41, completionRate: 83.40, avgGrid: 7.6, avgFinish: 7.3, pointsPerRace: 6.13, careerTitles: 1 },
  { driverId: 'perez', fullName: 'Sergio Perez', code: 'PER', nationality: 'Mexican', permanentNumber: 11, primaryConstructor: 'red_bull', totalPoints: 1486, raceStarts: 257, wins: 6, podiums: 35, dnfs: 34, completionRate: 86.77, avgGrid: 9.3, avgFinish: 8.4, pointsPerRace: 5.78, careerTitles: 0 },
  { driverId: 'ricciardo', fullName: 'Daniel Ricciardo', code: 'RIC', nationality: 'Australian', permanentNumber: 3, primaryConstructor: 'red_bull', totalPoints: 1317, raceStarts: 239, wins: 8, podiums: 32, dnfs: 38, completionRate: 84.10, avgGrid: 8.7, avgFinish: 8.2, pointsPerRace: 5.51, careerTitles: 0 },
  { driverId: 'button', fullName: 'Jenson Button', code: 'BUT', nationality: 'British', permanentNumber: 22, primaryConstructor: 'mclaren', totalPoints: 1060.5, raceStarts: 191, wins: 14, podiums: 34, dnfs: 27, completionRate: 85.86, avgGrid: 8.1, avgFinish: 7.8, pointsPerRace: 5.55, careerTitles: 1 },
  { driverId: 'leclerc', fullName: 'Charles Leclerc', code: 'LEC', nationality: 'Monegasque', permanentNumber: 16, primaryConstructor: 'ferrari', totalPoints: 1074, raceStarts: 123, wins: 5, podiums: 30, dnfs: 20, completionRate: 83.74, avgGrid: 4.6, avgFinish: 6.2, pointsPerRace: 8.73, careerTitles: 0 },
  { driverId: 'webber', fullName: 'Mark Webber', code: 'WEB', nationality: 'Australian', permanentNumber: 2, primaryConstructor: 'red_bull', totalPoints: 978.5, raceStarts: 129, wins: 9, podiums: 41, dnfs: 22, completionRate: 82.95, avgGrid: 5.1, avgFinish: 6.1, pointsPerRace: 7.59, careerTitles: 0 },
  { driverId: 'massa', fullName: 'Felipe Massa', code: 'MAS', nationality: 'Brazilian', permanentNumber: 19, primaryConstructor: 'ferrari', totalPoints: 969, raceStarts: 197, wins: 9, podiums: 31, dnfs: 32, completionRate: 83.76, avgGrid: 7.2, avgFinish: 7.9, pointsPerRace: 4.92, careerTitles: 0 },
  { driverId: 'sainz', fullName: 'Carlos Sainz', code: 'SAI', nationality: 'Spanish', permanentNumber: 55, primaryConstructor: 'ferrari', totalPoints: 982.5, raceStarts: 183, wins: 2, podiums: 18, dnfs: 33, completionRate: 81.97, avgGrid: 8.4, avgFinish: 8.1, pointsPerRace: 5.37, careerTitles: 0 },
  { driverId: 'norris', fullName: 'Lando Norris', code: 'NOR', nationality: 'British', permanentNumber: 4, primaryConstructor: 'mclaren', totalPoints: 633, raceStarts: 104, wins: 0, podiums: 13, dnfs: 11, completionRate: 89.42, avgGrid: 7.8, avgFinish: 8.2, pointsPerRace: 6.09, careerTitles: 0 },
  { driverId: 'russell', fullName: 'George Russell', code: 'RUS', nationality: 'British', permanentNumber: 63, primaryConstructor: 'mercedes', totalPoints: 469, raceStarts: 104, wins: 1, podiums: 11, dnfs: 14, completionRate: 86.54, avgGrid: 9.1, avgFinish: 9.7, pointsPerRace: 4.51, careerTitles: 0 },
  { driverId: 'gasly', fullName: 'Pierre Gasly', code: 'GAS', nationality: 'French', permanentNumber: 10, primaryConstructor: 'alpine', totalPoints: 394, raceStarts: 130, wins: 1, podiums: 4, dnfs: 19, completionRate: 85.38, avgGrid: 10.2, avgFinish: 10.4, pointsPerRace: 3.03, careerTitles: 0 },
  { driverId: 'ocon', fullName: 'Esteban Ocon', code: 'OCO', nationality: 'French', permanentNumber: 31, primaryConstructor: 'alpine', totalPoints: 422, raceStarts: 133, wins: 1, podiums: 3, dnfs: 18, completionRate: 86.47, avgGrid: 10.4, avgFinish: 10.6, pointsPerRace: 3.17, careerTitles: 0 },
  { driverId: 'hulkenberg', code: 'HUL', fullName: 'Nico Hülkenberg', code_prop: 'HUL', nationality: 'German', permanentNumber: 27, primaryConstructor: 'haas', totalPoints: 530, raceStarts: 203, wins: 0, podiums: 0, dnfs: 39, completionRate: 80.79, avgGrid: 10.6, avgFinish: 11.2, pointsPerRace: 2.61, careerTitles: 0 },
  { driverId: 'stroll', code: 'STR', fullName: 'Lance Stroll', nationality: 'Canadian', permanentNumber: 18, primaryConstructor: 'aston_martin', totalPoints: 268, raceStarts: 143, wins: 0, podiums: 3, dnfs: 27, completionRate: 81.12, avgGrid: 13.1, avgFinish: 12.3, pointsPerRace: 1.87, careerTitles: 0 },
  { driverId: 'albon', code: 'ALB', fullName: 'Alexander Albon', nationality: 'Thai', permanentNumber: 23, primaryConstructor: 'williams', totalPoints: 228, raceStarts: 81, wins: 0, podiums: 2, dnfs: 10, completionRate: 87.65, avgGrid: 11.5, avgFinish: 11.1, pointsPerRace: 2.81, careerTitles: 0 },
  { driverId: 'tsunoda', code: 'TSU', fullName: 'Yuki Tsunoda', nationality: 'Japanese', permanentNumber: 22, primaryConstructor: 'alphatauri', totalPoints: 61, raceStarts: 63, wins: 0, podiums: 0, dnfs: 11, completionRate: 82.54, avgGrid: 13.2, avgFinish: 12.8, pointsPerRace: 0.97, careerTitles: 0 },
];

/**
 * Constructor Cumulative & Aggregates across the 17 seasons
 */
export const CONSTRUCTOR_AGGREGATES: ConstructorAggregate[] = [
  { constructorId: 'mercedes', name: 'Mercedes-AMG', color: '#00A19B', nationality: 'German', totalPoints: 5493.5, totalStarts: 586, wins: 116, podiums: 247, dnfs: 52, completionRate: 91.13, championships: 8 },
  { constructorId: 'red_bull', name: 'Red Bull Racing', color: '#1E41FF', nationality: 'Austrian', totalPoints: 6310, totalStarts: 668, wins: 113, podiums: 236, dnfs: 94, completionRate: 85.93, championships: 6 },
  { constructorId: 'ferrari', name: 'Scuderia Ferrari', color: '#E80020', nationality: 'Italian', totalPoints: 5098.5, totalStarts: 672, wins: 54, podiums: 204, dnfs: 86, completionRate: 87.20, championships: 2 },
  { constructorId: 'mclaren', name: 'McLaren F1 Team', color: '#FF8000', nationality: 'British', totalPoints: 2824.5, totalStarts: 668, wins: 22, podiums: 87, dnfs: 116, completionRate: 82.63, championships: 0 },
  { constructorId: 'alpine', name: 'Alpine / Renault', color: '#0090FF', nationality: 'French', totalPoints: 1779, totalStarts: 634, wins: 5, podiums: 24, dnfs: 132, completionRate: 79.18, championships: 0 },
  { constructorId: 'aston_martin', name: 'Aston Martin / Force India', color: '#006F62', nationality: 'British', totalPoints: 1363, totalStarts: 610, wins: 1, podiums: 18, dnfs: 118, completionRate: 80.66, championships: 0 },
  { constructorId: 'williams', name: 'Williams Racing', color: '#005AFF', nationality: 'British', totalPoints: 969.5, totalStarts: 672, wins: 1, podiums: 20, dnfs: 148, completionRate: 77.98, championships: 0 },
  { constructorId: 'alphatauri', name: 'AlphaTauri / Toro Rosso', color: '#2B4562', nationality: 'Italian', totalPoints: 730, totalStarts: 672, wins: 2, podiums: 5, dnfs: 172, completionRate: 74.40, championships: 0 },
  { constructorId: 'alfa_romeo', name: 'Alfa Romeo / Sauber', color: '#900000', nationality: 'Swiss', totalPoints: 479, totalStarts: 636, wins: 0, podiums: 4, dnfs: 156, completionRate: 75.47, championships: 0 },
  { constructorId: 'haas', name: 'Haas F1 Team', color: '#B6BABD', nationality: 'American', totalPoints: 249, totalStarts: 334, wins: 0, podiums: 0, dnfs: 82, completionRate: 75.45, championships: 0 },
];

/**
 * 17-Season DNF Breakdown by Failure Category (Total ~1,075 Non-Finishes across 6,464 entries)
 */
export const RETIREMENT_CATEGORY_DATA = [
  { category: 'Collision/Accident', count: 418, sharePct: 38.88, description: 'Track clashes, spins, barrier impacts, first-lap contacts' },
  { category: 'Engine/PU', count: 236, sharePct: 21.95, description: 'Combustion engine, turbocharger, MGU-K/MGU-H, cooling failure' },
  { category: 'Gearbox', count: 114, sharePct: 10.60, description: 'Transmission seizure, gear selection failure, clutch rupture' },
  { category: 'Electrical', count: 88, sharePct: 8.19, description: 'Battery, wiring harness, sensor failure, ECU reset' },
  { category: 'Suspension', count: 68, sharePct: 6.33, description: 'Wishbone fracture, pushrod collapse, wheel hub failure' },
  { category: 'Hydraulics', count: 64, sharePct: 5.95, description: 'Hydraulic pressure loss, DRS actuator leak, steering pump' },
  { category: 'Brakes', count: 46, sharePct: 4.28, description: 'Brake disc disintegration, brake-by-wire failure, overheat' },
  { category: 'Other Mechanical', count: 27, sharePct: 2.51, description: 'Exhaust crack, throttle pedal jam, fuel pressure' },
  { category: 'Disqualified', count: 9, sharePct: 0.84, description: 'Technical plank wear, fuel flow irregularity, underweight' },
  { category: 'Withdrawn/Other', count: 5, sharePct: 0.47, description: 'Pre-race withdrawal, medical stoppage' },
];

/**
 * Historical Season Reliability Trend (Tracking overall DNF % across epochs)
 */
export const SEASON_RELIABILITY_TREND = [
  { season: 2007, entries: 374, finished: 294, dnfs: 80, dnfRate: 21.39, mechanicalDNFs: 46, accidentDNFs: 34, epoch: 'V8 Era' },
  { season: 2008, entries: 396, finished: 298, dnfs: 98, dnfRate: 24.75, mechanicalDNFs: 54, accidentDNFs: 44, epoch: 'V8 Era' },
  { season: 2009, entries: 340, finished: 279, dnfs: 61, dnfRate: 17.94, mechanicalDNFs: 33, accidentDNFs: 28, epoch: 'V8 Aero Rev' },
  { season: 2010, entries: 456, finished: 351, dnfs: 105, dnfRate: 23.03, mechanicalDNFs: 65, accidentDNFs: 40, epoch: 'V8 New Teams' },
  { season: 2011, entries: 456, finished: 372, dnfs: 84, dnfRate: 18.42, mechanicalDNFs: 50, accidentDNFs: 34, epoch: 'V8 Pirelli Debut' },
  { season: 2012, entries: 480, finished: 396, dnfs: 84, dnfRate: 17.50, mechanicalDNFs: 48, accidentDNFs: 36, epoch: 'V8 Era' },
  { season: 2013, entries: 418, finished: 349, dnfs: 69, dnfRate: 16.51, mechanicalDNFs: 39, accidentDNFs: 30, epoch: 'V8 Final Year' },
  { season: 2014, entries: 418, finished: 326, dnfs: 92, dnfRate: 22.01, mechanicalDNFs: 66, accidentDNFs: 26, epoch: 'V6 Hybrid Debut' },
  { season: 2015, entries: 380, finished: 301, dnfs: 79, dnfRate: 20.79, mechanicalDNFs: 52, accidentDNFs: 27, epoch: 'V6 Turbo Hybrid' },
  { season: 2016, entries: 462, finished: 383, dnfs: 79, dnfRate: 17.10, mechanicalDNFs: 47, accidentDNFs: 32, epoch: 'V6 Turbo Hybrid' },
  { season: 2017, entries: 400, finished: 332, dnfs: 68, dnfRate: 17.00, mechanicalDNFs: 41, accidentDNFs: 27, epoch: 'Wide Aero Gen' },
  { season: 2018, entries: 420, finished: 359, dnfs: 61, dnfRate: 14.52, mechanicalDNFs: 36, accidentDNFs: 25, epoch: 'Halo Debut' },
  { season: 2019, entries: 420, finished: 373, dnfs: 47, dnfRate: 11.19, mechanicalDNFs: 25, accidentDNFs: 22, epoch: 'V6 Mature Era' },
  { season: 2020, entries: 340, finished: 295, dnfs: 45, dnfRate: 13.24, mechanicalDNFs: 27, accidentDNFs: 18, epoch: 'Covid Season' },
  { season: 2021, entries: 440, finished: 389, dnfs: 51, dnfRate: 11.59, mechanicalDNFs: 26, accidentDNFs: 25, epoch: 'Close Title Race' },
  { season: 2022, entries: 440, finished: 374, dnfs: 66, dnfRate: 15.00, mechanicalDNFs: 42, accidentDNFs: 24, epoch: 'Ground Effect Intro' },
  { season: 2023, entries: 440, finished: 387, dnfs: 53, dnfRate: 12.05, mechanicalDNFs: 28, accidentDNFs: 25, epoch: 'Ground Effect Yr 2' },
];

/**
 * Country Grand Prix Hosting Statistics (from 17 seasons)
 */
export interface CountryHostingStat {
  country: string;
  racesHosted: number;
  circuitsCount: number;
  circuitNames: string[];
  firstYear: number;
  lastYear: number;
  primaryCircuit: string;
}

export const COUNTRY_HOSTING_STATS: CountryHostingStat[] = [
  { country: 'Italy', racesHosted: 22, circuitsCount: 3, circuitNames: ['Autodromo Nazionale Monza', 'Autodromo Enzo e Dino Ferrari', 'Mugello Circuit'], firstYear: 2007, lastYear: 2023, primaryCircuit: 'Monza' },
  { country: 'UK', racesHosted: 17, circuitsCount: 1, circuitNames: ['Silverstone Circuit'], firstYear: 2007, lastYear: 2023, primaryCircuit: 'Silverstone' },
  { country: 'Spain', racesHosted: 17, circuitsCount: 1, circuitNames: ['Circuit de Barcelona-Catalunya'], firstYear: 2007, lastYear: 2023, primaryCircuit: 'Barcelona' },
  { country: 'Hungary', racesHosted: 17, circuitsCount: 1, circuitNames: ['Hungaroring'], firstYear: 2007, lastYear: 2023, primaryCircuit: 'Hungaroring' },
  { country: 'Belgium', racesHosted: 17, circuitsCount: 1, circuitNames: ['Circuit de Spa-Francorchamps'], firstYear: 2007, lastYear: 2023, primaryCircuit: 'Spa-Francorchamps' },
  { country: 'Monaco', racesHosted: 16, circuitsCount: 1, circuitNames: ['Circuit de Monaco'], firstYear: 2007, lastYear: 2023, primaryCircuit: 'Monaco' },
  { country: 'Australia', racesHosted: 15, circuitsCount: 1, circuitNames: ['Albert Park Circuit'], firstYear: 2007, lastYear: 2023, primaryCircuit: 'Albert Park' },
  { country: 'Bahrain', racesHosted: 17, circuitsCount: 2, circuitNames: ['Bahrain International Circuit', 'Bahrain International (Outer)'], firstYear: 2007, lastYear: 2023, primaryCircuit: 'Sakhir' },
  { country: 'Japan', racesHosted: 15, circuitsCount: 1, circuitNames: ['Suzuka International Circuit'], firstYear: 2007, lastYear: 2023, primaryCircuit: 'Suzuka' },
  { country: 'Brazil', racesHosted: 16, circuitsCount: 1, circuitNames: ['Autodromo Jose Carlos Pace'], firstYear: 2007, lastYear: 2023, primaryCircuit: 'Interlagos' },
  { country: 'Canada', racesHosted: 14, circuitsCount: 1, circuitNames: ['Circuit Gilles Villeneuve'], firstYear: 2007, lastYear: 2023, primaryCircuit: 'Montreal' },
  { country: 'Singapore', racesHosted: 14, circuitsCount: 1, circuitNames: ['Marina Bay Street Circuit'], firstYear: 2008, lastYear: 2023, primaryCircuit: 'Marina Bay' },
  { country: 'UAE', racesHosted: 15, circuitsCount: 1, circuitNames: ['Yas Marina Circuit'], firstYear: 2009, lastYear: 2023, primaryCircuit: 'Yas Marina' },
  { country: 'China', racesHosted: 13, circuitsCount: 1, circuitNames: ['Shanghai International Circuit'], firstYear: 2007, lastYear: 2019, primaryCircuit: 'Shanghai' },
  { country: 'USA', racesHosted: 15, circuitsCount: 3, circuitNames: ['Circuit of the Americas', 'Miami International Autodrome', 'Las Vegas Strip Circuit'], firstYear: 2012, lastYear: 2023, primaryCircuit: 'COTA' },
  { country: 'Austria', racesHosted: 12, circuitsCount: 1, circuitNames: ['Red Bull Ring'], firstYear: 2014, lastYear: 2023, primaryCircuit: 'Red Bull Ring' },
  { country: 'Mexico', racesHosted: 8, circuitsCount: 1, circuitNames: ['Autodromo Hermanos Rodriguez'], firstYear: 2015, lastYear: 2023, primaryCircuit: 'Mexico City' },
  { country: 'Azerbaijan', racesHosted: 7, circuitsCount: 1, circuitNames: ['Baku City Circuit'], firstYear: 2016, lastYear: 2023, primaryCircuit: 'Baku' },
  { country: 'Germany', racesHosted: 8, circuitsCount: 1, circuitNames: ['Nürburgring'], firstYear: 2007, lastYear: 2020, primaryCircuit: 'Nürburgring' },
  { country: 'Saudi Arabia', racesHosted: 3, circuitsCount: 1, circuitNames: ['Jeddah Corniche Circuit'], firstYear: 2021, lastYear: 2023, primaryCircuit: 'Jeddah' },
  { country: 'Netherlands', racesHosted: 3, circuitsCount: 1, circuitNames: ['Circuit Zandvoort'], firstYear: 2021, lastYear: 2023, primaryCircuit: 'Zandvoort' },
  { country: 'Qatar', racesHosted: 2, circuitsCount: 1, circuitNames: ['Losail International Circuit'], firstYear: 2021, lastYear: 2023, primaryCircuit: 'Lusail' },
  { country: 'Portugal', racesHosted: 2, circuitsCount: 1, circuitNames: ['Autodromo Internacional do Algarve'], firstYear: 2020, lastYear: 2021, primaryCircuit: 'Portimão' },
  { country: 'Turkey', racesHosted: 3, circuitsCount: 1, circuitNames: ['Istanbul Park'], firstYear: 2007, lastYear: 2021, primaryCircuit: 'Istanbul' },
];

/**
 * Podiums by Driver Nationality across 17 seasons
 */
export const PODIUMS_BY_NATIONALITY = [
  { nationality: 'British', podiums: 255, driversCount: 4, topDriver: 'Lewis Hamilton (197)' },
  { nationality: 'German', podiums: 202, driversCount: 3, topDriver: 'Sebastian Vettel (122)' },
  { nationality: 'Finnish', podiums: 134, driversCount: 2, topDriver: 'Valtteri Bottas (67)' },
  { nationality: 'Dutch', podiums: 98, driversCount: 1, topDriver: 'Max Verstappen (98)' },
  { nationality: 'Spanish', podiums: 85, driversCount: 2, topDriver: 'Fernando Alonso (67)' },
  { nationality: 'Australian', podiums: 73, driversCount: 2, topDriver: 'Mark Webber (41)' },
  { nationality: 'Mexican', podiums: 35, driversCount: 1, topDriver: 'Sergio Perez (35)' },
  { nationality: 'Brazilian', podiums: 31, driversCount: 1, topDriver: 'Felipe Massa (31)' },
  { nationality: 'Monegasque', podiums: 30, driversCount: 1, topDriver: 'Charles Leclerc (30)' },
  { nationality: 'French', podiums: 7, driversCount: 2, topDriver: 'Pierre Gasly (4)' },
  { nationality: 'Canadian', podiums: 3, driversCount: 1, topDriver: 'Lance Stroll (3)' },
  { nationality: 'Thai', podiums: 2, driversCount: 1, topDriver: 'Alexander Albon (2)' },
];

/**
 * Tyre Compound Strategy Empirical Analysis
 */
export const TYRE_COMPOUND_SPECS: TyreCompoundData[] = [
  {
    compound: 'Soft',
    color: '#FF2A4D',
    label: 'Soft (C4 - C5)',
    typicalStintLaps: 16,
    paceDeltaSec: 0.00,
    degPerLapSec: 0.125,
    optimalTempRangeC: '90°C - 105°C',
    circuitSuitability: 'Low tire stress, qualifying pace, high mechanical grip (e.g. Monaco, Baku)',
    totalLapsSampled: 48210,
    winRatePct: 41.2,
    podiumRatePct: 38.5,
    avgFinishingPos: 6.2,
  },
  {
    compound: 'Medium',
    color: '#FFC800',
    label: 'Medium (C2 - C3)',
    typicalStintLaps: 26,
    paceDeltaSec: 0.45,
    degPerLapSec: 0.065,
    optimalTempRangeC: '100°C - 115°C',
    circuitSuitability: 'Balanced endurance/grip, primary race stint tyre on 85% of circuits',
    totalLapsSampled: 74650,
    winRatePct: 48.7,
    podiumRatePct: 46.1,
    avgFinishingPos: 5.4,
  },
  {
    compound: 'Hard',
    color: '#F0F0F0',
    label: 'Hard (C0 - C1)',
    typicalStintLaps: 38,
    paceDeltaSec: 1.05,
    degPerLapSec: 0.032,
    optimalTempRangeC: '110°C - 125°C',
    circuitSuitability: 'High lateral energy, heavy abrasion (Silverstone, Suzuka, Barcelona, Spa)',
    totalLapsSampled: 62410,
    winRatePct: 35.8,
    podiumRatePct: 39.2,
    avgFinishingPos: 7.1,
  },
  {
    compound: 'Intermediate',
    color: '#39B54A',
    label: 'Intermediate (Green)',
    typicalStintLaps: 22,
    paceDeltaSec: 6.80,
    degPerLapSec: 0.180,
    optimalTempRangeC: '70°C - 90°C',
    circuitSuitability: 'Damp/drying track, standing water < 2mm (Spa, Interlagos, Silverstone, Turkey)',
    totalLapsSampled: 9420,
    winRatePct: 18.5,
    podiumRatePct: 22.0,
    avgFinishingPos: 8.9,
  },
  {
    compound: 'Wet',
    color: '#00A0E2',
    label: 'Full Wet (Blue)',
    typicalStintLaps: 18,
    paceDeltaSec: 11.20,
    degPerLapSec: 0.220,
    optimalTempRangeC: '60°C - 80°C',
    circuitSuitability: 'Heavy torrential rain, extreme aquaplaning risk, disperses 85L water/sec',
    totalLapsSampled: 3120,
    winRatePct: 12.0,
    podiumRatePct: 15.5,
    avgFinishingPos: 9.8,
  },
];

/**
 * Total Raw Dataset Constants (Verifying 6,464 race entries across 17 seasons)
 */
export const DATASET_METRICS = {
  totalRecords: 6464,
  totalSeasons: 17,
  seasonRange: '2007 - 2023',
  totalRaces: 334,
  totalDrivers: 84,
  totalConstructors: 26,
  totalPodiumFinishes: 1002,
  totalChampionshipPointsAwarded: 63100,
  overallCompletionRate: 83.37,
  overallDNFRate: 16.63,
  totalCircuits: CIRCUITS_DATA.length,
};
