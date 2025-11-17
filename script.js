// Najnowsze artykuły

document.addEventListener("DOMContentLoaded", () => {
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

// script.js - Part 3
document.addEventListener("DOMContentLoaded", () => {
  // 1. "Najnowsze artykuły" – accessible tabs with keyboard support
  const tabsContainer = document.querySelector(".articlesTabs");
  const tabs = document.querySelectorAll(".articlesTabsItem");
  const articlesGrid = document.querySelector(".articlesGrid");

  if (tabsContainer && tabs.length && articlesGrid) {
    tabsContainer.setAttribute("role", "tablist");
    articlesGrid.setAttribute("role", "tabpanel");

    const tabsArray = Array.from(tabs);
    const baseContent = articlesGrid.innerHTML;
    const tabContents = tabsArray.map(() => baseContent);

    tabsArray.forEach((tab, index) => {
      const tabId = `articles-tab-${index}`;
      tab.id = tab.id || tabId;
      tab.setAttribute("role", "tab");

      if (index === 0) {
        tab.classList.add("articlesTabsItemActive");
        tab.setAttribute("aria-selected", "true");
        tab.setAttribute("tabindex", "0");
        articlesGrid.setAttribute("aria-labelledby", tab.id);
      } else {
        tab.setAttribute("aria-selected", "false");
        tab.setAttribute("tabindex", "-1");
      }

      tab.addEventListener("click", () => {
        tabsArray.forEach((t) => {
          t.classList.remove("articlesTabsItemActive");
          t.setAttribute("aria-selected", "false");
          t.setAttribute("tabindex", "-1");
        });

        tab.classList.add("articlesTabsItemActive");
        tab.setAttribute("aria-selected", "true");
        tab.setAttribute("tabindex", "0");

        const newContent = tabContents[index] || baseContent;
        articlesGrid.innerHTML = newContent;
        articlesGrid.setAttribute("aria-labelledby", tab.id);
      });

      tab.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          const direction = event.key === "ArrowRight" ? 1 : -1;
          let newIndex = index + direction;

          if (newIndex < 0) newIndex = tabsArray.length - 1;
          if (newIndex >= tabsArray.length) newIndex = 0;

          tabsArray[newIndex].focus();
          tabsArray[newIndex].click();
        }
      });
    });
  }
});
