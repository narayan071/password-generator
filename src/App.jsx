import React, { useCallback, useEffect, useState, useRef } from 'react'

function App() {
  const passref = useRef();
  const [password, setPassword] = useState("");
  const [click, setClick] = useState("click");
  const [length, setLength] = useState(8);
  const [charAllow, setCharAllow] = useState(false);
  const [numAllow, setNumAllow] = useState(false);

  const changeClickState = ()=>{
    setClick("clicked!");
  }

  useEffect(()=>{
    setClick("click")
  }, [length, charAllow, numAllow])
  const genPass = useCallback(() => {
    let base = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(numAllow) base += "0123456789"
    if(charAllow) base += "!#$%&()*+,-./:;<=>?@[\\]^_{|}~"
    let pass = "";
    for(let i = 0; i<length; i++){
      let idx = Math.floor(Math.random()*base.length);
      pass+=base.charAt(idx);
    }
    setPassword(pass);
    console.log(pass);
  }, [length, charAllow, numAllow, setPassword])

  const copyPassword = useCallback(()=>{
    passref.current?.select();
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(()=>{genPass()}, [length, charAllow, numAllow, genPass])

  return (
    <>
      <div className='text-center text-purple-400 bg-zinc-600 rounded-md mx-auto my-5 w-full max-w-2xl'>
        <div>
          <h1 className='text-white'>PASSWORD GENERATOR</h1>
          <input type="text" placeholder='password' value={password} readOnly  className='rounded-md p-3 my-3' ref = {passref}/>
          <button 
  className='bg-blue-600 text-white rounded-md p-3 my-2' 
  onClick={() => {
    changeClickState();
    copyPassword();
  }}
>
  {click}
</button>
        </div>
        <input type="range" min={6} max={100} className='cursor-pointer m-3' onChange={(e) => {setLength(e.target.value)}} /> <label>length : {length}</label>
        <input type="checkbox" defaultChecked = {false} className='m-3' onChange={(prev)=>setNumAllow(prev => !prev)} /> <label>want numbers?</label>
        <input type="checkbox" defaultChecked = {false} className='m-3' onChange={(prev)=>setCharAllow( prev => !prev)}/> <label>want special characters?</label>
      </div>
    </>
  )
}

export default App