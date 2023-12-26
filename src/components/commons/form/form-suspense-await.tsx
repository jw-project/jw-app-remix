import { Suspense } from 'react';

import { Await, type AwaitProps } from '@remix-run/react';

export type EntityForm<Entity> = {
  id: string;
  data?: Entity;
  disabled?: boolean;
};

export function FormSuspenseAwait<Resolve>({
  form: FormAbstract,
  id,
  resolve,
}: {
  form: (props: EntityForm<Awaited<Resolve>>) => JSX.Element;
  id: string;
  resolve: AwaitProps<Resolve>['resolve'];
}) {
  return (
    <Suspense fallback={<FormAbstract id="loading" disabled />} key={id}>
      <Await resolve={resolve} errorElement={<>erro</>}>
        {(event) => <FormAbstract data={event} id={id} />}
      </Await>
    </Suspense>
  );
}
