import { useLoaderData, useMatches } from '@remix-run/react';

import { Icon } from '~/components/commons/icon';
import type { PublisherEntity } from '~/entities/publisher';

import type { PublishersLoaderReturn } from '../publisher.server';

export function PublisherList() {
  // const { publishers } = useLoaderData<PublishersLoaderReturn>();
  // const match = useMatches();

  // const checkPathname = (publisher: PublisherEntity) =>
  //   Boolean(match.find((e) => e.pathname.includes(publisher.id)));

  // const navigateToPublisher = (publisher: PublisherEntity) =>
  //   `/people/publishers/${publisher.id}`;

  return <>a</>;

  // return (
  //   <ListStyled>
  //     {publishers.map((publisher) => (
  //       <li key={publisher.id}>
  //         <ItemStyled
  //           to={navigateToPublisher(publisher)}
  //           selected={checkPathname(publisher)}
  //         >
  //           <ItemIconContainer>
  //             <Icon size="icon-x-large" icon="person" />
  //           </ItemIconContainer>
  //           <ItemTextContainer>
  //             <ItemName>{publisher.displayName}</ItemName>
  //             <ItemSubText>Developer</ItemSubText>
  //           </ItemTextContainer>
  //           <ItemArrowContainer>
  //             <Icon size="icon-x-large" icon="chevron_right" />
  //           </ItemArrowContainer>
  //         </ItemStyled>
  //       </li>
  //     ))}
  //   </ListStyled>
  // );
}
