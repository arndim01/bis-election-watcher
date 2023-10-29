import { Box, IconButton, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from "react";

function VoteField({ value, object, handleUploadValue, disable }){
    const [vote, setVote] = useState(value);

    const handleOnChangeVote = (e) =>{
        setVote(e.target.value);
    };

    const updateVoteCount = () => {
        handleUploadValue(object, vote);
    };

    return(
        <>
            <Box
                sx={{
                    display:'flex',
                    flexDirection: 'row',
                    '& .MuiTextField-root': { m: 1, width: '80px' }
                }}
            >
                <TextField
                    label="Count"
                    type="text"
                    value={vote}
                    onChange={(e)=> handleOnChangeVote(e)}
                />
                <IconButton onClick={updateVoteCount} disabled={disable} >
                    <SendIcon color='primary' />
                </IconButton>
            </Box>
        </>
    )
}

export default VoteField;