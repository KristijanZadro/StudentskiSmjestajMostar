import React, { Component } from 'react'
import './CreateAds.css'
import { connect } from "react-redux";
// material ui
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// redux actions
import {createAd,loadModal, getAllAds, updateAdv, getMyAd,deleteImage,uploadNewImage} from '../../../redux/actions/adv'
// react icons
import {CgRemove} from 'react-icons/cg'
import {AiOutlinePlus} from "react-icons/ai"

import loadingGif from '../../../images/gif/loading-arrow.gif'


const styles = theme => ({
   
    
    
    FormControl: {
        width: 500,
        display: "flex",
        flexWrap: "wrap",
        justifyContetn: "center",
        [theme.breakpoints.down('xs')]: {
            width: "98%",
            textAlign: "center",
            margin: "auto"
          },
        
        
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
        width: "42%",
        [theme.breakpoints.down('xs')]: {
            width: "100%",
          },
        
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
            chooseFiles: [],
             errorMsgTitle : '',
            errorMsgPrice : '',
            errorMsgSize : ''
          
           
       
            

        }
    }
    componentDidMount(){
        if(this.props.isEdit){
            //console.log("myad images",this.props.myAd.images)
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
        let time = new Date()
        
        let date = time.getTime().toString()
    
        //console.log(e.target.files[0])
        let chooseFilesCopy = [...chooseFiles, newImageCopy]
       
        this.setState({
            newImage: newImageCopy,
            //image: [...image, newImageCopy],
            chooseFiles: chooseFilesCopy,
            image: [...image, date + newImageCopy.name],
            isClicked: true,
            clickedImage: newImageCopy
           
        });
        
        this.props.uploadNewImage(newImageCopy,image,date)
        //console.log(e.target.files[0])
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

    
    formValidation = () => {
        const {title,price,size} = this.state
        let errorMsgTitle = ''
        let errorMsgPrice = ''
        let errorMsgSize = ''
        let isValid = false
        let check1 = false
        let check2 = false
        let check3 = false

        if(/^[a-zA-Z ]+$/.test(title)){
            errorMsgTitle = ""
            check1 = true
            
        }else{
            errorMsgTitle = "Title only contains letters. "
            errorMsgPrice = ""
            errorMsgSize = ""
            check1 = false
        }

        if(/^\d+$/.test(price)){
            if(price > 0 && price < 1000){
                errorMsgPrice = ""
                check2 = true
            }else{
                errorMsgPrice = "Price must be betweeen 0 and 1000. "
                check2 = false
            }
        }else{
            errorMsgPrice = "Price must be number. "
            check2 = false
        }

        if(/^\d+$/.test(size)){
            if(size > 0 && size < 400){
                errorMsgSize = ""
                check3 = true
            }else{
                errorMsgSize = "Size must be betweeen 0 and 400. "
                check3 = false
            }
        }else{
            errorMsgSize = "Size must be number. "
            check3 = false
        }
            
        if(check1 && check2 && check3){
            isValid = true
        }else{
            isValid = false
        }

        this.setState({
            errorMsgTitle,
            errorMsgPrice,
            errorMsgSize
        })
        return isValid
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
        const {admin, superadmin} = this.props
        if(this.formValidation()){
            this.props.createAd(this.state, this.onCloseModal, this.getAds, admin, superadmin);
        }
     
        
      };
      onAdUpdate = (e) => {
          e.preventDefault()
          if(this.formValidation()){
            this.props.updateAdv(this.state, this.onCloseModal, this.props.myAd.advertisement_id)
          }
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
        //console.log(image)
        let imageNumber = image.length;
       
        //console.log("length",image.length)
        let number = 5
        let arr = Array.from(Array(number-imageNumber).keys())
        
       //console.log("choosefile")

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
        
        //return chooseFiles
        
        
      }
      
   

    render() {
        const { title, price, address, peopleAllowed, size, pets, balcony, desc, image, } = this.state
        const {isTitleAvailable, createAdErrorMsg, isEdit} = this.props
        const numbers = [1, 2, 3, 4, 5, 6]
        //let choosefiles;
        //isEdit ? choosefiles = this.ChooseFileRender() : choosefiles = ""
        let chooseFiles;
        
            chooseFiles = this.ChooseFileRender()
       
        let imagesRender;
        if(isEdit ){
            //if(this.props.uploadLoading){
              //  <Loading />
            //}else{
                imagesRender = image.map((img, index) => {
                    //console.log("image render")
                    return (
                        <div key={index} >
                             {
                            img ?
                            <div className="form-image" >
                                <img 
                                src={this.props.uploadLoading ? loadingGif : `https://studenti.sum.ba/StudentskiSmjestajMostar/static/${img}`} 
                                alt="aa" 
                                onClick={() => this.handleToggle(index)}
                            />
                               
                            </div> :
                           ""
                        }
                      
                        </div>
                       
                       
                    )
                   
                })
            //}
        
        }
        
        
        
           
        return (
            <div className="dialog-form">
                <form className={this.props.classes.FormControl} onSubmit={isEdit ? this.onAdUpdate : this.onAdSend}>
                        <TextField
                            label="Title"
                            value={title}
                            name='title'
                            onChange={this.handleChange}
                            margin="normal"
                            className={this.props.classes.FormControlElement}
                            id="title"
                            required
                            
                        />
                        
                        <br/>
                        <TextField
                            label="Price"
                            value={price}
                            name='price'
                            onChange={this.handleChange}
                            margin="normal"
                            className={this.props.classes.FormControlElement}
                            required
                        />
                        <br/>
                        <TextField
                            label="Adress"
                            value={address}
                            name='address'
                            onChange={this.handleChange}
                            margin="normal"
                            className={this.props.classes.FormControlElement}
                            required
                           
                        />
                        <br/>
                        <div className={this.props.classes.FormControlElementPeopleAllowed}>
                            <InputLabel id="input">People Allowed</InputLabel>
                            <Select
                                value={peopleAllowed}
                                name='peopleAllowed'
                                onChange={this.handleChange}
                                required
                                
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
                            required
                            
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
                                required
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
                                                src={`https://studenti.sum.ba/StudentskiSmjestajMostar/static/${this.state.clickedImage}`} 
                                                alt="" 
                                                className="clicked-image"
                                                name="modal-image"
                                            
                                            
                                            />
                                            {
                                                image.length === 1 ?
                                                "" :
                                                <div className="button-x" onClick={() => this.onDeleteImage(this.state.clickedImage)}><CgRemove /></div>
                                            }
                                        </div>
                                        
                                    </DialogContent>
                                </Dialog>
                                
                            </div> :
                            null
                        }
                       { 
                        isEdit  ?
                        null :
                        <input
                                type="file"
                                name="myImage"
                                //value={this.state.image}
                                onChange={this.handleImageChange}
                                multiple
                                required
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
                        <span style={{"color":"red", "fontWeight":"bold", "marginLeft":"5px"}}>{this.state.errorMsgTitle}</span>

                        <span style={{"color":"red", "fontWeight":"bold", "marginLeft":"5px"}}>{this.state.errorMsgPrice}</span>
                        
                        <span style={{"color":"red", "fontWeight":"bold", "marginLeft":"5px"}}>{this.state.errorMsgSize}</span>
                      
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
      uploadLoading: state.adv.uploadLoading,
      admin: state.auth.admin,
      superadmin: state.auth.superadmin

    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      createAd: (state, onCloseModal, getAds,admin, superadmin ) =>
        dispatch(createAd(state, onCloseModal, getAds, admin, superadmin)),
      loadModal: () => dispatch(loadModal()),
      getAllAds: () => dispatch(getAllAds()),
      updateAdv: (state, onCloseModal, adv_id) => dispatch(updateAdv(state, onCloseModal, adv_id)),
      getMyAd: () => dispatch(getMyAd()),
      deleteImage: (clickedImage,image,adv_id) => dispatch(deleteImage(clickedImage,image,adv_id)),
      uploadNewImage: (image, imageArr,date) => dispatch(uploadNewImage(image,imageArr,date))
    };
  };
  
  export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Form));