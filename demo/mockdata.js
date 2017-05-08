export const dashboardMockData = {
  data: {
    groups: [{
      key: 'lessThan2h',
      tilesSet: [{key: '1'}, {key: '2'}, {key: '3'}, {key: '4'}, {key: '5'}]
    },
      {
        key: 'from2hTo1Day',
        tilesSet: [{key: '6'}, {key: '7'}, {key: '8'}, {key: '9'}, {key: '10'}]
      },
      {
        key: 'moreThan1Day',
        tilesSet: [{key: '11'}, {key: '12'}, {key: '13'}, {key: '14'},
          {key: '15'}, {key: '15'}]
      }]
  },
  config: {
    groupConfigs: [
      {key: 'lessThan2h', backgroundColor: '#FF4D4D'},
      {key: 'from2hTo1Day', backgroundColor: '#ffcc33'},
      {key: 'moreThan1Day', backgroundColor: '#39AC39'}
    ]
  }
}
