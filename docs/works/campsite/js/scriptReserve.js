// レンタル道具
const rentalLists = [
    'テント',
    'テーブル&チェア',
    'ランタン',
    '寝袋',
    'BBQセット',
    '蚊帳',
];
const rentalTool = document.querySelector('#rentalTool');
rentalLists.forEach((rentalList) => {
    const  content = `<label><input type="checkbox" value="${rentalList}">${rentalList}</label>`;
    rentalTool.insertAdjacentHTML('beforeend', content);
});

// 備考エリア
const text = document.querySelector('#text');
const count = document.querySelector('#count');
const overCount = document.querySelector('#overCount');
text.addEventListener('keyup', () => {
    count.textContent = `${text.value.length}文字`;
    if (text.value.length > 50) {
        count.classList.add('alert');
        overCount.textContent = '50文字以内で入力してください';
    } else {
        count.classList.remove('alert');
        overCount.textContent = '';
    }
});
// 写真のアニメーションはCSS内で記述

// 送信ボタンの活性・非活性切り替え
const check = document.querySelector('#check');
const btn = document.querySelector('#btn');

check.addEventListener('change', () => {
    btn.disabled = !check.checked;
});

// 入力チェック
const judgmentLists = [
        {
            name:'userName',
            japName:'名前',
            maxLength: 20,
            pattern: /^\p{L}+([\s-]\p{L}+)*$/u,
        },
        {
            name:'gender',
            japName:'性別',
            pattern: /(男|女|その他)/,
        },
        {
            name:'email',
            japName:'メールアドレス',
            maxLength: 100,
            pattern: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/,
        },
        {
            name:'postCode',
            japName:'郵便番号',
            minLength: 7,
            maxLength: 7,
            pattern: /^\d{3}-?\d{4}$/, // または　/^[0-9]{3}-[0-9]{4}$/
        },
        {
            name:'adress',
            japName:'住所',
            maxLength: 50,
            pattern: /.*/, 
        },
        {
            name:'phone',
            japName:'電話番号',
            minLength: 10,
            maxLength: 11,
            pattern: /^\d{1,3}\-?\d{2,4}\-?\d{3,4}$/,
        },
        {
            name:'number',
            japName:'人数',
            pattern: /^[1-9]+$/, 
        },
        {
            name:'date',
            japName:'日付',
            pattern: /^\d{4}\-\d{2}\-\d{2}$/,
        }
];

function isCorrect(judgmentList, inputValue) {
    // パターンにマッチしているか、minLengthとmaxLengthの条件を満たしているか確認
    let minL = 0;
    let maxL= 0;
    if(judgmentList.minLength){
        minL = judgmentList.minLength;
    }
    if(judgmentList.maxLength){
        maxL = judgmentList.maxLength;
    }
    // 電話番号や郵便番号などはハイフンがあれば除く
    let newValue = inputValue.replace(/-/g, ""); 
    if(judgmentList.pattern.test(inputValue)){
        if(maxL==0){return true}
        if(minL <= newValue.length &&  newValue.length <= maxL){
            return true
        }else{
            return false
        }
    } else{
        return false
    }    
};

const requireds = document.getElementsByClassName('required');
const reserveForm = document.getElementById('reserveForm');
let result = false;
let results = [];

// クリックイベントでrequiredクラスの項目をチェック
btn.addEventListener('click',function(event) {
    event.preventDefault(); // デフォルトのフォーム送信をキャンセル
    for(let i = 0; i < requireds.length; i++) {
        let inpValue = '';
        // 入力された値（性別の場合はチェックされた値）を入れる
        if(judgmentLists[i].name == 'gender'){
            // チェックされているチェックボックスがあるかどうかを判定
            radioBtns = requireds[i].querySelectorAll(`input[name="${judgmentLists[i].name}"]`);
            for (const radioBtn of radioBtns) {
                if (radioBtn.checked) {
                    result = true;
                    inpValue = requireds[i].querySelector(`input[name="${judgmentLists[i].name}"]:checked`).value;
                    break;
                }
            }
        } else {
            inpValue = requireds[i].querySelector(`input[name="${judgmentLists[i].name}"]`).value;
        }
        // 出力する内容（エラーメッセージ）を入れる
        const oup = document.getElementById(judgmentLists[i].name);
        // 空欄の場合
        if(!inpValue){
            oup.classList.add('alert');
            oup.textContent = `${judgmentLists[i].japName}は必須です`;
        } else { 
            // 入力値があった場合
            result = isCorrect(judgmentLists[i], inpValue);
            // 正しい場合
            if(result) {
                oup.textContent = '';
                oup.classList.remove('alert');
            } else { 
                // 入力値が間違っている場合
                oup.classList.add('alert');
                oup.textContent = `${judgmentLists[i].japName}を入力し直してください`;
            }
        }
        results.push(result);
    };
    // 必須項目の入力結果が全てTrueなら
    console.log(results);
    if(results.every((result) => result)){
        setTimeout(() => {
            alert('送信が完了しました'); 
        }, 2000);
    }else{
        alert("送信できませんでした");
    }
    results = []; // 最後にリセット
});

