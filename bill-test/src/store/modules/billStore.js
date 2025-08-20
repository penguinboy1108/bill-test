//billList 
import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
const billStore = createSlice({
  name: 'bill',
  // Initial state
  initialState: {
    billList: [],
  },
  reducers: {
    // Set the list of bills
    setBillList: (state, action) => {
      state.billList = action.payload;
    },
  },
});


export const { setBillList } = billStore.actions;

//async thunk
const getBillList =() =>{
    return async (dispatch) => {
        // console.log('Fetching bill list...');
        try {
            const response = await axios.get('http://localhost:8888/ka');
            dispatch(setBillList(response.data));
            // console.log(
            //     'Fetched bill list:',
            //     response.data
            // );
            
        } catch (error) {
            console.error('Error fetching bill list:', error);
        }
    }
}

export { getBillList };

const reducer = billStore.reducer;
export default reducer;