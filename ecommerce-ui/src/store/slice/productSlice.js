import {createSlice} from "@reduxjs/toolkit";

export const productSlice= createSlice({
    name:"product",
    initialState:{
        searchText:"",
        productFilterOpen:false,
        minPrice:0,
        maxPrice:0,
        category:[],
    },
    reducers:{
        setSearchText:(state,action)=>{
            state.searchText= action.payload;
        },
        // setProductFilterOpen:(state,action)=>{
        //     state.productFilterOpen=action.payload;
        // }
        openProductFilter:(state,action)=>{
            state.productFilterOpen=true;
        },
        closeProductFilter:(state,action)=>{
            state.productFilterOpen=false;
        },
        setMinPrice: (state, action) => {
            state.minPrice = action.payload;
          },
      
          setMaxPrice: (state, action) => {
            state.maxPrice = action.payload;
          },
          setCategory: (state, action) => {
            state.category = action.payload;
          },
      
          clearProductFilter: (state, action) => {
            state.minPrice = 0;
            state.maxPrice = 0;
            state.category = [];
          },

    },
});

//action created are generated from each case reducer function
export const {
    setSearchText,
    openProductFilter,
    closeProductFilter,
    setMinPrice,
    setMaxPrice,
    clearProductFilter,
    setCategory
}= productSlice.actions;

export default productSlice.reducer;
