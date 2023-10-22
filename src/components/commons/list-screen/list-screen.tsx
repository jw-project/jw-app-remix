import { Outlet } from '@remix-run/react';

import { DeleteButton, NewButton } from '../button';
import { Card } from '../card';
import { ListItens } from './list-itens';
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
}: ListScreenProps<Data>) => {
  const hasData = Boolean(data.length);

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
              icon="chevron_right"
              navigateTo="/congregation/events/"
            />
          </Card>
        </ScrollContainer>
      </ListContainer>
      <DataContainer full={!hasData}>
        <Outlet />
      </DataContainer>
    </RootListContainer>
  );
};
