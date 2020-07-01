function upDate(previewPic){
    document.getElementById("image").style.background = "#B2B2B2";
    document.getElementById("image").style.background = "url" + "(" + previewPic.src + ")";
    text = document.getElementById("image").innerHTML;
    document.getElementById("image").innerHTML = previewPic.alt;
}

function unDo(){
    document.getElementById("image").style.background = "#8E68FF none";
    document.getElementById("image").innerHTML = text;
}