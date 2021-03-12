'use strict'

const output = document.getElementById("output");

function getShares() {
    axios.get("http://localhost:8080/getShares")
        .then(res => {
            output.innerHTML = "";
            const shares = res.data;
            shares.forEach(share => {
                const newShare = renderShare(share);
                output.appendChild(newShare);
            });
        }).catch(err => console.error(err))
}

function deleteShare(id) {
    axios.delete("http://localhost:8080/delete/" + id)
        .then(() => getShares())
        .catch(err => console.error(err));
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

    const deleteShareButton = document.createElement("button");
    deleteShareButton.className = "btn btn-primary";
    deleteShareButton.innerText = "Delete";
    deleteShareButton.addEventListener('click', function () {
        deleteShare(share.id);
    });
    shareFooter.appendChild(deleteShareButton);

    const editShareButton = document.createElement("button");
    editShareButton.className = "btn btn-primary";
    editShareButton.innerText = "Edit";
    shareFooter.appendChild(editShareButton);
    return newColumn;
}

document.getElementById("shareForm").addEventListener('submit', function (event) {
    event.preventDefault();

    const data = {
        name: this.name.value,
        amount: this.amount.value,
        price: this.price.value
    };

    axios.post("http://localhost:8080/create", data)
        .then(() => {
            this.reset();
            this.name.focus();
            getShares();
        })
        .catch(err => console.error(err));
});

getShares();