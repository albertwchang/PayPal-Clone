import React, { PropTypes } from 'react';
import './app.css';

const ChoicesComp = (props) => {
  const { onChangeView, views } = props;
  return (
    <div className="panel-body">{
      views.map(view =>
        <div key={view.name} className="form-group text-center">
          <button className="btn btn-default btn-lg btn-block active"
                  type="submit" onClick={(e) => onChangeView(view.name)}>{view.action}</button>
        </div>
      )
    }
    </div>
  );
}

Object.assign(ChoicesComp, {
  PropTypes: {
    views: PropTypes.array.isRequired,
    onChangeView: PropTypes.func.isRequired
  }
});

export default ChoicesComp;
