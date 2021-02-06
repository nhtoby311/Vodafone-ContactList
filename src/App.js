import React,{useState,useEffect} from 'react';
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

      <button type="button" className="btn btn-danger btn-circle btn-xl">+</button> 

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
