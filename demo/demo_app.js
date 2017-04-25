import {React, render} from '../src/imports';
import {WSHeader, WSDropdown, WSNotification, WSDatePicker, WSInlineEdit, WSWeekPicker} from '../src/index';
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
      <WSDropdown text="Multiple" type="select" placeholder="Filter values.." filterable multiple items={[
        'New',
        'New From Template',
        'Open',
        'Test value 1',
        'Open Recent',
        'Save'
      ]} />
      <br />
      <WSDropdown text="Simple" type="select" items={[
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
                'item 2.3.4',
              ]
            }
          ]
        },
        'Open',
        'Open Recent',
        'Save'
      ]} />
      <br />
      <WSDropdown text="Input" type="select" placeholder="tasd" value="222" inputOnly />
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
    </div>
  </div>
, document.querySelector('#app-holder'));
