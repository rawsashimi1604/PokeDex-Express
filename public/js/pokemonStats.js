$(document).ready(function () {
    const pokemonStatRows = document.querySelector("#pokemonStats").getElementsByTagName("td");
    const pokemonStatNumbers = document.querySelector("#pokemonStats").querySelectorAll(".stat");

    const pokemonStats = [];
    var sum = 0;

    for (let i = 0; i < pokemonStatNumbers.length; i++) {
        pokemonStats.push({
            stat: pokemonStatNumbers[i].classList[1],
            value: pokemonStatNumbers[i].innerHTML
        })
    }

    pokemonStats.pop();

    for (let i = 0; i < pokemonStats.length; i++) {
        var currValue = pokemonStats[i].value;
        pokemonStatRows[i].querySelector("div").style.width = `calc(100% * ${currValue}/255)`;

        sum = sum + parseInt(currValue);
    }

    const pokemonTotalStat = document.querySelector("#pokemonStats").querySelector(".total");
    pokemonTotalStat.innerHTML = sum;
})