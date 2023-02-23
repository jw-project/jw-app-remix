import React from 'react';

import { useHorizontalScroll } from '~/hooks/horizontal-scroll';

import type { TabProp } from './tabs-styled';
import {
  TabsStyled, TabStyled, TabLinkStyled, TabIconStyled,
} from './tabs-styled';

export function Tabs(props: React.PropsWithChildren) {
  const scrollRef = useHorizontalScroll();

  return <TabsStyled {...props} ref={scrollRef} />;
}

export function Tab({
  title, to, icon, selected, disabled,
}: TabProp) {
  return (
    <TabStyled>
      <TabLinkStyled
        to={disabled ? '#' : to}
        selected={selected}
        $disabled={Boolean(disabled)}
      >
        {icon && (
          <TabIconStyled
            icon={icon}
            size="icon-x-small"
            selected={selected}
            $disabled={Boolean(disabled)}
          />
        )}
        {title}
      </TabLinkStyled>
    </TabStyled>
  );
}
