import { firestore } from 'firebase-admin';
import type {
  DocumentData,
  DocumentReference,
  WriteResult,
} from 'firebase-admin/firestore';

import type { EventEntity } from '~/entities/event';

import { getAllData, getData } from '../../common.server';
import { NotFoundError } from '../../throws-errors';

export async function listEvents({
  congregationId,
}: {
  congregationId: string;
}): Promise<Array<EventEntity>> {
  const eventList = await firestore()
    .collection('congregation')
    .doc(congregationId)
    .collection('events')
    .get();

  return getAllData(eventList, { includeId: true });
}

export async function getEvent({
  congregationId,
  eventId,
}: {
  congregationId: string;
  eventId: string;
}): Promise<EventEntity> {
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
}

export async function saveEvent(data: {
  event: EventEntity;
  eventId: 'new';
  congregationId: string;
}): Promise<DocumentReference<DocumentData>>;

export async function saveEvent(data: {
  event: EventEntity;
  eventId: string;
  congregationId: string;
}): Promise<DocumentReference<WriteResult>>;

export async function saveEvent({
  event,
  eventId,
  congregationId,
}: {
  event: EventEntity;
  eventId: string;
  congregationId: string;
}) {
  const colection = firestore()
    .collection('congregation')
    .doc(congregationId)
    .collection('events');

  if (eventId === 'new') {
    return colection.add(event);
  }

  return colection.doc(eventId).set(event);
}
