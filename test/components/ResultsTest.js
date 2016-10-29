import React from 'react';
import { shallow } from 'enzyme';
import Results from 'components//Results.js';

describe('<Results />', () => {

  let component;
  beforeEach(() => {
    component = shallow(<Results />);
  });

  describe('when rendering the component', () => {

    it('should have a className of "results-component"', () => {
      expect(component.hasClass('results-component')).to.equal(true);
    });
  });
});
