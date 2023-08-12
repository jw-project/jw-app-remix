import { NotFoundError, sendReturnMessage } from '~/services/api/throws-errors';

export const loader = () => {
  try {
    throw new NotFoundError();
  } catch (error) {
    throw sendReturnMessage(error);
  }
};
