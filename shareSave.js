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
    const newShare = document.createElement("section");
    const attrP = document.createElement("p");

    attrP.innerHTML = "Name: " + share.name + "<br>";
    attrP.innerHTML += "Amount: " + share.amount + "<br>";
    attrP.innerHTML += "Share price: £" + share.price + "<br>";
    attrP.innerHTML += "Value: £" + share.amount * share.price;
    newShare.appendChild(attrP);

    return newShare;
}

getShares();