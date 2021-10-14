import '../../scripts/owl.carousel/owl.carousel.min';

const $$carousel = $<HTMLDivElement>('.cards .cards__row');

function initialize(): void {
  $$carousel.addClass('owl-carousel').owlCarousel({
    loop: true,
    margin: 30,
    nav: false,
    responsive: {
      0: {
        autoWidth: false,
        dots: true,
        items: 1,
      },
      768: {
        autoWidth: true,
        dots: false,
        items: 2,
      },
    },
  });
}

function destroy(): void {
  $$carousel.removeClass('owl-carousel').owlCarousel('destroy');
}

if (!window.matchMedia('(min-width: 1024px)').matches) {
  initialize();
}

window
  .matchMedia('(min-width: 1024px)')
  .addEventListener('change', (event: MediaQueryListEvent) => {
    if (event.matches) {
      destroy();
      return;
    }

    initialize();
  });
