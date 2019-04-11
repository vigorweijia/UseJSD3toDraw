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
}