import { firestore } from 'firebase-admin';

import type { CongregationEntity } from '~/entities/congregation';
import type { EventEntity } from '~/entities/event';

import { getAllData, getData } from '../../common.server';

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
}): Promise<CongregationEntity> => {
  const eventDoc = await firestore()
    .collection('congregation')
    .doc(congregationId)
    .collection('events')
    .doc(eventId)
    .get();

  return getData(eventDoc);
};

// export const newCongregation = async ({
//   congregation,
//   displayName,
//   email,
//   permissions,
// }: {
//   congregation: CongregationEntity;
//   displayName?: string;
//   email: string;
//   permissions: Permissions;
// }) => {
//   const congregationSaved = await firestore()
//     .collection('congregation')
//     .add(congregation);

//   await congregationSaved.collection('publishers').add({
//     name: displayName,
//     displayName,
//     permissions,
//     email,
//   });

//   return congregationSaved.get();
// };

// export const saveCongregation = async ({
//   congregation,
//   congregationId,
// }: {
//   congregation: CongregationEntity;
//   congregationId: string;
// }) => {
//   return firestore()
//     .collection('congregation')
//     .doc(congregationId)
//     .set(congregation);
// };

// export const findCongregationByNumber = async ({
//   number,
// }: {
//   number: number;
// }) => {
//   const {
//     empty,
//     docs: [findedCongregation],
//   } = await firestore()
//     .collection('congregation')
//     .where('number', '==', number)
//     .get();

//   return !empty && findedCongregation;
// };
