function getAnimation() {
  $(".animate").each(function() {
    if( $(this).offset().top <= $(document).scrollTop() + $(window).height() ) {
      $(this).addClass("active");
    }
  });
}

var w = window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],
bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;


$(window).load(function() {



});

$(window).resize(function() {
  bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;
  getAnimation();
});

$(document).scroll(function() {
  getAnimation();
});

$(document).ready(function() {
  getAnimation();

    $(".dr").each(function() {
      drContent = $(this).find(".dr_content");
      if($(this).hasClass("active")) {      
        drContent.slideDown(300);
      } else {
        drContent.slideUp(300);
      }
    });

    $(".dr_title").on("click", function(e) {
      e.preventDefault();
      parent = $(this).closest(".dr");
      sl = parent.find(".dr_content");
      if(sl.is(":hidden")) {
        parent.addClass("active");
        sl.slideDown(300);
      } else {
        parent.removeClass("active");
        sl.slideUp(300);
      }
    });

    // $(document).mouseup(function(e) {
    //   hide_element = $(".dr");
    //   if (!hide_element.is(e.target)
    //       && hide_element.has(e.target).length === 0) {
    //       hide_element.removeClass("active");
    //       hide_element.find(".dr_content").slideUp(300);
    //     }
    // });

    $(this).keydown(function(eventObject){
      if (eventObject.which == 27) {
          $(".dr_content").slideUp(300);
          $(".dr").removeClass("active");
      }
    });

    if($("#map").length > 0) {
      var mapZoom = $("#map").attr("data-zoom");
      var lat = $("#map").attr("data-lat");
      var long = $("#map").attr("data-long");
      ymaps.ready(function () {        
          var myMap = new ymaps.Map('map', {
              center: [long, lat],
              zoom: mapZoom
          }, {
              searchControlProvider: 'yandex#search'
          });
          myPlacemark1 = new ymaps.Placemark([long, lat], {
              hintContent: ''
          }, {
          });
          myMap.geoObjects.add(myPlacemark1);        
      });
    }

    // ------------

    $(".nextQuiz").on("click", function(e) {
      e.preventDefault();
      parentWrapp = $(this).closest(".quiz_tabs_wrapp");
      countQuizTabs = parentWrapp.find(".quiz_tab").length;
      barPercent = 100 / countQuizTabs;
      parent = parentWrapp.find(".quiz_tab.active");
      activeIndex = parseInt(parent.attr("data-index"));
      nextActiveIndex = activeIndex + 1;
      $(".quiz_steps_bar").css({
        "width" : nextActiveIndex*barPercent + "%"
      });
      parent.removeClass("active");
      parentWrapp.find("[data-index = '"+nextActiveIndex+"']").addClass("active");
      if(activeIndex + 1 >= countQuizTabs) {
        $(".quiz_footer").addClass("hidden");
        $(".quiz_submit_wrapp").addClass("visible");
      }
    });

    $(".backQuiz").on("click", function(e) {
      e.preventDefault();
      parentWrapp = $(this).closest(".quiz_tabs_wrapp");
      parentWrapp.find(".quiz_tab").removeClass("active");
      parentWrapp.find("[data-index = '1']").addClass("active");
      $(".quiz_footer").removeClass("hidden");
      $(".quiz_submit_wrapp").removeClass("visible");
      countQuizTabs = parentWrapp.find(".quiz_tab").length;
      barPercent = 100 / countQuizTabs;
      $(".quiz_steps_bar").css({
        "width" : barPercent + "%"
      });
    });

    var error, this_form, name, tel;
    $(".submitQuiz").on("click", function(e) {
      e.preventDefault();
      error = 0;
      this_form = $(".quiz_form");
      this_form.find('input, textarea').removeClass('error');
      if(this_form.find('input').is('input[name="name"]')) {
          name = this_form.find('input[name="name"]');
          if(typeof name.attr('required') != typeof undefined) {
              if(name.val().length<=2) {
                  name.addClass('error');
                  error = 1;
              }
          }
      }
      if(this_form.find('input').is('input[name="tel"]')) {
          tel = this_form.find('input[name="tel"]');
          if(typeof tel.attr('required') != typeof undefined) {
              if( tel.val().length == 0 ) {
                  tel.addClass('error');
                  error = 1;
              }
          }
      }
      if(error==1) {
          return false;
      }
      // $.ajax({
      //     url: "/wp-admin/admin-ajax.php",
      //     method: 'post',
      //     data: {
      //       action: 'ajax_mail_send',
      //       name: name.val(),
      //       tel: tel.val()
      //     },
      //     success: function (response) {
      //         jQuery(this_form)[0].reset();
      //         this_form.find('input, textarea, select').removeClass('error');
      //         parentBlock = this_form.closest(".popup_content");
      //         if( parentBlock.hasClass("popup_content") ) {
      //           parentBlock.find(".close_popup").trigger("click");
      //         }
      //         $(".succesPopupLink").trigger("click");
      //         setTimeout(function() {
      //           $("[data-popup = 'form_popup'] .close_popup").trigger("click");
      //         }, 3000);
      //     },
      //     error: function(){
      //         alert('Ошибка при отправке');
      //     }
      // });
    });

    // --------------

    $(document).on("click", "[data-popup-link]",  function(e) {
      e.preventDefault();
      popupName = $(this).attr("data-popup-link");
      div = document.createElement('div');
      div.style.overflowY = 'scroll';
      div.style.width = '50px';
      div.style.height = '50px';
      div.style.visibility = 'hidden';
      document.body.appendChild(div);
      scrollWidth = div.offsetWidth - div.clientWidth;
      document.body.removeChild(div);
      topCoord = $(document).scrollTop();
      $("body").addClass("fixed");
      $("body").css({
          "top" :  -1 * topCoord + "px",
          "padding-right" : scrollWidth + "px"
      });
      $(".popup_bg").fadeIn(300);
      $("[data-popup = '"+ popupName +"']").fadeIn(300);
    });
    $(document).on("click", ".lp_close_popup, .lp_popup_bg", function(e) {
      e.preventDefault();
      curTop = $("body").css("top");
      curTop = Math.abs(parseInt(curTop, 10));
      $("body").removeClass("fixed");
      if (curTop !== 0) {
          $("html").scrollTop(curTop);
      }
      $("body").attr("style", "");
      $("[data-popup]").fadeOut(300);
      $(".popup_bg").fadeOut(300);
    });
    $(this).keydown(function(eventObject){
      if (eventObject.which == 27 && $("body").hasClass("fixed")) {
        curTop = $("body").css("top");
        curTop = Math.abs(parseInt(curTop, 10));
        $("body").removeClass("fixed");
        if (curTop !== 0) {
            $("html").scrollTop(curTop);
        }
        $("body").attr("style", "");      
        $(".popup_bg").fadeOut(300);
        $("[data-popup]").fadeOut(300);
      }
    });
    $(document).on("mouseup", function(e) {
      if($(".lp_popup").is(":visible")) {
        e.preventDefault();
        hide_element = $(".popup_content");
        if (!hide_element.is(e.target)
            && hide_element.has(e.target).length === 0) {
            curTop = $("body").css("top");
            curTop = Math.abs(parseInt(curTop, 10));
            $("body").removeClass("fixed");
            if (curTop !== 0) {
                $("html").scrollTop(curTop);
            }
            $("body").attr("style", "");    
            $(".popup_bg").fadeOut(300);
            $("[data-popup]").fadeOut(300);
        }
      }
    });

    // -----------

    $('a[href^="#"]').on('click', function (e) {
      e.preventDefault();
      var hrefAttr = $(this).attr("href");
      if( hrefAttr.length > 0 && hrefAttr != "#" ) {
        $(".main_nav a").removeClass("active");
        $(this).addClass("active");
        $('html, body').stop().animate({
          'scrollTop': $(hrefAttr).offset().top+2
        }, 500);
        if(bodyWidth <= 767) {
            $("#resp_nav").fadeOut(300);
            $(".respmenubtn").removeClass("active");
        }
      }
    });

    // -----------

    $(".respmenubtn").click(function(e) {
        e.preventDefault();
        if( $("#resp_nav").is(":hidden") ) {
            $("#resp_nav").fadeIn(300);
            $(this).addClass("active");
        } else {
            $("#resp_nav").fadeOut(300);
            $(this).removeClass("active");
        }
    });
    
    $(this).keydown(function(eventObject){
        if (eventObject.which == 27 &&
            $("#resp_nav").is(":visible") &&
            bodyWidth <= 1024) {
            $("#resp_nav").fadeOut(300);
            $(".respmenubtn").removeClass("active");
        }
    });

    $(".close_menu").click(function(e) {
      e.preventDefault();
      $("#resp_nav").fadeOut(300);
      $(".respmenubtn").removeClass("active");
    });

});