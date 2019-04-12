function getcolor(d) {
    color = "";
    if(d == 0) color = "#ffffff";
    else if(d > 0 && d <= 5) color = "#ffffcc";
    else if(d > 5 && d <= 10) color = "#ffff99";
    else if(d > 10 && d <= 15) color = "#ffff66";
    else if(d > 15 && d <= 20) color = "#ffff33";
    else if(d > 20 && d <= 25) color = "#ffff00";
    else if(d > 25 && d <= 30) color = "#ffdd00";
    else if(d > 30 && d <= 35) color = "#ffbb00";
    else if(d > 35 && d <= 40) color = "#ff9900";
    else if(d > 40 && d <= 45) color = "#ff7700";
    else if(d > 45 && d <= 50) color = "#ff5500";
    else if(d > 50 && d <= 55) color = "#ff3300";
    else if(d > 55 && d <= 60) color = "#ff1100";
    else if(d > 60 && d <= 65) color = "#dd0000";
    else if(d > 65 && d <= 70) color = "#bb0000";
    else if(d > 70 && d <= 75) color = "#990000";
    else if(d > 75 && d <= 80) color = "#770000";
    else if(d > 80 && d <= 85) color = "#660000";
    else if(d > 85 && d <= 90) color = "#440000";
    else if(d > 90 && d <= 95) color = "#220000";
    else if(d > 95) color = "#000000";
    return color;
}
rectWidth = 7;
rectStep = 7;
rectHeight = 100;
left = 20;
function addRect(dataset) {
    //document.write(dataset.length);
    var width = dataset.length * rectWidth + 50;
    var height = rectHeight;
    var svg = d3.select("body").append("svg").attr("height",height).attr("width",width);
    var rect = svg.selectAll("rect").data(dataset).enter().append("rect")
        .attr("datam",function (d) {
            return d;
        })
        .attr("fill",function (d) {
            console.log(d);
            return getcolor(d);
        })
        .attr("x",function (d,i) {
            return left + i*rectStep;
        })
        .attr("y",0)
        .attr("width",rectWidth)
        .attr("height",rectHeight);
}

function ReadFile(data) {
    var ret = [];
    var str = data.trim().split("\n");
    for(let i = 0; i < str.length; i++) {
        ret.push(str[i]);
        //console.log(str[i]);
    }
    return ret;
}

function FileInfo(filename) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var s = ReadFile(xhr.responseText);
        var dataset = [];
        for(let i = 0; i < 168; i++) {
            dataset.push(parseInt(s[i]));
            //console.log(s[i]);
        }
        addRect(dataset);
    }
    try {
        xhr.open("get","data/"+filename,true);
        xhr.send();
    }catch (e) {
        ReadFile(e.message);
    }
}

FileInfo("d3_week_data.txt");
FileInfo("rxjava_week_data.txt");
FileInfo("tensorflow_week_data.txt");