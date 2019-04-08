
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
function getDotAColor(d) {
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

function getDotDColor(d) {
    return "#0000ff";
}

padding = {top: 20, right: 20, bottom: 20, left: 20};
rectStep = 8;
rectWidth = 8;
rectHeight = 100;

//画矩形及折线的函数
function addRectAndCrvLine(dataset, datalineA, datalineD) {
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
            var str = "commits: " + d + "\nAdd: " + datalineA[i] + "\nDelete: " + datalineD[i];
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
    var oneLineA = d3.line()
        .x(function (d,i) {
        return padding.left + 4 + i*rectStep;
        })
        .y(function (d,i) {
            return rectHeight - d;
        })
        .curve(d3.curveLinear);
    //需要注意把填充设置为none，然后设置描边宽度
    svg.append("path").attr("class","line").attr("d",oneLineA(datalineA)).attr("fill","none").attr("stroke","#008000").attr("stroke-width","1.5px");

    var dotA = svg.selectAll("circle")
                 .data(datalineA).enter()
                 .append("circle")
                 .attr("cx", function (d,i) {
                    return padding.left + i*rectStep + 4;
                 })
                 .attr("cy",function (d,i) {
                    return rectHeight - d;
                 })
                 .attr("r", 2)
                 .attr("fill", function (d,i) {
                    return getDotAColor(d);
                 });

    var oneLineD = d3.line()
        .x(function (d,i) {
            return padding.left + 4 + i*rectStep;
        })
        .y(function (d,i) {
            return rectHeight - d;
        })
        .curve(d3.curveLinear);
    //需要注意把填充设置为none，然后设置描边宽度
    svg.append("path").attr("class","line").attr("d",oneLineD(datalineD)).attr("fill","none").attr("stroke","#f08000").attr("stroke-width","1.5px");

    var dotD = svg.selectAll("polygon")
        .data(datalineD).enter()
        .append("polygon")
        .attr("points", function (d,i) {
            x1 = padding.left + i*rectStep + 2;
            x2 = padding.left + i*rectStep + 6;
            y1 = rectHeight - d + 2;
            y2 = rectHeight - d + 2;
            x3 = padding.left + i*rectStep + 4;
            y3 = rectHeight - d - 2;
            return x1 + "," + y1 + " " + x2 + "," + y2 + " " + x3 + "," + y3;
        })
        .attr("fill", function (d,i) {
            return getDotDColor(d);
        });
}


//下面调用
function ReadFile(data) {
    //var box = document.getElementById("hellonju");
    var ret = [];
    var str = data.trim().split("\n");
    for(let i = 0; i < str.length; i++)
        ret.push(str[i]);
    //box.innerText = data;
    return ret;
}
function FileInfo(filename) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var s = ReadFile(xhr.responseText);
        //console.log(s);
        var dataset = [];
        var datalineA = [];
        var datalineD = [];
        for(let i = 0; i < 200; i++) {
            var information = s[i].trim().split(" ");
            dataset.push(parseInt(information[1]));
            datalineA.push(parseInt(information[2]));
            datalineD.push(parseInt(information[3]));
        }
        addRectAndCrvLine(dataset,datalineA,datalineD);
    };
    try {
        xhr.open("get", "data/"+filename, true);
        xhr.send();
    } catch (e) {
        ReadFile(e.message);
    }
}

FileInfo("p0.txt");
FileInfo("p1.txt");
FileInfo("p2.txt");
FileInfo("p3.txt");
FileInfo("p4.txt");
FileInfo("p5.txt");
FileInfo("p6.txt");
FileInfo("p7.txt");
FileInfo("p8.txt");
FileInfo("p9.txt");

/*for(i = 0; i < 10; i++) {
    dataset = [(i*67+3*i)%200];
    dataline = [(i*31+7*i)%100];
    for(j = 1; j < 100; j++) {
        dataset.push((dataset[j-1]*dataset[j-1]+i*j+1)%200);
        dataline.push((dataline[j-1]*dataline[j-1]+i*j+1)%100);
    }
    addRectAndCrvLine(dataset,dataline);
}*/



