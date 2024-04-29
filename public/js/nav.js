const closeBtn = document.querySelector('.close');
const openBtn = document.querySelector('.openBtn');
const sidebar = document.querySelector('.sidebar');
const horizontalNav = document.querySelector('.horizontalNav')


closeBtn.addEventListener('click', () => {
    sidebar.style.display = 'none';
})

openBtn.addEventListener('click', () => {
    sidebar.style.display = 'flex';
})