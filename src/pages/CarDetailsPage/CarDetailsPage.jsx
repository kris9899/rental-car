import { useParams } from "react-router-dom";

const CarDetailsPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Car Details Page</h1>
      <p>Details for car with ID: {id}</p>
    </div>
  );
};

export default CarDetailsPage;
