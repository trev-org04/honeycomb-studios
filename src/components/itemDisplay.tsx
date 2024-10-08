import React, { useEffect, useState } from "react";
import firebaseVars from "../firebase.js";
import ItemCard from "./itemCard.tsx";

export interface Poster {
    posterName: string;
    price: string;
    imageLink: string;
    isStandardSize: boolean;
    posterSize?: string;
}

interface ItemDisplayProps {
    category: string;
}

export default function ItemDisplay(props: ItemDisplayProps) {

    // Variables
    const [posters, setPosters] = useState<Array<Poster>>([]);


    // Functions
    async function getItemPictures(posterName: string) {
        const link = await firebaseVars.storageRef.child(`${posterName}.jpg`).getDownloadURL();
        return link;
    }
    function getData() {
        firebaseVars.db.collection("posters").where("category", "==", `${props.category}`).get().then((querySnapshot) => {
            const posters: Array<Poster> = [];
            querySnapshot.forEach(async (element) => {
                const link = await getItemPictures(element.get("posterName"));
                const newPoster: Poster = {
                    posterName: element.get("posterName"),
                    price: element.get("price"),
                    imageLink: link,
                    isStandardSize: element.get("isStandardSize"),
                    posterSize: element.get("posterSize"),
                }
                posters.push(newPoster);
                setPosters([...posters]);
            });
        });
    }

    // Effects
    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <div id="products" className="card-container">
                {posters.map((poster, i) => (
                    <ItemCard key={i} imageLink={poster.imageLink} posterName={poster.posterName} price={poster.price} isStandardSize={poster.isStandardSize} posterSize={poster.posterSize}></ItemCard>
                ))}
            </div>
        </>
    )
}