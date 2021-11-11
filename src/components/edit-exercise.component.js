import React, { Component } from "react";
// import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default class EditExercise extends Component {
    constructor(props){
        super(props);
        console.log(this.props);

        this.onChangeUser = this.onChangeUser.bind(this);
        this.onChangeDesc = this.onChangeDesc.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: "",
            description: "",
            duration: 0,
            date: new Date(),
            users: [],
        }
    }
    componentDidMount(){
        console.log(this.props);
        axios.get("http://localhost:5000/exercises/" + this.props.match.params.id)
            .then(response=> {
                this.setState({
                    username: response.data.username,
                    description: response.data.description,
                    duration: response.data.duration,
                    date: new Date(response.data.date)
                })
            })
            .catch((err)=> {
                console.log(err);
            })
        axios.get("http://localhost:5000/users/")
            .then(response=> {
                this.setState({ users: response.data.map(user=> user.username) });
            })
            .catch((err)=> {
                console.log(err);
            })
    }

    onChangeUser(e){
        this.setState({ username: e.target.value });
    }
    onChangeDesc(e){
        this.setState({ description: e.target.value });
    }
    onChangeDuration(e){
        this.setState({ duration: e.target.value });
    }
    onChangeDate(date){
        this.setState({ date });
    }
    onSubmit(e){
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date,
        };

        console.log(exercise);
        axios.post("http://localhost:5000/exercises/update/"+this.props.match.params.id, exercise)
            .then(res=> console.log(res.data));

        window.location = "/"
    }

    render() {
        return(
            <div>
                <h3>Edit Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUser}>
                            {this.state.users.map((user)=> {
                                return <option
                                    key={user}
                                    value={user}>{user}
                                    </option>
                            })}    
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDesc}
                            />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input type="text" 
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                            />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <DatePicker
                            selected={this.state.date}
                            onChange={this.onChangeDate}
                            />
                    </div>
                    <div className="form-group">
                        <input type="submit"
                            value="Edit Exercise Log"
                            className="btn btn-primary"
                            />
                    </div>
                </form>
            </div>
        );
    }
}