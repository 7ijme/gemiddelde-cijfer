let previousUrl = '';
const observer = new MutationObserver(function(mutations) {
    if (window.location.href !== previousUrl) {
        previousUrl = window.location.href;
        const search = new URLSearchParams(window.location.search);
        if (search.get("overview") == "true") {
            loadElement();
        } else {
            removeElement();
        }
    }
});
const config = {
    subtree: true,
    childList: true
};

// start listening to changes
observer.observe(document, config);

function loadElement() {
    const element = document.createElement("div");
    element.id = "gemiddelde";
    const average = getAverage();
    element.innerHTML = `<h2>Gemiddelde cijfer</h2><strong>${Math.round(average*100)/100}</strong>`;
    Array.from(document.querySelectorAll(".r-content")).pop().appendChild(element);
}

function removeElement() {
    const element = document.getElementById("gemiddelde");
    if (element) element.remove();
}

function getAverage() {
    const array = [];
    document.querySelectorAll("tbody>tr").forEach(i => isNaN(i.children[4].innerText) ? 0 : array.push(parseFloat(i.children[4].innerText)));
    const points = array.reduce((a, c) => a + c, 0);
    const subjects = array.length;

    const gemiddelde = points / subjects;
    return gemiddelde;
}
