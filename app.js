//app.js
const superheroDetails = {
    "Captain America": {
        name: "Steve Rogers",
        biography: "Recipient of the Super-Soldier serum, World War II hero Steve Rogers fights for American ideals as one of the world’s mightiest heroes and the leader of the Avengers."
    },
    "Ironman": {
        name: "Tony Stark",
        biography: "Genius. Billionaire. Playboy. Philanthropist. Tony Stark's confidence is only matched by his high-flying abilities as the hero called Iron Man."
    },
    "Spiderman": {
        name: "Peter Parker",
        biography: "Bitten by a radioactive spider, Peter Parker’s arachnid abilities give him amazing powers he uses to help others, while his personal life continues to offer plenty of obstacles."
    },
    "Captain Marvel": {
        name: "Carol Danvers",
        biography: "Carol Danvers becomes one of the universe's most powerful heroes when Earth is caught in the middle of a galactic war between two alien races."
    },
    "Black Widow": {
        name: "Natasha Romanov",
        biography: "Despite super spy Natasha Romanoff’s checkered past, she’s become one of S.H.I.E.L.D.’s most deadly assassins and a frequent member of the Avengers."
    },
    "Hulk": {
        name: "Bruce Banner",
        biography: "Dr. Bruce Banner lives a life caught between the soft-spoken scientist he’s always been and the uncontrollable green monster powered by his rage."
    },
    "Hawkeye": {
        name: "Clint Barton",
        biography: "A master marksman and longtime friend of Black Widow, Clint Barton serves as the Avengers’ amazing archer."
    },
    "Black Panther": {
        name: "T'challa",
        biography: "T’Challa is the king of the secretive and highly advanced African nation of Wakanda - as well as the powerful warrior known as the Black Panther."
    },
    "Thor": {
        name: "Thor Odinson",
        biography: "The son of Odin uses his mighty abilities as the God of Thunder to protect his home Asgard and planet Earth alike."
    },
    "Scarlett Witch": {
        name: "Wanda Maximoff",
        biography: "Notably powerful, Wanda Maximoff has fought both against and with the Avengers, attempting to hone her abilities and do what she believes is right to help the world."
    }
};
document.getElementById('searchButton').addEventListener('click', function(event) {
    event.preventDefault(); 
    const query = document.getElementById('searchText').value.trim();
    const url = `superheroes.php?query=${encodeURIComponent(query)}`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            console.log(data); 
            const resultDiv = document.getElementById('results');
            resultDiv.innerHTML = ''; 
            if (query === "") {
                resultDiv.innerHTML = data;
            } else {
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'text/html');
                const superheroes = Array.from(doc.querySelectorAll('li'));
                let found = false;
                superheroes.forEach(hero => {
                    const alias = hero.textContent.trim();
                    if (alias.toLowerCase() === query.toLowerCase() && superheroDetails[alias]) {
                        const details = superheroDetails[alias];
                        resultDiv.innerHTML += `<h3>${alias}</h3><h4>A.K.A ${details.name}</h4><p>${details.biography}</p><hr>`;
                        found = true;
                    }
                });
                if (!found) {
                    resultDiv.innerHTML = "<span style='color: red;'>SUPERHERO NOT FOUND</span>"; 
                }
            }
        })
        .catch(error => {
            document.getElementById('results').innerHTML = "Error fetching data: " + error.message;
        });
});