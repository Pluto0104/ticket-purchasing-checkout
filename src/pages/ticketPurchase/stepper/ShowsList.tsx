import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { ShowItemType } from "../../../app/types/showItem";
import { usePurchaseContext } from "../../../app/PurchaseProvider";

interface CustomListChildComponentProps extends ListChildComponentProps {
  selectedRow: number | null;
  quantity: number;
  onSelectedRow: (id: number) => void;
  onChangeQuantity: (id: number) => void;
}

const CustomListItem: React.FC<CustomListChildComponentProps> = ({
  index,
  style,
  data,
  selectedRow,
  onSelectedRow,
  quantity = 0,
  onChangeQuantity,
}) => {
  const { label, price, image, stock, id, description } = data[
    index
  ] as ShowItemType;

  const handleRowClick = () => {
    onSelectedRow(id);
  };

  const selected = selectedRow === id;

  return (
    <ListItem
      sx={style}
      key={`show-list-item-${id}`}
      component="div"
      disablePadding
      secondaryAction={
        selected ? (
          <ButtonGroup size="small" aria-label="small outlined button group">
            <Button
              variant="contained"
              disabled={quantity >= stock}
              onClick={() => {
                onChangeQuantity(quantity + 1);
              }}
            >
              +
            </Button>

            <Button
              sx={{ color: "black !important" }}
              variant="contained"
              disabled
            >
              {quantity}
            </Button>

            <Button
              variant="contained"
              disabled={quantity <= 0}
              onClick={() => {
                onChangeQuantity(quantity - 1);
              }}
            >
              -
            </Button>
          </ButtonGroup>
        ) : (
          <></>
        )
      }
    >
      <ListItemButton onClick={handleRowClick} selected={selected}>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={image} variant="square" />
        </ListItemAvatar>
        <Stack>
          <ListItemText primary={label} secondary={description} />
          <Stack direction="row" spacing={1}>
            <Chip
              label={`Price: $${price}`}
              color="primary"
              variant="outlined"
              size="small"
            />
            <Chip
              label={`Available: ${stock}`}
              color="success"
              variant="outlined"
              size="small"
            />
          </Stack>
        </Stack>
      </ListItemButton>
    </ListItem>
  );
};

const ShowsList: React.FC = () => {
  const { shows, showId, setShowId, quantity, setQuantity, setErrorMsg } =
    usePurchaseContext();

  React.useEffect(() => {
    if (!showId) setErrorMsg("Please select show.");
    else if (!quantity) setErrorMsg("Please select quantity.");
    else setErrorMsg(null);
  }, [showId, quantity]);

  const handleChangeShowId = (id: number) => {
    setShowId(id);
    setQuantity(null);
  };

  const handleChangeQuantity = (qty: number) => {
    setQuantity(qty > 0 ? qty : null);
  };

  return (
    <Box sx={{ margin: 2 }}>
      <FixedSizeList
        itemData={shows}
        height={400}
        width="100%"
        itemSize={96}
        itemCount={shows.length}
        overscanCount={5}
      >
        {(props) => (
          <CustomListItem
            {...{
              ...props,
              selectedRow: showId,
              quantity: quantity || 0,
              onSelectedRow: handleChangeShowId,
              onChangeQuantity: handleChangeQuantity,
            }}
          />
        )}
      </FixedSizeList>
    </Box>
  );
};

export default ShowsList;
