import { useEffect, useRef, useState } from 'react';

import { Link, Outlet, useLoaderData, useNavigate } from '@remix-run/react';
import { type CoreOptions } from '@tanstack/react-table';

import { AlignRight } from '~/components/commons/align';
import { Drawer } from '~/components/commons/drawer';
import { DrawerFooterNavigate } from '~/components/commons/drawer/drawer-footer-navigate';
import type { DrawerRefProps } from '~/components/commons/drawer/types';
import { Modal } from '~/components/commons/modal';
import type { ModalRefProps } from '~/components/commons/modal/types';
import { TextDescriptionCell } from '~/components/commons/table/cells';
import { Table } from '~/components/commons/table/table';
import type { TableRefProps } from '~/components/commons/table/types';
import { DateCell, selectorForTable } from '~/components/commons/table/utils';
import type { EventEntity } from '~/entities/event';
import { useRevalidator } from '~/hooks/use-revalidate';
import { useTranslation } from '~/hooks/use-translation';
import { refGuard } from '~/utils/ref-guard';

import { deleteEvents } from './events.client';
import type { EventsLoaderReturn } from './events.server';

export { loader, shouldRevalidate } from './events.server';

export default function Events() {
  const tableRef = useRef<TableRefProps<EventEntity>>(null);
  const deleteModalRef = useRef<ModalRefProps>(null);
  const formDrawerRef = useRef<DrawerRefProps>(null);
  const { events } = useLoaderData<EventsLoaderReturn>();
  const [eventsState, setEventsState] = useState<EventEntity[]>(events);
  const { translate } = useTranslation();
  const navigate = useNavigate();
  const { revalidate } = useRevalidator();

  useEffect(() => {
    setEventsState(events);
  }, [events]);

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

        return <DateCell startDate={startDate} endDate={endDate} />;
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
          <Link to={id} onClick={() => refGuard(formDrawerRef).openDrawer()}>
            {translate('common.edit')}
          </Link>
        </AlignRight>
      ),
    },
  ];

  return (
    <>
      <Table
        ref={tableRef}
        columns={columns}
        data={eventsState}
        onLineAction={({ original }) => {
          navigate(original.id);
          refGuard(formDrawerRef).openDrawer();
        }}
        buttons={[
          {
            tooltip: String(translate('common.new')),
            icon: 'add_circle',
            enabledWhen: 'always',
            shouldUnselect: true,
            onClick: () => {
              navigate('./new');
              refGuard(formDrawerRef).openDrawer();
            },
          },
          {
            tooltip: String(translate('common.edit')),
            icon: 'edit',
            enabledWhen: 'onlyOneSelected',
            onClick: (data) => {
              navigate(data[0]?.id || '');
              refGuard(formDrawerRef).openDrawer();
            },
          },
          {
            tooltip: String(translate('common.delete')),
            icon: 'delete',
            enabledWhen: 'leastOneSelected',
            onClick: () => {
              refGuard(deleteModalRef).openModal();
            },
          },
        ]}
      />
      <Drawer
        ref={formDrawerRef}
        onClose={() => {
          navigate('');
        }}
        size="large"
        footer={() => (
          <DrawerFooterNavigate
            navigatorData={eventsState}
            paramKey="eventId"
          />
        )}
      >
        <Outlet context={{ formDrawerRef }} />
      </Drawer>
      <Modal
        ref={deleteModalRef}
        severity="question-warning"
        text={String(
          translate('routes.congregation.events.delete-modal', {
            length: Number(tableRef.current?.selectedData.length),
          }),
        )}
        onConfirm={async () => {
          setEventsState((currentEvents) =>
            currentEvents.filter(
              ({ id }) =>
                !refGuard(tableRef).selectedData.find((e) => e.id === id),
            ),
          );
          refGuard(tableRef).resetRowSelection();
          await deleteEvents(refGuard(tableRef).selectedData);
          revalidate();
        }}
      />
    </>
  );
}
