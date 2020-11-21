paintmap=(function($, id, datos, prefijoAMostrar, sufijoAMostrar){                                                                                //Mapas por José Gabriel Navarro Comabella C412
    $(id).vectorMap({
        map: 'world_mill',
        series: {
            regions: [{
                values: datos,
                scale: ['#C8EEFF', '#0071A4'],
                normalizeFunction: 'polynomial'
            }]
        },
        onRegionTipShow: function(e, el, code){
            el.html(el.html()+prefijoAMostrar+gdpData[code]+sufijoAMostrar);
        }
    });
});