import {React, render} from '../src/imports';
import {WSHeader, WSDropdown, WSNotification, WSDatePicker, WSInlineEdit, WSWeekPicker} from '../src/index';
import './index.scss';

// Used to enable React Developer Tools
window.React = React;

render(
  <div>
    <WSHeader
      title="Demo Page"
      links={[
        {label: 'Link', value: 'LinkValue', onclick: value => alert(value)}
      ]}
    />
    <div className="container">
      <br />
      <WSDatePicker onChange={date => alert('New Date:', date)} value={Date.now()} />
      <br />
      <br />
      <WSWeekPicker onChange={({year, week}) => alert('New week selected:', week, year)} />
      <br />
      <br />
      <WSDropdown
        text="item 2"
        type="select"
        items={[
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
                  'item 2.3.4'
                ]
              }
            ]
          },
          'item 3',
          'item 4',
          'item 5',
          'item 6'
        ]}
      />
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
            <td><WSInlineEdit text="Some text to check" onUpdate={text => alert(text)} /></td>
            <td><WSInlineEdit text="Some text to check" onUpdate={text => alert(text)} /></td>
            <td><WSInlineEdit text="Some text to check" onUpdate={text => alert(text)} /></td>
            <td><WSInlineEdit text="Some text to check" onUpdate={text => alert(text)} /></td>
          </tr>
          <tr>
            <td><WSInlineEdit text="Some text to check" onUpdate={text => alert(text)} /></td>
            <td><WSInlineEdit text="Some text to check" onUpdate={text => alert(text)} /></td>
            <td colSpan="2"><WSInlineEdit text="Some text to check" onUpdate={text => alert(text)} /></td>
          </tr>
          <tr>
            <td><WSInlineEdit text="Some text to check" onUpdate={text => alert(text)} /></td>
            <td colSpan="3"><WSInlineEdit text="Some text to check" onUpdate={text => alert(text)} /></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
, document.querySelector('#app-holder'));
