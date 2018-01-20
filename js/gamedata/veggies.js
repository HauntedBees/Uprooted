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
		/* Veggies */
		case "asparagus": return new CropDetail(name, "Asparagus", 10, "veg", 1, 18, 4, 8, 3, 2, 0, 0, 0);
		case "beet": return new CropDetail(name, "Beet", 10, "veg", 1, 1, 2, 5, 0, 0, 1, 2, 2, { waterResist: 1 });
		case "bellpepper": return new CropDetail(name, "Bell Pepper", 10, "veg", 1, 2, 3, 3, 0, 0, 1, 2, 0);
		case "carrot": return new CropDetail(name, "Carrot", 10, "veg", 1, 2, 2, 3, 0, 2, 1, 2, 1, { animal: "Rabbit", animalChance: 0.01, animalDamageMult: 2 });
		case "corn": return new CropDetail(name, "Corn", 10, "veg", 1, 5, 3, 4, 0, 0, 2, 0, 0);
		case "garlic": return new CropDetail(name, "Garlic", 10, "veg", 1, 6, 3, 10, 0, 2, 1, 1, 0);
		case "ginger": return new CropDetail(name, "Ginger", 10, "veg", 1, 5, 4, 4, 0, 0, 0, 2, 0);
		case "leek": return new CropDetail(name, "Leek", 10, "veg", 1, 3, 3, 8, 0, 0, 0, 0, 2);
		case "pineapple": return new CropDetail(name, "Pineapple", 10, "veg", 1, 12, 4, 10, 0, 2, 0, 1, 1, { fireResist: 1 });
		case "radish": return new CropDetail(name, "Radish", 10, "veg", 1, 1, 2, 3, 0, 2, 0, 1, 0);
		case "rhubarb": return new CropDetail(name, "Rhubarb", 10, "veg", 1, 20, 4, 1000, 0, 1, 0, 0, 0);
		case "spinach": return new CropDetail(name, "Spinach", 10, "veg", 1, 1, 2, 2, 0, 1, 0, 2, 0);
		case "tomato": return new CropDetail(name, "Tomato", 10, "veg", 1, 1, 2, 2, 0, 0, 2, 0, 0, { saltClean: true });
		/* Trees */
		case "apple": return new CropDetail(name, "Apple", 10, "tree", 2, 5, 5, 2, 2, 1, 1, 2, 1);
		case "apricot": return new CropDetail(name, "Apricot", 10, "tree", 2, 24, 5, 10, 5, 2, 1, 0, 0);
		case "avocado": return new CropDetail(name, "Avocado", 10, "tree", 2, 24, 5, 8, 5, 2, 2, 0, 1);
		case "banana": return new CropDetail(name, "Banana", 10, "tree", 2, 7, 5, 3, 3, 1, 1, 1, 1);
		case "blackberry": return new CropDetail(name, "Blackberry", 10, "tree", 2, 14, 5, 5, 1, 0, 2, 0, 0);
		case "grapes": return new CropDetail(name, "Grapes", 10, "tree", 2, 20, 5, 6, 4, 0, 0, 2, 0);
		case "specialgrapes": return new CropDetail(name, "Grapes+", 10, "tree", 2, 4, 5, 6, 3, 0, 0, 2, 0);
		case "kiwi": return new CropDetail(name, "Kiwi", 10, "tree", 2, 50, 5, 10, 4, 0, 2, 0, 1);
		case "lemon": return new CropDetail(name, "Lemon", 10, "tree", 2, 5, 5, 4, 2, 1, 2, 1, 0);
		case "mango": return new CropDetail(name, "Mango", 10, "tree", 2, 3, 5, 3, 2, 0, 2, 1, 0);
		/* Bees */
		case "beeR": return new CropDetail(name, "Killer Bee", 10, "bee", 1, 999, 2, 7, 999, 1, 1, 1, 0, { stickChance: 1 });
		case "beeG": return new CropDetail(name, "Stingless Bee", 10, "bee", 1, 999, 2, 6, 999, 1, 1, 1, 0, { stickChance: 2 });
		case "beeB": return new CropDetail(name, "Honey Bee", 10, "bee", 1, 999, 2, 5, 999, 1, 1, 1, 0, { stickChance: 3 });
		case "hbee": return new CropDetail(name, "Haunted Bee", 10, "bee", 1, 999, 2, 10, 999, 1, 1, 1, 0, { stickChance: 3 });
		/* Rice */
		case "rice": return new CropDetail(name, "Rice", 10, "rice", 1, 5, 4, 5, 0, 1, 1, 0, 1);
		case "arborio": return new CropDetail(name, "Arborio Rice", 10, "rice", 1, 5, 4, 5, 0, 1, 1, 0, 1);
		case "blackrice": return new CropDetail(name, "Black Rice", 10, "rice", 1, 5, 4, 5, 0, 1, 1, 0, 1);
		case "shortgrain": return new CropDetail(name, "Short-Grain Rice", 10, "rice", 1, 5, 4, 5, 0, 1, 1, 0, 1);
		case "chestnut": return new CropDetail(name, "Water Chestnut", 10, "rice", 1, 5, 4, 5, 0, 0, 1, 1, 1);
		/* Fishing */
		case "spear": return new CropDetail(name, "Fish Spear", 10, "spear", 1, 0, 2, 5, 0, 0, 0, 0, 0);
		case "rod": return new CropDetail(name, "Fish Rod", 10, "rod", 1, 10, 2, 5, 0, 0, 0, 0, 0);
		case "goodrod": return new CropDetail(name, "Better Rod", 10, "rod", 1, 10, 2, 5, 0, 0, 0, 0, 0);
		case "metalrod": return new CropDetail(name, "Metal Rod", 10, "rod", 1, 10, 2, 5, 0, 0, 0, 0, 0);
		case "net": return new CropDetail(name, "Fish Net", 10, "water", 1, -1, 2, 10, 0, 0, 0, 0, 0, { rotten: true });
		case "bignet": return new CropDetail(name, "Big Net", 10, "water", 2, -1, 2, 10, 0, 0, 0, 0, 0, { rotten: true });
		/* Cow */
		case "fodder": return new CropDetail(name, "Fodder", 10, "food", 1, 0, 1, 4, 0, 0, 0, 0, 0);
		/* Mushrooms */
		case "shiitake": return new CropDetail(name, "Shiitake", 10, "mush", 1, 5, 3, 5, 3, 1, 1, 1, 1);
		case "milkcap": return new CropDetail(name, "Milk Cap", 10, "mush", 1, 5, 3, 5, 3, 1, 1, 1, 1);
		case "portobello": return new CropDetail(name, "Portobello", 10, "mush", 1, 5, 3, 5, 3, 1, 1, 1, 1);
		case "greenshroom": return new CropDetail(name, "Parrot Toadstool", 10, "mush", 1, 5, 3, 5, 3, 1, 1, 1, 1);
		case "blackshroom": return new CropDetail(name, "Black Mushroom", 10, "mush", 1, 5, 3, 5, 3, 1, 1, 1, 1);
		case "poisnshroom": return new CropDetail(name, "Definitely Poisonous Mushroom", 10, "mush", 1, 5, 3, 5, 3, 1, 1, 1, 1);
		/* Eggs */
		case "egg": return new CropDetail(name, "Chicken Egg", 10, "egg", 1, 4, 4, 8, 0, 1, 1, 1, 1);
		case "quail": return new CropDetail(name, "Quail Egg", 10, "egg", 1, 4, 4, 8, 0, 1, 1, 1, 1);
		case "goose": return new CropDetail(name, "Goose Egg", 10, "egg", 1, 4, 4, 8, 0, 1, 1, 1, 1);
		case "turkey": return new CropDetail(name, "Turkey Egg", 10, "egg", 1, 4, 4, 8, 0, 1, 1, 1, 1);
		case "platypus": return new CropDetail(name, "Platypus Egg", 10, "egg", 1, 4, 4, 8, 0, 1, 1, 1, 1);
		/* Technology */
		case "battery": return new CropDetail(name, "Battery", 10, "tech", 1, 5, 5, 3, 0, 1, 1, 1, 1);
		case "headphones": return new CropDetail(name, "Earbuds", 10, "tech", 1, 5, 3, 3, 0, 1, 1, 1, 1);
		case "printer": return new CropDetail(name, "3D Printer", 10, "tech", 1, 5, 6, 3, 0, 1, 1, 1, 1);
		case "app": return new CropDetail(name, "App", 10, "tech", 1, 3, 4, 3, 0, 1, 1, 1, 1);
		case "drone": return new CropDetail(name, "Drone", 10, "tech", 1, 5, 3, 3, 0, 1, 1, 1, 1);
		case "frogbot": return new CropDetail(name, "Fwoggybot", 10, "tech", 2, 5, 4, 3, 0, 1, 1, 1, 1);
		case "coffee": return new CropDetail(name, "Coffee Machine", 10, "tech", 2, 5, 5, 3, 0, 1, 1, 1, 1);
		case "sicklebattery": return new CropDetail(name, "Sickle2 Battery", 10, "sickle2", 1, 5, 4, 0, 0, 1, 1, 1, 1);
		/* Rare */
		case "goldegg": return new CropDetail(name, "Golden Egg", 500, "egg", 1, 4, 4, 11, 0, 1, 1, 1, 1);
		case "coconut": return new CropDetail(name, "Coconut", 500, "tree", 2, 10, 5, 11, 3, 1, 2, 0, 0);
		case "gmocorn": return new CropDetail(name, "GMO Corn", 500, "veg", 1, 5, 3, 11, 0, 1, 1, 1, 2);
		case "ultrarod": return new CropDetail(name, "Master Bait", 500, "rod", 1, 20, 2, 11, 0, 1, 1, 1, 1);
		case "goodfood": return new CropDetail(name, "Delicious Food", 500, "food", 1, 0, 1, 11, 0, 1, 1, 1, 1);
		case "notdrugs": return new CropDetail(name, "Funny Mushroom", 500, "mush", 1, 5, 3, 11, 3, 1, 1, 2, 1, { stickChance: 2 });
		case "lotus": return new CropDetail(name, "Sacred Lotus", 500, "rice", 1, 30, 5, 11, 0, 2, 2, 1, 0);
		/* Enemy-Only */
		case "algae": return new CropDetail(name, "Algae", 0, "rice", 1, 2, 2, 10, 0, 1, 2, 1, 0, { noRot: true });
		case "kelp": return new CropDetail(name, "Kelp", 0, "rice", 1, 5, 5, 30, 0, 2, 2, 1, 1, { noRot: true });
		case "rock": return new CropDetail(name, "Rock", 0, "rock", 1, 5, 1, 0, 0, 1, 1, 1, 1);
		case "tire": return new CropDetail(name, "Tire", 0, "rock", 1, 8, 1, 0, 0, 1, 1, 1, 1);
		case "salt": return new CropDetail(name, "Salt", 0, "rock", 1, 30, 1, 0, 0, 1, 1, 1, 1);
		case "acorn": return new CropDetail(name, "Acorn", 0, "tree", 2, 6, 4, 6, 2, 0, 1, 1, 0);
		case "robobabby": return new CropDetail(name, "Byte Baby", 0, "babby", 1, 4, 4, 0, 0, 1, 1, 1, 1, { baby: "robo" });
		case "bpermit": return new CropDetail(name, "Building Permit", 0, "veg", 1, 4, 4, 10, 0, 1, 1, 1, 1);
		case "house": return new CropDetail(name, "House", 0, "veg", 2, 12, 5, 50, 0, 1, 1, 1, 1);
		case "lightbulb": return new CropDetail(name, "Smart Lightbulb", 0, "tech", 1, 1, 2, 5, 0, 1, 1, 1, 1);
		case "download": return new CropDetail(name, "Download", 0, "tech", 1, 10, 5, 40, 0, 1, 1, 1, 1);
		case "cloud": return new CropDetail(name, "The Cloud", 0, "cloud", 2, 100, 1, 20, 0, 1, 1, 1, 1);
		case "porcini": return new CropDetail(name, "Porcini", 0, "mush", 1, 5, 3, 5, 3, 1, 1, 1, 1);
		case "arborioB": return new CropDetail(name, "Arborio Rice", 0, "rice", 1, 5, 4, 5, 0, 1, 1, 0, 1);
		case "timebomb": return new CropDetail(name, "Time Bomb", 0, "veg", 1, 12, 4, 50, 0, 1, 1, 1, 1);
		case "shotgun": return new CropDetail(name, "Shotgun", 0, "veg", 1, 5, 4, 30, 0, 1, 1, 1, 1);
		case "burrito": return new CropDetail(name, "Burrito", 0, "veg", 1, 10, 1, 20, 0, 1, 1, 1, 1);
		case "dango": return new CropDetail(name, "Dango", 0, "veg", 1, 5, 1, 15, 0, 1, 1, 1, 1);
		case "taco": return new CropDetail(name, "Taco", 0, "veg", 1, 8, 1, 18, 0, 1, 1, 1, 1);
		case "kombucha": return new CropDetail(name, "Kombucha", 0, "veg", 1, 30, 1, 80, 0, 1, 1, 1, 1);
		case "cheese": return new CropDetail(name, "Cheese", 0, "veg", 1, 4, 1, 5, 0, 1, 1, 1, 1);
		case "batterysalt": return new CropDetail(name, "Smart Salt", 0, "veg", 1, 6, 3, 10, 0, 1, 1, 1, 1, { saltChance: 0.5 });
		case "gastank": return new CropDetail(name, "Gas Tank", 0, "tech", 1, 6, 4, 10, 0, 1, 1, 1, 1, { burnChance: 0.25 });
		case "airfilter": return new CropDetail(name, "Air Filter", 0, "tech", 1, 6, 5, 10, 0, 1, 1, 1, 1);
		case "dipstick": return new CropDetail(name, "Dip Stick", 0, "tech", 1, 3, 3, 10, 0, 1, 1, 1, 1);
		case "cacao": return new CropDetail(name, "Cacao", 0, "tree", 2, 10, 5, 10, 3, 1, 1, 1, 1);
		/* WACG Cards */
		case "char0": return new CropDetail(name, "Pale Blood Horse", 0, "card", 1, 999, 1, 50, 0, 1, 1, 1, 1);
		case "char1": return new CropDetail(name, "Mabingy the Elf", 0, "card", 1, 999, 1, 40, 0, 1, 1, 1, 1);
		case "char2": return new CropDetail(name, "Pagan Cave Bat", 0, "card", 1, 999, 1, 30, 0, 1, 1, 1, 1);
		case "char3": return new CropDetail(name, "Just a Slime", 0, "card", 1, 999, 1, 20, 0, 1, 1, 1, 1);
		case "char4": return new CropDetail(name, "Trash Lobster", 0, "card", 1, 999, 1, 10, 0, 1, 1, 1, 1);
		case "elem0": return new CropDetail(name, "Fire", 0, "card", 1, 999, 1, 5, 0, 1, 1, 1, 1);
		case "elem1": return new CropDetail(name, "Earth", 0, "card", 1, 999, 1, 5, 0, 1, 1, 1, 1);
		case "elem2": return new CropDetail(name, "Water", 0, "card", 1, 999, 1, 5, 0, 1, 1, 1, 1);
		case "elem3": return new CropDetail(name, "Tech", 0, "card", 1, 999, 1, 5, 0, 1, 1, 1, 1);
		case "fx0": return new CropDetail(name, "Gobulin Shield", 0, "card", 1, 999, 1, 10, 0, 1, 1, 1, 1);
		case "fx1": return new CropDetail(name, "Wand of Ps'ghetti", 0, "card", 1, 999, 1, 10, 0, 1, 1, 1, 1);
		case "fx2": return new CropDetail(name, "Infernal Doug", 0, "card", 1, 999, 1, 10, 0, 1, 1, 1, 1);
		case "fx3": return new CropDetail(name, "Regular Baseball", 0, "card", 1, 999, 1, 10, 0, 1, 1, 1, 1);
		case "fx4": return new CropDetail(name, "The Blue Winter", 0, "card", 1, 999, 1, 10, 0, 1, 1, 1, 1);
		/* Food2 */
		case "food2orig": return new CropDetail(name, "Food2 Original", 0, "food2", 1, 4, 5, 20, 0, 1, 1, 1, 1);
		case "food2classic": return new CropDetail(name, "Food2 Classic", 0, "food2", 1, 4, 5, 20, 0, 1, 1, 1, 1);
		case "food2kelp": return new CropDetail(name, "Food2 Crispy", 0, "food2", 1, 4, 5, 30, 0, 1, 1, 1, 1, { saltChance: 0.25 });
		case "food2coffee": return new CropDetail(name, "Food2 WH", 0, "food2", 1, 4, 5, 40, 0, 1, 1, 1, 1, { burnChance: 0.15 });
		case "food2salsa": return new CropDetail(name, "Food2 SP", 0, "food2", 1, 4, 5, 50, 0, 1, 1, 1, 1, { burnChance: 0.75 });
		case "food2gamer": return new CropDetail(name, "Food2 Epic", 0, "food2", 1, 4, 5, 60, 0, 1, 1, 1, 1, { saltChance: 0.25 });
		case "food2cookie": return new CropDetail(name, "Food2 RR", 0, "food2", 1, 4, 5, 70, 0, 1, 1, 1, 1);
		case "food2black": return new CropDetail(name, "Food2 Midnite", 0, "food2", 1, 4, 5, 80, 0, 1, 1, 1, 1);
		case "food2purple": return new CropDetail(name, "Food2 Purple", 0, "food2", 1, 4, 5, 90, 0, 1, 1, 1, 1);
		case "food2crystal": return new CropDetail(name, "Crystal Food2", 0, "food2", 1, 4, 5, 100, 0, 1, 1, 1, 1);
		case "food2powder": return new CropDetail(name, "Food2 Powder", 0, "food2", 1, 1, 1, 5, 0, 1, 1, 1, 1);
		case "food2bar": return new CropDetail(name, "Foobar2", 0, "food2", 1, 5, 3, 45, 0, 1, 1, 1, 1);
		case "food2barChoc": return new CropDetail(name, "Chocky Foobar2", 0, "food2", 1, 5, 3, 50, 0, 1, 1, 1, 1);
		case "soybean": return new CropDetail(name, "Soybean", 0, "veg", 1, 10, 5, 60, 0, 0, 1, 1, 0);
		case "conveyorEnd": return new CropDetail(name, "Food2 Conveyor", 0, "card", 1, 999, 1, 100, 0, 0, 0, 0, 0);
		case "soybaby": return new CropDetail(name, "Soy Baby", 0, "babby", 1, 5, 5, 0, 0, 1, 1, 1, 1, { baby: "soyChild" });
	}
}
debug.AllCrops = ["asparagus", "beet", "bellpepper", "carrot", "corn", "garlic", "ginger", "leek", "pineapple", "radish", "rhubarb", "spinach", "tomato", "apple", "apricot", "avocado", "banana", "blackberry", "grapes", "specialgrapes", "kiwi", "lemon", "mango", "beeR", "beeG", "beeB", "hbee", "rice", "arborio", "blackrice", "shortgrain", "chestnut", "spear", "rod", "goodrod", "metalrod", "net", "bignet", "fodder", "shiitake", "milkcap", "portobello", "greenshroom", "blackshroom", "poisnshroom", "egg", "quail", "goose", "turkey", "platypus", "battery", "headphones", "printer", "app", "drone", "frogbot", "coffee", "sicklebattery", "goldegg", "coconut", "gmocorn", "ultrarod", "goodfood", "notdrugs", "lotus"];