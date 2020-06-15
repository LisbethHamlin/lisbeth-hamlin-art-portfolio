const $target = document.querySelector('#current-shows')!;
const currentTime = Math.floor(Date.now() / 1000);

let newShowCounter = 0;

for (const element of document.querySelectorAll<HTMLElement>('#previous-shows .card')) {
  const endTime = parseInt(element.dataset.time || '0', 10);
  if (currentTime <= endTime) {
    element.parentNode?.removeChild(element);
    $target.appendChild(element);
    newShowCounter++;
  }
}

if (newShowCounter === 0) {
  document.querySelector('#no-current-shows-message')?.classList.remove('hidden');
}

document.querySelector('#show-root')?.classList.remove('load');


