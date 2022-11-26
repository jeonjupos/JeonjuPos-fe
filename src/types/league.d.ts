import {
  DefaultGameResponse, DetailLeagueResponse,
  LeagueCreateRequest,
  LeaguePlayPlayType,
  LeagueResponseStateTag,
  LeagueUpdateRewardRequest,
  LikesCountResponse,
  LotteryRewardDto,
  NominationRewardDto,
  RewardPrizeMoney,
  RewardPrizeMoneyCurrency,
  UserPlatformResponsePlatform,
} from '@/api/generated/TournamentApi';

export interface LeagueSearchParams {
  size?: number;
  cursor?: number;
  gameId?: string;
  title?: string;
  titleOrNickname?: string;
  playType?: LeaguePlayPlayType | 'all';
  nickname?: string;
  stateTag?: LeagueResponseStateTag | 'all';
  order?: string;
  arenaPlace?: string;
}

export interface LeagueUpdateRewardRequestParam extends LeagueUpdateRewardRequest {
  rewards: (LotteryRewardType | NominationRewardType)[];
}

export interface RewardPrizeMoneyType extends RewardPrizeMoney {
  amount?: number | '' | null;
  currency: RewardPrizeMoneyCurrency;
}

export interface NominationRewardType extends NominationRewardDto {
  prizeMoney: RewardPrizeMoneyType
}

export interface LotteryRewardType extends LotteryRewardDto {
  prizeMoney: RewardPrizeMoneyType;
}

export interface LeagueCreateParams extends LeagueCreateRequest {
  maxApplyCount: number | '';
}

export interface LeagueInfo extends DetailLeagueResponse {
  likes: LikesCountResponse & { userId?: string };
  game: DefaultGameResponse & { code: UserPlatformResponsePlatform }
}
