import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import LazyLoad from "react-lazyload";
import { useFetch } from "../customHooks/useFetch";
import { memo } from 'react'
import Alert from "./Alert";

const CatList = ({ breed }) => {
    const { data: cats, loading, error } = useFetch(`images/search?breed_ids=${breed}&limit=100`, [breed]);

    if (error) {
        return <Alert type='warning' message='something bad happen' />
    }

    return (
        <div className="container">

            <div className="row p-5">
                {loading ? (
                    <Spinner />
                ) : (
                    cats.map((cat) => {
                        return (
                            <div
                                className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 mb-3 p-2"
                                key={cat.id}
                            >
                                <LazyLoad offset={100} placeholder={<Spinner />}>
                                    <Link className="card">
                                        <img src={cat.url} className="card-img-top" alt="image" />
                                    </Link>
                                </LazyLoad>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    )
}

export default memo(CatList)