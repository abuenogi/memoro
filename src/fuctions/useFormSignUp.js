import { useState, useEffect } from "react";

const useForm = (callback, validate) => {
  
  const [values, setValues] = useState({nombre: "",email: "", password: "" , telefono: "", fechaNac: "", domicilio: ""});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = event => {
    const { name, value } = event.target;
    console.log('name:' + name + ' value: ' + value);
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  useEffect(() => {
    console.log( 'errors' +Object.keys(errors) + ' errores: ' + Object.keys(errors).length );
    
    if (Object.keys(errors).length <=2 && isSubmitting) {
      callback();
    }
  }, [errors]);

  return {
    handleChange,
    handleSubmit,
    values,
    errors
  };
};

export default useForm;
