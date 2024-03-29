import { startTransition, useCallback, useMemo } from 'react';

import { useNavigate, useNavigation, useParams } from '@remix-run/react';

import { useSave } from '~/hooks/use-save';
import { useTranslation } from '~/hooks/use-translation';

import { Button } from '../button';

export type DrawerFooterGenericExtends = Array<
  {
    id: string;
  } & object
>;

export type DrawerFooterProps<T extends DrawerFooterGenericExtends> = {
  navigatorData: T;
  paramKey: string;
};

export function DrawerFooterNavigate<
  T extends DrawerFooterGenericExtends = Array<any>,
>({ navigatorData, paramKey }: DrawerFooterProps<T>) {
  const navigate = useNavigate();
  const params = useParams();
  const { isSaving } = useSave();
  const { translate } = useTranslation('common');
  const { state } = useNavigation();

  const isNew = params[paramKey] === 'new';

  if (!navigatorData) {
    return null;
  }

  const backClick = useCallback(() => {
    const currentIndex = navigatorData.findIndex(
      (obj) => obj.id === params[paramKey],
    );
    const previousId =
      currentIndex !== -1 && currentIndex !== 0
        ? navigatorData[currentIndex - 1]?.id
        : null;

    if (previousId) {
      startTransition(() => {
        navigate(previousId);
      });
    }
  }, [navigatorData, params]);

  const nextClick = useCallback(() => {
    const currentIndex = navigatorData.findIndex(
      (obj) => obj.id === params[paramKey],
    );
    const nextId =
      currentIndex !== -1 && currentIndex !== navigatorData.length - 1
        ? navigatorData[currentIndex + 1]?.id
        : null;

    if (nextId) {
      navigate(nextId);
    }
  }, [navigatorData, params]);

  const isFirst = useMemo(() => {
    return navigatorData[0]?.id === params[paramKey];
  }, [navigatorData, params]);

  const isLast = useMemo(() => {
    return navigatorData[navigatorData.length - 1]?.id === params[paramKey];
  }, [navigatorData, params]);

  return (
    <>
      {isNew ? (
        <Button
          type="submit"
          form="form-context"
          disabled={isSaving || state === 'loading'}
        >
          {translate('save')}
        </Button>
      ) : (
        <>
          <Button onClick={backClick} disabled={isFirst}>
            {translate('navegation-back-button')}
          </Button>
          <Button onClick={nextClick} disabled={isLast}>
            {translate('navegation-next-button')}
          </Button>
        </>
      )}
    </>
  );
}
