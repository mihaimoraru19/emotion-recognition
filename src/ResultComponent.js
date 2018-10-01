import React from 'react';
import { Header, Loader } from 'semantic-ui-react'

export default class Result extends React.Component {

    static getMaxFromObject(o) {
        let vals = [];
        for(let i in o) {
            vals.push(o[i]);
        }

        let max = Math.max.apply(null, vals);

        for(let i in o) {
            if(o[i] === max) {
                return i;
            }
        }
    }

    static capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    static getFeeling(emotion, smile) {
        let emotionClone = {};
        if(emotion.happiness + emotion.surprise >=0.35 && emotion.happiness >=0.1 && emotion.surprise >=0.1 && smile >= 0.05) return 'In Love';
        if(emotion.anger + emotion.disgust + emotion.contempt >=0.35 && (emotion.disgust >= 0.1 || emotion.contempt >= 0.1) && emotion.anger >= 0.1) return 'Hate';
        if(emotion.surprise >= 0.1 && emotion.fear >= 0.1) return 'Confused';
        if(emotion.neutral < 0.65) {
            emotionClone = Object.assign({}, emotion);
            delete emotionClone.neutral;
        }
        if(emotion.neutral > 0.65) return 'Neutral';
        else {
            let feeling = Result.getMaxFromObject(emotionClone);
            let result;
            switch(feeling) {
                case 'happiness':
                    result = 'Happy';
                    break;
                case 'sadness':
                    result = 'Sad';
                    break;
                case 'anger':
                    result = 'Angry';
                    break;
                case 'surprise':
                    result = 'Surprised';
                    break;
                case 'contempt':
                    result = 'Unsatisfied / Disagree';
                    break;
                case 'disgust':
                    result = 'Disgusted';
                    break;
                case 'fear':
                    result = 'Frightened';
                    break;
                default:
                    result = 'Error';
                    break;
            }
            return result;
        }
    }

    render() {
        const { data } = this.props;
        if (data.error && !this.props.loading) {
            return (
                <div>
                    <Header size='large'>Error! Try again with another photo.</Header>
                </div>
            )
        }
        else if(!!data.faceAttributes && !this.props.loading) {
            return (
                <div style={{marginLeft: '100px'}}>
                    <Header size='large' style={{textAlign: 'left', fontSize: '24px'}}>Results:</Header>
                    <div className='Results'>
                        <p>
                            Visual Age: {data.faceAttributes.age}<br/>
                            Gender: {Result.capitalizeFirstLetter(data.faceAttributes.gender)}<br/>
                            Predominant Emotion: {Result.capitalizeFirstLetter(Result.getMaxFromObject(data.faceAttributes.emotion))}<br/>
                            Feeling: {Result.getFeeling(data.faceAttributes.emotion, data.faceAttributes.smile)}
                        </p>
                    </div>
                </div>
            );
        }
        else if (this.props.loading) {
            return (
                <div>
                    <Loader active inline='centered' size='huge' />
                </div>
            );
        }
        else return (
            <div>
                <Header size='large'>No photo uploaded.</Header>
            </div>
        )
    }
}