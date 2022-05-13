import React from 'react';

export default function Wishes(props) {
  return (
    <div className='wishes-box'>
      <div className='name'>{props.object.name}</div>
      <div className='box-number'>{props.object.value}</div>
      <div className='wishes-buttons'>
        <button
          className='wishes-buttons'
          onClick={() => props.adjustObjective(props.object, 'add')}
        >
          +
        </button>
        <button
          className='wishes-buttons'
          onClick={() => props.adjustObjective(props.object, 'subtract')}
        >
          -
        </button>
      </div>
    </div>
  );
}
