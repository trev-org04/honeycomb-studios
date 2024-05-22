import React from 'react';
import firebaseVars from './firebase';

export default class ItemDisplay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            index: 0,
        };
        this.ranOnce = false;
        this.getData = this.getData.bind(this);
        // this.getModalPictures = this.getModalPictures.bind(this);
        this.getItemPictures = this.getItemPictures.bind(this);
        // this.openModal = this.openModal.bind(this);
    };

    async getData() {
        await firebaseVars.db.collection('posters').get().then((querySnapshot) => {
            querySnapshot.forEach(async (element) => {
                if (this.ranOnce === false) {
                    let a = this.state.data;
                    a.push(element.data());
                    this.setState({ data: a});
                }
            });
            this.ranOnce = true;
        });
    }

    getItemPictures(index) {
        var itemImg = document.getElementsByClassName("product-image")
        firebaseVars.storageRef.child(`${Object.values(this.state.data)[index].posterName}.jpg`).getDownloadURL().then((link) => {
            itemImg[index].src = link;
        });
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <> <div id="products" className="card-container">
                {this.state.data.map(function (data, index) {
                    return <div key={index} className="card">
                        <img id={`img${index}`} src={this.getItemPictures(index)}  alt="Poster" class="product-image"></img>
                        <div class="product-information-container">
                            <span className="product-title">{data.posterName}</span>
                            <span className="product-price">${data.price}</span>
                        </div>
                        <div className="order-button">
                            <span className="order-button-text">ORDER NOW</span>
                            <span class="material-symbols-sharp button-arrow" aria-hidden="true">trending_flat</span>
                        </div>
                    </div>
                }, this)
}
                </div>
            </>
        )
    };
}