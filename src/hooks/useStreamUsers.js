import useStreamCollection from "./useStreamCollection";

const useStreamUsers = () => {
    return useStreamCollection("users");
};

export default useStreamUsers;
