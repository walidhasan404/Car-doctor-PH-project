import { useEffect } from "react";
import { useState } from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {

    const [services, setservices] = useState([]);

    useEffect(() => {
        fetch('https://car-doctor-server-six-wine.vercel.app/services')
            .then(res => res.json())
            .then(data => {
                setservices(data)
            })
    }, [])

    return (
        <div className="text-center m-3">
            <div>
                <h3 className="text-xl font-bold text-orange-500">Our Services</h3>
                <h3 className="text-3xl font-bold">Our Services</h3>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-2 my-3">
                {
                    services.map(service => <ServiceCard
                        key={service._id}
                        service={service}
                    ></ServiceCard>)
                }
            </div>
        </div>

    );
};

export default Services;