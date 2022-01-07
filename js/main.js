$(() => {

// controle on showing aidebar
function showmenu() {
    const toggler = $(".mainNav .toggler");
    const ul = $(".mainNav .menu ul");
    toggler.on("click" , () => {
        ul.toggleClass("active");
        toggler.toggleClass("active");
    })
}showmenu();

// changing the decription inside header in index.html
function changePhoto() {
    const changingTime = 150;
    const parent = $("header .row");
    const img = parent.find(".image-parent").children(":not(.arrow)");
    const h3 = parent.find("> div h3")
    const title = parent.find("> div h1")
    const paragraph = parent.find("> div p:first")
    const subtitle = parent.find("> div p:last")
    const buttoncontent = parent.find("> div a")
    const imgsBaseURL = "img/Rectangle";
    const arrows = $("header .arrow");

    const h3s = ['Sandra Lyons' , 'Get Moving' , 'free classes'];
    const paragraphs = ["HI I'M SANDRA LYONS" , "MAKE A CHANGE TODAY" , "MAKE A CHANGE TODAY"];
    const titles = [`Your go to online fitness trainer and nutritionist.`
    , `Premium online fitness classes & nutrition.`
    , `Transforming lifes with fitness & nutrition.`]
    const subtitles = [`After getting a bachelors in nutrition and fitness training I started working with people all around and changing their lives forever.`
    , `I've created these premium fitness classes for everyone starting from beginner to advanced level with an in depth FAQ to answer all doubts.`
    , `With free online classes people who don't have the time or money to afford a personal coach can make change their lives forever.`]
    const buttonsContent = [`<span>></span>ONLINE COACHING`, '<span>></span>PREMIUM CLASSES' , '<span>></span>FREE CLASSES'];
    let currentElement = 0;

    arrows.on("click" , function() {
        if($(this).attr("class").includes("arrow-right"))
            currentElement++;
        else
            currentElement--;

    if(currentElement == h3s.length)currentElement = 0;
    if(currentElement == -1)currentElement = h3s.length - 1;

    parent.removeClass("show")
    parent.addClass("hide")
    setTimeout(() => {
        img.attr("src" , `${imgsBaseURL + (currentElement + 1)}.jpg`);
        h3.text(h3s[currentElement]);
        paragraph.text(paragraphs[currentElement]);
        title.text(titles[currentElement]);
        subtitle.text(subtitles[currentElement])
        parent.removeClass("hide")
        parent.addClass("show")
        buttoncontent.html(buttonsContent[currentElement])
    } , changingTime)
    })
}changePhoto();

function navopacity() {
    const nav = $(".mainNav");
    nav.css("background-color" , `rgba(255 , 255 , 255 , ${$(this).scrollTop() / 1000})`)
}navopacity();

function showWhenScroll() {
    const windowHeight = $(window).height();
    const top = $(".mainNav").offset().top;
    const ele = $(".show-when-scroll");
    ele.css("will-change" , "opacity , transform")
    ele.each(function(i , e) {
        const startAnimation = $(e).offset().top - top + windowHeight / 5;
        startAnimation < windowHeight ? $(e).addClass("active") : $(e).removeClass("active");
    })
}showWhenScroll();

// if the cards have real links
function trainNowLinks() {
    const cards = $(".my-card");
    cards.on("click" , function() {
        window.location.href = $(this).find('a').attr("href");
    })
}trainNowLinks();

// controle in size the background in sweat section in index.html
function scaleImage() {
    if($("body").attr("id") != "home")return;
    const windowHeight = $(window).height();
    const img = $("section.sweat img");
    const top = $(".mainNav").offset().top;
    const timeToShow = img.offset().top - windowHeight / 1.5;
    if(top > timeToShow){
        let x = top-timeToShow;
        if(x < 50)x = 1.05;
        else if (x < 200) x = 1.1;
        else if(x < 400)x = 1.15;
        else if(x < 800)x = 1.2;
        else x = 1.3;
        img.css({"transform": `scale(` + x + `)`})
    }
}

// scrolling The Images in Subfooter
function scrollSubFooter() {
    const windowHeight = $(window).height();
    const  lines = $(".subfooter");
    const top = $(".mainNav").offset().top;
    const timeToShow = lines.offset().top - windowHeight / 1.4;
    if(top > timeToShow){
        let x = top - timeToShow;
        if(x < 50) x = 5;
        else if (x < 200) x = 10;
        else if(x < 400)x = 15;
        else if(x < 800)x = 20;
        else x = 25;
        lines.children().eq(0).css({"transform" : "translateX(" + (x - 20) + "%)"});
        lines.children().eq(1).css({"transform" : "translateX(" + (-x - 10) + "%)"});
    }
}


function categories() {
    const buttons = $(".categories .buttons button");
    const cards = $(".categories .my-card");

    buttons.on("click" , function() {
        let leaves = [];
        let deletes = [];
        cards.each((i , e)=> {$(e).attr("data-target").includes($(this).attr("id")) ? leaves.push(e) : deletes.push(e);})
        $(deletes).each((i , e) => {$(e).fadeOut(200);})
        setTimeout(() => {$(leaves).each((i , e) => {$(e).fadeIn(200);})},200)
    })
}categories()
$(window).scroll(() => {navopacity();showWhenScroll();scaleImage();scrollSubFooter()})

document.onreadystatechange = function() {
    if (document.readyState !== "complete") {
        $("body").css("opacity" , 0)
        $("#loader").show(0);
        console.log("not ready yet")
    } else {
        console.log("ready")
        $("body").css("opacity" , 1)
        $("#loader").hide(0);
    }
};
})