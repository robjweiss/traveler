import React from "react";

class Tweets extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tweets: []
        }
    }

    componentWillMount() {
        const socket = io("http://localhost:4000");

        socket.on("tweet", (tweet) => {
            this.setState(prevState => ({
                tweets: [...prevState.tweets, <li class="list-group-item" key={tweet.id_str}>{tweet.text}</li>]
            }));

            console.log(this.state.tweets);
        });
    }



    render() {
        return (
            <div class="card">
                <div class="card-header text-center">
                    Tweets
                </div>
                <div class="card-body scroll">
                    <ul class="list-group list-group-flush">
                        {this.state.tweets}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Tweets;