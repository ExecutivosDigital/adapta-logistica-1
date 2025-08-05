"use client";
import { generalPrompt } from "@/utils/prompts";
import { GoogleGenAI, Part } from "@google/genai";
import { startTransition, useEffect, useRef, useState } from "react";
import fixWebmDuration from "webm-duration-fix";
import { ChatHistoryItem, Message, Prompt } from "./types";

/* -------------------------------------------------------------
 *  Tipagens auxiliares para os dados do backend
 * -----------------------------------------------------------*/

export interface UseSectionChatParams {
  selectedPrompt?: Prompt;
}

export function useSectionChat({ selectedPrompt }: UseSectionChatParams) {
  /* ==================================================================
   * 1. STATES & REFS  (100% iguais ao componente original)
   * =================================================================*/
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatId, setChatId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [initialHistory, setInitialHistory] = useState<ChatHistoryItem[]>([]);
  const [inputMessage, setInputMessage] = useState("");

  /* ---- Gravação ---- */
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null,
  );
  const chunksRef = useRef<Blob[]>([]);
  const [recordStartTime, setRecordStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState("00:00");

  /* ---- Arquivo ---- */
  const [file, setFile] = useState<File | null>(null);

  /* ---- Gemini ---- */
  const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? ""; // mova para .env
  const aiInstanceRef = useRef<GoogleGenAI | null>(null);
  const chatSessionRef = useRef<ReturnType<
    GoogleGenAI["chats"]["create"]
  > | null>(null);

  /* ==================================================================
   * 2. INICIALIZAÇÃO DA IA & SESSÃO (dependente de prompt/hist)
   * =================================================================*/
  useEffect(() => {
    if (!aiInstanceRef.current) {
      aiInstanceRef.current = new GoogleGenAI({ apiKey: API_KEY });
    }
    if (aiInstanceRef.current) {
      chatSessionRef.current = aiInstanceRef.current.chats.create({
        model: "gemini-1.5-flash",
        history: initialHistory || [],
        config: {
          systemInstruction: selectedPrompt
            ? selectedPrompt.prompt
            : generalPrompt.prompt,
        },
      });
    }
  }, [initialHistory, selectedPrompt]);

  /* ==================================================================
   * 3. BACKEND / GERENCIAMENTO DE HISTÓRICO
   * =================================================================*/

  function handleNewChat() {
    chatSessionRef.current = null;
    setMessages([]);
    setInitialHistory([]);
    setChatId("");
    setFile(null);
    setInputMessage("");
  }

  const startRecording = async () => {
    setIsRecording(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    chunksRef.current = [];
    recorder.ondataavailable = (e) =>
      e.data.size > 0 && chunksRef.current.push(e.data);
    recorder.onstop = async () => {
      const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
      const fixedBlob = await fixWebmDuration(audioBlob);
      const audioFile = new File([fixedBlob], "audio_gravado.webm", {
        type: "audio/webm",
      });
      setFile(audioFile);
      stream.getTracks().forEach((t) => t.stop());
    };
    recorder.start();
    setMediaRecorder(recorder);
    setRecordStartTime(Date.now());
  };

  const stopRecording = () => {
    mediaRecorder?.stop();
    setIsRecording(false);
    setRecordStartTime(null);
    setElapsedTime("00:00");
  };

  /* timer */
  useEffect(() => {
    let id: ReturnType<typeof setInterval> | undefined;
    if (recordStartTime && isRecording) {
      id = setInterval(() => {
        const elapsed = (Date.now() - recordStartTime) / 1000;
        const minutes = Math.floor(elapsed / 60);
        const seconds = Math.floor(elapsed % 60);
        setElapsedTime(
          `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
        );
      }, 1000);
    }
    return () => id && clearInterval(id);
  }, [recordStartTime, isRecording]);

  /* ==================================================================
   * 5. STREAM/ENVIO DE MENSAGEM
   * =================================================================*/
  const placeholderIndexRef = useRef<number>(-1);
  const cancelStreamRef = useRef<boolean>(false);
  const streamBufferRef = useRef<string>("");

  function flushBufferToUI() {
    const txt = streamBufferRef.current;
    startTransition(() => {
      setMessages((prev) =>
        prev.map((m, i) =>
          i === placeholderIndexRef.current ? { ...m, content: txt } : m,
        ),
      );
    });
  }

  async function uploadToGemini(f: File) {
    if (!aiInstanceRef.current) return null;
    let gfile = await aiInstanceRef.current.files.upload({ file: f });
    const maxTries = 30;
    const delayMs = 2_000;
    for (let tries = 0; gfile.state !== "ACTIVE"; tries++) {
      if (gfile.state === "FAILED")
        throw new Error("Falha ao processar arquivo no Gemini");
      if (tries >= maxTries)
        throw new Error("Timeout: arquivo não ficou ACTIVE a tempo");
      const fileName = gfile.name;
      if (!fileName) throw new Error("Upload não retornou um name de arquivo");
      await new Promise((r) => setTimeout(r, delayMs));
      gfile = await aiInstanceRef.current.files.get({ name: fileName });
    }
    return gfile;
  }

  async function handleSendMessage() {
    if (loading || (!inputMessage.trim() && !file)) return;
    cancelStreamRef.current = false;
    setLoading(true);

    const outgoing: Message[] = [];
    if (file) {
      outgoing.push({
        role: "user",
        content: "",
        file: URL.createObjectURL(file),
        type: file.type,
        name: file.name,
      });
    }
    if (inputMessage.trim())
      outgoing.push({ role: "user", content: inputMessage });
    const AI_ROLE = "ai";
    setMessages((prev) => {
      const list = [
        ...prev,
        ...outgoing,
        { role: AI_ROLE as "ai", content: "..." },
      ];
      placeholderIndexRef.current = list.length - 1;
      return list;
    });
    const fileToSend = file;
    const parts: Part[] = [];

    if (fileToSend) {
      const form = new FormData();
      form.append("file", fileToSend);

      const gfile = await uploadToGemini(fileToSend);
      if (gfile)
        parts.push({
          fileData: { mimeType: gfile.mimeType, fileUri: gfile.uri },
        });
    }

    setInputMessage("");
    setFile(null);

    try {
      if (inputMessage.trim()) parts.push({ text: inputMessage });

      if (!chatSessionRef.current)
        throw new Error("Sessão de chat não iniciada.");
      const streamIter = await chatSessionRef.current.sendMessageStream({
        message: parts,
      });
      streamBufferRef.current = "";
      for await (const chunk of streamIter) {
        if (cancelStreamRef.current) break;
        const piece =
          chunk.candidates?.[0]?.content?.parts
            ?.map((p) => p.text ?? "")
            .join("") ?? "";
        if (!piece) continue;
        streamBufferRef.current += piece;
        flushBufferToUI();
      }
      flushBufferToUI();
      streamBufferRef.current = "";
    } catch (err) {
      console.error(err);
      setMessages((prev) =>
        prev.map((m, i) =>
          i === placeholderIndexRef.current
            ? { ...m, content: "Desculpe, ocorreu um erro." }
            : m,
        ),
      );
    } finally {
      setLoading(false);
    }
  }

  /* ================= CANCELAMENTO DE STREAM ================= */
  function handleAbortStream() {
    if (loading) {
      cancelStreamRef.current = true;
      setLoading(false);
    }
  }

  /* ------------------------------------------------------------------
   * 6. EXPORTA TUDO
   * ----------------------------------------------------------------*/
  return {
    /* estado público */
    messages,
    loading,
    chatId,
    inputMessage,
    setInputMessage,
    file,
    setFile,
    isRecording,
    elapsedTime,

    /* manipuladores principais */
    startRecording,
    stopRecording,
    handleSendMessage,

    /* backend helpers */
    handleNewChat,
    handleAbortStream,
  } as const;
}

/* --------------------------------------------------------------------
 *           EXEMPLO DE USO NO COMPONENTE ORIGINAL
 * --------------------------------------------------------------------
 * const {
 *   messages,
 *   loading,
 *   inputMessage,
 *   setInputMessage,
 *   file,
 *   setFile,
 *   isRecording,
 *   elapsedTime,
 *   handleFileUpload,
 *   startRecording,
 *   stopRecording,
 *   handleSendMessage,
 *   handleCreateChat,
 *   handlePostMessage,
 *   handleGetOldChat,
 *   handleNewChat,
 *   handleAbortStream,
 * } = useSectionChat({
 *   setLoadHistory,
 *   loadNewChat,
 *   setLoadNewChat,
 *   loadOldChat,
 *   setLoadOldChat,
 *   selectedPrompt,
 * });
 * ------------------------------------------------------------------*/
