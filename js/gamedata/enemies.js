function EnemyDetail(name, size, spriteidx, cursorinfo, health, atk, def, fieldheight, fieldwidth, boss, seasonDistribution, atkType, args, drops, addtl) {
    this.name = name;
    this.health = health;
	this.maxhealth = health;
    this.atk = atk;
	this.baseatk = atk;
    this.def = def;
	this.basedef = def;
    this.cursorinfo = cursorinfo;
    this.fieldheight = fieldheight;
    this.fieldwidth = fieldwidth;
    this.size = size;
    this.spriteidx = spriteidx;
    switch(this.size) {
        case "sm": 
        case "md": this.sheet = "charsheet"; break;
		case "xl":
        case "lg": this.sheet = "charsheetbig"; break;
    }
    this.stickTurns = 0;
    this.seasonDistribution = seasonDistribution;
    this.attackType = atkType;
	this.args = (args || "").split(",");
	
    this.exp = Math.ceil(health/10 + atk + def/2);
    if(this.name === "Discussly" || this.name.indexOf("beeQueen") === 0) { this.exp = 0; }
    this.drops = drops;
    this.boss = boss;
    if(addtl !== undefined) { for(var key in addtl) { this[key] = addtl[key]; } }
	this.GetRandomArg = function() { return this.args[Math.floor(Math.random() * this.args.length)]; };
}
function GetDisplayName(enemyname, max) { return GetText("e." + enemyname + Math.floor(Math.random() * max)); }
function GetEnemy(name) {
    switch(name) {
		/* Intro */
		case "Discussly": return new EnemyDetail(GetDisplayName(name, 1), "sm", 0, { dx: 0, dy: 0.25, w: 0, h: 0.25 }, 10, 1, 1, 3, 2, false, [0, 0, 1, 0], "tutorial", "", []);
		/* Farm */
		case "robo": return new EnemyDetail(GetDisplayName(name, 1), "sm", 1, { dx: 0, dy: 0.25, w: 0, h: 0.25 }, 10, 2, 1, 3, 1, false, [0, 0, 1, 0], "basic", "battery", [ { money: true, min: 0, max: 5 } ]);
		case "bigBot": return new EnemyDetail(GetDisplayName(name, 1), "lg", 0, { dx: 0, dy: 0, w: 1, h: 1.5 }, 100, 5, 2, 3, 3, true, [0, 0, 1, 0], "boss1", "0,1,2", [ { money: true, min: 30, max: 30 }, { seed: "carrot", min: 10, max: 10 }, { seed: "beet", min: 10, max: 10 }, { seed: "grapes", min: 3, max: 3 } ]);
		/* Research Lab */
		case "robo2": return new EnemyDetail(GetDisplayName(name, 1), "sm", 6, { dx: 0, dy: 0.25, w: 0, h: 0.25 }, 24, 4, 3, 3, 2, false, [0, 1, 1, 0], "basic", "battery", [ { money: true, min: 5, max: 10 } ]);
		case "robo3": return new EnemyDetail(GetDisplayName(name, 1), "md", 8, { dx: 0, dy: -0.15, w: 0.5, h: 0.9 }, 24, 4, 3, 3, 2, false, [0, 1, 1, 0], "basic", "battery", [ { money: true, min: 10, max: 20 } ]);
		case "ScienceMan": return new EnemyDetail(GetDisplayName(name, 1), "md", 7, { dx: 0.25, dy: 0.15, w: 0, h: 0.6 }, 200, 5, 5, 3, 3, true, [0, 1, 0, 0], "boss2", "battery,battery,robobabby,robobabby,drone", [ { money: true, min: 200, max: 200 }, { seed: "apple", min: 5, max: 5 }, { seed: "battery", min: 8, max: 8 } ]);
		/* Forest */
		case "mouse": return new EnemyDetail(GetDisplayName(name, 1), "sm", 2, { dx: 0, dy: 0.55, w: 0, h: -0.05 }, 10, 2, 1, 1, 1, false, [1, 1, 0, 1], "slap", "", [ { money: true, min: 0, max: 5 }, { seed: "carrot", min: 0, max: 1 } ], { tile: "dirt" });
		case "sqorl": return new EnemyDetail(GetDisplayName(name, 1), "sm", 3, { dx: 0, dy: 0.35, w: 0, h: 0.15 }, 20, 3, 2, 2, 2, false, [0, 1, 1, 0], "basic", "acorn", [ { money: true, min: 0, max: 10 }, { seed: "carrot", min: 0, max: 1 } ], { tile: "dirt" });
		case "bear": return new EnemyDetail(GetDisplayName(name, 1), "md", 4, { dx: 0, dy: -0.15, w: 0.5, h: 0.9 }, 50, 4, 2, 4, 2, true, [1, 1, 1, 0], "bear", "blackberry", [ { money: true, min: 200, max: 200 }, { seed: "blackberry", min: 2, max: 2 } ], { tile: "dirt" });
		case "turky": return new EnemyDetail(GetDisplayName(name, 1), "md", 5, { dx: 0, dy: -0.1, w: 0.5, h: 0.85 }, 30, 4, 2, 1, 1, false, [0, 0, 1, 0], "basic", "turkey", [ { money: true, min: 0, max: 5 }, { seed: "turkey", min: 0, max: 1 } ], { tile: "_coop" });
		case "bossturky": return new EnemyDetail(GetDisplayName(name, 1), "md", 5, { dx: 0, dy: -0.1, w: 0.5, h: 0.85 }, 60, 6, 3, 2, 1, true, [0, 0, 1, 0], "basic", "turkey", [ { money: true, min: 50, max: 50 }, { seed: "turkey", min: 6, max: 6 } ], { tile: "_coop" });
		/* Bridge */
		case "Worker": return new EnemyDetail(GetDisplayName(name, 4), "md", 9, { dx: 0.25, dy: 0.5, w: 0, h: 0.25 }, 50, 3, 2, 2, 2, false, [1, 1, 1, 0], "construction", "", [ { money: true, min: 200, max: 400 } ]);
		case "BossWorker": return new EnemyDetail(GetDisplayName(name, 1), "md", 12, { dx: 0.25, dy: 0.5, w: 0, h: 0.25 }, 300, 4, 4, 2, 2, true, [1, 1, 1, 0], "constrboss", "", [ { money: true, min: 800, max: 800 } ]);
		/* Underwater */
		case "kelpBoy": return new EnemyDetail(GetDisplayName(name, 1), "md", 13, { dx: 0.15, dy: -0.15, w: 0.2, h: 0.9 }, 210, 5, 5, 3, 3, true, [0, 0, 0, 1], "basicFarm", "garlic,garlic,corn,corn,leek,spinach,leek,leek", [ { money: true, min: 69, max: 69 }, { seed: "garlic", min: 10, max: 10 }, { seed: "leek", min: 10, max: 10 }, { seed: "spinach", min: 10, max: 10 } ], { tile: "dirt" });
		case "fishFace": return new EnemyDetail(GetDisplayName(name, 1), "md", 10, { dx: 0.25, dy: 0.25, w: 0, h: 0.5 }, 30, 2, 1, 3, 1, false, [1, 1, 1, 0], "basic", "algae,kelp", [ { money: true, min: 60, max: 80 }, { seed: "net", min: 0, max: 1 }, { seed: "rice", min: 0, max: 1 } ], { tile: "watertile" });
		case "seaMonk": return new EnemyDetail(GetDisplayName(name, 1), "md", 11, { dx: 0, dy: -0.15, w: 0.5, h: 0.9 }, 40, 2, 2, 2, 2, false, [0, 1, 1, 1], "wetboy", "algae,kelp", [ { money: true, min: 100, max: 120 }, { seed: "net", min: 0, max: 1 }, { seed: "rice", min: 2, max: 5 }, { seed: "chestnut", min: 0, max: 1 } ], { tile: "watertile" });
		case "seaHandR": return new EnemyDetail(GetDisplayName(name, 1), "lg", 1, { dx: 0, dy: 0.15, w: 1, h: 1.35 }, 100, 10, 1, 3, 1, false, [1, 1, 1, 0], "basicRock", "algae,kelp", [ { money: true, min: 0, max: 0 } ], { tile: "watertile" });
		case "seaMan": return new EnemyDetail(GetDisplayName(name, 1), "lg", 2, { dx: -0.05, dy: 0.15, w: 1.1, h: 1.4 }, 400, 20, 5, 3, 2, true, [1, 1, 1, 0], "slap", "", [ { money: true, min: 600, max: 600 }, { seed: "egg", min: 5, max: 5 } ], { tile: "watertile", soleKill: true });
		case "seaHandL": return new EnemyDetail(GetDisplayName(name, 1), "lg", 3, { dx: 0.05, dy: 1.85, w: 0.95, h: -0.2 }, 100, 10, 1, 3, 1, false, [1, 1, 1, 0], "wetboy", "algae,kelp", [ { money: true, min: 0, max: 0 } ], { tile: "watertile" });
		/* Fake Farm */
		case "chickBot": return new EnemyDetail(GetDisplayName(name, 1), "md", 15, { dx: 0.2, dy: 0.05, w: 0.1, h: 0.7 }, 150, 8, 6, 3, 1, false, [1, 1, 0, 0], "basicRock", "egg", [ { money: true, min: 40, max: 60 }, { seed: "egg", min: 0, max: 5 }, { seed: "goose", min: 0, max: 1 } ], { tile: "_coop" });
		case "piggun": return new EnemyDetail(GetDisplayName(name, 1), "md", 16, { dx: 0, dy: 0.15, w: 0.5, h: 0.6 }, 100, 3, 3, 3, 2, false, [1, 1, 0, 0], "pigGun", "portobello,shiitake,milkcap,blackshroom", [ { money: true, min: 0, max: 5 }, { seed: "shiitake", min: 0, max: 3 }, { seed: "portobello", min: 0, max: 3 } ], { tile: "_log" });
		case "golem": return new EnemyDetail(GetDisplayName(name, 1), "md", 17, { dx: 0, dy: -0.15, w: 0.55, h: 0.9 }, 300, 30, 20, 4, 4, false, [1, 1, 1, 0], "basic", "garlic,grapes,leek", [ { money: true, min: 5, max: 10 }, { seed: "rhubarb", min: 5, max: 10 }, { seed: "tomato", min: 0, max: 15 }, { seed: "mango", min: 0, max: 5 } ], { tile: "dirt", weakSeason: 3 });
		case "lawnmower": return new EnemyDetail(GetDisplayName(name, 1), "md", 18, { dx: 0, dy: 0.05, w: 0.5, h: 0.7 }, 150, 5, 5, 0, 0, false, [1, 1, 0, 0], "lawnmower", "", [ { money: true, min: 150, max: 150 }, { seed: "fodder", min: 4, max: 4 }, { seed: "asparagus", min: 3, max: 3 } ], { tile: "dirt" });
		case "machineA": return new EnemyDetail(GetDisplayName(name, 1), "md", 14, { dx: 0.2, dy: 0.25, w: 0.1, h: 0.5 }, 10, 5, 5, 2, 1, false, [1, 1, 0, 0], "basic", "battery,battery,drone", [ { money: true, min: 0, max: 0 } ], { addtlHitCheck: "check_SP_SU" });
		case "machineB": return new EnemyDetail(GetDisplayName(name, 1), "md", 22, { dx: 0.2, dy: 0.25, w: 0.1, h: 0.5 }, 10, 5, 5, 2, 1, false, [1, 1, 0, 0], "basic", "battery,battery,drone", [ { money: true, min: 4, max: 4 } ], { addtlHitCheck: "check_AU_WI" });
		case "machineC": return new EnemyDetail(GetDisplayName(name, 1), "md", 23, { dx: 0.2, dy: 0.15, w: 0.1, h: 0.6 }, 10, 5, 5, 2, 1, false, [1, 1, 0, 0], "basic", "battery,battery,drone", [ { money: true, min: 0, max: 0 } ], { addtlHitCheck: "check_MUSH" });
		case "machineD": return new EnemyDetail(GetDisplayName(name, 1), "md", 24, { dx: 0.2, dy: 0.1, w: 0.1, h: 0.65 }, 10, 5, 5, 2, 1, false, [1, 1, 0, 0], "basic", "battery,battery,drone", [ { money: true, min: 0, max: 0 } ], { addtlHitCheck: "check_FISH" });
		case "router": return new EnemyDetail(GetDisplayName(name, 1), "sm", 19, { dx: 0, dy: 0.75, w: 0, h: -0.25 }, 200, 1, 10, 4, 1, true, [1, 1, 0, 0], "router", "", [ { money: true, min: 0, max: 0 } ], { tile: "cybertile" });
		case "server": return new EnemyDetail(GetDisplayName(name, 1), "md", 20, { dx: 0.05, dy: -0.15, w: 0.4, h: 0.9 }, 350, 1, 10, 4, 1, true, [1, 1, 0, 0], "server", "", [ { money: true, min: 0, max: 0 } ], { tile: "cybertile" });
		case "housekeeper": return new EnemyDetail(GetDisplayName(name, 1), "lg", 4, { dx: 0.55, dy: 0.85, w: -0.1, h: 0.3 }, 2000, 30, 30, 4, 1, true, [1, 1, 0, 0], "housekeeper", "", [ { money: true, min: 1000, max: 1000 }, { seed: "carrot", min: 1, max: 1 } ], { tile: "cybertile", soleKill: true });
		case "outlet": return new EnemyDetail(GetDisplayName(name, 1), "sm", 21, { dx: 0, dy: 0.45, w: -0.25, h: 0 }, 200, 1, 5, 4, 1, true, [1, 1, 0, 0], "outlet", "", [ { money: true, min: 0, max: 0 } ], { tile: "cybertile", soleKill: true, postHit: "unplug" });
		/* South City */
		case "mrbruno": return new EnemyDetail(GetDisplayName(name, 1), "md", 27, { dx: 0.05, dy: -0.15, w: 0.25, h: 0.9 }, 500, 20, 20, 4, 3, true, [0, 0, 1, 0], "mobster", "tomato,grapes", [ { money: true, min: 600, max: 600 }, { seed: "tomato", min: 10, max: 10 }, { seed: "grapes", min: 10, max: 10 } ], { tile: "dirt" });
		case "mobsty1": return new EnemyDetail(GetDisplayName(name, 3), "md", 27, { dx: 0.05, dy: -0.15, w: 0.25, h: 0.9 }, 500, 20, 20, 4, 1, false, [0, 1, 1, 1], "mobster", "tomato,grapes", [ { money: true, min: 300, max: 700 }, { seed: "tomato", min: 5, max: 15 }, { seed: "grapes", min: 5, max: 15 } ], { tile: "dirt" });
		case "mobsty2": return new EnemyDetail(GetDisplayName(name, 3), "md", 28, { dx: 0.05, dy: -0.15, w: 0.25, h: 0.9 }, 800, 30, 30, 4, 1, false, [0, 1, 1, 1], "mobster", "tomato,arborioB", [ { money: true, min: 600, max: 1200 }, { seed: "tomato", min: 10, max: 20 }, { seed: "grapes", min: 10, max: 20 }, { seed: "arborio", min: 5, max: 10 } ], { tile: "dirt" });
		case "mobBoss": return new EnemyDetail(GetDisplayName(name, 1), "md", 29, { dx: 0.05, dy: -0.15, w: 0.25, h: 0.9 }, 3000, 50, 50, 5, 3, true, [0, 1, 0, 0], "mobster", "tomato,grapes,arborioB,porcini", [ { money: true, min: 2000, max: 2000 }, { seed: "tomato", min: 30, max: 30 }, { seed: "grapes", min: 30, max: 30 }, { seed: "arborio", min: 30, max: 30 } ], { tile: "dirt" });
		/* North City */
		case "dweebLord": return new EnemyDetail(GetDisplayName(name, 1), "xl", 9, { dx: 2.45, dy: -0.65, w: 4.15, h: 3.75 }, 10000, 100, 100, 3, 2, true, [0, 0, 1, 0], "wacg", "", [ { money: true, min: 5000, max: 5000 }, { seed: "battery", min: 10, max: 10 }, { seed: "drone", min: 30, max: 30 }, { seed: "coffee", min: 20, max: 20 } ], { tile: "cybertile" });
		case "robber": return new EnemyDetail(GetDisplayName(name, 1), "md", 33, { dx: 0.25, dy: 0.15, w: -0.05, h: 0.6 }, 1000, 40, 35, 3, 1, true, [0, 0, 0, 1], "basic", "shotgun,timebomb", [ { money: true, min: 2500, max: 2500 } ]);
		case "brownCar": return new EnemyDetail(GetDisplayName(name, 1), "lg", 6, { dx: 0, dy: 0.9, w: 1, h: 0.6 }, 800, 30, 30, 3, 3, false, [0, 1, 1, 0], "beepBeep", "gastank,airfilter,dipstick,cacao", [], { tile: "roadtile" });
		case "blueCar": return new EnemyDetail(GetDisplayName(name, 1), "lg", 7, { dx: 0, dy: 0.9, w: 1, h: 0.6 }, 800, 30, 30, 3, 3, false, [0, 0, 0, 1], "beepBeep", "gastank,airfilter,dipstick,battery", [], { tile: "roadtile" });
		case "redCar": return new EnemyDetail(GetDisplayName(name, 1), "lg", 8, { dx: 0, dy: 0.9, w: 1, h: 0.6 }, 800, 30, 30, 3, 3, false, [1, 1, 0, 0], "beepBeep", "gastank,airfilter,dipstick,battery", [], { tile: "roadtile" });
		case "foodTruck": return new EnemyDetail(GetDisplayName(name, 1), "lg", 5, { dx: 0, dy: 0.1, w: 1, h: 1.4 }, 800, 30, 30, 3, 2, false, [1, 1, 1, 0], "mrGrillerGrillSpirits", "burrito,dango,taco,kombucha,cheese,batterysalt", [], { tile: "grilltile" });
		case "delivTruck": return new EnemyDetail(GetDisplayName(name, 1), "md", 30, { dx: 0.1, dy: 0.35, w: 0.35, h: 0.4 }, 800, 30, 30, 3, 2, false, [0, 1, 1, 0], "basic", "battery,app,taco,burrito,cheese,timebomb", [], { tile: "roadtile" });
		case "vendo": return new EnemyDetail(GetDisplayName(name, 1), "md", 31, { dx: 0.05, dy: -0.15, w: 0.4, h: 0.9 }, 800, 30, 30, 3, 2, false, [1, 1, 1, 0], "vendo", "burrito,dango,taco,kombucha,cheese,coffee", []);
		case "hoverdweeb": return new EnemyDetail(GetDisplayName(name, 1), "md", 32, { dx: 0.15, dy: 0.15, w: 0.2, h: 0.6 }, 800, 30, 30, 3, 2, false, [0, 1, 1, 1], "basic", "battery,app,drone,printer,headphones", [], { tile: "cybertile" });
		/* Food2 HQ */
		case "trendyNerd": return new EnemyDetail(GetDisplayName(name, 1), "md", 34, { dx: 0.2, dy: 0.4, w: 0, h: 0.35 }, 800, 30, 30, 4, 5, false, [1, 1, 1, 1], "nernd", "food2bar,food2barChoc,food2bar,lightbulb,app", [ { money: true, min: 0, max: 0 } ], { tile: "conveyor", initFunc: "NERND", turnFunc: "NERND" });
		case "coffeeNerd": return new EnemyDetail(GetDisplayName(name, 1), "md", 35, { dx: 0.25, dy: 0.15, w: 0.05, h: 0.6 }, 800, 30, 30, 4, 5, false, [1, 1, 1, 1], "nernd", "food2bar,food2barChoc,food2bar,drone,battery", [ { money: true, min: 0, max: 0 } ], { tile: "conveyor", initFunc: "NERND", turnFunc: "NERND" });
		case "buffNerd": return new EnemyDetail(GetDisplayName(name, 1), "md", 36, { dx: 0.2, dy: 0.25, w: 0.05, h: 0.5 }, 800, 30, 30, 4, 5, false, [1, 1, 1, 1], "nernd", "food2bar,food2barChoc,food2bar,earbuds,printer", [ { money: true, min: 0, max: 0 } ], { tile: "conveyor", initFunc: "NERND", turnFunc: "NERND" });
		case "tinyNerd": return new EnemyDetail(GetDisplayName(name, 1), "md", 37, { dx: 0.35, dy: 0.55, w: -0.15, h: 0.2 }, 800, 30, 30, 4, 5, false, [1, 1, 1, 1], "nernd", "food2bar,food2barChoc,food2bar,lightbulb,drone", [ { money: true, min: 0, max: 0 } ], { tile: "conveyor", initFunc: "NERND", turnFunc: "NERND" });
		case "theFunnyOne": return new EnemyDetail(GetDisplayName(name, 1), "md", 38, { dx: 0.05, dy: 0.35, w: 0.35, h: 0.4 }, 800, 30, 30, 4, 5, false, [1, 1, 1, 1], "nernd", "food2bar,food2barChoc,food2bar", [ { money: true, min: 0, max: 0 } ], { tile: "conveyor", initFunc: "NERND", turnFunc: "NERND" });
		case "robo4a": return new EnemyDetail(GetDisplayName(name, 1), "sm", 39, { dx: 0, dy: 0.4, w: 0, h: 0.1 }, 800, 30, 30, 3, 2, false, [1, 1, 1, 1], "basic", "battery,app,drone,printer,food2bar,food2barChoc", [ { money: true, min: 0, max: 0 } ]);
		case "robo4b": return new EnemyDetail(GetDisplayName(name, 1), "sm", 40, { dx: 0, dy: 0.25, w: 0, h: 0.25 }, 800, 30, 30, 3, 2, false, [1, 1, 1, 1], "basic", "battery,app,drone,printer,food2bar,food2barChoc", [ { money: true, min: 0, max: 0 } ]);
		case "robo4c": return new EnemyDetail(GetDisplayName(name, 1), "md", 41, { dx: 0, dy: -0.15, w: 0.5, h: 0.9 }, 800, 30, 30, 3, 2, false, [1, 1, 1, 1], "basic", "battery,app,drone,printer,food2bar,food2barChoc", [ { money: true, min: 0, max: 0 } ]);
		case "discuss2": return new EnemyDetail(GetDisplayName(name, 1), "sm", 42, { dx: 0, dy: 0.25, w: 0, h: 0.25 }, 10000, 30, 30, 1, 1, false, [1, 1, 1, 1], "convince2", "", [ { money: true, min: 0, max: 0 } ], { tile: "food2orig", turnFunc: "CONVINCE" });
		case "discuss2big": return new EnemyDetail(GetDisplayName(name, 1), "lg", 15, { dx: 0, dy: 0, w: 1, h: 1.5 }, 1000, 30, 30, 1, 1, false, [1, 1, 1, 1], "hulk", "", [ { money: true, min: 0, max: 0 } ], { tile: "food2orig" });
		case "botMush": return new EnemyDetail(GetDisplayName(name, 1), "md", 43, { dx: 0, dy: 0, w: 0.5, h: 0.75 }, 800, 30, 30, 3, 2, false, [1, 1, 1, 1], "basic", "egg", [ { money: true, min: 0, max: 0 } ]);
		case "botRice": return new EnemyDetail(GetDisplayName(name, 1), "md", 44, { dx: 0, dy: 0, w: 0.5, h: 0.75 }, 800, 30, 30, 3, 2, false, [1, 1, 1, 1], "basic", "egg", [ { money: true, min: 0, max: 0 } ]);
		case "botFruit": return new EnemyDetail(GetDisplayName(name, 1), "md", 45, { dx: 0, dy: 0, w: 0.5, h: 0.75 }, 800, 30, 30, 3, 2, false, [1, 1, 1, 1], "basic", "egg", [ { money: true, min: 0, max: 0 } ]);
		case "botVeggie": return new EnemyDetail(GetDisplayName(name, 1), "md", 46, { dx: 0, dy: 0, w: 0.5, h: 0.75 }, 800, 30, 30, 3, 2, false, [1, 1, 1, 1], "basic", "egg", [ { money: true, min: 0, max: 0 } ]);
		case "theMonster": return new EnemyDetail(GetDisplayName(name, 1), "xl", 12, { dx: 2.3, dy: -0.35, w: 4.35, h: 3.5 }, 10000, 400, 400, 4, 4, true, [1, 0, 0, 0], "basic", "egg", [ { money: true, min: 0, max: 0 } ], { tile: "dirt" });
		case "beckett": return new EnemyDetail(GetDisplayName(name, 1), "md", 47, { dx: 0.3, dy: 0.55, w: -0.1, h: 0.2 }, 10000, 400, 400, 4, 4, true, [0, 0, 0, 1], "basic", "egg", [ { money: true, min: 0, max: 0 } ], { tile: "conveyor" });
		case "nathan": return new EnemyDetail(GetDisplayName(name, 1), "md", 48, { dx: 0.3, dy: 0.55, w: -0.1, h: 0.2 }, 10000, 400, 400, 4, 4, true, [0, 1, 0, 0], "basic", "egg", [ { money: true, min: 0, max: 0 } ]);
		/* Bee Queen */
		case "beeQueenA": return new EnemyDetail(GetDisplayName(name, 1), "md", 49, { dx: 0, dy: 0, w: 0.45, h: 0.65 }, 500, 50, 50, 1, 1, false, [1, 0, 0, 0], "basic", "battery", [ { money: true, min: 0, max: 5 }, { seed: "carrot", min: 0, max: 1 } ], { tile: "_beehive" });
		case "beeQueenB": return new EnemyDetail(GetDisplayName(name, 1), "md", 49, { dx: 0, dy: 0, w: 0.45, h: 0.65 }, 2000, 500, 100, 1, 1, false, [1, 0, 0, 0], "basic", "battery", [ { money: true, min: 0, max: 5 }, { seed: "carrot", min: 0, max: 1 } ], { tile: "_beehive" });
		case "beeQueenC": return new EnemyDetail(GetDisplayName(name, 1), "md", 49, { dx: 0, dy: 0, w: 0.45, h: 0.65 }, 10000, 5000, 200, 1, 1, false, [1, 0, 0, 0], "basic", "battery", [ { money: true, min: 0, max: 5 }, { seed: "carrot", min: 0, max: 1 } ], { tile: "_beehive" });
	}
}
debug.AllEnemies = ["Discussly", "robo", "bigBot", "robo2", "robo3", "ScienceMan", "mouse", "sqorl", "bear", "turky", "bossturky", "Worker", "BossWorker", "kelpBoy", "fishFace", "seaMonk", "seaHandR", "seaMan", "seaHandL", "chickBot", "piggun", "golem", "lawnmower", "machineA", "machineB", "machineC", "machineD", "router", "server", "housekeeper", "outlet", "mrbruno", "mobsty1", "mobsty2", "mobBoss", "dweebLord", "robber", "brownCar", "blueCar", "redCar", "foodTruck", "delivTruck", "vendo", "hoverdweeb", "trendyNerd", "coffeeNerd", "buffNerd", "tinyNerd", "theFunnyOne", "robo4a", "robo4b", "robo4c", "discuss2", "discuss2big", "botMush", "botRice", "botFruit", "botVeggie", "theMonster", "beckett", "nathan", "beeQueenA", "beeQueenB", "beeQueenC"];