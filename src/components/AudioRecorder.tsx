import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mic, Square, Play, Pause, RotateCcw, Check } from "lucide-react";

interface AudioRecorderProps {
  onRecordingComplete?: (blob: Blob) => void;
  maxDuration?: number; // in seconds
  className?: string;
}

export function AudioRecorder({
  onRecordingComplete,
  maxDuration = 60,
  className,
}: AudioRecorderProps) {
  const { isHausa } = useLanguage();
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Set up audio analyzer for volume visualization
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyzer = audioContext.createAnalyser();
      analyzer.fftSize = 256;
      source.connect(analyzer);
      analyzerRef.current = analyzer;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        onRecordingComplete?.(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setDuration(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setDuration((prev) => {
          if (prev >= maxDuration - 1) {
            stopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);

      // Start volume visualization
      const updateVolume = () => {
        if (analyzerRef.current) {
          const dataArray = new Uint8Array(analyzerRef.current.frequencyBinCount);
          analyzerRef.current.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
          setVolumeLevel(average / 255);
        }
        animationRef.current = requestAnimationFrame(updateVolume);
      };
      updateVolume();
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      if (timerRef.current) clearInterval(timerRef.current);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      setVolumeLevel(0);
    }
  };

  const resetRecording = () => {
    setAudioUrl(null);
    setDuration(0);
    setIsPlaying(false);
  };

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = () => setIsPlaying(false);
    }
  }, [audioUrl]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Generate waveform bars
  const waveformBars = Array.from({ length: 40 }, (_, i) => {
    const baseHeight = Math.sin((i / 40) * Math.PI) * 0.5 + 0.5;
    const animatedHeight = isRecording 
      ? baseHeight * (0.3 + volumeLevel * 0.7) + Math.random() * 0.2
      : baseHeight * 0.3;
    return Math.max(0.1, Math.min(1, animatedHeight));
  });

  return (
    <div className={cn("space-y-6", className)}>
      {/* Waveform Visualization */}
      <div className="h-24 flex items-center justify-center gap-0.5 bg-muted/50 rounded-2xl p-4">
        {waveformBars.map((height, i) => (
          <div
            key={i}
            className={cn(
              "w-1.5 rounded-full transition-all duration-75",
              isRecording ? "bg-primary" : audioUrl ? "bg-muted-foreground" : "bg-muted-foreground/30"
            )}
            style={{
              height: `${height * 100}%`,
              animationDelay: `${i * 20}ms`,
            }}
          />
        ))}
      </div>

      {/* Timer */}
      <div className="text-center">
        <div className="text-4xl font-bold text-foreground tabular-nums">
          {formatTime(duration)}
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          {isRecording 
            ? (isHausa ? "Ana rikodin..." : "Recording...") 
            : audioUrl 
              ? (isHausa ? "An rikodi" : "Recorded")
              : (isHausa ? "Shirye don rikodi" : "Ready to record")
          }
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        {!audioUrl ? (
          <Button
            size="lg"
            onClick={isRecording ? stopRecording : startRecording}
            className={cn(
              "w-20 h-20 rounded-full transition-all duration-300",
              isRecording 
                ? "bg-destructive hover:bg-destructive/90 animate-pulse" 
                : "bg-primary hover:bg-primary/90 hover:scale-105 glow-gold"
            )}
          >
            {isRecording ? (
              <Square className="w-8 h-8" fill="currentColor" />
            ) : (
              <Mic className="w-8 h-8" />
            )}
          </Button>
        ) : (
          <>
            <Button
              size="lg"
              variant="outline"
              onClick={resetRecording}
              className="w-14 h-14 rounded-full"
            >
              <RotateCcw className="w-6 h-6" />
            </Button>
            
            <Button
              size="lg"
              onClick={togglePlayback}
              className="w-20 h-20 rounded-full bg-primary hover:bg-primary/90 glow-gold"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8" fill="currentColor" />
              ) : (
                <Play className="w-8 h-8" fill="currentColor" />
              )}
            </Button>
            
            <Button
              size="lg"
              variant="default"
              className="w-14 h-14 rounded-full bg-accent hover:bg-accent/90 glow-green"
            >
              <Check className="w-6 h-6" />
            </Button>
          </>
        )}
      </div>

      {/* Hidden audio element for playback */}
      {audioUrl && (
        <audio ref={audioRef} src={audioUrl} />
      )}
    </div>
  );
}

