import { DetailPartyResponseState } from '@/api/generated/TournamentApi';

export interface PartySearchParams {
  size?: number;
  cursor?: number;
  order?: string;
  gameId?: string;
  leagueId?: string;
  name?: string;
  state?: DetailPartyResponseState;
  userId?: string;
}
