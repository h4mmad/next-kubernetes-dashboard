"use client";
import CardWrapper from "@/app/components/input/CardWrapper";
import InputBox from "@/app/components/input/InputBox";
import { CreateServiceContext } from "@/app/context/contexts";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useState } from "react";
import KeyValueInput from "../../deployment/create-deployment/KeyValueInput";
import { SubmitHandler, useFieldArray } from "react-hook-form";
import { createServiceSchema } from "@/app/utils/schema";
import { z } from "zod";
import Image from "next/image";
import ClusterIP from "@/public/ClusterIP.drawio.svg";
import NodePort from "@/public/NodePort.drawio.svg";
import NamespaceSelector from "../../deployment/create-deployment/NamespaceSelector";
import { createServiceFormAction } from "@/app/utils/actions";
import { Helper } from "@/app/utils/lib";
import { toast } from "react-toastify";
import InputErrorMessage from "@/app/components/input/InputErrorMessage";
import { MdDelete } from "react-icons/md";

const submitHandler: SubmitHandler<
  z.infer<typeof createServiceSchema>
> = async (data: z.infer<typeof createServiceSchema>) => {
  console.log(data);
  const helper = new Helper();

  const { statusCode, bodyMessage, message, statusMessage } =
    await createServiceFormAction(data);

  console.log(statusCode, message, bodyMessage, statusMessage);

  if (statusCode >= 200 && statusCode <= 300) {
    toast(`${message}: ${statusCode}`);
  } else {
    toast(`${statusMessage} ${statusCode}: ${bodyMessage}`);
  }
};

const CreateServiceForm = () => {
  const options = [
    {
      label: "Cluster IP",
      value: "ClusterIP",
      src: ClusterIP,
      info: "Exposes the Service on a cluster-internal IP. Choosing this value makes the Service only reachable from within the cluster. This is the default that is used if you don't explicitly specify a type for a Service.",
    },
    {
      label: "Node Port",
      value: "NodePort",
      info: "NodePort service allows external traffic to access your Kubernetes service by opening a specific port on all the nodes in your cluster. You can reach the service using any node's IP address and the assigned port number.",
      src: NodePort,
    },
  ];
  const [index, setIndex] = useState(0);

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useContext(CreateServiceContext);

  const { append, fields, remove } = useFieldArray({ name: "ports", control });

  return (
    <div className="flex flex-col space-y-14 mt-7">
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="space-y-9 mt-9">
          <div className="flex flex-row justify-between space-x-12">
            <CardWrapper
              heading="Service name"
              description="Should be unique within a namespace"
            >
              <InputBox
                errorMessage={errors.serviceName?.message}
                register={register("serviceName")}
                placeholder="eg. nginx-service"
                type="text"
              />
            </CardWrapper>
            <NamespaceSelector
              errorMessage={errors.namespace?.message}
              register={register("namespace")}
            />
          </div>

          <KeyValueInput
            Context={CreateServiceContext}
            fieldArrayName="selector"
            heading="Selector"
            description="A selector in a service is used to define which pods the service should route traffic to. For example, if a service has a selector 'app: frontend', it will match all pods that have the label 'app' set to 'frontend'."
          />
          <CardWrapper
            heading="Service type"
            description={
              <>
                <p>
                  NodePort service allows external traffic to access your
                  Kubernetes service by opening a specific port on all the nodes
                  in your cluster. You can reach the service using any node's IP
                  address and the assigned port number.
                </p>
              </>
            }
          >
            <select
              {...register("type")}
              className="p-2 w-fit rounded-lg hover:bg-[#413839] bg-black text-sm text-white border mt-2 font-medium"
              defaultValue={options[0].value}
              onChange={(e: any) => setIndex(e.target.selectedIndex)}
            >
              <option value={options[0].value}>{options[0].label}</option>
              <option value={options[1].value}>{options[1].label}</option>
            </select>

            <div className="flex space-x-7 flex-row border rounded-xl p-6 mt-6 bg-slate-50">
              <Image
                alt="logo"
                src={options[index].src}
                width={400}
                height={400}
              />

              <div>
                <p className="text-lg font-semibold">{options[index].label}</p>
                <p className="mt-2 text-gray-600 text-sm">
                  {options[index].info}
                </p>
              </div>
            </div>
            <InputErrorMessage message={errors.type?.message} />
          </CardWrapper>

          <CardWrapper
            heading="Ports"
            description={
              <div className="space-y-2">
                <p>
                  Target port is used to target the port exposed by the pod.
                  Protocol can either be TCP or UDP.
                </p>
                <p>
                  When using NodePort type, the cluster will automatically
                  assign an available port.
                </p>
                <p>View services to see which port has been assigned.</p>
              </div>
            }
            actionButton={
              <button
                type="button"
                className="rounded-lg px-4 text-sm py-1 border bg-black text-white hover:bg-[#413839]"
                onClick={() =>
                  append({ port: 80, protocol: "TCP", targetPort: 80 })
                }
              >
                Add +
              </button>
            }
          >
            {fields.map((port, index) => {
              return (
                <div
                  key={port.id}
                  className="flex flex-row justify-between items-center mt-8"
                >
                  <div className="flex flex-row space-x-6">
                    <InputBox
                      errorMessage=""
                      type="number"
                      label="Port"
                      register={register(`ports.${index}.port` as const, {
                        valueAsNumber: true,
                      })}
                    />
                    <InputBox
                      errorMessage=""
                      type="number"
                      label="Target port"
                      register={register(`ports.${index}.targetPort` as const, {
                        valueAsNumber: true,
                      })}
                    />
                    <InputBox
                      errorMessage=""
                      placeholder="protocol"
                      type="text"
                      label="Protocol"
                      register={register(`ports.${index}.protocol` as const)}
                    />
                  </div>

                  <button
                    onClick={() => remove(index)}
                    type="button"
                    className=" text-red-500 "
                  >
                    <MdDelete size={28} />
                  </button>
                </div>
              );
            })}
            <InputErrorMessage message={errors.ports?.message} />
          </CardWrapper>
        </div>

        <div className="w-full flex flex-row justify-end mt-24">
          <button
            type="submit"
            className="px-4 py-2  rounded-full hover:bg-[#413839] bg-black border border-black text-white font-semibold w-fit"
          >
            Create service
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateServiceForm;
