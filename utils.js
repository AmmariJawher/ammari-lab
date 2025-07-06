<<<<<<< HEAD
export function formatChineseCompanyName(name) {
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

export function formatCompanyPhoneNumber(number) {
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

export function formatCompanyEmail(number) {
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
  if (genericLocals.includes(local)) return "";

  return `%${local}%@${domain}%`;
}

export function copyToClipboard(content) {
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
=======
export function formatChineseCompanyName(name) {
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
  
    // Remove known suffixes
    let cleaned = name.trim();
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

export function copyToClipboard(content) {
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
>>>>>>> 44a26c10f645d6866cfc4bb3022e866f847d3b74
}