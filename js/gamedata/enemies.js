function EnemyDetail(id, name, size, spriteidx, cursorinfo, health, atk, def, fieldheight, fieldwidth, boss, seasonDistribution, atkType, args, drops, addtl) {
    this.id = id;
	this.name = name;
    this.health = GetEnemyHealthMult(health);
	this.maxhealth = this.health;
    this.atk = atk;
	this.baseatk = atk;
    this.def = def;
	this.basedef = def;
    this.cursorinfo = cursorinfo;
    this.fieldheight = fieldheight;
    this.fieldwidth = fieldwidth;
    this.size = size;
    this.spriteidx = spriteidx;
    this.stickTurns = 0;
    this.seasonDistribution = seasonDistribution;
    this.attackType = atkType;
	this.args = (args || "").split(",");
	if(player.noFunDiffMod !== 0) { AdjustEnemyStats(this, player.noFunDiffMod); }
	this.exp = Math.ceil(health/10 + atk + def/2);
    if(this.name === "Discussly" || this.name.indexOf("beeQueen") === 0) { this.exp = 0; }
    this.drops = drops;
	this.boss = boss;
	if(this.boss) { this.exp = Math.floor(this.exp * 2.5); }
    if(addtl !== undefined) { for(const key in addtl) { this[key] = addtl[key]; } }
	this.GetRandomArg = function() { return RandomArrayItem(this.args); };
}
function AdjustEnemyStats(enemy, diff) {
	if(diff === 0) { return; }
	if(diff > 0) { // make strongker
		while(diff-- > 0) {
			enemy.maxhealth *= 1.75;
			enemy.baseatk *= 1.5;
			enemy.basedef *= 1.5;
		}
		enemy.maxhealth = Math.round(enemy.maxhealth);
		enemy.health = enemy.maxhealth;
		enemy.baseatk = Math.round(enemy.baseatk);
		enemy.atk = enemy.baseatk;
		enemy.basedef = Math.round(enemy.basedef);
		enemy.def = enemy.basedef;
	} else { // make weakger
		while(diff++ < 0) {
			enemy.maxhealth *= 0.5;
			enemy.baseatk *= 0.75;
			enemy.basedef *= 0.75;
		}
		enemy.maxhealth = Math.max(5, Math.round(enemy.maxhealth));
		enemy.health = enemy.maxhealth;
		enemy.baseatk = Math.max(1, Math.round(enemy.baseatk));
		enemy.atk = enemy.baseatk;
		enemy.basedef = Math.max(1, Math.round(enemy.basedef));
		enemy.def = enemy.basedef;
	}
}
function GetDisplayName(enemyname, max) { return GetText("e." + enemyname + Math.floor(Math.random() * max)); }
function GetEnemy(name) {
    switch(name) {
		/* Intro */
		case "Discussly": return new EnemyDetail(name, GetDisplayName(name, 1), "sm", [0, 0], { dx: 0.3, dy: -1.25, w: -0.1, h: 0.25 }, 10, 1, 1, 3, 2, false, [0, 0, 1, 0], "tutorial", "", [], { rotClearChance: 0, stickRes: 1, sound: "metal" });
		/* Farm */
		case "robo": return new EnemyDetail(name, GetDisplayName(name, 1), "sm", [0, 6], { dx: 0.25, dy: -1.25, w: 0, h: 0.25 }, 20, 1, 1, 3, 1, false, [0, 0, 1, 0], "basic", "battery", [ { money: true, min: 5, max: 10 }, { seed: "spinach", min: 0, max: 2 }, { seed: "beet", min: 0, max: 2 } ], { rotClearChance: 0, stickRes: 0, killKey: "kill_robot_sing", sound: "metal" });
		case "bigBot": return new EnemyDetail(name, GetDisplayName(name, 1), "lg", [0, 0], { dx: 0, dy: -2.5, w: 1, h: 1.5 }, 100, 6, 3, 3, 3, true, [0, 0, 1, 0], "boss1", "0,1,2", [ { money: true, min: 60, max: 60 }, { seed: "radish", min: 5, max: 5 }, { seed: "apple", min: 4, max: 4 }, { seed: "grapes", min: 3, max: 3 } ], { rotClearChance: 0, stickRes: 0, killKey: "kill_robot_sing", sound: "metal" });
		/* Research Lab */
		case "robo2": return new EnemyDetail(name, GetDisplayName(name, 1), "sm", [3, 6], { dx: 0.25, dy: -1.25, w: 0, h: 0.25 }, 50, 2, 3, 3, 2, false, [0, 1, 1, 0], "basic", "battery", [ { money: true, min: 30, max: 50 }, { seed: "carrot", min: 0, max: 1 }, { seed: "tomato", min: 0, max: 4 } ], { rotClearChance: 0, stickRes: 0, sound: "metal" });
		case "robo3": return new EnemyDetail(name, GetDisplayName(name, 1), "md", [4, 6], { dx: 0, dy: -1.9, w: 0.5, h: 0.9 }, 70, 3, 3, 3, 2, false, [0, 1, 1, 0], "basic", "battery", [ { money: true, min: 40, max: 60 }, { seed: "battery", min: 2, max: 4 }, { seed: "tomato", min: 0, max: 1 } ], { rotClearChance: 0, stickRes: 0, killKey: "kill_robot_sing", sound: "metal" });
		case "ScienceMan": return new EnemyDetail(name, GetDisplayName(name, 1), "md", [4, 0], { dx: 0.25, dy: -1.55, w: 0, h: 0.6 }, 300, 1, 7, 3, 3, true, [0, 1, 0, 0], "boss2", "battery,battery,robobabby,robobabby,drone", [ { money: true, min: 600, max: 600 }, { seed: "apple", min: 5, max: 5 }, { seed: "battery", min: 8, max: 8 } ], { soleKill: true, rotClearChance: 0, stickRes: 0, killKey: "kill_livinghe_sing", sound: "human" });
		/* Forest */
		case "mouse": return new EnemyDetail(name, GetDisplayName(name, 1), "sm", [1, 0], { dx: 0.25, dy: -0.95, w: 0, h: -0.05 }, 20, 4, 1, 1, 1, false, [1, 1, 0, 1], "slap", "", [ { money: true, min: 20, max: 30 }, { seed: "fodder", min: 0, max: 2 }, { seed: "rice", min: 0, max: 1 } ], { tile: "dirt", rotClearChance: 0, stickRes: 0, killKey: "kill_livingthey_sing", sound: "furry" });
		case "sqorl": return new EnemyDetail(name, GetDisplayName(name, 1), "sm", [1, 6], { dx: 0.25, dy: -1.15, w: 0, h: 0.15 }, 50, 5, 2, 2, 2, false, [0, 1, 1, 0], "basic", "acorn", [ { money: true, min: 40, max: 50 }, { seed: "chestnut", min: 0, max: 2 }, { seed: "milkcap", min: 0, max: 2 }, { seed: "portobello", min: 0, max: 1 } ], { tile: "dirt", rotClearChance: 0, stickRes: 0, killKey: "kill_livingthey_sing", sound: "furry" });
		case "bear": return new EnemyDetail(name, GetDisplayName(name, 1), "md", [2, 0], { dx: 0, dy: -1.9, w: 0.5, h: 0.9 }, 150, 10, 2, 4, 2, true, [1, 1, 1, 0], "bear", "blackberry", [ { money: true, min: 100, max: 100 }, { seed: "blackberry", min: 4, max: 4 }, { seed: "beeB", min: 5, max: 5 }, { seed: "goodrod", min: 3, max: 3 } ], { tile: "dirt", rotClearChance: 0, stickRes: 0, killKey: "kill_livingthey_sing", sound: "furry" });
		case "turky": return new EnemyDetail(name, GetDisplayName(name, 1), "md", [3, 0], { dx: 0, dy: -1.85, w: 0.5, h: 0.85 }, 80, 10, 4, 1, 1, false, [0, 0, 1, 0], "turky", "turkey", [ { money: true, min: 30, max: 40 }, { seed: "turkey", min: 0, max: 1 } ], { tile: "_coop", rotClearChance: 0, stickRes: 0, killKey: "kill_livingthey_sing", sound: "furry" });
		case "bossturky": return new EnemyDetail(name, GetDisplayName(name, 1), "md", [3, 0], { dx: 0, dy: -1.85, w: 0.5, h: 0.85 }, 120, 12, 5, 2, 1, true, [0, 0, 1, 0], "turky", "turkey", [ { money: true, min: 120, max: 120 }, { seed: "turkey", min: 6, max: 6 }, { seed: "fodder", min: 2, max: 2 } ], { tile: "_coop", rotClearChance: 0, stickRes: 0, killKey: "kill_livingthey_sing", sound: "furry" });
		/* Bridge */
		case "Worker": return new EnemyDetail(name, GetDisplayName(name, 4), "md", [5, 0], { dx: 0.25, dy: -1.25, w: 0, h: 0.25 }, 200, 15, 5, 2, 2, false, [1, 0, 1, 0], "construction", "", [ { money: true, min: 100, max: 300 }, { seed: "banana", min: 0, max: 4 }, { seed: "printer", min: 0, max: 1 }, { seed: "coffee", min: 0, max: 1 } ], { rotClearChance: 0.2, stickRes: 0.1, killKey: "kill_livinghe_sing", sound: "human" });
		case "BossWorker": return new EnemyDetail(name, GetDisplayName(name, 1), "md", [6, 0], { dx: 0.25, dy: -1.25, w: 0, h: 0.25 }, 400, 25, 8, 2, 2, true, [1, 0, 1, 0], "constrboss", "", [ { money: true, min: 500, max: 500 }, { seed: "coffee", min: 3, max: 3 }, { seed: "printer", min: 1, max: 1 } ], { rotClearChance: 0.2, stickRes: 0.1, killKey: "kill_livinghe_sing", sound: "human" });
		/* Underwater */
		case "kelpBoy": return new EnemyDetail(name, GetDisplayName(name, 1), "md", [7, 0], { dx: 0.15, dy: -1.9, w: 0.2, h: 0.9 }, 300, 20, 10, 3, 3, true, [0, 0, 0, 1], "basicFarm", "garlic,garlic,corn,corn,leek,spinach,leek,leek", [ { money: true, min: 420, max: 420 }, { seed: "garlic", min: 10, max: 10 }, { seed: "leek", min: 10, max: 10 }, { seed: "spinach", min: 10, max: 10 } ], { tile: "dirt", rotClearChance: 0.5, stickRes: 1, killKey: "kill_defeathe_sing", sound: "human" });
		case "fishFace": return new EnemyDetail(name, GetDisplayName(name, 1), "md", [5, 6], { dx: 0.25, dy: -1.5, w: 0, h: 0.5 }, 100, 12, 6, 3, 1, false, [1, 1, 1, 0], "basic", "algae,kelp", [ { money: true, min: 60, max: 80 }, { seed: "net", min: 0, max: 1 }, { seed: "rice", min: 0, max: 1 }, { seed: "rod", min: 0, max: 2 } ], { tile: "watertile", rotClearChance: 0, stickRes: 0.5, killKey: "kill_livingthey_sing", sound: "squishy" });
		case "seaMonk": return new EnemyDetail(name, GetDisplayName(name, 1), "md", [6, 6], { dx: 0, dy: -1.9, w: 0.5, h: 0.9 }, 120, 15, 7, 2, 2, false, [0, 1, 1, 1], "wetboy", "algae,kelp", [ { money: true, min: 100, max: 120 }, { seed: "net", min: 0, max: 1 }, { seed: "rice", min: 2, max: 5 }, { seed: "chestnut", min: 0, max: 1 } ], { tile: "watertile", rotClearChance: 0, stickRes: 0.5, killKey: "kill_livingthey_sing", sound: "squishy" });
		case "seaHandR": return new EnemyDetail(name, GetDisplayName(name, 1), "lg", [1, 0], { dx: 0, dy: -2.35, w: 1, h: 1.35 }, 100, 20, 5, 3, 1, false, [1, 1, 1, 0], "basicRock", "algae,kelp", [ { money: true, min: 0, max: 0 } ], { tile: "watertile", rotClearChance: 0, stickRes: 0.5, killKey: "kill_crop_sing", sound: "squishy" });
		case "seaMan": return new EnemyDetail(name, GetDisplayName(name, 1), "lg", [2, 0], { dx: -0.05, dy: -2.4, w: 1.1, h: 1.4 }, 400, 25, 10, 3, 2, true, [1, 1, 1, 0], "slap", "", [ { money: true, min: 888, max: 888 }, { seed: "egg", min: 10, max: 10 }, { seed: "blackrice", min: 5, max: 5 }, { seed: "goodrod", min: 6, max: 6 } ], { tile: "watertile", soleKill: true, rotClearChance: 0, stickRes: 0.5, killKey: "kill_seamonster_sing", sound: "squishy" });
		case "seaHandL": return new EnemyDetail(name, GetDisplayName(name, 1), "lg", [3, 0], { dx: 0.05, dy: -0.65, w: 0.95, h: -0.35 }, 100, 20, 5, 3, 1, false, [1, 1, 1, 0], "wetboy", "algae,kelp", [ { money: true, min: 0, max: 0 } ], { tile: "watertile", rotClearChance: 0, stickRes: 0.5, killKey: "kill_crop_sing", sound: "squishy" });
		/* Fake Farm */
		case "chickBot": return new EnemyDetail(name, GetDisplayName(name, 1), "md", [7, 6], { dx: 0.2, dy: -1.7, w: 0.1, h: 0.7 }, 200, 20, 11, 3, 1, false, [1, 0, 1, 1], "basicRock", "egg", [ { money: true, min: 40, max: 60 }, { seed: "egg", min: 0, max: 5 }, { seed: "goose", min: 0, max: 1 }, { seed: "quail", min: 0, max: 1 } ], { tile: "_coop", rotClearChance: 0, stickRes: 0.1, killKey: "kill_robot_sing", sound: "metal" });
		case "piggun": return new EnemyDetail(name, GetDisplayName(name, 1), "md", [12, 0], { dx: 0, dy: -1.55, w: 0.5, h: 0.55 }, 230, 13, 10, 3, 2, false, [1, 1, 1, 0], "pigGun", "portobello,shiitake,milkcap,blackshroom", [ { money: true, min: 5, max: 10 }, { seed: "shiitake", min: 0, max: 3 }, { seed: "portobello", min: 0, max: 3 }, { seed: "blackshroom", min: 0, max: 1 } ], { tile: "_log", rotClearChance: 0, stickRes: 0, killKey: "kill_livingthey_sing", sound: "human" });
		case "golem": return new EnemyDetail(name, GetDisplayName(name, 1), "md", [8, 6], { dx: 0, dy: -1.9, w: 0.55, h: 0.9 }, 500, 40, 30, 4, 4, false, [1, 1, 1, 0], "basic", "garlic,grapes,leek", [ { money: true, min: 5, max: 10 }, { seed: "rhubarb", min: 5, max: 10 }, { seed: "tomato", min: 0, max: 15 }, { seed: "mango", min: 0, max: 5 } ], { tile: "dirt", weakSeason: 3, rotClearChance: 0.3, stickRes: 0.25, sound: "squishy" });
		case "lawnmower": return new EnemyDetail(name, GetDisplayName(name, 1), "md", [10, 6], { dx: 0, dy: -1.7, w: 0.5, h: 0.7 }, 350, 15, 10, 0, 0, false, [1, 1, 0, 1], "lawnmower", "", [ { money: true, min: 150, max: 150 }, { seed: "fodder", min: 4, max: 4 }, { seed: "asparagus", min: 3, max: 3 }, { seed: "spear", min: 2, max: 2 } ], { tile: "dirt", rotClearChance: 0.3, stickRes: 0, killKey: "kill_robot_sing", sound: "metal" });
		case "machineA": return new EnemyDetail(name, GetDisplayName(name, 1), "md", [8, 0], { dx: 0.2, dy: -1.5, w: 0.1, h: 0.5 }, 10, 10, 10, 2, 1, false, [1, 1, 0, 0], "basic", "battery,battery,drone", [ { money: true, min: 0, max: 0 } ], { addtlHitCheck: "check_SP_SU", rotClearChance: 0, stickRes: 1, killKey: "kill_robot_sing", sound: "metal" });
		case "machineB": return new EnemyDetail(name, GetDisplayName(name, 1), "md", [9, 0], { dx: 0.2, dy: -1.5, w: 0.1, h: 0.5 }, 10, 10, 10, 2, 1, false, [1, 1, 0, 0], "basic", "battery,battery,drone", [ { money: true, min: 0, max: 0 } ], { addtlHitCheck: "check_AU_WI", rotClearChance: 0, stickRes: 1, killKey: "kill_robot_sing", sound: "metal" });
		case "machineC": return new EnemyDetail(name, GetDisplayName(name, 1), "md", [10, 0], { dx: 0.2, dy: -1.6, w: 0.1, h: 0.6 }, 10, 10, 10, 2, 1, false, [1, 1, 0, 0], "basic", "battery,battery,drone", [ { money: true, min: 0, max: 0 } ], { addtlHitCheck: "check_MUSH", rotClearChance: 0, stickRes: 1, killKey: "kill_robot_sing", sound: "metal" });
		case "machineD": return new EnemyDetail(name, GetDisplayName(name, 1), "md", [11, 0], { dx: 0.2, dy: -1.65, w: 0.1, h: 0.65 }, 10, 10, 10, 2, 1, false, [1, 1, 0, 0], "basic", "battery,battery,drone", [ { money: true, min: 0, max: 0 } ], { addtlHitCheck: "check_FISH", rotClearChance: 0, stickRes: 1, killKey: "kill_robot_sing", sound: "metal" });
		case "router": return new EnemyDetail(name, GetDisplayName(name, 1), "sm", [9, 6], { dx: 0.25, dy: -0.75, w: 0, h: -0.25 }, 200, 1, 10, 4, 1, true, [0, 0, 1, 0], "router", "", [ { money: true, min: 0, max: 0 } ], { tile: "cybertile", rotClearChance: 0, stickRes: 0.5, killKey: "kill_robot_sing", sound: "metal" });
		case "server": return new EnemyDetail(name, GetDisplayName(name, 1), "md", [13, 7], { dx: 0.05, dy: -1.9, w: 0.4, h: 0.9 }, 350, 1, 10, 4, 1, true, [0, 0, 1, 0], "server", "", [ { money: true, min: 0, max: 0 } ], { tile: "cybertile", rotClearChance: 0, stickRes: 0.5, killKey: "kill_robot_sing", sound: "metal" });
		case "housekeeper": return new EnemyDetail(name, GetDisplayName(name, 1), "lg", [4, 0], { dx: 0.55, dy: -1.3, w: -0.1, h: 0.3 }, 600, 30, 30, 4, 1, true, [0, 0, 1, 0], "housekeeper", "", [ { money: true, min: 1000, max: 1000 }, { seed: "battery", min: 20, max: 20 }, { seed: "app", min: 10, max: 10 }, { seed: "drone", min: 5, max: 5 } ], { tile: "cybertile", soleKill: true, rotClearChance: 0, stickRes: 0.5, killKey: "kill_robot_sing", sound: "metal" });
		case "outlet": return new EnemyDetail(name, GetDisplayName(name, 1), "sm", [11, 6], { dx: 0.4, dy: -1.05, w: -0.3, h: 0 }, 200, 1, 5, 4, 1, true, [0, 0, 1, 0], "outlet", "", [ { money: true, min: 0, max: 0 } ], { tile: "cybertile", soleKill: true, postHit: "unplug", rotClearChance: 0, stickRes: 1, killKey: "kill_robot_sing", sound: "metal" });
		/* South City */
		case "mrbruno": return new EnemyDetail(name, GetDisplayName(name, 1), "md", [14, 0], { dx: 0.05, dy: -1.9, w: 0.25, h: 0.9 }, 700, 30, 20, 4, 3, true, [0, 0, 1, 0], "mobster", "tomato,grapes", [ { money: true, min: 600, max: 600 }, { seed: "tomato", min: 10, max: 10 }, { seed: "grapes", min: 10, max: 10 } ], { tile: "dirt", rotClearChance: 0.5, stickRes: 0.25, killKey: "kill_defeathe_sing", sound: "human" });
		case "mobsty1": return new EnemyDetail(name, GetDisplayName(name, 3), "md", [14, 0], { dx: 0.05, dy: -1.9, w: 0.25, h: 0.9 }, 500, 30, 20, 4, 1, false, [0, 1, 1, 1], "mobster", "tomato,grapes", [ { money: true, min: 300, max: 700 }, { seed: "tomato", min: 5, max: 15 }, { seed: "grapes", min: 5, max: 15 } ], { tile: "dirt", rotClearChance: 0.5, stickRes: 0.25, killKey: "kill_defeathe_sing", sound: "human" });
		case "mobsty2": return new EnemyDetail(name, GetDisplayName(name, 3), "md", [15, 0], { dx: 0.05, dy: -1.9, w: 0.25, h: 0.9 }, 300, 25, 20, 4, 1, false, [0, 1, 0, 0], "mobster", "tomato,arborioB", [ { money: true, min: 600, max: 1200 }, { seed: "tomato", min: 10, max: 20 }, { seed: "grapes", min: 10, max: 20 }, { seed: "arborio", min: 5, max: 10 } ], { tile: "dirt", rotClearChance: 0.5, stickRes: 0.25, killKey: "kill_defeathe_sing", sound: "human" });
		case "mobBoss": return new EnemyDetail(name, GetDisplayName(name, 1), "md", [16, 0], { dx: 0.15, dy: -1.9, w: 0.25, h: 0.9 }, 1200, 50, 50, 5, 1, true, [0, 1, 0, 0], "mobster", "tomato,grapes,arborioB,porcini", [ { money: true, min: 2000, max: 2000 }, { seed: "tomato", min: 30, max: 30 }, { seed: "grapes", min: 30, max: 30 }, { seed: "arborio", min: 30, max: 30 } ], { tile: "dirt", rotClearChance: 0.5, stickRes: 0.25, killKey: "kill_defeathe_sing", sound: "human" });
		/* North City */
		case "dweebLord": return new EnemyDetail(name, GetDisplayName(name, 1), "xl", [0, 0], { dx: 0.5, dy: -4.9, w: 4.15, h: 3.75 }, 3000, 50, 50, 3, 2, true, [0, 0, 1, 0], "wacg", "", [ { money: true, min: 5000, max: 5000 }, { seed: "battery", min: 10, max: 10 }, { seed: "drone", min: 30, max: 30 }, { seed: "coffee", min: 20, max: 20 } ], { tile: "cybertile", rotClearChance: 0.2, stickRes: 0.25, killKey: "kill_defeathe_sing", sound: "n" });
		case "robber": return new EnemyDetail(name, GetDisplayName(name, 1), "md", [19, 0], { dx: 0.25, dy: -1.6, w: -0.05, h: 0.6 }, 1500, 40, 35, 3, 1, true, [0, 0, 0, 1], "basic", "shotgun,timebomb", [ { money: true, min: 2500, max: 2500 }, { seed: "spear", min: 1, max: 1 } ], { rotClearChance: 0.2, stickRes: 0.25, killKey: "kill_defeathe_sing", sound: "human" });
		case "brownCar": return new EnemyDetail(name, GetDisplayName(name, 1), "lg", [6, 0], { dx: 0, dy: -1.55, w: 1, h: 0.6 }, 800, 30, 30, 3, 3, false, [0, 0, 1, 1], "beepBeep", "gastank,airfilter,dipstick,cacao", [ { money: true, min: 50, max: 150 }, { seed: "battery", min: 0, max: 10 }, { seed: "coffee", min: 0, max: 5 }, { seed: "avocado", min: 0, max: 5 } ], { tile: "roadtile", rotClearChance: 0.2, stickRes: 0.33, killKey: "kill_crop_sing", sound: "metal" });
		case "blueCar": return new EnemyDetail(name, GetDisplayName(name, 1), "lg", [7, 0], { dx: 0, dy: -1.55, w: 1, h: 0.6 }, 900, 30, 30, 3, 3, false, [1, 0, 0, 1], "beepBeep", "gastank,airfilter,dipstick,battery", [ { money: true, min: 50, max: 150 }, { seed: "avocado", min: 0, max: 5 }, { seed: "coffee", min: 0, max: 5 }, { seed: "banana", min: 0, max: 4 } ], { tile: "roadtile", rotClearChance: 0.2, stickRes: 0.33, killKey: "kill_crop_sing", sound: "metal" });
		case "redCar": return new EnemyDetail(name, GetDisplayName(name, 1), "lg", [8, 0], { dx: 0, dy: -1.55, w: 1, h: 0.6 }, 750, 30, 30, 3, 3, false, [1, 1, 0, 0], "beepBeep", "gastank,airfilter,dipstick,battery", [ { money: true, min: 50, max: 150 }, { seed: "avocado", min: 0, max: 5 }, { seed: "coffee", min: 0, max: 5 }, { seed: "kiwi", min: 0, max: 1 } ], { tile: "roadtile", rotClearChance: 0.2, stickRes: 0.33, killKey: "kill_crop_sing", sound: "metal" });
		case "foodTruck": return new EnemyDetail(name, GetDisplayName(name, 1), "lg", [5, 0], { dx: 0, dy: -2.4, w: 1, h: 1.4 }, 850, 30, 30, 3, 2, false, [1, 1, 1, 0], "mrGrillerGrillSpirits", "burrito,dango,taco,kombucha,cheese,batterysalt", [ { money: true, min: 50, max: 150 }, { seed: "avocado", min: 5, max: 10 }, { seed: "bellpepper", min: 5, max: 10 }, { seed: "arborio", min: 5, max: 10 } ], { tile: "grilltile", rotClearChance: 0.2, stickRes: 0.33, killKey: "kill_crop_sing", sound: "metal" });
		case "delivTruck": return new EnemyDetail(name, GetDisplayName(name, 1), "md", [13, 0], { dx: 0.05, dy: -1.4, w: 0.35, h: 0.4 }, 500, 30, 30, 3, 2, false, [0, 1, 1, 0], "basic", "battery,app,taco,burrito,cheese,timebomb", [ { money: true, min: 50, max: 150 }, { seed: "kiwi", min: 0, max: 1 }, { seed: "leek", min: 5, max: 10 }, { seed: "garlic", min: 0, max: 1 } ], { tile: "roadtile", rotClearChance: 0.2, stickRes: 0.15, killKey: "kill_crop_sing", sound: "metal" });
		case "vendo": return new EnemyDetail(name, GetDisplayName(name, 1), "md", [17, 0], { dx: 0.05, dy: -1.9, w: 0.4, h: 0.9 }, 600, 30, 30, 3, 2, false, [1, 1, 0, 1], "vendo", "burrito,dango,taco,kombucha,cheese,coffee", [ { money: true, min: 10, max: 200 }, { seed: "coffee", min: 6, max: 9 }, { seed: "shiitake", min: 5, max: 10 }, { seed: "grapes", min: 4, max: 20 } ], { rotClearChance: 0.2, stickRes: 0.1, killKey: "kill_crop_sing", sound: "metal" });
		case "hoverdweeb": return new EnemyDetail(name, GetDisplayName(name, 1), "md", [18, 0], { dx: 0.15, dy: -1.6, w: 0.2, h: 0.6 }, 690, 30, 30, 3, 2, false, [1, 1, 0, 1], "basic", "battery,app,drone,printer,headphones", [ { money: true, min: 60, max: 160 }, { seed: "app", min: 0, max: 10 }, { seed: "drone", min: 0, max: 10 }, { seed: "frogbot", min: 0, max: 2 } ], { tile: "cybertile", rotClearChance: 0.2, stickRes: 0.1, killKey: "kill_livinghe_sing", sound: "human" });
		/* Food2 HQ */
		case "trendyNerd": return new EnemyDetail(name, GetDisplayName(name, 1), "md", [20, 0], { dx: 0.2, dy: -1.35, w: 0, h: 0.35 }, 1000, 40, 30, 4, 5, false, [1, 0, 0, 1], "nernd", "food2bar,food2barChoc,food2bar,lightbulb,app", [ { money: true, min: 200, max: 400 }, { seed: "app", min: 10, max: 20 }, { seed: "shiitake", min: 10, max: 20 }, { seed: "avocado", min: 10, max: 20 } ], { tile: "conveyor", initFunc: "NERND", turnFunc: "NERND", rotClearChance: 0.2, stickRes: 0, sound: "human" });
		case "coffeeNerd": return new EnemyDetail(name, GetDisplayName(name, 1), "md", [21, 0], { dx: 0.25, dy: -1.6, w: 0.05, h: 0.6 }, 1000, 40, 30, 4, 5, false, [0, 0, 1, 1], "nernd", "food2bar,food2barChoc,food2bar,drone,battery", [ { money: true, min: 200, max: 400 }, { seed: "coffee", min: 15, max: 20 }, { seed: "rhubarb", min: 0, max: 25 }, { seed: "shortgrain", min: 0, max: 10 } ], { tile: "conveyor", initFunc: "NERND", turnFunc: "NERND", rotClearChance: 0.2, stickRes: 0, sound: "human" });
		case "buffNerd": return new EnemyDetail(name, GetDisplayName(name, 1), "md", [22, 0], { dx: 0.2, dy: -1.5, w: 0.05, h: 0.5 }, 1000, 40, 30, 4, 5, false, [1, 1, 0, 1], "nernd", "food2bar,food2barChoc,food2bar,headphones,printer", [ { money: true, min: 200, max: 400 }, { seed: "beet", min: 10, max: 20 }, { seed: "pineapple", min: 10, max: 20 }, { seed: "rice", min: 5, max: 20 } ], { tile: "conveyor", initFunc: "NERND", turnFunc: "NERND", rotClearChance: 0.2, stickRes: 0.5, sound: "human" });
		case "tinyNerd": return new EnemyDetail(name, GetDisplayName(name, 1), "md", [23, 0], { dx: 0.35, dy: -1.2, w: -0.15, h: 0.2 }, 1000, 40, 30, 4, 5, false, [1, 1, 1, 1], "nernd", "food2bar,food2barChoc,food2bar,lightbulb,drone", [ { money: true, min: 200, max: 400 }, { seed: "radish", min: 5, max: 10 }, { seed: "shortgrain", min: 5, max: 10 }, { seed: "headphones", min: 5, max: 10 } ], { tile: "conveyor", initFunc: "NERND", turnFunc: "NERND", rotClearChance: 0.2, stickRes: 0.66, sound: "human" });
		case "theFunnyOne": return new EnemyDetail(name, GetDisplayName(name, 1), "md", [24, 0], { dx: 0.35, dy: -1.4, w: 0.35, h: 0.4 }, 1000, 40, 30, 4, 5, false, [0, 1, 1, 1], "nernd", "food2bar,food2barChoc,food2bar", [ { money: true, min: 200, max: 400 }, { seed: "asparagus", min: 2, max: 4 }, { seed: "bignet", min: 4, max: 6 }, { seed: "poisnshroom", min: 1, max: 4 } ], { tile: "conveyor", initFunc: "NERND", turnFunc: "NERND", rotClearChance: 0.2, stickRes: 0.25, killKey: "kill_livinghe_sing", sound: "human" });
		case "robo4a": return new EnemyDetail(name, GetDisplayName(name, 1), "sm", [17, 6], { dx: 0.25, dy: -1.1, w: 0, h: 0.1 }, 500, 40, 30, 3, 2, false, [1, 1, 1, 1], "basic", "battery,app,drone,printer,food2bar,food2barChoc", [ { money: true, min: 100, max: 200 }, { seed: "battery", min: 2, max: 4 } ], { rotClearChance: 0.2, stickRes: 0.25, killKey: "kill_robot_sing", sound: "metal" });
		case "robo4b": return new EnemyDetail(name, GetDisplayName(name, 1), "sm", [18, 6], { dx: 0.25, dy: -1.25, w: 0, h: 0.25 }, 800, 50, 35, 3, 2, false, [1, 1, 1, 1], "basic", "battery,app,drone,printer,food2bar,food2barChoc", [ { money: true, min: 200, max: 400 }, { seed: "drone", min: 4, max: 8 } ], { rotClearChance: 0.2, stickRes: 0.25, killKey: "kill_robot_sing", sound: "metal" });
		case "robo4c": return new EnemyDetail(name, GetDisplayName(name, 1), "md", [19, 6], { dx: -0.1, dy: -1.9, w: 0.5, h: 0.9 }, 1200, 60, 40, 3, 2, false, [1, 1, 1, 1], "basicMany", "battery,app,drone,printer,food2bar,food2barChoc", [ { money: true, min: 400, max: 800 }, { seed: "coffee", min: 15, max: 20 } ], { rotClearChance: 0.2, stickRes: 0.25, killKey: "kill_robot_sing", sound: "metal" });
		case "discuss2": return new EnemyDetail(name, GetDisplayName(name, 1), "sm", [25, 0], { dx: 0.25, dy: -1.25, w: 0, h: 0.25 }, 10000, 30, 30, 1, 1, true, [1, 1, 1, 1], "convince2", "", [ { money: true, min: 0, max: 0 } ], { tile: "food2orig", turnFunc: "CONVINCE", rotClearChance: 0.2, stickRes: 1, killKey: "kill_robot_sing", sound: "metal" });
		case "discuss2big": return new EnemyDetail(name, GetDisplayName(name, 1), "lg", [9, 0], { dx: 0, dy: -2.5, w: 1, h: 1.5 }, 2500, 60, 55, 1, 1, true, [1, 1, 1, 1], "hulk", "", [ { money: true, min: 12, max: 12 }, { seed: "frogbot", min: 10, max: 10 }, { seed: "mango", min: 5, max: 5 }, { seed: "corn", min: 8, max: 8 } ], { tile: "food2orig", rotClearChance: 0.2, stickRes: 1, killKey: "kill_robot_sing", sound: "metal" });
		case "botMush": return new EnemyDetail(name, GetDisplayName(name, 1), "md", [26, 0], { dx: 0, dy: -1.75, w: 0.5, h: 0.75 }, 800, 50, 30, 3, 2, false, [1, 1, 1, 1], "basic", "batterysalt,gastank,food2kelp,food2coffee,food2salsa,food2gamer", [ { money: true, min: 0, max: 0 }, { seed: "poisnshroom", min: 5, max: 5 }, { seed: "blackshroom", min: 5, max: 5 }, { seed: "greenshroom", min: 5, max: 5 } ], { addtlHitCheck: "check_MUSH_w", rotClearChance: 0.2, stickRes: 1, killKey: "kill_robot_sing", sound: "metal" });
		case "botRice": return new EnemyDetail(name, GetDisplayName(name, 1), "md", [27, 0], { dx: 0, dy: -1.75, w: 0.5, h: 0.75 }, 800, 50, 30, 3, 2, false, [1, 1, 1, 1], "basic", "batterysalt,gastank,food2kelp,food2coffee,food2salsa,food2gamer", [ { money: true, min: 0, max: 0 }, { seed: "blackrice", min: 5, max: 5 }, { seed: "arborio", min: 5, max: 5 }, { seed: "chestnut", min: 5, max: 5 } ], { addtlHitCheck: "check_RICE", rotClearChance: 0.2, stickRes: 1, killKey: "kill_robot_sing", sound: "metal" });
		case "botFruit": return new EnemyDetail(name, GetDisplayName(name, 1), "md", [25, 6], { dx: 0, dy: -1.75, w: 0.5, h: 0.75 }, 800, 50, 30, 3, 2, false, [1, 1, 1, 1], "basic", "batterysalt,gastank,food2kelp,food2coffee,food2salsa,food2gamer", [ { money: true, min: 0, max: 0 }, { seed: "kiwi", min: 5, max: 5 }, { seed: "apricot", min: 5, max: 5 }, { seed: "avocado", min: 5, max: 5 } ], { addtlHitCheck: "check_FRUIT", rotClearChance: 0.2, stickRes: 1, killKey: "kill_robot_sing", sound: "metal" });
		case "botVeggie": return new EnemyDetail(name, GetDisplayName(name, 1), "md", [26, 6], { dx: 0, dy: -1.75, w: 0.5, h: 0.75 }, 800, 50, 30, 3, 2, false, [1, 1, 1, 1], "basic", "batterysalt,gastank,food2kelp,food2coffee,food2salsa,food2gamer", [ { money: true, min: 0, max: 0 }, { seed: "garlic", min: 5, max: 5 }, { seed: "pineapple", min: 5, max: 5 }, { seed: "rhubarb", min: 7, max: 7 } ], { addtlHitCheck: "check_VEG", rotClearChance: 0.2, stickRes: 1, killKey: "kill_robot_sing", sound: "metal" });
		case "theMonster": return new EnemyDetail(name, GetDisplayName(name, 1), "xl", [1, 0], { dx: 0.35, dy: -4.45, w: 4.35, h: 3.5 }, 5000, 70, 80, 4, 4, true, [1, 0, 0, 0], "soyMonster", "soybean,soybean,soybean,soybaby", [ { money: true, min: 0, max: 0 } ], { tile: "dirt", soleKill: true, rotClearChance: 0.2, stickRes: 0.35, killKey: "kill_defeatthey_sing", sound: "squishy" });
		case "soyChild": return new EnemyDetail(name, GetDisplayName(name, 1), "sm", [27, 6], { dx: 0.25, dy: -1.25, w: 0, h: 0.25 }, 50, 20, 10, 1, 1, false, [1, 0, 0, 0], "basic", "soybean", [ { money: true, min: 0, max: 0 } ], { rotClearChance: 0.2, stickRes: 0.15, killKey: "kill_defeatthey_sing", sound: "squishy" });
		case "soyStack": return new EnemyDetail(name, GetDisplayName(name, 1), "lg", [10, 0], { dx: 0.55, dy: -2.5, w: 0.05, h: 1.5 }, 150, 60, 30, 1, 1, false, [1, 0, 0, 0], "basicMany", "soybean", [ { money: true, min: 0, max: 0 } ], { rotClearChance: 0.2, stickRes: 0.15, killKey: "kill_defeatthey_sing", sound: "squishy" });
		case "beckett": return new EnemyDetail(name, GetDisplayName(name, 1), "md", [28, 0], { dx: 0.3, dy: -1.2, w: -0.1, h: 0.2 }, 6000, 70, 55, 5, 5, true, [0, 0, 0, 1], "beckett", "", [ { money: true, min: 10000, max: 10000 }, { seed: "drone", min: 50, max: 50 }, { seed: "printer", min: 50, max: 50 }, { seed: "battery", min: 50, max: 50 } ], { tile: "beckett", weakSeason: 3, addtlHitCheck: "beckett", initFunc: "BECKETT", turnFunc: "BECKETT", rotClearChance: 0.2, stickRes: 0.5, killKey: "kill_livinghe_sing", sound: "human" });
		case "nathan": return new EnemyDetail(name, GetDisplayName(name, 1), "md", [29, 0], { dx: 0.3, dy: -1.2, w: -0.1, h: 0.2 }, 8450, 72, 67, 7, 5, true, [0, 1, 0, 0], "nathan", "", [ { money: true, min: 0, max: 0 }, { seed: "beet", min: 1, max: 1 } ], { tile: "nathan", turnFunc: "NATHAN", rotClearChance: 0.2, stickRes: 0.65, killKey: "kill_defeathe_sing", sound: "human" });
		/* Bee Queen */
		case "beeQueenA": return new EnemyDetail(name, GetDisplayName(name, 1), "md", [30, 0], { dx: 0, dy: -1.75, w: 0.45, h: 0.65 }, 500, 68, 67, 3, 3, true, [1, 0, 0, 0], "beeQueen", "beeR,beeG,beeB,hbee", [ { money: true, min: 400, max: 400 }, { seed: "beeR", min: 2, max: 8 }, { seed: "beeG", min: 2, max: 8 }, { seed: "beeB", min: 2, max: 8 } ], { tile: "_beehive", rotClearChance: 0, stickRes: 1, killKey: "kill_livingthey_sing", sound: "human" });
		case "beeQueenB": return new EnemyDetail(name, GetDisplayName(name, 1), "md", [30, 0], { dx: 0, dy: -1.75, w: 0.45, h: 0.65 }, 2000, 86, 76, 3, 3, true, [1, 0, 0, 0], "beeQueen", "beeR,beeG,beeB,hbee", [ { money: true, min: 1000, max: 1000 }, { seed: "beeR", min: 2, max: 8 }, { seed: "beeG", min: 2, max: 8 }, { seed: "beeB", min: 2, max: 8 } ], { tile: "_beehive", rotClearChance: 0, stickRes: 1, killKey: "kill_livingthey_sing", sound: "human" });
		case "beeQueenC": return new EnemyDetail(name, GetDisplayName(name, 1), "md", [30, 0], { dx: 0, dy: -1.75, w: 0.45, h: 0.65 }, 15000, 100, 100, 3, 3, true, [1, 0, 0, 0], "beeQueen", "beeR,beeG,beeB,hbee", [ { money: true, min: 9999, max: 9999 }, { seed: "beeR", min: 2, max: 8 }, { seed: "beeG", min: 2, max: 8 }, { seed: "beeB", min: 2, max: 8 } ], { tile: "_beehive", rotClearChance: 0, stickRes: 1, killKey: "kill_livingthey_sing", sound: "human" });
		/* Test Enemy */
		case "yourWorstFuckingNightmare": return new EnemyDetail(name, GetDisplayName(name, 1), "lg", [11, 0], { dx: 0, dy: -2.45, w: 1.05, h: 1.45 }, 999999, 1, 0, 5, 5, false, [1, 0, 0, 0], "test", "kelp", [], { rotClearChance: 0, stickRes: 0, sound: "squishy" });
		/* The Cave */
		case "seaMobster": return new EnemyDetail(name, GetDisplayName(name, 1), "md", [31, 0], { dx: 0.15, dy: -1.9, w: 0.25, h: 0.9 }, 800, 50, 50, 5, 5, true, [0, 1, 0, 0], "mobster", "tomato,grapes,arborioB,porcini", [ { money: true, min: 2000, max: 2000 }, { seed: "tomato", min: 30, max: 30 }, { seed: "grapes", min: 30, max: 30 }, { seed: "arborio", min: 30, max: 30 } ], { tile: "dirt", rotClearChance: 0.5, stickRes: 0.25, killKey: "kill_defeathe_sing", sound: "squishy" });
		case "soyChildCave": return new EnemyDetail(name, GetDisplayName(name, 1), "sm", [27, 6], { dx: 0.25, dy: -1.25, w: 0, h: 0.25 }, 700, 40, 30, 5, 5, true, [1, 0, 0, 0], "basic", "soybean", [ { money: true, min: 0, max: 0 }, { seed: "soybean", min: 0, max: 1 } ], { tile: "dirt", rotClearChance: 0.2, stickRes: 0.15, killKey: "kill_defeatthey_sing", sound: "squishy" });
		case "shinyBear": return new EnemyDetail(name, GetDisplayName(name, 1), "md", [32, 0], { dx: 0, dy: -1.9, w: 0.5, h: 0.9 }, 100, 60, 50, 5, 3, true, [1, 1, 1, 0], "bear", "blackberry", [ { money: true, min: 200, max: 200 }, { seed: "blackberry", min: 4, max: 4 }, { seed: "beeB", min: 5, max: 5 }, { seed: "goodrod", min: 3, max: 3 } ], { tile: "dirt", rotClearChance: 0, stickRes: 0, killKey: "kill_livingthey_sing", sound: "furry" });
		case "mrWallFriend": return new EnemyDetail(name, GetDisplayName(name, 1), "lg", [12, 0], { dx: -0.35, dy: -2.9, w: 1.65, h: 1.9 }, 1200, 60, 40, 4, 4, true, [1, 1, 1, 1], "basicMany", "portobello,shiitake,milkcap,blackshroom,poisnshroom,greenshroom,notdrugs", [ { money: true, min: 400, max: 800 }, { seed: "poisnshroom", min: 5, max: 5 }, { seed: "blackshroom", min: 5, max: 5 }, { seed: "greenshroom", min: 5, max: 5 } ], { tile: "_log", rotClearChance: 0.2, stickRes: 0.25, killKey: "kill_livingthey_sing", sound: "metal" });
		case "caveNerd": return new EnemyDetail(name, GetDisplayName(name, 1), "md", [33, 0], { dx: 0.25, dy: -1.6, w: 0.05, h: 0.6 }, 1500, 80, 20, 4, 5, true, [1, 1, 1, 1], "nernd", "food2bar,food2barChoc,food2bar,drone,battery", [ { money: true, min: 200, max: 400 }, { seed: "coffee", min: 15, max: 20 }, { seed: "rhubarb", min: 0, max: 25 }, { seed: "shortgrain", min: 0, max: 10 } ], { tile: "conveyor", initFunc: "NERND", turnFunc: "NERND", rotClearChance: 0.2, stickRes: 0, sound: "human" });
		case "graveRobber": return new EnemyDetail(name, GetDisplayName(name, 1), "md", [19, 0], { dx: 0.25, dy: -1.6, w: -0.05, h: 0.6 }, 1800, 70, 60, 4, 2, true, [0, 0, 0, 1], "basic", "shotgun,timebomb", [ { money: true, min: 2500, max: 2500 }, { seed: "spear", min: 1, max: 1 } ], { rotClearChance: 0.2, stickRes: 0.25, killKey: "kill_defeathe_sing", sound: "human" });
		case "negayana": return new EnemyDetail(name, GetDisplayName(name, 1), "md", [34, 0], { dx: 0.3, dy: -1.3, w: -0.1, h: 0.3 }, 5000, 72, 67, 7, 5, true, [0, 1, 0, 0], "nathan", "", [ { money: true, min: 3000, max: 4000 }, { seed: "beet", min: 1, max: 1 } ], { tile: "nathan", turnFunc: "NATHAN", rotClearChance: 0.2, stickRes: 0.65, killKey: "kill_defeathe_sing", sound: "human" });
		/* Cave Bosses */
		case "garfwax": return new EnemyDetail(name, GetDisplayName(name, 1), "xl", [3, 0], { dx: 2, dy: -3.6, w: 1.5, h: 1.65 }, 3000, 50, 50, 4, 4, true, [1, 1, 1, 1], "basicMany", "trapple,trapricot,travocado,trbanana,trgrapes,trkiwi,trlemon,trmango,trcoconut", [ { money: true, min: 100, max: 200 }, { seed: "coconut", min: 10, max: 20 }, { seed: "apple", min: 20, max: 40 }, { seed: "avocado", min: 10, max: 20 } ], { tile: "tree", turnFunc: "NATHAN", rotClearChance: 0.2, stickRes: 0.25, killKey: "kill_defeatthey_sing", sound: "metal" });
		case "trustworthyfriend": return new EnemyDetail(name, GetDisplayName(name, 1), "xl", [4, 0], { dx: 0.25, dy: -4.7, w: 4.6, h: 3.6 }, 3000, 60, 50, 4, 5, true, [1, 1, 1, 1], "basic", "portobello,shiitake,milkcap,blackshroom,poisnshroom,greenshroom,notdrugs", [ { money: true, min: 100, max: 200 }, { seed: "notdrugs", min: 10, max: 20 }, { seed: "blackshroom", min: 20, max: 30 }, { seed: "poisnshroom", min: 10, max: 20 } ], { tile: "_log", turnFunc: "NATHAN", rotClearChance: 0.2, stickRes: 0.25, killKey: "kill_defeatthey_sing", sound: "squishy" });
		case "doodoobirdhaha": return new EnemyDetail(name, GetDisplayName(name, 1), "xl", [5, 0], { dx: 0.25, dy: -4.9, w: 4.6, h: 3.9 }, 2000, 70, 40, 4, 5, true, [1, 1, 1, 1], "basic", "dodo", [ { money: true, min: 1000, max: 1200 }, { seed: "goldegg", min: 10, max: 20 }, { seed: "apple", min: 2, max: 4 } ], { tile: "_coop", turnFunc: "NATHAN", rotClearChance: 0.2, stickRes: 0.25, killKey: "kill_defeatthey_sing", sound: "furry" });
		case "golf": return new EnemyDetail(name, GetDisplayName(name, 1), "xl", [6, 0], { dx: 0, dy: -4.5, w: 5.15, h: 3.55 }, 3000, 60, 50, 5, 5, true, [1, 1, 1, 1], "basicMany", "rice,arborio,blackrice,shortgrain,chestnut,lotus", [ { money: true, min: 100, max: 200 }, { seed: "lotus", min: 10, max: 20 }, { seed: "arborio", min: 5, max: 10 }, { seed: "chestnut", min: 5, max: 10 } ], { tile: "_strongsoil", turnFunc: "NATHAN", rotClearChance: 0.2, stickRes: 0.25, killKey: "kill_defeatthey_sing", sound: "furry" });
		case "conqueredscarecrow": return new EnemyDetail(name, GetDisplayName(name, 1), "xl", [7, 0], { dx: -0.05, dy: -4.8, w: 5.2, h: 3.8 }, 3000, 60, 50, 4, 5, true, [1, 1, 1, 1], "basicMany", "asparagus,beet,bellpepper,carrot,corn,garlic,ginger,leek,pineapple,radish,rhubarb,spinach,tomato,gmocorn,saffron,soybean", [ { money: true, min: 100, max: 200 }, { seed: "saffron", min: 0, max: 1 }, { seed: "gmocorn", min: 8, max: 16 }, { seed: "pineapple", min: 10, max: 20 } ], { tile: "dirt", turnFunc: "NATHAN", rotClearChance: 0.2, stickRes: 0.25, killKey: "kill_defeatthey_sing", sound: "human" });
		case "fishingsnake": return new EnemyDetail(name, GetDisplayName(name, 1), "xl", [8, 0], { dx: 0, dy: -4.4, w: 4.95, h: 4.15 }, 3000, 60, 50, 6, 5, true, [1, 1, 1, 1], "basicMany", "goodrod,metalrod,net,bignet,ultrarod", [ { money: true, min: 100, max: 200 }, { seed: "ultrarod", min: 10, max: 20 }, { seed: "bignet", min: 10, max: 20 } ], { tile: "watertile", turnFunc: "NATHAN", rotClearChance: 0.2, stickRes: 0.25, killKey: "kill_defeatthey_sing", sound: "human" });
	}
}
debug.AllEnemies = ["Discussly", "robo", "bigBot", "robo2", "robo3", "ScienceMan", "mouse", "sqorl", "bear", "turky", "bossturky", "Worker", "BossWorker", "kelpBoy", "fishFace", "seaMonk", "seaHandR", "seaMan", "seaHandL", "chickBot", "piggun", "golem", "lawnmower", "machineA", "machineB", "machineC", "machineD", "router", "server", "housekeeper", "outlet", "mrbruno", "mobsty1", "mobsty2", "mobBoss", "dweebLord", "robber", "brownCar", "blueCar", "redCar", "foodTruck", "delivTruck", "vendo", "hoverdweeb", "trendyNerd", "coffeeNerd", "buffNerd", "tinyNerd", "theFunnyOne", "robo4a", "robo4b", "robo4c", "discuss2", "discuss2big", "botMush", "botRice", "botFruit", "botVeggie", "theMonster", "soyChild", "soyStack", "beckett", "nathan", "beeQueenA", "beeQueenB", "beeQueenC", "yourWorstFuckingNightmare", "seaMobster", "soyChildCave", "shinyBear", "mrWallFriend", "caveNerd", "graveRobber", "negayana", "garfwax", "trustworthyfriend", "doodoobirdhaha", "golf", "conqueredscarecrow", "fishingsnake"];