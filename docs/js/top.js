// トップビューのスクロールダウン
function switchByWidth(){
  const circleText = document.querySelector(".circle-text");
  if (circleText) {
    circleText.innerHTML = ''; // 既存の<span>要素をすべて削除
  }
  let text = "";
  if (window.matchMedia('(max-width: 767px)').matches) {
    text = "Welcome to my portfolio. ";
    //スマホ処理
  } else if (window.matchMedia('(min-width:768px)').matches) {
    text = "SCROLL DOWN ";
    text = text.repeat(2);
    //PC処理
  } 
  // return finalText;
  const totalChars = text.length;
  const anglePerChar = 360 / totalChars;
  
  for (let i = 0; i < totalChars; i++) {
    const span = document.createElement("span");
    span.textContent = text[i];
    span.style.transform = `rotate(${i * anglePerChar}deg)`;
    circleText.appendChild(span);
    if(i > (totalChars - 13) ){
      span.classList.add("colorBlue");
    }
  }
  // console.log(text);
};

//ロードとリサイズの両方で同じ処理を付与する
window.addEventListener("load", switchByWidth);
window.addEventListener("resize", switchByWidth);

// works の表示(cssの方で配置の入れ替えを定義)
const works_container = document.querySelector('#works .works-grid');
if (works_container && Array.isArray(window.works_lists)) {
  const frag = document.createDocumentFragment();
  const display_num = 4;
  for(let i = 0; i < display_num; i++) {
    w = works_lists[i];
    console.log(w);
    const workItem = document.createElement('div');
    workItem.className = 'work-item fade-in';
    workItem.innerHTML = `
      <div class="work-img-container">
        <img class="work-img hover-link" src="img/works-img/mockup/${w.mockupImg}" alt="work${i+1}">
      </div>
      <div class="work-content">
        <h3 class="work-title">${escapeHtml(w.title)}</h3>
        <p class="work-description">${escapeHtml(w.description)}</p>
        <div class="tags"><span class="tag">${(w.myRole || []).join('</span><span class="tag">')}</span></div>
        <div class="more-btn-s"><a class="hover-link" href="works-single.html?id=${i}">More<div class="arrow-icon"></div></a></div>
      </div>
    `;
    frag.appendChild(workItem);
  };
  works_container.appendChild(frag);
} else {
  console.error('works_container or works_lists not found');
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

// contact ウィンクマークの動き
const winkMark = document.querySelector('.wink-mark');
console.log(winkMark);
function toggleBlink() {
  winkMark.classList.toggle('no-display');
}
setInterval(toggleBlink, 1000);// 1秒ごとに実行

// contact formのバリデーションチェック
$(function(){
  $('#submit-button').on('click', function(event) {
    event.preventDefault(); // チェックが通らなかった場合に送信をキャンセルする

    let name = $('#name').val();
    let email = $('#email').val();
    let message = $('#message').val(); 
    let error = false; // エラーフラグ

    if (name === '') {
      alert('お名前は必須です');
      error = true;
    }
    if (email === '' || email.indexOf('@') === -1) {
      alert('有効なメールアドレスを入力してください');
      error = true;
    }
    if (message === '') {
      alert('メッセージを入力してください');
      error = true;
    }
    // エラーがなければフォームを送信
    if (!error) {
      alert('送信します');
    }
  });
});
