
import React, { useState } from "react";


const useDropdown = (label, options) => {
 
  const [valor, setValor] = useState('');


  const Dropdownmaker = () => (

    <div className="custom_select mb-3 mt-3" >
        <select
        id={label}
        value={valor}
        onChange={e => setValor(e.target.value)}
        onBlur={e=> setValor(e.target.value)}
        disabled={!options.length}
          >
          <option className="select_items">{label}</option>
          {options.map(item=>
          <option className="select_items" key={item} value={item}>{item}</option>)}
        </select>
  </div>
  );
  return [valor, Dropdownmaker, setValor]
  }

  export default useDropdown