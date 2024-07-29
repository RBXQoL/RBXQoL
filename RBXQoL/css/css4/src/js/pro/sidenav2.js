jQuery(($) => {

  class SideNav2 {

    constructor(element, options) {

      this.settings = {
        menuLeftMinBorder: 0.3,
        menuLeftMaxBorder: -0.5,
        menuRightMinBorder: -0.3,
        menuRightMaxBorder: 0.5,
        menuVelocityOffset: 10
      };

      this.defaults = {
        menuWidth: 240,
        edge: 'left',
        closeOnClick: false,
        breakpoint: 1440,
        timeDurationOpen: 500,
        timeDurationClose: 500,
        timeDurationOverlayOpen: 200,
        timeDurationOverlayClose: 200,
        easingOpen: 'easeInOutQuad',
        easingClose: 'easeInOutQuad',
        showOverlay: true,
        showCloseButton: false,
        slim: false,
        onOpen: null,
        onClose: null,
        // side, push, over
        mode: 'over'
      };

      this.$element = element;

      this.$elementCloned = element.clone().css({
        display: 'inline-block',
        lineHeight: '24px'
      }).html('<i class="fas fa-times"></i>');

      this.options = this.assignOptions(options);

      this.menuOut = false;
      this.lastTouchVelocity = {
        x: {
          startPosition: 0,
          startTime: 0,
          endPosition: 0,
          endTime: 0
        }
      };

      this.$body = $('body');
      this.$menu = $(`#${this.$element.attr('data-activates')}`);
      this.$sidenavOverlay = $('#sidenav-overlay');
      this.$dragTarget = $('<div class="drag-target"></div>');
      this.isTouchDevice = 'ontouchstart' in document.documentElement;
      this.$body.append(this.$dragTarget);

    }

    assignOptions(newOptions) {

      return $.extend({}, this.defaults, newOptions);
    }

    init() {
      this.setMenuWidth();
      this.setMenuTranslation();
      this.closeOnClick();
      this.openOnClick();
      this.bindTouchEvents();
      this.bindKeydownEvents();
      this.showCloseButton();
      this.inputOnClick();
      this.setTabTrap();
      this.handleSlim();
      if (this.options.slim === true) {
        $('#toggle').trigger('click');
      }
      this.onOpen();
      this.onClose();
      if(this.options[0] + this.options[1] + this.options[2] + this.options[3] === 'show' && this.menuOut === false) {
        this.$element.trigger('click')
      }
      if(this.options[0] + this.options[1] + this.options[2] + this.options[3] === 'hide' && this.menuOut === true) {
        this.removeMenu();
      }
      
      if(this.options.mode === 'push' || this.options.mode === 'side') {
        $('.fixed-sn .main, .fixed-sn footer, .fixed-sn header').css({
          transition: 'all 0.5s ease-in-out'
        });
      }
    }

    setMenuWidth() {

      const $sidenavBg = $(`#${this.$menu.attr('id')}`).find('> .sidenav-bg');

      this.$menu.css('width', this.options.menuWidth);
      $sidenavBg.css('width', this.options.menuWidth);

    }

    setMenuTranslation() {

      if (this.options.edge === 'left') {

        this.$menu.css('transform', 'translateX(-100%)');
        this.$dragTarget.css({
          left: 0
        });

      } else {

        this.$menu.addClass('right-aligned').css('transform', 'translateX(100%)');
        this.$dragTarget.css({
          right: 0
        });
      }

      if (!this.$menu.hasClass('side')) {
        
        return;
      }

      if (window.innerWidth > this.options.breakpoint) {

        this.menuOut = true; 
        this.$menu.css('transform', 'translateX(0)');
      } else {

        this.menuOut = false; 
      }

      this.$menu.find('input[type=text]').on('touchstart', () => {

        this.$menu.addClass('transform-fix-input');
      });

      $(window).on('resize', () => {
        if (!this.isTouchDevice) {
          $('.fixed-sn main, .fixed-sn footer').css('padding-left', this.options.menuWidth);
        }
        
        if (window.innerWidth > this.options.breakpoint) {
          
          if (this.$sidenavOverlay.length) {
            
            this.removeMenu(true);
            $('.fixed-sn main, .fixed-sn footer').css('padding-left', this.options.menuWidth);
          } else {

            if(this.menuOut === false) { $(this).trigger('sidenav_open', [this.options.onOpen]) }

            this.$menu.css('transform', 'translateX(0%)');
            this.menuOut = true; 
          }
        } else if (this.menuOut === false && !this.isTouchDevice) {
          
          const xValue = this.options.edge === 'left' ? '-100' : '100';
          this.$menu.css('transform', `translateX(${xValue}%)`);
          this.removeMenu(true);
        } else if (!this.isTouchDevice) {
          this.menuOut = false; 
          this.removeMenu(true);
        }
      });

    }

    closeOnClick() {

      if (this.options.closeOnClick === true) {

        this.$menu.on('click', 'a:not(.collapsible-header)', () => this.removeMenu());

        if (this.$menu.css('transform') === 'translateX(0)') {
          this.$menu.on('click', () => this.removeMenu());
        }
      }
    }

    onOpen(callback) {

      $(this).on('sidenav_open', (event, callback) => {
        if (typeof callback === 'function') {

          callback();
        }
      });
    }

    onClose(callback) {

      $(this).on('sidenav_close', (event, callback) => {
        if (typeof callback === 'function') {

          callback();
        }
      });
    }

    openOnClick() {
      
      // eslint-disable-next-line consistent-return
      this.$element.on('click', e => {

        e.preventDefault();
        if (this.menuOut === true) {
          return this.removeMenu();
        } else {
          $(this).trigger('sidenav_open', [this.options.onOpen]);
          this.menuOut = true;
        }

        if (this.options.showOverlay === true) {
          if (!$('#sidenav-overlay').length) {
            
            this.showSidenavOverlay()
          }
        } else {
          this.showCloseButton();
        }

        let translateX = [];

        if (this.options.edge === 'left') {

          translateX = [0, -1 * this.options.menuWidth];
        } else {

          translateX = [0, this.options.menuWidth];
        }
        if (this.$menu.css('transform') !== 'matrix(1, 0, 0, 1, 0, 0)') {
          this.$menu.velocity({
            translateX
          }, {
            duration: this.options.timeDurationOpen,
            queue: false,
            easing: this.options.easingOpen
          });
        }
        // this.$sidenavOverlay.on('click', () => this.removeMenu());

        this.$sidenavOverlay.on('touchmove', this.touchmoveEventHandler.bind(this));
        this.$menu.on('touchmove', e => {

          e.preventDefault();

          this.$menu.find('.custom-scrollbar').css('padding-bottom', '30px');

        });

        if(this.options.showOverlay === false) {
          
          this.menuOut = true;
        }

        if(this.options.mode === 'push') {
          let sidePadding;
          if(!this.$menu.hasClass('slim')) {
            sidePadding = this.options.edge === 'left' ? {marginLeft: `${this.options.menuWidth}px`} : {marginLeft: `-${this.options.menuWidth}px`}
          } else {
            sidePadding = this.options.edge === 'left' ? {marginLeft: `3.75rem`} : {marginLeft: `-3.75rem`}
          }
          
          $('.fixed-sn .main, .fixed-sn footer, .fixed-sn header').css(sidePadding);
          
        }
        if(this.options.mode === 'side') {
          const elWidth = $('.main').width() - this.options.menuWidth;
          
          let sidePadding;
          if(!this.$menu.hasClass('slim')) {
            sidePadding = this.options.edge === 'left' ? {marginLeft: `${this.options.menuWidth}px`, width: `${elWidth}px`} : {marginRight: `${this.options.menuWidth}px`, width: `${elWidth}px`}
          } else {
            sidePadding = this.options.edge === 'left' ? {marginLeft: `3.75rem`, width: ``} : {marginLeft: `-3.75rem`, width: ``}
          }
          $('.fixed-sn .main, .fixed-sn footer, .fixed-sn header').css(sidePadding);
        }
      });
    }

    bindTouchEvents() {

      this.$dragTarget.on('click', () => {
        
        if (this.menuOut) {
          this.removeMenu();
        }       
      } );

      this.$dragTarget.on('touchstart', e => {

        this.lastTouchVelocity.x.startPosition = e.touches[0].clientX;
        this.lastTouchVelocity.x.startTime = Date.now();
      });
      this.$dragTarget.on('touchmove', this.touchmoveEventHandler.bind(this));
      this.$dragTarget.on('touchend', this.touchendEventHandler.bind(this));
    }

    showCloseButton() {

      if (this.options.showCloseButton === true) {

        this.$menu.prepend(this.$elementCloned);
        this.$menu.find('.logo-wrapper').css({
          borderTop: '1px solid rgba(153,153,153,.3)'
        });
      }
    }

    inputOnClick() {

      this.$menu.find('input[type=text]').on('touchstart', () => this.$menu.css('transform', 'translateX(0)'));
    }

    removeMenu(restoreMenu) {
      if(this.options.mode === 'push') {
        $('.fixed-sn .main, .fixed-sn footer, .fixed-sn header').css({
          marginLeft: '0'
        });
      }
      if(this.options.mode === 'side') {
        const elWidth = $('.main').width() + this.options.menuWidth;
        $('.fixed-sn .main, .fixed-sn footer, .fixed-sn header').css({
          marginLeft: '0',
          width: `100%`
        });
      }
      this.$body.css({
        overflow: '',
        width: ''
      });

      this.$menu.velocity({
        translateX: this.options.edge === 'left' ? '-100%' : '100%'
      }, {
        duration: this.options.timeDurationClose,
        queue: false,
        easing: this.options.easingClose,
        complete: () => {
          if (restoreMenu === true) {
            this.$menu.removeAttr('style');
            this.$menu.css('width', this.options.menuWidth);
          }
        }
      });

      this.$menu.removeClass('transform-fix-input');
      this.hideSidenavOverlay();
      this.menuOut = false;
      
      $('.fixed-sn .double-nav').css('padding-left', 'unset');
      $('.fixed-sn main, .fixed-sn footer').css({
        'padding-left': '0'
      });
      $(this).trigger('sidenav_close', [this.options.onClose]);
    }

    handleSlim() {

      const $toggle = $('#toggle');
      $toggle.on('click', () => {
        if (this.$menu.hasClass('slim')) {
          this.$menu.removeClass('slim');
          $('.sv-slim-icon').removeClass('fa-angle-double-right').addClass('fa-angle-double-left');
          $('.fixed-sn .double-nav').css({
            transition: 'all .3s ease-in-out',
            'padding-left': '15.9rem'
          });
          
          if(this.options.mode === 'push') {
            const sidePadding = this.options.edge === 'left' ? {marginLeft: `15rem`} : {marginRight: `15rem`, marginLeft: '-15rem'}
            $('.fixed-sn .main, .fixed-sn footer, .fixed-sn header').css(sidePadding);
          }
          if(this.options.mode === 'side') {
            
            // const elWidth = $('.main').width() - this.options.menuWidth;
            const sidePadding = this.options.edge === 'left' ? {marginLeft: `15rem`, width: ``} : {marginRight: `15rem`, width: ``}
            $('.fixed-sn .main, .fixed-sn footer, .fixed-sn header').css(sidePadding);
          }

          $('.fixed-sn main, .fixed-sn footer').css({
            transition: 'all .3s ease-in-out',
            'padding-left': '15rem'
          });

        } else {

          this.$menu.addClass('slim');
          
          if(this.options.edge === 'right') {
            this.$menu.css({right: '0'})
          }

          if(this.options.mode === 'push') {
            const sidePadding = this.options.edge === 'left' ? {marginLeft: `3.75rem`} : {marginRight: `3.75rem`, marginLeft: '0'}
            $('.fixed-sn .main, .fixed-sn footer, .fixed-sn header').css(sidePadding);
          }

          if(this.options.mode === 'side') {
            
            const elWidth = $('.main').width() - this.options.menuWidth;
            const sidePadding = this.options.edge === 'left' ? {marginLeft: `3.75rem`, width: ``} : {marginRight: `3.75rem`, width: ``}
            $('.fixed-sn .main, .fixed-sn footer, .fixed-sn header').css(sidePadding);
          }
          
          $('.sv-slim-icon').removeClass('fa-angle-double-left').addClass('fa-angle-double-right');
          $('.fixed-sn .double-nav').css('padding-left', '4.6rem');
          $('.fixed-sn main, .fixed-sn footer').css({
            'padding-left': '3.7rem'
          });
        }
      });
    }

    touchmoveEventHandler(e) {

      if (e.type !== 'touchmove') {

        return;
      }

      const [touch] = e.touches;
      let touchX = touch.clientX;

      // calculate velocity every 20ms
      if (Date.now() - this.lastTouchVelocity.x.startTime > 20) {

        this.lastTouchVelocity.x.startPosition = touch.clientX;
        this.lastTouchVelocity.x.startTime = Date.now();
      }

      this.disableScrolling();

      const overlayExists = this.$sidenavOverlay.length !== 0;
      if (!overlayExists) {

        this.buildSidenavOverlay();
      }

      // Keep within boundaries
      if (this.options.edge === 'left') {

        if (touchX > this.options.menuWidth) {

          touchX = this.options.menuWidth;
        } else if (touchX < 0) {

          touchX = 0;
        }
      }

      this.translateSidenavX(touchX);
      this.updateOverlayOpacity(touchX);
    }

    setTabTrap() {

      this.$menu.find('.collapsible-header').each((i, el) => {
        $(el).attr('tabIndex', '0');
      })

      this.$menu.find('#toggle').attr('tabIndex', '0');

      const tabTrapElements = this.$menu.find('a[tabindex=0]');
      const numberOfElements = tabTrapElements.length;
      const firstElement = this.$menu.find('li').get(0);
      const lastElement = tabTrapElements.get(numberOfElements - 1);

      const tabKey = 9;

      $(lastElement).on('keydown', (e) => {
        if (e.keyCode === tabKey) {
          e.preventDefault();
          if (!e.shiftKey) {
            $(firstElement).find('a').focus();
          }
  
          if (e.shiftKey) {
            $(lastElement).focus();
          }
        }
      })
    }

    bindKeydownEvents () {
      const space = 32;
      const enter = 13;

      this.$menu.find('.collapsible-accordion a').on('keydown', (e) => {
        if (e.keyCode === space || e.keyCode === enter) {
          $(e.currentTarget).trigger('click');
        }
      });
    }

    calculateTouchVelocityX() {

      const distance = Math.abs(this.lastTouchVelocity.x.endPosition - this.lastTouchVelocity.x.startPosition);
      const time = Math.abs(this.lastTouchVelocity.x.endTime - this.lastTouchVelocity.x.startTime);

      return distance / time;
    }

    touchendEventHandler(e) {

      if (e.type !== 'touchend') {

        return;
      }

      const touch = e.changedTouches[0];

      this.lastTouchVelocity.x.endTime = Date.now();
      this.lastTouchVelocity.x.endPosition = touch.clientX;
      const velocityX = this.calculateTouchVelocityX();

      const touchX = touch.clientX;
      let leftPos = touchX - this.options.menuWidth;
      let rightPos = touchX - this.options.menuWidth / 2;
      if (leftPos > 0) {
        leftPos = 0;
      }
      if (rightPos < 0) {
        rightPos = 0;
      }

      if (this.options.edge === 'left') {

        // If velocityX <= 0.3 then the user is flinging the menu closed so ignore this.menuOut
        if (this.menuOut || velocityX <= this.settings.menuLeftMinBorder || velocityX < this.options.menuLeftMaxBorder) {

          if (leftPos !== 0) {

            this.translateMenuX([0, leftPos], '300');
          }

          this.showSidenavOverlay();

        } else if (!this.menuOut || velocityX > this.settings.menuLeftMinBorder) {

          this.enableScrolling();
          this.translateMenuX([-1 * this.options.menuWidth - this.options.menuVelocityOffset, leftPos], '200');
          this.hideSidenavOverlay();
        }

        this.$dragTarget.css({
          width: '10px',
          right: '',
          left: 0
        });
      } else if (this.menuOut && velocityX >= this.settings.menuRightMinBorder || velocityX > this.settings.menuRightMaxBorder) {

        this.translateMenuX([0, rightPos], '300');
        this.showSidenavOverlay();

        this.$dragTarget.css({
          width: '50%',
          right: '',
          left: 0
        });
      } else if (!this.menuOut || velocityX < this.settings.menuRightMinBorder) {

        this.enableScrolling();
        this.translateMenuX([this.options.menuWidth + this.options.menuVelocityOffset, rightPos], '200');
        this.hideSidenavOverlay();

        this.$dragTarget.css({
          width: '10px',
          right: 0,
          left: ''
        });
      }
    }

    buildSidenavOverlay() {

      if (this.options.showOverlay === true) {

        this.$sidenavOverlay = $('<div id="sidenav-overlay"></div>');
        this.$sidenavOverlay.css('opacity', 0).on('click', () => this.removeMenu());

        this.$body.append(this.$sidenavOverlay);
      }
    }

    disableScrolling() {

      const oldWidth = this.$body.innerWidth();
      this.$body.css('overflow', 'hidden');
      this.$body.width(oldWidth);
    }

    enableScrolling() {

      this.$body.css({
        overflow: '',
        width: ''
      });
    }

    translateMenuX(fromTo, duration) {

      this.$menu.velocity({
        translateX: fromTo
      }, {
        duration: typeof duration === 'string' ? Number(duration) : duration,
        queue: false,
        easing: this.options.easingOpen
      });
    }

    translateSidenavX(touchX) {

      if (this.options.edge === 'left') {

        const isRightDirection = touchX >= this.options.menuWidth / 2;
        this.menuOut = isRightDirection;

        this.$menu.css('transform', `translateX(${touchX - this.options.menuWidth}px)`);
      } else {

        const isLeftDirection = touchX < window.innerWidth - this.options.menuWidth / 2;
        this.menuOut = isLeftDirection;

        let rightPos = touchX - this.options.menuWidth / 2;
        if (rightPos < 0) {
          rightPos = 0;
        }

        this.$menu.css('transform', `translateX(${rightPos}px)`);
      }
    }

    updateOverlayOpacity(touchX) {

      let overlayPercentage;
      if (this.options.edge === 'left') {

        overlayPercentage = touchX / this.options.menuWidth;
      } else {

        overlayPercentage = Math.abs((touchX - window.innerWidth) / this.options.menuWidth);
      }

      this.$sidenavOverlay.velocity({
        opacity: overlayPercentage
      }, {
        duration: 10,
        queue: false,
        easing: this.options.easingOpen
      });
    }

    showSidenavOverlay() {

      if (this.options.showOverlay === true && !$('#sidenav-overlay').length) {
        this.buildSidenavOverlay();
      }
      this.$sidenavOverlay.velocity({
        opacity: 1
      }, {
        duration: this.options.timeDurationOverlayOpen,
        queue: false,
        easing: this.options.easingOpen
      });
    }

    hideSidenavOverlay() {

      this.$sidenavOverlay.velocity({
        opacity: 0
      }, {
        duration: this.options.timeDurationOverlayClose,
        queue: false,
        easing: this.options.easingOpen,
        complete() {
          $(this).remove();
        }
      });
    }
  }

  $.fn.sideNav2 = function (options) {
    $(this).each(function () {
      const sidenav2 = new SideNav2($(this), options);
      sidenav2.init();
    });
  };

  $('.side-nav').on('touchmove', function (e) {
    e.stopPropagation();
  }, false);
});
