import React from 'react';
import firebaseVars from '../firebase';
import cstm from './static/CustomPoster.jpg';

export default class ItemDisplay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            index: 0,
        };
        this.ranOnce = false;
        this.getData = this.getData.bind(this);
        this.getModalPictures = this.getModalPictures.bind(this);
        this.getItemPictures = this.getItemPictures.bind(this);
        this.openModal = this.openModal.bind(this);
    };

    async getData() {
        await firebaseVars.db.collection('data').get().then((querySnapshot) => {
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

    openModal(index, title, price) {
        this.getModalPictures(index);
        var modal = document.getElementById('modal');
        var opacity = document.getElementById('opacity');
        var modalName = document.getElementById('modalName');
        var modalPrice = document.getElementById('modalPrice');
        var modalDesc = document.getElementById('modalDesc');
        var error = document.getElementById('error');
        error.style.display = 'none';
        modalName.innerHTML = title;
        modalPrice.innerHTML = '$' + price;
        if (index === 777) {
            modalDesc.innerHTML = 'Request a custom poster using the order form below. The poster will have dimensions of eleven inches by seventeen inches and will be printed in color on high quality card stock paper. We will be in contact within one business day.';
        }
        else {
            modalDesc.innerHTML = 'The official ' + title + ' poster by tree studios. This poster has dimensions of eleven inches by seventeen inches and is printed in color on high quality card stock paper.';
        }
        modal.style.display = 'flex';
        opacity.style.display = 'block';
    };

    getModalPictures(index) {
        var modalImg = document.getElementById('modalImg');
        if (index === 777) {
            modalImg.src = cstm;
        }
        else {
            firebaseVars.storageRef.child(`${Object.values(this.state.data)[index].posterName}.jpg`).getDownloadURL().then((link) => {
                modalImg.src = link;
            });
        }
    }

    getItemPictures(index) {
        var itemImg = document.getElementsByClassName("itemPic")
        firebaseVars.storageRef.child(`${Object.values(this.state.data)[index].posterName}.jpg`).getDownloadURL().then((link) => {
            itemImg[index].src = link;
        });
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <> <div id="products" className="prodContain">
                {this.state.data.map(function (data, index) {
                    return <div key={index} className="item" onClick={() => this.openModal(index, data.posterName, data.price)}>
                        <img id={`img${index}`} src={this.getItemPictures(index)} className="itemPic" alt=""></img>
                        <span className="itemName">{data.posterName}</span>
                        <span className="itemPrice">${data.price}</span>
                    </div>
                }, this)
                }
                </div>
                <button onClick={() => this.openModal(777, 'Custom Poster', '20')} className='customButton'>custom order</button>
            </>
        )
    };
}