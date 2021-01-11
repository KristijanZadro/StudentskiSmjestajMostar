import React from 'react'
import Form from './Form'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import './CreateAds.css'



export default class Create extends React.Component{
    constructor(){
        super()
        this.state = {
            open: false,
        }
    }

    handleToggle = () => {
        const openCopy = !this.state.open
        this.setState({
            open: openCopy
        })
        
    }
    /*handleFormSubmit = exercise => {
        this.handleToggle()

        this.props.onCreate(exercise)
    }*/
    
    render(){
        return(
            <div className="create">
                <div className="createButton">
                    <Fab variant="round" size='small' onClick={this.handleToggle}>
                        <AddIcon />
                    </Fab>
                </div>
                <Dialog open={this.state.open} onClose={this.handleToggle}>
                    <DialogTitle id="dialogTitle">Create a new advertisement</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="dialogTitle">
                            Please Fill out the form below.
                        </DialogContentText>
                        <Form onClose={this.handleToggle} />
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

