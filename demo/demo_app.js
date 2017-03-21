import {React, render} from '../src/imports';
import {WSHeader, WSDropdown, WSNotification, WSDatePicker, WSWeekPicker} from '../src/index';
import './index.scss';

// Used to enable React Developer Tools
window.React = React;

render(
  <div>
    <WSHeader title='Demo Page' links={[
      { label: 'Link', value: 'LinkValue', onclick: (value) => console.log(value) }
    ]} />
    <div className="container">
      <br />
      <WSDatePicker onChange={(date) => console.log('New Date:', date)} value={Date.now()} />
      <br />
      <br />
      <WSWeekPicker onChange={({year, week}) => console.log('New week selected:', week)} />
      <br />
      <br />
      <WSDropdown text="item 2" type="select" items={[
        'item 1',
        {
          label: 'item 2',
          children: [
            'item 2.1',
            {
              label: 'item 2.2',
              children: [
                'item 2.3.1',
                'item 2.3.2',
                'item 2.3.3',
                'item 2.3.4',
              ]
            }
          ]
        },
        'item 3',
        'item 4',
        'item 5',
        'item 6'
      ]}/>
    </div>
    <WSNotification/>
  </div>
, document.querySelector('#app-holder'));
