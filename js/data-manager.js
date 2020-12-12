let count = 10;
let currentWeek;
let currentCode = 'ar';
let element;
let score;

let months = [
    undefined,
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
];

let weeksPerMonth = {
    "Enero": [
            "2020-01-03--2020-01-10",
            "2020-01-10--2020-01-17",
            "2020-01-17--2020-01-24",
            "2020-01-24--2020-01-31",
            "2020-01-31--2020-02-07",
        ],
    "Febrero": [
            "2020-02-07--2020-02-14",
            "2020-02-14--2020-02-21",
            "2020-02-21--2020-02-28",
            "2020-02-28--2020-03-06",
    ],
    "Marzo": [
            "2020-03-06--2020-03-13",
            "2020-03-13--2020-03-20",
            "2020-03-20--2020-03-27",
            "2020-03-27--2020-04-03",
        ],
    "Abril": [
            "2020-04-03--2020-04-10",
            "2020-04-10--2020-04-17",
            "2020-04-17--2020-04-24",
            "2020-04-24--2020-05-01",
        ],
    "Mayo": [
            "2020-05-01--2020-05-08",
            "2020-05-08--2020-05-15",
            "2020-05-15--2020-05-22",
            "2020-05-22--2020-05-29",
            "2020-05-29--2020-06-05",
        ],
    "Junio": [
            "2020-06-05--2020-06-12",
            "2020-06-12--2020-06-19",
            "2020-06-19--2020-06-26",
            "2020-06-26--2020-07-03",
        ],
    "Julio": [
            "2020-07-03--2020-07-10",
            "2020-07-10--2020-07-17",
            "2020-07-17--2020-07-24",
            "2020-07-24--2020-07-31",
            "2020-07-31--2020-08-07",
        ],
    "Agosto": [
            "2020-08-07--2020-08-14",
            "2020-08-14--2020-08-21",
            "2020-08-21--2020-08-28",
            "2020-08-28--2020-09-04",
        ],
    "Septiembre": [
            "2020-09-04--2020-09-11",
            "2020-09-11--2020-09-18",
            "2020-09-18--2020-09-25",
            "2020-09-25--2020-10-02",
        ],
};

function onLoad(){
    let keys = Object.keys(gdpData);
    // for (let i = 0; i < keys.length; i++) {
    //     let key = keys[i].toLowerCase();
    //     if (!quarentine_hits[key]) {
    //         gdpData[keys[i]] = undefined;
    //     }
    // }
    createButtons();
    // convertToWeekPicker($("#weekPicker1"));
    paintmapWithClick($, '#world-map', gdpData, ' (GDP - ',')', selectCountry);
}

function createBar() {

}

function selectCountry(event, code) {
    return;
    getCountryArtists(code.toLowerCase());
}

function getHitsArray(code) {
    currentCode = code;
    let hits = quarentine_hits[code];
    if (!hits)
        hits = {};
    
    return hits[0];
}

function getGlobalHitsArray() {
    return getHitsArray('global');
}

function getCountryArtists(code) {
    let hits = getHitsArray(code);
    let n = hits.length;
    if (count < hits.length)
        n = count;

    score = [];
    for (let i = 0; i < n; i++) {
        score.push(hits[i]);
    }
    createButtons();
}

function createButtons() {
    let buttonsDiv = document.getElementById("months");
    buttonsDiv.innerHTML = '';
    for (let i = 1; i < months.length; i++) {
        let month = months[i];
        let dropdown = document.createElement('div');
        dropdown.setAttribute('class', 'dropdown');
        
        let dropbtn = document.createElement('button');
        let text = document.createTextNode(month);
        dropbtn.setAttribute('class', 'button button-rounded-8px');
        dropbtn.appendChild(text);

        let dropdownContent = document.createElement('div');
        dropdownContent.setAttribute('class', 'dropdown-content');
        dropdownContent.setAttribute('style', 'left:0; width: 200px');

        for (let j = 0; j < weeksPerMonth[month].length; j++) {
            let week = weeksPerMonth[month][j];
            let a = document.createElement('a');
            a.appendChild(document.createTextNode(week));
            a.addEventListener('click', function() {
                currentWeek = week;
                let keys = Object.keys(gdpData);
                for (let k = 0; k < keys.length; k++) {
                    let key = keys[k].toLowerCase();
                    if (!quarentine_hits[key] || !quarentine_hits[key][currentWeek]) {
                        hits[keys[k]] = 'Sin datos';                       
                        gdpData[keys[k]] = undefined;
                    } else {
                        let hit = quarentine_hits[key][currentWeek][0];
                        hits[keys[k]] = `${hit.song} -- ${hit.artist}`;                       
                        gdpData[keys[k]] = gdpDataSaved[keys[k]];
                    }
                }
                $("#world-map").empty();
                paintmapWithClick($, '#world-map', gdpData, ' (GDP - ',')', selectCountry);
            });
            dropdownContent.appendChild(a);
        }

        dropdown.appendChild(dropbtn);
        dropdown.appendChild(dropdownContent);
        buttonsDiv.appendChild(dropdown);
    }
}
