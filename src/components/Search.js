import React from "react";
import Form from "./Form";
import Results from "./Results";

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            from: '',
            to: '',
            submitted: false
        }

        this.fromChange = this.fromChange.bind(this);
        this.toChange = this.toChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    fromChange(event) {
        this.setState({from: event.target.value});
    }

    toChange(event) {
        this.setState({to: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({submitted: true});
    }

    render() {
        if (!this.state.submitted) {
            return (
                <div>
                    <Form
                        from={this.state.from}
                        to={this.state.to}
                        fromChange={this.fromChange}
                        toChange={this.toChange}
                        handleSubmit={this.handleSubmit}/>
                </div>
            );
        }
        else {
            return (
                <div>
                    <Form
                        from={this.state.from}
                        to={this.state.to}
                        fromChange={this.fromChange}
                        toChange={this.toChange}
                        handleSubmit={this.handleSubmit}/>
    
                    <Results
                        from={this.state.from}
                        to={this.state.to}/>
                </div>
            );
        }
    }
}

export default Search;