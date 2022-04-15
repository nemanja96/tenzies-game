import React from "react"
import {BsDice1, BsDice2, BsDice3, BsDice4, BsDice5, BsDice6} from 'react-icons/bs';

export default function Die(props) {

    let imgArr = [<BsDice1 />, <BsDice2/>, <BsDice3/>, <BsDice4/>, <BsDice5/>, <BsDice6/>];

    const styles = {
        backgroundColor: props.isHeld ? "#ddd24c" : "white"
    }
    return (
        <div 
            className="die-face" 
            style={styles}
            onClick={props.holdDice}
        >
            <div className="die-img">{imgArr[props.value - 1]}</div>
        </div>
    )
}