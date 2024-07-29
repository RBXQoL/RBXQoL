(($) => {

  class MdbAutocomplete {

    constructor(input, options) {

      this.defaults = {
        data: {},
        dataColor: '',
        closeColor: '#4285f4',
        closeBlurColor: '#ced4da',
        inputFocus: '1px solid #4285f4',
        inputBlur: '1px solid #ced4da',
        inputFocusShadow: '0 1px 0 0 #4285f4',
        inputBlurShadow: '',
        visibleOptions: 5
      };

      this.enterCharCode = 13;
      this.homeCharCode = 36;
      this.endCharCode = 35;
      this.arrowUpCharCode = 38;
      this.arrowDownCharCode = 40;
      this.tabCharCode = 9;
      this.shiftCharCode = 16;
      this.count = -1;
      this.nextScrollHeight = -45;
      this.$input = input;
      this.options = this.assignOptions(options);
      this.$clearButton = this.$input.next('.mdb-autocomplete-clear');
      this.$autocompleteWrap = $('<ul class="mdb-autocomplete-wrap"></ul>');
    }

    init() {
      
      this.handleEvents();
    }

    handleEvents() {

      this.setData();
      this.inputFocus();
      this.inputBlur();
      this.inputKeyupData();
      this.inputTabPrevent();
      this.inputLiClick();
      this.clearAutocomplete();
      this.setAutocompleteWrapHeight();
    }

    assignOptions(options) {

      return $.extend({}, this.defaults, options);
    }

    setAutocompleteWrapHeight() {
      this.$autocompleteWrap.css('max-height', `${this.options.visibleOptions * 45}px`);
    }

    setData() {

      if (Object.keys(this.options.data).length) {
        this.$autocompleteWrap.insertAfter(this.$input);
      }
    }

    inputFocus() {

      this.$input.on('focus', () => {

        this.changeSVGcolors();
        this.$input.css('border-bottom', this.options.inputFocus);
        this.$input.css('box-shadow', this.options.inputFocusShadow);
      });
    }

    inputBlur() {

      this.$input.on('blur', () => {

        this.$input.css('border-bottom', this.options.inputBlur);
        this.$input.css('box-shadow', this.options.inputBlurShadow);
        this.$autocompleteWrap.empty();
      });
    }

    inputTabPrevent() {
      let keys = {};
      this.$input.on("keydown keyup", e => {
        if (e.type == "keydown" && this.$input.val()) {
          keys[e.which] = true;

          if (keys[this.shiftCharCode] && keys[this.tabCharCode]) {
            e.preventDefault();
            this.$clearButton.focus();
          } else if (keys[this.tabCharCode] && !keys[this.shiftCharCode]) {
            e.preventDefault();
            this.$clearButton.focus();
          }
        } else if (e.type == "keyup") {
          keys = {};
        }
      });

      this.$clearButton.on("keydown keyup", e => {
        if (e.type == "keydown" && this.$input.val()) {
          keys[e.which] = true;

          if (keys[this.shiftCharCode] && keys[this.tabCharCode]) {
            e.preventDefault();
            this.$input.focus();
          } else if (keys[this.tabCharCode] && !keys[this.shiftCharCode]) {
            e.preventDefault();
            this.$input.focus();
          }
        } else if (e.type == "keyup") {
          keys = {};
        }
      });
    }

    inputKeyupData() {

      this.$input.on('focus input  keyup', e => {
        
        if (e.which === this.enterCharCode) {
          if (!this.options.data.includes(this.$input.val())) {
            this.options.data.push(this.$input.val());
          }
          this.$autocompleteWrap.find('.selected').trigger('mousedown');
          this.$autocompleteWrap.empty();
          this.inputBlur();
          this.count = -1;
          this.nextScrollHeight = -45;
          return this.count;
        }

        const $inputValue = this.$input.val();

        this.$autocompleteWrap.empty();

        if ($inputValue.length) {

          this.appendOptions(this.options.data, $inputValue);

          const $ulList = this.$autocompleteWrap;
          const $ulItems = this.$autocompleteWrap.find('li');
          const nextItemHeight = $ulItems.eq(this.count).outerHeight();
          const previousItemHeight = $ulItems.eq(this.count - 1).outerHeight();

          if (e.which === this.homeCharCode) {

            this.homeHandler($ulList, $ulItems);
          }

          if (e.which === this.endCharCode) {

            this.endHandler($ulList, $ulItems);
          }

          if (e.which === this.arrowDownCharCode) {

            this.arrowDownHandler($ulList, $ulItems, nextItemHeight);
          } else if (e.which === this.arrowUpCharCode) {

            this.arrowUpHandler($ulList, $ulItems, nextItemHeight, previousItemHeight);
          }


          if ($inputValue.length === 0) {

            this.$clearButton.css('visibility', 'hidden');
          } else {

            this.$clearButton.css('visibility', 'visible');
          }

          this.$autocompleteWrap.children().css('color', this.options.dataColor);
        } else {
          this.$clearButton.css('visibility', 'hidden');
        }
      });
    }

    endHandler($ulList, $ulItems) {

      this.count = $ulItems.length - 1;
      this.nextScrollHeight = ($ulItems.length * 45 - 45);
      $ulList.scrollTop(($ulItems.length) * 45);
      $ulItems.eq(-1).addClass('selected');
    }

    homeHandler($ulList, $ulItems) {
      this.count = 0;
      this.nextScrollHeight = -45;
      $ulList.scrollTop(0);
      $ulItems.eq(0).addClass('selected');
    }

    arrowDownHandler($ulList, $ulItems, nextItemHeight) {

      if (this.count > $ulItems.length - 2) {

        this.count = -1;
        $ulItems.scrollTop(0);
        this.nextScrollHeight = -45;
        return;
      } else {

        this.count++;
      }

      this.nextScrollHeight += nextItemHeight;
      $ulList.scrollTop(this.nextScrollHeight);
      $ulItems.eq(this.count).addClass('selected');
    }

    arrowUpHandler($ulList, $ulItems, nextItemHeight, previousItemHeight) {

      if (this.count < 1) {
        this.count = $ulItems.length;
        $ulList.scrollTop($ulList.prop('scrollHeight'));
        this.nextScrollHeight = $ulList.prop('scrollHeight') - nextItemHeight;
      } else {

        this.count--;
      }
      this.nextScrollHeight -= previousItemHeight;
      $ulList.scrollTop(this.nextScrollHeight);
      $ulItems.eq(this.count).addClass('selected');
    }

    appendOptions(data, $inputValue) {

      for (const item in data) {

        if (data[item].toLowerCase().indexOf($inputValue.toLowerCase()) !== -1) {

          const option = $(`<li>${data[item]}</li>`);

          this.$autocompleteWrap.append(option);
        }
      }
    }

    inputLiClick() {

      this.$autocompleteWrap.on('mousedown', 'li', e => {
        e.preventDefault();

        this.$input.val($(e.target).text());
        this.$autocompleteWrap.empty();
      });
    }

    clearAutocomplete() {

      this.$clearButton.on('click', e => {
        e.preventDefault();

        this.count = -1;
        this.nextScrollHeight = -45;
        const $this = $(e.currentTarget);

        $this.parent().find('.mdb-autocomplete').val('');
        $this.css('visibility', 'hidden');
        this.$autocompleteWrap.empty();
        $this.parent().find('label').removeClass('active');
      });
    }

    changeSVGcolors() {

      if (this.$input.hasClass('mdb-autocomplete')) {

        this.$input.on('keyup', e => {

          this.fillSVG(e, this.options.closeColor);
        });

        this.$input.on('blur', e => {

          this.fillSVG(e, this.options.closeBlurColor);
        });
      }
    }

    fillSVG(e, color) {
      e.preventDefault();

      $(e.target).parent().find('.mdb-autocomplete-clear').find('svg').css('fill', color);
    }
  }

  $.fn.mdbAutocomplete = function (options) {
    return this.each(function () {
      const mdbAutocomplete = new MdbAutocomplete($(this), options);
      mdbAutocomplete.init();
    });
  };

})(jQuery);
