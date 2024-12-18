import { Box, Dialog, DialogActions, DialogContent, Grid, styled } from "@mui/material";
import { CloseButton } from "../CloseButton";

const StyleDialog = styled(Dialog)(({ theme, width, minHeight }) => ({
    "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {},
    "& .css-hz1bth-MuiDialog-container": {
        transition: "transform 605ms cubic-bezier(0, 0, 0.2, 1) 0ms",
    },
    "& .MuiDialog-container": {
        "& .MuiPaper-root": {
            width: width ? width : "30rem",
            minHeight: minHeight ? minHeight : '22.875px',
            position: "relative",
            borderRadius: "1rem",
            [theme.breakpoints.down("md")]: {
                width: "100%",
                margin: "0 1rem",
                padding: "1rem",
                overflow: "hidden",
            },
        },
    },
}))


export const DialogModal = (props) => {
    const { setOpen, open, header, width, minHeight, children, handleClick, removeCloseButton, ...rest } = props;

    const handleClose = () => {
        if (!removeCloseButton) {
            setOpen(!open)
        }
    }

    return (
        <StyleDialog width={width} minHeight={minHeight} onClose={handleClose} open={open} onClick={handleClick}>
            <Box>
                <DialogActions>
                    <Grid container sx={{ justifyContent: !removeCloseButton ? "space-between" : "center", m: '0.9rem 1rem 0.5rem 0.8rem', textAlign: removeCloseButton ? 'center' : 'inherit' }} >
                        <Grid item xs={10}>
                            <Box>
                                {header}
                            </Box>
                        </Grid>
                        {!removeCloseButton && <Grid item xs={1}>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <CloseButton onClick={handleClose} />
                            </Box>
                        </Grid>}
                    </Grid>
                </DialogActions>
                <DialogContent
                    sx={{
                        py: 0
                    }}
                    {...rest}
                >
                    {children}
                </DialogContent>
            </Box>
        </StyleDialog >)
}