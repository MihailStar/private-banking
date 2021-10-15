import '../../scripts/owl.carousel/owl.carousel.min';

const $$carousel = $<HTMLDivElement>('.slides');

function initialize(): void {
  $$carousel
    .addClass('owl-carousel')
    .owlCarousel({
      dots: true,
      items: 1,
      loop: true,
      margin: 30,
      nav: false,
    })
    .find<HTMLButtonElement>('.owl-dots')
    .addClass('wrapper');
}

initialize();
