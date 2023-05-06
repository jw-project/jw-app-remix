import React from 'react';

import { useNavigate } from '@remix-run/react';

import { CatchBoundaryComponent } from '~/components/catch-boundary';
import { Button } from '~/components/commons/button';
import { Col, Grid } from '~/components/commons/grid';
import { Paragraph } from '~/components/commons/paragraph';
import { Title } from '~/components/commons/title';
import { ContainerIndex, HeaderIndex } from '~/components/index/index-styled';
import { useTranslation } from '~/i18n/i18n';
import { useUser } from '~/matches/use-user';

export default function Index() {
  const { congregationId, email } = useUser();
  const navigate = useNavigate();
  const { translate } = useTranslation('routes.index');

  if (congregationId) {
    return (
      <HeaderIndex>
        <ContainerIndex>
          <Title>{translate('welcome')}</Title>
          <Paragraph>{translate('hope')}</Paragraph>
        </ContainerIndex>
      </HeaderIndex>
    );
  }

  const reload = () => {
    global.location.reload();
  };

  const goToCongregation = () => {
    navigate('congregation');
  };

  return (
    <HeaderIndex>
      <ContainerIndex>
        <Title>{translate('welcome')}</Title>
        <Paragraph>{translate('login-not-found')}</Paragraph>
        <Paragraph>
          {translate('include-email-in-profile', { email })}
        </Paragraph>
        <Paragraph>{translate('refresh-page')}</Paragraph>
        <Paragraph>{translate('new-congregation-text')}</Paragraph>
        <Paragraph />
        <Grid cols={2}>
          <Col className="md:justify-self-start justify-self-center">
            <Button onClick={reload} $bold>
              {translate('reload-button')}
            </Button>
          </Col>
          <Col>
            <Button onClick={goToCongregation} $buttonStyle="secondary">
              {translate('access-congregation-button')}
            </Button>
          </Col>
        </Grid>
      </ContainerIndex>
    </HeaderIndex>
  );
}

export const CatchBoundary = CatchBoundaryComponent;
