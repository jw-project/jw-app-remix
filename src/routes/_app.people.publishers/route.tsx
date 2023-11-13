import { Outlet } from '@remix-run/react';

import { Card } from '~/components/commons/card';

import { PublisherList } from './components';

export { loader } from './publisher.server';

export default function Publishers() {
  return <></>;
  // return (
  //   <RootListContainer>
  //     <ListContainer show>
  //       <Card padded={0}>
  //         <PublisherList />
  //       </Card>
  //     </ListContainer>
  //     <DataContainer full={false}>
  //       <Outlet />
  //     </DataContainer>
  //   </RootListContainer>
  // );
}
