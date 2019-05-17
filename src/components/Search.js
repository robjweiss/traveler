import React from "react";
import Form from "./Form";
import Results from "./Results";
import rapidapi from "../../config/rapidapi";

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            from: '',
            fromSuggestions: [],
            to: '',
            toSuggestions: [],
            destPopularity: 0,
            submitted: false,
            newSearch: false
        }

        this.fromChange = this.fromChange.bind(this);
        this.toChange = this.toChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getPlaceSuggestions = this.getPlaceSuggestions.bind(this);
    }

    async fromChange(event) {
        this.setState({from: event.target.value});

        try {
            const suggestions = await this.getPlaceSuggestions(event.target.value);
            this.setState({fromSuggestions: suggestions});
        } catch(e) {
            console.log(e);
        }
    }

    async toChange(event) {
        this.setState({to: event.target.value});

        try {
            const suggestions = await this.getPlaceSuggestions(event.target.value);
            this.setState({toSuggestions: suggestions});
        } catch(e) {
            console.log(e);
        }
    }

    async handleSubmit(event) {
        event.preventDefault();

        if(this.state.submitted) {
            this.setState({newSearch: true});
        }

        this.setState({submitted: true});

        // Store search in redis
        await fetch("http://localhost:4000/api", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ to: this.state.to })
        });

        // Get destination popularity from redis
        const res = await fetch("http://localhost:4000/api/popular/" + this.state.to);
        const stats = await res.json();
        this.setState({destPopularity: stats.popularity});
        this.setState({newSearch: false});
    }

    async getPlaceSuggestions(query) {
        // 2 characters is the minimum query length allowed by the API
        if(query.length >= 2) {
            const url = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/USA/USD/en-US/?query=" + query;
            const headers = rapidapi;
            try {
                const res = await fetch(url, {headers: headers});
                const data = await res.json();

                const suggestions = data.Places.map((place) => {
                    return(
                        <option key={place.PlaceId} value={place.PlaceId} label={place.PlaceName}/>
                    );
                });

                return suggestions;
            } catch(e) {
                console.log(e);
            }
        }
        // Reset the suggestions if the character count falls below 2
        else {
            return [];
        }
    }

    render() {
        if (!this.state.submitted) {
            return (
                <div>
                    <Form
                        from={this.state.from}
                        fromSuggestions={this.state.fromSuggestions}
                        to={this.state.to}
                        toSuggestions={this.state.toSuggestions}
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
                        fromSuggestions={this.state.fromSuggestions}
                        to={this.state.to}
                        toSuggestions={this.state.toSuggestions}
                        fromChange={this.fromChange}
                        toChange={this.toChange}
                        handleSubmit={this.handleSubmit}/>
    
                    <Results
                        from={this.state.from}
                        to={this.state.to}
                        destPopularity={this.state.destPopularity}
                        newSearch={this.state.newSearch}/>
                </div>
            );
        }
    }
}

export default Search;