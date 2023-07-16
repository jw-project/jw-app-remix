import { useLoaderData, useNavigate } from '@remix-run/react';

import { Card } from '~/components/commons/card';
import { Form } from '~/components/commons/form/form';
import { Input } from '~/components/commons/form/input';
import { Select } from '~/components/commons/form/select';
import { TextArea } from '~/components/commons/form/text-area';
import { Col, Grid } from '~/components/commons/grid';
import { Subtitle } from '~/components/commons/typography';
import { weekOptions } from '~/entities/week';
import { useTranslation } from '~/i18n/i18n';
import type { CongregationActionSaveResponse } from '~/routes/api/congregation/save';
import type { CongregationLoaderReturn } from '~/server-routes/__app/congregation';
import { congregationFormSchema as schema } from '~/services/api/congregation/validations';

export { loader } from '~/server-routes/__app/congregation';

export default function Congregation() {
  const { translate } = useTranslation('routes.congregation');
  const { congregation } = useLoaderData<CongregationLoaderReturn>();
  const navigate = useNavigate();

  const onSuccess = (e: CongregationActionSaveResponse) => {
    if (e.needReload) {
      navigate('.', { replace: true });
    }
  };

  return (
    <Card>
      <Form
        schema={schema}
        defaultValues={congregation}
        api="api/congregation/save"
        onFormApiSuccess={onSuccess}
      >
        <Grid cols={2}>
          <Col>
            <Input name="id" label={translate('id')} disabled />
          </Col>
          <Col>
            <Input name="name" label={translate('name')} />
          </Col>
          <Col>
            <Input name="number" label={translate('number')} type="number" />
          </Col>
          <Col>
            <TextArea name="address" label={translate('address')} />
          </Col>
          <Col>
            <Select
              name="midweekMeetingDay"
              label={translate('midweek-meeting-day')}
              options={weekOptions()}
            />
          </Col>
          <Col>
            <Select
              name="weekendMeetingDay"
              label={translate('weekend-meeting-day')}
              options={weekOptions()}
            />
          </Col>
          <Col>
            <Input
              name="midweekMeetingTime"
              label={translate('midweek-meeting-time')}
              type="time"
            />
          </Col>
          <Col>
            <Input
              name="weekendMeetingTime"
              label={translate('weekend-meeting-time')}
              type="time"
            />
          </Col>
          <Col colSpan={2}>
            <Subtitle>{translate('online-meeting-subtitle')}</Subtitle>
          </Col>
          <Col>
            <Input
              name="onlineMeetingSoftware"
              label={translate('online-meeting-software')}
            />
          </Col>
          <Col>
            <Input
              name="onlineMeetingId"
              label={translate('online-meeting-id')}
            />
          </Col>
          <Col>
            <Input
              name="onlineMeetingDialNumber"
              label={translate('online-meeting-dial-number')}
            />
          </Col>
          <Col>
            <Input
              name="onlineMeetingPassword"
              label={translate('online-meeting-password')}
            />
          </Col>
          <Col>
            <Input
              name="onlineMeetingLink"
              label={translate('online-meeting-link')}
            />
          </Col>
          <Col colSpan={2}>
            <Subtitle>{translate('circuit-subtitle')}</Subtitle>
          </Col>
          <Col>
            <Input name="circuitName" label={translate('circuit-name')} />
          </Col>
          <Col>
            <Input
              name="circuitOverseerName"
              label={translate('circuit-overseer-name')}
            />
          </Col>
          <Col>
            <Input
              name="circuitOverseerContact"
              label={translate('circuit-overseer-contact')}
            />
          </Col>
          <Col />
        </Grid>
      </Form>
    </Card>
  );
}
