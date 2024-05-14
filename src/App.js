import './App.css';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import FormInputField from './components/FormInputField';
import { getUser, createUser } from './api/userApi';

function App() {
  const [myTable, setMyTable] = useState([]);
  useEffect(() => {
    getUser().then((result) => {
      setMyTable(result.data);
      console.log(result);
    });
  }, []);

  const {
    register: myRegister,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function saveDetails(formData) {
    console.log(formData);
    createUser(formData);
  }

  return (
    <div className='App flex justify-center flex-col items-center'>
      <form onSubmit={handleSubmit(saveDetails)}>
        <div className=' p-10 border my-5  '>
          <div className='w-full text-left font-bold'>Form Details</div>
          <p className='text-4xl text-redx' id='changeText'></p>
          <FormInputField
            register={myRegister}
            name='FName'
            fieldlabel='First Name'
            validation={{ required: true, maxLength: 30 }}
            errors={errors}
            errorclass='text-redx'
          />

          <FormInputField
            register={myRegister}
            name='MName'
            fieldlabel='Middle Name'
            validation={{ required: true, maxLength: 30 }}
            errors={errors}
            errorclass='text-redx'
          />

          <FormInputField
            register={myRegister}
            name='LName'
            fieldlabel='Last Name'
            validation={{ required: true, maxLength: 30 }}
            errors={errors}
            errorclass='text-redx'
          />

          <FormInputField
            register={myRegister}
            name='BDate'
            fieldlabel='Birth Date'
            validation={{ required: true }}
            errors={errors}
            errorclass='text-redx'
            fieldtype='date'
          />

          <FormInputField
            register={myRegister}
            name='ContactNumber'
            fieldlabel='Contact Number'
            validation={{ required: true, maxLength: 30 }}
            errors={errors}
            errorclass='text-redx'
          />

          <FormInputField
            register={myRegister}
            name='Address'
            fieldlabel='Address'
            validation={{ required: true, maxLength: 30 }}
            errors={errors}
            errorclass='text-redx'
          />

          <FormInputField
            register={myRegister}
            name={'ImageBlob'}
            fieldlabel={'Profile Picture'}
            validation={{ required: true }}
            errors={errors}
            errorclass='text-redx'
            fieldtype='file'
          />

          <button
            className='rounded-md border bg-zinc-900 text-white h-[35px] px-2'
            type='submit'
          >
            Save Details
          </button>
        </div>
      </form>
      <div>
        <div className='grid grid-cols-4 gap-4'>
          {myTable.map((element, indx) => {
            return (
              <div className='border rounded-md p-10' key={indx}>
                <img
                  className='border h-[150px] w-full rounded-full'
                  src={element.myImg}
                  alt='Profile'
                ></img>
                <div>
                  <div className='text-left my-1'>
                    <label className='font-bold'>Fullname : </label>
                    {`${element.LName}, ${element.FName} ${element.MName} `}
                  </div>
                  <div className='text-left my-1'>
                    <label className='font-bold'>Birth Date : </label>
                    {element.BDate}
                  </div>
                  <div className='text-left my-1'>
                    <label className='font-bold'>Contact Number : </label>
                    {element.ContactNumber}
                  </div>
                  <div className='text-left my-1'>
                    <label className='font-bold'>Address : </label>
                    {element.Address}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
