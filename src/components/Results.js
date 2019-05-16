import React from "react";
import rapidapi from "../../config/rapidapi";

class Results extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            results: []
        }
    }

    async componentWillMount() {
        const url = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/" + this.props.from + "/" + this.props.to + "/anytime";
        const headers = rapidapi;
        try {
            const res = await fetch(url, {headers: headers});
            const data = await res.json();

            const results = data.Quotes.map((quote) => {
                // TODO: apply Redis here
                let carriers = {};
                for (const carrier of data.Carriers) {
                    carriers[carrier.CarrierId] = carrier.Name;
                }

                let places = {};
                for (const place of data.Places) {
                    places[place.PlaceId] = place.IataCode;
                }

                const firstCarrier = carriers[quote.OutboundLeg.CarrierIds[0]];
                const origin = places[quote.OutboundLeg.OriginId];
                const destination = places[quote.OutboundLeg.DestinationId];

                return(
                    <li class="list-group-item" key={quote.QuoteId}>{origin} to {destination} via {firstCarrier} for ${quote.MinPrice} on {quote.OutboundLeg.DepartureDate}</li>
                );
            });

            this.setState({results: results});
            this.setState({loading: false});
        } catch(e) {
            console.log(e);
        }
    }

    render() {
        if (!this.state.loading) {
            return (
                <div class="card">
                    <ul class="list-group list-group-flush">
                        {this.state.results}
                    </ul>
                </div>
            )
        }
        else {
            return null;
        }
    }
}

export default Results;