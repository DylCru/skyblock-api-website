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

function getTotalVotes(data) {
    var totalVotes = 0;
    for (let i of data.mayor.election.candidates) {
        totalVotes += i.votes;
    }
    return totalVotes;
}

var positions = ["5th", "4th", "3rd", "2nd", "1st"];
var boxColours = {
    "1st" : "rgba(255, 215, 0, 0.5)",
    "2nd" : "rgba(192, 192, 192, 0.8)",
    "3rd" : "rgba(205, 127, 50, 0.5)",
    "4th" : "rgba(150, 150, 150, 0.5)",
    "5th" : "rgba(150, 150, 150, 0.5)"
}

function swap(arr, xp, yp)
{
    var temp = arr[xp];
    arr[xp] = arr[yp];
    arr[yp] = temp;
}

async function getElectionData() {
    var data = await getApiData(api_url);
    console.log(data);

    var totalVotes = getTotalVotes(data);
    var canNum = 0;

    document.getElementById("mayorYear").innerHTML += "Skyblock election: Year " + (data.mayor.election.year - 1);
    document.getElementById("totalVotes").innerHTML += "Total Votes: " + totalVotes;

    console.log(data.mayor.election.candidates);
    can = data.mayor.election.candidates;

    for (var i = 0; i < can.length; i++) {
        for (var j = 0; j < can.length-i-1; j++)
        {
            if (can[j].votes < can[j+1].votes)
            {
                swap(can,j,j+1);
            }
        }
 
    }

    for (let i of can) {
        makeMayorBox(i, canNum, totalVotes);
        canNum++;
    }
}

function makeMayorBox(i, canNum, totalVotes){
    var percent = Math.round(i.votes / totalVotes * 100);
    var perks = "perks";
    if (i.perks.length == 1) {
        perks = "perk";
    }
    var elec = `<div id="mayorBox" style="height:800px;  width:250px; margin-top: 0px; animation: moveIn 3s ease-out forwards ${canNum}s; background-image: linear-gradient(to top, ${boxColours[positions[4 - canNum]]} ${percent}%, rgba(255, 255, 255, 0.2) ${percent}%); " class="glassBox">
                    <div class="mayorInfo centerText">
                        <h1>${positions[4 - canNum]}</h1>
                        <img src="./images/${i.name}.png" width="200px" height="450px">
                        <h1>${i.name}</h1>
                    </div>
                    <div class="electionData centerText">
                        <h1>${i.perks.length} ${perks}</h1>
                        <p>${i.votes} votes</p>
                        <p>${percent}% of the vote</p>
                    </div>
                </div>`

    document.getElementById("election").innerHTML += elec;
}


getElectionData();