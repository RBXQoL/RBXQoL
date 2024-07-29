let windowLoaded = false;

$(window).on("load", function () {
  windowLoaded = true;
});

const preloaderTemplate = `
<div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
<span class="sr-only">Loading...</span>
</div>
`;

jQuery(function ($) {
  $("body").attr("aria-busy", true);

  $("#preloader-markup").html(preloaderTemplate);

  if (windowLoaded) {
    preloaderFading();
  } else {
    $(window).on("load", function () {
      preloaderFading();
    });
  }
});

function preloaderFading() {
  $("#mdb-preloader").fadeOut("slow");
  $("body").removeAttr("aria-busy");
  $("#preloader-markup").html("");
}
