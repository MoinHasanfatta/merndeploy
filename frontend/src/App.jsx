import axios from 'axios'
import { useEffect, useState } from 'react'
function App(){
  const API = import.meta.env.VITE_APP_API_URL;
  const [friendsList,setFriendsList] = useState([])
  const[name,setName] = useState('')

  function fetchFriends(){
    axios.get(API)
      .then(res => setFriendsList(res.data))
      .catch(err => console.error("Error fetching friends : ", err))
  }

  useEffect(()=>{
    fetchFriends()
    },[])

    function myData(e){
      e.preventDefault()
      axios.post(API, {name})
      .then(()=>{
      console.log(name)
      setName('')
        fetchFriends()
    })
    .catch(err => console.error('Error adding friend ', err))
    }

    function deleteFriend(id){
      axios.delete(`${API}/${id}`)
        .then(()=>{
          fetchFriends()
      })
        .catch(err => {
          console.error("error deleting ", err)
        })
    }

    function editFriend(id, currentName){
      const newName = prompt('Enter new name :', currentName)
      if(newName && newName.trim() !== ''){
        axios.put(`${API}/${id}` , {name : newName})
          .then(()=>{
            fetchFriends()
          })
          .catch(err =>{
            console.error('Error updating friend ', err)
          })
      } else{
        alert('Invalid name, Edit cancelled')
      }

    }
  return (
  <>
  Now I will get data 
  <form onSubmit={myData}>
    <input type='text'
    placeholder='add friend'
    value={name}
    onChange={e => setName(e.target.value)}
    required />
    <button>Add Friend</button>
  </form>
  { <ol>
    {
      friendsList.map((u,index)=>(
        <li key={index}>{u.name}
        <button onClick={()=> editFriend(u._id, u.name)}> Edit </button>
        <button onClick={()=> deleteFriend(u._id)}> Delete </button></li>
      ))
    }
  </ol> }

  </>
  )
}

export default App;