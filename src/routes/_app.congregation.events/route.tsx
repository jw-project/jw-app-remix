import { Outlet, useLoaderData } from '@remix-run/react';
import { useAtomValue } from 'jotai';

import { isSavingAtom } from '~/atoms-global/saving';
import { Card } from '~/components/commons/card';
import { Form } from '~/components/commons/form/form';
import {
  DataContainer,
  ListContainer,
  RootListContainer,
} from '~/components/commons/list-screen';
import { EventList } from '~/components/events/event-list';
import { weekOptions } from '~/entities/week';
import { useTranslation } from '~/i18n/i18n';
import { useUser } from '~/matches/use-user';
import { congregationFormSchema as schema } from '~/services/api/congregation/validations';

import type { EventsLoaderReturn } from './events.server';

export { loader } from './events.server';

export default function Events() {
  const { translate } = useTranslation('routes.congregation');
  const { translate: commonTranslate } = useTranslation('common');
  const { congregationId } = useUser();
  const isSaving = useAtomValue(isSavingAtom);
  const congregationActive = Boolean(congregationId);
  const { events } = useLoaderData<EventsLoaderReturn>();

  return (
    <RootListContainer>
      <ListContainer>
        <Card padded={0}>
          <EventList />
        </Card>
      </ListContainer>
      <DataContainer>
        <Outlet />
      </DataContainer>
    </RootListContainer>
  );
}
