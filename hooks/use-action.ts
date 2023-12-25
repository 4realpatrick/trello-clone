import { useCallback, useState } from "react";

import { ActionState, FieldErrors } from "@/lib/create-safe-action";

type TAction<TInput, TOutput> = (
  data: TInput
) => Promise<ActionState<TInput, TOutput>>;

interface IUseActionOptions<TOutput> {
  onSuccess?: (data: TOutput) => void;
  onError?: (error: string) => void;
  onComplete?: () => void;
}

export const useAction = <TInput, TOutput>(
  action: TAction<TInput, TOutput>,
  options: IUseActionOptions<TOutput> = {}
) => {
  const [fieldErrors, setFieldErrors] =
    useState<FieldErrors<TInput | undefined>>(undefined);

  const [error, setError] = useState<string>();

  const [data, setData] = useState<TOutput>();

  const [isLoading, setIsLoading] = useState(false);

  const execute = useCallback(
    async (input: TInput) => {
      setIsLoading(true);
      try {
        const result = await action(input);
        if (!result) {
          return;
        }
        setFieldErrors(result.fieldErrors);
        if (result.error) {
          setError(result.error);
          options.onError?.(result.error);
        }
        if (result.data) {
          setData(result.data);
          options.onSuccess?.(result.data);
        }
      } finally {
        setIsLoading(false);
        options.onComplete?.();
      }
    },
    [action, options]
  );
  return {
    execute,
    isLoading,
    data,
    error,
    fieldErrors,
  };
};
