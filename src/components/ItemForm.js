import React, { useEffect, useState } from "react";

function ItemForm({onAddItem}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");


  function handleSubmit(e){
    e.preventDefault()
   
    const newObj = {      //add new items to list
      name: name,
      category: category,
      isInCart: false
    }

    fetch("http://localhost:4000/items",{     //add content to RESTful API.
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(newObj),

    })
    .then((resp) => resp.json())
    .then((newData) => onAddItem(newData))

  }


  return (
    <form className="NewItem" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
