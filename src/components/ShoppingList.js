import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function handleAddItem(newData){  //POST
    setItems([...items, newData])
  }

  function handleUpdateItem(updatedData){   //PATCH
    setItems(items.map((item) => {
      if (item.id === updatedData.id){
        return updatedData
      } else {
        return item
      }
    }))
  }

  function handleDeletedItem(deletedItem){     //DELETE from server
    setItems(items.filter((item) => item.id !== deletedItem.id))
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((resp) => resp.json())
      .then((data) => setItems(data))
  }, [])

  

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem={handleUpdateItem} onDeleteItem={handleDeletedItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
