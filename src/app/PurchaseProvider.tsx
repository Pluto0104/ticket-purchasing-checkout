import * as React from "react";
import { ShowItemType } from "./types/showItem";
import { SHOWS_DATA } from "./data";

export interface PurchaseContextDataType {
  shows: ShowItemType[];
  showId: number | null;
  quantity: number | null;
  deliveryType: number | null;
  location: number | null;
  paymentType: number | null;
  securityCode: string | null;
  errorMsg: string | null;
  setShows: (shows: ShowItemType[]) => void;
  setShowId: (showId: number | null) => void;
  setQuantity: (quantity: number | null) => void;
  setDeliveryType: (deliveryType: number | null) => void;
  setLocation: (location: number | null) => void;
  setPaymentType: (paymentType: number | null) => void;
  setSecurityCode: (securityCode: string | null) => void;
  setErrorMsg: (errorMsg: string | null) => void;
}

type PurchaseAction =
  | { type: "SET_SHOWS"; payload: ShowItemType[] }
  | { type: "SET_SHOW_ID"; payload: number | null }
  | { type: "SET_QUANTITY"; payload: number | null }
  | { type: "SET_DELIVERY_TYPE"; payload: number | null }
  | { type: "SET_LOCATION"; payload: number | null }
  | { type: "SET_PAYMENT_TYPE"; payload: number | null }
  | { type: "SET_SECURITY_CODE"; payload: string | null }
  | { type: "SET_ERROR_MSG"; payload: string | null };

const initialState: PurchaseContextDataType = {
  shows: [],
  showId: null,
  quantity: null,
  deliveryType: null,
  location: null,
  paymentType: null,
  securityCode: null,
  errorMsg: "",
  setShows: () => {},
  setShowId: () => {},
  setQuantity: () => {},
  setDeliveryType: () => {},
  setLocation: () => {},
  setPaymentType: () => {},
  setSecurityCode: () => {},
  setErrorMsg: () => {},
};

const purchaseReducer = (
  state: PurchaseContextDataType,
  action: PurchaseAction
): PurchaseContextDataType => {
  switch (action.type) {
    case "SET_SHOWS":
      return { ...state, shows: action.payload };
    case "SET_SHOW_ID":
      return { ...state, showId: action.payload };
    case "SET_QUANTITY":
      return { ...state, quantity: action.payload };
    case "SET_DELIVERY_TYPE":
      return { ...state, deliveryType: action.payload };
    case "SET_LOCATION":
      return { ...state, location: action.payload };
    case "SET_PAYMENT_TYPE":
      return { ...state, paymentType: action.payload };
    case "SET_SECURITY_CODE":
      return { ...state, securityCode: action.payload };
    case "SET_ERROR_MSG":
      return { ...state, errorMsg: action.payload };
    default:
      return state;
  }
};

const PurchaseContext =
  React.createContext<PurchaseContextDataType>(initialState);

const PurchaseProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = React.useReducer(purchaseReducer, initialState);

  const value = React.useMemo(() => state, [state]);

  const setShows = React.useCallback(
    (shows: ShowItemType[]) => dispatch({ type: "SET_SHOWS", payload: shows }),
    []
  );
  const setShowId = React.useCallback(
    (showId: number | null) =>
      dispatch({ type: "SET_SHOW_ID", payload: showId }),
    []
  );
  const setQuantity = React.useCallback(
    (quantity: number | null) =>
      dispatch({ type: "SET_QUANTITY", payload: quantity }),
    []
  );
  const setDeliveryType = React.useCallback(
    (deliveryType: number | null) =>
      dispatch({ type: "SET_DELIVERY_TYPE", payload: deliveryType }),
    []
  );
  const setLocation = React.useCallback(
    (location: number | null) =>
      dispatch({ type: "SET_LOCATION", payload: location }),
    []
  );
  const setPaymentType = React.useCallback(
    (paymentType: number | null) =>
      dispatch({ type: "SET_PAYMENT_TYPE", payload: paymentType }),
    []
  );
  const setSecurityCode = React.useCallback(
    (securityCode: string | null) =>
      dispatch({ type: "SET_SECURITY_CODE", payload: securityCode }),
    []
  );
  const setErrorMsg = React.useCallback(
    (errorMsg: string | null) =>
      dispatch({ type: "SET_ERROR_MSG", payload: errorMsg }),
    []
  );

  const fetchShows = async () => {
    try {
      // const response = await fetch("https://example.com/api/shows");
      // const data = await response.json();
      const data = SHOWS_DATA;
      setShows(data);
    } catch (error) {
      if (error instanceof Error) setErrorMsg(error.message);
    }
  };

  React.useEffect(() => {
    fetchShows();
  }, []);

  return (
    <PurchaseContext.Provider
      value={{
        ...value,
        setShows,
        setShowId,
        setQuantity,
        setDeliveryType,
        setLocation,
        setPaymentType,
        setSecurityCode,
        setErrorMsg,
      }}
    >
      {children}
    </PurchaseContext.Provider>
  );
};

export { PurchaseProvider as default, PurchaseContext };
