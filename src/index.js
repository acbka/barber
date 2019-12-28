import"./style.scss";
import '@fortawesome/fontawesome-free/js/all';
import Inputmask from "inputmask";

$(document).ready(function (){
   mainMenu(); 
   scrollMenu();
   slider();
   openModal();
   inputMask();
});

function mainMenu(){
   $('.toggle').on('click',function(){
      $("ul").toggleClass("active");
   })
}

function scrollMenu(){
var lastId,
   menu = $("#menu"),
   menuHeight = menu.outerHeight()+15,
   menuItems = menu.find("a"),
   scrollItems = menuItems.map(function(){
   var item = $($(this).attr("href"));
   if (item.length) { 
      return item; 
   }
   });
menuItems.click(function(e){
   var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top-menuHeight+1;
   $('html, body').stop().animate({ 
      scrollTop: offsetTop
   }, 300);
   $("ul").removeClass("active");
   e.preventDefault();
});
$(window).scroll(function(){
   var fromTop = $(this).scrollTop()+menuHeight;
   var cur = scrollItems.map(function(){
      if ($(this).offset().top < fromTop)
      return this;
   });
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";  
   if (lastId !== id) {
      lastId = id;
      menuItems
      .removeClass("active")
      .filter("[href='#"+id+"']").addClass("active");
   }                   
});
}

function slider(){
   $(window).resize(function(){
      var sliderImg = $(".slider-img").height();
      $(".slider").css("height", sliderImg + "px");
   })
	$('.next').click(function(){ 
      event.preventDefault();
      var currentImage = $(".img.current");
      var currentImageIndex = $(".img.current").index();
      var nextImageIndex = currentImageIndex + 1;
      var nextImage = $(".img").eq(nextImageIndex);
      currentImage.fadeOut(1000);
      currentImage.removeClass("current");
      if(nextImageIndex > ($(".img:last").index())){
         $(".img").eq(0).fadeIn(1000);
         $(".img").eq(0).addClass("current");
      } else {
         nextImage.fadeIn(1000);
         nextImage.addClass("current");
      }
   });
   $('.prev').click(function() { 
      event.preventDefault();
      var currentImage = $(".img.current");
      var currentImageIndex = $(".img.current").index();
      var prevImageIndex = currentImageIndex - 1;
      var prevImage = $(".img").eq(prevImageIndex);
      currentImage.fadeOut(1000);
      currentImage.removeClass("current");
      prevImage.fadeIn(1000);
      prevImage.addClass("current");
   }); 
}

function openModal(){
   $('.button').click(function(e) { 
      e.stopPropagation();
      $('.overlay').fadeIn();
      $('.form').fadeIn();
   });
   $('#phone').on('keyup', function(){
      var phone = $('#phone').val().replace("(+64)", "").replace(/-/g,"").replace(/_/g,"");
      if (phone.length >= 8) {
         $('.send').removeAttr('disabled');
      } else{
         $('.send').attr('disabled', 'disabled');
      }
   });
   $('.form').submit(function(e) { 
      e.preventDefault();
      $('.send').parent().fadeOut();
      $('.thanks').fadeIn();
      $('.form').trigger('reset');
   });
   $('.close').click(function(e) { 
      e.preventDefault();
      $('.close').parent().fadeOut();
      $('.overlay').fadeOut();
   });
   $('.xclose').click(function(e) { 
      e.preventDefault();
      $('.overlay').fadeOut();
      $('.pop').fadeOut();	
      $('.form').trigger('reset');
   });
   $('.overlay').click(function(){
      $('.overlay').fadeOut();	
      $('.pop').fadeOut();	
   })
}

function inputMask(){
   var selector = document.getElementById("phone");
   var im = new Inputmask("(+64)99-999-9999");
   im.mask(selector);
}