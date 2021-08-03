import capitalize from 'lodash/capitalize';

export const cleanGroup = (group) => capitalize(group).replace('-', ' ');