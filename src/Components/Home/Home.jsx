import React, { useContext, useEffect, useState } from 'react'
import previewImg from '../../images/uploadPreview.png'
import './Home.css'
import {useAuthState} from 'react-firebase-hooks/auth';
import { useStorage } from 'react-firebase-hooks/storage';
import { useDocument } from 'react-firebase-hooks/firestore';
import {auth,fireStore,storage} from '../../Context/Firebase';
import { ref,getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { Context } from '../..';
import toast from 'react-hot-toast';



const Home = () => {
  const [image, setImage] = useState(previewImg);
  const [user] = useAuthState(auth);
 const {imageUrls,setImageUrls} = useContext(Context);


  const handleImageChange = (e) => {
    e.preventDefault();
    console.log('uploading image starts');
    const file = e.target.files[0];
    console.log('uploading image continues');
    if (file) {
      // Upload the file to Firebase Storage
      const storageRef = ref(storage,`images/${user?.uid}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          toast.error(error);
        },
        () => {
          toast.success("Uploaded Successfully");
          // Get the download URL after successful upload
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // const customUrl = `${user.uid}-${downloadURL}`
            setImageUrls((prev)=>[...prev,downloadURL]);
            // localStorage.setItem('imageUrls', JSON.stringify(imageUrls));
          });
        }
      );

      // Set the preview image for the UI
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      console.log('Image set in state:', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    console.log('imageUrls updated:', imageUrls);
  }, [imageUrls]);
  return (
    <div className='flex flex-col gap-2 homePage'>
      <h1 className='w-full h-[10vh] flex items-center justify-center border border-black font-normal text-2xl'>Generate Image Link</h1>
      <div className='w-full h-[50vh] flex justify-center items-center'>
      <form className=' border border-black flex flex-col gap-6 p-4 h-5/6 min-w-80 justify-end rounded-md'>
       <div className='m-auto w-[100%] h-[60%]rounded-lg  flex items-center justify-center'>
       <img src={image} alt='upload Image' className={` ${image != previewImg ? 'h-48 w-64 rounded-3xl': 'w-32 opacity-[90%] ' }`}/>
       </div>
        {/* <input type='file' className='p-1 ' onChange={handleImageChange}/> */}
         <label htmlFor='file' className='inputBtn'>
          Upload
         </label>
         <input type='file' className='p-1 ' id='file' onChange={handleImageChange}/>
        <button type="submit"class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full">
  Create Link
</button>
      </form>
      </div>
    </div>
  )
}

export default Home


// const handleImageChange = (e) => {
//   e.preventDefault();
//   const file = e.target.files[0];

//   if (file) {
//     // Upload the file to Firebase Storage
//     const storageRef = ref(storage,`images/${user?.uid}/${file.name}`);
//     const uploadTask = storageRef.put(file);

//     uploadTask.on(
//       'state_changed',
//       (snapshot) => {
//         // You can track the upload progress here if needed
//       },
//       (error) => {
//         console.error('Error uploading image:', error.message);
//       },
//       () => {
//         // Get the download URL after successful upload
//         storageRef.getDownloadURL().then((downloadURL) => {
//           setImageUrl(downloadURL);
//         });
//       }
//     );

//     // Set the preview image for the UI
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       setImage(e.target.result);
//     };
//     reader.readAsDataURL(file);
//   }
// };