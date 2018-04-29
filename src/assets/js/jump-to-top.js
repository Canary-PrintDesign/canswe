function toggleFade(position) {
  const el = $('.back-to-top-link');
  position > 800 ? el.fadeIn() : el.fadeOut();
}

function scrollHandler() {
  toggleFade($(this).scrollTop());
}

$(document).ready(scrollHandler);
$(document).scroll(scrollHandler);
