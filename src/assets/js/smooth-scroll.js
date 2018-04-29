/* global $ window */
// Select all links with hashes
// /**/
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')

  .click(function clickHandler(event) {
    // On-page links
    const isOnPage = window.location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '');
    const isSameHost = window.location.hostname === this.hostname;

    if (isOnPage && isSameHost) {
      // Figure out element to scroll to
      let target = $(this.hash);
      target = target.length ? target : $(`[name=${this.hash.slice(1)}]`);
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({ scrollTop: target.offset().top }, 500);
      }
    }
  });
