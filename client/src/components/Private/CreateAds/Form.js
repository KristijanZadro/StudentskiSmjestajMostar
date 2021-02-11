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
//import ImageModal from './ImageModal'

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {createAd,loadModal, getAllAds, updateAdv, getMyAd,deleteImage,uploadNewImage} from '../../../redux/actions/adv'
import {CgRemove} from 'react-icons/cg'

import { connect } from "react-redux";
import {AiOutlinePlus} from "react-icons/ai"
//import { Input } from '@material-ui/core';
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
            image: [],
            isOpen: false,
            clickedImage: '',
            isDeleted: false,
            newImage: '',
            showNewImage: '',
            isClicked : false,
            chooseFiles: []
           
       
            

        }
    }
    componentDidMount(){
        if(this.props.isEdit){
            console.log("myad images",this.props.myAd.images)
            let images = this.props.myAd.images.split(',')
           
            this.setState({
                title: this.props.myAd.title || '',  
                price: this.props.myAd.price || '',
                address: this.props.myAd.address || '',
                peopleAllowed: this.props.myAd.people_allowed || '',
                size: this.props.myAd.size || '',
                pets: this.props.myAd.pets === 1 ? true : false,
                balcony: this.props.myAd.balcony === 1 ? true : false,
                desc: this.props.myAd.description || '',
                image: images || [],
                
            })
          
           
        }
        
       
    }
    handleToggle = (index) => {
        const openCopy = !this.state.isOpen
        if(index !== null ){
            let images = [...this.state.image]
            let image = images[index]
            this.setState({
                clickedImage: image,
                
         
            })
        }
        
        this.setState({
            isOpen: openCopy,
            
        })
        
        
    }
    onDeleteImage = (modalImage) => {
        const {image} = this.state
        let images = [...image]
        let filterImages = images.filter(img => img !== modalImage)
        this.setState({
            image: filterImages,
            isDeleted: true,
            isOpen: false
        })
        
        this.props.deleteImage(modalImage, filterImages, this.props.myAd.advertisement_id)
        //console.log(modalImage)
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
    
    handleNewImageUpload = (e) => {
        const {image,chooseFiles} = this.state
        let newImageCopy = e.target.files[0]
        let chooseFilesCopy = [...chooseFiles, newImageCopy]
        this.setState({
            newImage: newImageCopy,
            //image: [...image, newImageCopy],
            chooseFiles: chooseFilesCopy,
            image: [...image, newImageCopy.name],
            isClicked: true,
            clickedImage: newImageCopy
           
        });
        
        
        this.props.uploadNewImage(newImageCopy,image)
        console.log(e.target.files[0])
        /*this.props.uploadLoading ?
            <p>Loading..</p> :
   
            <img 
            src={`http://localhost:5000/static/${this.state.clickedImage.name}`} 
            alt="" 
            
        /> */
    
        
        
    }
    handleClick = (index) => {
        console.log(index)
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
      onAdUpdate = (e) => {
          e.preventDefault()
          this.props.updateAdv(this.state, this.onCloseModal, this.props.myAd.advertisement_id)
      }

      getAds = () => {
        this.props.getAllAds()
      }

      onCloseModal = () => {
          this.props.onClose()
          this.props.loadModal()
          this.props.getMyAd()
      }
      ChooseFileRender = () => {
        let {image} = this.state
        console.log(image)
        let imageNumber = image.length
        console.log("length",image.length)
        let number = 5
        let arr = Array.from(Array(number-imageNumber).keys())
        
       

        let chooseFiles = arr.map((file,index) => {
            
                file =  <label className="choose-file" key={index}>
                                    <input 
                                        type="file" 
                                        placeholder="" 
                                        name={"newImage"}  
                                        onChange={this.handleNewImageUpload}
                                        className="input-file"

                                    />
                                    <div className="add-new-image" ><AiOutlinePlus /></div>  
                      
                        </label> 
                return file
                
        });
       
        
        return chooseFiles
        
        
      }
   

    render() {
        const { title, price, address, peopleAllowed, size, pets, balcony, desc, image } = this.state
        const {isTitleAvailable, createAdErrorMsg, isEdit} = this.props
        const numbers = [1, 2, 3, 4, 5, 6]
        let chooseFiles = this.ChooseFileRender()
        let imagesRender = image.map((image, index) => {
            return (
                <div key={index} >
                     {
                    image ?
                    <div className="form-image" >
                        <img 
                        src={`http://localhost:5000/static/${image}`} 
                        alt="" 
                        onClick={() => this.handleToggle(index)}
                    />
                       
                    </div> :
                    ""
                }
              
                </div>
               
               
            )
        })
        
        
           
        return (
            <div>
                <form className={this.props.classes.FormControl} onSubmit={isEdit ? this.onAdUpdate : this.onAdSend}>
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
                        {
                            isEdit ?
                            <div className="form-images">
                                {imagesRender}
                                
                               {chooseFiles}
                               
                                <Dialog open={this.state.isOpen} onClose={() => this.handleToggle(null)}>
                                    <DialogTitle id="dialogTitle"></DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="dialogTitle">
                                            
                                        </DialogContentText>
                                        <div className="modal-image">
                                            <img 
                                                src={`http://localhost:5000/static/${this.state.clickedImage}`} 
                                                alt="" 
                                                className="clicked-image"
                                                name="modal-image"
                                            
                                            
                                            />
                                            <div className="button-x" onClick={() => this.onDeleteImage(this.state.clickedImage)}><CgRemove /></div>
                                        </div>
                                        
                                    </DialogContent>
                                </Dialog>
                                
                            </div> :
                            null
                        }
                       { 
                        isEdit  ?
                        "" :
                        <input
                                type="file"
                                name="myImage"
                                //value={this.state.image}
                                onChange={this.handleImageChange}
                                multiple
                        />
                        }
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
      sortedAds: state.adv.sortedAds,
      uploadLoading: state.adv.uploadLoading

    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      createAd: (state, onCloseModal, getAds ) =>
        dispatch(createAd(state, onCloseModal, getAds)),
      loadModal: () => dispatch(loadModal()),
      getAllAds: () => dispatch(getAllAds()),
      updateAdv: (state, onCloseModal, adv_id) => dispatch(updateAdv(state, onCloseModal, adv_id)),
      getMyAd: () => dispatch(getMyAd()),
      deleteImage: (clickedImage,image,adv_id) => dispatch(deleteImage(clickedImage,image,adv_id)),
      uploadNewImage: (image, imageArr) => dispatch(uploadNewImage(image,imageArr))
    };
  };
  
  export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Form));