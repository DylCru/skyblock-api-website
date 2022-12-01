//api.hypixel.net
const api_url = "https://api.hypixel.net/resources/skyblock/election"
var colorCodes = ["§4", "§c", "§6", "§e", "§2", "§a", "§b", "§3", "§1", "§9", "§d", "§5", "§f", "§7", "§8", "§0"];

const imgFolder = "images/"
var mayorPics = {
    "Aatrox" : "aatrox.png",
    "Diana" : "diana.png",
    "Cole" : "cole.png",
    "Foxy" : "foxy.png",
    "Marina" : "marina.png",
    "Paul" : "paul.png",
    "Diaz" : "diaz.png",
    "Finnegan" : "finnegan.png",
    "Jerry" : "jerry.png",
    "Derpy" : "derpy.png",
    "Scorpius" : "scorpius.png"
};

async function getApiData(url) {
    const responce = await fetch(url);
    var data = await responce.json();
    return data;
}

async function getCurrentMayor() {
    var data = await getApiData(api_url);
    console.log(data);

    document.getElementById("mayorImg").src = imgFolder + mayorPics[data.mayor.name];
    document.getElementById("mayorName").innerHTML += "<h1>The current mayor is " + data.mayor.name + ".</h1>";
    document.getElementById("mayorYear").innerHTML += "Skyblock election: Year " + data.mayor.election.year;

    for (let p of data.mayor.perks) {
        for (let l of colorCodes) {
            p.description = p.description.replaceAll(l, "");
        }

        let perk = `<div class="perk">
        <h1 style="color: red">${p.name}</h1>
        <p>${p.description}</p>
        </div>`

        document.getElementById("perks").innerHTML += perk;
    }
}

getCurrentMayor();

