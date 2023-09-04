import { ChangeEvent, useReducer } from "react"
import { FiltersAction, FiltersState } from "../types"

const filtersState: FiltersState = {
    selectedCategory: null,
    searchText: null,
    sortOption: null,
}

const filtersReducer = (state: FiltersState, action: FiltersAction) => {
    switch (action.type) {
        case 'SET_CATEGORY':
            return {
                ...state,
                selectedCategory: action.payload.selectedCategory,
            }
        case 'SET_SEARCH_TEXT':
            return {
                ...state,
                searchText: action.payload.searchText,
            }
        case 'SET_SORT_OPTION':
            return {
                ...state,
                sortOption: action.payload.sortOption,
            }

        default:
            return state
    }
}

const sortOptions = [
    {
        text: 'Alphabetical (A - Z)',
        value: 'asc'
    },
    {
        text: 'Alphabetical (Z - A)',
        value: 'desc'
    },
    {
        text: 'Price (High to Low)',
        value: 'price'
    },
    {
        text: 'Price (Low to High)',
        value: '-price'
    },
]

const useProductFilters = () => {
    const [filters, dispatchFilters] = useReducer(filtersReducer, filtersState)

    const selectCategoryHandler = (category: string) => {
        dispatchFilters({
            type: 'SET_CATEGORY',
            payload: {
                ...filters,
                selectedCategory: category
            }
        })
    }

    const searchTextOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatchFilters({
            type: 'SET_SEARCH_TEXT',
            payload: {
                ...filters,
                searchText: e.target.value
            }
        })
    }

    const sortOptionOnChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatchFilters({
            type: 'SET_SORT_OPTION',
            payload: {
                ...filters,
                sortOption: e.target.value
            }
        })
    }

    return {
        filters,
        sortOptions,
        selectCategoryHandler,
        searchTextOnChangeHandler,
        sortOptionOnChangeHandler
    }
}

export default useProductFilters