// 写真がふわっと表示されるアニメーション
const photoList = document.querySelectorAll('.photo');
const options = {
  duration: 2500,
  delay: 300,
  easing: 'ease',
  fill: 'forwards', 
};
photoList.forEach((photo) => {
  photo.animate(
    {
      opacity: [0, 1],
      filter: ['blur(.4rem)', 'blur(0)'], 
      translate: ['0 4rem', 0],
    },
    options,
  );
});
// テキストが表示されるアニメーション
const textList = document.querySelectorAll('.text');
textList.forEach((text) => {
    text.animate(
      {
        opacity: [0, 1],
      },
      options,
    );
});
