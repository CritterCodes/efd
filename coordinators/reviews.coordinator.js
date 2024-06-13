import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

export default class ReviewsCoordinator {
    static getReviews = async () => {
        try {
          const response = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
            params: {
              place_id: 'ChIJXRLqZQKwgowRukBqLgMSVNA', // Replace with your actual place ID
              fields: 'reviews',
              key: process.env.GOOGLE_PLACES_KEY // Replace with your actual API key
            }
          });
          console.log('Google API response:', response.data); // Log the response data
          return response.data;
        } catch (error) {
          console.error('Error fetching Google reviews:', error);
          res.status(500).json({ error: error.message });
        }
    }
}