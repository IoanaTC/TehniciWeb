window.onload=function(){
    var day = document.getElementById("day");
    var title = document.getElementById("title");
    var menu=document.getElementById("menu");
    var content=document.getElementById("content");

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
            menu.style.borderColor="darkslateblue";
            content.style.color="#FBF8BE";
        }
        else{
            day.src="sun1.png";
            document.body.style.backgroundImage="url('day.svg')";
            document.body.style.backgroundRepeat="no-repeat";
            document.body.style.backgroundPosition="center";
            document.body.style.backgroundColor="#ebd5b4";

            title.style.color="black";
            menu.style.borderColor="black";
            content.style.color="black";
        }
    });

    var name=document.getElementById("name");
    var image=document.getElementById("img");
    var place=document.getElementById("place");

    var first = document.getElementById("first");
    var second=document.getElementById("second");
    var third = document.getElementById("third");

    var currentBeerId;

    let p=document.createElement("p");
    p.innerText="loading...";
    p.setAttribute("id", "loading");

    document.body.appendChild(p);
    var out=0;
    title.onclick=function(){
        fetch("http://localhost:3000/beers", { method:'get'}).then((response=>{
            response.json().then((data)=>{
                if(data.length && !out){
                    document.body.removeChild(p); //stergem loading
                    out=1;
                }

                for(let i=0; i<data.length; i++){
                    let image = document.createElement("img");
                    image.setAttribute("src", data[i].img);
                    image.style.marginBottom="1px";
                    image.style.width="350px";
                    image.style.height="250px";
                    image.style.float="left";

                    let figcap=document.createElement("figurecaption");
                    figcap.innerText=data[i].name;
                    figcap.style.fontFamily="Passero One";
                    figcap.style.fontSize="50px";
                    figcap.style.float="right";

                    let figure=document.createElement("figure");
                    figure.appendChild(image);
                    figure.appendChild(figcap);
                    figure.style.display="inline-block";

                    if(data[i].place=="first"){
                        first.appendChild(figure);
                    }
                    else if(data[i].place=="second"){
                        second.appendChild(figure);
                    }
                    else{
                        third.appendChild(figure);
                    }

                    figure.onclick=function(){
                        name.value=data[i].name;
                        image.value=data[i].img;
                        currentBeerId = data[i].id;
                    }
                }
            });
        }));
    }

    var addBeer=document.getElementById("addBeer");
    var editBeer=document.getElementById("editBeer");

    addBeer.onclick=function(){

        var newBeer={
            name:name.value,
            img:image.value,
            place:place.value
        };

        fetch("http://localhost:3000/beers", { method:'post', headers:{'Content-Type':'application/json'}, body: JSON.stringify(newBeer)}).then(function(response){
             window.location.reload();
        });
    }

    editBeer.onclick=function(){
        var newname=document.getElementById("name");
        var newimage=document.getElementById("img");
        var newplace=document.getElementById("place");

        var newBeer={
            name:newname.value,
            img:newimage.value,
            place:newplace.value
        }

        fetch("http://localhost:3000/beers/"+currentBeerId, {method:'put', headers:{'Content-Type':'application/json'}, body: JSON.stringify(newBeer)}).then(function(response){
            window.location.reload();
        });
    }
    window.onkeydown=function(event){
        if(event.key=="d"){
            fetch("http://localhost:3000/beers/"+currentBeerId, {method: 'delete', headers:{'Content-Type':'application/json'}}).then(function(response){
                window.location.reload();
            });
        }
        event.stopPropagation();
    }
}