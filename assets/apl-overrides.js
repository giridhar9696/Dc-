document.addEventListener('DOMContentLoaded', () => {
  if (!document.querySelector('link[href^="/assets/apl-ui.css"]')) {
    const uiStyles = document.createElement('link');
    uiStyles.rel = 'stylesheet';
    uiStyles.href = '/assets/apl-ui.css?v=3';
    document.head.append(uiStyles);
  }

  document.querySelectorAll('.header-dropdown-link[href="/insights.html"], .header-link[href="/insights.html"]').forEach((link) => link.closest('.header-dropdown-link, .header-link-wrap')?.remove());
  document.querySelector('.header-menu-toggle-wrap')?.setAttribute('hidden', '');
  document.querySelector('.header-dropdown')?.setAttribute('hidden', '');
  if (!location.pathname.endsWith('/index.html') && location.pathname !== '/' && !document.querySelector('.apl-glass-nav')) {
    document.body.insertAdjacentHTML('afterbegin', `<nav class="apl-glass-nav" aria-label="Primary navigation"><a href="/about.html">About</a><a href="/services.html">Services</a><a href="/industries.html">Industries</a><a href="/careers.html">Careers</a><a href="/contact.html">Contact</a><a href="https://www.apl.com/local-offices">Find your local office</a><a href="https://www.apl.com/about/the-group">The CMA CGM Group</a></nav>`);
  }

  const blueContainers = '/assets/apl-blue-containers.png';

  if (location.pathname.endsWith('/about.html') || location.pathname.endsWith('/about')) {
    document.querySelector('.about-hero-label')?.remove();
    const heroTitle = document.querySelector('.about-hero-title h1');
    if (heroTitle) heroTitle.textContent = 'APL: A trusted partner to the U.S. Government for ocean transportation';
    const heroDesc = document.querySelector('.about-hero-desc .txt');
    if (heroDesc) heroDesc.textContent = 'APL proudly supports our U.S. Flag ocean vessel fleet. We provide container transportation through our international shipping network which combines high-quality intermodal operations with advanced technology, equipment and e-commerce.';
    const story = document.querySelector('.about-intro-desc-1 .txt');
    if (story) story.innerHTML = `For more than 175 years, American President Lines, LLC, has been a trusted partner to the U.S. Government and its military for ocean transportation and in-country logistics. We offer secure and efficient services to key foreign military locations. These include five U.S. Flag services linking North America to Asia and Europe and feeder routes within the Middle East.<br/><br/>Our fleet of commercial vessels with military utility that are owned and operated by U.S. citizens provides the reliable support that is necessary for national defense. A pool of trained U.S. mariners also crews APL’s U.S. flagged fleet.<br/><br/>Supported by a dedicated team of professionals based in Arlington, Virginia; Nashville, Tennessee; Long Beach, California; Newport Beach, California; Guam; Dubai, UAE; Yokohama, Japan; and Antwerp, Belgium, we deliver specialized solutions for the shipment of U.S. Flag Preference and Project Cargoes. American President Lines, LLC prides itself on being the mission critical link for many U.S. Government efforts worldwide.<br/><br/>- Comprehensive offering of linehaul and feeder connections provides a full range of services<br/>- Intermodal network linking U.S. East Coast, U.S. West Coast and U.S. Gulf to inland locations ensures extensive coverage throughout North America<br/>- Priority berthing at key ports means your cargo reaches its destination faster. Priority II service may be upgraded to Priority I, subject to inducement<br/><br/>APL is part of the CMA CGM Group, a global leader in sea, land, air and logistics solutions, founded in 1978 by the late Jacques R. Saadé. CMA CGM Group is now led by Rodolphe Saadé. Its 620 vessels serve more than 420 ports worldwide. CMA CGM is constantly innovating to offer customers new maritime, inland and logistics solutions. Headquartered in Marseille, France, the Group has more than 180,000 employees globally through its network of 400 offices and 750 warehouses, present in 160 countries.`;
    const aboutImage = document.querySelector('.about-intro-gallery-img-inner img');
    if (aboutImage) {
      aboutImage.src = blueContainers;
      aboutImage.removeAttribute('srcset');
    }
    document.querySelector('.about-team-wrap')?.setAttribute('hidden', '');
    if (!document.querySelector('.apl-offices-section')) {
      document.querySelector('.about-intro-wrap')?.insertAdjacentHTML('afterend', `<section id="find-your-local-office" class="apl-offices-section"><div class="apl-offices-inner"><div class="apl-offices-kicker">Global presence</div><h2>Find your local offices</h2><p>Explore APL’s official office network by country, region, or city.</p><div class="apl-offices-frame"><iframe title="APL local offices directory" src="https://www.apl.com/local-offices" loading="lazy"></iframe></div></div></section>`);
    }
  }

  if (location.pathname.endsWith('/industries.html') || location.pathname.endsWith('/industries')) {
    document.querySelectorAll('.industry-our-item-name h3, .industry-our-item-name .heading').forEach((heading) => {
      if (heading.textContent.trim().toUpperCase() === 'ENERGY & RENEWABLES') heading.textContent = 'FMCG & BEVERAGES';
    });
    document.querySelectorAll('.industry-our-item-body').forEach((body) => {
      if (body.textContent.includes('Renewable energy projects depend on precise coordination')) {
        const desc = body.querySelector('.industry-our-item-desc .txt');
        if (desc) desc.textContent = 'The FMCG and Beverages industry is undergoing rapid transformation, driven by evolving consumer expectations for health, sustainability, and convenience, alongside growing supply chain complexity and digital disruption. As e-commerce expands and innovation accelerates, brands face increasing pressure to adapt packaging, sourcing, and distribution models. In a highly competitive and fast-moving environment, resilience and agility are essential to stay ahead of market trends. With global reach, integrated supply chain solutions, and a strong commitment to sustainability, CMA CGM supports FMCG & Beverages brands with reliable, efficient, and future-ready logistics.';
      }
    });
    document.querySelectorAll('.footer-thumb-img img').forEach((img) => {
      img.src = blueContainers;
      img.removeAttribute('srcset');
    });
  }

  document.querySelectorAll('.header-menu-list').forEach((list) => {
    if (![...list.querySelectorAll('a')].some((link) => link.textContent.includes('Find your local office'))) {
      list.insertAdjacentHTML('beforeend', '<div data-cursor="hidden" class="header-link-wrap"><a data-link-random="" class="header-link w-inline-block" href="https://www.apl.com/local-offices"><div data-wf--text--text-styles="mono" class="txt w-variant-3648de38-311e-0b18-0c7d-747bd60ae1a8 fs-12 fs-14-mb">Find your local office</div></a></div>');
    }
  });

  document.querySelectorAll('a').forEach((link) => {
    if (link.textContent.trim().toLowerCase() === 'find your local office') link.href = 'https://www.apl.com/local-offices';
    if (link.textContent.trim().toLowerCase() === 'the cma cgm group') {
      link.href = 'https://www.apl.com/about/the-group';
      link.removeAttribute('target');
      link.removeAttribute('rel');
    }
  });

  const isHome = location.pathname === '/' || location.pathname.endsWith('/index.html');
  if (isHome) {
    const purposeLink = [...document.querySelectorAll('.home-hero-links a')].find((link) => link.textContent.trim().toLowerCase() === 'talk with us');
    if (purposeLink) {
      purposeLink.href = 'https://our-purpose.cmacgm-group.com/en';
      const purposeLabel = purposeLink.querySelector('.txt');
      if (purposeLabel) purposeLabel.textContent = 'Discover our purpose';
    }
  }
  if (isHome && !document.querySelector('.apl-quick-actions')) {
    const workButton = document.querySelector('.header-inner .header-btn:not(.hidden-dsk)');
    if (workButton) {
      const makeAction = (label, type) => {
        const control = document.createElement(type === 'link' ? 'a' : 'button');
        control.className = 'apl-quick-action w-inline-block';
        if (type === 'link') control.href = '/sign-in.html?v=3';
        else control.type = 'button';
        const visual = workButton.querySelector('.btn').cloneNode(true);
        visual.removeAttribute('data-link-random');
        visual.removeAttribute('data-is-btn');
        visual.removeAttribute('data-cursor');
        visual.querySelector('.txt').textContent = label;
        control.append(visual);
        return control;
      };
      const actions = document.createElement('div');
      actions.className = 'apl-quick-actions';
      const infoButton = makeAction('Info', 'button');
      infoButton.setAttribute('aria-haspopup', 'dialog');
      infoButton.setAttribute('popovertarget', 'apl-info-dialog');
      actions.append(infoButton, makeAction('MyAPL', 'link'));
      workButton.parentElement.append(actions);

      document.body.insertAdjacentHTML('beforeend', `
        <div class="apl-info-dialog" id="apl-info-dialog" popover role="dialog" aria-modal="true" aria-labelledby="apl-widget-title">
          <div class="apl-widget-head">
            <div class="apl-widget-brand"><img src="/assets/apl-logo.png" alt=""><span>Digital shipping desk</span></div>
            <button class="apl-widget-close" type="button" popovertarget="apl-info-dialog" popovertargetaction="hide" aria-label="Close shipment tools">×</button>
          </div>
          <div class="apl-widget-body">
            <div class="apl-widget-kicker">Move with confidence</div>
            <h2 class="apl-widget-title" id="apl-widget-title">Plan every move.</h2>
            <div class="apl-tabs" role="tablist" aria-label="Shipment tools">
              <button class="apl-tab" id="apl-tab-tracking" role="tab" aria-selected="true" aria-controls="apl-panel-tracking">Tracking</button>
              <button class="apl-tab" id="apl-tab-schedule" role="tab" aria-selected="false" aria-controls="apl-panel-schedule" tabindex="-1">Schedule</button>
              <button class="apl-tab" id="apl-tab-price" role="tab" aria-selected="false" aria-controls="apl-panel-price" tabindex="-1">Price</button>
            </div>
            <section class="apl-panel" id="apl-panel-tracking" role="tabpanel" aria-labelledby="apl-tab-tracking">
              <form data-tool="tracking">
                <div class="apl-field"><label for="apl-reference">Container, bill of lading or booking number</label><input id="apl-reference" name="reference" placeholder="e.g. ABCD1234567" required></div>
                <p class="apl-field-note">Track up to three references, separated by a comma.</p>
                <button class="apl-widget-button" type="submit">Track shipment</button>
                <p class="apl-panel-status" role="status" aria-live="polite"></p>
              </form>
            </section>
            <section class="apl-panel" id="apl-panel-schedule" role="tabpanel" aria-labelledby="apl-tab-schedule" hidden>
              <form data-tool="schedule">
                <div class="apl-field"><label for="apl-origin">Origin</label><input id="apl-origin" name="origin" placeholder="Port, city, country or code" required></div>
                <div class="apl-field"><label for="apl-destination">Destination</label><input id="apl-destination" name="destination" placeholder="Port, city, country or code" required></div>
                <div class="apl-widget-actions"><button class="apl-widget-button" type="submit">Search schedules</button><button class="apl-widget-button is-secondary" type="button" data-advanced>Advanced search</button></div>
                <p class="apl-panel-status" role="status" aria-live="polite"></p>
              </form>
            </section>
            <section class="apl-panel" id="apl-panel-price" role="tabpanel" aria-labelledby="apl-tab-price" hidden>
              <p class="apl-price-copy">Need a transportation quote? Start a request for ocean freight and connected logistics services.</p>
              <button class="apl-widget-button" type="button" data-price>Get a price</button>
              <p class="apl-price-note">Pricing tools are available to registered MyAPL customers.</p>
              <p class="apl-panel-status" role="status" aria-live="polite"></p>
            </section>
          </div>
        </div>`);

      const dialog = document.querySelector('.apl-info-dialog');
      const tabs = [...dialog.querySelectorAll('[role="tab"]')];
      const selectTab = (tab) => {
        tabs.forEach((item) => {
          const selected = item === tab;
          item.setAttribute('aria-selected', String(selected));
          item.tabIndex = selected ? 0 : -1;
          dialog.querySelector(`#${item.getAttribute('aria-controls')}`).hidden = !selected;
        });
      };

      tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => selectTab(tab));
        tab.addEventListener('keydown', (event) => {
          if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
          event.preventDefault();
          const next = tabs[(index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
          selectTab(next);
          next.focus();
        });
      });
      dialog.querySelectorAll('form').forEach((form) => form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!form.reportValidity()) return;
        const status = form.querySelector('.apl-panel-status');
        status.dataset.state = 'success';
        status.textContent = `${form.dataset.tool === 'tracking' ? 'Tracking' : 'Schedule'} request is ready. Connect the APL service to return live results.`;
      }));
      dialog.querySelector('[data-advanced]').addEventListener('click', () => {
        const status = dialog.querySelector('#apl-panel-schedule .apl-panel-status');
        status.dataset.state = 'error';
        status.textContent = 'Advanced schedule search is not connected yet.';
      });
      dialog.querySelector('[data-price]').addEventListener('click', () => {
        location.href = '/sign-in.html?v=3';
      });
    }
  }

  const socialLinks = [
    'https://www.linkedin.com/company/apl/',
    'https://www.instagram.com/APLShipping/',
    'https://www.facebook.com/APLShipping/',
    'https://x.com/APLShipping',
    'https://www.youtube.com/user/NOLGroup'
  ];

  const socialWrap = document.querySelector('.footer-content-link-wrap');
  if (socialWrap) {
    const links = [...socialWrap.querySelectorAll('a')];
    socialLinks.forEach((href, index) => {
      let link = links[index];
      if (!link) {
        link = document.createElement('a');
        link.className = 'footer-link is-linkedin w-inline-block';
        link.innerHTML = '<div class="footer-linkedin"></div>';
        socialWrap.append(link);
      }
      link.href = href;
      link.target = '_blank';
      link.rel = 'noopener';
        if (index === 2) link.querySelector('.footer-linkedin').innerHTML = '<span class="social-label">fb</span>';
        if (index > 2) link.querySelector('.footer-linkedin').textContent = ['X', 'YT'][index - 3];
    });
  }

  document.querySelectorAll('.header-menu-list').forEach((list) => {
    if (![...list.querySelectorAll('a')].some((link) => link.textContent.includes('The CMA CGM Group'))) {
        list.insertAdjacentHTML('beforeend', '<div data-cursor="hidden" class="header-link-wrap"><a data-link-random="" class="header-link w-inline-block" href="https://www.apl.com/about/the-group"><div data-wf--text--text-styles="mono" class="txt w-variant-3648de38-311e-0b18-0c7d-747bd60ae1a8 fs-12">The CMA CGM Group</div></a></div>');
    }
  });

  document.querySelectorAll('.footer-menu-list').forEach((list) => {
    if (![...list.querySelectorAll('a')].some((link) => link.textContent.includes('My Customer Services'))) {
      list.insertAdjacentHTML('beforeend', '<a class="footer-link w-inline-block" href="https://mycustomerservice.cma-cgm.com/s/?language=en_US&cs-channel-hdr-wb" target="_blank" rel="noopener"><div class="txt fs-16 fw-med">My Customer Services</div></a>');
    }
  });
});
