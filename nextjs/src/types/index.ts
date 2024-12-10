export type Call = {
    id: string; // Unique identifier for the call session
    status: "active" | "uploading" | "transcribing" | "processing" | "completed"; // Enum for call status
    audioFile?: string; // URL or path to the uploaded audio file
    transcript?: string; // The text transcription of the call
    aiResponse?: string; // AI-generated response or insights
    customerId: string; // ID linking the call to a specific customer
    createdAt: Date; // Timestamp when the call session was initiated
    updatedAt: Date; // Timestamp of the last update to the call session
  };
