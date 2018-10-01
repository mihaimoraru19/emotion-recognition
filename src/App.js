import React from 'react';
import './App.css';
import Dropzone from 'react-dropzone';
import { Image, Icon } from 'semantic-ui-react';
import axios from 'axios';
import Result from './ResultComponent';

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            photo: [],
            accepted: false,
            clientId: 'YOUR IMGUR CLIENT ID',
            subscriptionKey: 'YOUR MS FACE API SUBSCRIPTION KEY',
            data: {},
            loading: false
        };
    }

    onDropTry = acceptedFiles => {
            this.setState({accepted: true, photo: acceptedFiles, loading: true});
            acceptedFiles.forEach(file => {
                const reader = new FileReader();
                reader.onload = () => {
                this.uploadImgurImage(reader.result);
                };
            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');

            reader.readAsDataURL(file);
            });
    };

    uploadImgurImage(file) {
        axios({
            method: 'POST',
            url: 'https://api.imgur.com/3/image',
            data: file.substring(22),
            headers: {
                'Authorization': `Client-ID ${this.state.clientId}`
            }
        }).then(res => this.urlRequest(res.data.data.link))
    }

    urlRequest(url) {
        const {subscriptionKey} = this.state;
        axios({
            method: 'POST',
            url: `https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise`,
            data: {
                url: url
            },
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': subscriptionKey
            }
        }).then(response => this.setState({data: response.data[0], loading: false}))
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Emotion Recognition Prototype</h1>
                </header>
                <div className="Main-container">
                    <p className="App-intro">
                        To use the face & emotion recognition prototype, please upload a photo.
                    </p>
                    <div style={{display: 'flex', marginTop: '100px'}}>
                        <div style={{flex: 0.5}}>
                            <div style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Dropzone
                                multiple={false}
                                onDrop={this.onDropTry}
                                accept="image/*"
                                style={{
                                    width: '250px',
                                    height: '55px',
                                    borderWidth: '2px',
                                    borderColor: 'black',
                                    borderStyle: 'double',
                                    borderRadius: '50px',
                                    background: 'orange',
                                    textAlign: 'center'
                                }}>
                                <p style={{fontWeight: 'bold', display: 'flex-column', justifyContent: 'center', alignItems: 'center'}}>
                                    <span style={{display: 'flex', justifyContent: 'center', alignSelf: 'center'}}>Click to upload OR drag photo here</span>
                                    <Icon name="cloud upload" size="big" />
                                </p>
                            </Dropzone>
                            {this.state.accepted && <Image style={{marginTop: '35px'}} src={this.state.photo[0].preview} size="medium" rounded />}
                            </div>
                        </div>
                        <div style={{flex: 0.5}}>
                            <Result data={this.state.data ? this.state.data : {error: true}} loading={this.state.loading}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
