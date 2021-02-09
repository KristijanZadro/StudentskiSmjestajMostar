import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
//import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
//import { Input } from '@material-ui/core';
//import Button from '@material-ui/core/Button';
import './CreateAds.css'

import {createAd,loadModal, getAllAds} from '../../../redux/actions/adv'


import { connect } from "react-redux";
//import MyAds from '../MyAds/MyAds';

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

 class Form extends Component {
    constructor(){
        super()
        this.state = {
            title: '',  
            price: '',
            address: '',
            peopleAllowed: '',
            size: '',
            pets: false,
            balcony: false,
            desc: '',
            image: ''

        }
    }
    componentDidMount(){
        if(this.props.isEdit){
            this.setState({
                title: this.props.myAd.title || '',  
                price: this.props.myAd.price || '',
                address: this.props.myAd.address || '',
                peopleAllowed: this.props.myAd.people_allowed || '',
                size: this.props.myAd.size || '',
                pets: this.props.myAd.pets || false,
                balcony: this.props.myAd.balcony || false,
                desc: this.props.myAd.description || '',
                image: this.props.myAd.image || ''
            }) 
        }
        
       
    }
    
    
    handleChange = ({ target: { value, name } }) => { 
        this.setState({
            [name]: value
        })

    }
    handleChangeCheckBox = ({ target: { checked, name } }) => { 
        this.setState({
            [name]: checked
        })
        

    }
    handleImageChange = (e) => {
        this.setState({
            image: e.target.files
        });
        console.log(e.target.files)
    }
    
    /*handleSubmit = () => {
        this.props.onSubmit({
            id: this.state.title.toLocaleLowerCase().replace(/ /g,'-'),
            ...this.state
        })
    }*/
    /*getFormData = (object) => {
        const formData = new FormData();
        Object.keys(object).forEach(key => formData.append(key, object[key]));
        return formData;
    }*/

    onAdSend = (e) => {
        e.preventDefault()
        
        
        //let formData = this.getFormData(this.state)
        
        this.props.createAd(this.state, this.onCloseModal, this.getAds);
        
      };

      getAds = () => {
        this.props.getAllAds()
      }

      onCloseModal = () => {
          this.props.onClose()
          this.props.loadModal()
      }

    render() {
        const { title, price, address, peopleAllowed, size, pets, balcony, desc } = this.state
        const {isTitleAvailable, createAdErrorMsg, isEdit} = this.props
        const numbers = [1, 2, 3, 4, 5, 6]
        return (
            <div>
                <form className={this.props.classes.FormControl} onSubmit={this.onAdSend}>
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
                                        <MenuItem key={i} name="num" value={num}>{num}</MenuItem>
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
                                checked={pets}
                                name="pets"
                                onChange={this.handleChangeCheckBox}
                                color="primary"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                            <br/>
                            <InputLabel id="input">Balcony</InputLabel> 
                            <Checkbox
                                checked={balcony}
                                name="balcony"
                                onChange={this.handleChangeCheckBox}
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
                        <input
                            type="file"
                            name="myImage"
                            //value={this.state.image}
                            onChange={this.handleImageChange}
                            multiple
                        />
                        {
                            !isTitleAvailable ?
                            <div className="errorMsg">
                                <span>{createAdErrorMsg}</span>
                                <br />
                            </div> :
                            null
                        }
                        <div className={this.props.classes.Button}>
                            <button 
                                className="dialogFormButton"
                                //onClick={isTitleAvailable ? this.onCloseModal() : null}
                            >
                                {isEdit ? 'Edit' : 'Submit request' } 
                            </button>
                        </div>
                
                        
                    </form>
                    
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
      isTitleAvailable: state.adv.isTitleAvailable,
      createAdErrorMsg: state.adv.createAdErrorMsg,
      ads: state.adv.ads,
      sortedAds: state.adv.sortedAds

    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      createAd: (state, onCloseModal, getAds ) =>
        dispatch(createAd(state, onCloseModal, getAds)),
      loadModal: () => dispatch(loadModal()),
      getAllAds: () => dispatch(getAllAds()),
    };
  };
  
  export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Form));