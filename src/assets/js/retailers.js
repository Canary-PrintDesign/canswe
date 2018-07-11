$(() => {
  const hideRetailers = (function call() {
    $('.province, .city, .retailer, .retailers__list').hide();
    return call;
  })();

  function showTree(el) {
    el.closest('.city').show();
    el.closest('.province').show();
    el.find('.city').show();
    el.find('.retailer').show();
    el.find('.province').show();
    el.closest('.retailers__list').show();
    el.show();
  }

  function filterRetailer() {
    hideRetailers();

    const val = $(this).val()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]+/g, '')
      .replace(/--+/g, '-');

    [
      $('[data-retailer-name*="'+val+'"]'),
      $('[data-city*="'+val+'"]'),
      $('[data-province*="'+val+'"]'),
    ]
    .filter(e => e[0]) // filter undefined
    .forEach(showTree);
  }

  $('#filter').on('input', filterRetailer);
});

