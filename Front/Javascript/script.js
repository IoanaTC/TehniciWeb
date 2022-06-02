window.onload = function(){
    var day = document.getElementById("day");
    var title = document.getElementById("title");
    var text = document.getElementById("text");
    var figcap = document.getElementsByClassName("figcap");
    var photos = document.getElementsByClassName("beer");
    var information = document.getElementById("information");

    var count=0;
    day.addEventListener("click", function(){
        count++;
        if(count%2){
            day.src="moon.png";
            document.body.style.backgroundImage="url('night.svg')";
            document.body.style.backgroundRepeat="no-repeat";
            document.body.style.backgroundPosition="center";
            document.body.style.backgroundColor="#481591";

            title.style.color="#FBF8BE";
            for(let i=0; i<figcap.length; i++)
                figcap[i].style.color="#FBF8BE";
            text.style.color="#FBF8BE";

            information.style.color="#FBF8BE";
        }
        else{
            day.src="sun1.png";
            document.body.style.backgroundImage="url('day.svg')";
            document.body.style.backgroundRepeat="no-repeat";
            document.body.style.backgroundPosition="center";
            document.body.style.backgroundColor="#ebd5b4";

            title.style.color="black";
            for(let i=0; i<figcap.length; i++)
                figcap[i].style.color="black"
            text.style.color="black";

            information.style.color="black";
        }
    });

    photos[0].onmouseover=function(event){
        this.src="beerblue.png";
        event.stopPropagation();
    }
    photos[0].onmouseout=function(event){
        this.src="beer.png";
        event.stopPropagation();
    }
    photos[1].onmouseover=function(event){
        this.src="beer1blue.png";
        event.stopPropagation();
    }
    photos[1].onmouseout=function(event){
        this.src="beer1.png";
        event.stopPropagation();
    }
}