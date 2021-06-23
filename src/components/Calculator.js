import React, { useState } from 'react';



const Calculator = () => {

    const [input, setInput] = useState("");
    const [msg, setMsg] = useState("");
    const [locked, setLocked] = useState(0);

    const InputHandler = (e) => {
        if (e.target.value.match(/[^0-9-+/*,.]+$/)) {
            setMsg(<h1 className="message">Only numbers and arithmetic operators are valid!</h1>)
        }
        else {
            setInput(e.target.value);
            setMsg("");
        }
    }

    const clearHandler = () => {
        setInput("");
        setMsg("");
        setLocked(0);
    }

    function reversePolish(newExpr) {
        let expr = newExpr.split(",");
        let stack =[];
        let numberCounter = 0;
        let operatorCounter = 0;
      
        for(let i=0; i < expr.length; i++) {
          if(!isNaN(expr[i]) && isFinite(expr[i])) {
            stack.push(expr[i]);
            numberCounter++;
          }else {
              operatorCounter++;
            let a = stack.pop();
            let b = stack.pop();
            if(expr[i] === "+") {
              stack.push(parseFloat(a) + parseFloat(b));
            } else if(expr[i] === "-") {
                stack.push(parseFloat(a) - parseFloat(b));
              } else if(expr[i] === "*") {
                  stack.push(parseFloat(a) * parseFloat(b));
              } else if(expr[i] === "/") {
                  stack.push(parseFloat(a) / parseFloat(b));
              } else if(expr[i] === "^") {
                  stack.push(Math.pow(parseFloat(a), parseFloat+(b)));
              }
          }
        }

        if (input === "") {
            return setMsg(<h1 className="message">You did not enter anything!</h1>);
        }
        if (numberCounter === operatorCounter + 1) {
            setInput(input + " = " + stack[0]);
            setLocked(1);
        }
        else if (numberCounter <= operatorCounter) {
            setMsg(<h1 className="message">Something went wrong! Check the number of the OPERANDS!</h1>);
            setLocked(0);
        }
        else {
            setMsg(<h1 className="message">Something went wrong! Check the number of OPERATORS!</h1>);
            setLocked(0);
        }

    }

    return (
            <div className="calculator">
                <input onChange={InputHandler} value={input} placeholder="Enter the operand and operator: "/>
                    <br />
                    <button className="submit" disabled={locked} type="Submit" onClick={() => reversePolish(input)}>Compute</button>
                    <button className="clear" type="Clear" onClick={clearHandler}>Clear</button>
                    <br />
                    {msg}
            </div>
    )
}

export default Calculator;