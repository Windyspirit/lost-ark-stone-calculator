import './App.scss';
import Rarity from './Components/Rarity';
import Wishes from './Components/Wishes';
import Engraving from './Components/Engraving';
import React, { useState, useEffect } from 'react';

function App() {
  let rarityGrade = [
    ['Rare', 6],
    ['Epic', 8],
    ['Legendary', 9],
    ['Relic', 10],
  ];
  let testSequence = [
    ['success', 'failure', 'success', 'failure', 'success', 'empty'],
    ['success', 'success', 'success', 'failure', 'failure', 'aaaaaaa'],
    ['success', 'failure', 'aaaaaaa', 'failure', 'success', 'failure'],
  ];
  const setEngravingsGrade = (newGrade) =>
    setEngravingsSequence({
      ...engravingsSequence,
      engravingsGrade: newGrade,
    });
  const setWishes = (wish, action) => {
    if (action === 'add' && wish.value < engravingsSequence.engravingsGrade) {
      wish.value += 1;
      engravingsSequence.wishes.map((stateWish) => {
        if (stateWish.name === wish.name) {
          setEngravingsSequence({
            ...engravingsSequence,
          });
        }
      });
    } else if (action === 'subtract' && wish.value > 0) {
      wish.value -= 1;
      engravingsSequence.wishes.map((stateWish) => {
        if (stateWish.name === wish.name) {
          setEngravingsSequence({
            ...engravingsSequence,
          });
        }
      });
    }
  };
  const unsetEngravingsSuccessPercentage = (ancientResult) => {
    engravingsSequence.successPercentage = ancientResult;
  };
  const setEngravingsSuccessPercentage = (result) => {
    if (result === 'failure') {
      if (engravingsSequence.successPercentage < 75) {
        engravingsSequence.successPercentage += 10;
      }
    } else if (result === 'success') {
      if (engravingsSequence.successPercentage > 25) {
        engravingsSequence.successPercentage -= 10;
      }
    } else {
      console.log('wrong entry in setEngravingsSuccesPercentage');
    }
  };
  const addToGlobalSequence = (result, row) => {
    if (
      engravingsSequence.engravingList[row].length <
      engravingsSequence.engravingsGrade
    ) {
      setEngravingsSuccessPercentage(result);
      engravingsSequence.engravingList[row].push(result);
      engravingsSequence.globalSequence.push([
        row,
        result,
        engravingsSequence.successPercentage,
      ]);
      setEngravingsSequence({
        ...engravingsSequence,
      });
    }
  };
  const undoLastAction = () => {
    if (
      engravingsSequence.engravingList.length > 0 &&
      engravingsSequence.globalSequence.length > 0
    ) {
      engravingsSequence.engravingList[
        engravingsSequence.globalSequence[
          engravingsSequence.globalSequence.length - 1
        ][0]
      ].pop();
      engravingsSequence.globalSequence.pop();
      if (engravingsSequence.globalSequence.length > 0) {
        unsetEngravingsSuccessPercentage(
          engravingsSequence.globalSequence[
            engravingsSequence.globalSequence.length - 1
          ][2]
        );
      } else {
        unsetEngravingsSuccessPercentage(75);
      }
      setEngravingsSequence({
        ...engravingsSequence,
      });
    }
  };
  const resetSettings = () => {
    setEngravingsSequence({
      engravingsGrade: 6,
      successPercentage: 75,
      wishes: [
        {
          name: '1st-row-min',
          value: 0,
        },
        {
          name: '2nd-row-min',
          value: 0,
        },
        {
          name: '3rd-row-min',
          value: 0,
        },
      ],
      engravingList: [[], [], []],
      globalSequence: [],
    });
  };
  const initialState = {
    engravingsGrade: 6,
    successPercentage: 75,
    wishes: [
      {
        name: '1st-row-min',
        value: 0,
      },
      {
        name: '2nd-row-min',
        value: 0,
      },
      {
        name: '3rd-row-min',
        value: 0,
      },
    ],
    engravingList: [[], [], []],
    globalSequence: [],
  };
  const [engravingsSequence, setEngravingsSequence] = useState(initialState);
  const recurse = (nbReussite, nbEssaiRestant, objectiveRow) => {
    if (nbEssaiRestant === 0) {
      return;
    }
    let probability;

    return probability;
  };
  const computeProbability = (row) => {
    let nbReussite = 0;
    engravingsSequence.engravingList[row].map((item) => {
      if (item === 'success') {
        nbReussite++;
      }
    });
    let nbEssaiRestant =
      engravingsSequence.engravingsGrade -
      engravingsSequence.engravingList[row].length;
    let objectiveRow = engravingsSequence.wishes[row].value;
    let rowProbability = recurse(nbReussite, nbEssaiRestant, objectiveRow);
    return rowProbability;
  };
  return (
    <div className='App'>
      <div className='title'>
        <h1>Ability Stone Calculator</h1>
      </div>
      <div className='calculator-frame'>
        <div className='engraving-choices'>
          <div className='rarity'>
            <h3>Rarity Stone Grade</h3>
            <div className='rarity-list'>
              {rarityGrade.map((grade) => (
                <Rarity
                  rarity={grade[0]}
                  grade={grade[1]}
                  setChoice={setEngravingsGrade}
                  active={grade[1] === engravingsSequence.engravingsGrade}
                />
              ))}
            </div>
            <div style={{ marginTop: '1em' }}>
              <h4>Next Action: {engravingsSequence.successPercentage}%</h4>
            </div>
          </div>
          <div className='wishes'>
            <h3>Engraving Objectives</h3>
            <div className='wishes-list'>
              {engravingsSequence.wishes.map((wish) => (
                <Wishes object={wish} adjustObjective={setWishes} />
              ))}
            </div>
          </div>
        </div>
        <div className='engraving-window'>
          {engravingsSequence.engravingList.map((list) => (
            <Engraving
              grade={engravingsSequence.engravingsGrade}
              state={list}
              suggestedAction={false}
              engravingAction={addToGlobalSequence}
              row={engravingsSequence.engravingList.indexOf(list)}
              probability={computeProbability}
            />
          ))}
        </div>
      </div>
      <div>
        <button className='button' onClick={() => resetSettings()}>
          Reset settings
        </button>
        <button className='button' onClick={() => undoLastAction()}>
          Undo last action
        </button>
      </div>
    </div>
  );
}

export default App;
