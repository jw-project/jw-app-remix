import type { AxiosError } from 'axios';
import axios from 'axios';
import { error } from 'console';
import type { Setter } from 'jotai';
import { atom } from 'jotai';

import type { InputError } from '~/services/api/errors';

type SavingDataType = {
  url: string;
  formData: object;
  id: string;
};

type SavingDataTypeInternal = SavingDataType & {
  timeout: NodeJS.Timeout;
};

function instanceOfInputError(object: any): object is InputError {
  return 'message' in object && 'field' in object;
}

const instanceTimeout = (set: Setter, newData: SavingDataType) => {
  return setTimeout(async () => {
    try {
      const response = await axios.post(newData.url, newData.formData);
      set(addSuccessApiAtom, { ...response.data, formIntanceId: newData.id });
    } catch (e) {
      const axiosError = e as AxiosError;

      if (
        axiosError.response &&
        instanceOfInputError(axiosError.response.data)
      ) {
        const responseError = axiosError.response.data;
        set(errorsList, (current) => [
          ...current,
          {
            formIntanceId: newData.id,
            field: responseError.field,
            message: responseError.message,
          },
        ]);
      }
      error('Error saving data:', axiosError.message);
    } finally {
      set(removeSavingDataAtom, newData);
    }
  }, 2000);
};

// saving data control
export const savingData = atom<Array<SavingDataTypeInternal>>([]);

export const isSavingAtom = atom((get) => Boolean(get(savingData).length));

export const addSavingDataAtom = atom(
  null,
  (get, set, newData: SavingDataType) => {
    const currentData = get(savingData).find(({ id }) => id === newData.id);

    if (currentData) {
      clearTimeout(currentData.timeout);

      set(savingData, (current) =>
        current.map((data) =>
          data.id === newData.id
            ? {
                ...data,
                formData: newData.formData,
                timeout: instanceTimeout(set, newData),
              }
            : data,
        ),
      );
    } else {
      set(savingData, (current) => [
        ...current,
        { ...newData, timeout: instanceTimeout(set, newData) },
      ]);
    }
  },
);

const removeSavingDataAtom = atom(
  null,
  (get, set, removeData: SavingDataType) => {
    set(savingData, (current) =>
      current.filter(({ id }) => id !== removeData.id),
    );
  },
);

//

// success control
const successApiList = atom<Array<any>>([]);

export const removeSuccessApiAtom = atom(
  (get) => get(successApiList),
  (get, set, id: string) =>
    set(successApiList, (current) =>
      current.filter((c) => c.formIntanceId !== id),
    ),
);

export const addSuccessApiAtom = atom(
  (get) => get(successApiList),
  (get, set, obj: any) => set(successApiList, (current) => [...current, obj]),
);

//

// errors control
type FormInstance = {
  formIntanceId: string;
};

export type ErrorsApiListType = InputError & FormInstance;
const errorsList = atom<Array<ErrorsApiListType>>([]);

export const errorsApiListAtom = atom(
  (get) => get(errorsList),
  (get, set, idToRemove: string) =>
    set(errorsList, (current) =>
      current.filter((c) => c.formIntanceId !== idToRemove),
    ),
);

//
