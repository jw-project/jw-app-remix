import React from 'react';

import { Outlet, useMatches } from '@remix-run/react';

import { Tab, Tabs } from '~/components/commons/tabs/tabs';
import { TabsCard } from '~/components/commons/tabs/tabs-styled';

export default function PublisherEdit() {
  const match = useMatches();

  const checkPathname = (to: string) => Boolean(match.find((e) => e.pathname.includes(to)));

  return (
    <>
      <Tabs>
        <Tab
          title="Information"
          to="information"
          icon="contact_mail"
          selected={checkPathname('information')}
        />
        <Tab
          title="Spiritual"
          to="spiritual"
          icon="local_library"
          selected={checkPathname('spiritual')}
        />
        <Tab
          title="Emergency"
          to="emergency"
          icon="e911_emergency"
          selected={checkPathname('emergency')}
        />
        <Tab
          title="Assign"
          to="assign"
          icon="check_box"
          selected={checkPathname('assign')}
        />
        <Tab
          title="Publisher record"
          to="records"
          icon="view_list"
          selected={checkPathname('records')}
        />
      </Tabs>
      <TabsCard>
        <Outlet />
      </TabsCard>
    </>
  );
}
