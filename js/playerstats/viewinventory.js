pausemenu.inventory = {
    cursor: { x: 0, y: 0 }, inventoryWidth: 3,
    layersToClear: ["menuA", "menucursorA", "menucursorB", "menutext", "tutorial", "menuOverBlack", "menutextOverBlack"],
    actualIndexes: [], selectedCrop: -1, trashInfo: [], trashIdx: 0,
    setup: function() {
        this.cursor = {x: 0, y: 0};
        this.selectedCrop = -1;
        this.trashInfo = [];
        this.trashIdx = setInterval(this.HandleTrashCan, 50);
        this.DrawAll();
    },
    DrawAll: function() {
        gfx.clearSome(this.layersToClear);
        this.actualIndexes = [];
        var j = 0;
        for(var i = 0; i < player.inventory.length; i++) {
            if(player.inventory[i][0][0] === "_" || player.inventory[i][0][0] === "!") { continue; }
            gfx.drawInventoryItem(player.inventory[i], j % this.inventoryWidth + 0.25, Math.floor(j / this.inventoryWidth) + 0.5, "menuA");
            this.actualIndexes.push(i);
            if(i === this.selectedCrop) { gfx.drawCursor(j % this.inventoryWidth + 0.25, Math.floor(j / this.inventoryWidth) + 0.5, 0, 0, "xcursor"); }
            j++;
        }
        if(this.cursor.x < this.inventoryWidth) {
            gfx.drawCursor(this.cursor.x + 0.25, this.cursor.y + 0.5, 0, 0);
        } else {
            gfx.drawCursor(this.cursor.x + 0.5, this.cursor.y + 0.5, 0, 0);
        }
        if(this.selectedCrop >= 0) { this.DrawSelectInfo(); }
        this.HandleTrashCan(true);
        this.setCrop();
    },
    clean: function() { clearInterval(this.trashIdx); gfx.clearSome(this.layersToClear); },
    cancel: function() {
        if(this.selectedCrop < 0) { game.innerTransition(this, pausemenu); }
        else { this.selectedCrop = -1; if(this.cursor.x >= this.inventoryWidth) { this.cursor.x = this.inventoryWidth - 1; } this.DrawAll(); }
    },
    mouseMove: function(pos) {
        if(pos.x < 0 || pos.y < 0) { return false; }
        if(this.selectedCrop < 0) {
            if(pos.x >= this.inventoryWidth) { return false; }
            var idx = pos.y * this.inventoryWidth + pos.x;
            if(idx >= this.actualIndexes.length) { return false; }
        } else {
            if(pos.x > this.inventoryWidth) { return false; }
        }
        this.cursor = { x: pos.x, y: pos.y };
        this.DrawAll();
        return true;
    },
    HandleTrashCan: function(fromDrawAll) {
        gfx.clearLayer("tutorial");
        if(pausemenu.inventory.selectedCrop < 0 && pausemenu.inventory.trashInfo.length === 0) { return; }
        if(pausemenu.inventory.selectedCrop >= 0) { gfx.drawTileToGrid("animBin0", 3.5, pausemenu.inventory.cursor.y + 0.5, "tutorial"); }
        if(pausemenu.inventory.trashInfo.length > 0) {
            for(var i = pausemenu.inventory.trashInfo.length - 1; i >= 0; i--) {
                var ti = pausemenu.inventory.trashInfo[i];
                var trashFrame = ti.frame > 5 ? 0 : ti.frame;
                gfx.drawTileToGrid("animBin" + trashFrame, ti.x, ti.y, "tutorial");
                if(!fromDrawAll) { ti.frame++; }
                if(ti.numCoins > 0 && ti.frame % 3 === 0) {
                    ti.numCoins -= 1;
                    ti.coinStates.push({ frame: 0, x: ti.x, y: ti.y, done: false });
                }
                var allCoinsDone = true;
                for(var j = 0; j < ti.coinStates.length; j++) {
                    var coin = ti.coinStates[j];
                    if(coin.done) { continue; }
                    allCoinsDone = false;
                    var coinFrame = coin.frame > 3 ? 0 : coin.frame;
                    coin.done = (coin.frame > 4);
                    coin.y -= 0.25;
                    coin.frame++;
                    gfx.drawTileToGrid("animCoin" + coinFrame, coin.x, coin.y, "tutorial");
                }
                if(allCoinsDone && ti.frame > 6) { pausemenu.inventory.trashInfo.splice(i, 1); }
            }
        }
    },
    DrawSelectInfo: function() {
        var idx = this.cursor.y * this.inventoryWidth + this.cursor.x;
        var actIdx = this.actualIndexes[idx];
        var text = "";
        if(actIdx === this.selectedCrop) {
            text = GetText("inv.unselect");
        } else if(this.cursor.x === this.inventoryWidth) {
            text = GetText("inv.drop");
            var invfo = player.inventory[this.selectedCrop];
            var price = Math.ceil(GetCrop(invfo[0]).price * invfo[1] * 0.1);
            text = text.replace(/\{0\}/g, price);
        } else {
            text = GetText("inv.swap");
        }

        var y = this.cursor.y + 0.5, x = 4.5;
        var xi = 1;
        var width = gfx.getTextWidth(text) + 20;
        var xiimax = x + Math.ceil(width / 64);
        while(xiimax > 14) { x -= 1; xiimax = x + Math.ceil(width / 64); }
        gfx.drawSprite("sheet", 41, 15, x * 16, 2 + y * 16, "menuOverBlack");
        while(width > 128) {
            width -= 64;
            gfx.drawSprite("sheet", 42, 15, x * 16 + 16 * xi++, 2 + y * 16, "menuOverBlack");
        }
        gfx.drawSprite("sheet", 43, 15, x * 16 + 16 * xi, 2 + y * 16, "menuOverBlack");
        gfx.drawText(text, 7 + x * 16, 10.5 + y * 16, undefined, undefined, "menutextOverBlack");
    },
    click: function(pos) {
        if(this.cursor.x === this.inventoryWidth) {
            var invfo = player.inventory[this.selectedCrop];
            var price = Math.ceil(GetCrop(invfo[0]).price * invfo[1] * 0.1);
            player.monies += price;
            player.inventory.splice(this.selectedCrop, 1);
            this.trashInfo.push({ frame: 0, coinStates: [], x: 3.5, y: (pausemenu.inventory.cursor.y + 0.5), numCoins: Math.min(10, Math.ceil(price / 30)) });
            this.selectedCrop = -1;
            this.cursor.x = this.inventoryWidth - 1;
        } else {
            var idx = this.cursor.y * this.inventoryWidth + this.cursor.x;
            var actIdx = this.actualIndexes[idx];
            if(actIdx === undefined) { return false; }
            if(this.selectedCrop < 0) {
                this.selectedCrop = actIdx;
            } else if(this.selectedCrop === this.actIdx) {
                this.selectedCrop = -1;
                if(this.cursor.x >= this.inventoryWidth) { this.cursor.x = this.inventoryWidth - 1; }
            } else {
                var temp = player.inventory[actIdx];
                player.inventory[actIdx] = player.inventory[this.selectedCrop];
                player.inventory[this.selectedCrop] = temp;
                this.selectedCrop = -1;
            }
        }
        this.DrawAll();
        return true;
    },
    keyPress: function(key) {
        var pos = { x: this.cursor.x, y: this.cursor.y };
        var isEnter = false;
        switch(key) {
            case player.controls.up: pos.y--; break;
            case player.controls.left: pos.x--; break;
            case player.controls.down: pos.y++; break;
            case player.controls.right: pos.x++; break;
            case player.controls.confirm:
            case player.controls.pause: isEnter = true; break;
            case player.controls.cancel: return this.cancel();
        }
        if(pos.y < 0 || pos.x < 0) { return false; }
        if(isEnter) {
            return this.click(pos);
        } else {
            return this.mouseMove(pos);
        }
    },
    setCrop: function() {
        var rowYs = [0.25, 1.5, 2.75];
        var rowTextYs = [16, 32, 57, 72];
        var leftMostX = 4.25;
        var rightMostX = 14;
        var leftMostTextX = 88;
        var starStartX = leftMostX + 1, starDx = 1;
        
        gfx.drawInfobox(11, 10, 0);

        var idx = this.cursor.y * this.inventoryWidth + this.cursor.x;
        var actIdx = this.actualIndexes[idx];
        var item = player.inventory[actIdx];
        if(item === undefined) { return; }
        var crop = GetCrop(item[0]);

        // Row 0
        gfx.drawText(crop.displayname, leftMostTextX, rowTextYs[0], undefined, 32);
        gfx.drawTileToGrid(crop.name, leftMostX, rowYs[0], "menutext");

        var cropSprite = "dirt";
        switch(crop.type) {
            case "bee": cropSprite = "_beehive"; break;
            case "spear":
            case "water":
            case "rod": cropSprite = "_lake"; break;
            case "mush": cropSprite = "_log"; break;
            case "egg": cropSprite = "_coop"; break;
            case "food": cropSprite = "_cow"; break;
            case "rice": cropSprite = "_paddy"; break;
            case "tech": cropSprite = "_hotspot"; break;
            case "sickle2": cropSprite = "_charger"; break;
        }
        gfx.drawTileToGrid(cropSprite, leftMostX + 9.25, rowYs[0], "menutext");
        gfx.drawItemNumber(crop.size, leftMostX + 9.5, rowYs[0], "menutext", true);

        // Row 1
        var seasons = ["spring", "summer", "autumn", "winter"];
        for(var i = 0; i < 4; i++) {
            gfx.drawTileToGrid(seasons[i] + crop.seasons[i], leftMostX + 6.75 + i, rowYs[1], "menutext");
        }

        gfx.drawTileToGrid("inv_power", leftMostX, rowYs[1], "menutext");
        var numStars = crop.power / 2;
        if(numStars > 5) {
            for(var i = 0; i < 5; i++) {
                gfx.drawTileToGrid("starMax", starStartX + i * starDx, rowYs[1], "menutext");
            }
        } else {
            for(var i = 0; i < numStars; i++) {
                gfx.drawTileToGrid("starFull", starStartX + i * starDx, rowYs[1], "menutext");
            }
            if(numStars % 1 !== 0) { gfx.drawTileToGrid("starHalf", starStartX + (numStars - 0.5) * starDx, rowYs[1], "menutext"); }
            for(var i = Math.ceil(numStars); i < 5; i++) {
                gfx.drawTileToGrid("starNone", starStartX + i * starDx, rowYs[1], "menutext");
            }
        }

        // Row 2
        gfx.drawTileToGrid("inv_time", leftMostX, rowYs[2], "menutext");
        var timeNum = crop.time;
        if(crop.time === 999 || crop.time === -1) { // TODO: -1 vs 999 what is the diff?
            gfx.drawTileToGrid("bigNum?", leftMostX + 1, rowYs[2], "menutext");
        }  else {
            gfx.drawBigNumber(crop.time, leftMostX + 1, rowYs[2], "menutext");
        }
        if(crop.respawn > 0) {
            //timeNum = crop.respawn;
            gfx.drawTileToGrid("inv_regrow", leftMostX + 2, rowYs[2], "menutext");
            if(crop.respawn === 999 || crop.respawn === -1) {
                gfx.drawTileToGrid("bigNum?", leftMostX + 3, rowYs[2], "menutext");
            }  else {
                gfx.drawBigNumber(crop.respawn, leftMostX + 3, rowYs[2], "menutext");
            }
        }

        var bonusesToPush = [];
        if(crop.waterResist) { bonusesToPush.push("waterIco" + crop.waterResist); }
        if(crop.fireResist) { bonusesToPush.push("fireIco" + crop.fireResist); }
        if(crop.stickChance) { bonusesToPush.push("stunIco" + crop.stickChance); }
        if(crop.saltResist) { bonusesToPush.push("saltIco" + crop.saltResist); }
        if(crop.saltClean) { bonusesToPush.push("saltIcoX"); }
        if(crop.animal) { bonusesToPush.push("animal" + crop.animal); }
        for(var i = 0; i < bonusesToPush.length; i++) {
            gfx.drawTileToGrid(bonusesToPush[i], rightMostX - 0.25 - i, rowYs[2], "menutext");
        }
        
        // Row 3
        gfx.drawWrappedText(GetText(crop.name), leftMostTextX - 16, rowTextYs[3], 170);
    }
};