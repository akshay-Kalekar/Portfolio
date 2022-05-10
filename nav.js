$(document).ready(function () {
  $(window).scroll(function () {
    $("a").each(function () {});
    for (var i = 0; i < 4; i++) {
      if ($(document).scrollTop() >= (i-0.5) * $("section").prop("scrollHeight") && $(document).scrollTop() <= (i +0.5) * $("section").prop("scrollHeight")) {
        $("a").removeClass("selected");
        $("a").eq(i).addClass("selected");
      }
      if ($(document).scrollTop() >=  (i+0.5)* $("section").prop("scrollHeight") && $(document).scrollTop() <= 1.2 * $("section").prop("scrollHeight")) {
        $('#Skill').addClass('anim');
        $('g#Line-1 #HTML,g#Line-2 #CSS,g#Line-3 #JS,g#Line-4 #Threejs,g#Line-5 #Figma').addClass('animT');
        $('g#Line-1 #Line-51,g#Line-2 #Line-52,g#Line-3 #Line-53,g#Line-4 #Line-54,g#Line-5 #Line-55').addClass('svgPath');
       
      }
      if ($(document).scrollTop() >=  1.2* $("section").prop("scrollHeight") && $(document).scrollTop() <= (i + 1) * $("section").prop("scrollHeight")) {
        $('#Work').addClass('anim');
        $('#Work .img1 img,#Work .img2 img,#Work .img3 img').addClass('anim2');
      }
      if ($(document).scrollTop() >=  2.7* $("section").prop("scrollHeight") && $(document).scrollTop() <= (i + 1) * $("section").prop("scrollHeight")) {
       
        $('.trancBG').addClass('anim3');
      }
    }

  });
});


