// assets
import Button from "@/components/assets/button";

// libraries
import { getCountriesData } from "@/components/assets/getCountries";

// react
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { signOut } from "next-auth/react";

// types
import { country, formDataStage1 } from "../type";
import { useRouter } from "next/navigation";

export default function Part2({
  stage,
  setStage,
  onChange,
  data,
}: {
  stage: number;
  setStage: Dispatch<SetStateAction<number>>;
  onChange: (e: ChangeEvent<any>) => void;
  data: formDataStage1;
}) {
  const router = useRouter();
  // handling stage changes
  const onClick = () => {
    localStorage.setItem("businessDetails", JSON.stringify(data));
    setStage((stage) => stage + 1);
    console.log(stage);
  };

  const handleLogout = () => {
    signOut().then(() => {
      router.push("/");
    });
  };

  // handling list of countries. This data is fetched from a public API.
  const [countries, setCountries] = useState<country[]>([]);
  const fetchCountries = async () => {
    const data = await getCountriesData();
    setCountries(data);
  };
  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div className="flex flex-col relative h-full w-full items-center ">
      <div className="flex flex-col items-center justify-center gap-[33px] pt-[5%] pb-[87px]">
        {/* Starting our form from here */}
        <div className="text-xl text-center sm:text-[40px] font-semibold">
          Lets get started
        </div>
      </div>
      {/* Business location selection */}
      <div className="w-auto flex flex-col mb-[10px]">
        <label htmlFor="businessLocation" className="text-lg">
          Business Location
        </label>
        <select
          id="businessLocation"
          name="businessLocation"
          value={data.businessLocation}
          className="w-[90vw] max-w-[493px] text-gray-800 bg-gray-200 rounded-[10px] p-2 border-2 hover:border-gray-800 transition-all duration-700"
          onChange={onChange}
        >
          {countries?.map((country, index) => (
            <option key={index} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      {/* Business Budget */}
      <div className="w-auto flex flex-col mb-[10px]">
        <label htmlFor="businessBudget" className="text-lg">
          Business Budget
        </label>
        <input
          id="businessBudget"
          name="businessBudget"
          type="text"
          value={data.businessBudget}
          className="w-[90vw] max-w-[493px] text-gray-800 bg-gray-200 rounded-[10px] p-2 border-2 hover:border-gray-800 transition-all duration-700"
          onChange={onChange}
          placeholder="Enter your business Budget with currency code"
        ></input>
      </div>

      {/* Business Idea */}
      <div className="w-auto flex flex-col mb-[85px]">
        <label htmlFor="businessIdea" className="text-lg">
          Business Idea (500 words max)
        </label>
        <textarea
          id="businessIdea"
          name="businessIdea"
          rows={5}
          value={data.businessIdea}
          className="w-[90vw] max-w-[493px] text-gray-800 bg-gray-200 rounded-[10px] p-2 border-2 hover:border-gray-800 transition-all duration-700"
          onChange={onChange}
          maxLength={500}
          placeholder="Enter your business Idea"
        ></textarea>
      </div>

      {/* Button to move to next page */}
      <Button
        content="NEXT"
        className="absolute bottom-[5%] right-[5%] w-[90vw] max-w-[150px] h-[40px]  text-white"
        onClick={onClick}
        type="submit"
      />
      <Button
        content="Logout"
        className="absolute bottom-[5%] left-[5%] w-[90vw] max-w-[150px] h-[40px]  text-gray-600 hover:bg-red-600 hover:text-white bg-red-600/10"
        onClick={handleLogout}
      />
    </div>
  );
}
