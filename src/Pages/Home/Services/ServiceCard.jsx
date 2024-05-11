import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {

    const { _id, title, img, price } = service;

    return (
        <div>
            <div className="card card-compact w-96 bg-base-100 shadow-xl my-3">
                <figure><img src={img} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{title}</h2>
                    <p className="card-title">{price}</p>
                    <div className="card-actions justify-end">
                    <Link to={`/book/${_id}`}>
                        <button className="btn btn-primary">Book Now</button>
                    </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;