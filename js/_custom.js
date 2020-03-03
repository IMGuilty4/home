$(document).ready(function() {

  $(".has-sub").mouseover(function () {
    $(".sub-nav").css("display" , "flex");
    $("#arrow").css("transform","rotate(-90deg)")
  })
  $(".has-sub").mouseleave(function () {
    $(".sub-nav").css("display" , "none");
    $("#arrow").css("transform","rotate(0deg)")
  })


  $(".burger")
  .click(function(e) {
  e.preventDefault();
  let navt = $(".nav").css("top");
  if (navt == "-210px") {
    $(".nav").css("top", "0px");
  }
  else {
    $(".nav").css("top", "-210px");
  }

  });

  $(".filter").click(function(e){
    e.preventDefault();
    let FilPos = $(".select-box:nth-last-of-type(-n+6)").css("display");

    if(FilPos == "none" ){
      $(".select-box:nth-last-of-type(-n+6)").css("display" , "flex")
      $(".filter").html("<i class='fas fa-stream'></i><p>Hide Filters</p>")
    }

    else {
      $(".select-box:nth-last-of-type(-n+6)").css("display" , "none")
      $(".filter").html("<i class='fas fa-stream'></i><p>More Filters</p>")
    }
  })



  $(window).scroll(function(){
    var scrollPos = $(document).scrollTop();

    if ( scrollPos >= 60 && scrollPos <= 499) {

      $("header").css({
        transform: "translateY(-60px)"
      });
    }
    else if(scrollPos <= 69 || scrollPos == 0){
      $("header").css({
        transform: "translateY(0px)"
      });
    } 
    

    if (scrollPos >= 500){
      $("header").css({
        position : "fixed",
        backgroundColor : "#3d3d3d",
        transform: "translateY(0px)"
      });
    }
    else {
      $("header").css({
        position : "absolute",
        backgroundColor : "transparent",
      });
    }
});

 $(".slider, .slider2").slick({
   infinite: true,
   slidesToShow: 1,
   slidesToScroll: 1,
   dots: true,
   prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
   nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',

 });

//  $(".slider2").slick({
//    infinite: true,
//    slidesToShow: 1,
//    slidesToScroll: 1,
//    dots: true,
//    prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
//    nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
  
//   });

  $(".stars").stars({
    stars: 5,
    text: ["1.0" ,"2.0" ,"3.0" ,"4.0" ,"5.0"],
    color: "#3d3d3d",
    value: "5"
  })


  $("#deals").circleProgress({
    value: 1,
    size: 60,
    fill: "#2C3E50",
  });

  $("#reviews").circleProgress({
    value: 1,
    size: 60,
    fill: {
      gradient: [["#ED4337", .1], ["yellow", .3], ["#28A745", .5]]
    }
  });

  $("#rate").circleProgress({
    value: 0.9,
    size: 60,
    fill: "#E04F5F",
  });


 $('select').niceSelect();
  
 Waves.attach('.home-button', ['waves-button', 'waves-float', 'waves-light']);
 Waves.init()

 


 /* function fade(objs, change) {
  let obj = $(objs);
  let objH = obj.css("height");
  let childs = obj.children();
  obj.css("min-height", objH);
  childs.fadeOut(250);
  setTimeout(() => {
    if(change && obj.hasClass("row")){
        obj.removeClass("row");
    }
    else if (change && !obj.hasClass("row")) {
      obj.addClass("row");
    }
    childs.fadeIn(250);
  },300);

}
$(".view-control .row").on("click", function() {
  if (!$(".catalog-items .items-wrap").hasClass("row")) {
      fade(".items-wrap", true);
      $(".view-control button").removeClass("active");
      $(this).addClass("active");
      setTimeout(()=>{
        $(window).trigger("resize");
      }, 550);
  }
});

$(".view-control .column").on("click", function() {
  if ($(".catalog-items .items-wrap").hasClass("row")) {
      fade(".items-wrap", true);
      $(".view-control button").removeClass("active");
      $(this).addClass("active");
      setTimeout(()=>{
        $(window).trigger("resize");
      }, 550);
  }
});
 */

function myNotif(input, status, errMsg = "Error"){
  let myNotif = $(`<div class='my-notif'><span></span><div class='arrow'>▼</div></div>`).css({display: "none" });
  let arr = myNotif.children("div.arrow"),
      msg = myNotif.children("span"),
      icon = input.parent().find("i"),
      success = { display: "flex", backgroundColor: "#28A745"},
      error = { display: "flex", backgroundColor: "#ED4337"},
      important = { display: "flex", backgroundColor: "#E04F5F"}

    input.parent().find(".my-notif").remove()
    input.parent().append(myNotif)
      if(status){
        msg.text("All Good!");
        myNotif.css(success);
        arr.css({color: "#28A745"});
        icon.attr("class", "").addClass("fas fa-check-circle")
      }
      else if(input.val() == "") {
        msg.text('Important Field')
        myNotif.css(important)
        arr.css({color: "#E04F5F"})
        icon.attr("class", "").addClass("fas fa-star-of-life")
      }
      else {
        msg.text(errMsg) 
        myNotif.css(error);
        arr.css({color: "#E04F5F"})
        icon.attr("class", "").addClass("fas fa-exclamation-circle")
      }
}

$(".aSender").on("email-valid", function(event, input, status){
  myNotif(input, status, "Allowed only A-Z, 0-9");
});

$(".aSender").on("phone-valid", function(event, input, status){
  myNotif(input, status, "Allowed only 0-9");
});

$("#name, #subject, #msg").on('keyup', function(){
  let input = $(this)
  let status = ($(this).val() == "") ? false : true;
  myNotif(input, status)
})



 $("#column").click(function(){
  $("#column").addClass("active").prop("disabled", true)
  $("#row").prop("disabled", false).removeClass("active")
  $(".catalog-wrap").children().fadeOut(200)
    setTimeout(function() {
      $(".catalog-wrap").removeClass("row")
      $(".catalog-wrap").children().fadeIn(250)
  }, 260);
 });

 $("#row").click(function(){
   $("#row").addClass("active").prop("disabled", true)
   $("#column").prop("disabled", false).removeClass("active")
   $(".catalog-wrap").children().fadeOut(250)
    setTimeout(function() {
        $(".catalog-wrap").addClass("row")
        $(".catalog-wrap").children().fadeIn(250)
    }, 260);
 });
 

 $(".pagination li").click(function() {
   $(".catalog-wrap").fadeOut(250).fadeIn(250)
   $("li").removeClass("active")
   $(this).on("click").addClass("active")

 })

 $(".p-slider").slick({
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  dots: false,
  centerMode: true,
  prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
  nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
  responsive: [
    {breakpoint:1120,
      settings:{
        slidesToShow: 3
      }
    },
    {breakpoint:767.9,
      settings:{
        slidesToShow: 1
      }
    },
  ]
  });

  

 




});
