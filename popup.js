import { formatChineseCompanyName, copyToClipboard } from './utils.js';
copyToClipboard('Hi');
// adding a new company row to the popup
const addNewCompany = () => {

};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "COMPANY_DATA") {
      const companies = message.data;
  
      // Example: display in popup
      const container = document.getElementById("companyList");
      container.innerHTML = ""; // Clear old
  
      companies.forEach(company => {
        const item = document.createElement("div");
        item.innerHTML = `
            <div class="company">
                <span class="company-name" data-name="${company.name}">${company.name}</span>
                ${company.url?
                  `
<<<<<<< HEAD
                    <a class="button" href="${company.url}" target="_blank" data-url="${company.url}">
=======
                    <a class="visit-profile" href="${company.url}" target="_blank" data-url="${company.url}">
>>>>>>> 44a26c10f645d6866cfc4bb3022e866f847d3b74
                      <i class="ph ph-arrow-square-out"></i>
                    </a>
                  `
                  :
                  `
<<<<<<< HEAD
                    <a class="button" href="${company.url}" target="_blank" data-url="${company.url}">
=======
                    <a class="visit-profile" href="${company.url}" target="_blank" data-url="${company.url}">
>>>>>>> 44a26c10f645d6866cfc4bb3022e866f847d3b74
                      <i class="ph ph-highlighter"></i>
                    </a>
                  `
                }
            </div>
        `;
        container.appendChild(item);
      });
<<<<<<< HEAD

      document.querySelectorAll(".company-name").forEach(span => {
        span.addEventListener("click", () => {
          if (!span.classList.contains("visited")) {
            span.classList.add("visited");
          }
=======
      document.querySelectorAll(".company-name").forEach(span => {
        span.addEventListener("click", () => {
>>>>>>> 44a26c10f645d6866cfc4bb3022e866f847d3b74
          const name = span.getAttribute("data-name");
          copyToClipboard(formatChineseCompanyName(name));
        });
      });
<<<<<<< HEAD

      document.querySelectorAll(".visit-profile").forEach(button => {
        button.addEventListener("click", () => {
          const relativeUrl = button.getAttribute("data-url");

          chrome.tabs.create({
            url: chrome.runtime.getURL(relativeUrl)
          });
        });
      });
      
    } else if (message.type === "COMPANY_PROFILE") {
      const url = new URL(window.location.href);
      const isAssessmentPage =
        url.pathname.includes("company_profile.html") &&
        url.searchParams.get("subpage") === "onsite";

      if (!isAssessmentPage) return;
      highlightInfo();
    }
});


document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("listButton").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tab?.id) {
      chrome.tabs.sendMessage(tab.id, {
        type: "LIST",
      });
    } else {
      console.error("No active tab found.");
=======
    }
});

document.querySelectorAll(".visit-profile").forEach(button => {
    button.addEventListener("click", () => {
      const relativeUrl = button.getAttribute("data-url");

      chrome.tabs.create({
        url: chrome.runtime.getURL(relativeUrl)
      });
    });
});

document.querySelector("#sidebar").addEventListener("click", () => {
  
})

document.querySelectorAll('.dropdown').forEach(drop => {
  drop.addEventListener('click', () => {
    const menu = drop.querySelector('.nav-show');
    const isVisible = menu.style.display === 'block';
    // Close all dropdowns
    document.querySelectorAll('.nav-show').forEach(m => m.style.display = 'none');
    // Toggle this one
    menu.style.display = isVisible ? 'none' : 'block';
  });

  // Optional: Close on click outside
  document.addEventListener('click', (e) => {
    if (!drop.contains(e.target)) {
      drop.querySelector('.nav-show').style.display = 'none';
>>>>>>> 44a26c10f645d6866cfc4bb3022e866f847d3b74
    }
  });
});

<<<<<<< HEAD
=======


const onPlay = e => {};

const onDelete = e => {};

const setBookmarkAttributes =  () => {};

>>>>>>> 44a26c10f645d6866cfc4bb3022e866f847d3b74
document.addEventListener("DOMContentLoaded", () => {});
