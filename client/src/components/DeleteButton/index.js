import React from 'react'

const DeleteButton = ({id}) => {

  const handleDeleteDrink = async (e) => {
    e.preventDefault()
    fetch(`http://localhost:8000/drinks/single/${id}/`, {
            method: 'DELETE'
    })
    .then(data => {
      console.log('deleted')
      window.location.reload()
    })
  }
  

  return (
    <button onClick={handleDeleteDrink}>Delete Drink</button>
  )
}

export default DeleteButton;
