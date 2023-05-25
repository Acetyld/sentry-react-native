
export type ThreadId = string;
export type FrameId = number;
export type StackId = number;

export interface Sample {
  stack_id: number;
  thread_id: ThreadId;
  elapsed_since_start_ns: string;
}

export type Stack = FrameId[];

export type Frame = {
  function: string;
  file?: string;
  line?: number;
  column?: number;
};

export interface ThreadCpuProfile {
  profile_id?: string;
  samples: Sample[];
  stacks: Stack[];
  frames: Frame[];
  thread_metadata: Record<ThreadId, { name?: string; priority?: number }>;
}

export interface Profile {
  event_id: string;
  version: string;
  os: {
    name: string;
    version: string;
    build_number?: string;
  };
  runtime: {
    name: string;
    version: string;
  };
  device: {
    architecture: string;
    is_emulator: boolean;
    locale: string;
    manufacturer: string;
    model: string;
  };
  timestamp: string;
  release: string;
  environment: string;
  platform: string;
  profile: ThreadCpuProfile;
  debug_meta?: {
    images: {
      debug_id: string;
      image_addr: string;
      code_file: string;
      type: string;
      image_size: number;
      image_vmaddr: string;
    }[];
  };
  transaction: {
    name: string;
    id: string;
    trace_id: string;
    active_thread_id: string;
  };
}
