paintmap=(function($, id, datos, prefijoAMostrar, sufijoAMostrar){                                                                                //Mapas por José Gabriel Navarro Comabella C412
    $(id).vectorMap({
        map: 'world_mill',
        series: {
            regions: [{
                values: datos,
                scale: ['#0000FF', '#000000'],
                normalizeFunction: 'polynomial'
            }]
        },
        backgroundColor: "#00000000",
        onRegionTipShow: function(e, el, code){
            el.html(el.html());
        }
    });
});

paintmapWithClick=(function($, id, datos, prefijoAMostrar, sufijoAMostrar, clickfunction){                                                                                //Mapas por José Gabriel Navarro Comabella C412
    $(id).vectorMap({
        map: 'world_mill',
        series: {
            regions: [{
                values: datos,
                scale: ['#0000FF', '#000000'],
                normalizeFunction: 'polynomial'
            }]
        },
        backgroundColor: "#00000000",
        onRegionClick:clickfunction,
        onRegionTipShow: function(e, el, code){
            el.html(el.html());
        }
    });
});