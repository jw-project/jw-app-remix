import { Link, Outlet, useLoaderData, useNavigate } from '@remix-run/react';
import { type CoreOptions } from '@tanstack/react-table';

import { AlignRight } from '~/components/commons/align';
import { Drawer } from '~/components/commons/drawer';
import { TextDescriptionCell } from '~/components/commons/table/cells';
import { Table } from '~/components/commons/table/table';
import { selectorForTable } from '~/components/commons/table/utils';
import type { EventEntity } from '~/entities/event';
import { useDrawer } from '~/hooks/use-drawer';
import { useLanguage } from '~/hooks/use-language';
import { useRevalidator } from '~/hooks/use-revalidate';
import { useTranslation } from '~/hooks/use-translation';

import { deleteEvents } from './events.client';
import type { EventsLoaderReturn } from './events.server';

export { loader, shouldRevalidate } from './events.server';

export default function Events() {
  const { openDrawer } = useDrawer();
  const { events } = useLoaderData<EventsLoaderReturn>();
  const { translate } = useTranslation();
  const { defaultLanguage } = useLanguage();
  const navigate = useNavigate();
  const { revalidate } = useRevalidator();

  const columns: CoreOptions<EventEntity>['columns'] = [
    ...selectorForTable<EventEntity>(),
    {
      id: 'title',
      header: () => translate('routes.congregation.events.table.event'),
      cell: ({ row }) => {
        const { name, type } = row.original;

        return (
          <TextDescriptionCell
            text={name}
            description={String(translate(`enum.event-type.${type}`))}
          />
        );
      },
    },
    {
      id: 'date',
      header: () => translate('routes.congregation.events.table.date'),
      cell: ({ row }) => {
        const { startDate, endDate } = row.original;

        if (!startDate && !endDate) {
          return translate('common.no-date');
        }

        if (startDate && endDate) {
          return (
            new Date(startDate).toLocaleDateString(defaultLanguage) +
            ' - ' +
            new Date(endDate).toLocaleDateString(defaultLanguage)
          );
        }

        return new Date(startDate).toLocaleDateString(defaultLanguage);
      },
    },
    {
      id: 'edit',
      header: () => (
        <AlignRight>
          {translate('routes.congregation.events.table.actions')}
        </AlignRight>
      ),
      cell: ({
        row: {
          original: { id },
        },
      }) => (
        <AlignRight>
          <Link
            to={id}
            onClick={() => openDrawer({ onClose: () => navigate('') })}
          >
            {translate('common.edit')}
          </Link>
        </AlignRight>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        data={events}
        onLineAction={({ original }) => navigate(original.id)}
        buttons={[
          {
            tooltip: String(translate('common.new')),
            icon: 'add_circle',
            enabledWhen: 'always',
            shouldUnselect: true,
            onClick: () => {
              navigate('./new');
              openDrawer({ onClose: () => navigate('') });
            },
          },
          {
            tooltip: String(translate('common.edit')),
            icon: 'edit',
            enabledWhen: 'onlyOneSelected',
            onClick: (data) => {
              navigate(data[0]?.id || '');
              openDrawer({ onClose: () => navigate('') });
            },
          },
          {
            tooltip: String(translate('common.delete')),
            icon: 'delete',
            enabledWhen: 'leastOneSelected',
            shouldUnselect: true,
            onClick: async (data) => {
              await deleteEvents(data);
              revalidate();
            },
          },
        ]}
      />
      <Drawer
        size="large"
        internalNavigator={{ paramKey: 'eventId', navigatorData: events }}
      >
        <Outlet />
      </Drawer>
    </>
  );
}
