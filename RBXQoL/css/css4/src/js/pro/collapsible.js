jQuery(($) => {

  $.fn.collapsible = function (options) {

    const defaults = {
      accordion: undefined
    };

    options = $.extend(defaults, options);

    return this.each(function () {

      const $this = $(this);

      const $panelHeaders = $this.find('> li > .collapsible-header');

      const collapsibleType = $this.data('collapsible');

      $this.off('click.collapse', '.collapsible-header');
      $panelHeaders.off('click.collapse');


      if (options.accordion || collapsibleType === 'accordion' || collapsibleType === undefined) {

        $panelHeaders.on('click.collapse', (e) => {

          let element = $(e.target);

          if (isChildOfPanelHeader(element)) {

            element = getPanelHeader(element);
          }

          element.toggleClass('active');
          accordionOpen($this, element);
        });

        accordionOpen($this, $panelHeaders.filter('.active').first());
      } else {

        $panelHeaders.each(function () {

          $(this).on('click.collapse', (e) => {

            let element = $(e.target);
            if (isChildOfPanelHeader(element)) {

              element = getPanelHeader(element);
            }
            element.toggleClass('active');
            expandableOpen(element);
          });

          if ($(this).hasClass('active')) {

            expandableOpen($(this));
          }

        });
      }
    });
  };

  function accordionOpen($collapsible, object) {

    const $panelHeaders = $collapsible.find('> li > .collapsible-header');

    expandableOpen(object);

    $panelHeaders.not(object)
      .removeClass('active')
      .parent()
      .removeClass('active')
      .children('.collapsible-body')
      .stop(true, false)
      .slideUp({
        duration: 350,
        easing: 'easeOutQuart',
        queue: false,
        complete() {
          $(this).css('height', '');
        }
      });

  }

  function expandableOpen(object) {

    if (object.hasClass('active')) {
      object.parent().addClass('active');
    } else {
      object.parent().removeClass('active');
    }

    if (object.parent().hasClass('active')) {
      object.siblings('.collapsible-body').stop(true, false).slideDown({
        duration: 350,
        easing: 'easeOutQuart',
        queue: false,
        complete() {
          $(this).css('height', '');
        }
      });
    } else {
      object.siblings('.collapsible-body').stop(true, false).slideUp({
        duration: 350,
        easing: 'easeOutQuart',
        queue: false,
        complete() {
          $(this).css('height', '');
        }
      });
    }
  }

  function isChildOfPanelHeader(object) {

    const $panelHeader = getPanelHeader(object);
    return $panelHeader.length > 0;
  }

  function getPanelHeader(object) {

    return object.closest('li > .collapsible-header');
  }

  $('.collapsible').collapsible();

});
