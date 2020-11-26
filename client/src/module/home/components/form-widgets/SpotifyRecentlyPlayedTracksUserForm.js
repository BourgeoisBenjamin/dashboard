import React, {Component} from "react";
import NumberInput from "../../../../shared/components/inputs/NumberInput";

class SpotifyRecentlyPlayedTracksUserForm extends Component
{
    render() {
        return (
            <div class="widget-form">
                <div className="input-parameters">
                    <NumberInput name="Number tweets" value={this.state.numberTweets} onChange={this.handleNumberTweetsChange} />
                </div>
            </div>
        );
    }
}

export default SpotifyRecentlyPlayedTracksUserForm;