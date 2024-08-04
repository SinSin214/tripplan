import { Chip, styled } from "@mui/material";
import { useTranslations } from "next-intl";

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));

export default function Tag(props: { tagDetail: any }) {
    const tagDetail = props.tagDetail;
    const t = useTranslations();
    
    const onClick = () => {
        alert('Navigate to Threads tag')
    }

    return(
        <ListItem key={tagDetail.tagId}>
            <Chip className="cursor-pointer" label={t(tagDetail.tagId)} onClick={onClick} />
        </ListItem>
    )
}