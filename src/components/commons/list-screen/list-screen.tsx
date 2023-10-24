import { useMemo, useRef } from 'react';

import { Outlet } from '@remix-run/react';

import { DeleteButton, NewButton } from '../button';
import { Card } from '../card';
import { ListItens, type ListItensProps } from './list-itens';
import {
  ButtonContainer,
  DataContainer,
  ListContainer,
  RootListContainer,
  ScrollContainer,
} from './styled';

export type EntityGeneric = {
  id: string;
  name: string;
  subName?: string;
} & object;

export type ListScreenProps<Data extends Array<EntityGeneric>> = {
  data: Data;
};

export const ListScreen = <Data extends Array<EntityGeneric>>({
  data,
  icon,
  navigateTo,
}: ListScreenProps<Data> & ListItensProps<Data>) => {
  const myRef = useRef<HTMLDivElement>(null);
  const hasData = useMemo(() => Boolean(data.length), [data]);

  return (
    <RootListContainer>
      <ListContainer show={hasData}>
        <ButtonContainer>
          <NewButton />
          <DeleteButton />
        </ButtonContainer>
        <ScrollContainer>
          <Card padded={0}>
            <ListItens
              data={data}
              icon={icon}
              navigateTo={navigateTo}
              dataContainerRef={myRef}
            />
          </Card>
        </ScrollContainer>
      </ListContainer>
      <DataContainer full={!hasData} ref={myRef}>
        <Outlet />
      </DataContainer>
    </RootListContainer>
  );
};
