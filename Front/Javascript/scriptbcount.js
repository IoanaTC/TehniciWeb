window.onload=function(){
    var day = document.getElementById("day");
    var title = document.getElementById("title");
    var information = document.getElementById("information");
    var trigger=document.getElementById("trigger");

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
            information.style.color="#FBF8BE";
        }
        else{
            day.src="sun1.png";
            document.body.style.backgroundImage="url('day.svg')";
            document.body.style.backgroundRepeat="no-repeat";
            document.body.style.backgroundPosition="center";
            document.body.style.backgroundColor="#ebd5b4";

            title.style.color="black";
            information.style.color="black";
        }
    });

    var number=0;
    trigger.onclick=function(event){
        var beer = document.createElement("img");
        number++;
        beer.src="beertrigger.png";
        beer.className="beer";

        document.body.appendChild(beer);
        beer.onclick=function(event){
            document.body.removeChild(this);
            number--;
            event.stopPropagation();
        }
        event.stopPropagation();
    }

    title.onclick=function(event){
        if(number==1)
            alert("Ati baut o singura bere")
        else if(number==0)
            alert("Nu ati baut nicio bere");
        else alert("Sunt "+number+" beri, in total");
    }
}