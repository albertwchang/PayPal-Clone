import React, { PropTypes } from 'react';
import './app.css';

const ChoicesComp = (props) => {
  const { onChangeView, views } = props;
  return (
    <div className="container-fluid">
      <div className="col-sm-6 col-sm-offset-3">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h2 className="panel-title text-center">What are we doing?</h2>
          </div>
          <div className="panel-body">{
            views.map(view =>
              (<div key={view.name} className="form-group text-center">
                <button type="submit" className="btn btn-primary btn-lg btn-block"
                  onClick={(e) => onChangeView(view.name)}>{view.title}</button>
              </div>)
            )
          }
          </div>
        </div>
      </div>
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
