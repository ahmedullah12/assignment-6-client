import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteUser,
  followUser,
  getAllUsers,
  getUserData,
  makeAdmin,
  unfollowUser,
  updateUser,
} from "../services/User";
import toast from "react-hot-toast";

export const useGetUserData = (userId: string) => {
  return useQuery({
    queryKey: ["GET_USER_DATA", userId],
    queryFn: async () => await getUserData(userId),
    enabled: !!userId,
  });
};

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["GET_ALL_USER"],
    queryFn: async () => await getAllUsers(),
  });
};

export const useUpdateUser = () => {
  return useMutation<any, Error, { userData: FormData; userId: string }>({
    mutationKey: ["UPDATE_USER"],
    mutationFn: async ({ userData, userId }) =>
      await updateUser(userData, userId),
    onSuccess: () => {
      toast.success("Profile Updated Successfully!!!");
      window.location.reload();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteUser = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_USER"],
    mutationFn: async (userId) => await deleteUser(userId),
  });
};

export const useFollowUser = () => {
  return useMutation<any, Error, { userId: string; followedUserId: string }>({
    mutationKey: ["UPDATE_USER"],
    mutationFn: async (payload) => await followUser(payload),
  });
};

export const useUnfollowUser = () => {
  return useMutation<any, Error, { userId: string; followedUserId: string }>({
    mutationKey: ["UPDATE_USER"],
    mutationFn: async (payload) => await unfollowUser(payload),
  });
};

export const useMakeAdmin = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["MAKE_ADMIN"],
    mutationFn: async (userId) => await makeAdmin(userId),
  });
};
