// @ts-nocheck

function getMetas() {
    const message = document.querySelector('#metaTable');
    message.innerHTML = '';
    chrome.tabs.executeScript(null, {
        file: "getPageMetas.ts"
    }, () => {
        // If you try it into an extensions page or the webstore/NTP you'll get an error
        if (chrome.runtime.lastError) {
            message.innerText = 'There was an error : \n' + chrome.runtime.lastError.message;
        }
    });
}


type RequestResult = { method: string; metas: string | any[]; score: string; product_explanation: string; alternatives: string; };

chrome.runtime.onMessage.addListener((request: RequestResult) => {
    const includeMetaTable = true;
    if (includeMetaTable) {
        var metaTable = document.getElementById('metaTable');
        if (request.method == "getMetas") {
            for (var i = 0; i < request.metas.length; i++) {
                metaTable.innerHTML += "<tr><td>" + request.metas[i][0] + "</td><td>" + request.metas[i][1] + "</td><td>" + request.metas[i][2] + "</td><td>" + request.metas[i][3] + "</td><td>" + request.metas[i][4] + "</td></tr>";
            }
        }
    }
    const regex = /\d+/g; // matches any sequence of digits
    const scores = request.score.match(regex);

    const score = parseInt(scores[0]);
    console.log("before credit");
    let credit = parseInt(score / 7);
    console.log(credit);
    document.getElementById("credit").innerHTML = "+" + credit + " PlanetPal Credits";

    document.getElementById("score").innerText = score;

    document.getElementById("product_explanation").innerHTML = request.product_explanation;
    // document.getElementById("company_explanation").innerHTML = request.company_explanation;
    document.getElementById("alternatives").innerText = request.alternatives;

    // Use the score to determine the background color
    console.log(score);
    console.log(score >= 80);
    let backgroundColor: string;
    if (score > 70) {
        backgroundColor = "green";
    } else if (score < 30) {
        backgroundColor = "red";
    } else {
        backgroundColor = "yellow";
    }
    document.querySelector("#score-circle").classList.add(backgroundColor);
});

window.onload = getMetas;
