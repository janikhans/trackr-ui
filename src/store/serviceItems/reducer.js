import * as types from './actionTypes';
import _ from 'lodash';

const initialState = {
  hasErrored: false,
  isLoading: false,
  hasLoaded: false,
  serviceItemsById: []
}

export default function reduce(state = initialState, action = {}) {
  var newServiceItemsById = state.serviceItemsById
  switch (action.type) {
    case types.SERVICE_ITEMS_FETCHED:
      return {
        ...state,
        serviceItemsById: action.serviceItemsById,
        hasLoaded: action.hasLoaded
      };
    case types.SERVICE_ITEMS_HAS_ERRORED:
      return {
        ...state,
        hasErrored: action.hasErrored
      };
    case types.SERVICE_ITEMS_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case types.SERVICE_ITEM_CREATED:
      return {
        ...state,
        serviceItemsById: Object.assign({}, state.serviceItemsById, action.serviceItemById)
      };
    case types.SERVICE_ITEM_UPDATED:
      newServiceItemsById[action.serviceItem.id] = action.serviceItem
      return {
        ...state,
        serviceItemsById: newServiceItemsById
      };
    case types.SERVICE_ITEM_DELETED:
      newServiceItemsById = _.omit(newServiceItemsById, action.serviceItemId)
      return {
        ...state,
        serviceItemsById: newServiceItemsById
      };
    case types.SERVICE_ITEM_INFO_FETCHED:
      newServiceItemsById[action.serviceItemId] = action.serviceItem
      return {
        ...state,
        serviceItemsById: newServiceItemsById
      };
    default:
      return state;
  }
}

// Selectors
export function getServiceItemsById(state) {
  return state.serviceItems.serviceItemsById;
}

export function getServiceItemsIdArray(state) {
  return _.keys(state.serviceItems.serviceItemsById);
}

export function getServiceItems(state) {
  return _.values(state.serviceItems.serviceItemsById);
}

export function isServiceItemsLoaded(state) {
  return state.serviceItems.hasLoaded
}

export function getServiceItemById(state, serviceItemId) {
  return state.serviceItems.serviceItemsById[serviceItemId];
}
