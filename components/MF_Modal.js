import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    background: "#FFFFFF 0% 0% no-repeat padding-box;",
    borderRadius:"20px",
    boxShadow: "0px 7px 20px #00000029;",
    p: 5,
    justifyContent:"space-between",
};

export default function MF_Modal({toggle , show ,children}) {

    return (
            <Modal
                open={show}
                onClose={toggle}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                // BackdropComponent={null}
                BackdropProps={{invisible:true}}
            >
                <Box sx={style}>
                    {children}
                </Box>
            </Modal>
    );
}