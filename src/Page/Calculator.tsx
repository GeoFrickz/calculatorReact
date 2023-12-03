import { useEffect, useRef, useState } from "react";
import Button from "../Component/Button";
import { useNavigate } from "react-router-dom";
import styles from './Calculator.module.css';

const Calculator = () => {

    const nav = useNavigate();
    const [value, setValue] = useState<string>('0');
    const [history, setHistory] = useState<string[]>([]);
    const [lastClickedButton, setLastClickedButton] = useState<string | null>('');
    const historyRef = useRef<HTMLDivElement>(null);

    const handleButtonClick = (buttonValue: string) => {
        setLastClickedButton(buttonValue);
    
        if (buttonValue === '=') {
            if (value === "Error"){
                setValue('0');
            }
            else{
                try {
                    const result = eval(value).toString();
                    setHistory([...history, `${value}=${result}`]);
                    setValue(result);
                } catch (error) {
                    setValue('Error');
                }
            }
            }
        else if (buttonValue === 'C') {
            setValue('0');
        }
        else if (buttonValue === 'DEL') {
            if (value.length === 1 || value === "Error"){
                setValue('0');
            }
            else if (value !== undefined) {
                setValue(value.slice(0, -1));
            }
        }
        else {
            if ((lastClickedButton === '=' && /\d/.test(buttonValue)) || value === "Error") {
                setValue(buttonValue);
            }
            else if (/[-+*/]/.test(value.slice(-1)) && /[-+*/]/.test(buttonValue)){
                setValue(value.slice(0, -1) + buttonValue);
            }
            else if (/[-+*/]/.test(value) && /[-+*/]/.test(buttonValue)){
                setValue(value);
            }
            else {
                if (value === '0' && !/[-.+*/]/.test(buttonValue)) {
                    setValue(buttonValue);
                }
                else{
                    setValue(value + buttonValue);
                }
            }
        }
        }

    useEffect (() =>{
        if (historyRef.current){
            historyRef.current.scrollTop = historyRef.current.scrollHeight;
        }
    }, [history]);

    return (
        <div className={styles.App}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.top}>
                        <div className={styles.history} ref={historyRef}>
                            {history.map((item, index) => (
                                <div key={index}>{item}</div>
                            ))}
                        </div>
                        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} readOnly/>
                    </div>
                    <div className={styles.bottom}>
                        <table>
                            <tbody>
                                <tr>
                                <td><Button value="C" onClick={() => handleButtonClick('C')} className="gray"/></td>
                                <td><Button value="DEL" onClick={() => handleButtonClick('DEL')} className="gray"/></td>
                                <td><Button value="?" onClick={() => nav("/support")} className="brown"/></td>
                                <td><Button value="/" onClick={() => handleButtonClick('/')} className="symbol"/></td>
                                </tr>
                                <tr>
                                <td><Button value="1" onClick={() => handleButtonClick('1')} className="gray"/></td>
                                <td><Button value="2" onClick={() => handleButtonClick('2')} className="gray"/></td>
                                <td><Button value="3" onClick={() => handleButtonClick('3')} className="gray"/></td>
                                <td><Button value="*" onClick={() => handleButtonClick('*')} className="symbol"/></td>
                                </tr>
                                <tr>
                                <td><Button value="4" onClick={() => handleButtonClick('4')} className="gray"/></td>
                                <td><Button value="5" onClick={() => handleButtonClick('5')} className="gray"/></td>
                                <td><Button value="6" onClick={() => handleButtonClick('6')} className="gray"/></td>
                                <td><Button value="-" onClick={() => handleButtonClick('-')} className="symbol"/></td>
                                </tr>
                                <tr>
                                <td><Button value="7" onClick={() => handleButtonClick('7')} className="gray"/></td>
                                <td><Button value="8" onClick={() => handleButtonClick('8')} className="gray"/></td>
                                <td><Button value="9" onClick={() => handleButtonClick('9')} className="gray"/></td>
                                <td><Button value="+" onClick={() => handleButtonClick('+')} className="symbol"/></td>
                                </tr>
                                <tr>
                                <td><Button value="0" onClick={() => handleButtonClick('0')} className="gray"/></td>
                                <td><Button value="." onClick={() => handleButtonClick('.')} className="gray"/></td>
                                <td colSpan={2}><Button value="=" onClick={() => handleButtonClick('=')} id="equal-button" className="symbol"/></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calculator;