import { useLoaderData, useMatches } from '@remix-run/react';

import { Icon } from '~/components/commons/icon';
import {
  ItemArrowContainer,
  ItemIconContainer,
  ItemName,
  ItemStyled,
  ItemSubText,
  ItemTextContainer,
  ListStyled,
} from '~/components/commons/list-screen';
import type { EventEntity } from '~/entities/event';
import { useTranslation } from '~/i18n/i18n';

import type { EventsLoaderReturn } from '../events.server';

export function EventList() {
  const { events } = useLoaderData<EventsLoaderReturn>();
  const { translate } = useTranslation('enum.event-type');

  const match = useMatches();

  const checkPathname = (event: EventEntity) =>
    Boolean(match.find((e) => e.pathname.includes(event.id)));

  const navigateToEvent = (event: EventEntity) =>
    `/congregation/events/${event.id}`;

  return (
    <ListStyled>
      {events.map((event) => (
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
              <ItemSubText>{translate(event.type)}</ItemSubText>
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
