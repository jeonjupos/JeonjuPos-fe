import { LeagueResponseStateTag } from '@/api/generated/TournamentApi';

export type StatusDataType = {
  [key in LeagueResponseStateTag]: {
    id: string;
    order: {
      league: number;
      tournament: number;
    },
    color: string;
    name: {
      league: string;
      tournament: string;
    },
    notShow?: boolean;
  };
};

export interface TournamentInfo {
  thumbnailUrl: string;
  gameId: string;
  title: string;
  status: StatusList;
}
