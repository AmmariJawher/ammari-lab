let currentUrl = "";
let currentVideoBookmarks = [];
<<<<<<< HEAD
console.log("Hey Jawher", window.location);


chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value } = obj;    
    
    if (type === "NEW") {
        if (isOnAlibabaAssessmentPage()) {            
            highlightInfo()
        }
    }
    if (type === "LIST") {
        if (window.location.hostname.includes("alibaba.com")) {
            listAlibabaSuppliers();
        } else if (window.location.hostname.includes("globalsources.com")) {
            listGlobalSourcesSuppliers();
        } else if (window.location.hostname.includes("made-in-china.com")) {
            listMadeInChinaSuppliers();
        }
    }
});

=======
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
>>>>>>> 44a26c10f645d6866cfc4bb3022e866f847d3b74

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
<<<<<<< HEAD
            const baseUrl = new URL(link.href).origin;
            return {
                name: link.innerText.trim() || "N/A",
                url: `${baseUrl}/company_profile.html?subpage=onsite`,
            };
=======
        return {
            name: link.innerText.trim() || "N/A",
            url: new URL(link.href).origin,
        };
>>>>>>> 44a26c10f645d6866cfc4bb3022e866f847d3b74
    });

    chrome.runtime.sendMessage({ type: "COMPANY_DATA", data: suppliers });
    console.log(suppliers);
}

<<<<<<< HEAD
function isOnAlibabaAssessmentPage() {
    const url = new URL(window.location.href);
    return url.hostname.includes("alibaba.com") &&
        url.pathname === "/company_profile.html" &&
        url.searchParams.get("subpage") === "onsite";
}

const highlightInfo = () => {
    const highlightStyle = "background-color: #e6f1fe; cursor: pointer; border-radius: .25rem; color: #006FEE; padding: .15rem .3rem;";

    // Highlight Company Name 
    const companyNameLi = [...document.querySelectorAll(".bl-info li")]
        .find(li => li.textContent.includes("Company Name"));

    if (companyNameLi) {
        const nameMatch = companyNameLi.textContent.split(":")[1]?.trim();
        if (nameMatch) {
        const span = document.createElement("span");
        span.textContent = nameMatch;
        span.style = highlightStyle;

        span.onclick = () => {
            console.log(nameMatch);
        };

        // Replace plain text with the link
        companyNameLi.innerHTML = `<span>Company Name</span> : `;
        companyNameLi.appendChild(span);
        }
    }

    // Highlight email
    const emailDd = [...document.querySelectorAll("dl.v-info dd")]
        .find(dd => /^[\w.-]+@[\w.-]+\.\w+$/.test(dd.textContent.trim()));

    if (emailDd) {
        const email = emailDd.textContent.trim();
        const span = document.createElement("span");
        span.textContent = email;
        span.style = highlightStyle;

        span.onclick = () => {
            console.log(email);
        };

        emailDd.innerHTML = "";
        emailDd.appendChild(span);
    }

    // Highlight phone
    const phoneDd = [...document.querySelectorAll("dl.v-info dd")]
        .find(dd => /^\d{7,}$/.test(dd.textContent.trim())); // simple phone pattern
    
    if (phoneDd) {
        const phone = phoneDd.textContent.trim();
        const span = document.createElement("span");
        span.textContent = phone;
        span.style = highlightStyle;

        span.onclick = () => {
            console.log(phone);
        };

        phoneDd.innerHTML = "";
        phoneDd.appendChild(span);
    }
}
=======
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
>>>>>>> 44a26c10f645d6866cfc4bb3022e866f847d3b74
