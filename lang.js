let lang = localStorage.getItem("lang") || "en";

function applyLang(text) {
  for (const id in text[lang]) {
    const el = document.getElementById(id);
    if (el) {
      el.innerText = text[lang][id];
    }
  }

  const btn = document.getElementById("langBtn");
  if (btn) {
    btn.innerText = lang === "en" ? "🌐 EN" : "🌐 BM";
  }
}

function toggleLang(text) {
  lang = lang === "en" ? "bm" : "en";
  localStorage.setItem("lang", lang);
  applyLang(text);
}
