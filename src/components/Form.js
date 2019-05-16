import React from "react";

class Form extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <form class="form-inline justify-content-center" onSubmit={this.props.handleSubmit.bind(this)}>
                <div>
                    <label class="sr-only" for="from">From</label>
                    <div class="input-group mb-2 mr-sm-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text">From</div>
                        </div>
                        <input list="from-suggestions" class="form-control" id="from" value={this.props.from} onChange={this.props.fromChange.bind(this)} />
                        <datalist id="from-suggestions">
                            {this.props.fromSuggestions}
                        </datalist>
                    </div>
                </div>

                <div>
                    <label class="sr-only" for="to">To</label>
                    <div class="input-group mb-2 mr-sm-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text">To</div>
                    </div>
                    <input list="to-suggestions" class="form-control" id="to" value={this.props.to} onChange={this.props.toChange.bind(this)} />
                    <datalist id="to-suggestions">
                        {this.props.toSuggestions}
                    </datalist>
                    </div>
                </div>

                <button type="submit" class="btn btn-primary mb-2">Submit</button>
            </form>
        );
    }
}

export default Form;