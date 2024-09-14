const getElements = () => {
  return (
    JSON.parse(localStorage.getItem("elements")) || [
      {
        id: "logo",
        selector: "//ytd-topbar-logo-renderer",
        hidden: undefined,
        category: "General",
      },
      {
        id: "microphone-search",
        selector: "//*[@id='voice-search-button']",
        hidden: undefined,
        category: "General",
      },
      {
        id: "create",
        selector: "(//ytd-topbar-menu-button-renderer)[1]",
        hidden: undefined,
        category: "General",
      },
      {
        id: "notifications",
        selector: "//ytd-notification-topbar-button-renderer",
        hidden: undefined,
        category: "General",
      },
      {
        id: "home",
        selector:
          "((//ytd-guide-section-renderer)[1]//ytd-guide-entry-renderer)[1] | (//ytd-mini-guide-entry-renderer)[1]",
        hidden: undefined,
        category: "Sidebar",
      },
      {
        id: "shorts",
        selector:
          "((//ytd-guide-section-renderer)[1]//ytd-guide-entry-renderer)[2] | (//ytd-mini-guide-entry-renderer)[2]",
        hidden: undefined,
        category: "Sidebar",
      },
      {
        id: "subscriptions",
        selector:
          "((//ytd-guide-section-renderer)[1]//ytd-guide-entry-renderer)[3] | (//ytd-mini-guide-entry-renderer)[3]",
        hidden: undefined,
        category: "Sidebar",
      },
      {
        id: "my-channel",
        selector:
          "((//ytd-guide-section-renderer)[1]//ytd-guide-entry-renderer)[5]",
        hidden: undefined,
        category: "Sidebar",
      },
      {
        id: "history",
        selector:
          "((//ytd-guide-section-renderer)[1]//ytd-guide-entry-renderer)[6]",
        hidden: undefined,
        category: "Sidebar",
      },
      {
        id: "playlists",
        selector:
          "((//ytd-guide-section-renderer)[1]//ytd-guide-entry-renderer)[7]",
        hidden: undefined,
        category: "Sidebar",
      },
      {
        id: "my-videos",
        selector:
          "((//ytd-guide-section-renderer)[1]//ytd-guide-entry-renderer)[8]",
        hidden: undefined,
        category: "Sidebar",
      },
      {
        id: "watch-later",
        selector:
          "((//ytd-guide-section-renderer)[1]//ytd-guide-entry-renderer)[9]",
        hidden: undefined,
        category: "Sidebar",
      },
      {
        id: "liked-videos",
        selector:
          "((//ytd-guide-section-renderer)[1]//ytd-guide-entry-renderer)[10]",
        hidden: undefined,
        category: "Sidebar",
      },
      {
        id: "my-clips",
        selector:
          "((//ytd-guide-section-renderer)[1]//ytd-guide-entry-renderer)[12]",
        hidden: undefined,
        category: "Sidebar",
      },
      {
        id: "subscriptions-panel",
        selector: "(//ytd-guide-section-renderer)[2]",
        hidden: undefined,
        category: "Sidebar",
      },
      {
        id: "explore-panel",
        selector: "(//ytd-guide-section-renderer)[3]",
        hidden: undefined,
        category: "Sidebar",
      },
      {
        id: "youtube-panel",
        selector: "(//ytd-guide-section-renderer)[4]",
        hidden: undefined,
        category: "Sidebar",
      },
      {
        id: "tabs",
        selector: "//ytd-feed-filter-chip-bar-renderer/..",
        hidden: undefined,
        category: "HomePage",
      },
      {
        id: "ads",
        selector:
          "//ytd-ad-slot-renderer/ancestor::ytd-rich-item-renderer | //*[@id='player-ads'] | //ytd-banner-promo-renderer/..",
        hidden: undefined,
        category: "HomePage",
      },
      {
        id: "subscriptions-shorts",
        selector: "//ytd-rich-shelf-renderer/../..",
        hidden: undefined,
        category: "Subscriptions",
      },
      {
        id: "subscriptions-scheduled-videos",
        selector: undefined,
        hidden: undefined,
        category: "Subscriptions",
      },
      {
        id: "video-title",
        selector: "//div[@id='above-the-fold']/div[@id='title']",
        hidden: undefined,
        category: "Video",
      },
      {
        id: "video-likes-dislikes",
        selector: "//segmented-like-dislike-button-view-model",
        hidden: undefined,
        category: "Video",
      },
      {
        id: "video-description",
        selector: "//div[@id='description-inner']/parent::div",
        hidden: undefined,
        category: "Video",
      },
      {
        id: "video-comments",
        selector: "//ytd-comments[@id='comments']",
        hidden: undefined,
        category: "Video",
      },
      {
        id: "video-categories-games",
        selector: "//ytd-rich-metadata-row-renderer/../..",
        hidden: undefined,
        category: "Video",
      },
      {
        id: "video-ads",
        selector: "//div[@id='player-ads']",
        hidden: undefined,
        category: "Video",
      },
      {
        id: "video-tabs",
        selector: "//yt-related-chip-cloud-renderer",
        hidden: undefined,
        category: "Video",
      },
      {
        id: "video-suggested-videos",
        selector:
          "//div[@id='contents']/parent::ytd-item-section-renderer[contains(@class, 'watch-next')]",
        hidden: undefined,
        category: "Video",
      },
      {
        id: "video-suggested-shorts",
        selector: undefined,
        hidden: undefined,
        category: "Video",
      },
      {
        id: "stream-chat",
        selector:
          "//div[@id='panels-full-bleed-container'] | //div[@id='chat-container']/ytd-live-chat-frame",
        hidden: undefined,
        category: "Stream",
      },
    ]
  );
};

const setElementVisibilityOnce = (id, hidden) => {
  let hasRun = false;
  return () => {
    if (!hasRun) {
      setElementVisibility(id, hidden);
      hasRun = true;
    }
  };
};

const waitForElements = (selectorToHide, callback) => {
  const checkExist = setInterval(() => {
    const elements = document.evaluate(
      selectorToHide,
      document,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null
    );

    if (elements.snapshotLength > 0) {
      clearInterval(checkExist);
      callback(elements);
    }
  }, 200);
};

function setElementVisibility(target, hide) {
  let selectorToHide;
  let elements = getElements();

  elements.forEach((element) => {
    if (element.id === target) {
      selectorToHide = element.selector;
      element.hidden = hide;
    }
  });

  let elementsToHide = document.evaluate(
    selectorToHide !== undefined && selectorToHide,
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  );

  for (let i = 0, length = elementsToHide.snapshotLength; i < length; i++) {
    elementsToHide.snapshotItem(i).style.display = hide ? "none" : "";
  }

  localStorage.setItem("elements", JSON.stringify(elements));
}

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "clearLocalStorage") {
    localStorage.clear();
    location.reload();
  } else {
    setElementVisibility(request.action.target, request.action.hide);
    chrome.runtime.sendMessage({ type: "info", data: getElements() });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const elements = JSON.parse(localStorage.getItem("elements"));

  if (elements) {
    elements.forEach((element) => {
      waitForElements(
        element.selector,
        setElementVisibilityOnce(element.id, element.hidden)
      );
    });
  }
});

window.addEventListener("resize", function () {
  const elements = JSON.parse(localStorage.getItem("elements"));

  if (elements) {
    elements.forEach((element) => {
      waitForElements(
        element.selector,
        setElementVisibilityOnce(element.id, element.hidden)
      );
    });
  }
});
