// HTMLからねこリストを表示させるためのエリアを取得
const member = document.querySelector('#member');

// 配列の中にねこのオブジェクトを格納
const lists = [
    {
        img: 'cat1.jpg',
        name: 'ダンテ',
        gender: 'オス',
        kind: 'ロシアンブルー',
        memo: '当店一イケメン猫です！',
    },
    {
        img: 'cat2.jpg',
        name: 'みな',
        gender: 'メス',
        kind: 'スコティッシュフォールド',
        memo: 'まだまだあまえんぼさん',
    },
    {
        img: 'cat3.jpg',
        name: '寒太',
        gender: 'オス',
        kind: 'アメリカンショートヘア',
        memo: '白いカーペットがお気に入り',
    },
    {
        img: 'cat4.jpg',
        name: '詩音',
        gender: 'メス',
        kind: 'メインクーン',
        memo: 'ちゅーるが大好き！',
    },
    {
        img: 'cat5.jpg',
        name: 'グラン',
        gender: 'オス',
        kind: 'ラグドール',
        memo: 'もふもふチャンピオン',
    },
    {
        img: 'cat6.jpg',
        name: 'るん',
        gender: 'メス',
        kind: 'ミックス',
        memo: '先月からの新入りです',
    },
];

// ねこ紹介エリアにHTML要素を追加していく処理
// イベントの設定をしていないため、ページが読み込まれる時に処理が動く
for (let i = 0; i < lists.length; i++) {
    // 今処理しているのが何行目かを計算して定数に格納
    const rowNum = i + 1;

    // 今表示しているねこ（i+1番目のねこ）のデータをそれぞれの定数に格納
    const {img,name,gender,kind,memo} = lists[i];
    // ねこ画像用のHTML要素を作成して定数に格納
    const photo = `<div><img src="img/${img}" alt=""></div>`;
    // ねこ説明用のHTML要素を作成して定数に格納
    const text = `<div class="info"><h2>${name}</h2><p>性別：　${gender}<br>種類：　${kind}<br>メモ：　${memo}</p></div>`;

    // 奇数行目の場合
    if (rowNum % 2 == 1){
        // ねこ説明用のHTML要素を左、ねこ画像用のHTML要素を右に配置
        member.insertAdjacentHTML('beforeend',text);
        member.insertAdjacentHTML('beforeend',photo);
    // 偶数行目の場合
    } else {
        // ねこ説明用のHTML要素を右、ねこ画像用のHTML要素を左に配置
        member.insertAdjacentHTML('beforeend',photo);
        member.insertAdjacentHTML('beforeend',text);
    }
}

// 見出しアニメーション
const heading = document.querySelector('#heading');

// 見出し用のアニメーションを設定
const headKeyframes = {
    // 透明から不透明に
    opacity: [0, 1],
    // 上から下に降ってくる
    translate: ['0 -60px', 0],
};
// 見出し用のアニメーションにオプションを設定
const headOptions = {
    // アニメーション時間
    duration: 1500,
    // 最初と最後は早く
    easing: 'ease',
}
// 見出しにアニメーションを設定
heading.animate(headKeyframes,headOptions);


// 写真と文字がふわふわ落ちてくるアニメーション
const catImgs = document.querySelectorAll('.catImg');
const catInfo = document.querySelectorAll('.info');

// ねこの写真の数だけ繰り返し
for (let i = 0; i < catImgs.length; i++) {
    // ねこのアニメーションを設定
    const catKeyframes = {
        // 透明から不透明に
        opacity: [0, 1],
        // 回転させながら
        rotate: ['15deg', 0],
        // 少しだけ小さくする
        scale: [1.1, 1],
    };
    const catOptions = {
        // アニメーション時間
        duration: 800,
        // 見出しが出てから、順番に動作するように調整
        delay: i * 400 + 1000,
        // アニメーション完了後の状態をキープ
        fill: 'both',
    }
    // ねこと説明文の表示アニメーションを実行
    catImgs[i].animate(catKeyframes,catOptions);
    catInfo[i].animate(catKeyframes,catOptions);
}