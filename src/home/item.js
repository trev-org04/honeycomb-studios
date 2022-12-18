import React from 'react';
import firebaseVars from '../firebase';
import cstm from './static/CustomPoster.jpg';

export default class Item extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            posterData: [],
            imgLink0: '',
            imgLink1: '',
            imgLink2: '',
            imgLink3: '',
            imgLink4: '',
            index: 0,
        };
        this.ranOnce = false;
        this.getData = this.getData.bind(this);
        this.getPictures = this.getPictures.bind(this);
        this.openModal = this.openModal.bind(this);
    };

    async getData() {
        await firebaseVars.db.collection('data').limit(5).get().then((querySnapshot) => {
            querySnapshot.forEach(async (element) => {
                if (this.ranOnce === false) {
                    let a = this.state.data;
                    a.push(element.data());
                    this.setState({ data: a });
                    this.setState({ posterData: a });
                }
            });
            this.ranOnce = true;
            this.getPictures(this.state.data);
        });
    }

    openModal(index, title, price) {
        var modal = document.getElementById('modal');
        var opacity = document.getElementById('opacity');
        var modalImg = document.getElementById('modalImg');
        var modalName = document.getElementById('modalName');
        var modalPrice = document.getElementById('modalPrice');
        var modalDesc = document.getElementById('modalDesc');
        var error = document.getElementById('error');
        error.style.display = 'none';
        if (index === 0) {
            modalImg.src = this.state.imgLink0;
        }
        else if (index === 1) {
            modalImg.src = this.state.imgLink1;
        }
        else if (index === 2) {
            modalImg.src = this.state.imgLink2;
        }
        else if (index === 3) {
            modalImg.src = this.state.imgLink3;
        }
        else if (index === 4) {
            modalImg.src = this.state.imgLink4;
        }
        else if (index === 777) {
            modalImg.src = cstm;
        }
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

    getPictures(arr) {
        for (let i = 0; i <= 4; i++) {
            firebaseVars.storageRef.child(`${Object.values(arr)[i].posterName}.jpg`).getDownloadURL().then((link) => {
                if (i === 0) {
                    this.setState({ imgLink0: link });
                }
                else if (i === 1) {
                    this.setState({ imgLink1: link });
                }
                else if (i === 2) {
                    this.setState({ imgLink2: link });
                }
                else if (i === 3) {
                    this.setState({ imgLink3: link });
                }
                else {
                    this.setState({ imgLink4: link });
                }
            });
        }
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <><div id="products" className="itemContain">
                {this.state.data.map(function(data, index) {
                    return <div key={index} className="item" onClick={() => this.openModal(index, data.posterName, data.price)}>
                        <img id={`img${index}`} src={`${index === 0 ? this.state.imgLink0 : index === 1 ? this.state.imgLink1 : index === 2 ? this.state.imgLink2 : index === 3 ? this.state.imgLink3 : index === 4 ? this.state.imgLink4 : null}`} className="itemPic" alt=""></img>
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