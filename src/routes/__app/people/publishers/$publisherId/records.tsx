import React from 'react';

import DataGrid from 'react-data-grid';

export default function PublisherRecords() {
  const columns = [
    { key: 'id', name: 'ID' },
    { key: 'title', name: 'Title' },
  ];

  const rows = [
    { id: 0, title: 'Example' },
    { id: 1, title: 'Demo' },
  ];

  return <DataGrid columns={columns} rows={rows} />;
}
