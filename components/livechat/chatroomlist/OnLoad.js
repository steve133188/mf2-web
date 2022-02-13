import Skeleton from "@mui/material/Skeleton";

export default function OnLoad(){

    return(
        <>
            <Skeleton
                sx={{ bgcolor: 'grey.900' }}
                variant="rectangular"
                width={"100%"}
                height={"80%"}
            />
        </>
    )
}
