const lists = [
    'garelly1.jpg',
    'garelly2.jpg',
    'garelly3.jpg',
    'garelly4.jpg',
    'garelly5.jpg',
    'garelly6.jpg',
    'garelly7.jpg',
];
const photoGarally = document.querySelector('.photoGarelly');
for(let i = 0; i < lists.length; i++) {
    const content = `<li class="item0${i+1}"><img src="img/garelly${i+1}.jpg" alt=""></li>`;
    photoGarally.insertAdjacentHTML('beforeend', content);
}