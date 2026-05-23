(function () {
  function buildFooter() {
    const footer = document.querySelector('footer');
    if (!footer) return;
    footer.innerHTML =
      '<p>' +
        '<a href="mailto:t8ycollective@proton.me">mail</a>' +
        ' &nbsp;·&nbsp; ' +
        '<a href="https://mastodon.social/@t8y" target="_blank" rel="noopener noreferrer">@t8y on Mastodon</a>' +
        ' &nbsp;·&nbsp; ' +
        '<a href="https://www.linkedin.com/company/t8y/" target="_blank" rel="noopener noreferrer">LinkedIn</a>' +
        ' &nbsp;·&nbsp; ' +
        '<a href="/shop/terms/">Terms and Conditions</a>' +
        ' &nbsp;·&nbsp; ' +
        '<a href="/shop/datenschutz/">Datenschutz</a>' +
        ' &nbsp;·&nbsp; ' +
        '<span class="footer-newsletter-wrap">' +
          '<span data-translate="join-newsletter">join our newsletter</span>' +
          '&nbsp;<input class="footer-nl-email" type="email" placeholder="email" autocomplete="email">' +
          '&nbsp;<button class="footer-nl-btn" onclick="subscribeFooterNewsletter(event,this)" data-translate="subscribe">subscribe</button>' +
          '<span class="footer-newsletter-msg" style="display:none"></span>' +
        '</span>' +
      '</p>';
    if (typeof translatePage === 'function') translatePage();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildFooter);
  } else {
    buildFooter();
  }
})();
