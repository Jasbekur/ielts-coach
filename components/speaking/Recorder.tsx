"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, Square, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpeakingTimer } from "./SpeakingTimer";
import { getSupportedMimeType } from "@/lib/utils/audio";
import { cn } from "@/lib/utils";

interface RecorderProps {
  limitSeconds: number;
  minSeconds?: number;
  onRecordingComplete: (blob: Blob) => void;
  disabled?: boolean;
  label?: string;
}

type RecordState = "idle" | "recording" | "done";

export function Recorder({
  limitSeconds,
  minSeconds = 0,
  onRecordingComplete,
  disabled = false,
  label,
}: RecorderProps) {
  const [state, setState] = useState<RecordState>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const stateRef = useRef<RecordState>("idle");

  // Keep stateRef in sync with state
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  function stopRecording() {
    if (mediaRecorderRef.current && stateRef.current === "recording") {
      mediaRecorderRef.current.stop();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setState("done");
  }

  // Auto-stop at limit using a ref-based timer check
  useEffect(() => {
    if (elapsed >= limitSeconds && stateRef.current === "recording") {
      stopRecording();
    }
  }, [elapsed, limitSeconds]);

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];

      const mimeType = getSupportedMimeType();
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType,
        audioBitsPerSecond: 64000,
      });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        onRecordingComplete(blob);
      };

      mediaRecorder.start(250);
      setElapsed(0);
      setState("recording");

      timerRef.current = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
    } catch {
      alert("Please allow microphone access to record your answer.");
    }
  }

  function handleReset() {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setElapsed(0);
    setState("idle");
  }

  const canStop = elapsed >= minSeconds;

  return (
    <div className="space-y-4">
      {label && <p className="text-sm text-muted-foreground">{label}</p>}

      {/* Big record button — minimum 80px touch target */}
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={state === "idle" ? startRecording : stopRecording}
          disabled={
            disabled ||
            state === "done" ||
            (state === "recording" && !canStop)
          }
          className={cn(
            "w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-lg focus:outline-none focus:ring-4 focus:ring-offset-2",
            state === "recording"
              ? "bg-red-500 hover:bg-red-600 focus:ring-red-300 animate-pulse"
              : state === "done"
              ? "bg-muted cursor-not-allowed"
              : "bg-violet-500 hover:bg-violet-600 focus:ring-violet-300",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          aria-label={state === "recording" ? "Stop recording" : "Start recording"}
        >
          {state === "recording" ? (
            <Square className="w-7 h-7 text-white fill-white" />
          ) : (
            <Mic className="w-7 h-7 text-white" />
          )}
        </button>

        <div className="text-center text-xs text-muted-foreground">
          {state === "idle" && "Tap to start recording"}
          {state === "recording" && !canStop && `Speak for at least ${minSeconds}s...`}
          {state === "recording" && canStop && "Tap to stop"}
          {state === "done" && "✓ Recording complete"}
        </div>
      </div>

      {/* Live timer */}
      {state === "recording" && (
        <SpeakingTimer
          elapsed={elapsed}
          limit={limitSeconds}
          label="Recording time"
          warning={10}
        />
      )}

      {/* Playback + re-record */}
      {audioUrl && state === "done" && (
        <div className="space-y-2">
          <audio src={audioUrl} controls className="w-full h-10" />
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="w-full gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Record again
          </Button>
        </div>
      )}
    </div>
  );
}
