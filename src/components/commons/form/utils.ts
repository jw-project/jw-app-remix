import type { SelectOptionsType } from './select';

export const setVoidOptionWhenNew = (
  options: SelectOptionsType[],
  id: string,
): SelectOptionsType[] => {
  if (id === 'new') {
    return [
      { label: '', value: '', disabled: true, selected: true },
      ...options,
    ];
  }

  return options;
};
