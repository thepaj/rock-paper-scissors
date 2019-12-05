import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const picSrc = {
    rock: 'https://pngimage.net/wp-content/uploads/2018/06/rock-icon-png-4.png',
    paper: 'https://img.icons8.com/ios/420/toilet-paper.png',
    scissors: 'https://cdn2.iconfinder.com/data/icons/flat-icons-19/512/Sclssors.png'
}

const picArray = [picSrc.rock, picSrc.paper, picSrc.scissors];


const Header = () => {
    return (
        <div className="header" >
            <div className="heading-main">
                rock paper scissors
        </div>
            <div className="heading-sub">
                by thepaj
            </div>

        </div>
    )
}

const Counter = ({ playerScore, opponentScore }) => {

    return (
        <div>
            {playerScore}
            {opponentScore}
        </div>
    )

}
    
class Pic extends React.Component {
    render() {
        const { pic } = this.props;

        return (
            <div className="pictures" >
                <img className="hand" alt='hand' src={pic} onClick={this.props.click} />
            </div>
        );
    };
};

class Opponent extends React.Component {

    render() {

        if (this.props.opponentState === null) {
            return <div></div>
        } else {
            return (
                <div className="pictures" >
                    <img className="hand" alt='hand' src={this.props.opponentState} />
                </div>
            );
        };
    };
};

class WhoIsTheWinnerRe extends React.Component {
    render() {
        return <div>{this.props.result}</div>;
    }
}

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            opponentState: null,
            playerState: null,
            gameResultState: null,
            counterPlayerState: 0,
            counterOpponentState: 0
        };

        this.picClick = this.picClick.bind(this);
        this.gameResult = this.gameResult.bind(this);
    }

    picClick(pic) {
        this.setState({
            opponentState: this.randomPicture(),
            playerState: pic
        });
    }

    randomPicture() {
        const random = Math.floor(Math.random() * picArray.length);
        return picArray[random];
    }

    gameResult() {
        let win;
        if (this.state.playerState === picSrc.rock && this.state.opponentState === picSrc.rock) {
            win = 'draw';
        } else if (this.state.playerState === picSrc.rock && this.state.opponentState === picSrc.paper) {
            win = 'you lose';
        } else if (this.state.playerState === picSrc.rock && this.state.opponentState === picSrc.scissors) {
            win = 'you win';
        } else if (this.state.playerState === picSrc.paper && this.state.opponentState === picSrc.paper) {
            win = 'draw';
        } else if (this.state.playerState === picSrc.paper && this.state.opponentState === picSrc.scissors) {
            win = 'you lose';
        } else if (this.state.playerState === picSrc.paper && this.state.opponentState === picSrc.rock) {
            win = 'you win';
        } else if (this.state.playerState === picSrc.scissors && this.state.opponentState === picSrc.scissors) {
            win = 'draw';
        } else if (this.state.playerState === picSrc.scissors && this.state.opponentState === picSrc.rock) {
            win = 'you lose';
        } else if (this.state.playerState === picSrc.scissors && this.state.opponentState === picSrc.paper) {
            win = 'you win';
        }

        this.setState({
            gameResultState: win
        })

        if (win === 'you win') {
            this.setState({

                counterPlayerState: this.state.counterPlayerState + 1,
            })
        } else if (win === 'you lose') {
            this.setState({
                counterOpponentState: this.state.counterOpponentState + 1
            })
        }

        return win;

    }


    render() {
        return (
            <div>
                <Header />
                <div className="row">
                    <Counter
                        playerScore={this.state.counterPlayerState}
                        opponentScore={this.state.counterOpponentState}
                    />
                    <div className="column-1">
                        <Pic
                            pic={picSrc.rock}
                            click={() => { this.picClick(picSrc.rock); this.gameResult() }}
                        />
                        <Pic
                            pic={picSrc.paper}
                            click={() => { this.picClick(picSrc.paper); this.gameResult() }}
                        />
                        <Pic
                            pic={picSrc.scissors}
                            click={() => { this.picClick(picSrc.scissors); this.gameResult() }}
                        />
                    </div>
                    <div className="column-2">
                        <WhoIsTheWinnerRe
                            result={this.state.gameResultState}
                        />
                    </div>
                    <div className="column-3">
                        <Opponent
                            opponentState={this.state.opponentState}
                        />
                    </div>
                </div>

            </div >
        );
    }
};

ReactDOM.render(
    <Game />,
    document.querySelector('#root')
);