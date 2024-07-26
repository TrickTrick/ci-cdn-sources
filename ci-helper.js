function saveVia() {
  let params = new URL(document.location.toString()).searchParams;
  let affiliateName = params.get("via");
  if (affiliateName) {
    sessionStorage.setItem("affiliateName", affiliateName);
  }
}

function changePortalUrl(el, code) {
  if (!el) {
    return;
  }
  const loginUrl = new URL(el.href);
  loginUrl.searchParams.append("via", code);
  el.href = loginUrl.toString();
  el.setAttribute("href", loginUrl.toString());
}

function changeAurhUrl(el, code) {
  if (!el) {
    return;
  }
  const btnUrl = new URL(el.href);
  const redirect = btnUrl.searchParams.get("redirect_uri");
  const redirect_uri = new URL(decodeURI(redirect.toString()));
  redirect_uri.searchParams.append("via", code);
  btnUrl.searchParams.set("redirect_uri", redirect_uri.toString());
  el.href = btnUrl.toString();
  el.setAttribute("href", btnUrl.toString());
}

document.addEventListener(
  "DOMContentLoaded",
  function () {
    saveVia();

    const affName = sessionStorage.getItem("affiliateName");
    if (affName) {
      document
        .querySelectorAll('[data-cta="login"]')
        .forEach((v) => changePortalUrl(v, affName));
      document
        .querySelectorAll('[data-cta="signup"]')
        .forEach((v) => changeAurhUrl(v, affName));
    }
  },
  false
);
