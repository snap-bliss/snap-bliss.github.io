// =============================================
// 스냅블리스 (SnapBliss) - Main JavaScript
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // 페이지 로드 애니메이션
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    setTimeout(() => {
      document.body.style.opacity = '1';
      document.body.classList.add('loaded');
    }, 50);
  });

  // ─── Scroll Progress Bar ───
  const progressBar = document.getElementById('progress-bar');
  window.addEventListener('scroll', () => {
    const scrollTop  = window.scrollY;
    const docHeight  = document.body.scrollHeight - window.innerHeight;
    const scrolled   = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrolled + '%';
  }, { passive: true });

  // ─── Header Scroll Effect ───
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  // ─── Hamburger Menu ───
  const hamburger = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');

  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // ─── Smooth Scroll (fixed header offset) ───
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const offset    = 80;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    });
  });

  // ─── Scroll Reveal Animation ───
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });

  // ─── Pricing Tabs ───
  const priceTabs     = document.querySelectorAll('.price-tab');
  const priceContents = document.querySelectorAll('.pricing-content');

  priceTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.dataset.tab;

      priceTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      priceContents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const content = document.getElementById('price-' + targetTab);
      if (content) {
        content.classList.add('active');
        content.querySelectorAll('.reveal').forEach(el => {
          el.classList.remove('visible');
          setTimeout(() => el.classList.add('visible'), 50);
        });
      }
    });
  });

  // ─── Process Tabs (진행 방법) ───
  const processTabs     = document.querySelectorAll('.process-tab');
  const processContents = document.querySelectorAll('.process-content');

  processTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.dataset.tab;

      processTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      processContents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const content = document.getElementById('proc-content-' + targetTab);
      if (content) {
        content.classList.add('active');
        // Trigger reveal animations inside the newly shown tab
        content.querySelectorAll('.reveal').forEach(el => {
          el.classList.remove('visible');
          setTimeout(() => el.classList.add('visible'), 50);
        });
      }
    });
  });


  // ─── Gallery Filter (Masonry) with Load More ───
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const galItems    = document.querySelectorAll('.gal-item');
  const loadMoreBtn = document.getElementById('gallery-load-more');
  const loadMoreWrap = loadMoreBtn ? loadMoreBtn.parentElement : null;

  const LIMIT_ITEMS = 20;

  function updateGalleryFilter(filter, animate = true) {
    let visibleCount = 0;

    galItems.forEach(item => {
      const cat  = item.dataset.category;
      const match = filter === 'all' || cat === filter;

      if (match) {
        item.classList.remove('hidden');
        
        // 전체 탭인 경우 20개까지만 보이도록 제한
        if (filter === 'all') {
          if (visibleCount < LIMIT_ITEMS) {
            item.classList.remove('hidden-by-more');
          } else {
            item.classList.add('hidden-by-more');
          }
          visibleCount++;
        } else {
          item.classList.remove('hidden-by-more');
        }

        if (animate) {
          item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          item.style.opacity    = '0';
          item.style.transform  = 'scale(0.94)';
          requestAnimationFrame(() => {
            setTimeout(() => {
              item.style.opacity   = '1';
              item.style.transform = 'scale(1)';
            }, 40);
          });
        } else {
          item.style.opacity   = '1';
          item.style.transform = 'scale(1)';
        }
      } else {
        item.classList.remove('hidden-by-more');
        if (animate) {
          item.style.transition = 'opacity 0.25s ease';
          item.style.opacity    = '0';
          setTimeout(() => {
            item.classList.add('hidden');
          }, 260);
        } else {
          item.classList.add('hidden');
        }
      }
    });

    // 더보기 버튼 활성화 여부
    if (filter === 'all' && visibleCount > LIMIT_ITEMS) {
      if (loadMoreWrap) loadMoreWrap.style.display = 'block';
    } else {
      if (loadMoreWrap) loadMoreWrap.style.display = 'none';
    }
  }

  // 초기 갤러리 로드
  updateGalleryFilter('all', false);

  // 필터 버튼 이벤트 바인딩
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      updateGalleryFilter(filter, true);
    });
  });

  // 더보기 버튼 이벤트 바인딩
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      const hiddenItems = document.querySelectorAll('.gal-item.hidden-by-more');
      hiddenItems.forEach((item, index) => {
        item.classList.remove('hidden-by-more');
        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        item.style.opacity    = '0';
        item.style.transform  = 'scale(0.94)';
        requestAnimationFrame(() => {
          setTimeout(() => {
            item.style.opacity   = '1';
            item.style.transform = 'scale(1)';
          }, 40 + (index * 15)); // 순차적으로 나타나게 미세한 딜레이 부여
        });
      });
      if (loadMoreWrap) loadMoreWrap.style.display = 'none';
    });
  }

  // ─── Lightbox ───
  const lightbox   = document.getElementById('lightbox');
  const lbImg      = document.getElementById('lb-img');
  const lbCaption  = document.getElementById('lb-caption');
  const lbClose    = document.getElementById('lb-close');
  const lbPrev     = document.getElementById('lb-prev');
  const lbNext     = document.getElementById('lb-next');
  const lbBackdrop = document.getElementById('lb-backdrop');

  let currentIndex  = 0;
  let visibleItems  = [];

  function getVisibleItems() {
    return [...document.querySelectorAll('.gal-item:not(.hidden):not(.hidden-by-more)')];
  }

  function openLightbox(index) {
    visibleItems = getVisibleItems();
    if (visibleItems.length === 0) return;
    currentIndex = index;
    showLbImage(currentIndex);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function showLbImage(idx) {
    const item    = visibleItems[idx];
    const img     = item.querySelector('img');
    const caption = item.querySelector('.gal-overlay span');
    lbImg.src     = img.src;
    lbImg.alt     = img.alt;
    lbCaption.textContent = caption ? caption.textContent : '';
    // Counter
    lbCaption.textContent = `${caption ? caption.textContent : ''} · ${idx + 1} / ${visibleItems.length}`;
  }

  // Attach click to gallery items
  galItems.forEach((item, i) => {
    item.addEventListener('click', () => {
      visibleItems = getVisibleItems();
      const visIdx = visibleItems.indexOf(item);
      openLightbox(visIdx !== -1 ? visIdx : 0);
    });
  });

  lbClose.addEventListener('click', closeLightbox);
  lbBackdrop.addEventListener('click', closeLightbox);

  lbPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    showLbImage(currentIndex);
  });

  lbNext.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % visibleItems.length;
    showLbImage(currentIndex);
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   { currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length; showLbImage(currentIndex); }
    if (e.key === 'ArrowRight')  { currentIndex = (currentIndex + 1) % visibleItems.length; showLbImage(currentIndex); }
  });

  // Touch swipe support for lightbox
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) < 40) return;
    if (dx < 0) { currentIndex = (currentIndex + 1) % visibleItems.length; showLbImage(currentIndex); }
    else        { currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length; showLbImage(currentIndex); }
  });

  // ─── Active Nav Link on Scroll ───
  const sections = document.querySelectorAll('section[id]');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        document.querySelectorAll('nav a').forEach(a => {
          a.style.color = '';
        });
        const activeLink = document.querySelector(`nav a[href="#${id}"]`);
        if (activeLink) activeLink.style.color = 'var(--rose)';
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => navObserver.observe(section));

  // ─── Floating CTA Button Pulse ───
  const floatBtns = document.querySelectorAll('.float-btn');
  floatBtns.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'translateY(-4px) scale(1.03)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  console.log('✨ 스냅블리스 웹사이트 로드 완료 – 실제 포트폴리오 사진 적용');

  // ─── Visitor Counter (hitscounter.dev API) ───
  (function() {
    const todayEl = document.getElementById('visitor-today');
    const totalEl = document.getElementById('visitor-total');
    const apiUrl = 'https://hitscounter.dev/api/hit?output=json&url=https%3A%2F%2Fsnapbliss.github.io&tz=Asia/Seoul';

    fetch(apiUrl)
      .then(function(res) { return res.json(); })
      .then(function(data) {
        if (data) {
          if (todayEl && typeof data.today_hits !== 'undefined') {
            todayEl.textContent = Number(data.today_hits).toLocaleString();
          }
          if (totalEl && typeof data.total_hits !== 'undefined') {
            totalEl.textContent = Number(data.total_hits).toLocaleString();
          }
        }
      })
      .catch(function() {
        if (todayEl) todayEl.textContent = '...';
        if (totalEl) totalEl.textContent = '...';
      });
  })();

  // --- Video Thumbnail Time Offset ---
  // 영상 썸네일이 검은 화면이나 빈 배경으로 시작되는 것을 방지하기 위해
  // 메타데이터 로드 후 data-thumb-time (없으면 0.7)초 지점으로 시크합니다.
  document.querySelectorAll('.video-wrap video').forEach(function(video) {
    var poster = video.getAttribute('poster');
    if (poster && poster.trim() !== '') return;

    // data-thumb-time 속성이 있으면 해당 값 사용, 없으면 기본 0.7초
    var SEEK_TIME = parseFloat(video.getAttribute('data-thumb-time') || '0.7');
    var thumbnailSet = false;

    function setThumbnailFrame() {
      if (thumbnailSet) return;
      if (video.duration && video.duration > SEEK_TIME) {
        video.currentTime = SEEK_TIME;
        thumbnailSet = true;
      }
    }

    video.addEventListener('play', function() {
      if (thumbnailSet && Math.abs(video.currentTime - SEEK_TIME) < 0.2) {
        video.currentTime = 0;
      }
    }, { once: true });

    if (video.readyState >= 1) {
      setThumbnailFrame();
    } else {
      video.addEventListener('loadedmetadata', setThumbnailFrame, { once: true });
    }
  });
});