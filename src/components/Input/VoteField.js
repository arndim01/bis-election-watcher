import { Box, IconButton, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from "react";

function VoteField({ value, object, handleUploadValue, disable }){
    const [vote, setVote] = useState(value);
    const [error, setError] = useState('');

    const handleOnChangeVote = (e) =>{
        setVote(e.target.value);
    };

    const updateVoteCount = () => {
        setError('');

        if( isNumber(vote) ){
            handleUploadValue(object, vote);
        }else{
            setError('Count must be a number');
        }
    };

    function isNumber(str) {

        if( str == '' ) return false;

        if (str.trim() === '') {
          return false;
        }
      
        return !isNaN(str);
    }

    return(
        <>
            <Box
                sx={{
                    display:'flex',
                    flexDirection: 'row',
                    '& .MuiTextField-root': { m: 1, width: '150px' }
                }}
            >
                <TextField
                    label="Count"
                    type="number"
                    value={vote}
                    onChange={(e)=> handleOnChangeVote(e)}
                    error={error != ''}
                    helperText={error}
                />
                <IconButton onClick={updateVoteCount} disabled={disable} >
                    <SendIcon color='primary' />
                </IconButton>
            </Box>
        </>
    )
}

export default VoteField;