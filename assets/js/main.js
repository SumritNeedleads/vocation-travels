// Inject header and initialize responsive nav/dropdown

document.addEventListener('DOMContentLoaded', () => {
  // Inject header
  fetch('assets/components/header.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('header').innerHTML = html;
      initHeaderJS();
    });

  // Inject footer
  fetch('assets/components/footer.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('footer').innerHTML = html;
    });
});

function initHeaderJS() {
  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('hidden');
    });
  }

  // Dropdown for Travel Packages
  const travelBtn = document.getElementById('travel-packages-btn');
  const travelMenu = document.getElementById('travel-packages-menu');
  if (travelBtn && travelMenu) {
    // Show on click (mobile)
    travelBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      travelMenu.classList.toggle('hidden');
    });
    // Hide on click outside
    document.addEventListener('click', (e) => {
      if (!travelBtn.contains(e.target) && !travelMenu.contains(e.target)) {
        travelMenu.classList.add('hidden');
      }
    });
    // Show on hover (desktop)
    travelBtn.addEventListener('mouseenter', () => {
      if (window.innerWidth >= 640) travelMenu.classList.remove('hidden');
    });
    travelBtn.addEventListener('mouseleave', () => {
      if (window.innerWidth >= 640) setTimeout(() => travelMenu.classList.add('hidden'), 200);
    });
    travelMenu.addEventListener('mouseenter', () => {
      if (window.innerWidth >= 640) travelMenu.classList.remove('hidden');
    });
    travelMenu.addEventListener('mouseleave', () => {
      if (window.innerWidth >= 640) travelMenu.classList.add('hidden');
    });
  }
}


function initSlider(slidesId, dotsId) {
  const slides = document.getElementById(slidesId);
  const dots   = document.querySelectorAll(`#${dotsId} .dot`);
  let   current = 0;
  const total   = slides.children.length;

  function goTo(idx) {
    slides.style.transform = `translateX(-${idx * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle('bg-opacity-100', i === idx);
      dot.classList.toggle('bg-opacity-50',  i !== idx);
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      current = i;
      goTo(i);
    });
  });

  setInterval(() => {
    current = (current + 1) % total;
    goTo(current);
  }, 5000);

  goTo(0);
}

document.addEventListener('DOMContentLoaded', function() {
  initSlider('slides', 'slider-dots');
  initSlider('slides2', 'slider-dots2');
});


// Wait until the DOM is fully parsed
window.addEventListener('DOMContentLoaded', () => {
  initTextCarousel();
});

function initTextCarousel() {
  const items = [
    {
      title: 'Rajesh Verma',
      subtitle: '“Applying for a visa can be a daunting process, but Vocation Travels made it so much easier. Their website has a clear and concise visa assistance section that explained everything step-by-step. I was also impressed by the responsiveness of their customer support team when I had a question about the required documents. Vocation Travels took the stress out of visa applications – highly recommend!”',
      linkText: 'Delhi',
      linkHref: 'work.html'
    },
    {
      title: 'Sandeep Kapoor',
      subtitle: '“I wasn’t sure where I wanted to go for my solo backpacking trip, but Vocation Travels’ website was a great resource for getting inspiration. Their blog posts on hidden gems in India were fantastic, and I ended up discovering an amazing off-the-beaten-path trek in Himachal Pradesh. Big thanks to Vocation Travels for helping me plan an unforgettable adventure!”',
      linkText: 'Bangalore',
      linkHref: 'case-study.html'
    },
    {
      title: 'Priya Rai',
      subtitle: '“Vocation Travels’ website is my one-stop shop for all my travel needs. Whether I’m booking flights for a business trip or searching for last-minute hotel deals, their user-friendly interface makes the process quick and efficient. Plus, their secure payment gateway gives me peace of mind. Vocation Travels is a trusted travel partner for me.”',
      linkText: 'Mumbai',
      linkHref: 'services.html'
    },
    {
      title: 'Pragya Sharma',
      subtitle: '“Vocation Travels made planning my family trip to Kerala such a breeze! Their website was easy to navigate and had a great selection of tour packages that fit perfectly within our budget. We especially loved browsing the hotel options with all the virtual tours – it really helped us decide which place would be perfect for us. I’ll definitely recommend Vocation Travels to anyone looking for a hassle-free travel experience!”',
      linkText: 'Ahmedabad',
      linkHref: 'services.html'
    }
    // …add more slides here if you like…
  ];

  let current = 0;
  const titleEl    = document.getElementById('text-title');
  const subtitleEl = document.getElementById('text-subtitle');
  const linkEl     = document.getElementById('text-link');
  const dotsCt     = document.getElementById('text-carousel-dots');

  // 1) Build dots
  items.forEach((_, idx) => {
    const btn = document.createElement('button');
    btn.className = 'w-3 h-3 rounded-full bg-white bg-opacity-50 cursor-pointer';
    btn.addEventListener('click', () => {
      current = idx;
      updateSlide();
    });
    dotsCt.appendChild(btn);
  });

  // 2) Update the visible slide
  function updateSlide() {
    const { title, subtitle, linkText, linkHref } = items[current];
    titleEl.textContent    = title;
    subtitleEl.textContent = subtitle;
    linkEl.textContent     = linkText;
    linkEl.href            = linkHref;

    // Highlight the active dot
    Array.from(dotsCt.children).forEach((dot, i) => {
      dot.classList.toggle('bg-opacity-100', i === current);
      dot.classList.toggle('bg-opacity-50',  i !== current);
    });
  }

  // 3) Optional: auto-advance every 6s
  setInterval(() => {
    current = (current + 1) % items.length;
    updateSlide();
  }, 6000);

  // 4) Kick it off
  updateSlide();
}
