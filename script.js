var req = new XMLHttpRequest();
req.open("GET", "./json/image_list.json");
req.onreadystatechange = function() {
    if (this.readyState == 4) {
        // console.log(this.response);
        var data = JSON.parse(this.response);
        for(var i=0; i < data.length; i++) {
            var div = document.createElement("div");
            div.setAttribute("class", "image");
            div.onclick = function() {
                this.classList.toggle("image-selected");
            }
            div.onmouseover = function() {
                var element = this;
                this.timerID = setTimeout( function() {
                    element.classList.add("image-magnified");
                }, 1000);
            }
            div.onmouseout = function() {
                clearTimeout(this.timerID);
                this.classList.remove("image-magnified");
            }
            var img = document.createElement("img");
            img.src = data[i];
            div.appendChild(img);
            document.body.appendChild(div);
        }
    }
}
req.send();

function selectAll(btn) {
    var images = document.querySelectorAll(".image");
 
    if(btn.textContent == "Select All") {
        for(var i=0; i < images.length; i++) {
            images[i].classList.add("image-selected");
        }
        btn.textContent = "Unselect All"
    } else {
        for(var i=0; i < images.length; i++) {
            images[i].classList.remove("image-selected");
        }
        btn.textContent = "Select All"
    }
}

function slideShow(btn) {
    var images = document.querySelectorAll(".image-selected");
    var index = 0;
    images[index].classList.remove("image-selected");
    images[index].classList.add("image-slideshow");
    var intervalID = setInterval(function() {
        images[index].classList.remove("image-slideshow");
        images[index].classList.add("image-selected");
        index++;
        if(index < images.length) {
            images[index].classList.remove("image-selected");
            images[index].classList.add("image-slideshow");
        } else {
            clearInterval(intervalID);
        }
    }, 2000);
}