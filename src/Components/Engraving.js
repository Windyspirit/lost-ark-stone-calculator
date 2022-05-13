import React from 'react';

export default function Engraving(props) {
  const displaySequence = (grade, stateSequence = []) => {
    let displayArray = [...stateSequence];
    while (displayArray.length < grade) {
      displayArray.push('empty');
    }
    while (displayArray.length > grade) {
      displayArray.pop();
    }
    return displayArray;
  };
  return (
    <div className='engraving-row'>
      <div className='engraving-list'>
        {displaySequence(props.grade, props.state).map((item) => {
          let classResult = 'engraving-box ' + item;
          return (
            <div className={classResult}>
              <div className='engraving-try'>
                <div className='engraving-count'>
                  <div className='engraving-fail-ext'>
                    <div className='engraving-fail-int'></div>
                  </div>
                </div>
              </div>
              <div className='engraving-result'>
                {item === 'success' ? '+1' : '+o'}
              </div>
            </div>
          );
        })}
      </div>
      <div className='engraving-block-probabilities'>
        <div className='engraving-probability margin-left1em'>
          {props.probability(props.row)}
        </div>
        <button
          className='engraving-success button margin-left1em'
          onClick={() => props.engravingAction('success', props.row)}
        >
          <div>success</div>
        </button>
        <button
          className='engraving-failure button margin-left1em'
          onClick={() => props.engravingAction('failure', props.row)}
        >
          <div>failure</div>
        </button>
        {props.suggestedAction && (
          <div className='engraving-suggested-action margin-left1em'>
            <h2>&#9733;</h2>
          </div>
        )}
      </div>
    </div>
  );
}
