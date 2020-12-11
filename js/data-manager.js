var count = 10;
var currentWeek;
var currentCode = 'ar';
var score;

var month = [
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
    'Octubre',
    'Noviembre',
    'Diciembre'
];

var weeks_per_month = {
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
    var keys = Object.keys(gdpData);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i].toLowerCase();
        if (!quarentine_hits[key]) {
            gdpData[keys[i]] = undefined;
        }
    }
    convertToWeekPicker($("#weekPicker1"))
    paintmapWithClick($, '#world-map', gdpData, ' (GDP - ',')', selectCountry);
}

function selectCountry(event, code) {
    getCountryArtists(code.toLowerCase());
}

function getHitsArray(code) {
    currentCode = code;
    var hits = quarentine_hits[code];
    if (!hits)
        hits = {};
    
    return hits[0];
}

function getGlobalHitsArray() {
    return getHitsArray('global');
}

function getCountryArtists(code) {
    var hits = getHitsArray(code);
    var n = hits.length;
    if (count < hits.length)
        n = count;

    score = [];
    for (var i = 0; i < n; i++) {
        score.push(hits[i]);
    }
    createButtons();
}

function createButtons() {
    var buttonsDiv = document.getElementById("artists-buttons");
    buttonsDiv.innerHTML = '';

    if (!score || (score != undefined && score.length == 0)) {
        document.getElementById("empty-message").innerHTML = '<p>No se tienen datos de este país</p>';
        document.getElementById("bar-graph").innerHTML = '';
        return;
    }

    document.getElementById("empty-message").innerHTML = '';

    for (var i = 0; i < score.length; i++) {
        var artist = score[i][0];
        var button = document.createElement('button');
        var text = document.createTextNode(artist);
        button.setAttribute('class', 'button button-rounded-8px');
        button.appendChild(text);
        button.addEventListener('click', function(){
            createGraphOf(artist);
        });
        buttonsDiv.appendChild(button);
    }
}

function createGraphOf(artist) {
    var data = [];

    artist_data_2020 = quarentine_hits[currentCode][artist] | 0;

    data.push({key: '2020', value: artist_data_2020});
    data.push({key: '2019', value: artist_data_2019});
    data.push({key: '2018', value: artist_data_2018});
    data.push({key: '2017', value: artist_data_2017});
    data.push({key: '2016', value: artist_data_2016});

    paintbar($, '#bar-graph', data);
}