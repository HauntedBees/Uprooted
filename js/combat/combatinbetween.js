combat.inbetween = {
    next: null, dy: 10.5, 
    setup: function(args) {
        combat.cursors.RedimCursor("main", -1, -1, 0, 0);
        this.next = args.next;
        gfx.drawFullbox(this.dy);
        gfx.drawFullText(args.text, this.dy * 16);
    },
    clean: function() { gfx.clearSome(["menuA", "menuB", "menucursorA", "menucursorB", "menutext"]); },
    mouseMove: function(pos) { return true; },
    click: function(pos, isFresh) { if(game.transitioning || !isFresh) { return false; } this.next(); return true; },
    keyPress: function(key) { if(key == player.controls.pause || key == player.controls.confirm) { return this.click(null, input.IsFreshPauseOrConfirmPress()); } return true; }
};