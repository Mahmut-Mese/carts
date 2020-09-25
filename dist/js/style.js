$.fn.extend({
    animateCss: function(animationName, callback) {
      var animationEnd = (function(el) {
        var animations = {
          animation: 'animationend',
          OAnimation: 'oAnimationEnd',
          MozAnimation: 'mozAnimationEnd',
          WebkitAnimation: 'webkitAnimationEnd',
        };
  
        for (var t in animations) {
          if (el.style[t] !== undefined) {
            return animations[t];
          }
        }
      })(document.createElement('div'));
  
      this.addClass('animated ' + animationName).one(animationEnd, function() {
        $(this).removeClass('animated ' + animationName);
  
        if (typeof callback === 'function') callback();
      });
  
      return this;
    },
  });
function newslider() {
    $(".weather-app").addClass("swiper-container");
   $(".days-of-the-week").addClass("swiper-wrapper");
   $(".days-of-the-week .cart").addClass("swiper-slide");
   $(".days-of-the-week").css("overflow", "visible");
   $(".days-of-the-week .cart").css("margin-top", "0");
     $(".days-of-the-week .cart").css("position", "static");

     $('.weather-app').animateCss('rotateInUpLeft');
    }
    function removeslider() {
        $('.swiper-container').each(function(){
            this.swiper.destroy();
          })
       
        $(".weather-app").removeClass("swiper-container swiper-container-horizontal swiper-container-ios");
       $(".days-of-the-week").removeClass("swiper-wrapper");
       $(".days-of-the-week .cart").removeClass("swiper-slide swiper-slide-duplicate swiper-slide-prev swiper-slide-next");
       
       $(".weather-app ul").css("transform", "inherit");
    
       $(".days-of-the-week").css("overflow", "visible");
       $(".cart").css("margin-top", "-460px");
       $(".cart:nth-child(1)").css("margin-top", "5px");
         $(".days-of-the-week .cart").css("position", "relative");
         var arrayslide = $( ".cart" ).length;
         
      
         for (let indx = 0; indx < arrayslide; indx++) {
              
            $(".cart:nth-child("+indx+")").animateCss('fadeInUp');
          
             
         }  
         //swiper.removeAllSlides();
        // $('.weather-app').animateCss('fadeIn');
         
       // $('.weather-app').animateCss('rotateInUpLeft');
     //  $('.weather-app').animateCss('flipInY');
        }
     

   function newfunc(index) {
    var swiper = new Swiper('.swiper-container', {
      initialSlide:index,
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      observer:true,
      observeParents:true,
    });
    swiper.updateSize()
    swiper.updateSlides()
    swiper.updateProgress()
    swiper.updateSlidesClasses()
    $(window).trigger('resize')

    swiper.on('slideChange', function () {
        $('.weather-app').animateCss('pulse');
      });}
   
   $(".cart").click(function(){
   // function newslider2() {
    var swp =$("li").hasClass("swiper-slide");
     if(!swp){
 
   
    var index = $( ".cart" ).index( this );
    
    //nextCart=index+2;
   // $(".cart:nth-child("+ nextCart +")").css("margin-top", "-330px");
  
  
      
      //$(".days-of-the-week .cart:first-child").css("min-height", "30px");
       
    // $(this).css("margin-top", "-60vh");
    // var clck =$(this).hasClass("clicked");
    // if(clck){
    $(this).addClass("swiper-slide-active");
  
        
      //newfunc();
  
      newslider();
      newfunc(index);
    
   // }
     
    
    /*  $(".cart").removeClass("clicked");
     $(this).addClass("clicked"); */
  
    
  }
  else{
    removeslider() ;
  }
  });
//};
  
       /*  $("li").dblclick(function(){
            alert("The paragraph was double-clicked.");
        }); */
        var pStart = {x: 0, y:0};
        var pStop = {x:0, y:0};
        var pCont = {x:0, y:0};
        
        function swipeStart(e) {
            if (typeof e['targetTouches'] !== "undefined"){
                var touch = e.targetTouches[0];
                pStart.x = touch.screenX;
                pStart.y = touch.screenY;
            } else {
                pStart.x = e.screenX;
                pStart.y = e.screenY;
            }
        }
        function swipeCont(e) {
            if (typeof e['touches'] !== "undefined"){
                var touch = e.touches[0];
                pCont.x = touch.screenX;
                pCont.y = touch.screenY;
                $(".days-of-the-week").css("position","relative");
                $(".days-of-the-week").css("top",pCont.y);
                
                var betweenCarts=-460+pCont.y;
                var firstCart=5+pCont.y;
                var sld= $(".cart").hasClass("swiper-slide");
                if (!sld) {
                    $(".cart").css("margin-top", betweenCarts+"px");
                    $(".cart:first-child").css("margin-top", firstCart+"px");
                }
              
             
            } else {
              
                console.log("pCont.y");
            }
        }
         
        
        function swipeEnd(e){
            if (typeof e['changedTouches'] !== "undefined"){
                var touch = e.changedTouches[0];
                pStop.x = touch.screenX;
                pStop.y = touch.screenY;
              
                    $( ".days-of-the-week" ).animate({
                     
                      
                      top: "0"
                    }, 500, function() {
                       // newslider2()
                        swipeCheck();
                    });
              
                //$(".swiper-container").css("top","0");
            } else {
                pStop.x = e.screenX;
                pStop.y = e.screenY;
            }
        
         
        }
        /* for (let a = 0; a < pStop.y; a++) {
            $(".swiper-container").css("top", "a");
            
        } */
        function swipeCheck(){
            var changeY = pStart.y - pStop.y;
            var changeX = pStart.x - pStop.x;
            if (isPullDown(changeY, changeX) ) {
               var sld= $(".cart").hasClass("swiper-slide");
               if (sld) {
                removeslider() 
               }
               else{
                newslider();
                newfunc();}
                
                //
            }
        }
        
        function isPullDown(dY, dX) {
            // methods of checking slope, length, direction of line created by swipe action 
            return dY < 0 && (
                (Math.abs(dX) <= 100 && Math.abs(dY) >= 100)
                || (Math.abs(dX)/Math.abs(dY) <= 0.3 && dY >= 60)
            );
        }
        
        document.addEventListener('touchstart', function(e){ swipeStart(e); }, false);
        document.addEventListener('touchend', function(e){ swipeEnd(e); }, false);
        document.addEventListener('touchmove', function(e){ swipeCont(e); }, false);