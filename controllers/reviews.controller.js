import ReviewsCoordinator from "../coordinators/reviews.coordinator.js";

export const getReviews = async (req, res, next) => {
    try {
        const result = await ReviewsCoordinator.getReviews(req);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json();
        }
    } catch (err) {
        console.error(`there was an error in the reviews controller. Error: ${err}`);
        res.status(500).json({Error: err.message})
    }
}