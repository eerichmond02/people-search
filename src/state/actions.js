import {UPDATE_INPUT, DESELECT, DISPLAY_USER} from './types'

export const displayUser = (id) => ({type: DISPLAY_USER, payload: id});
export const deselect = () => ({type: DESELECT});
export const updateInput = (input) => ({type: UPDATE_INPUT, payload: input });

