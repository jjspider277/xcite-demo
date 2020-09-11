let newPlayer = new Player("Heroic Player 2");

function createPlayer() {
	setName();
	setAvatar();
	refresh();
}

function setAvatar() {
	document.getElementById("player_avatar").src = newPlayer.getAvatar();
}

function loadPlayer(loadedPlayer) {
	refreshAvatar(loadedPlayer);
	loadName(loadedPlayer);
	refreshBaseAttribute(loadedPlayer);
	loadDamageTaken(loadedPlayer);
	refresh();
}

function refresh() {
	refreshMainAttributes();
	refreshCombatAttributes();
	refreshBaseAttribute();
	loadSkills();
}

function loadName(loadedPlayer) {
	document.getElementById("attr_name").innerHTML = loadedPlayer.getName();
	document.getElementById("player_name").value = loadedPlayer.getName();
}

function loadDamageTaken(loadedPlayer) {
	document.getElementById("attr_damage_taken").innerHTML = loadedPlayer.getDamage();
}

function refreshAvatar(loadedPlayer) {
	document.getElementById("player_avatar").src = loadedPlayer.getAvatar();
}

function setName() {
	let player_name = document.getElementById("player_name").value;
	document.getElementById("attr_name").innerHTML = player_name;
	newPlayer.setName(player_name);
}
function refreshMainAttributes() {
	let mainAttributes = Object.keys(newPlayer.baseAttributes);
	mainAttributes.forEach(attrib => {
		document.getElementById("attr_" + attrib).innerHTML = newPlayer.baseAttributes[attrib];
	});
}
function changeAttribute() {
	let value = prompt("Train your " + newPlayer.getBaseAttribute().toUpperCase(), "0");
	if (value == null || value == undefined || isNaN(value) || value < 0 || value > 100) {
		return;
	}
	newPlayer.setBaseAttributeValue(parseInt(value));
	refresh();
}

function setBaseAttribute(selectedMainAttr) {
	newPlayer.setBaseAttribute(selectedMainAttr);
	refresh();
}

function refreshBaseAttribute() {
	selectedMainAttr = newPlayer.getBaseAttribute()
	this.document.getElementById("main_attribute_selected").innerHTML = "You main attribute is " + selectedMainAttr;
	container = document.getElementById(`attr_${selectedMainAttr}`);
	var elems = document.querySelectorAll(".selected_main_attrib");
	[].forEach.call(elems, function (el) {
		el.classList.remove("selected_main_attrib");
	});
	container.parentNode.className += "selected_main_attrib ";
}

function selectBaseAttribute(container) {
	var elems = document.querySelectorAll(".selected_main_attrib");
	[].forEach.call(elems, function (el) {
		el.classList.remove("selected_main_attrib");
	});

	let selectedMainAttr = container.childNodes[1].id.split("_")[1];
	setBaseAttribute(selectedMainAttr);
}

function updateDamageTaken(value) {
	newPlayer.setDamage(parseInt(value));
}
function setDamage() {
	let value = prompt("Damage taken", "0");
	if (value == null || value == undefined || isNaN(value) || value < 0 || value > 100) {
		return;
	}
	updateDamageTaken(value);
	refresh();
}
function refreshCombatAttributes() {
	let combatAttributes = Object.keys(newPlayer.combatAttributes);
	combatAttributes.forEach(attrib => {
		document.getElementById("attr_" + attrib).innerHTML = newPlayer.combatAttributes[attrib];
	});

	// damage taken
	this.document.getElementById("attr_damage_taken").innerHTML = " Damage Taken :" + newPlayer.getDamage();
}

function exportCharacter(el) {
	var obj = newPlayer;
	var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
	// what to return in order to show download window?

	el.setAttribute("href", "data:" + data);
	el.setAttribute("download", newPlayer.getName() + ".json");
}

function importPlayer(playerObj) {
	console.log(playerObj);
	newPlayer = new Player();
	newPlayer.setName(playerObj.name);
	newPlayer.setAvatar(playerObj.playerAvatar);
	newPlayer.setBaseAttributes(playerObj.baseAttributes);
	newPlayer.setBaseAttribute(playerObj.selectedBaseAttribute);
	newPlayer.setCombatAttributes(playerObj.combatAttributes);
	newPlayer.setDamage(playerObj.damageTaken);

	loadPlayer(newPlayer);
}
function importCharacter(el) {

	var input = document.createElement('input');
	input.type = 'file';
	input.click();

	input.addEventListener('change', (event) => {
		const fileList = event.target.files;
		const reader = new FileReader();
		reader.addEventListener('load', (event) => {

			importPlayer(JSON.parse(reader.result))

		});
		reader.readAsText(fileList[0]);
	})
};

function changeAvatar() {
	let newAvatar = AVATAR_DEFAULT_CONST + Math.random() * 100;
	newPlayer.setAvatar(newAvatar);
	refreshAvatar(newPlayer);
}

function updateRank(skill) {
	newPlayer.updateSkill(skill);
	loadSkills();
}

function loadSkills() {
	this.document.getElementById("skills_attr").innerHTML = '';

	Object.keys(newPlayer.getSkills()).forEach(skill => {
		skillObj = newPlayer.getSkills()[skill];
		this.document.getElementById("skills_attr").innerHTML += `<div class="skill"> <div class="skill_name"> <h5>${skillObj.getSkill()}</h5><h5> Rank ${skillObj.getRank().level}</h5><h5>  ${skillObj.getRank().description}</h5></div><button onclick="updateRank( '${skillObj.getSkill()}')">+</button</div>`;

	});

}

createPlayer();