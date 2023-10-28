import {
    Grid,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
    Stack,
    TextField,
    Button,
    Paper,
    styled,
    MenuItem
  } from '@mui/material';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { CloudUploadTwoTone, DeleteForeverTwoTone } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { ApiCreateCandidate, ApiDeleteCandidate, ApiGetCandidate, ApiUpdateCandidate } from '@/helpers/hooks/candidate';
import { ApiDeletePrecinct, ApiUpdatePrecinct } from '@/helpers/hooks/precinct';
import CheckIcon from '@mui/icons-material/Check';

function DisableVotesDialog(props){
    const {onClose, open, selectedItem, mode} = props;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(false);
    }, [selectedItem])

    const onSubmit = async() => {
        setLoading(true);

        if( mode == "freeze"){

            let formData = new FormData();
            formData.append("disable_count", true);
            let formDataObjects = Object.fromEntries(formData.entries());
            const result = await ApiUpdatePrecinct({ token: "token", id: selectedItem, formData: formDataObjects })
            
        }else if( mode == "unfreeze"){
            let formData = new FormData();
            formData.append("disable_count", false);
            let formDataObjects = Object.fromEntries(formData.entries());
            const result = await ApiUpdatePrecinct({ token: "token", id: selectedItem, formData: formDataObjects })
        }
        onClose();
        setLoading(false);
    }

    const handleClose = () => {
        onClose();
    };


    return (
        <div>
            <Dialog 
            open={open}
            onKeyUp={(e) => {
              const ENTER = 13;
              if (e.key === 'Enter') {
                // props.onSubmit();
                // props.onClose();
              }
            }}
          >
            <DialogTitle>Delete confirmation</DialogTitle>
            <DialogContent>
                <DialogContentText>
                Are you sure you want to {mode} this precinct?
                </DialogContentText>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <LoadingButton
                  color="error"
                  loading={loading}
                  loadingPosition="start"
                  startIcon={<CheckIcon/>}
                  variant="contained"
                  type="submit"
                  onClick={() => onSubmit()}
                  >
                  <span>Yes</span>
                </LoadingButton>
            </DialogActions>
          </Dialog>
        </div>
    );
}

DisableVotesDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
};

export default DisableVotesDialog;