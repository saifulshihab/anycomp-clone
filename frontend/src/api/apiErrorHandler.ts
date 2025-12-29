import { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";

export type TCommonApiErrorAttr = {
  err?: string;
  msg?: string;
  error?: string;
  message?: string;
};

export enum HTTPResponseStatusCode {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  UnprocessableContent = 422,
  InternalServerError = 500
}

const defaultApiErrorMessage = "Something going wrong!";

export function apiErrorHandler(
  error: AxiosError,
  logout?: () => void,
  errorAttribute?: string,
  showToastMessage?: boolean
) {
  let shouldShowToast = true;
  if (showToastMessage !== undefined) {
    shouldShowToast = showToastMessage;
  }
  if (error?.response) {
    /**
     * the request was made and the server responded with a status code
     * that falls out of the range of 2xx
     */
    const responseData = error.response.data as TCommonApiErrorAttr | undefined;

    // error message from common attributes
    let errorMessage =
      responseData?.message || responseData?.err || responseData?.msg;
    /**
     * common attr message not found
     * get error message from custom attribute if provided
     */
    if (!errorMessage && errorAttribute !== undefined) {
      let err = (responseData as any)?.[errorAttribute];
      /**
       * custom error attr is array type
       * show the errors as new line separated text
       */
      if (Array.isArray(err)) {
        const errorArr = err
          .map((data) =>
            typeof data !== "string" ? JSON.stringify(data) : data
          )
          .join("\n");
        err = errorArr;
      } else if (typeof err === "object") {
        /**
         * custom error attr is object type
         * show the error as JSON string
         */
        err = JSON.stringify(err);
      }
      errorMessage = err;
    }

    // no error message found from common/custom attributes, make a default one
    const defaultErrorMessage =
      error.response.status === HTTPResponseStatusCode.Unauthorized
        ? "Your session has expired. Please log in again to continue."
        : error.response.status === HTTPResponseStatusCode.Forbidden
          ? "You don't have access rights to the content."
          : defaultApiErrorMessage;

    // show the error message
    if (shouldShowToast) {
      toast.error(errorMessage || defaultErrorMessage, {
        duration:
          error.response.status >= HTTPResponseStatusCode.BadRequest
            ? 5000
            : undefined
      });
    }
    // console.error(`${error.response.status} ${error.response.statusText}`);

    /**
     * logout the user
     * user should be logged out if any API returns 401
     */
    if (error.response.status === HTTPResponseStatusCode.Unauthorized)
      if (logout) logout();

    return { status: error.response.status, data: responseData };
  } else if (error?.request) {
    // the request was made but no response was received, set a default status for client side
    if (shouldShowToast) toast.error(defaultApiErrorMessage);
    return {
      status: HTTPResponseStatusCode.InternalServerError,
      data: undefined
    };
  } else {
    // something happened in setting up the request that triggered an Error
    if (shouldShowToast) toast.error(defaultApiErrorMessage);
    return {
      status: HTTPResponseStatusCode.InternalServerError,
      data: undefined
    };
  }
}

// find rejected promise from Promise.allSettled() responses and show an error message
export const rejectedPromiseHandler = (
  promiseResponses: PromiseSettledResult<AxiosResponse<any, any>>[],
  logout?: () => void
) => {
  const rejectedPromise = promiseResponses.find(
    (response): response is PromiseRejectedResult =>
      response.status === "rejected"
  );
  if (rejectedPromise) {
    apiErrorHandler(rejectedPromise.reason, logout);
  }
};
