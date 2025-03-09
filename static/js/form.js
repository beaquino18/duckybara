const cities = ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa", "Edmonton", "Quebec City", "Winnipeg", "Hamilton", "Kitchener", "London", "Victoria", "Halifax", "Oshawa", "Windsor", "Saskatoon", "Regina", "St. John's", "Barrie", "Kelowna"];

function autocomplete(input) {
    let currentFocus;
    input.addEventListener("input", function() {
        let list, item, val = this.value;
        closeAllLists();
        if (!val) return false;
        currentFocus = -1;
        list = document.createElement("div");
        list.setAttribute("id", this.id + "autocomplete-list");
        list.setAttribute("class", "autocomplete-suggestions");
        this.parentNode.appendChild(list);
        for (let i = 0; i < cities.length; i++) {
            if (cities[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                item = document.createElement("div");
                item.innerHTML = "<strong>" + cities[i].substr(0, val.length) + "</strong>";
                item.innerHTML += cities[i].substr(val.length);
                item.innerHTML += "<input type='hidden' value='" + cities[i] + "'>";
                item.addEventListener("click", function() {
                    input.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                list.appendChild(item);
            }
        }
    });
    input.addEventListener("keydown", function(e) {
        let x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) {
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();
           1) {
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        for (let i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
           function closeAllLists(elmnt) {
        const x = document.getElementsByClassName("autocomplete-suggestions");
        for (let i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != input) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    document.addEventListener("click", function(e) {
        closeAllLists(e.target);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    autocomplete(document.getElementById("location"));
});

function toggleSelection(button) {
    button.classList.toggle('selected');
    const eventTypeInput = document.getElementById('event_type');
    const selectedButtons = document.querySelectorAll('.event-button.selected');
    const selectedValues = Array.from(selectedButtons).map(btn => btn.value);
    eventTypeInput.value = selectedValues.join(',');
} }