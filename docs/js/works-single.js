// About me ロゴの動き
const logoImg = document.querySelector('.logo-img');
console.log(logoImg);
function toggleBlink() {
  logoImg.classList.toggle('no-display');
}
setInterval(toggleBlink, 1000);

// worksの取得と表示
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const idx = id !== null ? parseInt(id, 10) : NaN;
  if (Number.isNaN(idx) || !Array.isArray(window.works_lists) || !works_lists[idx]) {
    location.href = 'index.html';
    return;
  }
  const work = works_lists[idx];
  const container = document.querySelector('.work-flex .work-item');
  if (!container) return;

  const imgPath = work.mockupImg ? `img/works-img/mockup/${work.mockupImg}` : 'https://placehold.co/800x600/a7d8de/ffffff?text=No+Image';

  container.innerHTML = `
    <div class="work-img-container">
      <img src="${imgPath}" alt="${escapeHtml(work.title)}" class="work-img">
    </div>
    <div class="work-content">
      <h3 class="work-title">${escapeHtml(work.title)}</h3>
      <p class="work-description">${escapeHtml(work.description || '')}</p>

      <dl class="works-single-content">
        ${work.period ? `<dt>制作時期</dt><dd>${escapeHtml(work.period)}</dd>` : ''}
        <dt>使用ツール</dt>
        <dd>${(work.tools || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}</dd>
        <dt>担当範囲</dt>
        <dd>${(work.myRole || []).map(r => `<span class="role">${escapeHtml(r)}</span>`).join('')}</dd>
        ${work.additionalInfo ? `<dt>設計ポイント☜ </dt><dd>${escapeHtml(work.additionalInfo)}</dd>` : ''}
        ${work.link ? `<dt>Link</dt><dd><a href="${escapeHtml(work.link)}" target="_blank">${escapeHtml(work.link)}</a></dd>` : ''}
      </dl>
    </div>
  `
    // 作品イメージの表示
    const workImgSec = document.getElementById('work-image');
    const workImgContainer = document.querySelector('.work-img-flex');
    let workImgPath = '';
    if (workImgContainer) {
      for (const img of work.workImg) {
        if(img){
          workImgPath = `img/works-img/work-img/${img}`;
        } else {
          workImgSec.classList.add('none-display');
          break
        }
        workImgContainer.innerHTML += `
          <img src="${workImgPath}" alt="${escapeHtml(work.title)}" class="fade-in">
        `;
        console.log(workImgPath);
      }
    }

  // next work link
  const nextWorkLink = document.querySelector('.next-work-link');
  if (nextWorkLink) {
    const nextWork = works_lists[idx + 1];
    if (nextWork) {
      nextWorkLink.href = `works-single.html?id=${idx + 1}`;
      console.log('Next Work:', nextWork.title);
      console.log('Next Work Link:', nextWorkLink);
      console.log('Next Work Link Title:', document.querySelector('.next-work-title'));
      console.log('Next Work Title:', escapeHtml(nextWork.title));
      document.querySelector('.next-work-title').textContent = escapeHtml(nextWork.title);
    } else {
      nextWorkLink.style.display = 'none';
    }
  }
  // エスケープ処理の関数
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
});
