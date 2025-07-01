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
}