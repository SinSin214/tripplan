import { Box } from "@mui/material";


export function VerticalLine() {
    return (
        <Box style={{
            backgroundColor: 'gray',
            width: '1px',
            height: 'auto',
            display: 'flex',
            marginRight: '25px',
            marginLeft: '25px'
        }}>
        </Box>
    )
}