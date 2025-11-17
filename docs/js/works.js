
// all works links
const allWorksLink = document.querySelector('#all-works-link .img-link-lists');

works_lists.forEach((work, index) => {
  // リンクを生成
  const workLink = document.createElement('a');
  
  // work titleをp要素に追加
  const titlePg = document.createElement('p'); 
  titlePg.classList.add('text-title');
  titlePg.textContent = work.title;
  workLink.appendChild(titlePg);
  
  // work img
  const linkImg = work.mockupImg ? `<img src="img/works-img/mockup/${work.mockupImg}" alt="${escapeHtml(work.title)}">` : 'https://placehold.co/800x600/a7d8de/ffffff?text=No+Image';
  workLink.appendChild(document.createRange().createContextualFragment(linkImg));
  
  // my roleをul要素に追加
  const roleLists = document.createElement('ul'); 
  roleLists.classList.add('role-lists');
  work.myRole.forEach((role) => {
    const roleLi = document.createElement('li');
    roleLi.textContent = role;
    console.log(roleLi.textContent);
    roleLists.appendChild(roleLi);
  });
  workLink.appendChild(roleLists);
  
  workLink.style.display = 'block';
  workLink.href = `works-single.html?id=${index}`;
  
  // li要素にリンクを追加してulに追加
  const listItem = document.createElement('li');
  listItem.classList.add('img-link-item');          
  work.workTags.forEach(tagDict => listItem.classList.add(tagDict.en));
  listItem.appendChild(workLink);
  allWorksLink.appendChild(listItem);
});
console.log(`${allWorksLink}`);

// エスケープ処理の関数
function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// tags for filter
const tagFilterBtn = document.querySelector('#all-works-link #filter-btn-container');
const tagList = {}
const tagsSet = new Set();
if (tagFilterBtn) {
  works_lists.forEach(w => {
    w.workTags.forEach(k => { 
      tagsSet.add(k.en);
      tagList[k.en] = k.ja;
    });
  });
  tagList['all'] = 'ALL';
  tagsSet.add('all');
  console.log(tagsSet);
  tagsSet.forEach(tag => {
      const bt = document.createElement('button');
      bt.className = 'tag fillter hover-link';
      bt.value = tag;
      bt.textContent = tagList[tag];
      tagFilterBtn.appendChild(bt);
  });
}
// 作品一覧のフィルター機能(jQuery)
$(function() {
  $("#filter-btn-container button").click(function(){
    let target = $(this).attr("value");
    $(".img-link-lists li").each(function(){
      console.log(this);
      $(this).animate({"opacity":0}, 300, function(){
        $(this).hide();
        // フィルタリング
        if($(this).hasClass(target) || target =="all"){
          $(this).show();
              $(this).animate({"opacity":1}, 300);
          }
        });
      });
    });
  });