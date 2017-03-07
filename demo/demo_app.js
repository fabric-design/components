import { React, render } from '../components/imports';
import { WSHeader } from '../components/ws-header/';
import { WSNotification } from '../components/ws-notification/';
//import { WSDatePicker } from '../components/ws-date-picker/';
import { WSDropdown } from '../components/ws-dropdown/';
import './index.scss';

// Used to enable React Developer Tools
window.React = React;

render(
  <div>
    <WSHeader title='Demo Page' links={[
      { label: 'Link', value: 'LinkValue', onclick: (value) => console.log(value) }
    ]} />
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
    <WSNotification/>
  </div>
, document.querySelector('#app-holder'));
