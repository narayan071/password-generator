import React, { useCallback, useState } from 'react'

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [charAllow, setCharAllow] = useState(false);
  const [numAllow, setNumAllow] = useState(false);

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
  }, [length, charAllow, numAllow, setPassword])
  
  return (
    <>
      <div className='text-center bg-zinc-600 rounded-md mx-auto my-5 w-full max-w-md'>
        <h1 className='text-white'>PASSWORD GENERATOR</h1>
        <input type="text" className='rounded-md' />
        <button>copy</button>
      </div>
    </>
  )
}

export default App