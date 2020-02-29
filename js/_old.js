$(".aSender .box").each(function() {
    let myNotif = $(`<div class='my-notif'><div class='arrow'></div></div>`);
      $(this).append(myNotif)
        myNotif.css({
            display: "none"
        })
    $(".aSender").on("email-valid", function(event, input, status){
  
      if(status) {
       input.parent().next().text('All Good!').css({
          display: "flex",
          backgroundColor: "#28A745",
        })
       input.parent().next().next().css({
          display: "flex",
          borderTopColor: "#28A745",
       })
       $("#mail").next().removeClass("fa-star-of-life").removeClass("fa-exclamation-circle").addClass("fa-check-circle")
      }
      else if(input.val() == ""){ 
        input.parent().next().text('Important Field').css({
          display: "flex",
          backgroundColor: "#E04F5F",
      })
        input.parent().next().next().css({
          display: "flex",
          borderTopColor: "#E04F5F",
        })
        $("#mail").next().removeClass("fa-exclamation-circle").removeClass("fa-check-circle").addClass("fa-star-of-life")
      } 
      else {
        input.parent().next().text('Allowed only A-Z 0-9').css({
          display: "flex",
          backgroundColor: "#ED4337",
        })
        input.parent().next().next().css({
          display: "flex",
          borderTopColor: "#ED4337",
       })  
       $("#mail").next().removeClass("fa-star-of-life").removeClass("fa-check-circle").addClass("fa-exclamation-circle")
      }
    });
  
    $(".aSender").on("phone-valid", function(event, input, status){
      if(status) {
        input.parent().next().text('All Good!').css({
           display: "flex",
           backgroundColor: "#28A745",
         })
        input.parent().next().next().css({
           display: "flex",
           borderTopColor: "#28A745",
        })
        $("#phone").next().removeClass("fa-star-of-life").removeClass("fa-exclamation-circle").addClass("fa-check-circle")
       }
       else if(input.val() == ""){ 
         input.parent().next().text('Important Field').css({
           display: "flex",
           backgroundColor: "#E04F5F",
       })
         input.parent().next().next().css({
           display: "flex",
           borderTopColor: "#E04F5F",
         })
         $("#phone").next().removeClass("fa-exclamation-circle").removeClass("fa-check-circle").addClass("fa-star-of-life")
       } 
       else {
         input.parent().next().text('Allowed only A-Z 0-9').css({
           display: "flex",
           backgroundColor: "#ED4337",
         })
         input.parent().next().next().css({
           display: "flex",
           borderTopColor: "#ED4337",
        })  
        $("#phone").next().removeClass("fa-star-of-life").removeClass("fa-check-circle").addClass("fa-exclamation-circle")
       }
    })  
  
    $("#name").on(function(){
      let nameVal = $("#name").val()
    
      if(nameVal == "")
      { 
        input.parent().next().text('Important Field').css({
          display: "flex",
          backgroundColor: "#E04F5F",
      })
        input.parent().next().next().css({
          display: "flex",
          borderTopColor: "#E04F5F",
        })
        $("#phone").next().removeClass("fa-exclamation-circle").removeClass("fa-check-circle").addClass("fa-star-of-life")
      } 
    
    })
  })