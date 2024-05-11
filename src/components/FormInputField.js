import React from 'react';
// validation = { required: true, maxLength: 30 }

const FormInputField = ({
  register,
  name,
  fieldlabel,
  validation = { required: true, maxLength: 30 },
  errors,
  errorclass,
  fieldtype = 'text',
}) => {
  return (
    <div className='text-left my-1'>
      <label>{fieldlabel}</label>
      <input
        type={fieldtype}
        className='rounded-xs border uppercase w-full my-1'
        {...register(name, validation)}
      />
      {errors[name] && errors[name].type === 'required' && (
        <span className={errorclass}>This is required</span>
      )}
      {errors[name] && errors[name].type === 'maxLength' && (
        <span className={errorclass}>Max length exceeded</span>
      )}
    </div>
  );
};

export default FormInputField;
