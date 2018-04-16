function toggleFade(position) {
  var el = $('.back-to-top');

  (position > 800)
    ? $('.back-to-top').fadeIn()
    : $('.back-to-top').fadeOut();
}

$(document).scroll(function() {
  toggleFade($(this).scrollTop());
});

$(document).ready(function() {
  toggleFade($(this).scrollTop());
});
