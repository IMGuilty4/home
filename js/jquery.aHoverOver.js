(function($){
      $.fn.aHoverOver = function(options){
        var settings = $.extend({
          reset: false,
          color: "brown",
          opacity: "1",
          shadow: false,
          zIndex: "-1"
          }, options);

        return this.each(function(){
            var test = () => {
              console.log('Hello World!');
            };
            var ths = $(this);
            var tHeight = ths.height();
            var hasFirst = false;
            var aHoverOverParentID = Math.floor(Math.random() * 1000) + 1 +"_" + Math.floor(Math.random() * 1000) + 1;
            var aHoverOverID = Math.floor(Math.random() * 1000) + 1;
            ths.attr("data-ahover-id", aHoverOverParentID);
            ths.addClass("a-hover-over-container");
            ths = $(`.a-hover-over-container[data-ahover-id=${aHoverOverParentID}]`);

            var color = (!ths.data('ahover-color')) ? settings.color : ths.data('ahover-color');
            var opacity = (!ths.data('ahover-opacity')) ? settings.opacity : ths.data('ahover-opacity');
            var shadow = (!ths.data('ahover-shadow')) ? settings.shadow : ths.data('ahover-shadow');
            var zIndex = (!ths.data('ahover-zindex')) ? settings.zIndex : ths.data('ahover-zindex');

            var boxShadow = (shadow) ? "0px -7px 20px 7px rgba(0, 0, 0, 0.5)" : "";
            var reset = settings.reset;
              console.log(reset);

            var hoverEl = `<div class='a-hoverOver' id='${aHoverOverID}'></div>`;
            var els = ths.children();
            var firstEl = els.first();
            var fPos = firstEl.position();
            ths.css({
              position: "relative",
            });



            function hoverOverPos(){
              if(els.hasClass('aHoverOver-active')){
                var thsElPos = ths.children(".aHoverOver-active").position();
                var tHeight = ths.children(".aHoverOver-active").css('height');
                var thsElWidth = ths.children(".aHoverOver-active").css('width');
                $('#'+aHoverOverID).css({
                  left : thsElPos.left,
                  width : thsElWidth,
                  height: tHeight
                });
              }
              else {
                var thsElPos = firstEl.position();
                var thsElWidth = firstEl.css('width');
                $('#'+aHoverOverID).css({
                  left : thsElPos.left,
                  width : thsElWidth
                });
              }
            };
              els.each(function() {
                if ($(this).data("ahover-first")){
                  hasFirst = true;
                  $(this).attr("data-ahover-first", "false");
                  $(this).addClass("aHoverOver-active aHoverOver-now");
                }
              });

            if (reset) {
              hoverOverPos();
            }
            else if (hasFirst) {
              $(hoverEl).appendTo(ths);
              $('#'+aHoverOverID).css({
                background: color,
                position: 'absolute',
                left: fPos.left,
                height: tHeight,
                width: firstEl.css('width'),
                opacity: opacity,
                zIndex: '-1',
                transition: 'all .5s ease',
                boxShadow: boxShadow,
                zIndex: zIndex
              });
              hoverOverPos();
            }
            else {
            $(hoverEl).appendTo(ths);
            firstEl.addClass('aHoverOver-active aHoverOver-now');
            $('#'+aHoverOverID).css({
              background: color,
              position: 'absolute',
              left: fPos.left,
              height: tHeight,
              width: firstEl.css('width'),
              opacity: opacity,
              zIndex: '-1',
              transition: 'all .5s ease',
              boxShadow: boxShadow,
              zIndex: zIndex
            });
            }
            els.each(function(){
              $(this).mouseover(function(){
                var tWidth = $(this).css('width');
                var tHeight = $(this).css('height');
                var tPos = $(this).position();
                $('#'+aHoverOverID).css({
                  left: tPos.left,
                  width: tWidth,
                  height: tHeight
                });
                els.removeClass('aHoverOver-now');
                $(this).addClass('aHoverOver-now');
              });



              $(this).click(function(){
                els.removeClass('aHoverOver-active');
                $(this).addClass('aHoverOver-active');
                els.removeClass('aHoverOver-now');
                $(this).addClass('aHoverOver-now');
              });

            });




            hoverOverPos();
            setTimeout(function() {hoverOverPos();}, 500);
            ths.mouseleave(function(){
                hoverOverPos();
                els.removeClass('aHoverOver-now');
                els.each(function() {
                  if($(this).hasClass("aHoverOver-active")){
                    $(this).addClass('aHoverOver-now');
                  }
                });
            });

            $(window).on('resize', function() {
                hoverOverPos();
            });
        });



      };
})(jQuery);
