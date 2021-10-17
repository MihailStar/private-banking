const $header = document.querySelector<HTMLElement>('.header') as HTMLElement;
if (!($header instanceof HTMLElement)) {
  throw new Error('Header not found');
}

// dropdown

const $dropdownButtons = Array.from(
  $header.querySelectorAll<HTMLAnchorElement>('.dropdown__button')
);
const $dropdownMenus = Array.from(
  $header.querySelectorAll<HTMLDivElement>('.dropdown__menu')
);

function dropdownButtonClickHandler(event: MouseEvent): void {
  event.preventDefault();

  const $currentDropdownButton = event.target as typeof $dropdownButtons[0] & {
    dataset: { menu: string | undefined };
  };
  if ($currentDropdownButton.dataset.menu === undefined) {
    return;
  }

  const $currentDropdownMenu = $header.querySelector<typeof $dropdownMenus[0]>(
    $currentDropdownButton.dataset.menu
  );
  if ($currentDropdownMenu === null) {
    return;
  }

  $dropdownMenus.forEach(($dropdownMenu) => {
    if (
      $dropdownMenu === $currentDropdownMenu &&
      !$dropdownMenu.classList.contains('dropdown__menu_open')
    ) {
      $dropdownMenu.classList.add('dropdown__menu_open');

      return;
    }

    $dropdownMenu.classList.remove('dropdown__menu_open');
  });

  $dropdownButtons.forEach(($dropdownButton) => {
    if (
      $dropdownButton === $currentDropdownButton &&
      !$dropdownButton.classList.contains('dropdown__button_active')
    ) {
      $dropdownButton.setAttribute('aria-expanded', 'true');
      $dropdownButton.classList.add('dropdown__button_active');

      return;
    }

    $dropdownButton.setAttribute('aria-expanded', 'false');
    $dropdownButton.classList.remove('dropdown__button_active');
  });
}

function closeDropdownMenu(event: MediaQueryListEvent): void {
  if (event.matches) {
    return;
  }

  $dropdownButtons.forEach(($dropdownButton) => {
    if ($dropdownButton.classList.contains('dropdown__button_active')) {
      $dropdownButton.click();
    }
  });
}

$dropdownButtons.forEach(($dropdownButton) => {
  $dropdownButton.addEventListener('click', dropdownButtonClickHandler);
});

window
  .matchMedia('(min-width: 1024px)')
  .addEventListener('change', closeDropdownMenu);

// menu

const $menuButton = $header.querySelector<HTMLButtonElement>(
  '.header__menu-button'
) as HTMLButtonElement;
const $menu = $header.querySelector<HTMLDivElement>('.menu') as HTMLDivElement;
if (
  !($menuButton instanceof HTMLButtonElement) ||
  !($menu instanceof HTMLDivElement)
) {
  throw new Error('Menu not found');
}

function menuButtonClickHandler(event: MouseEvent): void {
  event.preventDefault();

  if ($menuButton.classList.contains('header__menu-button_active')) {
    $menuButton.setAttribute('aria-expanded', 'false');
    $menuButton.classList.remove('header__menu-button_active');

    $menu.classList.remove('menu_open');

    return;
  }

  $menuButton.setAttribute('aria-expanded', 'true');
  $menuButton.classList.add('header__menu-button_active');

  $menu.classList.add('menu_open');
}

function closeMenu(event: MediaQueryListEvent): void {
  if (!event.matches) {
    return;
  }

  if ($menuButton.classList.contains('header__menu-button_active')) {
    $menuButton.click();
  }
}

$menuButton.addEventListener('click', menuButtonClickHandler);

window.matchMedia('(min-width: 1024px)').addEventListener('change', closeMenu);

// accordion

const $accordionButtons = Array.from(
  $header.querySelectorAll<HTMLButtonElement>('.menu__accordion-button')
);
const $accordionSpoilers = Array.from(
  $header.querySelectorAll<HTMLDivElement>('.menu__accordion-spoiler')
);

function accordionButtonClickHandler(event: MouseEvent): void {
  event.preventDefault();

  const $currentAccordionButton =
    event.target as typeof $accordionButtons[0] & {
      dataset: { spoiler: string | undefined };
    };
  if ($currentAccordionButton.dataset.spoiler === undefined) {
    return;
  }

  const $currentAccordionSpoiler = $header.querySelector<
    typeof $accordionSpoilers[0]
  >($currentAccordionButton.dataset.spoiler);
  if ($currentAccordionSpoiler === null) {
    return;
  }

  $accordionSpoilers.forEach(($accordionSpoiler) => {
    if (
      $accordionSpoiler === $currentAccordionSpoiler &&
      !$accordionSpoiler.classList.contains('menu__accordion-spoiler_open')
    ) {
      $accordionSpoiler.setAttribute('aria-hidden', 'false');
      $accordionSpoiler.classList.add('menu__accordion-spoiler_open');
      $accordionSpoiler.style.maxHeight = `${$accordionSpoiler.scrollHeight}px`;
      return;
    }

    $accordionSpoiler.setAttribute('aria-hidden', 'true');
    $accordionSpoiler.classList.remove('menu__accordion-spoiler_open');
    $accordionSpoiler.style.maxHeight = '';
  });

  $accordionButtons.forEach(($accordionButton) => {
    if (
      $accordionButton === $currentAccordionButton &&
      !$accordionButton.classList.contains(
        'menu__accordion-button_accordion-spoiler-open'
      )
    ) {
      $accordionButton.setAttribute('aria-expanded', 'true');
      $accordionButton.classList.add(
        'menu__accordion-button_accordion-spoiler-open'
      );
      $accordionButton.nextElementSibling?.classList?.add(
        'menu__accordion-icon_accordion-spoiler-open'
      );
      return;
    }

    $accordionButton.setAttribute('aria-expanded', 'false');
    $accordionButton.classList.remove(
      'menu__accordion-button_accordion-spoiler-open'
    );
    $accordionButton.nextElementSibling?.classList?.remove(
      'menu__accordion-icon_accordion-spoiler-open'
    );
  });
}

function closeAccordion(event: MediaQueryListEvent): void {
  if (!event.matches) {
    return;
  }

  $accordionButtons.forEach(($accordionButton) => {
    if (
      $accordionButton.classList.contains(
        'menu__accordion-button_accordion-spoiler-open'
      )
    ) {
      $accordionButton.click();
    }
  });
}

$accordionButtons.forEach(($accordionButton) => {
  $accordionButton.addEventListener('click', accordionButtonClickHandler);
});

window
  .matchMedia('(min-width: 1024px)')
  .addEventListener('change', closeAccordion);
