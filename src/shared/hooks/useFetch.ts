import request from 'axios';
import { useEffect, useReducer } from 'react';
import { ActionType, ApiActionKind, StateType } from '../../api/statusCodes';

function fetchReducer<T extends Record<string, unknown>>(
  state: StateType<T>,
  action: ActionType<T>
) {
  const { type, payload } = action;
  switch (type) {
    case ApiActionKind.REQUEST:
      return { ...state, isLoading: payload.isLoading };

    case ApiActionKind.SUCCESS:
    case ApiActionKind.ERROR:
      return {
        ...state,
        code: payload.code,
        data: payload.data,
        isLoading: payload.isLoading,
        message: payload.message,
      };

    default:
      return state;
  }
}

export const useFetch = async (api: any) => {
  const [state, dispatch] = useReducer(fetchReducer, {
    data: [],
    isLoading: false,
    message: '',
  });

  useEffect(() => {
    (async () => {
      dispatch({
        type: ApiActionKind.REQUEST,
        payload: { data: [], isLoading: true, message: 'request' },
      });
      try {
        const response = await api;
        dispatch({
          type: ApiActionKind.SUCCESS,
          payload: {
            code: response.code,
            data: response.data as any,
            isLoading: false,
            message: response.message,
          },
        });
      } catch (error) {
        if (request.isAxiosError(error) && error.response) {
          const { data } = error.response;
          dispatch({
            type: ApiActionKind.ERROR,
            payload: {
              code: data.code,
              data: data.data,
              isLoading: false,
              message: data.message,
            },
          });
        }
      }
    })();
  }, []);

  return { ...state };
};
