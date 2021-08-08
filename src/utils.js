import capitalize from 'lodash/capitalize';

export const cleanGroup = (group) => capitalize(group).replace('-', ' ');

export const supportsCSSMasonryLayout = typeof window !== `undefined` && CSS.supports("grid-template-rows: masonry");