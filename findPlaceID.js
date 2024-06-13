import axios from 'axios';

const apiKey = 'AIzaSyB3Qrj693uvatLxfueAVQGIdMTNTlGDGPA'; // Replace with your actual API key
const placeName = 'Engel Fine Design';
const location = '35.3546931,-94.6560171'; // Approximate location

async function findJewelryStores() {
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
        params: {
          query: 'jewelry store',
          location: '35.3859242,-94.3985475', // Coordinates for Fort Smith, AR
          radius: 5000, // Search within a 5km radius
          key: apiKey,
        },
      });
  
      if (response.data.results && response.data.results.length > 0) {
        response.data.results.forEach((place) => {
          console.log(`Place Name: ${place.name}, Place ID: ${place.place_id}`);
        });
      } else {
        console.log('No jewelry stores found.');
      }
    } catch (error) {
      console.error('Error finding jewelry stores:', error);
    }
  }
  
  findJewelryStores();