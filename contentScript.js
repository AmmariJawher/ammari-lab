let currentUrl = "";
let currentVideoBookmarks = [];
console.log("Hey Jawher", window.location.hostname);



chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value, baseUrl } = obj;
    
    if (type === "NEW") {
        currentUrl = baseUrl;
        newCompanyFound();
    }
    if (type === "LIST") {
        // if (baseUrl.includes("alibaba.com")) {
        //     console.log("Hey Jawher", "Run alibaba");
        //     listAlibabaCompanies();
        // } else if (baseUrl.includes("globalsources.com")) {
        //     listGlobalSourcesCompanies();
        // }
    }
    if (type === "COPY") {
    }
});

const CompanyFound = () => {
    const companyName = document.getElementsByClassName("cp-name")[0];
    console.log(companyName);
    
    if (companyName) {
        companyName.addEventListener("click", () => {
            const name = formatChineseCompanyName(companyName.textContent);

            navigator.clipboard.writeText(name)
            .then(() => {
                console.log("Copied to clipboard:", name);
            })
            .catch(err => {
                console.error("Failed to copy:", err);
            });
        });
    }
}

const listGlobalSourcesSuppliers = () => {
    const supplierLinks = document.querySelectorAll('div.link-el');
    
    const suppliers = Array.from(supplierLinks).map(link => {
        return {
            name: link.innerText.trim() || "N/A",
            url: false,
            element: link,
        };
    });

    chrome.runtime.sendMessage({ type: "COMPANY_DATA", data: suppliers });
    console.log(suppliers);
}

function listMadeInChinaSuppliers() {
    const supplierLinks = document.querySelectorAll('a.compnay-name');
  
    const suppliers = Array.from(supplierLinks).map(link => {
        return {
            name: link.innerText.trim() || "N/A",
            url: link.href.startsWith("http") ? link.href : "https:" + link.getAttribute("href"),
        };  
    });
  
    chrome.runtime.sendMessage({ type: "COMPANY_DATA", data: suppliers });
    console.log(suppliers);
}
  

function highlightElement(target) {
    if (!target) return;
  
    // Apply highlight style
    target.style.backgroundColor = "ytargetlow";
    target.style.padding = "2px 4px";
    target.style.borderRadius = "3px";
  
    // Smooth scroll into view
    target.scrollIntoView({ behavior: "smooth", block: "center" });
}

const listAlibabaSuppliers = () => {
    const supplierLinks = document.querySelectorAll('a.search-card-e-company');
    const suppliers = Array.from(supplierLinks).map(link => {
        return {
            name: link.innerText.trim() || "N/A",
            url: new URL(link.href).origin,
        };
    });

    chrome.runtime.sendMessage({ type: "COMPANY_DATA", data: suppliers });
    console.log(suppliers);
}

if (window.location.hostname.includes("alibaba.com")) {
    console.log("Hey Jawher", "Run alibaba");
    listAlibabaSuppliers();
} else if (window.location.hostname.includes("globalsources.com")) {
    listGlobalSourcesSuppliers();
} else if (window.location.hostname.includes("made-in-china.com")) {
    listMadeInChinaSuppliers();
}

const formatChineseCompanyName = (companyName) => {
    if (!companyName || typeof companyName !== "string") return "";
  
    // Define common suffixes to remove
    const suffixes = [
      "Co., Ltd.",
      "Company Limited",
      "Limited",
      "Co., Ltd",
      "Co. Ltd.",
      "Co. Ltd",
      "Inc.",
      "Inc"
    ];
  
    // Remove known suffixes
    let cleaned = companyName.trim();
    for (const suffix of suffixes) {
      if (cleaned.endsWith(suffix)) {
        cleaned = cleaned.slice(0, -suffix.length).trim();
        break;
      }
    }
  
    // Remove remaining punctuation and split into words
    const words = cleaned.replace(/[.,]/g, "").split(/\s+/);
  
    return "%" + words.join("%") + "%";
}
