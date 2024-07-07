import React, { useState } from 'react';
import firebaseVars from './firebase';

interface ItemCardProps {
    imageLink: string;
    posterName: string;
    price: string;
}

export default function ItemCard (props: ItemCardProps) {

    const [isOrdering, setIsOrdering] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);

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
                firebaseVars.db.collection("orders").add({
                    "posterName": props.posterName,
                    "name": name,
                    "phoneNumber": phoneNumber,
                    "orderedAt": new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }),
                });
            }
            else {
                if (!name || name.length < 3) setNameError(true);
                if (!phoneNumber || !/^[0-9]+$/.test(phoneNumber) || phoneNumber.length < 10) setPhoneNumberError(true);
            }
        }
    }

    return (
        <div className="card">
            {!isOrdering && <img src={props.imageLink}  alt="Poster" className="product-image"></img>}
            {
                isOrdering && <div className="order-modal">
                    <span className="order-title">Order</span>
                    <p className="order-desc">This poster has dimensions of 11 inches by 17 inches and is printed in color on high quality card stock paper. Tax and shipping costs are included in the price.</p>
                    <p className="order-title" style={{ marginBottom: 0 }}>Process</p>
                    <ol className="order-steps">
                        <li>Submit your info</li>
                        <li>Confirmed via text</li>
                        <li>Payment is invoiced</li>
                        <li>Poster is shipped!</li>
                    </ol>
                    <input id="name" type="text" className="order-input" placeholder="Name" style={{ marginTop: "1em", border: nameError ? "2px solid #E35752" : "none" }}></input>
                    <input id="phone-number" type="text" className="order-input" placeholder="Phone Number" style={{ border: phoneNumberError ? "2px solid #E35752" : "none" }}></input>
                </div>
            }
            <div className="product-information-container">
                <span className="product-title">{props.posterName}</span>
                <span className="product-price">${props.price}</span>
            </div>
            <button type="button" className="order-button" onClick={openOrderModal}>{isOrdering ? "SUBMIT" : "ORDER"}</button>
        </div>
    );
}
