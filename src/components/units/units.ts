import '../../scripts/owl.carousel/owl.carousel.min';

const $$wrapper = $<HTMLDivElement>('.units .wrapper');
const $$carousel = $<HTMLDivElement>('.units .units__row');

function initialize(): void {
  $$carousel
    .one('initialize.owl.carousel', () => {
      $$wrapper.css({
        'padding-right': '0',
        'padding-left': '10px',
      });
    })
    .one('initialized.owl.carousel', () => {
      $$wrapper.css({
        'padding-left': '20px',
      });

      $('.units .owl-stage').css({
        'padding-left': '0',
      });
    })
    .on('resize.owl.carousel', () => {
      $$wrapper.css({
        'padding-right': '0',
        'padding-left': '10px',
      });
    })
    .on('resized.owl.carousel', () => {
      $$wrapper.css({
        'padding-left': '20px',
      });

      $('.units .owl-stage').css({
        'padding-left': '0',
      });
    })
    .addClass('owl-carousel')
    .owlCarousel({
      dots: false,
      items: 1,
      loop: true,
      margin: 20,
      nav: false,
      stagePadding: 30,
    });
}

function destroy(): void {
  $$wrapper.css({
    'padding-right': '',
    'padding-left': '',
  });

  $$carousel
    .off('resize.owl.carousel resized.owl.carousel')
    .removeClass('owl-carousel')
    .owlCarousel('destroy');
}

if (!window.matchMedia('(min-width: 768px)').matches) {
  initialize();
}

window
  .matchMedia('(min-width: 768px)')
  .addEventListener('change', (event: MediaQueryListEvent) => {
    if (event.matches) {
      destroy();
      return;
    }

    initialize();
  });
