import { MutationOptions, useMutation } from "@tanstack/react-query";
import { axiosAuthenticatedClient } from "@/lib/axios";

interface IParams {
  resource: string;
  id: string | number;
  successMessage: string;
  errorMessage: string;
  onSuccess?: () => void | Promise<void>;
  onError?: () => void | Promise<void>;
  mutationOptions?: Omit<
    MutationOptions,
    "mutationFn" | "onSuccess" | "onError"
  >;
}

export function useDelete(params: IParams) {
  return useMutation({
    async mutationFn() {
      const response = await axiosAuthenticatedClient(
        `${params.resource}/${params.id}`,
        {
          method: "DELETE",
        },
      );
      return response.data;
    },
    // show toast later
    async onSuccess() {
      console.log("success", params.successMessage);
      if (params.onSuccess) await params.onSuccess();
    },
    async onError() {
      console.log("error", params.errorMessage);
      if (params.onError) await params.onError();
    },
    ...(params.mutationOptions ?? {}),
  });
}
