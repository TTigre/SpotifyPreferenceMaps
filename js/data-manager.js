const mapLabelSeparator = ', de';

let selectedMonthBtn;
let selectedWeekBtn;
let currentWeek = '2020-01-03--2020-01-10';  // First week of the year
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

function onLoad() {
    document.getElementById('top-text')
        .appendChild(
            document.createTextNode(
                `La canción mas escuchada a nivel global durante esta semana fue: ${quarentine_hits.global[currentWeek][0].song}`
            )
        );
    createButtons();
    document.getElementById('months').firstChild.dispatchEvent(new Event('click'));
}

function getHitsLabelsAndPercents(){
    let label = {};
    let percent = {};
    let counter = {}
    let totalOfCountries = 0
    for (let i = 0; i < domains.length; i++) {
        let domain = domains[i].toLowerCase();
        if (!quarentine_hits[domain] || !quarentine_hits[domain][currentWeek])
            label[domains[i]] = 'Sin Datos';
        else {
            totalOfCountries++;
            let hit = quarentine_hits[domain][currentWeek][0];
            label[domains[i]] = `${hit.song}${mapLabelSeparator} ${hit.artist}`;
            if (counter[hit.song])
                counter[hit.song]++;
            else counter[hit.song] = 1;
        }
    }

    for (let i = 0; i < domains.length; i++) {
        let domain = domains[i].toLowerCase();
        if (!quarentine_hits[domain] || !quarentine_hits[domain][currentWeek]) {
            percent[domains[i]] = undefined;
            continue;
        }

        let hit = quarentine_hits[domain][currentWeek][0];
        percent[domains[i]] =  (counter[hit.song] / totalOfCountries) * 100;
    }
    return [label, percent];
}

function createBar(labels, percents) {
    const keys = Object.keys(percents);
    const dataObj = {};
    for (let i = 0; i < keys.length; i++)
        if (labels[keys[i]] && percents[keys[i]])
            dataObj[labels[keys[i]]] = percents[keys[i]].toFixed(2);

    const sortedKeys = Object.keys(dataObj).sort((a, b) => dataObj[a] - dataObj[b]).reverse();

    const data = sortedKeys.map(s => { return {key: s.split(mapLabelSeparator)[0].trim(), value: Math.round(dataObj[s])}});
    data.length = 7;

    $('#bar-graph').empty();
    paintbar($, '#bar-graph', data);
}

function createButtons() {
    let buttonsDiv = document.getElementById("months");
    buttonsDiv.innerHTML = '';
    for (let i = 1; i < months.length; i++) {
        let month = months[i];
        let monthBtn = document.createElement('button');
        monthBtn.setAttribute('class', 'button button-rounded-8px');
        monthBtn.appendChild(document.createTextNode(month));
        monthBtn.addEventListener('click', () => {
            if (selectedMonthBtn)
                selectedMonthBtn.setAttribute('class', 'button button-rounded-8px')
            selectedMonthBtn = monthBtn;
            selectedMonthBtn.setAttribute('class', 'selected-button button-rounded-8px')

            const weeksDiv = document.getElementById('weeks');
            weeksDiv.innerHTML = '';
            for (let j = 0; j < weeksPerMonth[month].length; j++) {
                const week = weeksPerMonth[month][j];
                const weekBtn = document.createElement('button');
                weekBtn.setAttribute('class', 'button button-rounded-8px animated fadeInLeft');
                weekBtn.appendChild(document.createTextNode(week.replace('--', ' - ')));
                weekBtn.addEventListener('click', () => {
                    if (selectedWeekBtn)
                        selectedWeekBtn.setAttribute('class', 'button button-rounded-8px animated fadeInLeft')
                    selectedWeekBtn = weekBtn;
                    selectedWeekBtn.setAttribute('class', 'selected-button button-rounded-8px animated fadeInLeft')

                    currentWeek = week;
                    const pair = getHitsLabelsAndPercents()
                    const label = pair[0];
                    const percent = pair[1];

                    const textNode = document.getElementById('top-text');
                    textNode.innerText = '';
                    textNode.appendChild(
                        document.createTextNode(
                            `La canción mas escuchada a nivel global es : ${quarentine_hits.global[currentWeek][0].song}`
                        )
                    );
                    $("#world-map").empty();
                    paintmap($, '#world-map', percent, label);
                    createBar(label, percent);
                })
                weeksDiv.appendChild(weekBtn);
            }
            weeksDiv.firstChild.dispatchEvent(new Event('click'));
        })
        buttonsDiv.appendChild(monthBtn);
    }
}
