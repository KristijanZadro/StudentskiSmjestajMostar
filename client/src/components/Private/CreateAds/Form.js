import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    FormControl: {
        width: 300,
        
    },
    CheckBox: {
        display: "flex"
    }
})

export default withStyles(styles)(class Form extends Component {
    constructor(){
        super()
        this.state = {
            title:'', 
            images: [], 
            price: '',
            address: '',
            peopleAllowed: '',
            size: '',
            pets: false,
            balcony: false,
            desc: ''

        }
    }
    
    handleChange = ({ target: { value, name } }) => { 
        this.setState({
            [name]: value
        })

    }
    /*handleSubmit = () => {
        this.props.onSubmit({
            id: this.state.title.toLocaleLowerCase().replace(/ /g,'-'),
            ...this.state
        })
    }*/
    render() {
        const { title, images, price, address, peopleAllowed, size, pets, balcony, desc } = this.state
        const numbers = [1, 2, 3, 4, 5, 6]
        return (
            <div>
                <form>
                        <TextField
                            label="Title"
                            value={title}
                            name='title'
                            onChange={this.handleChange}
                            margin="normal"
                            className={this.props.classes.FormControl}
                        />
                        <br/>
                        <TextField
                            label="Price"
                            value={price}
                            name='price'
                            onChange={this.handleChange}
                            margin="normal"
                            className={this.props.classes.FormControl}
                        />
                        <br/>
                        <TextField
                            label="Adress"
                            value={address}
                            name='address'
                            onChange={this.handleChange}
                            margin="normal"
                            className={this.props.classes.FormControl}
                        />
                        <br/>
                        <FormControl className={this.props.classes.FormControl}>
                            <InputLabel id="peopleAllowed">People Allowed</InputLabel>
                            <Select
                                value={peopleAllowed}
                                name='peopleAllowed'
                                onChange={this.handleChange}
                            >
                                {
                                     numbers.map((num, i) => 
                                        <MenuItem key={i} value={num}>{num}</MenuItem>
                                    )
                                
                                    
                                }
                            </Select>
                        </FormControl>
                        <br/>
                        <TextField
                            label="Size"
                            value={size}
                            name='size'
                            onChange={this.handleChange}
                            margin="normal"
                            className={this.props.classes.FormControl}
                        />
                        <br/>
                        <div className={this.props.classes.CheckBox}>
                            <label>Pets</label> 
                            <Checkbox
                                value={pets}
                                name="pets"
                                onChange={this.handleChange}
                                color="primary"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                            <br/>
                            <label>balcony</label> 
                            <Checkbox
                                value={balcony}
                                name="balcony"
                                onChange={this.handleChange}
                                color="primary"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                            <br/>  
                        </div>
                        
                        
                    </form>
            </div>
        )
    }
}
)