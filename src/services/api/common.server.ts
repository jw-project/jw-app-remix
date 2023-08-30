import type {
  DocumentData,
  DocumentSnapshot,
  QuerySnapshot,
} from 'firebase-admin/firestore';

export const getAllData = <T>(
  snap: QuerySnapshot<DocumentData>,
  { includeId }: { includeId: boolean } | undefined = { includeId: true },
) =>
  snap.docs.map((e) => {
    const obj = e.data();
    if (includeId) {
      obj.id = e.id;
    }

    return obj;
  }) as T;

export const getData = <T>(snap: DocumentSnapshot<DocumentData>) =>
  ({ ...snap.data(), id: snap.id }) as T;
