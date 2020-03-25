// field and fieldId should match the data schema for the Service model
export const editServiceSections = [
  {
    field: 'title',
    title: 'Title',
  },
  {
    field: 'description',
    title: 'Description',
  },
  {
    field: 'address',
    title: 'Location',
  },
  {
    fields: [
      {
        fieldId: 'inCall',
        fieldTitle: 'Shop-Based',
      },
      {
        fieldId: 'outCall',
        fieldTitle: 'Mobile-Based',
      },
      {
        fieldId: 'remoteCall',
        fieldTitle: 'Remote',
      },
    ],
    title: 'Location Preferences',
  },
];
