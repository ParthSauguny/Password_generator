import { useState , useCallback , useEffect , useRef} from 'react'
import './App.css'

function App() {
  const [length , setlength] = useState(8)
  const [numberallowed , setnumberallowed] = useState(false)
  const [Charallowed , setCharallowed] = useState(false)
  const [password , setpassword] = useState(" ")

  //using ref
  const passwordRef = useRef(null)


  const passwordGenerator = useCallback( () => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberallowed) str += "0123456789"
    if(Charallowed) str += "!@#$%^&*(){}|][:;?><,./"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }

    setpassword(pass)

  } , [length , numberallowed , Charallowed , setpassword])


  const copyPasswordtoClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,99);//to select first three characters only
    window.navigator.clipboard.writeText(password);
  } , [password])

  useEffect(()=> {
    passwordGenerator()
  } , [length , numberallowed , Charallowed , setpassword])

  return (
    <>
    <div className='max-w-md m-auto'>
        <div className='text-xl w-full text-center bg-pink-300 text-blue-800 max-w-md mx-auto shadow-md
        rounded-lg px-4 font-bold my-2'>
          Password Generator
        </div>

        <div className='w-full , max-w-md , mx-auto , flex , shadow , rounded-md overflow-hidden mb-4 my-6'>
          <input 
            type="text"
            placeholder='Password'
            value={password}
            className='outline-none w-full py-1 px-3'
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordtoClipboard}
          className='text-black bg-slate-400 px-3 text-lg'>
            Copy
          </button>
        </div>
        <div className=' max-w-md flex , text-sm , gap-x-2'>
          <div className='max-w-md flex , items-center , gap-x-1'>
            <input 
              type="range" 
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e)=>{setlength(e.target.value)}}
              />
            <label className='text-bold text-black'>length: {length}</label>

            <input 
              type="checkbox" 
              id='numberinput'
              defaultChecked={numberallowed}
              onChange={()=>{
                setnumberallowed((prev) => !prev);
              }}
              />
            <label className='text-bold text-black'>Include Numbers</label>

            <input 
              type="checkbox" 
              id='charinput'
              defaultChecked={Charallowed}
              onChange={()=>{
                setCharallowed((prev) => !prev);
              }}
              />
            <label className='text-bold text-black'>Include Chars</label>  
          </div>
        </div>
    </div>    
    </>
  )
}

export default App