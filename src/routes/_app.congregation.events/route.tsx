import { Link, Outlet, useLoaderData } from '@remix-run/react';
import { type CoreOptions } from '@tanstack/react-table';

import { Drawer } from '~/components/commons/drawer';
import { TextDescriptionCell } from '~/components/commons/table/cells';
import { selectorForTable } from '~/components/commons/table/utils';
import { WrapperTable } from '~/components/commons/table/wrapper-table';
import type { EventEntity } from '~/entities/event';
import { useLanguage } from '~/global-context/language';
import { useTranslation } from '~/i18n/i18n';

import type { EventsLoaderReturn } from './events.server';

export { loader, shouldRevalidate } from './events.server';

export default function Events() {
  const { events } = useLoaderData<EventsLoaderReturn>();
  const { translate } = useTranslation();
  const { defaultLanguage } = useLanguage();

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
      <WrapperTable
        columns={columns}
        data={events}
        buttons={[
          { text: 'Profile', icon: 'delete' },
          { icon: 'demography', tooltip: 'Demography' },
          { text: 'Downloads' },
        ]}
      />
      <Drawer size="large">
        <Outlet />
      </Drawer>
    </>
  );
}
