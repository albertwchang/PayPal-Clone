import React from 'react';
import { shallow } from 'enzyme';
import History from 'components//History.js';

describe('<History />', () => {

  let component;
  beforeEach(() => {
    component = shallow(<History />);
  });

  describe('when rendering the component', () => {

    it('should have a className of "history-component"', () => {
      expect(component.hasClass('history-component')).to.equal(true);
    });
  });
});
