import React from 'react';
import { shallow } from 'enzyme';
import SendMoney from 'components//SendMoney.js';

describe('<SendMoney />', () => {

  let component;
  beforeEach(() => {
    component = shallow(<SendMoney />);
  });

  describe('when rendering the component', () => {

    it('should have a className of "sendmoney-component"', () => {
      expect(component.hasClass('sendmoney-component')).to.equal(true);
    });
  });
});
