import React from 'react';

import { useLoaderData, useMatches } from '@remix-run/react';

import type { PublisherEntity } from '~/entities/publisher';
import type { PublishersLoaderReturn } from '~/routes/__app/people/publishers';

import { Icon } from '../commons/icon';
import {
  PublisherItemArrowContainer,
  PublisherItemIconContainer,
  PublisherItemName,
  PublisherItemStyled,
  PublisherItemSubText,
  PublisherItemTextContainer,
  PublisherListStyled,
} from './publishers-styles';

export function PublisherList() {
  const { publishers } = useLoaderData<PublishersLoaderReturn>();
  const match = useMatches();

  const checkPathname = (publisher: PublisherEntity) => Boolean(match//
    .find((e) => e.pathname.includes(publisher.id)));

  const navigateToPublisher = (publisher: PublisherEntity) => `/people/publishers/${publisher.id}`;

  return (
    <PublisherListStyled>
      {publishers.map((publisher) => (
        <li key={publisher.id}>
          <PublisherItemStyled
            to={navigateToPublisher(publisher)}
            $selected={checkPathname(publisher)}
          >
            <PublisherItemIconContainer>
              <Icon size="icon-x-large" icon="person" />
            </PublisherItemIconContainer>
            <PublisherItemTextContainer>
              <PublisherItemName>{publisher.displayName}</PublisherItemName>
              <PublisherItemSubText>Developer</PublisherItemSubText>
            </PublisherItemTextContainer>
            <PublisherItemArrowContainer>
              <Icon size="icon-x-large" icon="chevron_right" />
            </PublisherItemArrowContainer>
          </PublisherItemStyled>
        </li>
      ))}
    </PublisherListStyled>
  );
}
