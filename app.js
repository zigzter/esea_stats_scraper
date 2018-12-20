const parse = require('node-html-parser').parse;
const cloudscraper = require('cloudscraper');

const columns = [
    'Total Damage',
    'Damage Per Minute',
    'Frags',
    'Frags Per Minute',
    'Assists',
    'Assists Per Minute',
    'Deaths',
    'Deaths Per Minute',
    'Health Received',
    'Medic Picks',
    'Point Captures',
    'Point Blocks',
    'Dominations',
    'Revenges',
    'Ubercharges',
    'Ubers dropped',
];

const teams = {
    team1: [],
    team2: [],
};

const scrape = async (url) => {
    cloudscraper.get(url, (error, response, body) => {
        if (error) {
            console.log('Error occurred');
        } else {
            const root = parse(body);
            root.querySelectorAll('#body-match-total1 tr').forEach((el, i) => {
                const name = el.querySelector('td').lastChild.childNodes[0].rawText;
                teams.team1.push({ name, stats: {} });
            });
            root.querySelectorAll('#body-match-total2 tr').forEach((el, i) => {
                const name = el.querySelector('td').lastChild.childNodes[0].rawText;
                teams.team2.push({ name, stats: {} });
            });
            root.querySelectorAll('#body-match-total1 tr').forEach((el, pi) =>
                el.querySelectorAll('td.stat').forEach((el, si) => (teams.team1[pi].stats[columns[si]] = el.innerHTML))
            );
            root.querySelectorAll('#body-match-total2 tr').forEach((el, pi) =>
                el.querySelectorAll('td.stat').forEach((el, si) => (teams.team2[pi].stats[columns[si]] = el.innerHTML))
            );
            console.log(teams.team2[5]);
        }
    });
};

// scrape('http://localhost:3000/match');
scrape('https://play.esea.net/match/14268964');
