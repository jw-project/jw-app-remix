import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from '@remix-run/react';
import { w } from 'windstitch';

import { useTranslation } from '~/hooks/use-translation';

import { Button } from '../commons/button';
import deny from './deny.jpg';
import error from './error.jpg';

const ErrorWrapper = w.div(`
  flex
  items-center
  justify-center
  w-auto
`);

const ErrorColumn = w.div(`
  lg:gap-4
  lg:flex
`);

const ErrorColumnText = w.div(`
  flex
  flex-col
  items-center
  justify-center
  py-1
  lg:py-24
`);

const ErrorStatusCode = w.h1(`
  text-7xl
  font-bold
  text-blue-600
  dark:text-blue-400
`);

const ErrorTitle = w.p(`
  mb-2
  text-2xl
  font-bold
  text-center
  text-gray-800
  dark:text-gray-100
`);

const ErrorParagraph = w.p(`
  mb-8
  text-center
  text-lg
  text-gray-500
`);

const images: Record<number, string> = {
  400: error,
  401: deny,
  403: deny,
  404: error,
};

const BaseErrorScreen = ({
  status,
  message,
}: {
  status: number;
  message: string;
}) => {
  const { translate } = useTranslation();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('./');
  };

  return (
    <div>
      <ErrorWrapper>
        <ErrorColumn>
          <ErrorColumnText>
            <ErrorStatusCode>{status}</ErrorStatusCode>
            <ErrorTitle>
              <span className="text-red-500 dark:text-red-400">
                {translate('common.errors.error-title')}
              </span>{' '}
              {translate(message)}
            </ErrorTitle>
            <ErrorParagraph>
              {translate(`common.errors.${status}-description`)}
            </ErrorParagraph>
            <Button onClick={handleGoBack}>
              {translate('common.go-back')}
            </Button>
          </ErrorColumnText>
          <div className="mt-4">
            <img
              src={images[status]}
              alt="error-img"
              className="object-cover w-full h-full"
            />
          </div>
        </ErrorColumn>
      </ErrorWrapper>
    </div>
  );
};

export function ErrorScreen() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <BaseErrorScreen status={error.status} message={error.data.message} />
    );
  }

  return <BaseErrorScreen status={400} message={'common.errors.bad-request'} />;
}
