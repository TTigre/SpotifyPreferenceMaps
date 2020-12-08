let count = 10;
let currentCode = 'ar';
let score = undefined;

function onLoad(){
    let keys = Object.keys(gdpData);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i].toLowerCase();
        if (!top_artists_2020[key]){
            gdpData[keys[i]] = undefined;
        }
    }
    paintmapWithClick($, '#world-map', gdpData, ' (GDP - ',')', selectCountry);
}

function selectCountry(event, code) {
    getCountryArtists(code.toLowerCase());
}

function getCountryArtistsArray(code) {
    currentCode = code;
    let data = top_artists_2020;
    artists = data[code];
    if (!artists)
        artists = {};
    
    keys = Object.keys(artists);
    var artistScoreArray = []
    for (let i = 0; i < keys.length; i++)
        artistScoreArray[i] = [keys[i], artists[keys[i]]];

    artistScoreArray.sort((a, b) => {
        if (a[1] > b[1]) return 1;
        if (a[1] < b[1]) return -1;
        return 0;
    }).reverse();
    return artistScoreArray
}

function getCountryArtists(code) {
    let artistScoreArray = getCountryArtistsArray(code);
    artistScoreArray.length = count< artistScoreArray ? count : artistScoreArray.length;
    score = artistScoreArray;
    createButtons();
}

function createButtons() {
    if (score != undefined && score.length == 0) return;

    let buttonsDiv = document.getElementById("artistsButtons")

    for (let i = 0; i < score.length; i++) {
        let artist = score[i][0];
        let button = document.createElement('button');
        let text = document.createTextNode(artist);
        button.setAttribute('class', 'button button-rounded-8px');
        button.appendChild(text);
        button.addEventListener('click', function(){
            console.log(artist, currentCode);
            createGraphOf(artist);
        });
        buttonsDiv.appendChild(button);
    }
}

function createGraphOf(artist) {
    console.log('graph')
    let data = []

    artist_data_2020 = top_artists_2020[currentCode][artist] | 0;
    artist_data_2019 = top_artists_2019[currentCode][artist] | 0;
    artist_data_2018 = top_artists_2018[currentCode][artist] | 0;
    artist_data_2017 = top_artists_2017[currentCode][artist] | 0;
    artist_data_2016 = top_artists_2016[currentCode][artist] | 0;

    data.push({key: '2020', value: artist_data_2020});
    data.push({key: '2019', value: artist_data_2019});
    data.push({key: '2018', value: artist_data_2018});
    data.push({key: '2017', value: artist_data_2017});
    data.push({key: '2016', value: artist_data_2016});

    paintbar($, '#bar-graph', data);
}