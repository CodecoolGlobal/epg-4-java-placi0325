import "../css/NewProductForm.css";
import { useState } from "react";

const NewProductForm = ({ onCancel, onSave }) => {
  const onSubmit = (e) => {
    e.preventDefault();

    if (value === "none") {
      alert("Please select a product type.");
      return;
    }
    
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    const product = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});

    return onSave(product);
  };

  const [value, setValue] = useState("none");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="firstdiv">
      <div className="container">
        <form className="product-form" onSubmit={onSubmit}>
          <h1 className="text">Upload the item you want to sell!</h1>
          <div className="form-row">

            <div className="input-data">
              <input name="name" id="name" required />
              <label htmlFor="name">Product name:</label>
              <div className="underline"></div>
            </div>

            <div className="input-data textarea">
              <select 
                  name="type" 
                  id="type" 
                  required 
                  className="dropdown" 
                  value={value} 
                  onChange={handleChange}>
                <option name="type" value="none" disabled selected>Select an Option</option>
                <option name="type" value="furniture">Furniture</option>
                <option name="type" value="clothing">Clothing</option>
                <option name="type" value="home-equipment">Home equipment</option>
                <option name="type" value="toys">Toys</option>
                <option name="type" value="sport">Sport and recreation</option>
                <option name="type" value="baby">Baby stuff</option>
                <option name="type" value="other">Other</option>
              </select>
              
              <div className="underline"></div>
            </div>

            <div className="input-data textarea">
              <input name="description" id="description" required></input>
              <label htmlFor="description">Product description:</label>
              <div className="underline"></div>
            </div>

            <div className="input-data">
              <input type="number" name="price" id="price" required />
              <label htmlFor="price">Price:</label>
              <div className="underline"></div>
            </div>
          </div>

          <div className="submit-btn">
            <div className="input-data">
              <input type="submit" className="button" value="Upload" />
              <div className="inner"></div>
            </div>
            <div className="input-data">
              <input
                type="button"
                className="button"
                value="Cancel"
                onClick={onCancel}
              />
              <div className="inner"></div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProductForm;
