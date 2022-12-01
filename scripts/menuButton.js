var menuOpen = false;

function onClick(){
    document.getElementById("navbar").classList = "";
    if (!menuOpen) {
        document.getElementById("navbar").classList += "navBarAnimShow";
        document.getElementById("navbar").innerHTML += `<ul>
                                                            <li><a href="current_election.html">Current Election</a></li>
                                                            <li><a>Stats viewer</a></li>
                                                            <li><a href="current_mayor.html">Current Mayor</a></li>
                                                        </ul>`
        menuOpen = true;
    } else {
        document.getElementById("navbar").classList += "navBarAnimHide";
        document.getElementById("navbar").innerHTML = "";
        menuOpen = false;
    }
}