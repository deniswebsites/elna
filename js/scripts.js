var w = window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],
bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;


$(window).load(function() {



});

$(window).resize(function() {



});

$(document).scroll(function() {



});

$(document).ready(function() {

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

    $(document).mouseup(function(e) {
      hide_element = $(".dr");
      if (!hide_element.is(e.target)
          && hide_element.has(e.target).length === 0) {
          hide_element.removeClass("active");
          hide_element.find(".dr_content").slideUp(300);
        }
    });

    $(this).keydown(function(eventObject){
      if (eventObject.which == 27) {
          $(".dr_content").slideUp(300);
          $(".dr").removeClass("active");
      }
    });

});