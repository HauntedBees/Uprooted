function GetText(key) {
	try {
		var lang = (game !== undefined) ? game.language : "en-dm";
		var d = fulltext[key];
		if(d[lang] !== undefined) { return d[lang]; }
		return d["en-us"];
	} catch(e) {
		console.log("Couldn't find key: " + key);
		return "fucko"; //throw e;
	}
}
function HandleArticles(mainStr, subject) {
    if(lingHelpers.ArticleHandler[game.language] != undefined) { return lingHelpers.ArticleHandler[game.language](mainStr, subject); }
    return lingHelpers.ArticleHandler["en-us"](mainStr, subject);
}
function HandlePlurals(mainStr, subject) {
    if(lingHelpers.PluralHandler[game.language] != undefined) { return lingHelpers.PluralHandler[game.language](mainStr, subject); }
    return lingHelpers.PluralHandler["en-us"](mainStr, subject);
}
function HandleLists(mainStr, needle, list, nothingKey, pluralizeSingular) {
    if(lingHelpers.ListHandler[game.language] != undefined) { return lingHelpers.ListHandler[game.language](mainStr, needle, list, nothingKey, pluralizeSingular); }
    return lingHelpers.ListHandler["en-us"](mainStr, needle, list, nothingKey, pluralizeSingular);
}
function HandleGifts(item, amount) {
    if(lingHelpers.GiftHandler[game.language] != undefined) { return lingHelpers.ListHandler[game.language](item, amount); }
    return lingHelpers.GiftHandler["en-us"](item, amount);
}
function HasText(key) { return fulltext[key] !== undefined; }

var lingHelpers = { ArticleHandler: {}, PluralHandler: {}, ListHandler: {}, GiftHandler: {} };
lingHelpers.ArticleHandler["en-us"] = function(mainStr, subject) {
    if(subject === undefined || subject === "" || mainStr.indexOf("{an}") < 0) { return mainStr; }
	if(subject[subject.length - 1] === "s") {                   // subject ends in "s": {an} => (nothing)
		return mainStr.replace(/\{an\}/g, "");
	} else if("aeiou".indexOf(subject[0].toLowerCase()) >= 0) { // subject begins with a vowel: {an} => " an"
		return mainStr.replace(/\{an\}/g, " an");
	} else {                                                    // otherwise: {an} => " a"
		return mainStr.replace(/\{an\}/g, " a");
	}
};
lingHelpers.PluralHandler["en-us"] = function(mainStr, subject) {
    if(subject === undefined || mainStr.indexOf("{s}") < 0) { return mainStr; }
	if(subject === 1) {                                         // subject is 1: {s} => (nothing)
		return mainStr.replace(/\{s\}/g, "");
	} else {                                                    // otherwise: {s} => "s"
		return mainStr.replace(/\{s\}/g, "s");
	}
};
lingHelpers.ListHandler["en-us"] = function(mainStr, needle, list, nothingKey, pluralizeSingular, showCopula) {
    if(list === undefined || mainStr.indexOf(needle) < 0) { return mainStr; }
	if(list.length === 0) {                                     // list is empty: needle => GetText(nothingKey)
        return mainStr.replace(needle, GetText(nothingKey));
    } else if(list.length === 1) {                              // list has one item: needle => "are [...]" or "is [...]"
        return mainStr.replace(needle, (showCopula ? (pluralizeSingular ? "are " : "is ") : "") + list[0]);
    } else {                                                    // list has many items: needle => "are [...], [...], and [...]"
        var listStr = list.join(", ");
        var lastComma = listStr.lastIndexOf(",");
        listStr = listStr.substring(0, lastComma) + " and" + listStr.substring(lastComma + 1);
        return mainStr.replace(needle, (showCopula ? "are " : "") + listStr);
    }
};
lingHelpers.GiftHandler["en-us"] = function(item, amount) {
    var outStr = GetText("gift.itemname");
    var itemDetails = GetCrop(item);
    if(["veg", "tree", "mush", "rice"].indexOf(itemDetails.type) < 0) {
        outStr = outStr.replace(/\{seed\}/g, "");
    } else {
        outStr = outStr.replace(/\{seed\}/g, GetText("gift.itemseed"));
    }
    return outStr.replace(/\{count\}/g, amount).replace(/\{item\}/g, itemDetails.displayname).replace(/\{s\}/g, amount === 1 ? "" : "s");
};