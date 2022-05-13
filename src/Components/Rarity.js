import React from 'react';

export default function Rarity(props) {
  let classGrade =
    (props.active ? 'active ' : '') + 'rarity-box ' + props.rarity;
  return (
    <button
      className={classGrade}
      onClick={() => {
        props.setChoice(props.grade);
      }}
    >
      <div className='strong'>{props.rarity}</div>
      <div>({props.grade})</div>
    </button>
  );
}
