document.addEventListener("DOMContentLoaded", () => {
  // Najnowsze artykuły
  const tabsContainer = document.querySelector(".articlesTabs");
  const tabs = document.querySelectorAll(".articlesTabsItem");
  const articlesGrid = document.querySelector(".articlesGrid");

  if (tabsContainer && tabs.length && articlesGrid) {
    const baseContent = articlesGrid.innerHTML;

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Removed active class from all tabs
        tabs.forEach((t) => t.classList.remove("articlesTabsItemActive"));

        // Added active class to clicked tab
        tab.classList.add("articlesTabsItemActive");

        // All tabs show the same content
        articlesGrid.innerHTML = baseContent;
      });
    });
  }
});
