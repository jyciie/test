import './App.css';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Buffer } from 'buffer';
import FormInputField from './components/FormInputField';
import { getUser, createUser, updateUser } from './api/userApi';
import moment from 'moment';

function App() {
  const [myTable, setMyTable] = useState([]);
  const [userId, setUserId] = useState(null);
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
    setValue,
    reset,
  } = useForm();

  const handleSetSelected = (data) => {
    setUserId(data.userID);
    setValue('FName', data.FName);
    setValue('MName', data.MName);
    setValue('LName', data.LName);
    setValue('BDate', moment(data.BDate).format('YYYY-MM-DD'));
    setValue('ContactNumber', data.ContactNumber);
    setValue('Address', data.Address);
  };

  const handleCancelSelection = () => {
    setUserId(null);
    reset();
  };

  function saveDetails(data) {
    const formData = new FormData();
    formData.append('file', data.ImageBlob[0]);
    formData.append('FName', data.FName);
    formData.append('MName', data.MName);
    formData.append('LName', data.LName);
    formData.append('BDate', data.BDate);
    formData.append('ContactNumber', data.ContactNumber);
    formData.append('Address', data.Address);

    if (userId) {
      updateUser(userId, formData);
    } else {
      createUser(formData);
    }
  }

  return (
    <div className='App flex justify-center flex-col items-center py-6 space-y-4'>
      <form onSubmit={handleSubmit(saveDetails)}>
        <div className='p-10 border'>
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
            validation={{ required: false }}
            errors={errors}
            errorclass='text-redx'
            fieldtype='file'
          />

          <div>
            {userId && (
              <button
                className='rounded-md border bg-zinc-900 text-white h-[35px] px-2'
                onClick={() => handleCancelSelection()}
              >
                Cancel
              </button>
            )}
            <button
              className='rounded-md border bg-zinc-900 text-white h-[35px] px-2'
              type='submit'
            >
              Save Details
            </button>
          </div>
        </div>
      </form>
      <div>
        <div className='grid grid-cols-4 gap-4'>
          {myTable.map((element, indx) => {
            let b64;
            if (element.UserImage?.ImageBlob) {
              b64 = Buffer.from(element.UserImage?.ImageBlob).toString(
                'base64'
              );
            }
            return (
              <div
                className='border rounded-md p-10 flex flex-col items-center'
                key={indx}
                onClick={() => handleSetSelected(element)}
              >
                <img
                  className='border-2 w-[150px] h-[150px] object-contain rounded-full'
                  src={`data:image/webp;base64,${b64}`}
                  alt='Profile'
                />
                <div>
                  <div className='text-left my-1'>
                    <label className='font-bold'>Fullname : </label>
                    {`${element.LName}, ${element.FName} ${element.MName} `}
                  </div>
                  <div className='text-left my-1'>
                    <label className='font-bold'>Birth Date : </label>
                    {moment(element.BDate).format('MMMM DD, YYYY')}
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
