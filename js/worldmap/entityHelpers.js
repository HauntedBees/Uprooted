const specialtyHelpers = {
    getLimeItems: function() {
        const items = [];
        if(player.hasItem("lemon")) { items.push("lime.lemon"); }
        if(player.hasItem("banana")) { items.push("lime.banana"); }
        if(player.hasItem("corn")) { items.push("lime.corn"); }
        if(player.hasItem("goldegg")) { items.push("lime.goldegg"); }
        if(items.length > 0) { items.push("lime.nope"); }
        return items;
    },
    getRapItems: function() {
        const items = [];
        if(player.hasItem("garlic")) { items.push("rap.garlic"); }
        if(player.hasItem("rice")) { items.push("rap.rice"); }
        if(player.hasItem("coconut")) { items.push("rap.coconut"); }
        if(items.length > 0) { items.push("lime.nope"); }
        return items;
    },
    getDowelItems: function() {
        const items = [];
        if(player.hasItem("gmocorn")) { items.push("pirateMonkC5"); }
        if(player.hasItem("rice")) { items.push("rap.rice"); }
        if(player.hasItem("chestnut")) { items.push("pirateMonkC4"); }
        if(player.hasItem("shortgrain")) { items.push("pirateMonkC3"); }
        if(player.hasItem("blackrice")) { items.push("pirateMonkC2"); }
        if(player.hasItem("arborio")) { items.push("pirateMonkC1"); }
        if(items.length > 0) { items.push("lime.nope"); }
        return items;
    },
    getCroutonItems: function() {
        const items = [];
        if(player.hasItem("spear")) { items.push("arf.spear"); }
        if(player.hasItem("net")) { items.push("arf.net"); }
        if(player.hasItem("bignet")) { items.push("arf.bignet"); }
        if(player.hasItem("metalrod")) { items.push("arf.metalrod"); }
        if(player.hasItem("ultrarod")) { items.push("arf.ultrarod"); }
        if(items.length > 0) { items.push("lime.nope"); }
        return items;
    },
    getAbuelaItems: function() {
        const items = [];
        if(player.hasItem("fodder")) { items.push("lady.fodder"); }
        if(player.hasItem("corn")) { items.push("lady.corn"); }
        if(player.hasItem("rice")) { items.push("lady.rice"); }
        if(player.hasItem("goodfood")) { items.push("lady.goodfood"); }
        if(items.length > 0) { items.push("lime.nope"); }
        return items;
    },
    getMushItems: function() {
        const items = [];
        if(player.hasItem("milkcap")) { items.push("mushChoice0"); }
        if(player.hasItem("portobello")) { items.push("mushChoice1"); }
        if(player.hasItem("greenshroom")) { items.push("mushChoice2"); }
        if(player.hasItem("poisnshroom")) { items.push("mushChoice3"); }
        if(player.hasItem("notdrugs")) { items.push("mushChoice4"); }
        if(items.length > 0) { items.push("lime.nope"); }
        return items;
    },
    getTruckOptions: function() {
        const options = [];
        if(worldmap.mapName !== "producestand") { options.push("truck.home"); }
        for(let i = 0; i < player.questsCleared.length; i++) {
            switch(player.questsCleared[i]) {
                case "researchLab": if(worldmap.mapName !== "bridge") { options.push("truck.bridge"); } break;
                case "gotTire": if(worldmap.mapName !== "fakefarm") { options.push("truck.fake"); } break;
                case "helpSeaMonster": if(worldmap.mapName !== "outerCity") { options.push("truck.city"); } break;
            }
        }
        options.push("truck.nm");
        return options;
    },
    getHQElevatorOptions: function() {
        const options = [];
        if(player.visitedMaps.indexOf("hq_1") >= 0 && worldmap.mapName !== "hq_1") { options.push("elevator1"); }
        if(player.visitedMaps.indexOf("hq_2") >= 0 && worldmap.mapName !== "hq_2") { options.push("elevator2"); }
        if(player.visitedMaps.indexOf("hq_4") >= 0 && worldmap.mapName !== "hq_4") { options.push("elevator4"); }
        if(options.length < 1) { return null; }
        options.push("elevator0");
        return options;
    }
};

// Standard Entities
function GetCommonEntity(name, x, y, firstx, dir, movement, interact, additional) {
    const big = (additional !== undefined && additional.big);
    const sheet = (additional !== undefined && additional.sheet !== undefined) ? additional.sheet : (big ? "mapcharbig" : "mapchar");
    const len = (additional !== undefined && additional.sheetlen !== undefined) ? additional.sheetlen : 4;
    const res = {
        name: name, visible: true, 
        pos: {x: x, y: y}, startingpos: {x: x, y: y}, solid: true, 
        anim: new MapAnim(sheet, firstx, (additional === undefined ? 0 : (additional.sy || 0)), (big ? 32 : 16), (big ? 40 : 20), dir, len, additional !== undefined ? additional.dontDoThat : false),
        moving: false,
        sx: firstx * (big ? 32 : 16), dir: dir,
        movement: movement, interact: interact
    };
    if(big) { res.anim.big = true; }
    return Object.assign(res, additional);
}
function GetBeehive(hiveId, x, y, inside) {
    return GetCommonEntity(hiveId, x, y, 2, 0, undefined, Cutscene(hiveId), { sy: 4, storageKey: hiveId, noChange: true, isBeehive: true, inside: inside, visible: !inside });
};
function GetMafiaMember(num, x, y, dir, movement) {
    return GetCommonEntity("Mafia" + num, x, y, 12, dir, movement, Cutscene("enemy"), requiredEnemyMetadata.mafia);
}
function GetMafiaMember2(num, x, y, dir) {
    return GetCommonEntity("Mafia" + num, x, y, 12, dir, undefined, Cutscene("enemy"), requiredEnemyMetadata.mafia2);
}

// Invisible Entities
function AutoplayCutscene(cutsceneName) {
    this.boring = true;
    this.name = `cutscene_${cutsceneName}`;
    this.pos = { x: -1, y: -1 };
    this.startingpos = { x: -1, y: -1 };
    this.solid = false;
    this.interact = Cutscene(cutsceneName);
    this.autoplay = true;
}
function CutsceneTrigger(cutsceneName, storageKey) {
    this.boring = true;
    this.name = `trigger_${cutsceneName}`;
    this.pos = { x: -1, y: -1 };
    this.startingpos = { x: -1, y: -1 };
    this.solid = false;
    this.interact = Cutscene(cutsceneName);
    this.storageKey = storageKey;
}
function SwitchMap(name, x, y, row, column, newx, newy, map, showIf) {
    return {
        name: name, solid: false, pos: {x: x, y: y}, isColumn: column, isRow: row, isMapSwitch: true, destination: map, showIf: showIf, 
        interact: [ function() { game.transition(game.currentInputHandler, worldmap, { init: { x: newx,  y: newy }, map: map }); } ]
    }
};
function SwitchMapSeamless(name, x, y, requiredDir, newx, newy) {
    return {
        name: name, solid: false, pos: {x: x, y: y}, seamlessMap: true, 
        interact: [ function() {
            if(worldmap.playerDir !== requiredDir) { return true; }
            let dx = worldmap.pos.x - x, dy = worldmap.pos.y - y;
            switch(requiredDir) {
                case 0: dy += 4; break;
                case 2: dy -= 0.25; break;
            }
            game.transition(game.currentInputHandler, worldmap, { quickTransition: true, newx: newx + dx, newy: newy + dy });
        } ]
    }
};
function EnterShop(name, x, y, shop, shopDir) {
    shopDir = (shopDir === undefined ? directions.DOWN : shopDir);
    return { 
        name: name, solid: false, pos: { x: x, y: y }, isShop: true, shopName: shop, shopDir: shopDir,
        interact: [ (i, e) => {
            switch(e.shopDir) {
                case directions.UP: worldmap.pos.y -= 0.5; break;
                case directions.LEFT: worldmap.pos.x -= 0.5; break;
                case directions.DOWN: worldmap.pos.y += 0.5; break;
                case directions.RIGHT: worldmap.pos.x += 0.5; break;
            }
            worldmap.playerDir = e.shopDir;
            game.transition(game.currentInputHandler, worldmap.shop, shop);
            return true;
        }]
    };
};
function GetInvisibleEntity(name, interact, additional) {
    var res = { name: name, pos: {x: -1, y: -1}, solid: false, interact: interact };
    return Object.assign(res, additional);
};
function GetSign(x, y, text) { return { name: "Sign", pos: {x: x, y: y}, solid: true, visible: false, interact: OneSpeak(text) }; };
function GetCommonInvisibleSpeakingEntity(name, x, y, textKey) { return GetCommonEntity(name, x, y, 0, 0, undefined, OneSpeak(textKey), { visible: false, boring: true }); };
function GetProduceStandBlock(x) {
    const obj = GetCommonInvisibleSpeakingEntity("noPass" + x, x, 23, "farmFirst");
    obj.solid = false;
    obj.showIf = () => !CommonConditions["beatBigBot"]();
    return obj;
}

// Helpers
function FinishAnim() {
    if(worldmap.mapName !== "hq_6") { worldmap.forceMove = false; worldmap.forcedPlayerInfo = false; }
    worldmap.refreshMap();
    worldmap.finishAnimation();
}
function Cutscene(s) { return [ () => iHandler.Start(s) ]; }
function OneSpeak(t) { return [ (i, e) => { iHandler.isFirst = true; worldmap.writeText(t); } ]; }
function GetItemDisplayName(name, plural) { // TODO: move this fucker to the language parsing shit
    const pluralSuf = plural ? "s" : "";
    switch(name[0]) {
        case "_": return GetFarmInfo(name).displayname + pluralSuf; break;
        case "!": return GetEquipment(name).displayname + pluralSuf; break;
        default: 
            const cropInfo = GetCrop(name);
            let nam = cropInfo.displayname;
            if(["veg", "tree", "mush"].indexOf(cropInfo.type) >= 0) { nam += " Seed"; }
            return nam + pluralSuf;
            break;
    }
}

// RF Doors
function ToggleRFDoors(type) {
    mapStates[worldmap.mapName].rf[type] = !mapStates[worldmap.mapName].rf[type];
    for(let i = 0; i < worldmap.entities.length; i++) {
        if(worldmap.entities[i].rfd && worldmap.entities[i].type === type) {
            const newActive = !worldmap.entities[i].active;
            worldmap.entities[i].active = newActive;
            worldmap.entities[i].anim.shiftY(newActive ? 3 : 2);
            worldmap.entities[i].solid = !newActive;
        }
    }
}
function GetRFDoorButton(name, x, y, type, isDown) {
    return GetCommonEntity(name, x, y, 15 + type, 0, undefined, [ function() { 
        game.target.active = !game.target.active;
        game.target.anim.shiftY(game.target.active ? 1 : 0);
        ToggleRFDoors(game.target.type);
        worldmap.finishDialog();
    } ], { sy: (isDown ? 1 : 0), active: isDown, initActive: isDown, type: type, noChange: true, rf: true });
}
function GetRFDoor(name, x, y, type, isDown) {
    return GetCommonEntity(name, x, y, 15 + type, 0, undefined, undefined, { sy: (isDown ? 3 : 2), active: isDown, initActive: isDown, type: type, solid: !isDown, rfd: true });
}

// Treasure Chests
function ForceChestOpen(e) { e.open = true; e.anim.shiftY(5); }
function GetTreasureChest(name, x, y, contents) {
    return GetCommonEntity(name, x, y, 13, 0, undefined, [function() {
        if(game.target.open) {
            worldmap.writeText("openchest");
        } else {
            const conts = game.target.contents;
            const clen = conts.length - 1;
            let contentString = "";
            let hasRoom = true;
            if(clen === 0) {
                contentString = conts[0][1] + " " + GetItemDisplayName(conts[0][0], conts[0][1] > 1);
                hasRoom = player.increaseItem(conts[0][0], 0);
                
            } else {
                for(let i = clen; i >= 0; i--) {
                    const itdata = conts[i]; // format = [itemname, amount]
                    if(i === 0) {
                        contentString += " and ";
                    } else if(i !== clen) {
                        contentString += ", ";
                    }
                    contentString += itdata[1] + " " + GetItemDisplayName(itdata[0], itdata[1] > 1);
                    hasRoom &= player.increaseItem(itdata[0], 0);
                    if(!hasRoom) { break; }
                }
            }
            if(hasRoom) {
                game.target.open = true;
                game.target.anim.shiftY(5);
                if(clen === 0) {
                    player.increaseItem(conts[0][0], conts[0][1]);
                } else {
                    for(let i = clen; i >= 0; i--) {
                        const itdata = conts[i];
                        player.increaseItem(itdata[0], itdata[1]);
                    }
                }
                player.openedChests.push(game.target.name);
            } else {
                iHandler.state.texts = ["closedchestinvfull"];
            }
            worldmap.writeText("closedchest", undefined, false, contentString);
        }
    }], { sy: 4, open: false, contents: contents, noChange: true, isChest: true });
}
function GetIndoorTreasureChest(name, x, y, contents) {
    const chest = GetTreasureChest(name, x, y, contents);
    chest.inside = true;
    chest.visible = false;
    return chest;
}

// HQ3 Ceilings
function GetChungusDoor(num, x, y, chungi, visState) {
    const chungy = { name: "chungusdoor" + num, pos: { x: x, y: y }, solid: false, interact: [ ToggleChungus ], chungi: chungi, boring: true };
    if(visState !== undefined) {
        chungy.noChange = true;
        chungy.anim = new MapAnim("mapchar", 15, 9, 16, 20, visState, 4);
        chungy.visible = true;
    } else {
        chungy.visible = false;
    }
    return chungy;
}
function GetChungus(id, num, x, y, w, h) { return { name: "chungus" + id + "_" + num, chungus: true, chungusId: id, pos: { x: x, y: y }, width: w, height: h, visible: true, boring: true }; }
function ToggleChungus(arg, target) {
    const acceptableChungi = target.chungi;
    for(let i = worldmap.entities.length - 1; i >= 0; i--) {
        if(!worldmap.entities[i].chungus) { continue; }
        worldmap.entities[i].visible = (acceptableChungi.indexOf(worldmap.entities[i].chungusId) < 0);
    }
    if(acceptableChungi.length === 1) { worldmap.horRor.playerRoom = acceptableChungi[0]; }
    worldmap.refreshMap();
    worldmap.finishDialog();
}

// Waterfalls
function AdvanceWaterfall() {
    const lastDir = game.target.dir;
    let newDir = -1;
    for(let i = 0; i < worldmap.entities.length; i++) {
        const e = worldmap.entities[i];
        if(!e.solid && e.pos.x === Math.round(worldmap.pos.x) && e.pos.y === Math.round(worldmap.pos.y)) {
            game.target = e;
            if(game.target.isEnd) {
                ExitWaterfall();
                return;
            }
            if(e.dir === lastDir) {
                newDir = lastDir;
                break;
            } else if(newDir != lastDir) {
                newDir = e.dir;
            }
        }
    }
    let x = 0, y = 0;
    switch(newDir) {
        case 0: y--; break;
        case 1: x--; break;
        case 2: y++; break;
        case 3: x++; break;
    }
    worldmap.pos.x += x / 4;
    worldmap.pos.y += y / 4;
    worldmap.playerDir = (worldmap.playerDir + 1) % 3;
    worldmap.refreshMap();
}
function EnterWaterfall() {
    worldmap.inWaterfall = true;
    worldmap.waterfallIdx = setInterval(AdvanceWaterfall, timers.FULLANIM * 4);
}
function ExitWaterfall() {
    clearInterval(worldmap.waterfallIdx);
    worldmap.finishDialog();
    worldmap.inWaterfall = false;
}
function PushRock() {
    if(game.target.donePushing) {
        worldmap.finishDialog();
        return;
    }
    if(worldmap.playerDir !== game.target.pushDir) {
        worldmap.writeText("rockwrong");
        return;
    }
    worldmap.animIdx = setInterval(function() {
        let success = false;
        switch(game.target.pushDir) {
            case 0: game.target.pos.y -= 0.025; success = game.target.pos.y <= (game.target.inity - 1); break;
            case 1: game.target.pos.x -= 0.025; success = game.target.pos.x <= (game.target.initx - 1); break;
            case 2: game.target.pos.y += 0.025; success = game.target.pos.y >= (game.target.inity + 1); break;
            case 3: game.target.pos.x += 0.025; success = game.target.pos.x >= (game.target.initx + 1); break;
        }
        worldmap.refreshMap();
        if(success) {
            game.target.donePushing = true;
            for(let i = worldmap.entities.length - 1; i >= 0; i--) {
                if(worldmap.entities[i].wfid === game.target.killid) {
                    player.clearedEntities.push(worldmap.entities[i].name);
                    worldmap.entities.splice(i, 1);
                } else if(worldmap.entities[i].wfid === (game.target.killid + "X")) {
                    player.clearedEntities.push(worldmap.entities[i].name);
                    worldmap.entities[i].interact = undefined;
                }
            }
            FinishAnim();
        }
    }, 10);
}
function PushTechRock() {
    if(game.target.donePushing) { worldmap.finishDialog(); return; }
    game.target.donePushing = true;
    game.target.dir += 1;
    for(let i = worldmap.entities.length - 1; i >= 0; i--) {
        if(worldmap.entities[i].wfid === game.target.killid) {
            player.clearedEntities.push(worldmap.entities[i].name);
            worldmap.entities.splice(i, 1);
        } else if(worldmap.entities[i].wfid === (game.target.killid + "X")) {
            player.clearedEntities.push(worldmap.entities[i].name);
            worldmap.entities[i].interact = undefined;
        }
    }
    worldmap.refreshMap();
    worldmap.finishDialog();
}
function GetRock(name, x, y, dir, wfid) {
    return new GetCommonEntity(name, x, y, 12, 0, undefined, [PushRock], { noChange: true, pushDir: dir, sy: 7, killid: wfid, initx: x, inity: y, isRock: true });
}
function GetTechRock(name, x, y, dir, wfid) {
    return new GetCommonEntity(name, x, y, 22, 0, undefined, [PushTechRock], { noChange: true, sy: (dir == 0 ? 10 : 9), killid: wfid, isRock: true });
}
function GetWaterfall(name, x, y, dir, wfid, tech) {
    return new GetCommonEntity(name, x, y, 18, dir, undefined, [EnterWaterfall], { sy: (tech ? (wfid[1] === "X" ? 6: 7) : 0), sheetlen: (tech ? 2 : 4), moving: (!tech || wfid[1] !== "X"), dontDoThat: true, solid: false, wfid: wfid, isWaterfall: true, boring: (name.replace("waterfall" + wfid, "") !== "0") });
}
function GetWaterfallEnd(name, x, y, dir, wfid, tech) {
    return new GetCommonEntity(name, x, y, 18, dir, undefined, undefined, { sy: (tech ? 9 : 4), sheetlen: 2, moving: true, dontDoThat: true, solid: false, isEnd: true, wfid: wfid, boring: true });
}

// Foreground & Jumbo Covers
function GetForeground(mapname, yoffset, width) {
    return { name: "fg" + mapname, img: "foregrounds/" + mapname, visible: true, yoff: yoffset, width: width, isForeground: true, pos: { x: 0, y: 0 } };
}
function GetJumbo(id, img, x, y, w, h, ox, oy) {
    return { name: id, storageKey: id, jumbo: true, filename: "covers/" + img, visible: true, w: w, h: h, offset: { x: ox, y: oy }, pos: { x: x, y: y }, boring: true };
}
function GetJumboToggle(id, x, y, enter) {
    return GetCommonEntity((enter ? "Enter" : "Exit") + id, x, y, 0, 0, undefined, [enter ? JumboEntrance : JumboExit], { visible: false, solid: false, boring: true });
}
function JumboEntrance() { JumboToggle(true); }
function JumboExit() { JumboToggle(false); }
function JumboToggle(inside) {
    worldmap.forceEndDialog = true;
    mapStates[worldmap.mapName].inside = inside;
    for(let i = 0; i < worldmap.entities.length; i++) {
        if(worldmap.entities[i].inside) { worldmap.entities[i].visible = inside; }
        else if(worldmap.entities[i].jumbo) { worldmap.entities[i].visible = !inside; }
    }
    worldmap.finishDialog();
}

// Enemy and Movement Data
const requiredEnemyMetadata = {
    // Farm
    robo: { interactname: "robo", dialogMax: 5, setEnemies: ["robo"], isRobo: true },
    roboDouble: { interactname: "robo", dialogMax: 5, setEnemies: ["robo", "robo"], isRobo: true },
    // Forest
    turky: { interactname: "turky", dialogMax: 3, setEnemies: ["turky"], sy: 7 },
    // Below Village & Research Lab
    robo2: { interactname: "research", dialogMax: 5, setEnemies: ["robo2"], sy: 4 },
    // Underwater
    seamonk: { interactname: "seamonk", dialogMax: 8, setEnemies: ["seaMonk"], sy: 8, sheetlen: 2 },
    // Fake Farm
    mower: ct => ({ sy: 10, noChange: true, changeType: ct, sheetlen: 2, visible: false, inside: true }),
    // South City
    mafia2: { mafia: true, interactname: "wildmobsty", dialogMax: 7, setEnemies: ["mobsty2", "mobsty2", "mobsty2"], sy: 10, inside: true, fov: true, visible: false },
    mafia: { mafia: true, interactname: "wildmobsty", dialogMax: 7, setEnemies: ["mobsty1", "mobsty1"], sy: 10, fov: true },
    // HQ 1
    roboGuard: { interactname: "wowNewRobot", dialogMax: 10, setEnemies: ["robo4a", "robo4b", "robo4c"], sy: 15 },
    tinyNerd: { interactname: "tinyNerd", dialogMax: 5, setEnemies: ["tinyNerd"], sy: 14 },
    // HQ 2
    buffNerd: { interactname: "buffNerd", dialogMax: 3, setEnemies: ["buffNerd", "buffNerd", "buffNerd"], sy: 1, sheetlen: 2, moving: true },    
    // HQ 4
    prophet: type => ({ interactname: "prophet", dialogMax: 4, setEnemies: ["bot" + type], sy: 18, noChange: true, noRunKill: true })
};
const commonMovementDatas = {
    fuckinBottle: function(x, y, w, h, initState) { return { 
            state: (initState || 0), loop: true, 
            points: [ { x: x, y: y + h, dx: 0, dy: 1 }, { x: x + w, y: y + h, dx: 1, dy: 0 }, { x: x + w, y: y, dx: 0, dy: -1 }, { x: x, y: y, dx: -1, dy: 0 } ],
            speed: function(e) {
                switch(e.dir) {
                    case 2: return 0.05;
                    case 1:
                    case 3: return 0.0125;
                    case 0: return Math.random();
                    default: return 0.025;
                }
            }
        } },
    robo: function(x, initState) { return { state: (initState || 0), speed: 0.025, loop: true, points: [ { x: x, y: 16, dx: 0, dy: 1 }, { x: x, y: 8, dx: 0, dy: -1 } ] } },
    line: function(x, y, w, initState) { return { state: (initState || 0), speed: 0.025, loop: true, 
        points: [ { x: x + w, y: y, dx: 1, dy: 0 }, { x: x, y: y, dx: -1, dy: 0 } ] } },
    vertline: function(x, y, h, initState) { return { state: (initState || 0), speed: 0.025, loop: true, 
        points: [ { x: x, y: y + h, dx: 0, dy: 1 }, { x: x, y: y, dx: 0, dy: -1 } ] } },
    rectangle: function(x, y, w, h, initState) { return { state: (initState || 0), speed: 0.025, loop: true, 
        points: [ { x: x + w, y: y, dx: 1, dy: 0 }, { x: x + w, y: y + h, dx: 0, dy: 1 }, { x: x, y: y + h, dx: -1, dy: 0 }, { x: x, y: y, dx: 0, dy: -1 } ] } },
    downrectangle: function(x, y, w, h, initState) {  return { state: (initState || 0), speed: 0.025, loop: true, 
        points: [ { x: x, y: y + h, dx: 0, dy: 1 }, { x: x + w, y: y + h, dx: 1, dy: 0 }, { x: x + w, y: y, dx: 0, dy: -1 }, { x: x, y: y, dx: -1, dy: 0 } ] } },
    fastdownrect: function(x, y, w, h, initState) { var r = commonMovementDatas.downrectangle(x, y, w, h, initState); r.speed *= 3; return r; }
};
function GetStdMovement(points) {
    const newPoints = [];
    for(let i = 0; i < points.length; i++) {
        const dir = points[i][2];
        let dx = 0, dy = 0;
        switch(dir) {
            case 0: dy = -1; break;
            case 1: dx = -1; break;
            case 2: dy = 1; break;
            case 3: dx = 1; break;
        }
        newPoints.push({ x: points[i][0], y: points[i][1], dx: dx, dy: dy });
    }
    return { state: 0, speed: 0.025, loop: true, points: newPoints };
}