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
                    <a class="button" href="${company.url}" target="_blank" data-url="${company.url}">
                      <i class="ph ph-arrow-square-out"></i>
                    </a>
                  `
                  :
                  `
                    <a class="button" href="${company.url}" target="_blank" data-url="${company.url}">
                      <i class="ph ph-highlighter"></i>
                    </a>
                  `
                }
            </div>
        `;
        container.appendChild(item);
      });

      document.querySelectorAll(".company-name").forEach(span => {
        span.addEventListener("click", () => {
          if (!span.classList.contains("visited")) {
            span.classList.add("visited");
          }
          const name = span.getAttribute("data-name");
          copyToClipboard(formatChineseCompanyName(name));
        });
      });

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
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {});
