/*
 *
 * Form send script
 * Author: Anar [Joko(Pain)] Latifov
 * Site: https://a-dream.dev
 * Description:
 *  This is the simple script to send your form
 *  just add your email address to `data-to` attribute
 *  into your form tag ex.: <form data-to="contact@a-dream.dev">
 *  also script is checking if email is valid or not and if email address is invalid
 *  triggered "invalid-email" event on your <form> object
 *  just use $(".yourFormClass").on("invalid-email", function() {...});
 *  to do somthing when email is invalid.
 *  ==============================
 *  On success script trigger "form-success" on <form> object
 *
 */


 // jQuery.noConflict();
(function( $ ) {

$(document).ready(function() {

  var formContent = {};
  var url = "../mail.php"
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  var phoneformat = /^[()\-0-9]+$/i;

$(".aSender").each(function() {
  let form = $(this);
  let inputs = $(this).find("input");
  let submit = $(this).find("input[type=submit]");
  let email = $(this).find("input[type=email]");
  let phone = $(this).find("input[name=phone]");
  let emailStatus = false;
  let phoneStatus = false;
  var msg = $(this).find("textarea");
  let to = $(this).data("to");

  /* Setting form status */
  form.data({"ready" : true});

  /* Checking `data-to` attribute */
  if (typeof to != undefined && to != "" && to.match(mailformat)){
    Object.assign(formContent, {to: to});
  }
  else{
    console.error("Please add valid email to form `data-to` attrebute!");
    return false;
  }


/* Checking email to valid */
  email.each(function() {
    $(this).on("keyup", function() {
      let input = $(this);
      let val = input.val();
          emailStatus = (val.match(mailformat)) ? true : false;
          form.trigger("email-valid" , [input, emailStatus]);
          input.data({"wrong" : (emailStatus ? false : true)});
    });
  });

/* Checking phone to valid */
phone.each(function() {
  $(this).on("keyup", function() {
    let input = $(this);
    let val = $(this).val();
        phoneStatus = (val.match(phoneformat)) ? true : false;
        form.trigger("phone-valid", [input, phoneStatus]);
        input.data({"wrong" : (phoneStatus ? false : true)});
  });
});


/* On submit */
  submit.on("click", function(e) {
    e.preventDefault();
     inputs.each(function() {
       let input = $(this);
       let name = $(this).attr("name");
       let value = $(this).val();
       let type = $(this).attr("type");
       if (type != "submit") {Object.assign(formContent, {[name]: value});}
       if (typeof value == undefined || value == "") {
         input.data({"wrong" : true});
         form.data({"ready" : false});
         form.trigger("form-not-ready", [input]);
         return false;
       }
     });
     if (form.data("ready")) {
       if (typeof msg != undefined && msg.val() != "") {Object.assign(formContent, {msg: msg.val()});}
       let data = formContent;

       $.ajax({
         type: "POST",
         url: url,
         data: data,
         success: function(html){
           form.trigger("form-success");
         },
       });
      }
      else {
        form.trigger("form-not-ready");
      }
  });

});


});

})( jQuery );
