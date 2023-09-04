let skladište = {};
let rashodi = 0; 
let prihodi = 0; 

function dodajNaSkladiste() {
    const voce = document.getElementById("voce").value;
    const kolicina = parseInt(document.getElementById("kolicina").value);

    if (voce && kolicina) {
        if (skladište[voce]) {
            skladište[voce].kolicina += kolicina;
        } else {
            skladište[voce] = {
                kolicina: kolicina,
                nabavnaCijena: 0, 
            };
        }

        updateSkladiste();
    }
}

function nabavi() {
    const voce = document.getElementById("nabava_voce").value;
    const kolicina = parseInt(document.getElementById("nabava_kolicina").value);
    const nabavnaCijena = parseFloat(document.getElementById("nabava_cijena").value);

    if (voce && kolicina && nabavnaCijena) {
        if (skladište[voce]) {
            skladište[voce].kolicina += kolicina;
            skladište[voce].nabavnaCijena = nabavnaCijena;
        } else {
            skladište[voce] = {
                kolicina: kolicina,
                nabavnaCijena: nabavnaCijena,
            };
        }

        rashodi += kolicina * nabavnaCijena; 
        updateSkladiste();
    }
}

function prodaj() {
    const voce = document.getElementById("prodaja_voce").value;
    const kolicina = parseInt(document.getElementById("prodaja_kolicina").value);

    if (voce && kolicina) {
        if (skladište[voce] && skladište[voce].kolicina >= kolicina) {
            const prodajnaCijena = parseFloat(document.getElementById("prodaja_cijena").value);
            if (prodajnaCijena) {
                skladište[voce].kolicina -= kolicina;
                kreirajRacun(voce, kolicina, prodajnaCijena);
                prihodi += kolicina * prodajnaCijena; 
            } else {
                alert("Unesite prodajnu cijenu!");
            }
        } else {
            alert("Nema dovoljno voća na skladištu!");
        }

        updateSkladiste();
    }
}

function kreirajRacun(voce, kolicina, cijena) {
    const racuniDiv = document.getElementById("racuni");
    const racun = document.createElement("p");
    const ukupno = kolicina * cijena;
    racun.textContent = `Prodano ${kolicina} kg ${voce} po cijeni ${cijena.toFixed(2)} ukupno: ${ukupno.toFixed(2)}`;
    racuniDiv.appendChild(racun);
}

function updateSkladiste() {
    const skladisteDiv = document.getElementById("skladiste");
    skladisteDiv.innerHTML = "<h3>Trenutno stanje skladišta:</h3>";

    for (const voce in skladište) {
        const kolicina = skladište[voce].kolicina;
        const nabavnaCijena = skladište[voce].nabavnaCijena;
        skladisteDiv.innerHTML += `<p>${voce}: ${kolicina} kg, Nabavna cijena: ${nabavnaCijena.toFixed(2)}</p>`;
    }

    const profit = prihodi - rashodi;
    skladisteDiv.innerHTML += `<p>Rashodi: ${rashodi.toFixed(2)}</p>`;
    skladisteDiv.innerHTML += `<p>Prihodi: ${prihodi.toFixed(2)}</p>`;
    skladisteDiv.innerHTML += `<p>Profit: ${profit.toFixed(2)}</p>`;
}
