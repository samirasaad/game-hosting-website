import { Review } from "@/types/Review";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";

interface Props {
  review: Review;
}

function ReviewCard(props: Props) {
  const { review } = props;

  return (
    <li className="shadow-lg p-3 text-sm">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-4 mb-2">
          <img
            src={review.reviewerImg}
            alt={review.reviewerName}
            width={50}
            height={50}
            className="rounded-full"
          />
          <p className="font-semibold">{review.reviewerName}</p>
        </div>
        <p className="flex items-center font-bold">
        <StarSolid className="w-5 h-5 text-yellow-300" /> {review.rating}/5
      </p>
      </div>

      <p className="mt-1 text-gray-700">{review.content}</p>
    </li>
  );
}

export default ReviewCard;
