import type { AxiosError } from 'axios';
import axios from 'axios';
import { error } from 'console';
import type { Setter } from 'jotai';
import { atom } from 'jotai';

type SavingDataType = {
  url: string;
  formData: object;
};

type SavingDataTypeInternal = SavingDataType & {
  timeout: NodeJS.Timeout;
};

const instanceTimeout = (set: Setter, newData: SavingDataType) => {
  return setTimeout(async () => {
    try {
      await axios.post(newData.url, newData.formData);
    } catch (e) {
      error('Error saving data:', (e as AxiosError).message);
    } finally {
      set(removeSavingDataAtom, newData);
    }
  }, 20000);
};

export const savingData = atom<Array<SavingDataTypeInternal>>([]);

export const isSavingAtom = atom((get) => Boolean(get(savingData).length));

export const addSavingDataAtom = atom(
  null,
  (get, set, newData: SavingDataType) => {
    const currentData: SavingDataTypeInternal | undefined = get(
      savingData,
    ).find(({ url }) => url === newData.url);

    if (currentData) {
      clearTimeout(currentData.timeout);
      const newObj = { ...currentData.formData, ...newData.formData };

      set(savingData, (current) =>
        current.map((data) =>
          data.url === newData.url
            ? {
                ...data,
                formData: newObj,
                timeout: instanceTimeout(set, newData),
              }
            : data,
        ),
      );
    } else {
      //
      set(savingData, (current) => [
        ...current,
        { ...newData, timeout: instanceTimeout(set, newData) },
      ]);
    }
  },
);

export const removeSavingDataAtom = atom(
  null,
  (_get, set, removeData: SavingDataType) => {
    set(savingData, (current) =>
      current.filter(({ url }) => url !== removeData.url),
    );
  },
);
