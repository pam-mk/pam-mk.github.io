(function () {
  'use strict';
  function openLinkedDay() {
    var heading = document.getElementById(location.hash.slice(1));
    if (heading && heading.classList.contains('gallery-day-heading')) {
      heading.closest('details').open = true;
    }
  }
  openLinkedDay();
  window.addEventListener('hashchange', openLinkedDay);
  var dialog = document.querySelector('.gallery-dialog');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  var links = Array.from(document.querySelectorAll('.gallery-open'));
  var image = dialog.querySelector('img');
  var previous = dialog.querySelector('.gallery-previous');
  var next = dialog.querySelector('.gallery-next');
  var album = [];
  var index = 0;
  var overflow;
  var opener;

  function showPhoto(position) {
    index = (position + album.length) % album.length;
    var link = album[index];
    image.src = link.href;
    image.alt = link.dataset.caption;
    var source = link.closest('.gallery-photo').querySelector('.gallery-download');
    var download = dialog.querySelector('.gallery-dialog-download');
    download.href = source.href;
    download.download = source.download;
    download.setAttribute('aria-label', source.getAttribute('aria-label'));
    download.hidden = false;
    dialog.querySelector('#gallery-caption').textContent = link.dataset.caption;
    dialog.querySelector('.gallery-counter').textContent = (index + 1) + ' / ' + album.length;
    previous.disabled = next.disabled = album.length < 2;
  }

  links.forEach(function (link) {
    link.addEventListener('click', function (event) {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      album = links.filter(function (photo) { return photo.dataset.day === link.dataset.day; });
      opener = link;
      showPhoto(album.indexOf(link));
      overflow = document.body.style.overflow;
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    });
  });
  previous.addEventListener('click', function () { showPhoto(index - 1); });
  next.addEventListener('click', function () { showPhoto(index + 1); });
  dialog.querySelector('.gallery-close').addEventListener('click', function () { dialog.close(); });
  dialog.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showPhoto(index + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  dialog.addEventListener('click', function (event) {
    if (event.target !== dialog) return;
    var bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', function () {
    document.body.style.overflow = overflow;
    image.removeAttribute('src');
    if (opener) opener.focus();
  });
})();
