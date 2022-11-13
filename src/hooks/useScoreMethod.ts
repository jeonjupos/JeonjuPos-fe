import { useCallback, useState } from 'react';
import {
  LeagueLolMissionsCommonScoreSheet,
  LeagueLolMissionsScoreSheetMission,
  LeagueLolMissionsScoreSheetResponse,
} from '@/api/generated/TournamentApi';
import useService from '@/hooks/useService';
import { LeagueInfo } from '@/types/league';

type MissionScoreSheetResponse = LeagueLolMissionsScoreSheetResponse;

export const useLeagueScoreMethod = (gameCode: string) => {
  const code = gameCode.toLowerCase();

  const { league } = useService();

  const getScoreMethod = useCallback(async (leagueInfo: LeagueInfo) => {
    const { common, missions: allMissions } = await league.getLeagueScoreMethod(code);

    const missions = allMissions.filter(m => leagueInfo.scoreMethod?.missions.includes(m.type));
    return { common, missions };
  }, [league]);

  const getAllScoreMethod = useCallback(async () => {
    const { common, missions: allMissions } = await league.getLeagueScoreMethod(code);
    const sortMissions = allMissions.reduce((acc, cur) => {
      const { type, queues, maps, ...obj } = cur;
      return ({ ...acc, ...obj });
    }, {});

    return { common, missions: sortMissions };
  }, []);
};
