import React from 'react';
import Heading from '../../components/Shared/Heading';
import Marquee from "react-fast-marquee";
import img1 from '../../assets/bg-ifra3.jpg'
import img2 from '../../assets/bg-infra3.jpg'
const Caategory = () => {

    const categoriesWithImages = [
        {
            name: "Potholes",
            description: "Report large holes or cracks in the road surface that can damage vehicles.",
            imgUrl: "https://images.squarespace-cdn.com/content/v1/573365789f726693272dc91a/1704992146415-CI272VYXPALWT52IGLUB/AdobeStock_201419293.jpeg?format=1500w"
        },
        {
            name: "Broken Streetlights",
            description: "Report streetlights that are not working or damaged, affecting safety at night.",
            imgUrl: "https://media.istockphoto.com/id/1076480852/photo/broken-street-lamp-in-city.jpg?s=612x612&w=0&k=20&c=MKylMMDuFgkXy7uUYog7oo7aQQ5ATyBqemfopYHYsKc="
        },
        {
            name: "Water Leakage",
            description: "Report leaking pipes, hydrants, or water flowing on streets or sidewalks.",
            imgUrl: "https://ktvl.com/resources/media2/16x9/full/1015/center/80/3e53e4f2-bd25-4073-aac9-d556f2f1eb5a-large16x9_waterleak.jpeg"
        },
        {
            name: "Garbage Overflow",
            description: "Report bins or dumpsters that are overflowing with waste.",
            imgUrl: "https://media.gettyimages.com/id/155382228/photo/overflowing-wheelie-bin.jpg?s=612x612&w=gi&k=20&c=fVvX9OCMhO8Qk38e2BU7BOIUIwxSWihqsmC9CDs-HO0="
        },
        {
            name: "Damaged Footpaths",
            description: "Report cracked, uneven, or broken sidewalks/footpaths.",
            imgUrl: "https://stratumrepair.com/wp-content/uploads/2020/01/file-1.jpg"
        },
        {
            name: "Drainage Blockage",
            description: "Report blocked drains causing water accumulation or flooding.",
            imgUrl: "https://uploads.prod01.sydney.platformos.com/instances/677/assets/images/stowmwater-drain-blocked-with-debris.webp"
        },
        {
            name: "Illegal Parking",
            description: "Report vehicles parked illegally, blocking paths or roads.",
            imgUrl: img1
        },
        {
            name: "Broken Park Bench",
            description: "Report damaged or broken benches in public parks.",
            imgUrl: "https://www.shutterstock.com/shutterstock/photos/1162127035/display_1500/stock-photo-a-broken-bench-in-the-city-park-consequences-of-folk-festivals-1162127035.jpg"
        },
        {
            name: "Faulty Traffic Signal",
            description: "Report traffic lights that are malfunctioning or completely out.",
            imgUrl: img2
        },
        {
            name: "Other",
            description: "Report any other civic or infrastructure issue not listed above.",
            imgUrl: "https://media.springernature.com/m685/springer-static/image/art%3A10.1038%2Fs41562-025-02208-3/MediaObjects/41562_2025_2208_Fig1_HTML.png"
        }
    ];
    return (
        <div className='py-16 md:py-24'>
            <Heading center={true} title="Interactive Category" subtitle="Divide Issues into Interactive Category to solve your problem "></Heading>

            <Marquee speed={40} pauseOnHover gradient={false} className={`h-70 my-5 md:my-10`}>
                {
                    categoriesWithImages.map((cat, i) => (
                        <div key={i} className="card bg-base-100 w-80 h-60 mx-5 shadow-sm">
                            <figure>
                                <img
                                    className='w-full h-30'
                                    src={cat?.imgUrl}
                                    alt={cat?.name} />
                            </figure>
                            <div className="card-body">
                                <h2 className="font-medium">
                                    {cat?.name}
                                    
                                </h2>

                                <p>{cat?.description}</p>

                            </div>
                        </div>
                    ))
                }



            </Marquee>
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    categoriesWithImages.map((cat, i) => (
                        <div key={i} className="card bg-base-100 w-50 h-30 shadow-sm">
                            <figure>
                                <img
                                    className='w-full'
                                    src={cat?.imgUrl}
                                    alt={cat?.name} />
                            </figure>
                            <div className="card-body">

                                <p>{cat?.description}</p>

                            </div>
                        </div>
                    ))
                }
            </div> */}

        </div>
    );
};

export default Caategory;