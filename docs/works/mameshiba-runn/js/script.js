document.addEventListener('DOMContentLoaded', function() {
  let observer = null;

  const createObserver = () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }

    const isSmall = window.innerWidth <= 768;
    const options = {
      root: null,
      rootMargin: isSmall ? '0px 0px -6% 0px' : '0px 0px -10% 0px',
      threshold: isSmall ? 0.12 : 0.15
    };

    observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, options);

    document.querySelectorAll('aside nav h2, main article h2').forEach(el => {
      // 初期表示で既に見えている要素も処理されるように observe
      observer.observe(el);
    });
  };

  createObserver();

  // リサイズ時はデバウンスして observer を再生成（画面回転などに対応）
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(createObserver, 200);
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // ページトップボタン表示切替
  const pagetop = document.querySelector('.pagetop');
  if (pagetop) {
    const THRESHOLD = 200; // 上から何pxで表示するか（必要に応じて調整）
    const onScroll = () => {
      if (window.scrollY > THRESHOLD) {
        pagetop.classList.add('is-visible');
      } else {
        pagetop.classList.remove('is-visible');
      }
    };
    // 初期判定
    onScroll();
    // scroll イベント（パフォーマンス考慮で passive）
    window.addEventListener('scroll', onScroll, { passive: true });

    // クリックでスムーズスクロール
    pagetop.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ...もし既存の IntersectionObserver 等があるならそのコードもここに残してください...
});

document.addEventListener('DOMContentLoaded', function() {
  // 表示設定（必要に応じて変更）
  const INITIAL_SHOW = 1; // 最初に表示する件数（直近の記事のみ）
  const BATCH_SIZE = 2;   // ボタン1回押しで追加表示する件数

  const posts = Array.from(document.querySelectorAll('main > article'));
  const loadMoreBtn = document.getElementById('loadMore');

  if (!posts.length) {
    if (loadMoreBtn) loadMoreBtn.style.display = 'none';
    return;
  }

  let current = Math.min(INITIAL_SHOW, posts.length);

  // 初期で非表示にする
  posts.forEach((post, idx) => {
    if (idx >= current) post.classList.add('is-hidden');
  });

  // ボタンの表示制御
  if (!loadMoreBtn) return;
  if (current >= posts.length) {
    loadMoreBtn.style.display = 'none';
  } else {
    loadMoreBtn.style.display = 'inline-block';
  }

  // 表示後に見出しアニメーションが必要なら判定して in-view を付与
  const revealAndCheck = (start, end) => {
    for (let i = start; i < end; i++) {
      const post = posts[i];
      if (!post) continue;
      post.classList.remove('is-hidden');

      // 記事見出しが画面内に入っていれば in-view を付与（IntersectionObserver があればそちらで処理される）
      const h2 = post.querySelector('h2');
      if (h2) {
        const rect = h2.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.95) {
          h2.classList.add('in-view');
        }
      }
    }
  };

  loadMoreBtn.addEventListener('click', function() {
    const next = Math.min(current + BATCH_SIZE, posts.length);
    revealAndCheck(current, next);
    current = next;

    // すべて表示されたらボタンを隠す
    if (current >= posts.length) {
      loadMoreBtn.style.display = 'none';
    } else {
      // 任意：ボタンに残件数を表示するなどの UI 更新
      // loadMoreBtn.textContent = `もっと見る（残り ${posts.length - current} 件）`;
    }
  });

  // 初期表示時に最初の表示分の見出しを in-view 判定（ページ読み込みで既に見えていればアニメする）
  revealAndCheck(0, current);

  // --- 既存の pagetop や IntersectionObserver 等のコードがある場合はそのまま動作します ---
});

document.addEventListener('DOMContentLoaded', function() {
  // フィルタ処理（category / type / tag）
  const filterLinks = document.querySelectorAll('.js-filter');
  const posts = Array.from(document.querySelectorAll('main > article'));

  const clearFilter = () => {
    posts.forEach(p => p.classList.remove('is-hidden', 'filtered-out'));
  };

  const applyFilter = (type, value) => {
    posts.forEach(p => {
      const cat = p.dataset.category || '';
      const t = p.dataset.type || '';
      const tags = (p.dataset.tags || '').split(',').map(s => s.trim()).filter(Boolean);

      let show = true;
      if (type === 'category') show = (cat === value);
      else if (type === 'type') show = (t === value);
      else if (type === 'tag') show = tags.includes(value);

      if (show) {
        p.classList.remove('filtered-out');
      } else {
        p.classList.add('filtered-out');
      }
    });

    // 絞り込み時は is-hidden を無視して表示するため、filtered-out を使してCSSで隠す
  };

  filterLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const type = this.dataset.filterType;
      const value = this.dataset.filter;
      // トグル挙動：既にアクティブなら解除
      const alreadyActive = this.classList.contains('active');
      document.querySelectorAll('.js-filter.active').forEach(a => a.classList.remove('active'));
      if (alreadyActive) {
        clearFilter();
      } else {
        this.classList.add('active');
        applyFilter(type, value);
      }
    });
  });
});