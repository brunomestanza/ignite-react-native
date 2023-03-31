import AsyncStorage from "@react-native-async-storage/async-storage";
import { getPlayersByGroupAndTeam } from "./getPlayersByGroupAndTeam";
import { PLAYERS_COLLECTION } from "@storage/storageConfig";

export async function deletePlayerByGroup(playerName: string, group: string, team: string) {
  try {
    const storedPlayers = await getPlayersByGroupAndTeam(group, team);
    const filteredStoredData = storedPlayers.filter((player) => player.name !== playerName);
    const formattedPlayers = JSON.stringify(filteredStoredData);

    await AsyncStorage.setItem(`${PLAYERS_COLLECTION}-${group}`, formattedPlayers);
  } catch (error) {
    throw error;
  }
}