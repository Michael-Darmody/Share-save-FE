'use strict'

const output = document.getElementById("output");

function getShares() {
    axios.get("http://localhost:8080/getShares")
        .then(res => {
            const shares = res.data;
            shares.forEach(share => {
                const newShare = renderShare(share);
                output.appendChild(newShare);
            });
        }).catch(err => console.error(err))
}

function renderShare(share) {

    const newColumn = document.createElement("section");
    newColumn.className = "col";

    const newShare = document.createElement("section");
    newShare.className = "card";
    newColumn.appendChild(newShare);

    const shareBody = document.createElement("section");
    shareBody.className = "card-body";
    newShare.appendChild(shareBody);

    const shareName = document.createElement("h5");
    shareName.className = "card-title";
    shareName.innerText = share.name;
    shareBody.appendChild(shareName);

    const shareText = document.createElement("p");
    shareText.className = "card-text";
    shareText.innerHTML = "Name: " + share.name;
    shareText.innerHTML += "<br>";
    shareText.innerHTML += "Amount: " + share.amount;
    shareText.innerHTML += "<br>";
    shareText.innerHTML += "Share price:  £" + share.price;
    shareText.innerHTML += "<br>";
    shareText.innerHTML += "Value:  £" + share.amount * share.price;
    shareBody.appendChild(shareText);

    const shareFooter = document.createElement("section");
    shareFooter.className = "card-footer"
    newShare.appendChild(shareFooter);

    return newColumn;
}

getShares();