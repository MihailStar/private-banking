const $tabs = Array.from(
  document.querySelectorAll<HTMLButtonElement>('.tables-tablist__tab')
);
const $tabpanels = Array.from(
  document.querySelectorAll<HTMLElement>('.tables__column')
);

function tabClickHandler(event: MouseEvent): void {
  event.preventDefault();

  const $currentTab = event.currentTarget as typeof $tabs[0] & {
    dataset: { tabpanel: string | undefined };
  };
  if ($currentTab.dataset.tabpanel === undefined) {
    return;
  }

  const $currentTabpanel = document.querySelector<typeof $tabpanels[0]>(
    $currentTab.dataset.tabpanel
  );
  if ($currentTabpanel === null) {
    return;
  }

  $tabpanels.forEach(($tabpanel) => {
    $tabpanel.classList.remove('tables-tabpanel_open');
  });
  $currentTabpanel.classList.add('tables-tabpanel_open');

  $tabs.forEach(($tab) => {
    $tab.classList.remove('tables-tablist__tab_active');
    $tab.setAttribute('aria-selected', 'false');
  });
  $currentTab.classList.add('tables-tablist__tab_active');
  $currentTab.setAttribute('aria-selected', 'true');
}

function initialize(): void {
  $tabpanels.forEach(($tabpanel, index) => {
    if ($tabs[index]?.classList.contains('tables-tablist__tab_active')) {
      $tabpanel.classList.add('tables-tabpanel', 'tables-tabpanel_open');
    } else {
      $tabpanel.classList.add('tables-tabpanel');
    }
    $tabpanel.setAttribute('id', `tables-tabpanel-${index + 1}`);
    $tabpanel.setAttribute('role', 'tabpanel');
    $tabpanel.setAttribute('aria-labelledby', `tables-tab-${index + 1}`);
  });

  $tabs.forEach(($tab) => {
    $tab.addEventListener('click', tabClickHandler);
  });
}

function destroy(): void {
  $tabs[0]?.click();

  $tabpanels.forEach(($tabpanel) => {
    $tabpanel.classList.remove('tables-tabpanel', 'tables-tabpanel_open');
    $tabpanel.removeAttribute('id');
    $tabpanel.removeAttribute('role');
    $tabpanel.removeAttribute('aria-labelledby');
  });

  $tabs.forEach(($tab) => {
    $tab.removeEventListener('click', tabClickHandler);
  });
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
