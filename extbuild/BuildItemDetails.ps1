param ([string]$which="CEFX")
function NullOrEmpty($a) { return ($a -ne $null -and $a -ne ""); }
function Coalesce($a, $b) { if (NullOrEmpty $a) { $a } else { $b } }
New-Alias "??" Coalesce;

$rootpath = Resolve-Path ..;
if($which.Contains("C")) {
	Write-Host "Converting Details_Crops.ods to veggies.js";
	& "C:\Program Files (x86)\LibreOffice 5\program\soffice.exe" --headless --convert-to csv --outdir ".\temp" "Details_Crops.ods" | Out-Null;
	$csv = Import-CSV ".\temp\Details_Crops.csv";
	$out = [System.IO.StreamWriter] "$rootpath\js\gamedata\veggies.js";
	$out.WriteLine(@'
function CropDetail(name, displayname, price, type, size, time, frames, power, re, sp, su, au, wi, addtl) {
    this.name = name;
    this.type = type;
    this.price = price;
    this.displayname = displayname;
    this.size = size;
    this.time = time;
    this.frames = frames;
    this.power = power;
    this.respawn = re;
    this.seasons = [sp || 0, su || 0, au || 0, wi || 0];
    if(addtl !== undefined) { for(var key in addtl) { this[key] = addtl[key]; } }
}
function GetCropDesc(cropInfo) {
    var text = "Power: " + cropInfo.power;
    if(cropInfo.type === "spear") {
        text += "\n Catch Chance: " + (cropInfo.req * 100) + "%";
        return text;
    }
    if(cropInfo.time > 0) { text += "\n Growth Time: " + Math.ceil(cropInfo.time / player.getCropSpeedMultiplier()); }
    if(cropInfo.respawn > 0) { text += "\n Regrowth Time: " + cropInfo.respawn; }
    text += "\n Seasons:";
    if(cropInfo.seasons[0] > 0.5) { text += " SP"; }
    if(cropInfo.seasons[1] > 0.5) { text += " SU"; }
    if(cropInfo.seasons[2] > 0.5) { text += " AU"; }
    if(cropInfo.seasons[3] > 0.5) { text += " WI"; }
    return text;
}
function GetCrop(name) {
    switch(name) {
'@);
	$formatStr = "		case `"{name}`": return new CropDetail(name, `"{displayname}`", {price}, `"{type}`", {size}, {time}, {frames}, {power}, {re}, {sp}, {su}, {au}, {wi}{addtl});";
	$count = 0;
	$allCrops = @();
	$keepCropping = $true;
	ForEach($row in $csv) {
		$id = $row.Id;
		if($id -eq "") { continue; }
		if($id -eq "*") {
			$out.WriteLine("		/* _ */".replace("_", $row.Name));
			if($row.Name -eq "Enemy-Only") { $keepCropping = $false; }
			continue;
		}
		if($keepCropping) { $allCrops += "`"$id`""; }
		$endStr = $formatStr.replace("{name}", $row.Id).replace("{displayname}", $row.Name).replace("{price}", $row.Price).replace("{type}", $row.Type).replace("{size}", $row.Size);
		$endStr = $endStr.replace("{time}", $row.Time).replace("{frames}", $row.AnimFrames).replace("{power}", $row.Power).replace("{re}", (?? $row.Re 0));
		$endStr = $endStr.replace("{sp}", (?? $row.Sp 0)).replace("{su}", (?? $row.Su 0)).replace("{au}", (?? $row.Au 0)).replace("{wi}", (?? $row.Wi 0));
		$addtl = @();
		if($row.WaterR) { $addtl += "waterResist: _".replace("_", $row.WaterR); }
		if($row.FireR) { $addtl += "fireResist: _".replace("_", $row.FireR); }
		if($row.SaltR) { $addtl += "saltResist: _".replace("_", $row.SaltR); } # TODO: IMPLEMENT
		if($row.SaltClean) { $addtl += "saltClean: true"; } # TODO: IMPLEMENT
		if($row.Stick) { $addtl += "stickChance: _".replace("_", $row.Stick); }
		if($row.Animal) {
			$anInfo = $row.Animal.split("/");
			$addtl += "animal: `"_`"".replace("_", $anInfo[0]);
			$addtl += "animalChance: _".replace("_", $anInfo[1]);
			$addtl += "animalDamageMult: _".replace("_", $anInfo[2]);
		}
		if($row.Rot) { $addtl += "rotten: true"; }
		if($row.NoRot) { $addtl += "noRot: true"; }
		if($row.Baby) { $addtl += "baby: `"_`"".replace("_", $row.Baby); }
		if($row.SaltChance) { $addtl += "saltChance: _".replace("_", $row.SaltChance); }
		if($row.BurnChance) { $addtl += "burnChance: _".replace("_", $row.BurnChance); }
		if($addtl.Count -gt 0) {
			$folded = $addtl -join ", ";
			$endStr = $endStr.replace("{addtl}", ", { $folded }");
		} else {
			$endStr = $endStr.replace("{addtl}", "");
		}
		$out.WriteLine($endStr);
		$count++;
	}
	$out.WriteLine("	}");
	$out.WriteLine("}");
	$allCropsStr = $allCrops -join ", ";
	$out.Write("debug.AllCrops = [$allCropsStr];");
	$out.close();
	Write-Host "Converted $count crops";
}
if($which.Contains("E")) {
	Write-Host "Converting Details_Equipment.ods to equipment.js";
	& "C:\Program Files (x86)\LibreOffice 5\program\soffice.exe" --headless --convert-to csv --outdir ".\temp" "Details_Equipment.ods" | Out-Null;
	$csv = Import-CSV ".\temp\Details_Equipment.csv";
	$out = [System.IO.StreamWriter] "$rootpath\js\gamedata\equipment.js";
	$out.WriteLine(@'
function EquipmentDetail(name, displayname, price, sprite, type, addtl) {
    this.name = name;
    this.type = type;
    this.price = price;
    this.displayname = displayname;
    this.sprite = sprite;
    if(addtl !== undefined) { for(var key in addtl) { this[key] = addtl[key]; } }
}
function GetEquipmentDesc(equipInfo) {
    var str = "";
    if(equipInfo.type === "weapon") {
        str += "Power: " + equipInfo.power;
        if(equipInfo.targetCrops) { str += "\n Can target enemy Crops."; }
        if(equipInfo.noEnemies) { str += "\n Cannot target enemies."; }
        if(equipInfo.sp) { str += "\n Stronger in Spring."; }
        if(equipInfo.su) { str += "\n Stronger in Summer."; }
        if(equipInfo.au) { str += "\n Stronger in Autumn."; }
        if(equipInfo.wi) { str += "\n Stronger in Winter."; }
        if(equipInfo.tech) { str += "\n Requires Sickle2 Charger on field."; }
        if(equipInfo.attacks) { 
            if(equipInfo.attacks === 999) { str += "\n Attacks all enemies."; }
            else { str += "\n Attacks "+ equipInfo.attacks + " enemies."; }
        }
    } else if(equipInfo.type === "compost") {
        str += "Holding Amount: " + equipInfo.amount;
        if(equipInfo.canAttack) { str += "\n Can attack enemies with Compost."; }
        if(equipInfo.rotOnly) { str += "\n Can only compost rotten crops."; }
        if(equipInfo.bonus) { str += "\n Bonus Effect: " + (equipInfo.bonus * 100) + "%"; }
        if(equipInfo.tech) { str += "\n May backfire."; }
    } else if(equipInfo.type === "gloves") {
        str += "Seeds Per Turn: " + equipInfo.amount;
        if(equipInfo.canAttack) { str += "\n Can Attack or Compost after planting seeds."; }
        if(equipInfo.def) { str += "\n Damage Resistance: " + (equipInfo.def * 100) + "%"; }
        if(equipInfo.tech) { str += "\n May shock saplings and tech when planted. Will shock you when touching water."; }
    } else if(equipInfo.type === "soil") {
        if(equipInfo.speed) { str += "\n Growth Speed Boost: " + (equipInfo.speed * 100) + "%"; }
        if(equipInfo.boost) { str += "\n Seasonal Resistance: " + (equipInfo.boost * 100) + "%"; }
        if(equipInfo.amplify) { str += "\n Seasonal Strength: " + (equipInfo.amplify * 100) + "%"; }
        if(equipInfo.tech) { str += "\n Will kill crops that are too weak or grow too quickly. Bees will fly away."; }
    }
    return str;
}
function GetEquipment(name) {
    switch(name) {
'@);
	$formatStr = "		case `"{name}`": return new EquipmentDetail(name, `"{displayname}`", {price}, `"{sprite}`", `"{type}`"{addtl});";
	$count = 0;
	ForEach($row in $csv) {
		if($row.Crop -eq "" -or $row.Crop -eq "Crop") { continue; }
		if($row.Id -eq "*") {
			$out.WriteLine("		/* _ */".replace("_", $row.Name));
			continue;
		}
		$endStr = $formatStr.replace("{name}", $row.Id).replace("{displayname}", $row.Name).replace("{price}", $row.Price).replace("{sprite}", $row.Sprite).replace("{type}", $row.Type);
		$addtl = @();
		if($row.Tech) { $addtl += "tech: true"; }
		# Weapons
		if(-not $row.Foes) { $addtl += "noEnemies: true"; }
		if($row.Crops) { $addtl += "targetCrops: true"; }
		if($row.Pow) { $addtl += "power: _".replace("_", $row.Pow); }
		if($row.Num) { $addtl += "attacks: _".replace("_", $row.Num); }
		if($row.SP) { $addtl += "sp: _".replace("_", $row.SP); }
		if($row.SU) { $addtl += "su: _".replace("_", $row.SU); }
		if($row.AU) { $addtl += "au: _".replace("_", $row.AU); }
		if($row.WI) { $addtl += "wi: _".replace("_", $row.WI); }
		# Compost
		if($row.Amt) { $addtl += "amount: _".replace("_", $row.Amt); }
		if($row.Rot) { $addtl += "rotOnly: true"; }
		if($row.Atk) { $addtl += "canAttack: true"; }
		if($row.Bns) { $addtl += "bonus: _".replace("_", $row.Bns); }
		# Gloves
		if($row.Def) { $addtl += "def: _".replace("_", $row.Def); }
		# Watering Cans
		if($row.Spd) { $addtl += "speed: _".replace("_", $row.Spd); }
		if($row.Bst) { $addtl += "boost: _".replace("_", $row.Bst); }
		if($row.Amp) { $addtl += "amplify: _".replace("_", $row.Amp); }
		if($addtl.Count -gt 0) {
			$folded = $addtl -join ", ";
			$endStr = $endStr.replace("{addtl}", ", { $folded }");
		} else {
			$endStr = $endStr.replace("{addtl}", "");
		}
		$out.WriteLine($endStr);
		$count++;
	}
	$out.WriteLine("	}");
	$out.Write("}")
	$out.close();
	Write-Host "Converted $count pieces of equipment";
}
if($which.Contains("F")) {
	Write-Host "Converting Details_Fixtures.ods to fixtures.js";
	& "C:\Program Files (x86)\LibreOffice 5\program\soffice.exe" --headless --convert-to csv --outdir ".\temp" "Details_Fixtures.ods" | Out-Null;
	$csv = Import-CSV ".\temp\Details_Fixtures.csv";
	$out = [System.IO.StreamWriter] "$rootpath\js\gamedata\fixtures.js";
	$out.WriteLine(@'
function FixtureDetail(name, displayname, price, shortdesc, desc, displaySprite) {
    this.name = name;
    this.displayname = displayname;
    this.price = price;
    this.shortdesc = shortdesc;
    this.desc = desc;
    if(displaySprite) {
        this.size = 2;
        this.displaySprite = displaySprite;
    }
}
function GetFarmInfo(name) {
    switch(name) {
'@);
	$formatStr = "		case `"{name}`": return new FixtureDetail(name, `"{displayname}`", {price}, `"{shortdesc}`", `"{desc}`"{addtl});";
	$count = 0;
	ForEach($row in $csv) {
		if($row.Crop -eq "" -or $row.Crop -eq "Crop") { continue; }
		if($row.Id -eq "*") {
			$out.WriteLine("		/* _ */".replace("_", $row.Name));
			continue;
		}
		$endStr = $formatStr.replace("{name}", $row.Id).replace("{displayname}", $row.Name).replace("{price}", $row.Price).replace("{shortdesc}", $row.ShortDesc).replace("{desc}", $row.Desc);
		#$addtl = @();
		if($row.DisplaySprite) { 
			$endStr = $endStr.replace("{addtl}", ", `"" + $row.DisplaySprite + "`"");
		} else {
			$endStr = $endStr.replace("{addtl}", "");
		}
		$out.WriteLine($endStr);
		$count++;
	}
	$out.WriteLine("	}");
	$out.Write("}")
	$out.close();
	Write-Host "Converted $count fixtures";
}
if($which.Contains("X")) {
	Write-Host "Converting Details_Enemies.ods to enemies.js";
	& "C:\Program Files (x86)\LibreOffice 5\program\soffice.exe" --headless --convert-to csv --outdir ".\temp" "Details_Enemies.ods" | Out-Null;
	$csv = Import-CSV ".\temp\Details_Enemies.csv";
	$out = [System.IO.StreamWriter] "$rootpath\js\gamedata\enemies.js";
	$out.WriteLine(@'
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
'@);
	$formatStr = "		case `"{name}`": return new EnemyDetail(GetDisplayName(name, {dsl}), `"{size}`", {spriteidx}, { dx: {dx}, dy: {dy}, w: {w}, h: {h} }, {health}, {atk}, {def}, {fheight}, {fwidth}, {boss}, [{sp}, {su}, {au}, {wi}], `"{atkid}`", `"{args}`"{drops}{addtl});";
	$count = 0;
	$allEnemies = @();
	ForEach($row in $csv) {
		$id = $row.Id;
		if($id -eq "") { continue; }
		if($id -eq "*") {
			$out.WriteLine("		/* _ */".replace("_", $row.Names));
			continue;
		}
		$allEnemies += "`"$id`"";
		$endStr = $formatStr.replace("{name}", $id).replace("{dsl}", $row.Names).replace("{size}", $row.Size).replace("{spriteidx}", $row.sI).replace("{dx}", $row.cdx).replace("{dy}", $row.cdy).replace("{w}", $row.cw).replace("{h}", $row.ch).replace("{health}", $row.HP).replace("{atk}", $row.Atk).replace("{def}", $row.Def).replace("{fheight}", $row.FH).replace("{fwidth}", $row.FW).replace("{sp}", (?? $row.Sp 0)).replace("{su}", (?? $row.Su 0)).replace("{au}", (?? $row.Au 0)).replace("{wi}", (?? $row.Wi 0)).replace("{atkid}", $row.atkId).replace("{args}", $row.args);
		if($row.Boss -eq "Y") {
			$endStr = $endStr.replace("{boss}", "true");
		} else {
			$endStr = $endStr.replace("{boss}", "false");
		}
		$drops = @();
		if($row.money -ne "") {
			$i = $row.money.split(",");
			$drops += "{ money: true, min: A, max: B }".replace("A", $i[0]).replace("B", $i[1]);
		}
		if($row.drop0 -ne "") {
			$i = $row.drop0.split(",");
			$drops += "{ seed: `"A`", min: B, max: C }".replace("A", $i[0]).replace("B", $i[1]).replace("C", $i[2]);
		}
		if($row.drop1 -ne "") {
			$i = $row.drop1.split(",");
			$drops += "{ seed: `"A`", min: B, max: C }".replace("A", $i[0]).replace("B", $i[1]).replace("C", $i[2]);
		}
		if($row.drop2 -ne "") {
			$i = $row.drop2.split(",");
			$drops += "{ seed: `"A`", min: B, max: C }".replace("A", $i[0]).replace("B", $i[1]).replace("C", $i[2]);
		}
		if($drops.Count -gt 0) {
			$folded = $drops -join ", ";
			$endStr = $endStr.replace("{drops}", ", [ $folded ]");
		} else {
			$endStr = $endStr.replace("{drops}", ", []");
		}
		
		$addtl = @();
		if($row.Tile) { $addtl += "tile: `"_`"".replace("_", $row.Tile); }
		if($row.soleKill) { $addtl += "soleKill: true"; }
		if($row.wkSn) { $addtl += "weakSeason: _".replace("_", $row.wkSn); }
		if($row.postHit) { $addtl += "postHit: `"_`"".replace("_", $row.postHit); }
		if($row.addtlHitCheck) { $addtl += "addtlHitCheck: `"_`"".replace("_", $row.addtlHitCheck); }
		if($row.initFunc) { $addtl += "initFunc: `"_`"".replace("_", $row.initFunc); }
		if($row.turnFunc) { $addtl += "turnFunc: `"_`"".replace("_", $row.turnFunc); }
		
		if($addtl.Count -gt 0) {
			$folded = $addtl -join ", ";
			$endStr = $endStr.replace("{addtl}", ", { $folded }");
		} else {
			$endStr = $endStr.replace("{addtl}", "");
		}
		$out.WriteLine($endStr);
		$count++;
	}
	$out.WriteLine("	}");
	$out.WriteLine("}");
	$allEnemiesStr = $allEnemies -join ", ";
	$out.Write("debug.AllEnemies = [$allEnemiesStr];");
	$out.close();
	Write-Host "Converted $count enemies";
}

Remove-Item .\temp -recurse;