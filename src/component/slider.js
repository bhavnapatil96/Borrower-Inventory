import React, { Component } from 'react';
import './slider.css';
const slider_image = [
    "https://4.imimg.com/data4/YR/EL/MY-10090683/girls-partywear-gown-500x500.jpg",
    "https://image.dhgate.com/0x0/f2/albu/g5/M00/D0/F5/rBVaJFkmbjiAHHEmAApvdne9KFs953.jpg",
    "https://preview.ibb.co/j8nRCQ/fashion2.jpg",
    "https://preview.ibb.co/fm4Cmk/fashion3.jpg",
    "https://preview.ibb.co/bMsCK5/fashion5.jpg",
    "https://preview.ibb.co/fm4Cmk/fashion6.jpg",
    "data:image/jpeg;base64,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",
];
export default class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
        };
    }
    incrementIndex = () => {
        const newIndex = this.state.index + 1;
        this.setState({ index: newIndex })
    };
    componentDidMount(){
        setInterval(this.incrementIndex, 3000);
    };
    render() {
        const index = this.state.index % slider_image.length;
        var divStyle = {backgroundImage: 'url(' + slider_image[index] + ')',};
        return(
            <div>
                <div className="slider" style={divStyle}>
                </div>
            </div>
        )
    }
}