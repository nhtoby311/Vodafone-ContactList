// Made by Nguyen Hieu - Toby

import React,{useState,useEffect} from 'react';
import {gsap} from 'gsap'                                     //Import animation library 
import './App.css';                                           //Import custom css
import 'bootstrap/dist/css/bootstrap.min.css'
import Contact from './components/Contact';
import FormEdit from './components/FormEdit'

function App() {

  const [tableContacts, setTableContacts] = useState([])              //data fetch from json
  const [letters,setLetters] = useState([])                           //first letter of names 
  const [filteredTable,setFilteredTable] = useState([])               //data used to visualize on table 
  const [query,setQuery] = useState("")                               //query for search function
  const [active,setActive] = useState(0)                              //state indicate actived filter

  
  const getData = async function() {                  
    const response = await fetch('./data/data.json')                  //fetching data from json, substitutable with API
    const contacts = await response.json()

    const allLet = contacts.map(function(contact){
      return (contact.name).charAt(0)                                 //array of first letter of contacts data
    })
    const uniqueAllLet = ['All',...(allLet.filter((x, i, allLet) => allLet.indexOf(x) === i)).sort()]     //sort letters in alphabetic order with 'All' filter option
    setTableContacts(contacts)
    setLetters(uniqueAllLet)                                                        //set data to states
    setFilteredTable(contacts)
  }

  useEffect(()=>{
    getData()                                                           //fetch data only one when page first load
  },[])

  function filtering(e)
  {
    if (e != "All")
    {
      setFilteredTable(tableContacts.filter(contact => (contact.name).charAt(0) === e))       //filter the contacts that have similar first letter
    }
    else
    {
      setFilteredTable(tableContacts)
    }
  }
  
  function searching(contacts)
  {
    return contacts.filter((contact) => contact.name.toLowerCase().indexOf(query) > -1)           //search for contact contains letters like query
  }

  function settingActive(index, e)
  {
      if (index === e)
      {
        return 'active-button'                                                                      //set style for actived filter letter
      }
    
  }


  function formOpen()
  {
    gsap.to('.my-form',{
      transform: 'translateX(0)',                                               //gsap animation for opening form and closing
      duration:0.6
    })


    gsap.to('.main',{
      opacity:0.5,
      duration:0.3
    })

  }

  function formClose()
  {
    gsap.to('.my-form',{
      transform: 'translateX(105vw)',
      duration:0.6,
    })

    gsap.to('.main',{
      opacity:1,
      duration:0.3
    })
  }


  return (
    <div className="position-relative">
      <div className="main">
        <div className="navbar navbar-expand-md navbar-light">
            <div className="container-fluid w-75 p-3 justify-content-between">
                <a className="navbar-brand" href="">
                    <img className="col-md-9 col-sm-12" src="./assets/vodafone_logo.svg" alt=""></img>
                </a>
                <input className="col-md-3 col-sm-12" type="text" placeholder="Search" onChange={(e)=> setQuery(e.target.value)}/>
            </div>
        </div>



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
        <footer className="col-12 text-center mt-5">
          <p>All Rights Reserved. VSSB 2021.</p>
        </footer>
      </div>

      <FormEdit 
        table = {filteredTable}
        setTable = {(e) => setTableContacts(e)}
        setFilTable = {(e) => setFilteredTable(e)}              //passing necessary function and parameters to FormEdit components
        aniClose = {() => formClose()}
        />
      
      
    </div>
  );
}

export default App;
