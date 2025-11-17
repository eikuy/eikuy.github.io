// ローディング
const loadingAreaGrey = document.querySelector('#loading');
const spinnerScreen = document.querySelector('.spinnerScreen');
const loadingRhombus = document.querySelector('.loopingRhombusesSpinner');

window.addEventListener('load', () => {
    loadingAreaGrey.classList.add('loaded');
});

// 昼の部/夜の部切り替え
const topPage = document.querySelector('.topPage');
const topImg = document.querySelector('#topImg');
const topBtn = document.querySelector('#topBtn');

topBtn.addEventListener('click', () => {
    topPage.classList.toggle('nightTheme');
    if(topPage.classList.contains('nightTheme')){
        topImg.src = 'img/top_night.jpg';
        topImg.alt = '星ノ宮ビレッジ夜の風景';
        topBtn.textContent = '昼の部へ移動';
    } else {
        topImg.src = 'img/top_day.jpg';
        topImg.alt = '星ノ宮ビレッジ昼の風景';
        topBtn.textContent = '昼の部へ移動';
    }
});