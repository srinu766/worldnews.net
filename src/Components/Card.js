import React from 'react';

const Card = ({ data }) => {
    console.log(data);

    const readMore = (url) => {
        window.open(url);
    };

    return (
        <div className="cardContainer grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
            {data.map((curItem, index) => {
                if (!curItem.urlToImage) {
                    return null;
                } else {
                    return (
                        <div
                            className="card bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            key={index}
                        >
                            <img
                                src={curItem.urlToImage}
                                alt="News Image"
                                className="w-full h-48 object-cover"
                            />
                            <div className="content p-4">
                                <a
                                    className="title text-lg font-bold text-blue-600 hover:underline cursor-pointer"
                                    onClick={() => window.open(curItem.url)}
                                >
                                    {curItem.title}
                                </a>
                                <p className="text-gray-700 mt-2">{curItem.description}</p>
                            </div>
                            <div className="card-footer p-4">
                                <button
                                    onClick={() => window.open(curItem.url)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300"
                                >
                                    Read More
                                </button>
                            </div>
                        </div>
                    );
                }
            })}
        </div>
    );
};

export default Card;
