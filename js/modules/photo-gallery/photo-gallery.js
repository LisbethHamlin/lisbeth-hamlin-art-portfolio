const init = async () => {
  const gridSelector = '.grid';

  const gallery = document.querySelector(gridSelector);

  if (gallery) {
    const { main } = await import('./init-photo-gallery');

    main(gallery);
  }
};

init();
