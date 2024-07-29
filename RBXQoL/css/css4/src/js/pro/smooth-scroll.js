jQuery(() => {
  const SMOOTH_SCROLL_DURATION = 700;

  $('.smooth-scroll').on('click', 'a', function (e) {
    e.preventDefault();

    const $this = $(this);
    const elAttr = $this.attr('href');

    if (typeof elAttr !== undefined && elAttr.indexOf('#') === 0) {

      const offset = $(this).attr('data-offset') || 0;

      $('body,html').animate({
        scrollTop: $(elAttr).offset().top - offset
      }, SMOOTH_SCROLL_DURATION);

      const setHash = $this.parentsUntil('.smooth-scroll').last().parent().attr('data-allow-hashes');

      if (typeof setHash !== undefined && setHash !== false) {

        history.replaceState(null, null, elAttr);
      }
    }
  });
});
