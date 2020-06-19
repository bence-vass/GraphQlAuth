import React, {useState, useEffect} from 'react';

function leftPad(number, targetLength) {
    let output = number + '';
    while (output.length < targetLength) {
        output = '0' + output;
    }
    return output;
}

function Counter (props) {
    const [count, setCount] = useState(0);
    const [exp, setExp] = useState(0);
    //console.log(Number(now));
    //console.log('State:',Number(exp));
    //console.log('Props:',props.exp);
    if(exp !== props.exp){
        //console.log('change');
        //console.log('exp time',Math.floor(Number(props.exp*1000)-Number(new Date())));
        setExp(props.exp);
        setCount(Math.floor((Number(props.exp*1000)-Number(new Date()))/1000));
    }

    useEffect(()=>{
        const timer = count > 0 && setInterval(()=>{
            //console.log(count);
            setCount(count-1);
        }, 1000);
        return() => clearInterval(timer)
    },[count]);
    if(count <= 0){
        //console.log('exp smaller');
        return(<span>00 : 00</span>);
    } else {
        //console.log('exp bigger');
        return(<span>
            {leftPad(
                Math.floor(count/60), 2)} : {leftPad(
                    count-Math.floor(count/60)*60, 2)}</span>);
    }

    /*
        if(props.exp === 0){
            return(<span>0</span>)
        } else {
            return(<span>{count}</span>);
        }
    */


}
export default Counter
