import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../Context/Firebase';

export async function getImageURLsForUser(userId) {
  const userImagesRef = ref(storage, `images/${userId}/`);

  try {
    // List all items (images) in the user's folder
    const userImagesList = await listAll(userImagesRef);

    // Array to store promises for getting download URLs
    const downloadURLPromises = [];

    // Iterate through each item (image) in the list
    userImagesList.items.forEach((imageRef) => {
      const promise = getDownloadURL(imageRef)
        .then((url) => {
          console.log(`Downloadable URL for ${imageRef.name}:`, url);
          // Use the URL as needed (e.g., display the image in your application)
          return url;
        })
        .catch((error) => {
          console.error(`Error getting downloadable URL for ${imageRef.name}:`, error);
          return null;
        });

      downloadURLPromises.push(promise);
    });

    // Use Promise.all to wait for all promises to resolve
    const urls = await Promise.all(downloadURLPromises);
    console.log('All Downloadable URLs:', urls);
    return urls;
  } catch (error) {
    console.error('Error listing user images:', error);
    return [];
  }
}