import Image from "next/image";
import { UserType } from "../models/user";
import { GreyPerson } from "./icon/Person";

type Props = {
  author: Pick<UserType, "imageUrl">;
  width: number;
  height: number;
};

export const Author = ({ author, width, height }: Props) => {
  return author.imageUrl ? (
    <Image
      src={author.imageUrl}
      width={width}
      height={height}
      alt="profile photo"
    />
  ) : (
    <GreyPerson width={width} height={height} />
  );
};
