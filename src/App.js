import React, { useEffect } from 'react';
import './App.css';
import Die from './components/Die'
import {GiPerspectiveDiceSixFacesThree} from 'react-icons/gi';
import Confetti from 'react-confetti';

export default function App() {

  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [num, setNum] = React.useState(1);

    useEffect(() => {
        console.log("Dice state changed")
        let count = 0;
        for(let i = 0; i < dice.length; i++){
            if((dice[0].value === dice[i].value) && (dice[i].isHeld)){
                count++;
            } else {
                return;
            }
        }
        if(count === 10){
            setTenzies(true);
        }
    }, [dice])
  
  function allNewDice() {
      const newDice = []
      for (let i = 0; i < 10; i++) {
          newDice.push({
              value: Math.ceil(Math.random() * 6),
              isHeld: false,
              id: i
          })
      }
      return newDice
  }

function rollDice() {

  setDice(prevDice => {
      let arr = []
      prevDice.map(item => {
          if(item.isHeld){
              arr.push({...item})
          }else{
              arr.push({...item, value: Math.ceil(Math.random() * 6)})
          }
      })
      return arr;
  })
  setNum(prev => prev + 1);
}
  
  function holdDice(id) {
      setDice(oldDice => oldDice.map(die => {
          return die.id === id ? 
              {...die, isHeld: !die.isHeld} :
              die
      }))
  }

  function playAgain() {
    setTenzies(false);
    setDice(allNewDice())
    setNum(1);
  }
  
  const diceElements = dice.map(die => (
      <Die 
          key={die.id} 
          value={die.value} 
          isHeld={die.isHeld} 
          holdDice={() => holdDice(die.id)}
      />
  ))
  
  return (
      <main>
          {tenzies && <Confetti />}
          <h1 className="title">{tenzies ? "Pobedili ste!" : "Tenzies"}</h1>
            <p className="instructions">{tenzies ? "" : "Bacajte sve dok kockice ne budu iste. Kliknite na svaku kockicu da biste je zamrznuli na trenutnoj vrednosti između bacanja."}</p>
            <h2 id="count">Broj bacanja: {num}</h2>
          <div className="dice-container">
              {diceElements}
          </div>
          {tenzies ? <button className="roll-dice" onClick={playAgain}>Igraj ponovo <GiPerspectiveDiceSixFacesThree className='icon' /></button> : <button className="roll-dice" onClick={rollDice}>Bacaj kockice <GiPerspectiveDiceSixFacesThree className='icon' /></button>}
            <p className='reset' onClick={playAgain}>Restartuj igru</p>
      </main>
  )
}