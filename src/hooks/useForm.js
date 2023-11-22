import { useEffect, useMemo, useState } from 'react';

/**
 *
 * @param {*} initialForm valores iniciales del formulario
 * @param {*} validationsInput obj con funcion y mjs de error
 * @returns Metodos, objetos con valores de inputs y validacion de errores
 */

export const useFrom = (initialForm = {}, validationsInput = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setFormValidation] = useState({});

  // Valida los campos del formulario
  const createValidators = () => {
    const formCheckedValues = {};

    for (const formField of Object.keys(validationsInput)) {
      // Obtiene los elementos del array de cada objeto
      const [fn, errorMessage = 'Verifica este campo'] = validationsInput[formField];

      // formCheckedValues almacena null o errorMessage segun valide fn()
      formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
    }
    // se almacena el obj de validaciones
    setFormValidation(formCheckedValues);
  };

  // Verifica todos los campos de formValidation
  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      // formValidation debe tener sus elementos en null
      if (formValidation[formValue] !== null) return false;
    }

    return true;
  }, [formValidation]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;

    setFormState({
      ...formState,
      [name]: value
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  useEffect(() => {
    createValidators();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  return {
    ...formState,
    formState,

    onResetForm,
    onInputChange,

    ...formValidation,
    isFormValid
  };
};
