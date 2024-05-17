import { useContext } from "react";
import { CreateDeploymentContext } from "../../context/contexts";
import InfoCardWrapper from "@/app/components/input/CardWrapper";

const Replicas = () => {
  const {
    register,
    formState: { errors },
  } = useContext(CreateDeploymentContext);

  return (
    <InfoCardWrapper
      descriptionTextColor="text-gray-500"
      headingTextColor="text-black"
      heading="Replicas"
      description="It is used to guarantee the availability of a specified number of identical Pods."
    >
      <input
        className="bg-transparent mt-4 text-3xl w-full"
        placeholder="0"
        type="number"
        {...register("replicas", { valueAsNumber: true })}
      />
    </InfoCardWrapper>
  );
};

export default Replicas;
