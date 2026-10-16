
// thinking 
(function () {
  const el = document.querySelector('.thinking');
  if (!el) return;

  // messages to cycle through
  const messages = [
    'دیو درحال فکر کردن است!',
    'دیو درحال پردازش است!',
    'دیو تقریباً آماده است!',
  ];

  let index = 0;

  // show it (display: block) -> animation kicks in
  el.style.display = 'block';
  el.textContent = messages[0];

  // cycle the text every 2s
  const cycle = setInterval(() => {
    index = (index + 1) % messages.length;
    el.textContent = messages[index];
  }, 2000);

  // after 6s: play fade-out, THEN set display:none
  setTimeout(() => {
    clearInterval(cycle);
    el.classList.add('hide');

    // wait for the fade-out animation (0.4s) to finish
    el.addEventListener('animationend', function onEnd(e) {
      if (e.animationName === 'fadeOutDown') {
        el.style.display = 'none';
        el.classList.remove('hide');
        el.removeEventListener('animationend', onEnd);
      }
    });
  }, 6000);
})();

// typing
(function () {
  const el = document.querySelector('.typewriter');
  if (!el) return;

  const box = el.closest('.narration-box'); // the scrolling container

  // ====== CONFIG ======
  const TEXT = el.textContent;
  el.textContent = '';
  const START_DELAY = 6000;
  const SPEED = 10;
  // ====================

  // scroll the box to the bottom
  const scrollToBottom = () => {
    if (box) box.scrollTo({ top: box.scrollHeight, behavior: 'smooth' });
  };

  setTimeout(() => {
    el.style.display = 'block';
    scrollToBottom();

    let i = 0;
    const type = () => {
      if (i < TEXT.length) {
        el.textContent += TEXT.charAt(i);
        i++;
        scrollToBottom();          // <-- keep it pinned to the bottom
        setTimeout(type, SPEED);
      } else {
        el.classList.add('done');

        document.getElementById('finish_sign').style.display = 'block';
        scrollToBottom();
      }
    };
    type();
  }, START_DELAY);
})();