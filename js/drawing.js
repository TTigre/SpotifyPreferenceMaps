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
        backgroundColor: "#E0E0E0",
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

function plot(data){
    document.getElementById('graph').innerHTML = '';

    const svg = d3.select("svg"),
        margin = 200,
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin;

    const x = d3.scaleBand().range([0, width]).padding(0.4),
        y = d3.scaleLinear().range([height, 0]);

    const g = svg.append("g")
        .attr("transform", "translate(" + 100 + "," + 100 + ")");

    function onMouseOver(e, d) {
        d3.select(this).attr('class', 'highlight');
        d3.select(this)
            .transition()     // adds animation
            .duration(400)
            .attr('width', x.bandwidth() + 5)
            .attr("y", function(d) { return y(d.value) - 10; })
            .attr("height", function(d) { return height - y(d.value) + 10; });

        g.append("text")
            .attr('class', 'val text-center')
            .attr('x', function() {
                return x(d.key);
            })
            .attr('y', function() {
                return y(d.value) - 15;
            })
            .text(function() {
                return [d.label];  // Value of the text
            });
    }

    function onMouseOut(e, d) {
        // use the text label class to remove label on mouseout
        d3.select(this).attr('class', 'bar');
        d3.select(this)
            .transition()     // adds animation
            .duration(400)
            .attr('width', x.bandwidth())
            .attr("y", function(d) { return y(d.value); })
            .attr("height", function(d) { return height - y(d.value); });

        d3.selectAll('.val')
            .remove()
    }

    x.domain(data.map(function(d) { return d.key; }));
    y.domain([0, d3.max(data, function(d) { return d.value; })]);

    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .append("text")
        .attr("y", height - 250)
        .attr("x", width - 100)
        .attr("text-align", "end")
        .attr("font-size", 12)
        .attr("stroke", "white")
        .text("Top 10 global");

    g.append("g")
        .call(d3.axisLeft(y).tickFormat(function(d){
            return d;
        }).ticks(5))
        .append("text")
        .attr("transform", "rotate(0)")
        .attr("y", 6)
        .attr("dy", "-5.1em")
        .attr("font-size", 12)
        .attr("text-anchor", "end")
        .attr("stroke", "white")
        .text("Streams");

    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("style", "fill: #002277")
        .on("mouseover", onMouseOver) //Add listener for the mouseover event
        .on("mouseout", onMouseOut)   //Add listener for the mouseout event
        .attr("x", function(d) { return x(d.key); })
        .attr("y", function(d) { return y(d.value); })
        .attr("width", x.bandwidth())
        .transition()
        .ease(d3.easeLinear)
        .duration(400)
        .delay(function (d, i) {
            return i * 50;
        })
        .attr("height", function(d) { return height - y(d.value); });
}
