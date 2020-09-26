// responsive nav bar
$(function() {
  let mainNav = document.getElementById("js-menu");
  let navBarToggle = document.getElementById("js-navbar-toggle");

  navBarToggle.addEventListener("click", function() {
    mainNav.classList.toggle("active");
  });
});

// animated text top background image
$(function(){
  $('#marquee-horizontal').marquee
  ({direction:'horizontal', delay:0, timing:50});  
});

//scroll into id when click anchor
$(function(){
  $(".nav-links").click(function(e) {
    e.preventDefault();
    var aid = $(this).attr("href");
    $('html,body').animate({scrollTop: $(aid).offset().top}, 1000);
  });
});

$(function(){
  $(".center-con__btn").click(function(e) {
    e.preventDefault();
    var aid = $(this).attr("href");
    $('html,body').animate({scrollTop: $(aid).offset().top}, 1000);
  });
});

//scroll to top btn footer
$(function(){
  $("a[href='#go-top']").click(function() {
    $("html, body").animate({ scrollTop: 0 }, 1500);
    return false;
  });
});

// slick slider
$(function() {
  $('.center').slick({
      // autoplay: true,
      centerMode: true,
      centerPadding: '150px',
      slidesToShow: 2,
      asNavFor: '.slider-for',
      dots: false,
      arrows: false,
      focusOnSelect: true,
      responsive: [
          {
          breakpoint: 768,
          settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '40px',
              slidesToShow: 3
          }
          },
          {
          breakpoint: 480,
          settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '40px',
              slidesToShow: 1
          }
          }
      ]
  });
  $('.left').click(function(){
      $('.slider-for').slick('slickPrev');
  });
  $('.right').click(function(){
      $('.slider-for').slick('slickNext');
  });
  $('.slider-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.slider-nav'
  });
});


// $(function() {
// const marquees = [...document.querySelectorAll('.js-logo-animation')];
// marquees.forEach((marquee) => {
// 	// marquee.innerHTML = marquee.innerHTML + '&nbsp;'.repeat(5);
//   marquee.i = 0;
//   marquee.step = 10;
// 	marquee.width = (marquee.clientWidth + 1);
//   marquee.style.position = '';
//   marquee.innerHTML = `${marquee.innerHTML}&nbsp;`.repeat(2);
//   // marquee.addEventListener('mouseenter', () => marquee.step = 0, false);
//   // marquee.addEventListener('mouseleave', () => marquee.step = 3, false);
// });

// setInterval(move, 50);

// function move() {
//   marquees
//   .forEach((marquee) => {
//   marquee.style.marginLeft = `-${marquee.i}px`;;
//   marquee.i = marquee.i < marquee.width ? marquee.i + marquee.step : 1;
//   }); 
// }
// });