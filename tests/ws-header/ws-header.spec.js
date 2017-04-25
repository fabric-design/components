import {React, render} from 'imports';
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
    // Document: If you want to test props you need to use Mount.
    // seems like an issue with ES7 static
    const header = mount(<WSHeader title="Awesome Header" />);
    expect(header).toHaveProp('title');
    expect(header).toHaveProp('title', 'Awesome Header'); // do we really need to test prop if text is shown ?
    expect(header.find('.navigation-wrapper > a > span')).toHaveText('Awesome Header');
  });

  it('should render navigation items', () => {
    
  });


});
