var count = 10;
var currentWeek;
var currentCode = 'ar';
var element;
var score;

var months = [
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

var weeksPerMonth = {
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
    createButtons();
    // convertToWeekPicker($("#weekPicker1"));
    // paintmapWithClick($, '#world-map', gdpData, ' (GDP - ',')', selectCountry);
}

function createBar() {

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
    var buttonsDiv = document.getElementById("months");
    buttonsDiv.innerHTML = '';
    for (var i = 1; i < months.length; i++) {
        var month = months[i];
        var dropdown = document.createElement('div');
        dropdown.setAttribute('class', 'dropdown');
        
        var dropbtn = document.createElement('button');
        var text = document.createTextNode(month);
        dropbtn.setAttribute('class', 'button button-rounded-8px');
        dropbtn.appendChild(text);

        var dropdownContent = document.createElement('div');
        dropdownContent.setAttribute('class', 'dropdown-content');
        dropdownContent.setAttribute('style', 'left:0;');

        for (var j = 0; j < weeksPerMonth[month].length; j++) {
            var week = weeksPerMonth[month][j];
            var a = document.createElement('a');
            a.appendChild(document.createTextNode(week));
            a.addEventListener('click', function() {
                currentWeek = week;
                console.log(currentWeek);
            });
            dropdownContent.appendChild(a);
        }

        dropdown.appendChild(dropbtn);
        dropdown.appendChild(dropdownContent);
        // button.addEventListener('click', function(){
        //     createGraphOf(month);
        // });
        buttonsDiv.appendChild(dropdown);
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

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction(id) {
    console.log(id);
    if (element)
        element.classList.toggle("show");
    element = document.getElementById(id);
    element.classList.toggle("show");
}
  
// Close the dropdown if the user clicks outside of it
// window.onclick = function(event) {
//     if (!event.target.matches('.dropbtn')) {
//         var dropdowns = document.getElementsByClassName("dropdown-content");
//         var i;
//         for (i = 0; i < dropdowns.length; i++) {
//             var openDropdown = dropdowns[i];
//             if (openDropdown.classList.contains('show')) {
//                 openDropdown.classList.remove('show');
//             }
//         }
//     }
// };