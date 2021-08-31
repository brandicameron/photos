const body = document.querySelector('body');
const products = document.querySelectorAll('.products-container');
let activeElement; //Capture active element for keyboard users to return to after large view

//PRODUCT MODALS
function createProductModal(e) {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  body.appendChild(modal);

  const closeBtn = document.createElement('div');
  closeBtn.classList.add('close-btn');
  closeBtn.setAttribute('tabindex', '0');
  modal.appendChild(closeBtn);

  const imgContainer = document.createElement('div');
  imgContainer.classList.add('img-container');
  modal.appendChild(imgContainer);

  const image = document.createElement('img');
  image.classList.add('image');
  imgContainer.appendChild(image);
  closeBtn.focus();

  image.src = e.target.src;
  image.alt = e.target.alt;
}

function createChristmasModal(e) {
  const template = document.querySelector('.template');
  const modal = template.content.cloneNode(true);
  document.body.appendChild(modal);

  const image = document.querySelector('.image');
  const thumbnails = document.querySelector('.thumbnails');
  const thumbFront = document.querySelector('.thumb-front');
  const thumbBack = document.querySelector('.thumb-back');

  image.src = e.target.src.replace('-3', '-2');
  image.alt = e.target.alt;
  thumbFront.src = e.target.src.replace('-3', '-2');
  thumbFront.alt = e.target.alt;
  thumbBack.src = e.target.src.replace('-2', '-3');
  thumbBack.alt = e.target.alt;

  if (e.keyCode === 13) {
    thumbnailFocus();
  }

  thumbnails.addEventListener('click', (e) => {
    if (e.target.classList.contains('thumbnail')) {
      image.src = e.target.src;
    }
  });

  thumbnails.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      if (e.target.classList.contains('thumbnail')) {
        image.src = e.target.src;
      }
    }
  });
}

function viewProductModal(e) {
  if (
    e.target.classList.contains('product-image') &&
    !e.target.classList.contains('album-image')
  ) {
    body.style.overflow = 'hidden';
    createProductModal(e);
  } else if (e.target.classList.contains('christmas-image')) {
    body.style.overflow = 'hidden';
    createChristmasModal(e);
  }
}

function closeModal(e) {
  const modal = document.querySelector('.modal');
  if (
    e.target.classList.contains('close-btn') ||
    e.target.classList.contains('image') ||
    e.keyCode === 27 ||
    (e.keyCode === 13 && e.target.classList.contains('close-btn'))
  ) {
    modal.remove();
    body.style.overflow = 'scroll';

    if (!(activeElement === undefined)) {
      activeElement.focus();
    }
  }
}

// ACCESSIBILITY
//Target for skip to content link
const allImgs = document.querySelectorAll('img');
//prevents error on 404 page which has no image
if (!allImgs.length == 0) {
  allImgs[0].setAttribute('id', 'first-product');
}

//For tabbing to products and opening the modal
products.forEach((container) => {
  container.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      activeElement = document.activeElement;

      if (
        e.target.classList.contains('product-image') ||
        e.target.classList.contains('christmas-image')
      ) {
        viewProductModal(e);
      }
    }
  });
});

//Focus first thumbnail for keyboard users
function thumbnailFocus(e) {
  const thumbFront = document.querySelector('.thumb-front');
  thumbFront.focus();
}

//Adds focus indicator to images for keyboard users only
body.addEventListener('keydown', (e) => {
  if (e.keyCode === 9) {
    allImgs.forEach((img) => {
      img.classList.add('add-focus');
    });
  }
});

// BACK TO TOP BUTTON
window.onscroll = function () {
  const backToTopBtn = document.querySelector('.back-to-top');
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    backToTopBtn.classList.remove('hide');
  } else {
    backToTopBtn.classList.add('hide');
  }
};

// EVENT LISTENERS
body.addEventListener('click', viewProductModal);
body.addEventListener('click', closeModal);
body.addEventListener('keydown', closeModal);
