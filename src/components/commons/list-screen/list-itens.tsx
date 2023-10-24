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
  dataContainerRef: React.RefObject<HTMLDivElement>;
};

export function ListItens<Data extends Array<EntityGeneric>>({
  data,
  navigateTo,
  icon,
  dataContainerRef,
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
            onClick={() =>
              dataContainerRef.current?.scroll({ top: 0, behavior: 'smooth' })
            }
          >
            <ItemIconContainer>
              <Icon size="icon-x-large" icon={icon} />
            </ItemIconContainer>
            <ItemTextContainer>
              <ItemName>{event.name}</ItemName>
              <ItemSubText>{event.subName}</ItemSubText>
            </ItemTextContainer>
            <ItemArrowContainer>
              <Icon size="icon-x-large" icon="chevron_right" />
            </ItemArrowContainer>
          </ItemStyled>
        </li>
      ))}
    </ListStyled>
  );
}
