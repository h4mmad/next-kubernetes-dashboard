const k8s = require("@kubernetes/client-node");

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

import { AppsV1Api, CoreV1Api, KubeConfig } from "@kubernetes/client-node";

function getKubeConfig() {
  try {
    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();
    // pingKubernetesApiServer(kc);
    return kc;
  } catch (err) {
    console.error("Error loading kube config file:", err);
    throw err;
  }
}

async function getApiServerAddress(kc: KubeConfig) {
  const currentContext = kc.getCurrentContext();
  const context = kc.getContextObject(currentContext);

  if (context && context.cluster) {
    const cluster = kc.getCluster(context.cluster);
    if (cluster && cluster.server) {
      return cluster.server;
    } else {
      throw new Error("Cluster server not found in kubeconfig.");
    }
  } else {
    throw new Error("Current context or cluster not found in kubeconfig.");
  }
}

function getAppsV1ApiClient(kc: KubeConfig) {
  try {
    const AppsV1ApiClient: AppsV1Api = kc.makeApiClient(k8s.AppsV1Api);
    return AppsV1ApiClient;
  } catch (err) {
    throw err;
  }
}

function getMetricsClient(kc: KubeConfig) {
  try {
    const metricsClient = new k8s.Metrics(kc);
    return metricsClient;
  } catch (err) {
    throw err;
  }
}

function getCoreV1Client(kc: KubeConfig) {
  try {
    const CoreV1ApiClient: CoreV1Api = kc.makeApiClient(k8s.CoreV1Api);
    return CoreV1ApiClient;
  } catch (err) {
    throw err;
  }
}

export function connectionToCluster(kc: KubeConfig) {
  try {
    return kc.getCurrentCluster() ? true : false;
  } catch (err) {
    throw err;
  }
}

export const AppsV1ApiClient = getAppsV1ApiClient(getKubeConfig());
export const CoreV1ApiClient = getCoreV1Client(getKubeConfig());
export const MetricsClient = getMetricsClient(getKubeConfig());

// k8s.topPods(CoreV1ApiClient, MetricsClient, "kube-system").then((pods: any) => {
//   const podsColumns = pods.map((pod: any) => {
//     return {
//       POD: pod.Pod.metadata.name,
//       "CPU(cores)": pod.CPU.CurrentUsage,
//       "MEMORY(bytes)": pod.Memory.CurrentUsage,
//     };
//   });
//   console.log("TOP PODS");
//   console.table(podsColumns);
// });
