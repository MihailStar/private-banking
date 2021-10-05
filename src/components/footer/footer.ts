const $accordion = document.querySelector<HTMLDivElement>('.footer-accordion');
if (!($accordion instanceof HTMLDivElement)) {
  throw new Error('Accordion not found');
}

const $buttons = Array.from(
  $accordion.querySelectorAll<HTMLButtonElement>('.footer-accordion__button')
);
const $spoilers = Array.from(
  $accordion.querySelectorAll<HTMLDivElement>('.footer-accordion__spoiler')
);

function buttonClickHandler(event: MouseEvent): void {
  event.preventDefault();

  const $currentButton = event.target as typeof $buttons[0] & {
    dataset: { spoiler: string | undefined };
  };
  if ($currentButton.dataset.spoiler === undefined) {
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const $currentSpoiler = $accordion!.querySelector<typeof $spoilers[0]>(
    $currentButton.dataset.spoiler
  );
  if ($currentSpoiler === null) {
    return;
  }

  $spoilers.forEach(($spoiler) => {
    if (
      $spoiler === $currentSpoiler &&
      !$spoiler.classList.contains('footer-accordion__spoiler_open')
    ) {
      $spoiler.setAttribute('aria-hidden', 'false');
      $spoiler.classList.add('footer-accordion__spoiler_open');
      $spoiler.style.maxHeight = `${$spoiler.scrollHeight}px`;
      return;
    }

    $spoiler.setAttribute('aria-hidden', 'true');
    $spoiler.classList.remove('footer-accordion__spoiler_open');
    $spoiler.style.maxHeight = '';
  });

  $buttons.forEach(($button) => {
    if (
      $button === $currentButton &&
      !$button.classList.contains('footer-accordion__button_spoiler-open')
    ) {
      $button.setAttribute('aria-expanded', 'true');
      $button.classList.add('footer-accordion__button_spoiler-open');
      $button.nextElementSibling?.classList?.add(
        'footer-accordion__icon_spoiler-open'
      );
      return;
    }

    $button.setAttribute('aria-expanded', 'false');
    $button.classList.remove('footer-accordion__button_spoiler-open');
    $button.nextElementSibling?.classList?.remove(
      'footer-accordion__icon_spoiler-open'
    );
  });
}

// function collapseAccordion(event: MediaQueryListEvent): void {
//   if (event.matches) {
//     $buttons.forEach(($button) => {
//       if ($button.classList.contains('footer-accordion__button_spoiler-open')) {
//         $button.click();
//       }
//     });
//   }
// }

$buttons.forEach(($button) => {
  $button.addEventListener('click', buttonClickHandler);
});

// window
//   .matchMedia('(min-width: 512px)')
//   .addEventListener('change', collapseAccordion);
