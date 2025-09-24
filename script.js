const leagueSelect = document.getElementById("league-select");
const seasonSelect = document.getElementById("season-select");
const leagueTitle = document.getElementById("league-title");
const standingsTable = document.querySelector("#standings-table tbody");

async function loadLeagues() {
  const res = await fetch("leagues.json"); // 👈 load local JSON
  const json = await res.json();
  const leagues = json.leagues;

  leagues.forEach(league => {
    const option = document.createElement("option");
    option.value = league.id;
    option.textContent = league.name;
    leagueSelect.appendChild(option);
  });

  // Save leagues for later use
  window.myLeagues = leagues;
}

leagueSelect.addEventListener("change", () => {
  const leagueId = leagueSelect.value;
  if (!leagueId) return;

  const league = window.myLeagues.find(l => l.id === leagueId);
  leagueTitle.textContent = league.name;

  seasonSelect.innerHTML = "<option value=''>Select a Season...</option>";
  seasonSelect.disabled = false;

  league.seasons.forEach(season => {
    const option = document.createElement("option");
    option.value = season.year;
    option.textContent = season.year;
    seasonSelect.appendChild(option);
  });
});

seasonSelect.addEventListener("change", () => {
  const leagueId = leagueSelect.value;
  const seasonYear = parseInt(seasonSelect.value);
  if (!leagueId || !seasonYear) return;

  const league = window.myLeagues.find(l => l.id === leagueId);
  const season = league.seasons.find(s => s.year === seasonYear);

  leagueTitle.textContent = `${league.name} - ${season.year}`;

  standingsTable.innerHTML = "";
  season.standings.forEach((team, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${team.team} </td>
      <td>${team.played}</td>
      <td>${team.wins}</td>
      <td>${team.draws}</td>
      <td>${team.losses}</td>
      <td>${team.points}</td>
    `;
    standingsTable.appendChild(row);
  });
});

loadLeagues();
