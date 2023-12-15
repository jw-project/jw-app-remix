import { Link, Outlet, useLoaderData, useNavigate } from '@remix-run/react';
import { type CoreOptions } from '@tanstack/react-table';

import { Drawer } from '~/components/commons/drawer';
import { TextDescriptionCell } from '~/components/commons/table/cells';
import { Table } from '~/components/commons/table/table';
import { selectorForTable } from '~/components/commons/table/utils';
import type { EventEntity } from '~/entities/event';
import { useLanguage } from '~/global-context/language';
import { useRevalidator } from '~/hooks/revalidate';
import { useTranslation } from '~/i18n/i18n';

import { deleteEvents } from './events.client';
import type { EventsLoaderReturn } from './events.server';

export { loader, shouldRevalidate } from './events.server';

export default function Events() {
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
      header: () => translate('routes.congregation.events.table.edit'),
      cell: ({ row }) => {
        const { id } = row.original;

        return (
          <div className="flex justify-end">
            <Link to={id}>edit</Link>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        data={events}
        buttons={[
          {
            tooltip: String(translate('common.new')),
            icon: 'add_circle',
            enabledWhen: 'always',
            shouldUnselect: true,
            onClick: () => {
              navigate('./new');
            },
          },
          {
            tooltip: String(translate('common.edit')),
            icon: 'edit',
            enabledWhen: 'onlyOneSelected',
            onClick: (data) => {
              navigate(data[0].id);
            },
          },
          {
            tooltip: String(translate('common.edit')),
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
      <Drawer size="large">
        <Outlet />
      </Drawer>
    </>
  );
}
