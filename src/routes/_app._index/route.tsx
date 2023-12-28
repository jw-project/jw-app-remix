import { useNavigate } from '@remix-run/react';

import { Button } from '~/components/commons/button';
import { Col, Grid } from '~/components/commons/grid';
import { Paragraph, Title } from '~/components/commons/typography';
import { useTranslation } from '~/hooks/use-translation';
import { useUser } from '~/hooks/use-user';

import { ContainerIndex, HeaderIndex } from './components';

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
            <Button onClick={reload} bold>
              {translate('reload-button')}
            </Button>
          </Col>
          <Col className="md:justify-self-start justify-self-center">
            <Button onClick={goToCongregation} buttonstyle="secondary">
              {translate('access-congregation-button')}
            </Button>
          </Col>
        </Grid>
      </ContainerIndex>
    </HeaderIndex>
  );
}
