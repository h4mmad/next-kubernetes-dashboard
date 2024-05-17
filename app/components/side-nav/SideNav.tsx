import Image from "next/image";
import Logo from "@/public/logo.svg";
import { LuContainer } from "react-icons/lu";
import { FaNetworkWired } from "react-icons/fa";
import { IoCodeWorking } from "react-icons/io5";
import { LuServer } from "react-icons/lu";
import ClusterCard from "./ClusterCard";
import NavButton from "./NavButton";

export function SideNav() {
  return (
    <nav className="flex flex-col p-4 border-r w-fit h-screen ">
      <Image alt="logo" src={Logo} width={150} height={100} />
      <ClusterCard />
      <ul className="space-y-16 mt-20">
        <li>
          <NavButton
            href="/dashboard/view-nodes"
            icon={<LuServer size={22} />}
            text="Cluster"
          />
        </li>
        <li>
          <NavButton
            href="/dashboard/view-pods"
            icon={<LuContainer size={22} />}
            text="Pods"
          />
        </li>
        <li>
          <NavButton
            href="/dashboard/create-deployment"
            icon={<IoCodeWorking size={22} />}
            text="Workloads"
          />
        </li>
        <li>
          <NavButton
            href="/dashboard/create-service"
            icon={<FaNetworkWired size={22} />}
            text="Networking"
          />
        </li>
      </ul>
    </nav>
  );
}