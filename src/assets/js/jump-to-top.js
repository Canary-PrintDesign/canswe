function toggleFade(position) {
  const el = $('.back-to-top');
  position > 800 ? el.fadeIn() : el.fadeOut();
}

function scrollTop() {
  toggleFade($(this).scrollTop());
}

$(document).scroll(scrollTop());
$(document).ready(scrollTop());
