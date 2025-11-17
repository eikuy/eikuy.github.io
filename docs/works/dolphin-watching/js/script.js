// タイトルがふよふよ動くアニメーション
const keyframes = {
    borderRadius: [
        "50% 50% 50% 70%/50% 50% 70% 60%",
        "80% 30% 50% 50%/50%",
        "40% 40% 50% 40%/30% 50% 40% 80%"
    ],
}
const options = {
    iterations: Infinity,
    direction: "alternate",
    duration: 7000,
}
document.querySelector('#heading').animate(keyframes, options);

// イルカのアイコンが動くアニメーション
const top_section = document.getElementById('top-section');
// 波のような動きを作る関数
function createTranslateKeyframes(num, xStart, xEnd, yAmp) {
    let translateArr = [];
    for (let i = 0; i < num; i++) {
        const progress = i / (num - 1);
        const x = xStart + (xEnd - xStart) * progress;
        const y = Math.sin(x * Math.PI) * yAmp;
        translateArr.push(`${x}px ${y}px`);
    }
    return { translate: translateArr };
}

// ランダムに回転する動きを作る関数
function createRotateKeyframes(num, rotMin, rotMax) {
    let rotateArr = [];
    for (let i = 0; i < num; i++) {
        const rot = Math.floor(Math.random() * (rotMax - rotMin + 1) + rotMin);
        rotateArr.push(`z ${rot}deg`);
    }
    return { rotate: rotateArr };
}
const translateKeyframes_1 = createTranslateKeyframes(10, -100, 100, 10e-100);
const translateKeyframes_2 = createTranslateKeyframes(10, 100, -100, 10e-100);
const rotateKeyframes_1 = createRotateKeyframes(5, -20, 10);
const rotateKeyframes_2 = createRotateKeyframes(5, -15, 15);

const basicOptions = {
    iterations: Infinity,
    direction: "alternate",
};
const translateOptions_1 = {
    ...basicOptions,
    pseudoElement: "::before",
    duration: 10000,
};
const translateOptions_2 = {
    ...basicOptions,
    pseudoElement: "::after",
    duration: 10000,
};
const rotateOptions_1 = {
    ...basicOptions,
    pseudoElement: "::before",
    duration: 5000,
};
const rotateOptions_2 = {
    ...basicOptions,
    pseudoElement: "::after",
    duration: 5000,
};

top_section.animate(translateKeyframes_1, translateOptions_1);
top_section.animate(translateKeyframes_2, translateOptions_2);
top_section.animate(rotateKeyframes_1, rotateOptions_1);
top_section.animate(rotateKeyframes_2, rotateOptions_2);

// スクロールでイルカが出てくるアニメーション
const showDolphin = (entries) => {
    const keyframes = {
        opacity:[0,1],
        translate:['500px 0', 0],
    };
    entries[0].target.animate(keyframes, 1000);
};
const dolphinObserver = new IntersectionObserver(showDolphin);
dolphinObserver.observe(document.querySelector('#dolphin-img'));