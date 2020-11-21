var mymap = L.map('mapid').setView([51.505, -0.09], 13)
var circle = L.circle([51.508, -0.11],{
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(mymap)