import capitalize from 'lodash/capitalize';
export * from './url-builder';

export const cleanGroup = (group) => capitalize(group).replace(/-/g, ' ');
