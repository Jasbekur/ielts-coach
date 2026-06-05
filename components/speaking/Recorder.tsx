"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, Square, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpeakingTimer } from "./SpeakingTimer";
import { getSupportedMimeType } from "@/lib/utils/audio";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface RecorderProps {
  limitSeconds: number;
  minSeconds?: number;
  onRecordingComplete: (blob: Blob) => void;
  disabled?: boolean;
  label?: string;
  autoStart?: boolean;
}

type RecordState = "idle" | "countdown" | "recording" | "done";

export function Recorder({
  limitSeconds,
  minSeconds = 0,
  onRecordingComplete,
  disabled = false,
  label,
  autoStart = false,
}: RecorderProps) {
  const [state, setState] = useState<RecordState>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(3);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const stateRef = useRef<RecordState>("idle");

  // Keep stateRef in sync with state
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Auto-start recording when the parent signals it's time
  useEffect(() => {
    if (autoStart && stateRef.current === "idle" && !disabled) {
      beginCountdown();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart]);

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

  // Revoke audio URL on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  // Auto-stop at limit using a ref-based timer check
  useEffect(() => {
    if (elapsed >= limitSeconds && stateRef.current === "recording") {
      stopRecording();
    }
  }, [elapsed, limitSeconds]);

  async function beginCountdown() {
    // Request mic permission first so countdown isn't interrupted
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];
      setState("countdown");
      setCountdown(3);

      let count = 3;
      const cdTimer = setInterval(() => {
        count -= 1;
        setCountdown(count);
        if (count <= 0) {
          clearInterval(cdTimer);
          startRecordingFromStream(stream);
        }
      }, 1000);
    } catch (err) {
      const isDenied = err instanceof DOMException &&
        (err.name === "NotAllowedError" || err.name === "PermissionDeniedError");
      toast.error(
        isDenied
          ? "Microphone access denied. Please allow microphone in your browser settings and try again."
          : "Could not start recording. Check your microphone is connected and try again.",
        { duration: 6000 }
      );
    }
  }

  async function startRecordingFromStream(stream: MediaStream) {
    try {

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
    } catch (err) {
      const isDenied = err instanceof DOMException &&
        (err.name === "NotAllowedError" || err.name === "PermissionDeniedError");
      toast.error(
        isDenied
          ? "Microphone access denied. Please allow microphone in your browser settings and try again."
          : "Could not start recording. Check your microphone is connected and try again.",
        { duration: 6000 }
      );
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

      {/* 3-2-1 Countdown overlay */}
      {state === "countdown" && (
        <div className="flex flex-col items-center gap-3 py-6">
          <div style={{
            width: "80px", height: "80px", borderRadius: "50%",
            background: "#16a34a", display: "flex", alignItems: "center",
            justifyContent: "center", boxShadow: "0 0 0 12px rgba(22,163,74,0.15)",
            transition: "all 0.3s",
          }}>
            <span style={{ fontSize: "36px", fontWeight: 800, color: "#fff", lineHeight: 1 }}>
              {countdown}
            </span>
          </div>
          <p className="text-sm font-semibold text-gray-600">
            Get ready… recording starts in {countdown}s
          </p>
        </div>
      )}

      {/* Big record button — minimum 80px touch target */}
      {state !== "countdown" && (
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={state === "idle" ? beginCountdown : stopRecording}
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
              : "bg-red-600 hover:bg-red-700 focus:ring-red-300",
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
          {state === "idle" && "Tap to start — 3-second countdown then recording begins"}
          {state === "recording" && !canStop && `Speak for at least ${minSeconds}s...`}
          {state === "recording" && canStop && "Tap to stop"}
          {state === "done" && "✓ Recording complete"}
        </div>
      </div>
      )}

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
