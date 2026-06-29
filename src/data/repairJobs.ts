export type RepairJob = {
  jobId: string;
  customer: string;
  phone: string;
  device: string;
  problem: string;
  status:
    | "Received"
    | "Diagnosing"
    | "Repairing"
    | "Waiting for Parts"
    | "Ready for Pickup"
    | "Delivered";
  updated: string;
};

export const repairJobs: RepairJob[] = [
  {
    jobId: "JND1001",
    customer: "Rahul Sharma",
    phone: "9876543210",
    device: "HP 15-BS579TX",
    problem: "Windows not booting",
    status: "Repairing",
    updated: "Today 10:30 AM",
  },
  {
    jobId: "JND1002",
    customer: "Amit Kumar",
    phone: "9123456780",
    device: "Dell Inspiron 15",
    problem: "Screen Replacement",
    status: "Ready for Pickup",
    updated: "Today 11:45 AM",
  },
  {
    jobId: "JND1003",
    customer: "Rohit Singh",
    phone: "9988776655",
    device: "Lenovo ThinkPad T480",
    problem: "Keyboard Replacement",
    status: "Waiting for Parts",
    updated: "Yesterday",
  },
];