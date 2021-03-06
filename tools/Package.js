const UglifyJS = require("uglify-js");
const path = require("path");
const fs = require("fs");
const files = [
    "js/debug/enemyCursorTest.js",
    "js/gamedata/consts.js",
    "js/gamedata/achievements.js",
    "js/gamedata/animals.js",
    "js/gamedata/veggies.js",
    "js/gamedata/equipment.js",
    "js/gamedata/fixtures.js",
    "js/gamedata/enemies.js",
    "js/gamedata/enemy_patterns.js",
    "js/gamedata/shops.js",
    "js/gamedata/quests.js",
    "js/gamedata/spritedata.js",
    "js/gamedata/misc.js",
    "js/textHelpers.js",
    "js/gamedata/text.js",
    "js/gamedata/cutscenes.js",
    "js/animation/animController.js",
    "js/input.js",
    "js/combat/combat.js",
    "js/combat/battletransition.js",
    "js/combat/enemyParser.js",
    "js/combat/combatcropfuncs.js",
    "js/animation/cursorAnim.js",
    "js/animation/combatAnim.js",
    "js/animation/animDatas.js",
    "js/animation/combatAnimNew.js",
    "js/combat/calculations.js",
    "js/combat/enemyInitFuncs.js",
    "js/combat/combatmenu.js",
    "js/combat/combatplant.js",
    "js/combat/combatenemyturn.js",
    "js/combat/combatcompost.js",
    "js/combat/combatselectenemy.js",
    "js/combat/combatinbetween.js",
    "js/combat/tutorial.js",
    "js/combat/wacg.js",
    "js/lib/gamepad.js",
    "js/main.js",
    "js/sound.js",
    "js/opening/abee.js",
    "js/animation/mapAnims.js",
    "js/worldmap/cutsceneParser.js",
    "js/worldmap/cavemap.js",
    "js/worldmap/worldmap.js",
    "js/worldmap/entityHelpers.js",
    "js/worldmap/entitySaveData.js",
    "js/worldmap/credits.js",
    "js/worldmap/title.js",
    "js/playerstats/optionsMenu.js",
    "js/worldmap/shop.js",
    "js/worldmap/collisions.js",
    "js/worldmap/cavecollisions.js",
    "js/worldmap/entityLoader.js",
    "js/worldmap/entities.js",
    "js/worldmap/smartphone.js",
    "js/worldmap/horRor.js",
    "js/worldmap/falconSelect.js",
    "js/worldmap/inventoryClean.js",
    "js/worldmap/fixTut.js",
    "js/opening/pottyCheck.js",
    "js/playerstats/pausemenu.js",
    "js/playerstats/noFun.js",
    "js/playerstats/chievosmenu.js",
    "js/playerstats/viewinventory.js",
    "js/playerstats/equipment.js",
    "js/playerstats/farmmod.js",
    "js/playerstats/savemenu.js",
    "js/playerstats/tobytern.js",
    "js/player.js",
    "js/rendering.js",
    "js/lib/lz-string.js"
];

const args = process.argv.slice(2), minify = args[0] === "min";
console.log(minify ? "Minifying Code" : "Combining Files");

const version = Math.floor(Math.random() * 100);
const params = { "vNum": `console.log(${version});` };
console.log(" - Reading Files");
Promise.all(files.map(f => fs.promises.readFile(path.join(__dirname, "../", f), "utf8"))).then(arr => {
    if(minify) {
        console.log(" - Minifying");
        arr.forEach((d, i) => params["file" + i] = d);
        fs.writeFileSync(path.join(__dirname, "../out.min.js"), UglifyJS.minify(params, {
            compress: { dead_code: false }
        }).code);
    } else {
        console.log(" - Combining");
        const string = [params["vNum"], ...arr].join("\r\n");
        fs.writeFileSync(path.join(__dirname, "../out.js"), string);
    }
    console.log(" - Completed");
    console.log("New Version: " + version);
});
