/* eslint no-console: 'off' */
import {React, render} from '../src/imports';
import {WSHeader, WSDropdown, WSNotification, WSDatePicker, WSInlineEdit, WSWeekPicker, WSTilesChart, WSTabMenu} from '../src/index';
import {dashboardMockData} from './mockdata';
import './index.scss';

// Used to enable React Developer Tools
window.React = React;

render(
  <div>
    <WSHeader
      appName="Demo Page"
      clientId="stups_abba-frontend-release_180e00be-2b66-4e44-ac95-37f10068c015"
      links={[
        {label: 'Link', href: '#LinkValue', onClick: value => console.log(value)},
        {
          label: 'Link2',
          href: '#2222',
          isCurrent: true,
          children: [
            {label: 'Sub link 1', href: '#Go go app 1'},
            {label: 'Sub link 1', href: '#Go go app 1'}
          ]
        },
        {
          label: 'Link3',
          href: '#33333',
          children: [
            {label: 'Sub link 1', href: '#Go go app 1'},
            {label: 'Sub link 1', href: '#Go go app 1'},
            {label: 'Sub link 1', href: '#Go go app 1'},
            {label: 'Sub link 1', href: '#Go go app 1'},
            {label: 'Sub link 1', href: '#Go go app 1'},
            {label: 'Sub link 1', href: '#Go go app 1'},
            {label: 'Sub link 1', href: '#Go go app 1'},
            {label: 'Sub link 2', href: '#Go go app 2'}
          ]
        }
      ]}
    />
    <div className="container">
      <WSTabMenu items={[{label: 'This is the name of a long Tab 1', value: 1}, {label: 'Tab 2', value: 2}, {label: 'Another long Tab 3 name', value: 3}]} onChange={value => console.log(value)} />
      <br />
      <WSDatePicker onChange={date => console.log('New Date:', date)} value={Date.now()} />
      <br />
      <br />
      <WSWeekPicker onChange={({week}) => console.log('New week selected:', week)} />
      <br />
      <br />
      <WSDropdown
        text="Multiple" type="button" width="500px" placeholder="Filter values.." selectAll filterable multiple items={[
          'New',
          'New From Template',
          'Open',
          'Test value 1',
          'Open Recent',
          'Save'
        ]}
      />
      <br />
      <WSDropdown
        text="Simple Wide" type="select" items={[
          'New',
          {
            label: 'New From Template',
            children: [
              'item 2.1',
              {
                label: 'item 2.2',
                children: [
                  'item 2.3.1',
                  'item 2.3.2',
                  'item 2.3.3',
                  'item 2.3.4'
                ]
              }
            ]
          },
          'Open',
          'Open Recent',
          'Save'
        ]}
      />
      <br />
      <WSDropdown
        text="Simple Wide" type="select" filterable items={[
          'New',
          {
            label: 'New From Template',
            children: [
              'item 2.1',
              {
                label: 'item 2.2',
                children: [
                  'item 2.3.1',
                  'item 2.3.2',
                  'item 2.3.3',
                  'item 2.3.4'
                ]
              }
            ]
          },
          'Open',
          'Open Recent',
          'Save'
        ]}
      />
      <br />
      <WSDropdown text="Input" type="select" width="50%" placeholder="tasd" value="222" inputOnly />
      <br />
      <WSNotification />
      <br />
      <div style={{width: '60%'}}>
        <WSInlineEdit text="Some text to check" />
      </div>
      <br />
      <table style={{width: '50%'}}>
        <tbody>
          <tr>
            <td><WSInlineEdit text="Some text to check" onUpdate={text => console.log(text)} /></td>
            <td><WSInlineEdit text="Some text to check" onUpdate={text => console.log(text)} /></td>
            <td><WSInlineEdit text="Some text to check" onUpdate={text => console.log(text)} /></td>
            <td><WSInlineEdit text="Some text to check" onUpdate={text => console.log(text)} /></td>
          </tr>
          <tr>
            <td><WSInlineEdit text="Some text to check" onUpdate={text => console.log(text)} /></td>
            <td><WSInlineEdit text="Some text to check" onUpdate={text => console.log(text)} /></td>
            <td colSpan="2"><WSInlineEdit text="Some text to check" onUpdate={text => console.log(text)} /></td>
          </tr>
          <tr>
            <td><WSInlineEdit text="Some text to check" onUpdate={text => console.log(text)} /></td>
            <td colSpan="3"><WSInlineEdit text="Some text to check" onUpdate={text => console.log(text)} /></td>
          </tr>
        </tbody>
      </table>
      <br />
      <WSTilesChart title="Chart title" data={dashboardMockData.data} width={100} height={100} />
    </div>
  </div>
  , document.querySelector('#app-holder'));
