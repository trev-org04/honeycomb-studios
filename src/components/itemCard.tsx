import React, { useEffect, useState } from "react";
import firebaseVars from "../firebase";
import hexagon from "../assets/hexagon.svg";

interface ItemCardProps {
    imageLink: string;
    posterName: string;
    isStandardSize: boolean;
    posterSize?: string;
    price: string;
}

export default function ItemCard (props: ItemCardProps) {

    // Variables
    const [isOrdering, setIsOrdering] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [width, setWidth] = useState(11.0);
    const [height, setHeight] = useState(17.0);

    // Functions
    function isValidInput(name: string | null | undefined, phoneNumber: string | null | undefined) {
        if (!name || name.length < 3 || !phoneNumber || !/^[0-9]+$/.test(phoneNumber) || phoneNumber.length < 10) return false;
        return true;
    }
    function openOrderModal() {
        if (!isOrdering) {
            setIsOrdering(true);
        }
        else {
            setPhoneNumberError(false);
            setNameError(false);
            const name = (document.getElementById("name") as HTMLInputElement).value;
            const phoneNumber = (document.getElementById("phone-number") as HTMLInputElement).value;
            if (isValidInput(name, phoneNumber)) {
                setIsLoading(true);
                firebaseVars.db.collection("orders").add({
                    "posterName": props.posterName,
                    "name": name,
                    "phoneNumber": phoneNumber,
                    "orderedAt": new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
                });
                setIsLoading(false);
                const button = (document.getElementById(`submit-button-${props.posterName}`) as HTMLButtonElement);
                button.textContent = "SUBMITTED!";
                setTimeout(() => {
                    setIsOrdering(false);
                }, 5000);
            }
            else {
                if (!name || name.length < 3) setNameError(true);
                if (!phoneNumber || !/^[0-9]+$/.test(phoneNumber) || phoneNumber.length < 10) setPhoneNumberError(true);
            }
        }
    }

    // Effects
    useEffect(() => {
        if (!props.isStandardSize) {
            const dimensions = props.posterSize?.split(",");
            setWidth(parseFloat(dimensions ? dimensions[0] : "0"));
            setHeight(parseFloat(dimensions ? dimensions[1] : "0"));
        }
    }, []);

    return (
        <div className="card">
            {!isOrdering && <img src={props.imageLink}  alt="Poster" className="product-image"></img>}
            {
                isOrdering && 
                <>
                    <div className="order-modal" style={{ opacity: isLoading ? 0.25 : 1 }}>
                        <span className="order-title">Order</span>
                        <p className="order-desc">This poster has dimensions of {width} inches by {height} inches and is printed in color on high quality card stock paper. Tax and shipping costs are included in the price.</p>
                        <p className="order-title" style={{ marginBottom: 0 }}>Process</p>
                        <ol className="order-steps">
                            <li>Submit your order</li>
                            <li>Get text confirmation</li>
                            <li>Payment is invoiced</li>
                            <li>Poster is shipped!</li>
                        </ol>
                        <p className="order-desc">Orders are typically processed within 24 hours. Send us a DM on <a className="insta-link" href="https://instagram.com/honeycombstudios__">Insta</a> if you have not received a confirmation.</p>
                        <input id="name" type="text" className="order-input" placeholder="Name" style={{ marginTop: "1em", border: nameError ? "2px solid #E35752" : "none" }}></input>
                        <input id="phone-number" type="text" className="order-input" placeholder="Phone Number" style={{ border: phoneNumberError ? "2px solid #E35752" : "none" }}></input>
                    </div>
                    {isLoading && <img src={hexagon} className="loading-hexagon" alt="logo"></img>}
                </>
            }
            <div className="product-information-container">
                <span className="product-title">{props.posterName}</span>
                <span className="product-price">${props.price}</span>
            </div>
            <button id={`submit-button-${props.posterName}`} type="button" className="order-button" onClick={openOrderModal}>{isOrdering ? "SUBMIT" : "ORDER"}</button>
        </div>
    );
}
