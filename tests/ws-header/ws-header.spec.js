import {React, render} from '../../src/imports';
import {WSHeader} from '../../src/index';
import jasmineEnzyme from 'jasmine-enzyme';
import { shallow, mount } from 'enzyme';

describe('Test: <WS-Header />', () => {
  // this is just a placeholder
  beforeEach(() => {
    jasmineEnzyme();
  });

  it('should render component', () => {
    const header = shallow(<WSHeader />);
    expect(header).toBePresent();
  });

  it('should initialize with custom title', () => {
    const header = mount(<WSHeader title="Awesome Header" />);
    expect(header).toHaveProp('title');
    expect(header).toHaveProp('title', 'Awesome Header');
    expect(header.find('.navigation-wrapper > a > span')).toHaveText('Awesome Header');
  })
});
