import { Modal, Box, Typography } from "@mui/material";
import { useContext } from "react";
import { ErrorContext } from "../context";

export default function ErrorDlg() {
    const { errorDlg, setErrorDlg }  = useContext(ErrorContext);

    function closeDialog() {
        setErrorDlg({
            show: false,
            error: ''
        })
    }
    return (
        <Modal
            open={errorDlg.show}
            onClose={() => closeDialog()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {errorDlg.error}
                </Typography>
            </Box>
        </Modal>
    )
}