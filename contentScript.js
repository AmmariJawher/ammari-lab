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
    } else if (type === "PRODUCT") {
        const company = document.querySelector(".company-name a")
        highlightText(company, () => redirect(company))
    } else if (type === "SEARCH") {
        const companies = document.querySelectorAll('a.search-card-e-company')
        companies.forEach((company) => {
            highlightText(company, () => redirect(company))
        })
    }
});


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
            const baseUrl = new URL(link.href).origin;
            return {
                name: link.innerText.trim() || "N/A",
                url: `${baseUrl}/company_profile.html?subpage=onsite`,
            };
    });

    chrome.runtime.sendMessage({ type: "COMPANY_DATA", data: suppliers });
}

function isOnAlibabaAssessmentPage() {
    const url = new URL(window.location.href);
    return url.hostname.includes("alibaba.com") &&
        url.pathname === "/company_profile.html" &&
        url.searchParams.get("subpage") === "onsite";
}

function formatChineseCompanyName(name) {
    if (!name || typeof name !== "string") return "";
  
    // Define common suffixes to remove
    const suffixes = [
      "Co., Ltd.",
      "Company Limited",
      "Limited",
      "Co., Limited",
      "Co., Ltd",
      "Co. Ltd.",
      "Co. Ltd",
      "Ltd.",
      "Inc.",
      "Inc"
    ];

      const prefixes = [
    // Provinces
    "Anhui", "Fujian", "Gansu", "Guangdong", "Guizhou", "Hainan",
    "Hebei", "Heilongjiang", "Henan", "Hubei", "Hunan",
    "Jiangsu", "Jiangxi", "Jilin", "Liaoning", "Qinghai",
    "Shaanxi", "Shandong", "Shanxi", "Sichuan", "Yunnan", "Zhejiang",
    "Beijing", "Shanghai", "Tianjin", "Chongqing", "Quanzhou",

    // Major cities
    "Guangzhou", "Shenzhen", "Ningbo", "Yiwu", "Jinan", "Zhengzhou",
    "Changzhou", "Wuxi", "Suzhou", "Wuhan", "Yangzhou", "Yangjiang",
    "Xiamen", "Qingdao", "Dongguan", "Foshan", "Zhongshan", "Shantou",
    "Chengdu", "Nanchang", "Changsha", "Nanning", "Nantong", "Nanyang",
    "Yongkang", "Linyi", "Wanglai", "Jining", "Jinjiang"
  ];

  
    // Trim and clean input
    let cleaned = name.trim();

    // Remove known suffixes
    for (const suffix of suffixes) {
      if (cleaned.endsWith(suffix)) {
        cleaned = cleaned.slice(0, -suffix.length).trim();
        break;
      }
    }

    // Remove prefix (only if it's the first word)
    for (const prefix of prefixes) {
      if (cleaned.startsWith(prefix + " ")) {
        cleaned = cleaned.slice(prefix.length).trim();
        break;
      }
    }
  
    // Remove remaining punctuation and split into words
    const words = cleaned.replace(/[.,]/g, "").split(/\s+/);
  
    return "%" + words.join("%") + "%";
}

function formatCompanyPhoneNumber(numStr) {
  if (!numStr || typeof numStr !== "string") return "";

  let result = [];
  let i = 0;

  // If the length is odd, take the first digit separately
  if (numStr.length % 2 !== 0) {
    result.push(numStr[0]);
    i = 1;
  }

  // Group the rest into chunks of 2 digits
  for (; i < numStr.length; i += 2) {
    result.push(numStr.slice(i, i + 2));
  }

  return "%" + result.join("%") + "%";
}

function formatCompanyEmail(email) {
    console.log(email);
    
  if (!email || typeof email !== "string") return "";

  const parts = email.split("@");
  if (parts.length !== 2) return "";

  const local = parts[0].toLowerCase();
  const domain = parts[1];

  const genericLocals = [
    "sales", "info", "contact", "support",
    "admin", "office", "service", "hello",
    "hi", "enquiry", "inquiry", "customerservice", "mail"
  ];

  // If the local part is generic, skip formatting
  if (genericLocals.includes(local)) return `%@${domain}%`;
  ;

  return `%${local}%@${domain}%`;
}

function copyToClipboard(content) {
  if (!navigator.clipboard){
    // Create a temporary textarea
    const textarea = document.createElement("textarea");
    textarea.value = formatted;
    document.body.appendChild(textarea);

    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    console.log("Copied (fallback):", formatted);
  } else{
    navigator.clipboard.writeText(content)
    .then(() => {
        console.log("Copied to clipboard:", content);
    })
    .catch(err => {
        console.error("Failed to copy:", err);
    });
  }
}

const highlightInfo = () => {
    // Highlight Company Name 
    const companyNameLi = [...document.querySelectorAll(".bl-info li")]
        .find(li => li.textContent.includes("Company Name"));
        
    if (companyNameLi) {
        const name = companyNameLi.textContent.split(":")[1]?.trim();

        if (name) {
            let tempSpan = document.createElement("span");
            tempSpan.textContent = name;
            // Clear and rebuild the list item
            companyNameLi.innerHTML = `<span>Company Name</span> : `;

            highlightText(tempSpan, () => {
                copyToClipboard(formatChineseCompanyName(name));
            });

            companyNameLi.appendChild(tempSpan); // append the styled span
        }
    }

    // Highlight Email
    const emailDd = [...document.querySelectorAll("dl.v-info dd")]
        .find(dd => /^[\w.-]+@[\w.-]+\.\w+$/.test(dd.textContent.trim()));
    if (emailDd) {
        let tempSpan = document.createElement("span");
        tempSpan.textContent = emailDd.textContent.trim();
        console.log(tempSpan);

        highlightText(tempSpan, () => {
            copyToClipboard(formatCompanyEmail(tempSpan.textContent.trim()));
        });
        emailDd.replaceChildren(tempSpan);
    }

    // Highlight Phone
    const phoneDd = [...document.querySelectorAll("dl.v-info dd")]
        .find(dd => /^\d{7,}$/.test(dd.textContent.trim()));
    if (phoneDd) {
        let tempSpan = document.createElement("span");
        tempSpan.textContent = phoneDd.textContent.trim();

        highlightText(tempSpan, () => {
            copyToClipboard(formatCompanyPhoneNumber(tempSpan.textContent.trim()));
        });
        phoneDd.replaceChildren(tempSpan);
    }
};





const highlightText = (element, onClick) => {
    const highlightStyle = "background-color: #e6f1fe; text-decoration-line: none; cursor: pointer; border-radius: .25rem; color: #006FEE; padding: .15rem .3rem;";
    
    element.style = highlightStyle;

    if (element.tagName === 'A') {
        element.rel = 'noopener noreferrer';
    }

    if (onClick) element.onclick = onClick;
    console.log(element);
    
};

const redirect = (element) => {
    const baseUrl = new URL(element.href).origin;
    location.href = `${baseUrl}/company_profile.html?subpage=onsite`;
}