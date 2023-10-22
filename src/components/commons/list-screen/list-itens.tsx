import { useMatches } from '@remix-run/react';

import { Icon, type IconOpts } from '~/components/commons/icon';
import {
  ItemArrowContainer,
  ItemIconContainer,
  ItemName,
  ItemStyled,
  ItemSubText,
  ItemTextContainer,
  ListStyled,
} from '~/components/commons/list-screen/styled';

import type { EntityGeneric } from './list-screen';

export type ListItensProps<Data extends Array<EntityGeneric>> = {
  data: Data;
  navigateTo: string;
  icon: IconOpts;
};

export function ListItens<Data extends Array<EntityGeneric>>({
  data,
  navigateTo,
  icon,
}: ListItensProps<Data>) {
  const match = useMatches();

  const checkPathname = (entity: EntityGeneric) =>
    Boolean(match.find((e) => e.pathname.includes(entity.id)));

  const navigateToEvent = (entity: EntityGeneric) =>
    `${navigateTo}${entity.id}`;

  return (
    <ListStyled>
      {data.map((event) => (
        <li key={event.id}>
          <ItemStyled
            to={navigateToEvent(event)}
            selected={checkPathname(event)}
          >
            <ItemIconContainer>
              <Icon size="icon-x-large" icon="calendar_month" />
            </ItemIconContainer>
            <ItemTextContainer>
              <ItemName>{event.name}</ItemName>
              <ItemSubText>{event.subName}</ItemSubText>
            </ItemTextContainer>
            <ItemArrowContainer>
              <Icon size="icon-x-large" icon={icon} />
            </ItemArrowContainer>
          </ItemStyled>
        </li>
      ))}
    </ListStyled>
  );
}
