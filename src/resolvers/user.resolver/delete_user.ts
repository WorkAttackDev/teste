import { MyContext } from "../../context";
import User from "../../entities/User";
import { HasChangeResponse } from "./types";

const deleteUser = async (
  userId: number,
  ctx: MyContext
): Promise<HasChangeResponse> => {
  try {
    const result = await User.delete(userId);

    return { change: true };
  } catch (e) {
    console.log(e);
    return {
      errors: [
        { field: "user", message: "Ocorreu um erro ao apagar o usuário" },
      ],
    };
  }
};

export default deleteUser;
