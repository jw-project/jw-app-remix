import { firestore } from 'firebase-admin';

import type { EventEntity } from '~/entities/event';

import { getAllData, getData } from '../../common.server';
import { NotFoundError } from '../../throws-errors';

export const listEvents = async ({
  congregationId,
}: {
  congregationId: string;
}): Promise<Array<EventEntity>> => {
  const eventList = await firestore()
    .collection('congregation')
    .doc(congregationId)
    .collection('events')
    .get();

  return getAllData(eventList, { includeId: true });
};

export const getEvent = async ({
  congregationId,
  eventId,
}: {
  congregationId: string;
  eventId: string;
}): Promise<EventEntity> => {
  const eventDoc = await firestore()
    .collection('congregation')
    .doc(congregationId)
    .collection('events')
    .doc(eventId)
    .get();

  if (!eventDoc.exists) {
    throw new NotFoundError();
  }

  return getData(eventDoc);
};

export const saveEvent = async ({
  event,
  eventId,
  congregationId,
}: {
  event: EventEntity;
  eventId: string;
  congregationId: string;
}) => {
  return firestore()
    .collection('congregation')
    .doc(congregationId)
    .collection('events')
    .doc(eventId)
    .set(event);
};
