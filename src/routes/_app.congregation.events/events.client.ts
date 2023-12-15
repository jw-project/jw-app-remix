import axios from 'axios';

import type { EventEntity } from '~/entities/event';

export const deleteEvents = async (events: Array<EventEntity>) => {
  return Promise.all(
    events.map((event) =>
      axios.delete(`/api/congregation/events/${event.id}/delete`),
    ),
  );
};
