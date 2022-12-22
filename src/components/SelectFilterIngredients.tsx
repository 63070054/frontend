import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

interface SelectFilterIngredientsProps {
    selectedIngredients: string[];
    handleSelectIngredientsChange: (a: any) => void;
    ingredients: string[];
}

export default function SelectFilterIngredients({ selectedIngredients, handleSelectIngredientsChange, ingredients }: SelectFilterIngredientsProps) {

    return (
        <FormControl sx={{ m: 1, width: 300 }} className="width-100 p-0 m-0">
            <Select
                displayEmpty
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={selectedIngredients}
                onChange={handleSelectIngredientsChange}
                input={<OutlinedInput />}
                renderValue={(selected) => {

                    if (selected.length === 0) {
                        return <em>ค้นหาจากวัตถุดิบ</em>;
                    }

                    return (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )
                }}
                MenuProps={MenuProps}
            >
                {ingredients.map((ingredient, index) => (
                    <MenuItem key={index} value={ingredient}>
                        <Checkbox checked={selectedIngredients.indexOf(ingredient) > -1} />
                        <ListItemText primary={ingredient} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}