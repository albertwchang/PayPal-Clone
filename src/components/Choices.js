import React, { PropTypes } from 'react';
import './../containers/app.css';

const ChoicesComp = (props) => {
  const { children: [header, footer], onChangeView, views } = props;
  return (
    <div className='panel panel-primary'>
      {header('What Are We Doing?')}
      <div className="panel-body">{
        views.map(view =>
          <div key={view.name} className="form-group text-center">
            <button className="btn btn-default btn-lg btn-block active"
              type="submit" onClick={(e) => onChangeView(view.name)}>{view.action}</button>
          </div>
        )
      }
      </div>
      {footer()}
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
