import { SymbolIcon } from "@radix-ui/react-icons";
import React, { useRef, useState } from "react";
import { CiMicrophoneOn, CiMicrophoneOff } from "react-icons/ci";

const AudioHandling = () => {
  // managing states

  const [recordedUrl, setRecordedUrl] = useState<string>("");
  const [isLoading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const mediaStream = useRef<MediaStream | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const [content, setContent] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const readStream = async (stream: ReadableStream) => {
    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let result = "";
    const chunks: Uint8Array[] = [];

    // Function to process each chunk
    const readChunk = async () => {
      const { done, value } = await reader.read();
      if (done) {
        // Create a Blob from the chunks
        const blob = new Blob(chunks);
        // Create a URL for the Blob
        const fileUrl = URL.createObjectURL(blob);
        setFileUrl(fileUrl);
        return;
      }

      // Append the current chunk to the chunks array
      chunks.push(value);

      // Read the next chunk
      readChunk();
    };

    // Start reading the stream
    readChunk();
  };
  // API calls
  const uploadRecording = async (recordedBlob: File) => {
    try {
      setLoading(true);
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append("audioFile", recordedBlob);

      const response = await fetch("http://127.0.0.1:8000/transcribe", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload recording");
      }
      readStream(response.body!);
      console.log("Upload successful:", response);
    } catch (error) {
      console.error("Error uploading recording:", error);
    } finally {
      setLoading(false);
    }
  };

  // Starting recording and handling it

  const startRecording = async () => {
    setIsRecording(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStream.current = stream;
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (e: BlobEvent) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };
      mediaRecorder.current.onstop = async () => {
        const recordedBlob = new Blob(chunks.current, { type: "audio/mp3" });
        const file = new File([recordedBlob], "recording.mp3", {
          type: "audio/mp3",
        });
        const url = URL.createObjectURL(recordedBlob);

        setRecordedUrl(url);
        chunks.current = [];
        await uploadRecording(file);
      };
      mediaRecorder.current.start();
    } catch (error) {
      console.log("Error accessing microphone:", error);
    }
  };

  // stopping recording

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
    }
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((track) => {
        track.stop();
      });
    }
    setIsRecording(false);
  };
  return (
    <div className="flex gap-2 items-center flex-col justify-center">
      {!isRecording ? (
        <button
          onClick={startRecording}
          className="flex p-4 ring-2 bg-white rounded-full my-2"
        >
          {isLoading ? (
            <SymbolIcon className="text-[#0E9F6E] w-6 h-6 animate-spin" />
          ) : (
            <CiMicrophoneOn className="text-3xl" />
          )}
        </button>
      ) : (
        <div>
          <button
            onClick={stopRecording}
            className="flex p-4 ring-2 bg-green-700 rounded-full my-2 animate-pulse"
          >
            <CiMicrophoneOff className="text-3xl text-white" />
          </button>
        </div>
      )}
      {fileUrl && (
        <>
          <a href={fileUrl} download="output_audio.mp3">
            Download File
          </a>
          <audio src={fileUrl} controls />
        </>
      )}
    </div>
  );
};

export default AudioHandling;
