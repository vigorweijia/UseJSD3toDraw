
function getRectColor(scale) {
    color = "";
    if(scale == 0) color = "#ffffff";
    else if(scale > 0 && scale <= 25) color = "#dddddd";
    else if(scale > 25 && scale <= 50) color = "#bbbbbb";
    else if(scale > 50 && scale <= 75) color = "#999999";
    else if(scale > 75 && scale <= 100) color = "#777777";
    else if(scale > 100 && scale <= 125) color = "#555555";
    else if(scale > 125 && scale <= 150) color = "#454545";
    else if(scale > 150 && scale <= 175) color = "#353535";
    else color = "#111111";
    return color;
}


//为调整比例尺的函数，方便画图
function getLinearScale(d) {
    var min = d3.min(dataset);//得到最小值
    var max = d3.max(dataset);//得到最大值
    var scaleLinear = d3.scaleLinear()
                        .domain([min,max])
                        .range([0,200]);
    return scaleLinear;
}


//为设置折线点颜色的函数
function getDotColor(d) {
    color = "";
    if(d == 0) color = "#ffffff";
    else if(d > 0 && d <= 20) color = "#ffd0d0";
    else if(d > 20 && d <= 40) color = "#ee8080";
    else if(d > 40 && d <= 60) color = "#ff8080";
    else if(d > 40 && d <= 60) color = "#cc0000";
    else if(d > 60 && d <= 80) color = "#aa0000";
    else color = "#880000";
    return color;
}

padding = {top: 20, right: 20, bottom: 20, left: 20};
rectStep = 10;
rectWidth = 10;
rectHeight = 100;

//画矩形及折线的函数
function addRectAndCrvLine(dataset, dataline) {
    var width = dataset.length * rectWidth + 50;
    var height = rectHeight;
    var svg = d3.select("body")
                //.append("tspan")
                .append("svg")
                .attr("height",height)
                .attr("width",width);

    //提示框元素变量
    var tooltip = d3.select("body")
        .append("div")
        .attr("class","tooltip")
        .style("opacity",0.0);

    var rect = svg.selectAll("rect").data(dataset).enter().append("rect")
        .attr("datam",function (d) {
            return d;
        })
        .attr("fill",function(d) {
            //return getRectColor(getLinearScale(d));
            return getRectColor(d);
        })
        .attr("x",function (d,i) {
            return padding.left + i * rectStep;
        })
        .attr("y",0)
        .attr("width",rectWidth)
        .attr("height",rectHeight)
        .on("mouseover",function(d,i){ //鼠标事件监听
            var rect = d3.select(this)
                .transition()
                .duration(800)//当鼠标放在矩形上时，矩形变成黄色
                .attr("fill","#00f080");
            var str = "commits: " + d + "\nmodify: " + dataline[i];
            tooltip.html(str)     //设置数据显示框
                .style("left", (d3.event.pageX - 20) + "px")
                .style("top", (d3.event.pageY + 20) + "px")
                .style("opacity",0.7);  //显示框透明度
        })
        .on("mouseout",function(){    //鼠标事件监听
            var rect = d3.select(this)
                .transition()
                .delay(1000)
                .duration(1000)//当鼠标移出时，矩形变成原来的颜色
                .attr("fill",function(d) {
                    return getRectColor(d);
                });

            tooltip.style("opacity",0.0);  //将显示框置为透明不可见

        });

    //绘制折线图，和d3 v3版本不同
    var oneLine = d3.line()
        .x(function (d,i) {
        return padding.left + 5 + i*rectStep;
        })
        .y(function (d,i) {
            return rectHeight - d;
        })
        .curve(d3.curveLinear);
    //需要注意把填充设置为none，然后设置描边宽度
    svg.append("path").attr("class","line").attr("d",oneLine(dataline)).attr("fill","none").attr("stroke","#00ff00").attr("stroke-width","1.5px");

    var dot = svg.selectAll("circle")
                 .data(dataline).enter()
                 .append("circle")
                 .attr("cx", function (d,i) {
                    return padding.left + i*rectStep + 5;
                 })
                 .attr("cy",function (d,i) {
                    return rectHeight - d;
                 })
                 .attr("r", 3)
                 .attr("fill", function (d,i) {
                    return getDotColor(d,i);
                 });
}


//下面调用
for(i = 0; i < 10; i++) {
    dataset = [(i*67+3*i)%200];
    dataline = [(i*31+7*i)%100];
    for(j = 1; j < 100; j++) {
        dataset.push((dataset[j-1]*dataset[j-1]+i*j+1)%200);
        dataline.push((dataline[j-1]*dataline[j-1]+i*j+1)%100);
    }
    addRectAndCrvLine(dataset,dataline);
}



