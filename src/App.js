import React,{useState,useEffect} from 'react';
import {gsap} from 'gsap' 
import './App.css';
// import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import Contact from './components/Contact';


function App() {

  const [tableContacts, setTableContacts] = useState([])
  const [letters,setLetters] = useState([]) 
  const [filteredTable,setFilteredTable] = useState([])
  const [query,setQuery] = useState("")
  const [active,setActive] = useState(0)

  const [inputName,setInputName] = useState("")
  const [inputEmail,setInputEmail] = useState("")
  const [inputPhone,setInputPhone] = useState("")
  
  const getData = async function() {
    const response = await fetch('./data/data.json')
    const contacts = await response.json()

    const allLet = contacts.map(function(contact){
      return (contact.name).charAt(0)
    })
    const uniqueAllLet = ['All',...(allLet.filter((x, i, allLet) => allLet.indexOf(x) === i)).sort()]
    setTableContacts(contacts)
    setLetters(uniqueAllLet)
    setFilteredTable(contacts)
  }

  useEffect(()=>{
    getData()
  },[])

  function filtering(e)
  {
    if (e != "All")
    {
      setFilteredTable(tableContacts.filter(contact => (contact.name).charAt(0) === e))
    }
    else
    {
      setFilteredTable(tableContacts)
    }
  }
  
  function searching(contacts)
  {
    return contacts.filter((contact) => contact.name.toLowerCase().indexOf(query) > -1)
  }

  function settingActive(index, e)
  {
      if (index === e)
      {
        return 'active-button'
      }
    
  }


  function formOpen()
  {
    gsap.to('.my-form',{
      transform: 'translateX(0)',
      duration:0.6
    })
  }

  function formClose()
  {
    gsap.to('.my-form',{
      transform: 'translateX(45vw)',
      duration:0.6
    })
  }


  function settingObject(index)
  {
    const object = {
      id: index,
      name: inputName,
      email: inputEmail,
      phoneNumber: inputPhone
    }
    return object
  }

  function adding(e)
  {
    e.preventDefault()

    const newContacts = [settingObject(filteredTable.length + 1),...filteredTable]
    console.log(newContacts)
    setFilteredTable(newContacts)
  }

  return (
    <div>
      <div className="navbar navbar-expand-md navbar-light">
          <div className="container-fluid w-75 p-3 justify-content-between">
              <a className="navbar-brand" href="">
                  <img className="col-md-9 col-sm-12" src="./assets/vodafone_logo.svg" alt=""></img>
              </a>
              <input className="col-md-3 col-sm-12" type="text" placeholder="Search" onChange={(e)=> setQuery(e.target.value)}/>
          </div>
      </div>



      <form className="my-form bg-light" onSubmit={(e) => adding(e)}>
          <div className="form-btn back-btn bg-danger" onClick={()=>formClose()}>
            <span>back</span>
          </div>
        <div className="form-ctn">
          <div className="form-add-ctn">
            <div className="form-add-input">
              <input className="form-add" type="text" placeholder="Name" onChange={(e)=>setInputName(e.target.value)}/>
              <input className="form-add" type="text" placeholder="Email" onChange={(e)=>setInputEmail(e.target.value)}/>
              <input className="form-add" type="text" placeholder="Phone" onChange={(e)=>setInputPhone(e.target.value)}/>
            </div>
            <button className="form-btn bg-success" type="submit">
              <span>add</span>
            </button>
          </div>
          {searching(filteredTable).map(function(contact)
          {
            return <div key={contact.id} className=" shadow form-name-ctn">
              <div className="form-name bg-dark">
                <p  className="my-h1">{contact.name}</p>
              </div>
              <div className="form-btn bg-danger">
                <span>DEL</span>
              </div>
              </div>
          }
        )}
        </div>
      </form>


      <button type="button" className="btn btn-danger btn-circle btn-xl" onClick={()=>formOpen()}>+</button> 

      <div className="container-fluid padding">
          <div className="text-center">
              <div className="container-fluid w-75 p-3">
                  <h1 className="">Contacts</h1>
                  <hr className="border col-1 border-danger"></hr>
                  <div className="container-fluid padding">
                      <div className="row text-center justify-content-center">
                          {
                            letters.map(function(letter,index){
                              return <h2 key={index} className={`my-h2 col-1 m-2 ${settingActive(index,active)}`} onClick={function(){
                                setActive(index)
                                filtering(letter)
                              }
                            }>{letter}</h2>  
                            })
                          }
                      </div>
                  </div>
              </div>

          </div>
      </div>

      <div className="container-fluid padding col-11">
            <div className="row justify-content-center">
              {searching(filteredTable).map(function(contact)
              {
                return <Contact
                key={contact.id}
                name={contact.name}
                phoneNumber={contact.phoneNumber}
                email={contact.email}
                />
              })}
            </div>
      </div>
    </div>
  );
}

export default App;
