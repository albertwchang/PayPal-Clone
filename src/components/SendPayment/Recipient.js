/**
 * Created by albertwchang on 10/30/16.
 */
import React, { Component, PropTypes } from 'react';
import emailChecker from 'email-validator';

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
    const $el = $('div [name="recipient"]');
    var settings;
    const baseSettings = {
      container: 'body',
      html: false,
      placement: 'right',
      trigger: 'manual'
    };

    // 1. Cannot list oneself
    // 2. email address has to be complete
    if (email === this.props.myEmail) {
      settings = Object.assign({
        content: 'Cannot send payment to yourself'
      }, baseSettings);
    } else if (email && !emailChecker.validate(email)){
      settings = Object.assign({
        content: 'Invalid email'
      }, baseSettings);
    } else {
      settings = baseSettings;
    }

    $el.popover(settings)
      .on('hide.bs.popover', (e) => $(this).popover('destroy'))
      .popover(settings['content'] ? 'show' : 'hide');
  }

  render() {
    const { recipientEmail } = this.props;

    return (
      <div className="form-group" name="recipient">
        <div className="input-group input-group-lg">
          <span className="input-group-addon" id="recipient">
            <i className="fa fa-user"></i>
          </span>
          <input placeholder="eg. erlich_bachman@aviato.com"
            className="form-control" type="text" value={recipientEmail}
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
    recipientEmail: PropTypes.string.isRequired,
    onUpdateParam: PropTypes.func.isRequired
  }
});

export default Recipient;
