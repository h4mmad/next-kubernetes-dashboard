export const dynamic = "force-dynamic";
import InfoBox from "@/app/components/page-layout/InfoBox";
import { PageHeading } from "@/app/components/page-layout/PageHeading";
import { Suspense } from "react";
import Pods from "./Pods";
import NamespaceTabs from "@/app/components/input/NamespaceTabs";

async function Page({ searchParams }: { searchParams: any }) {
  return (
    <div>
      <PageHeading text="Pods" />

      <InfoBox>
        <div className="text-gray-700">
          <p>
            A Pod is a group of one or more containers, with shared storage and
            network resources, and a specification for how to run the
            containers.
          </p>
          <span>
            Learn more about{" "}
            <a
              className="text-blue-500 inline "
              href={"https://kubernetes.io/docs/concepts/workloads/pods/"}
            >
              Pods.
            </a>
          </span>
        </div>
      </InfoBox>
      <div className="flex flex-col space-y-14 mt-8">
        <Suspense fallback={<div>Loading...</div>}>
          <NamespaceTabs baseURL="/dashboard/view-pods" />
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          <Pods namespace={searchParams.namespace} />
        </Suspense>
      </div>
    </div>
  );
}

export default Page;
