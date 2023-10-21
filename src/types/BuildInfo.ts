import { BuildInfo, BuildType } from "./Build";

export const BuildInfos: Map<BuildType, BuildInfo> = new Map()
BuildInfos.set(BuildType.Camp, new BuildInfo("Camp can increase soldier capacity", "Add 100 Soldier Capacity", 200, 100, 100))
BuildInfos.set(BuildType.Farmland, new BuildInfo("Farmland can generate food", "100 Food/Hour", 100, 100, 100))
BuildInfos.set(BuildType.GoldMine, new BuildInfo("GoldMine can mining gold. Should build next to gold.", "20 Gold/Hour", 200, 200, 100))
BuildInfos.set(BuildType.IronMine, new BuildInfo("IronMine can mining iron. Should build next to iron.", "20 Iron/Hour", 200, 200, 100))
BuildInfos.set(BuildType.Fort, new BuildInfo("You can send troop from Fort and Base. Available when Base level >= 2.", "20 Iron/Hour", 200, 200, 100))