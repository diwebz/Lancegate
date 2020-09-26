


$(function() {
// var marquees = [...document.querySelectorAll('.marquee')];
// marquees.forEach((marquee) => {
// 	// marquee.innerHTML = marquee.innerHTML + '&nbsp;'.repeat(5);
//   marquee.i = 0;
//   marquee.step = 3;
// 	marquee.width = (marquee.clientWidth + 1);
//   marquee.style.position = '';
//   marquee.innerHTML = `${marquee.innerHTML}&nbsp;`.repeat(10);
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


//this is the useful function to scroll a text inside an element...

function startScrolling(scroller_obj, velocity, start_from) {
  //bind animation  inside the scroller element
  scroller_obj.bind('marquee', function (event, c) {
      //text to scroll
      var ob = $(this);
      //scroller width
      var sw = parseInt(ob.closest('.text_wrapper').width());
      //text width
      var tw = parseInt(ob.width());
      //text left position relative to the offset parent
      var tl = parseInt(ob.position().left);
      //velocity converted to calculate duration
      var v = velocity > 0 && velocity < 100 ? (100 - velocity) * 1000 : 5000;
      //same velocity for different text's length in relation with duration
      var dr = (v * tw / sw) + v;
      //is it scrolling from right or left?
      switch (start_from) {
          case 'right':
              console.log('here')
              //is it the first time?
              if (typeof c == 'undefined') {
                  //if yes, start from the absolute right
                  ob.css({
                      left: sw
                  });
                  sw = -tw;
              } else {
                  //else calculate destination position
                  sw = tl - (tw + sw);
              };
              break;
          default:
              if (typeof c == 'undefined') {
                  //start from the absolute left
                  ob.css({
                      left: -tw
                  });
              } else {
                  //else calculate destination position
                  sw += tl + tw;
              };
      }
      //attach animation to scroller element and start it by a trigger
      ob.animate({
          left: sw
      }, {
          duration: dr,
          easing: 'linear',
          complete: function () {
              ob.trigger('marquee');
          },
          step: function () {
              //check if scroller limits are reached
              if (start_from == 'right') {
                  if (parseInt(ob.position().left) < -parseInt(ob.width())) {
                      //we need to stop and restart animation
                      ob.stop();
                      ob.trigger('marquee');
                  };
              } else {
                  if (parseInt(ob.position().left) > parseInt(ob.parent().width())) {
                      ob.stop();
                      ob.trigger('marquee');
                  };
              };
          }
      });
  }).trigger('marquee');
  //pause scrolling animation on mouse over
  scroller_obj.mouseover(function () {
      $(this).stop();
  });
  //resume scrolling animation on mouse out
  scroller_obj.mouseout(function () {
      $(this).trigger('marquee', ['resume']);
  });
};


$(function() {
  $('.text_wrapper').each(function(i, obj) {
      if ($(this).find('.text_overflow').width() > $(this).width()) {
          //settings to pass to function
    var scroller = $(this).find('.text_overflow'); // element(s) to scroll
    var scrolling_velocity = 100; // 1-99
    var scrolling_from = 'right'; // 'right' or 'left'
    //call the function and start to scroll..
    startScrolling(scroller, scrolling_velocity, scrolling_from);
      }
  });
});

});