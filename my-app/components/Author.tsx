import Image from "next/image";
import { GreyPerson } from "./icon/Person";

export const Author = ({ author, width, height }) => {
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
