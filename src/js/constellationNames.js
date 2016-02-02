// constellationNames.js

var constellations = [
{name:"Andromeda",meaning:"Daughter of Cassiopeia",abbr:"And"},
{name:"Antlia",meaning:"The Air Pump",abbr:"Ant"},
{name:"Apus",meaning:"Bird of Paradise",abbr:"Aps"},
{name:"Aquarius",meaning:"The Water-Bearer",abbr:"Aqr"},
{name:"Aquila",meaning:"The Eagle",abbr:"Aql"},
{name:"Ara",meaning:"The Altar",abbr:"Ara"},
{name:"Aries",meaning:"The Ram",abbr:"Ari"},
{name:"Auriga",meaning:"The Charioteer",abbr:"Aur"},
{name:"Boötes",meaning:"The Herdsman",abbr:"Boo"},
{name:"Caelum",meaning:"The Chisel",abbr:"Cae"},
{name:"Camelopardalis",meaning:"The Giraffe",abbr:"Cam"},
{name:"Cancer",meaning:"The Crab",abbr:"Cnc"},
{name:"Canes Venatici",meaning:"The Hunting Dogs",abbr:"CVn"},
{name:"Canis Major",meaning:"The Big Dog",abbr:"CMa"},
{name:"Canis Minor",meaning:"The Little Dog",abbr:"CMi"},
{name:"Capricornus",meaning:"The Goat",abbr:"Cap"},
{name:"Carina",meaning:"The Keel (of Argo)",abbr:"Car"},
{name:"Cassiopeia",meaning:"The Queen",abbr:"Cas"},
{name:"Centaurus",meaning:"The Centaur",abbr:"Cen"},
{name:"Cepheus",meaning:"The King",abbr:"Cep"},
{name:"Cetus",meaning:"The Whale",abbr:"Cet"},
{name:"Chamaeleon",meaning:"The Chameleon",abbr:"Cha"},
{name:"Circinus",meaning:"The Compasses",abbr:"Cir"},
{name:"Columba",meaning:"The Dove",abbr:"Col"},
{name:"Coma Berenices",meaning:"Berenice's Hair",abbr:"Com"},
{name:"Corona Australis",meaning:"The Southern Crown",abbr:"CrA"},
{name:"Corona Borealis",meaning:"The Northern Crown",abbr:"CrB"},
{name:"Corvus",meaning:"The Crow",abbr:"Crv"},
{name:"Crater",meaning:"The Cup",abbr:"Crt"},
{name:"Crux",meaning:"The Cross",abbr:"Cru"},
{name:"Cygnus",meaning:"The Swan",abbr:"Cyg"},
{name:"Delphinus",meaning:"The Dolphin",abbr:"Del"},
{name:"Dorado",meaning:"The Swordfish",abbr:"Dor"},
{name:"Draco",meaning:"The Dragon",abbr:"Dra"},
{name:"Equuleus",meaning:"The Little Horse",abbr:"Equ"},
{name:"Eridanus",meaning:"The River",abbr:"Eri"},
{name:"Fornax",meaning:"The Furnace",abbr:"For"},
{name:"Gemini",meaning:"The Twins",abbr:"Gem"},
{name:"Grus",meaning:"The Crane (bird)",abbr:"Gru"},
{name:"Hercules",meaning:"The Son of Zeus",abbr:"Her"},
{name:"Horologium",meaning:"The Clock",abbr:"Hor"},
{name:"Hydra",meaning:"The Water Snake (female)",abbr:"Hya"},
{name:"Hydrus",meaning:"The Water Snake (male)",abbr:"Hyi"},
{name:"Indus",meaning:"The Indian (American)",abbr:"Ind"},
{name:"Lacerta",meaning:"The Lizard",abbr:"Lac"},
{name:"Leo",meaning:"The Lion",abbr:"Leo"},
{name:"Leo Minor",meaning:"The Little Lion",abbr:"LMi"},
{name:"Lepus",meaning:"The Hare",abbr:"Lep"},
{name:"Libra",meaning:"The Balance",abbr:"Lib"},
{name:"Lupus",meaning:"The Wolf",abbr:"Lup"},
{name:"Lynx",meaning:"The Lynx",abbr:"Lyn"},
{name:"Lyra",meaning:"The Lyre",abbr:"Lyr"},
{name:"Mensa",meaning:"The Table",abbr:"Men"},
{name:"Microscopium",meaning:"The Microscope",abbr:"Mic"},
{name:"Monoceros",meaning:"The Unicorn",abbr:"Mon"},
{name:"Musca",meaning:"The Fly",abbr:"Mus"},
{name:"Norma",meaning:"The Square",abbr:"Nor"},
{name:"Octans",meaning:"The Octant",abbr:"Oct"},
{name:"Ophiuchus",meaning:"The Serpent-Bearer",abbr:"Oph"},
{name:"Orion",meaning:"The Hunter",abbr:"Ori"},
{name:"Pavo",meaning:"The Peacock",abbr:"Pav"},
{name:"Pegasus",meaning:"The Winged Horse",abbr:"Peg"},
{name:"Perseus",meaning:"Rescuer of Andromeda",abbr:"Per"},
{name:"Phoenix",meaning:"The Phoenix",abbr:"Phe"},
{name:"Pictor",meaning:"The Painter",abbr:"Pic"},
{name:"Pisces",meaning:"The Fishes",abbr:"Psc"},
{name:"Piscis Austrinus",meaning:"The Southern Fish",abbr:"PsA"},
{name:"Puppis",meaning:"The Stern (of Argo)",abbr:"Pup"},
{name:"Pyxis",meaning:"The Compass",abbr:"Pyx"},
{name:"Reticulum",meaning:"The Reticle",abbr:"Ret"},
{name:"Sagitta",meaning:"The Arrow",abbr:"Sge"},
{name:"Sagittarius",meaning:"The Archer",abbr:"Sgr"},
{name:"Scorpius",meaning:"The Scorpion",abbr:"Sco"},
{name:"Sculptor",meaning:"The Sculptor",abbr:"Scl"},
{name:"Scutum",meaning:"The Shield",abbr:"Sct"},
{name:"Serpens",meaning:"The Serpent",abbr:"Ser"},
{name:"Sextans",meaning:"The Sextant",abbr:"Sex"},
{name:"Taurus",meaning:"The Bull",abbr:"Tau"},
{name:"Telescopium",meaning:"The Telescope",abbr:"Tel"},
{name:"Triangulum",meaning:"The Triangle",abbr:"Tri"},
{name:"Triangulum Australe",meaning:"The Southern Triangle",abbr:"TrA"},
{name:"Tucana",meaning:"The Toucan",abbr:"Tuc"},
{name:"Ursa Major",meaning:"The Great Bear",abbr:"UMa"},
{name:"Ursa Minor",meaning:"The Little Bear",abbr:"UMi"},
{name:"Vela",meaning:"The Sails (of Argo)",abbr:"Vel"},
{name:"Virgo",meaning:"The Maiden",abbr:"Vir"},
{name:"Volans",meaning:"The Flying Fish",abbr:"Vol"},
{name:"Vulpecula",meaning:"The Fox",abbr:"Vul"}
];

var index = 0;

function initial() {
	var hash = window.location.hash.slice(1);
	var hashIndex = indexOfHash(hash);
	if(hashIndex != null){
		index = hashIndex;
		return constellations[hashIndex].abbr;
	}
	return getAbbr()
}
function getAbbr(){
	// This creates cyclical navigation
	if (index > constellations.length-1 ) index = 0;
	else if (index < 0 ) index = constellations.length-1;
	// Change URL hash to be that of current constellation
	window.location.hash = '#'+constellations[index].abbr;
	return constellations[index].abbr;
}
function next() {
	index++;
	return getAbbr();
}

function prev() {
	index--;
	return getAbbr();
}
function indexOfHash(hash){
	for(var i = 0; i < constellations.length; i++){
		if (constellations[i].abbr === hash) {
			console.log('Found a match');
			return i;
		}
	}
	return null;
}
module.exports = {
	initial: initial,
	next: next,
	prev: prev
}