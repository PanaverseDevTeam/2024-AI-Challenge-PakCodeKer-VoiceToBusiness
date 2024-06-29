//assets
import Button from "@/components/assets/button";

//react
import { Dispatch, SetStateAction, useEffect } from "react";
import { currentUser } from "@/lib/currentUser";
import { useCurrentUser } from "@/lib/use-current-user";
import { useRouter } from "next/navigation";
import { formDataStage1 } from "../type";
import AudioHandling from "@/components/AudioHandling";

export default function Part1({
  stage,
  setStage,
  data,
}: {
  stage: number;
  setStage: Dispatch<SetStateAction<number>>;
  data: formDataStage1;
}) {
  const router = useRouter();
  const user = useCurrentUser();
  // setting stages for the page
  const onClick = () => {
    localStorage.setItem("businessDetails", JSON.stringify(data));
    console.log("Data saved:", data); // Ensuring data is as expected at time of save
    setStage((prevStage) => {
      console.log("Current stage:", prevStage); // Check current stage
      console.log("Next stage:", prevStage + 1); // Check next stage
      return prevStage + 1;
    });
  };

  // Inside your component
  useEffect(() => {
    console.log("Data on mount/update:", data);
  }, [data]); // De

  const handleSignIn = () => {
    router.push("login");
  };

  return (
    <div className="flex flex-col h-full items-center justify-center gap-[33px]">
      {/* Heading */}
      <div className="absolute top-4 sm:top-8 text-center">
        <div className="text-2xl md:text-4xl font-bold ">Brix-Pakverse</div>
        <div className="text-lg md:text-2xl  py-4">
          From daydream to success story with just one click
        </div>
      </div>
      {/* First button */}
      <div className="text-2xl">Lets start your business</div>
      {/* {user ? (
        <>
          <Button
            content="NEXT"
            onClick={onClick}
            type="button"
            className="text-white w-[90vw] max-w-[150px] h-[40px]  "
          />
        </>
      ) : (
        <>
          <Button
            content="Sign In"
            onClick={handleSignIn}
            type="button"
            className="text-white w-[90vw] max-w-[150px] h-[40px]  "
          />
        </>
      )} */}
      <Button
        content="NEXT"
        onClick={onClick}
        type="button"
        className="text-white w-[90vw] max-w-[150px] h-[40px]  "
      />
      <div className="flex fixed bottom-24 right-24">
        {/* <RecordButton /> */}
        <AudioHandling />
      </div>
    </div>
  );
}
