import { Box } from "@mui/material";
import { VerticalLine } from "./SmallThings";

export default function Footer() {
    return (
        <Box className="bg-stone-800 text-white py-8">
            <Box className="flex limited-width-layout__content justify-between">
                <Box className="flex flex-col w-full" >
                    <h3>Contact</h3>
                    <text>Email: tranhuynhkha21496@gmail.com</text>
                    <text>Skype: live:tranhuynhkha21496</text>
                    <text>Github: github.com/SinSin214</text>
                </Box>
                <VerticalLine />
                <Box className="flex flex-col w-full" >
                    <h3>Contact</h3>
                    <text>Email: tranhuynhkha21496@gmail.com</text>
                    <text>Skype: live:tranhuynhkha21496</text>
                    <text>Github: github.com/SinSin214</text>
                </Box>
                <VerticalLine />
                <Box className="flex flex-col w-full" >
                    <h3>Contact</h3>
                    <text>Email: tranhuynhkha21496@gmail.com</text>
                    <text>Skype: live:tranhuynhkha21496</text>
                    <text>Github: github.com/SinSin214</text>
                </Box>
            </Box>
        </Box>
    )
}