// About detail ゴロの動き
const logoImg = document.querySelector('.logo-img');
console.log(logoImg);
function toggleBlink() {
  logoImg.classList.toggle('no-display');
}
setInterval(toggleBlink, 1000);

// 経歴タイムラインのアニメーション
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});
document.querySelectorAll('.timeline-item').forEach(el => observer.observe(el));