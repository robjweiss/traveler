import React from "react";

class Search extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <label class="sr-only" for={this.props.label}>{this.props.label}</label>
                <div class="input-group mb-2 mr-sm-2">
                <div class="input-group-prepend">
                    <div class="input-group-text">{this.props.label}</div>
                </div>
                <input type="text" class="form-control" id={this.props.label}/>
                </div>
            </div>
        );
    }
}

export default Search;