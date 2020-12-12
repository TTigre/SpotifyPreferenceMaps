function paintmap ($, id, datos, labels, onclick=() => {}){
    $(id).vectorMap({
        map: 'world_mill',
        series: {
            regions: [{
                values: datos,
                scale: ['#0000FF', '#000050'],
                normalizeFunction: 'polynomial'
            }]
        },
        backgroundColor: "#000000ff",
        onRegionClick: onclick,
        onRegionTipShow: function(e, el, code){
            el.html(el.html() + ": " + labels[code]);
        }
    });
}

function paintbar ($, id, data){
    $(id).simpleBarGraph({
        data,
        barsColor: '#002277'
    });
}