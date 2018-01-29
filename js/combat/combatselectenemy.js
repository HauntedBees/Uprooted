combat.selectTarget = {
    cursorx: 0, canSickle: false, canHumans: true, dy: 8, 
    sicklePos: {x: -1, y: -1}, targets: [], maxTargets: 0, 
    layersToClear: ["menucursorA", "menucursorB", "menutext"],
    // Setup/Display Logic
    setup: function(args) {
        this.cursorx = 0;
        this.sicklePos = {x: -1, y: -1};
        if(combat.isFalcon) {
            this.canSickle = true;
            this.canHumans = true;
        } else {
            this.canSickle = player.canSickleCrops();
            this.canHumans = !args.isMelee || player.canAttackPeople();
        }
        if(!this.canHumans) { this.sicklePos = {x: combat.enemydx, y: (combat.enemyheight - 1 + combat.enemydy)}; }
        this.targets = [];
        var numAttacks = args.numAttacks || 1;
        if(this.canHumans && numAttacks >= combat.enemies.length && (!this.canSickle || this.enemyGridIsEmpty())) {
            for(var i = 0; i < combat.enemies.length; i++) { this.targets.push(i); }
            this.Attack();
        } else {
            this.maxTargets = numAttacks;
            this.drawAll();
        }
    },
    enemyGridIsEmpty: function() {
        for(var x = 0; x < combat.enemywidth; x++) {
            for(var y = 0; y < combat.enemyheight; y++) {
                if(combat.enemyGrid[x][y] !== null) { return false; }
            }
        }
        return true;
    },
    drawAll: function() {
        gfx.clearSome(this.layersToClear);
        if(combat.isFalcon) {
            combat.animHelper.SetBirdAnimInfo([[2, 0]]);
            combat.animHelper.SetPlayerAnimInfo([[5, 0]]);
        } else {
            combat.animHelper.SetBirdAnimInfo([[0, 0]]);
            combat.animHelper.SetPlayerAnimInfo([[2, 0]]);
        }
        for(var i = 0; i < this.targets.length; i++) {
            var idx = this.targets[i];
            if(idx.x === undefined) {
                var cursorInfo = combat.animHelper.GetCursorInfo(idx);
                gfx.drawCursor(cursorInfo.x, cursorInfo.y, cursorInfo.w, cursorInfo.h, "xcursor");
            } else {
                gfx.drawCursor(idx.x, idx.y, 0, 0, "xcursor");
            }
        }
        if(this.sicklePos.x >= 0) {
            var crop = combat.enemyGrid[this.sicklePos.x - combat.enemydx][this.sicklePos.y - combat.enemydy];
            if(crop === null) {
                gfx.drawCursor(this.sicklePos.x, this.sicklePos.y, 0, 0, "bcursor");
            } else {
                if(crop.x !== undefined) { crop = combat.enemyGrid[crop.x][crop.y]; }
                gfx.drawCursor(this.sicklePos.x, this.sicklePos.y, crop.size - 1, crop.size - 1);
            }
        } else {
            var cursorInfo = combat.animHelper.GetCursorInfo(this.cursorx);
            gfx.drawCursor(cursorInfo.x, cursorInfo.y, cursorInfo.w, cursorInfo.h);
        }
        combat.menu.highlightReadyCropsAndReturnCount();
        gfx.drawInfobox(9, 1.5, this.dy);
        if(this.sicklePos.x >= 0) {
            var crop = combat.enemyGrid[this.sicklePos.x - combat.enemydx][this.sicklePos.y - combat.enemydy];
            if(crop === null) {
                gfx.drawWrappedText("", me.INFOBOXWIDTH * 16, 11 + (this.dy * 16), 85);
            } else {
                if(crop.x !== undefined) { crop = combat.enemyGrid[crop.x][crop.y]; }
                gfx.drawWrappedText(crop.name, me.INFOBOXWIDTH * 16, 11 + (this.dy * 16), 85);
            }
        } else {
            gfx.drawWrappedText(combat.enemies[this.cursorx].name, me.INFOBOXWIDTH * 16, 11 + (this.dy * 16), 85);
        }
        combat.animHelper.DrawBottom();
    },
    clean: function() { gfx.clearSome(this.layersToClear); },
    cancel: function() { game.innerTransition(this, combat.menu); return true; },
    
    // Selecting Logic
    keyPress: function(key) {
        var pos = { 
            x: (this.sicklePos.x < 0 ? (this.cursorx + (11 - combat.enemies.length)) : this.sicklePos.x), 
            y: (this.sicklePos.y < 0 ? 8 : this.sicklePos.y)
        };
        var isEnter = false;
        var prevy = pos.y;
        switch(key) {
            case player.controls.left: pos.x--; break;
            case player.controls.right: pos.x++; break;
            case player.controls.up: pos.y--; break;
            case player.controls.down: pos.y++; break;
            case player.controls.confirm:
            case player.controls.pause: isEnter = true; break;
            case player.controls.cancel: return this.cancel();
        }
        if(pos.y === 7 && prevy === 8) {
            pos.x = combat.enemydx;
            pos.y = combat.enemyheight - 1 + combat.enemydy;
        }
        if(pos.y == (combat.enemyheight + combat.enemydy)) {
            if(!this.canHumans) { return false; }
            this.sicklePos = { x: -1, y: -1 };
            pos = { x: (this.cursorx + 11 - combat.enemies.length), y: 8 };
        }
        if(isEnter) {
            return this.click(pos);
        } else {
            return this.mouseMove(pos);
        }
    },
    mouseMove: function(pos) {
        var newx = pos.x - (11 - combat.enemies.length);
        if(pos.y === 8) {
            if(!this.canHumans) { return false; }
            this.sicklePos = {x: -1, y: -1};
            if(newx < 0) { return false; }
            if(newx >= combat.enemies.length) { return false; }
            if(pos.y < 2) { return false; }
            this.cursorx = newx;
        } else {
            if(!this.canSickle) { return false; }
            var dpos = { x: pos.x - combat.enemydx, y: pos.y - combat.enemydy };
            if(dpos.x < 0 || dpos.y < 0 || dpos.x >= combat.enemywidth || dpos.y >= combat.enemyheight) { return false; }
            var cropObj = combat.enemyGrid[dpos.x][dpos.y];
            var doSicklePos = true;
            if(cropObj !== null && cropObj.x !== undefined) {
                var newpos = { x: cropObj.x + combat.enemydx, y: cropObj.y + combat.enemydy };
                if(this.sicklePos.x === newpos.x && this.sicklePos.y === newpos.y) {
                    pos.x += (pos.x - this.sicklePos.x);
                    pos.y += (pos.y - this.sicklePos.y);
                    if(pos.y == (combat.enemyheight + combat.enemydy)) {
                        if(!this.canHumans) { return false; }
                        this.sicklePos = { x: -1, y: -1 };
                        pos = { x: (this.cursorx + 11 - combat.enemies.length), y: 8 };
                        return this.mouseMove(pos);
                    }
                    if((pos.x - combat.enemydx) >= combat.enemywidth) { return false; }
                } else { pos.x = newpos.x; pos.y = newpos.y; }
            }
            if(doSicklePos) { this.sicklePos = pos; }
        }
        this.drawAll();
        return true;
    },
    click: function(pos) {
        var doAttack = false;
        if(this.sicklePos.x >= 0) {
            var cropPos = {x: this.sicklePos.x - combat.enemydx, y: this.sicklePos.y - combat.enemydy};
            var crop = combat.enemyGrid[cropPos.x][cropPos.y];
            if(crop === null) { return false; }
            doAttack = this.toggleTarget(this.sicklePos, true);
        } else {
            doAttack = this.toggleTarget(this.cursorx, false);
        }
        if(doAttack) { this.Attack(); }
        else { this.drawAll(); }
    },
    toggleTarget: function(idx, isPoint) {
        for(var i = 0; i < this.targets.length; i++) {
            var sel = this.targets[i];
            var same = false;
            if(isPoint) {
                if(sel.x === undefined) { continue; }
                same = (sel.x === idx.x && sel.y === idx.y);
            } else {
                if(sel.x !== undefined) { continue; }
                same = (sel === idx);
            }
            if(same) {
                this.targets.splice(i, 1);
                return false;
            }
        }
        this.targets.push(idx);
        return (this.targets.length === this.maxTargets);
    },

    // Attacking Logic
    Attack: function() {
        var allAttacks = this.GetAttackDetails();
        var damagetext = "";
        var additionalTargets = [];

        var hasKills = false, hasDestroys = false, hasRecoil = false;
        var hasAnimals = false, hasStuns = false;
        var avgDamage = 0, lastTargetName = "";
        var targArr = this.targets.length > 1;
        if(targArr) { combat.lastTarget = []; }
        var postHit = null;
        for(var i = 0; i < this.targets.length; i++) {
            var targetidx = this.targets[i];
            var attackData = allAttacks[i];
            
            if(targArr) { combat.lastTarget.push(targetidx); } // TODO: is this good?
            else { combat.lastTarget = 0; }

            if(targetidx.x !== undefined) {
                var cropPos = {x: targetidx.x - combat.enemydx, y: targetidx.y - combat.enemydy};
                var crop = combat.enemyGrid[cropPos.x][cropPos.y];
                if(crop === null) { continue; }
                if(crop.x !== undefined) { // this is a size 2 crop
                    cropPos = {x: crop.x, y: crop.y};
                    crop = combat.enemyGrid[crop.x][crop.y];
                }

                combat.lastTargetCrop = false; // TODO: uh?
                lastTargetName = GetText("cropWithDefArticle").replace(/\{0\}/g, crop.displayname); // TODO: hmm
                attackData.animals = []; // TODO: ?

                avgDamage += attackData.damage;
                crop.health -= attackData.damage;
                crop.power -= attackData.cropPowerLower;

                if(crop.health <= 0) {
                    hasDestroys = true;
                    crop.hidden = true;
                    crop.flagged = true;
                    combat.animHelper.DrawCrops();
                    combat.animHelper.AddAnim(new SheetAnim(combat.enemydx + cropPos.x, combat.enemydy + cropPos.y, 250, "puff", 5));
                    // TODO: should this part be here?
                    /*if(crop.size == 2) {
                        combat.enemyGrid[cropPos.x + 1][cropPos.y] = null;
                        combat.enemyGrid[cropPos.x][cropPos.y + 1] = null;
                        combat.enemyGrid[cropPos.x + 1][cropPos.y + 1] = null;
                    }
                    combat.enemyGrid[cropPos.x][cropPos.y] = null;
                    */
                }
            } else {
                combat.lastTargetCrop = false;
                var target = combat.enemies[targetidx];
                lastTargetName = target.name;

                var finalDamage = attackData.damage;
                if(target.addtlHitCheck !== undefined) { finalDamage = addtlHitChecks[target.addtlHitCheck](attackData.crops, finalDamage); }
                avgDamage += finalDamage;
                combat.damageEnemy(targetidx, finalDamage);
                if(target.health <= 0) { hasKills = true; }

                if(attackData.animals.length > 0) { hasAnimals = true; }
                if(attackData.stunLength > 0) {
                    var stunResistCheck = (Math.random() < combat.enemies[targetidx].stickRes);
                    if(!stunResistCheck) {
                        hasStuns = true;
                        combat.enemies[targetidx].stickRes += 0.025;
                        combat.stickEnemy(targetidx, attackData.stunLength);
                    }
                }
                if(target.postHit !== undefined) { postHit = postHits[target.postHit](target); }

                if(attackData.numCrops > 3 && combat.enemies.length > 1) {
                    var recoilDamage = Math.ceil(finalDamage * 0.15);
                    while((Math.random() * player.luck * attackData.numCrops--) > 0.9) {
                        var idx = Range(0, combat.enemies.length);
                        if(idx === targetidx) { idx = (idx + 1) % combat.enemies.length; }
                        additionalTargets.push(idx);
                        combat.damageEnemy(idx, recoilDamage);
                        hasRecoil = true;
                    }
                }
            }
        }
        avgDamage = Math.floor(avgDamage / this.targets.length);
        
        if(allAttacks[0].knockback > 0) { player.health = Math.max(player.health - allAttacks[0].knockback, 1); }
        var damagetext = this.GetDamageText(allAttacks[0].crit, hasAnimals,  hasRecoil, hasKills, hasDestroys, hasStuns, 
                                            combat.isFalcon, avgDamage, lastTargetName, this.targets.length > 1, allAttacks[0].knockback);

        if(combat.isFalcon) {
            combat.animHelper.SetBirdAnimInfo([[2, 1], [3, 1], [2, 1], [3, 1, true]], undefined, undefined, undefined, GetFrameRate(12));
        } else {
            combat.animHelper.SetPlayerAnimInfo([[1, 2], [1, 2], [1, 3], [0, 0, true]], undefined, undefined, undefined, GetFrameRate(12));
        }
        combat.flagFreshCrops(true, allAttacks[0].crit, allAttacks[0].animals, additionalTargets);

        if(postHit === null) { postHit = function() { combat.endTurn(combat.inbetween); }; }
        game.innerTransition(this, combat.inbetween, { next: postHit, text: damagetext });
        return true;
    },
    GetAttackDetails: function() {
        var myCrops = [];
        for(var x = 0; x < player.gridWidth; x++) {
            for(var y = 0; y < player.gridHeight; y++) {
                var tile = combat.grid[x][y];
                if(tile === null || tile.x !== undefined) { continue; }
                if(tile.name === "app") { if(tile.activeTime > 2) { continue; } }
                else if(tile.rotten || tile.activeTime > 0) { continue; }
                myCrops.push(tile);
            }
        }
        var targetParams = [];
        for(var i = 0; i < this.targets.length; i++) {
            if(this.targets[i].x === undefined) { // enemy
                targetParams.push(combat.enemies[this.targets[i]].def);
            } else { // crop
                var x = this.targets[i].x - combat.enemydx;
                var y = this.targets[i].y - combat.enemydy;
                targetParams.push(combat.enemyGrid[x][y]);
            }
        }
        if(myCrops.length === 0) { return dmgCalcs.MeleeAttack(true, combat.season, player.atk, targetParams, -1); }
        else { return dmgCalcs.CropAttack(true, combat.season, player.atk, myCrops, targetParams, -1); }
    },
    GetDamageText: function(criticalHit, hasAnimals, hasRecoil, hasKills, hasDestroys, stunningEnemies, isFalcon, damage, target, multipleTargets, selfHarm) {
        var damagetext = GetText("attackMessageStruct");
        if(criticalHit) { damagetext = damagetext.replace(/\{crit\}/g, GetText("critPrefix")); }
        else { damagetext = damagetext.replace(/\{crit\}/g, ""); }

        if(hasAnimals) { damagetext = damagetext.replace(/\{subject\}/g, GetText("subject_nature")); }
        else if(isFalcon) { damagetext = damagetext.replace(/\{subject\}/g, GetText("subject_falcon")); }
        else { damagetext = damagetext.replace(/\{subject\}/g, GetText("subject_you")); }

        if(isFalcon) { damagetext = damagetext.replace(/\{object\}/g, GetText("obj_thirdperson")); }
        else { damagetext = damagetext.replace(/\{object\}/g, GetText("obj_secondperson")); }

        var suffix = (multipleTargets ? "_pl" : "_sing");
        damagetext = damagetext.replace(/\{objectmult\}/g, GetText("obj" + suffix));
        damagetext = damagetext.replace(/\{amount\}/g, GetText("amount" + suffix));
        
        if(hasRecoil) { damagetext = damagetext.replace(/\{recoil\}/g, GetText("recoil" + suffix)); }
        else { damagetext = damagetext.replace(/\{recoil\}/g, ""); }
        
        var allEnemiesDead = false;
        if(hasKills) {
            allEnemiesDead = true;
            for(var i = 0; i < combat.enemies.length; i++) { if(combat.enemies[i].health > 0) { allEnemiesDead = false; break; } }
        }

        if(multipleTargets) {
            if(allEnemiesDead) { damagetext = damagetext.replace(/\{casualties\}/g, GetText("kill_all_pl")); }
            else if(hasKills || hasDestroys) { damagetext = damagetext.replace(/\{casualties\}/g, GetText("kill_some_pl")); }
            else { damagetext = damagetext.replace(/\{casualties\}/g, GetText("kill_none_pl")); }

            if(stunningEnemies && !allEnemiesDead) { damagetext = damagetext.replace(/\{sticky\}/g, GetText("sticky_some")); }
            else { damagetext = damagetext.replace(/\{sticky\}/g, GetText("sticky_none")); }
        } else {
            if(hasKills) { damagetext = damagetext.replace(/\{casualties\}/g, GetText("kill_defeatthey_sing")); } // TODO: account for unique defeats
            else if(hasDestroys) { damagetext = damagetext.replace(/\{casualties\}/g, GetText("kill_crop_sing")); }
            else { damagetext = damagetext.replace(/\{casualties\}/g, GetText("kill_none_sing")); }

            if(stunningEnemies && !allEnemiesDead) { damagetext = damagetext.replace(/\{sticky\}/g, GetText("sticky_some")); }
            else { damagetext = damagetext.replace(/\{sticky\}/g, GetText("sticky_none")); }
        }
        damagetext = damagetext.replace(/\{dmg\}/g, damage).replace(/\{target\}/g, target);

        if(selfHarm > 0) { damagetext = damagetext.replace(/\{gloves\}/g, GetText("gloves_some")).replace(/\{glovedmg\}/g, selfHarm); }
        else { damagetext = damagetext.replace(/\{gloves\}/g, ""); }
        
        return damagetext;
    }
};
var postHits = {
    "unplug": function(e) {
        if(e.unplugged) {
            return null;
        } else {
            if(e.health > 170 || e.health <= 0) { return null; }
            return function() {
                e.spriteidx = 25;
                e.unplugged = true;
                e.plugTimer = InclusiveRange(2, 3);
                e.health = 50;
                e.def = 5;
                game.innerTransition(this, combat.inbetween, {
                    next: function() { combat.endTurn(combat.inbetween) },
                    text: GetText("outletUnplugged")
                });
            };
        }
    }
};
var addtlHitChecks = {
    "check_SP_SU": function(cropInfo, damage) {
        var hasSpringSummer = false;
        for(var i = 0; i < cropInfo.length; i++) { hasSpringSummer |= (cropInfo[i].seasons[0] === 2 || cropInfo[i].seasons[1] === 2); }
        return hasSpringSummer ? (damage * 50) : 0;
    },
    "check_AU_WI": function(cropInfo, damage) {
        var hasFallWinter = false;
        for(var i = 0; i < cropInfo.length; i++) { hasFallWinter |= (cropInfo[i].seasons[2] === 2 || cropInfo[i].seasons[3] === 2); }
        return hasFallWinter ? (damage * 50) : 0;
    },
    "check_MUSH": function(cropInfo, damage) {
        var hasMushroom = false;
        for(var i = 0; i < cropInfo.length; i++) { hasMushroom |= cropInfo[i].type === "mush"; }
        return hasMushroom ? (damage * 50) : 0;
    },
    "check_FISH": function(cropInfo, damage) {
        var hasFish = false;
        for(var i = 0; i < cropInfo.length; i++) { hasFish |= (cropInfo[i].type === "spear" || cropInfo[i].type === "rod" || cropInfo[i].type === "water"); }
        return hasFish ? (damage * 50) : 0;
    },
    "check_MUSH_w": function(cropInfo, damage) {
        var hasMushroom = false;
        for(var i = 0; i < cropInfo.length; i++) { hasMushroom |= cropInfo[i].type === "mush"; }
        return hasMushroom ? damage : 0;
    },
    "check_RICE": function(cropInfo, damage) {
        var hasRice = false;
        for(var i = 0; i < cropInfo.length; i++) { hasMushroom |= cropInfo[i].type === "rice"; }
        return hasRice ? damage : 0;
    },
    "check_VEG": function(cropInfo, damage) {
        var hasVeg = false;
        for(var i = 0; i < cropInfo.length; i++) { hasVeg |= cropInfo[i].type === "veg"; }
        return hasVeg ? damage : 0;
    },
    "check_FRUIT": function(cropInfo, damage) {
        var hasTree = false;
        for(var i = 0; i < cropInfo.length; i++) { hasTree |= cropInfo[i].type === "tree"; }
        return hasTree ? damage : 0;
    }
};