var slideShow = (function() {

    var select = document.getElementsByClassName("s-select"),//get all the elements that have select
        slide = document.getElementById("slide"),// gets the element of the id slide
        bg,
        counter,
        counterTimeout,
        i = 0,
        header = [
          "This is a description for slide 1",
         "This is a description for slide 2",
         "This is a description for slide 3"
                ],
        a = document.querySelector("a"),
        links = ["http://www.google.com", "http://www.bing.com", "http://www.yahoo.com"];

/* this function removes the current background color;
checks to see if i over 2 so that it can  loop back to 0 and change the styles again;
changes the background color that is dependent upon the number that is contained in  i;
calls the appear method;
increments i;
*/

    function slideShw(obj, num) {
        i = (num >= 0) ? num : i;
        if (i > 0) {
            select[i - 1].style.background = "";
            select[i - 1].style.color= "";
        }
        i = (i > 2) ? 0 : i;
        //obj.chngBG(i);
        select[i].style.background = "white";
        select[i].style.color= "black";

        obj.appear(slide);
        i++;
    }


    return {
        switch: function() {
            var that = this;

            counter = setInterval(function() {
                slideShw(that);
            }, 3000);


        },
        appear: function(slide, color) {
            var appCounter, x = 0;
            slide.style.opacity = 0;
            slide.querySelector("p").innerHTML = header[i];
            a.href = links[i];
            appCounter = setInterval(function() {
                x += 0.1;
                slide.style.opacity = x.toFixed(1);

                if (x > 0.9 || x == 1 ) {

                    clearInterval(appCounter);
                }

            }, 50);

        },
        stopSlide: function() {
            var that = this;
            for (let n = 0; n < select.length; n++) {

                select[n].onclick = function() {
                    var num = parseInt(this.dataset.num);
                    clearInterval(counter);
                    if (counterTimeout != "undefined") {
                        clearTimeout(counterTimeout);
                    }
                    if (i > 0) {
                        select[i - 1].style.background = "";
                        select[i - 1].style.color= "";
                    }
                    slideShw(that, num);
                    counterTimeout = setTimeout(that.switch.bind(slideShow), 4000);

                }; // end of function
            } //for loop
        },
        run: function() {
            this.switch();
            this.stopSlide();

        }
    } //object

})();

slideShow.run();
