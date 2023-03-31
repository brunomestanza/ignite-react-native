import { getPlayersByGroup } from "./getPlayersByGroup";

export async function getPlayersByGroupAndTeam(group: string, team: string) {
  try {
    const storage = await getPlayersByGroup(group);
    const players = storage.filter((player) => player.team === team);

    return players;
  } catch (error) {
    throw error;
  }
}