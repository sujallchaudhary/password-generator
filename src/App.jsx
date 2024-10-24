import { useState } from 'react'
import './App.css'
import { useCallback,useEffect} from 'react'

function App() {
  let [upCase,setUpCase] = useState(true)
  let [lowCase,setLowCase] = useState(true)
  let [num,setNum] = useState(true)
  let [specChar,setSpecChar]=useState(true)
  let [length,setLength] = useState(12)
  let [password,setPassword]= useState("")
  const [animationKey, setAnimationKey] = useState(0);
  const generatePassword=useCallback(()=>{
    let str=""
    let pass=""
    if(!upCase && !lowCase && !num && !specChar) {
      pass= "select atleast One CheckBox" 
      return}
    if (upCase) str+="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(lowCase) str+="abcdefghijklmnopqrstuvwxyz"
    if(num) str+="1234567890"
    if(specChar) str+="!@#$%^&*-_+=[]{}"
    for (let index = 0; index < length; index++) {
      let elem = Math.floor((Math.random()*str.length)+1)
      pass+=str.charAt(elem)
    }
    setPassword(pass)
    setAnimationKey(prevKey => prevKey + 1);
    
  },[length,lowCase,upCase,num,specChar,setPassword])
  const copyPasswordToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password)
  }, [password])
  useEffect(() => {
    generatePassword()
  }, [length,num,specChar,upCase,lowCase, generatePassword])
  return (
    <>

    <div className="container">
      <h1>Password Generator
      </h1>

      <div className="result-container">
      <span key={animationKey} className="text" id="result">{password}</span>
        <button onClick={copyPasswordToClipboard} className="btn" id="clipboard">
          <i className="fa-regular fa-copy"></i>
        </button>
      </div>
      <div className="settings">
        <div className="setting">
          <label htmlFor="length">Password Length
          </label>
          <input type="number" id="length" min="8" max="20" value={length} onChange={(e) => {setLength(e.target.value)}}/>
        </div>
          <span className="include-span" id="inc-span">Include Characters:</span>

        <div className="setting">
          <label htmlFor="uppercase">Uppercase
            <span className="uppercase-span" id="upper-span">(ABC)</span>
          </label>
          <input type="checkbox" value={upCase} checked={upCase} onChange={()=>{setUpCase(!upCase)}}/>
        </div>

        <div className="setting">
          <label htmlFor="lowercase">Lowercase
            <span className="lowercase-span" id="lower-span">(abc)</span>
          </label>
          <input type="checkbox" id="lower" checked={lowCase} value={upCase} onChange={()=>{setLowCase(!lowCase)}} />
        </div>

        <div className="setting">
          <label htmlFor="numbers">Numbers
            <span className="numbers-span" id="num-span">(123)</span>
          </label>
          <input type="checkbox" id="number" checked={num} value={num} onChange={()=>{setNum(!num)}}  />
        </div>

        <div className="setting">
          <label htmlFor="symbols">Symbols
            <span className="symbols-span" id="sym-span">(!@#*_)</span>
          </label>
          <input type="checkbox" checked={specChar} id="symbol" value={specChar} onChange={()=>{setSpecChar(!specChar)}}/>
        </div>
      </div>
      <button className="gen-pw btn-large" id="generate" onClick={generatePassword}>
        Generate Password
      </button>
    </div>
    </>
  )
}

export default App
