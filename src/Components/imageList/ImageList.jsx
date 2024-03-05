import React, { Fragment, useContext, useEffect, useState } from 'react'
import MetaData from '../../MetaData';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import '../imageList/imageList.css'
import { Context } from '../..';
import { useNavigate } from 'react-router-dom';
import { deleteObject, getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../Context/Firebase';
import { getImageURLsForUser } from '../../functions/getUrls';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Loader from '../loader/Loader';
import ShareIcon from '@mui/icons-material/Share';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
const ImageList = ({User}) => {
  const navigate = useNavigate();
  const {imageUrls,setImageUrls} = useContext(Context);
  const [userImages,setUserImages] = useState([]);
  const [loading,setLoading] = useState(false);

  const handleDeleteImage = async (id, link) => {
    try {
      // Create a reference to the image in Firebase Storage
      const imageRef = ref(storage, link);

      // Delete the image from Firebase Storage
      await deleteObject(imageRef);

      // Update the state to remove the deleted image
      setUserImages((prevImages) => prevImages.filter((image) => image.id !== id));
      window.location.reload();
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleShareGmail = (link) => {
    const emailSubject = 'Check out this image';
    const emailBody = `I wanted to share this image with you: ${link}`;
    const emailLink = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = emailLink;
  };

  const handleShareWhatsApp = (link) => {
    const whatsappMessage = `Check out this image: ${link}`;
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;
    window.location.href = whatsappLink;
  };

    // const deleteImage =(id)=>{
    //   console.log(id);
    //   // const desertRef = ref(storage, `images/${id}/${file.name}`);
    // }
    const columns=[
        {field:"id", headerName:"Image ID", minWidth:100,flex:0.1},
        {
            field: "image",
            headerName: "Image",
            minWidth: 350,
            flex: 0.2,
            renderCell: (params) => (
              <img src={params.row.link} alt={`Image ${params.row.id}`} style={{ width: '100%', height: '100%' }} />
            ),
          },
          {
            field: "link",
            headerName: "Link",
            type: "number",
            minWidth: 150,
            flex: 0.3,
          },
          {
            field: "share",
            headerName: "Share",
            type: "number",
            minWidth: 270,
            flex: 0.3,
            renderCell: (params) => {
              return (
                <Fragment>
            <Button onClick={() => handleShareGmail(params.row.link)}>
              <AttachEmailIcon />
            </Button>
            <Button onClick={() => handleShareWhatsApp(params.row.link)}>
              <WhatsAppIcon/>
            </Button>
          </Fragment>
              );
            },
          },
          {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable:false,
            renderCell: (params) => {
                return (
                  <Fragment>
                  <Button onClick={() => handleDeleteImage(params.row.id, params.row.link)}>
                  <DeleteIcon />
                </Button>
                 </Fragment>
                );
              },
          }
    ]
    const rows = [];
    
    if(Array.isArray(userImages)){
       userImages.map((image,index)=>{
        rows.push({
            id:index + 1,
            image:image,
            link:image,
            name:image.name,
        })
       }) }


    useEffect(() => {
  const fetchData = async () => {
    try {
      if (!User) {
        navigate('/login');
      } else {
        setLoading(true);
        console.log('User inside ImageList', User);
        console.log('These are imageUrls', imageUrls);
        const userImagesData = await getImageURLsForUser(User.uid);
        setLoading(false);
        setUserImages(userImagesData);
      }
    } catch (error) {
      setLoading(false);
      console.error('Error fetching user images:', error);
    }
  };

  fetchData();
}, [User]);
    return (
        <Fragment>
          {loading ? ( <Loader/>) :(
            <Fragment>
            <MetaData title={'ALL Images - USER'}/>
            <div className='imageListContainer'>
                <h1 id='imageListHeading'>ALL IMAGES</h1>
            <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[10]}
            disableSelectionOnCLick
            autoHeight
            className='imageListTable'
            rowHeight={150}
            />
            </div>

        </Fragment>
          )
          }
        </Fragment>
      )
    


}

export default ImageList
