
import React, { useState } from "react";


const useDropdown = ( options) => {
 
  const [valor, setValor] = useState('');


  if (options[0] != null  && valor === ""){

      setValor(JSON.stringify(options[0]))
  
  }
  
  const Dropdownmaker = () => (

    <div className="custom_select mb-3 mt-3" >
        <select
        id={1}
        value={valor}
        onClick={e => setValor(e.target.value)}
        onChange={e => setValor(e.target.value)}
        onBlur={e=> setValor(e.target.value)}
        disabled={!options.length}
          >
          {options.map(( value, key )=>
          
         
        <option className="select_items" key = {key} value={JSON.stringify(value)}>{value.nombre}</option>)}
        </select>
  </div>
  );
  return [valor, Dropdownmaker]
  }

  export default useDropdown