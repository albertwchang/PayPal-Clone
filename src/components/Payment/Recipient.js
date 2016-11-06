/**
 * Created by albertwchang on 10/30/16.
 */
import React, { Component, PropTypes } from 'react';
import emailChecker from 'email-validator';
var $el;

// Helper functions
class Recipient extends React.Component {
  constructor(props) {
    super(props);
    this.onSetRecipient = this.onSetRecipient.bind(this);
    this.validateRecipient = this.validateRecipient.bind(this);
  }

  onSetRecipient(el) {
    const { onUpdateParam } = this.props;
    const email = el.target.value.trim();
    onUpdateParam('recipientId', email);
  }

  validateRecipient(el) {
    const email = el.target.value;
    var content = '';
    const baseSettings = {
      container: 'body',
      html: false,
      placement: 'right',
      trigger: 'manual'
    };

    // 1. Cannot list oneself
    // 2. email address has to be complete
    if (email === this.props.myEmail) {
      content = 'Cannot send payment to yourself';
    } else if (email && !emailChecker.validate(email)){
      content = 'Invalid email';
    }

    const settings = Object.assign({content}, baseSettings);

    if (settings['content'] === '') {
      $el && $el.popover('hide');
    } else {
      if (!$el) {
        $el = $(el.currentTarget);
      }

      $el.popover(settings)
        .on('hide.bs.popover', (e) => $(this).popover('destroy'))
        .popover('show');
    }
  }

  render() {
    const { emailTo } = this.props;

    return (
      <div className="form-group" name="recipient">
        <div className="input-group input-group-lg">
          <span className="input-group-addon" id="recipient">
            <i className="fa fa-user"></i>
          </span>
          <input placeholder="eg. erlich_bachman@aviato.com"
            className="form-control" type="text" value={emailTo}
            onChange={this.onSetRecipient} onBlur={this.validateRecipient}></input>
        </div>
      </div>
    );
  }
}

Object.assign(Recipient, {
  displayName: 'Payment Recipient',
  PropTypes: {
    myEmail: PropTypes.string.isRequired,
    emailTo: PropTypes.string.isRequired,
    onUpdateParam: PropTypes.func.isRequired
  }
});

export default Recipient;
