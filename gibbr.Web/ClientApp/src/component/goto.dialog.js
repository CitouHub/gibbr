import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { isEnter, isArrow, isNumber, isBackspace, isTab, isDash } from '../aid/keyboard.aid';
import { position } from '../data/board.data';

const GotoDialog = ({ open, goTo, close }) => {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    useEffect(() => {
        setX(position.x);
        setY(position.y);
    }, [open]);

    const validate = (e) => {
        if (isEnter(e)) {
            goTo(parseInt(x), parseInt(y));
        } else if (isTab(e) === false &&
            isNumber(e) === false &&
            isArrow(e) === false &&
            isDash(e) === false &&
            isBackspace(e) === false) {
            e.preventDefault();
        }
    }

    return (
        <div>
            <Dialog open={open} onClose={close}>
                <DialogTitle>Go to</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Where do you want to go?
                    </DialogContentText>
                    <Input
                        id="x"
                        autoFocus={true}
                        value={x}
                        inputProps={{ tabIndex: "1" }}
                        onKeyDown={validate}
                        onChange={e => setX(e.target.value)}
                        startAdornment={<InputAdornment position="start">X</InputAdornment>} />
                    <Input
                        id="y"
                        value={y}
                        inputProps={{ tabIndex: "2" }}
                        onKeyDown={validate}
                        onChange={e => setY(e.target.value)}
                        startAdornment={<InputAdornment position="start">Y</InputAdornment>} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={close}>Close</Button>
                    <Button onClick={() => goTo(parseInt(x), parseInt(y))}>Go</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default GotoDialog