import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    FormControl: {
        width: 500,
        display: "flex",
        flexWrap: "wrap",
        justifyContetn: "center"
        
        
    },
    CheckBox: {
        display: "flex",
        margin: 20
    },
    TextArea: {
        display: "flex",
        flexDirection: "column",
        margin: 20,
        width: "100%"
    },
    FormControlElement: {
        margin: 20,
        width: "42%"
    },
    FormControlElementPeopleAllowed: {
        margin: 20,
        width: "42%",
        display: "flex",
        flexDirection: "row"
    },
    Button: {
        display: "flex",
        justifyContent: "center",
        width: "100%"
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
                <form className={this.props.classes.FormControl}>
                        <TextField
                            label="Title"
                            value={title}
                            name='title'
                            onChange={this.handleChange}
                            margin="normal"
                            className={this.props.classes.FormControlElement}
                            
                        />
                        <br/>
                        <TextField
                            label="Price"
                            value={price}
                            name='price'
                            onChange={this.handleChange}
                            margin="normal"
                            className={this.props.classes.FormControlElement}
                            
                        />
                        <br/>
                        <TextField
                            label="Adress"
                            value={address}
                            name='address'
                            onChange={this.handleChange}
                            margin="normal"
                            className={this.props.classes.FormControlElement}
                           
                        />
                        <br/>
                        <div className={this.props.classes.FormControlElementPeopleAllowed}>
                            <InputLabel id="input">People Allowed</InputLabel>
                            <Select
                                value={peopleAllowed}
                                name='peopleAllowed'
                                onChange={this.handleChange}
                                
                            >
                                {
                                        numbers.map((num, i) => 
                                        <MenuItem key={i} id="peopleAllowedSelect" value={num}>{num}</MenuItem>
                                    )
                                
                                    
                                }
                            </Select>
                        </div>
                        
                        
                        <br/>
                        <TextField
                            label="Size"
                            value={size}
                            name='size'
                            onChange={this.handleChange}
                            margin="normal"
                            className={this.props.classes.FormControlElement}
                            
                        />
                        <br/>
                        <div className={this.props.classes.CheckBox}>
                            <InputLabel id="input">Pets</InputLabel> 
                            <Checkbox
                                value={pets}
                                name="pets"
                                onChange={this.handleChange}
                                color="primary"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                            <br/>
                            <InputLabel id="input">Balcony</InputLabel> 
                            <Checkbox
                                value={balcony}
                                name="balcony"
                                onChange={this.handleChange}
                                color="primary"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                            <br/>
                            
                        </div>
                        <div className={this.props.classes.TextArea}>
                        <InputLabel id="desc">Description</InputLabel>
                            <TextareaAutosize
                                name="desc"
                                value={desc}
                                onChange={this.handleChange} 
                                aria-label="minimum height" 
                                rowsMin={5} 
                                placeholder="" 
                            />
                              
                        </div>
                        <div className={this.props.classes.Button}>
                            <Button variant="contained" color="primary">
                                Submit request
                            </Button>
                        </div>
                        
                        
                        
                        
                    </form>
            </div>
        )
    }
}
)