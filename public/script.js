let sviFilmovi = [];

fetch('/filmovi.csv')
  .then(res => res.text())
  .then(csv => {
    const rezultat = Papa.parse(csv, {
      header: true,
      skipEmptyLines: true
    });

    sviFilmovi = rezultat.data.map(film => ({
      title: film.Naslov,
      year: Number(film.Godina),
      genre: film.Zanr,
      duration: Number(film.Trajanje_min),
      rating: Number(film.Ocjena)
    }));

    prikaziTablicu(sviFilmovi);
  })
  .catch(err => console.error(err));

function prikaziTablicu(filmovi) {
  const tbody = document.querySelector("#filmovi-tablica tbody");
  tbody.innerHTML = "";

  filmovi.forEach(film => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${film.title}</td>
      <td>${film.year}</td>
      <td>${film.genre}</td>
      <td>${film.duration}</td>
      <td>${film.rating}</td>
    `;

    tbody.appendChild(row);
  });
}
