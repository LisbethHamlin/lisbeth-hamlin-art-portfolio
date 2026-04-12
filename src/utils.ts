export const cleanGroup = (group: string) => group.replaceAll('-', ' ');

export const urlFromTitle = (title: string) =>
  title.replace(/\s/g, '-').replace(/&/g, 'and').toLowerCase();
